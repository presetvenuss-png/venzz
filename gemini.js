// ═══════════════════════════════════════════════════
// GEMINI API CONFIG — VenzAi
// Ganti dengan API key Gemini kamu dari https://aistudio.google.com/app/apikey
// ═══════════════════════════════════════════════════

const GEMINI_CONFIG = {
  keys: [
    'AIzaSyDumVDW6R5EWTILSxVfG5d3ROQr_xXm06U',
    'AIzaSyDumVDW6R5EWTILSxVfG5d3ROQr_xXm06U'  // opsional, fallback key
  ],
  endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
  models: [
    // ── Gemini 2.5 ──
    { id: 'gemini-2.5-flash-preview-05-20', label: 'Gemini 2.5 Flash Preview', badge: '2.5', badgeNew: true },
    // ── Gemini 2.0 ──
    { id: 'gemini-2.0-flash',               label: 'Gemini 2.0 Flash',         badge: '2.0', badgeNew: true },
    { id: 'gemini-2.0-flash-lite',          label: 'Gemini 2.0 Flash Lite',    badge: '2.0 Lite' },
    // ── Gemini 1.5 ──
    { id: 'gemini-1.5-pro',                 label: 'Gemini 1.5 Pro',           badge: '1.5 Pro' },
    { id: 'gemini-1.5-flash',               label: 'Gemini 1.5 Flash',         badge: '1.5' },
    { id: 'gemini-1.5-flash-8b',            label: 'Gemini 1.5 Flash 8B',      badge: '1.5 8B' },
  ]
};

// ── Active key index & failed state ──
let geminiActiveKey = 0;
const geminiKeyFailed = GEMINI_CONFIG.keys.map(() => false);

function geminiFailKey(idx) {
  geminiKeyFailed[idx] = true;
  const other = GEMINI_CONFIG.keys.findIndex((_, i) => i !== idx && !geminiKeyFailed[i]);
  if (other !== -1) {
    geminiActiveKey = other;
    return true; // switched
  }
  return false; // all failed
}

// ── Core fetch function ──
async function geminiFetch(modelId, messages, systemPrompt, temp = 0.7, maxTokens = 2048) {
  const key = GEMINI_CONFIG.keys[geminiActiveKey];
  const url = `${GEMINI_CONFIG.endpoint}/${modelId}:generateContent?key=${key}`;

  // Convert OpenAI-style messages → Gemini format
  const contents = messages
    .filter(m => m.role !== 'system')
    .map(m => {
      const role = m.role === 'assistant' ? 'model' : 'user';
      let parts;
      if (typeof m.content === 'string') {
        parts = [{ text: m.content }];
      } else if (Array.isArray(m.content)) {
        parts = m.content.map(p => {
          if (p.type === 'text') return { text: p.text };
          if (p.type === 'image_url') {
            // base64 data URL
            const b64 = p.image_url.url.split(',')[1];
            const mime = p.image_url.url.match(/data:(.*?);/)?.[1] || 'image/jpeg';
            return { inlineData: { mimeType: mime, data: b64 } };
          }
          return { text: '' };
        });
      } else {
        parts = [{ text: String(m.content) }];
      }
      return { role, parts };
    });

  const body = {
    contents,
    generationConfig: { temperature: temp, maxOutputTokens: maxTokens }
  };
  if (systemPrompt) {
    body.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  let res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if ((res.status === 429 || res.status === 401 || res.status === 403) && geminiFailKey(geminiActiveKey)) {
    const newKey = GEMINI_CONFIG.keys[geminiActiveKey];
    const newUrl = `${GEMINI_CONFIG.endpoint}/${modelId}:generateContent?key=${newKey}`;
    res = await fetch(newUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Gemini HTTP ' + res.status);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || 'No response.';
  const totalTokens = (data.usageMetadata?.promptTokenCount || 0) + (data.usageMetadata?.candidatesTokenCount || 0);

  // Return in OpenAI-compatible shape so main code doesn't need to change
  return {
    choices: [{ message: { content: text } }],
    usage: { total_tokens: totalTokens }
  };
}
