// Laboratorio SEC: interfaz moderna de Netlify Functions (Request -> Response).
// No hay datos ficticios en este servidor; cada respuesta financiera procede de EDGAR.
import parser from '../../src/sec-historico.cjs';
const { parseCompanyFacts } = parser;
const VERSION = 'v0.3.0-sec-diagnostic-2';
const HEADERS = {
  'User-Agent': 'Arquitectura de la Inversion info@tesinversion.com',
  'Accept': 'application/json'
};
const TICKERS_URL = 'https://www.sec.gov/files/company_tickers.json';
let tickerCache = { until: 0, list: [] };

function reply(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': status === 200 ? 'public, max-age=120, s-maxage=600' : 'no-store',
      'x-content-type-options': 'nosniff',
      'x-robots-tag': 'noindex, nofollow'
    }
  });
}

async function getJson(url, source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    let response;
    try {
      response = await fetch(url, { headers: HEADERS, signal: controller.signal });
    } catch (err) {
      throw new Error(source + ': fallo de red (' + String(err?.message || err).slice(0,100) + ')');
    }
    if (!response.ok) throw new Error(source + ': HTTP ' + response.status);
    try { return await response.json(); }
    catch { throw new Error(source + ': respuesta no es JSON válido'); }
  } finally { clearTimeout(timeout); }
}

async function findTicker(ticker) {
  if (tickerCache.until < Date.now() || tickerCache.list.length === 0) {
    const data = await getJson(TICKERS_URL, 'Listado SEC de tickers');
    const list = Object.values(data).filter(it => it?.ticker && it?.cik_str)
      .map(it => ({ ticker: it.ticker.toUpperCase(), name: it.title, cik: it.cik_str }));
    if (!list.length) throw new Error('Listado SEC de tickers vacío');
    tickerCache = { until: Date.now() + 12 * 60 * 60 * 1000, list };
  }
  return tickerCache.list.find(it => it.ticker === ticker);
}

export default async function handler(request) {
  const url = new URL(request.url);
  if (request.method !== 'GET') return reply(405,{code:'METHOD',error:'Solo se permite GET.'});
  if (url.searchParams.get('health') === '1') {
    return reply(200,{ok:true,service:'historicos-sec',version:VERSION});
  }
  const ticker = String(url.searchParams.get('ticker') || '').trim().toUpperCase();
  if (!/^[A-Z][A-Z0-9.\-]{0,11}$/.test(ticker))
    return reply(400,{code:'INVALID_TICKER',error:'Ticker no válido.'});
  try {
    const company = await findTicker(ticker);
    if (!company) return reply(404,{code:'NOT_FOUND',error:'Ticker no identificado en el listado SEC.'});
    const cik = String(company.cik).padStart(10,'0');
    const raw = await getJson('https://data.sec.gov/api/xbrl/companyfacts/CIK'+cik+'.json','Company Facts SEC');
    let report;
    try { report = parseCompanyFacts(raw); }
    catch (err) {
      return reply(422,{code:'PARSER',error:'La respuesta SEC no pudo transformarse en estados financieros.',detail:String(err?.message || err).slice(0,180)});
    }
    return reply(200,{...report,ticker:company.ticker,company:company.name});
  } catch (err) {
    return reply(502,{code:'SEC_UPSTREAM',error:'No se pudo completar la consulta oficial a la SEC.',detail:String(err?.message || err).slice(0,180)});
  }
}
