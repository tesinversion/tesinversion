// Netlify proxy: consultas SEC desde servidor, sin exponer claves ni acceder desde navegador.
// Uso exclusivamente experimental en una rama separada.
// Fuente oficial: https://www.sec.gov/search-filings/edgar-application-programming-interfaces
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { parseCompanyFacts } = require('../../src/sec-historico.cjs');
const HEADERS = {
  'User-Agent': 'Arquitectura de la Inversion info@tesinversion.com',
  'Accept': 'application/json'
};
const SEC_TICKERS = 'https://www.sec.gov/files/company_tickers.json';
let tickerCache = { until: 0, list: [] };
function reply(status, data) {
  return { statusCode: status, headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': status === 200 ? 'public, max-age=120, s-maxage=600' : 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow'
  }, body: JSON.stringify(data) };
}
async function getJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 13000);
  try {
    const response = await fetch(url, { headers: HEADERS, signal: controller.signal });
    if (!response.ok) throw new Error('La SEC respondió HTTP ' + response.status);
    return await response.json();
  } finally { clearTimeout(timeout); }
}
async function findTickers() {
  if (tickerCache.until > Date.now() && tickerCache.list.length) return tickerCache.list;
  const data = await getJson(SEC_TICKERS);
  const list = Object.values(data).filter(item=>item?.ticker && item?.cik_str)
    .map(item=>({ ticker:item.ticker.toUpperCase(), name:item.title, cik:item.cik_str }));
  tickerCache = { until: Date.now() + 12 * 60 * 60 * 1000, list };
  return list;
}
export async function handler(event) {
  const q = event.queryStringParameters || {};
  const ticker = String(q.ticker || '').trim().toUpperCase();
  if (!/^[A-Z][A-Z0-9.\-]{0,11}$/.test(ticker)) return reply(400, { error:'Ticker no válido.' });
  try {
    const list = await findTickers();
    const selected = list.find(item => item.ticker === ticker);
    if (!selected) return reply(404, { error:'No se encontró el ticker en el listado SEC.' });
    const cik = String(selected.cik).padStart(10, '0');
    const facts = await getJson('https://data.sec.gov/api/xbrl/companyfacts/CIK' + cik + '.json');
    const parsed = parseCompanyFacts(facts);
    return reply(200, { ...parsed, ticker: selected.ticker, company: selected.name });
  } catch (err) {
    return reply(502, { error:'Falló la consulta a la SEC. El módulo permanece en pruebas.', detail:String(err.message || err).slice(0,160) });
  }
}
