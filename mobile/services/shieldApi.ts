import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'http://localhost:4000';

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}/g;
const APIKEY_RE = /(sk-|pk_|ghp_|xox[baprs]-)[a-zA-Z0-9]{16,}/g;
const SSN_RE = /\b\d{3}-\d{2}-\d{4}\b/g;
const CC_RE = /\b(?:\d[ -]?){13,16}\b/g;
const SQL_RE = /(\bUNION\b|\bSELECT\b|\bDROP\b|\bINSERT\b).+\b(FROM|INTO|TABLE)\b/gi;
const PROMPT_OVERRIDE_RE = /ignore (all )?(previous|prior|above)|forget your (instructions?|training)|you are now|act as (an? )?(unrestricted|unfiltered|DAN)/gi;

export async function analyzeText(input: string) {
  // local pre-scan for PII
  const indicators: string[] = [];
  const pii: string[] = [];
  if (EMAIL_RE.test(input)) { indicators.push('email'); pii.push('email'); }
  if (APIKEY_RE.test(input)) { indicators.push('api_key'); pii.push('api_key'); }
  if (SSN_RE.test(input)) { indicators.push('ssn'); pii.push('ssn'); }
  if (CC_RE.test(input)) { indicators.push('credit_card'); pii.push('credit_card'); }
  if (SQL_RE.test(input)) indicators.push('sql_injection');
  if (PROMPT_OVERRIDE_RE.test(input)) indicators.push('prompt_override');

  const resp = await fetch(`${API_BASE}/analyze`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input }) });
  const data = await resp.json();

  // cache last 50
  try {
    const key = 'shield_history';
    const histRaw = await AsyncStorage.getItem(key);
    const hist = histRaw ? JSON.parse(histRaw) : [];
    hist.unshift({ ts: Date.now(), input_hash: data.analysisId, report: data.threatReport });
    await AsyncStorage.setItem(key, JSON.stringify(hist.slice(0, 50)));
  } catch (e) {}

  return data.threatReport;
}

export function subscribeToAlerts(cb: (event: any) => void): () => void {
  let ws: WebSocket | null = null;
  let attempts = 0;

  function connect() {
    ws = new WebSocket('ws://localhost:4000');
    ws.onopen = () => { attempts = 0; };
    ws.onmessage = (m: any) => { try { cb(JSON.parse(m.data)); } catch (e) {} };
    ws.onclose = () => retry();
    ws.onerror = () => { ws?.close(); };
  }

  function retry() {
    attempts++;
    const wait = Math.min(30000, 500 * Math.pow(2, attempts));
    setTimeout(connect, wait);
  }

  connect();
  return () => { ws?.close(); ws = null; };
}
