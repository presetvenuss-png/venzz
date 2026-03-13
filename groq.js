// ═══════════════════════════════════════════════════
// GROQ API CONFIG — VenzAi
// Ganti dengan API key Groq kamu dari https://console.groq.com/keys
// ═══════════════════════════════════════════════════

const GROQ_CONFIG = {
  keys: [
    'gsk_GANTI-DENGAN-API-KEY-GROQ-KAMU-1',
    'gsk_GANTI-DENGAN-API-KEY-GROQ-KAMU-2'  // opsional, fallback key
  ],
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  models: [
    // ── Llama 4 (terbaru) ──
    { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', label: 'Llama 4 Maverick 17B', badge: 'New', badgeNew: true },
    { id: 'meta-llama/llama-4-scout-17b-16e-instruct',     label: 'Llama 4 Scout 17B',    badge: 'New', badgeNew: true },
    // ── Llama 3.x ──
    { id: 'llama-3.3-70b-versatile',                       label: 'Llama 3.3 70B',         badge: 'Fast' },
    { id: 'llama-3.3-70b-specdec',                         label: 'Llama 3.3 70B SpecDec', badge: 'Speed' },
    { id: 'llama-3.1-70b-versatile',                       label: 'Llama 3.1 70B',         badge: '128K' },
    { id: 'llama-3.1-8b-instant',                          label: 'Llama 3.1 8B',          badge: 'Turbo' },
    { id: 'llama3-70b-8192',                               label: 'Llama 3 70B',            badge: '8K' },
    { id: 'llama3-8b-8192',                                label: 'Llama 3 8B',             badge: 'Free' },
    // ── DeepSeek ──
    { id: 'deepseek-r1-distill-llama-70b',                 label: 'DeepSeek R1 Distill 70B', badge: 'Reason', badgeNew: true },
    // ── Mixtral ──
    { id: 'mixtral-8x7b-32768',                            label: 'Mixtral 8x7B',          badge: '32K' },
    // ── Gemma ──
    { id: 'gemma2-9b-it',                                  label: 'Gemma 2 9B',            badge: 'Google' },
    { id: 'gemma-7b-it',                                   label: 'Gemma 7B',              badge: 'Google' },
    // ── Qwen ──
    { id: 'qwen-qwq-32b',                                  label: 'Qwen QwQ 32B',          badge: 'Reason', badgeNew: true },
    { id: 'qwen-2.5-coder-32b',                            label: 'Qwen 2.5 Coder 32B',    badge: 'Code' },
    { id: 'qwen-2.5-72b',                                  label: 'Qwen 2.5 72B',          badge: 'Power' },
    // ── Compound / Misc ──
    { id: 'compound-beta',                                 label: 'Compound Beta',         badge: 'Search', badgeNew: true },
    { id: 'compound-beta-mini',                            label: 'Compound Beta Mini',    badge: 'Fast',   badgeNew: true },
  ]
};

// ── Active key index & failed state ──
let groqActiveKey = 0;
const groqKeyFailed = GROQ_CONFIG.keys.map(() => false);

function groqFailKey(idx) {
  groqKeyFailed[idx] = true;
  const other = GROQ_CONFIG.keys.findIndex((_, i) => i !== idx && !groqKeyFailed[i]);
  if (other !== -1) { groqActiveKey = other; return true; }
  return false;
}

// ── Core fetch — compatible with OpenAI format ──
async function groqFetch(body) {
  const doReq = (ki) => fetch(GROQ_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + GROQ_CONFIG.keys[ki],
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  let res = await doReq(groqActiveKey);

  if ((res.status === 429 || res.status === 401) && groqFailKey(groqActiveKey)) {
    res = await doReq(groqActiveKey);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Groq HTTP ' + res.status);
  }

  const data = await res.json();
  if (data.error) throw new Error(data.error.message || 'Groq API error');
  return data;
}
