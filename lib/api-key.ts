// Clean common copy/paste wrappers without logging or storing credentials.
export function normalizeApiKey(input: string): string {
  if (input.length > 2048) throw new Error('Too much text pasted. Copy only the API key from Google AI Studio.');
  let key = input.replace(/[\u200B-\u200D\u2060\uFEFF]/g, '').trim();
  key = key.replace(/^(?:export\s+)?(?:GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*/i, '');
  const pairs: Record<string,string> = {'"':'"', "'":"'", '`':'`', '“':'”', '‘':'’'};
  key = key.trim();
  if (pairs[key[0]] && key.endsWith(pairs[key[0]])) key = key.slice(1, -1);
  key = key.replace(/\s/g, '');
  if (!key) return '';
  if (key.startsWith('sk-')) throw new Error('This looks like an OpenAI key. Connect Gemini needs a Google AI Studio API key.');
  if (/[.*•…]{3,}/.test(key)) throw new Error('This is a hidden key preview. Use the Copy API key button in Google AI Studio to copy the full key.');
  if (key.length > 512 || !/^[\x21-\x7E]+$/.test(key)) throw new Error('The pasted value contains unsupported characters. Copy the full API key using Google AI Studio’s Copy button.');
  return key;
}
