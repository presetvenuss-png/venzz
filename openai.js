// ═══════════════════════════════════════════════════
// OPENROUTER API CONFIG — VenzAi
// Ganti dengan API key OpenRouter kamu dari https://openrouter.ai/keys
// ═══════════════════════════════════════════════════

const OPENROUTER_CONFIG = {
  keys: [
    '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',
    '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'  // opsional, fallback key
  ],
  endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  models: [
    // ── OpenAI ──
    { id: 'openai/gpt-4o',                       label: 'GPT-4o',                  badge: 'Vision',   badgeNew: false },
    { id: 'openai/gpt-4o-mini',                  label: 'GPT-4o Mini',             badge: 'Fast' },
    { id: 'openai/gpt-4-turbo',                  label: 'GPT-4 Turbo',             badge: '128K' },
    { id: 'openai/o1',                           label: 'o1',                      badge: 'Reasoning', badgeNew: true },
    { id: 'openai/o1-mini',                      label: 'o1 Mini',                 badge: 'Fast',      badgeNew: true },
    { id: 'openai/o3-mini',                      label: 'o3 Mini',                 badge: 'New',       badgeNew: true },
    { id: 'openai/gpt-4.1',                      label: 'GPT-4.1',                 badge: 'New',       badgeNew: true },
    { id: 'openai/gpt-4.1-mini',                 label: 'GPT-4.1 Mini',            badge: 'Fast',      badgeNew: true },
    { id: 'openai/chatgpt-4o-latest',            label: 'ChatGPT-4o Latest',       badge: 'Live' },
    // ── Anthropic ──
    { id: 'anthropic/claude-opus-4',             label: 'Claude Opus 4',           badge: 'New',       badgeNew: true },
    { id: 'anthropic/claude-sonnet-4-5',         label: 'Claude Sonnet 4.5',       badge: 'New',       badgeNew: true },
    { id: 'anthropic/claude-3-7-sonnet',         label: 'Claude 3.7 Sonnet',       badge: 'Thinking',  badgeNew: true },
    { id: 'anthropic/claude-3-5-sonnet',         label: 'Claude 3.5 Sonnet',       badge: 'Vision' },
    { id: 'anthropic/claude-3-5-haiku',          label: 'Claude 3.5 Haiku',        badge: 'Fast' },
    { id: 'anthropic/claude-3-opus',             label: 'Claude 3 Opus',           badge: 'Power' },
    // ── Google ──
    { id: 'google/gemini-2.5-pro-preview',       label: 'Gemini 2.5 Pro Preview',  badge: '2.5',       badgeNew: true },
    { id: 'google/gemini-2.5-flash-preview',     label: 'Gemini 2.5 Flash Preview',badge: '2.5',       badgeNew: true },
    { id: 'google/gemini-2.0-flash-001',         label: 'Gemini 2.0 Flash',        badge: '2.0' },
    { id: 'google/gemini-flash-1.5',             label: 'Gemini 1.5 Flash',        badge: '1.5' },
    { id: 'google/gemini-pro-1.5',               label: 'Gemini 1.5 Pro',          badge: '1.5 Pro' },
    // ── Meta Llama ──
    { id: 'meta-llama/llama-4-maverick',         label: 'Llama 4 Maverick',        badge: 'New',       badgeNew: true },
    { id: 'meta-llama/llama-4-scout',            label: 'Llama 4 Scout',           badge: 'New',       badgeNew: true },
    { id: 'meta-llama/llama-3.3-70b-instruct',   label: 'Llama 3.3 70B',           badge: 'Free' },
    { id: 'meta-llama/llama-3.1-405b-instruct',  label: 'Llama 3.1 405B',          badge: 'Power' },
    { id: 'meta-llama/llama-3.1-70b-instruct',   label: 'Llama 3.1 70B',           badge: 'Free' },
    // ── Mistral ──
    { id: 'mistralai/mistral-large',             label: 'Mistral Large',           badge: 'Power' },
    { id: 'mistralai/mistral-medium',            label: 'Mistral Medium',          badge: '128K' },
    { id: 'mistralai/mistral-small',             label: 'Mistral Small',           badge: 'Fast' },
    { id: 'mistralai/mistral-7b-instruct',       label: 'Mistral 7B',              badge: 'Free' },
    { id: 'mistralai/codestral-mamba',           label: 'Codestral Mamba',         badge: 'Code' },
    // ── DeepSeek ──
    { id: 'deepseek/deepseek-r1',                label: 'DeepSeek R1',             badge: 'Reason',    badgeNew: true },
    { id: 'deepseek/deepseek-chat-v3-0324',      label: 'DeepSeek V3',             badge: 'New',       badgeNew: true },
    { id: 'deepseek/deepseek-prover-v2',         label: 'DeepSeek Prover V2',      badge: 'Math',      badgeNew: true },
    // ── Qwen ──
    { id: 'qwen/qwen3-235b-a22b',                label: 'Qwen3 235B',              badge: 'New',       badgeNew: true },
    { id: 'qwen/qwen3-32b',                      label: 'Qwen3 32B',               badge: 'New',       badgeNew: true },
    { id: 'qwen/qwen-2.5-72b-instruct',          label: 'Qwen 2.5 72B',            badge: 'Power' },
    { id: 'qwen/qwen-2.5-coder-32b-instruct',    label: 'Qwen 2.5 Coder 32B',      badge: 'Code' },
    // ── Cohere ──
    { id: 'cohere/command-r-plus',               label: 'Command R+',              badge: 'RAG' },
    { id: 'cohere/command-r7b-12-2024',          label: 'Command R7B',             badge: 'Fast' },
    // ── Perplexity ──
    { id: 'perplexity/llama-3.1-sonar-large-128k-online', label: 'Sonar Large Online', badge: 'Search' },
    { id: 'perplexity/llama-3.1-sonar-small-128k-online', label: 'Sonar Small Online', badge: 'Fast' },
    // ── xAI ──
    { id: 'x-ai/grok-3',                        label: 'Grok 3',                  badge: 'New',       badgeNew: true },
    { id: 'x-ai/grok-3-mini',                   label: 'Grok 3 Mini',             badge: 'Fast',      badgeNew: true },
    { id: 'x-ai/grok-2-1212',                   label: 'Grok 2',                  badge: 'Vision' },
    // ── Microsoft / Others ──
    { id: 'microsoft/phi-4',                     label: 'Phi-4',                   badge: 'Compact' },
    { id: 'microsoft/mai-ds-r1',                 label: 'MAI DS R1',               badge: 'New',       badgeNew: true },
    { id: 'nvidia/llama-3.1-nemotron-ultra-253b-v1', label: 'Nemotron Ultra 253B', badge: 'New',       badgeNew: true },
  ]
};

// ── Active key index & failed state ──
let openrouterActiveKey = 0;
const openrouterKeyFailed = OPENROUTER_CONFIG.keys.map(() => false);

function openrouterFailKey(idx) {
  openrouterKeyFailed[idx] = true;
  const other = OPENROUTER_CONFIG.keys.findIndex((_, i) => i !== idx && !openrouterKeyFailed[i]);
  if (other !== -1) { openrouterActiveKey = other; return true; }
  return false;
}

// ── Core fetch ──
async function openrouterFetch(body) {
  const doReq = (ki) => fetch(OPENROUTER_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + OPENROUTER_CONFIG.keys[ki],
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://venzai.app',
      'X-Title': 'VenzAi'
    },
    body: JSON.stringify(body)
  });

  let res = await doReq(openrouterActiveKey);

  if ((res.status === 429 || res.status === 401 || res.status === 402) && openrouterFailKey(openrouterActiveKey)) {
    res = await doReq(openrouterActiveKey);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'OpenRouter HTTP ' + res.status);
  }

  const data = await res.json();
  if (data.error) throw new Error(data.error.message || 'OpenRouter API error');
  return data;
}
