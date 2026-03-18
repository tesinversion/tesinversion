// ============================================================
// tesinversion.com — FMP API Module v3.0
// Endpoints /stable/ — compatibles con cuentas creadas desde sep 2025
// v3.0: sistema de overrides por empresa + alias de campos
// ============================================================

const FMP = (() => {

  const API_KEY = 'TCDhj4RvIjXmklFbjT3KqGCWfyCil0W0';
  const BASE    = 'https://financialmodelingprep.com/stable';

  // Cache en memoria (evita llamadas repetidas en la misma sesión)
  const _cache = {};
  async function _get(url) {
    if (_cache[url]) return _cache[url];
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      _cache[url] = data;
      return data;
    } catch (e) {
      console.error('[FMP]', e.message);
      return null;
    }
  }

  // ── ENDPOINTS /stable/ ────────────────────────────────────
  const ep = {
    profile:       (t) => `${BASE}/profile?symbol=${t}&apikey=${API_KEY}`,
    income:        (t) => `${BASE}/income-statement?symbol=${t}&period=annual&limit=7&apikey=${API_KEY}`,
    balance:       (t) => `${BASE}/balance-sheet-statement?symbol=${t}&period=annual&limit=7&apikey=${API_KEY}`,
    cashflow:      (t) => `${BASE}/cash-flow-statement?symbol=${t}&period=annual&limit=7&apikey=${API_KEY}`,
    metrics:       (t) => `${BASE}/key-metrics?symbol=${t}&period=annual&limit=7&apikey=${API_KEY}`,
    quote:         (t) => `${BASE}/quote?symbol=${t}&apikey=${API_KEY}`,
    earnings:      (t) => `${BASE}/earnings-surprises?symbol=${t}&apikey=${API_KEY}`,
    institutional: (t) => `${BASE}/institutional-ownership/list?symbol=${t}&apikey=${API_KEY}`,
    insider:       (t) => `${BASE}/insider-trading?symbol=${t}&limit=10&apikey=${API_KEY}`,
  };

  // ── LOGOS — Clearbit Logo API (gratuito) ──────────────────
  const LOGO_DOMAINS = {
    'RACE':'ferrari.com','MSFT':'microsoft.com','ASML':'asml.com',
    'AAPL':'apple.com','GOOGL':'google.com','AMZN':'amazon.com',
    'NVDA':'nvidia.com','META':'meta.com','V':'visa.com',
    'MA':'mastercard.com','RMS':'hermes.com','MC':'lvmh.com',
    'SAP':'sap.com','ADYEN':'adyen.com','NVO':'novonordisk.com',
  };
  function getLogoUrl(ticker) {
    const d = LOGO_DOMAINS[ticker.toUpperCase()];
    return d ? `https://logo.clearbit.com/${d}` : null;
  }

  // ── FETCH EN PARALELO ─────────────────────────────────────
  async function fetchAll(ticker) {
    const T = ticker.toUpperCase();
    const [profile, income, balance, cashflow, metrics, quote, earnings, institutional, insider] =
      await Promise.all([
        _get(ep.profile(T)), _get(ep.income(T)), _get(ep.balance(T)),
        _get(ep.cashflow(T)), _get(ep.metrics(T)), _get(ep.quote(T)),
        _get(ep.earnings(T)), _get(ep.institutional(T)), _get(ep.insider(T)),
      ]);
    return { profile, income, balance, cashflow, metrics, quote, earnings, institutional, insider };
  }

  // ── FÓRMULAS tesinversion.com ─────────────────────────────
  // Todas las fórmulas vienen del documento FORMULAS.docx de la autora.
  // NO modificar sin autorización.

  // ROIC = EBIT × (1-t) / Capital Invertido × 100
  // Capital Invertido = Equity + DeudaTotal + OperatingLeases − MarketableSecurities
  function calcROIC(ebit, taxRate, equity, debtST, debtLT, leaseCurr, leaseNonCurr, mktSec) {
    const nopat = ebit * (1 - taxRate);
    const ci = equity + (debtST||0) + (debtLT||0) + (leaseCurr||0) + (leaseNonCurr||0) - (mktSec||0);
    return ci > 0 ? (nopat / ci) * 100 : null;
  }

  // FCF = EBITDA − CapEx mantenimiento − Intereses − Taxes − Variación WC
  // CapEx mantenimiento = PP&E (purchase of property, plant and equipment)
  function calcFCF(ebitda, capexMaint, intNet, taxPaid, deltaWC) {
    return ebitda - Math.abs(capexMaint) - intNet - taxPaid - deltaWC;
  }

  // Posición financiera = Deuda financiera − Caja total
  // (positivo = deuda neta, negativo = caja neta)
  function calcNetPos(cash, mktSec, debtST, debtLT, leaseCurr, leaseNonCurr) {
    const debt = (debtST||0)+(debtLT||0)+(leaseCurr||0)+(leaseNonCurr||0);
    return debt - (cash||0) - (mktSec||0);
  }

  // Growth Capex (orgánico) = Capex Total − D&A
  function calcGrowthCapex(capexTotal, da) {
    return Math.max(0, Math.abs(capexTotal) - da);
  }

  // Tasa de reinversión orgánica = Growth Capex / FCF × 100
  function calcReinvRate(growthCapex, fcf) {
    return fcf > 0 ? (growthCapex / fcf) * 100 : null;
  }

  // ── TRANSFORMAR DATOS ─────────────────────────────────────
  function transform(raw, ticker) {
    const { profile: pArr, income, balance, cashflow, metrics, quote: qArr, earnings, institutional, insider } = raw;
    const p = Array.isArray(pArr) ? pArr[0] : pArr;
    const q = Array.isArray(qArr) ? qArr[0] : qArr;
    if (!p) return null;

    const inc = [...(income   || [])].reverse();
    const bal = [...(balance  || [])].reverse();
    const cf  = [...(cashflow || [])].reverse();
    const met = [...(metrics  || [])].reverse();
    const years = inc.map(r => String(r.calendarYear || r.date?.substring(0,4) || ''));

    const computed = inc.map((row, i) => {
      const b = bal[i]||{}, c = cf[i]||{}, m = met[i]||{};
      const rev    = row.revenue||0, gp = row.grossProfit||0;
      const ebit   = row.operatingIncome||0;
      const da     = Math.abs(row.depreciationAndAmortization||0);
      const ebitda = row.ebitda||(ebit+da);
      const ni     = row.netIncome||0;
      const eps    = row.epsDiluted||row.eps||0;
      const shares = row.weightedAverageSharesDiluted||row.weightedAverageShsOutDil||0;
      const intExp = Math.abs(row.interestExpense||0);
      const intInc = Math.abs(row.interestIncome||0);
      const intNet = intExp - intInc;
      const taxRate = (ni && row.incomeTaxExpense)
        ? Math.abs(row.incomeTaxExpense)/(Math.abs(ni)+Math.abs(row.incomeTaxExpense)) : 0.24;

      const cash=b.cashAndCashEquivalents||0, mktSec=b.shortTermInvestments||0;
      const debtST=b.shortTermDebt||0, debtLT=b.longTermDebt||0;
      const equity=b.totalStockholdersEquity||0, assets=b.totalAssets||0;
      const inv=b.inventory||0, recv=b.netReceivables||0, pay=b.accountPayables||0;
      const leaseCurr=b.operatingLeaseLiability||0;
      const leaseNonCurr=b.longTermOperatingLeaseLiability||0;

      const capexTotal = c.capitalExpenditure||c.purchasesOfPropertyPlantAndEquipment||0;
      const taxPaid    = Math.abs(c.taxesPaid||c.incomeTaxesPaid||(ni*taxRate));
      const buybacks   = c.commonStockRepurchased||c.repurchaseOfCommonStock||0;
      const divPaid    = c.dividendsPaid||c.commonDividendsPaid||0;
      const acqNet     = c.acquisitionsNet||0;

      const wc    = inv+recv-pay;
      const prevB = bal[i-1]||{};
      const prevWC= (prevB.inventory||0)+(prevB.netReceivables||0)-(prevB.accountPayables||0);
      const deltaWC = i>0 ? wc-prevWC : 0;

      const fcf        = calcFCF(ebitda, da, intNet, taxPaid, deltaWC);
      const roic       = calcROIC(ebit, taxRate, equity, debtST, debtLT, leaseCurr, leaseNonCurr, mktSec);
      const netPos     = calcNetPos(cash, mktSec, debtST, debtLT, leaseCurr, leaseNonCurr);
      const growthCapex= calcGrowthCapex(capexTotal, da);
      const reinvRate  = calcReinvRate(growthCapex, fcf);

      const isLast  = i === inc.length-1;
      const price   = isLast ? (q?.price||p.price||0) : 0;
      const mktCap  = isLast ? (q?.marketCap||p.mktCap||0) : (m.marketCap||0);
      const ev      = mktCap + netPos;

      const rowData = {
        year:years[i],
        // ── Ingresos y márgenes ──
        rev, gp, ebit, ebitda, da, ni, eps, shares, intNet, taxPaid,
        taxRate:taxRate*100,
        // ── CapEx y caja ──
        capexTotal, growthCapex, acqNet, buybacks, divPaid, fcf, wc, deltaWC,
        // ── Balance ──
        cash, mktSec, debtST, debtLT, equity, assets, netPos,
        // ── Mercado ──
        ev, mktCap, price,
        // ── Retornos ──
        roic, reinvRate,
        icr:intExp>0?ebit/intExp:null,
        roe:equity>0?(ni/equity)*100:null,
        roa:assets>0?(ni/assets)*100:null,
        // ── FCF metrics ──
        fcfPS:shares>0?fcf/shares:null,
        fcfYield:shares>0&&price>0?(fcf/shares/price)*100:null,
        fcfConv:ni>0?(fcf/ni)*100:null,
        // ── Distribución ──
        payoutDiv:ni>0?(Math.abs(divPaid)/ni)*100:null,
        payoutTotal:fcf>0?((Math.abs(divPaid)+Math.abs(buybacks))/fcf)*100:null,
        // ── Márgenes % ──
        grossMargin:rev?(gp/rev)*100:0,
        ebitMargin:rev?(ebit/rev)*100:0,
        ebitdaMargin:rev?(ebitda/rev)*100:0,
        netMargin:rev?(ni/rev)*100:0,
        fcfMargin:rev?(fcf/rev)*100:0,
        // ── Múltiplos ──
        per:eps>0&&price>0?price/eps:(m.peRatio||null),
        evEbitda:ebitda>0&&ev>0?ev/ebitda:null,
        evEbit:ebit>0&&ev>0?ev/ebit:null,
        evFcf:fcf>0&&ev>0?ev/fcf:null,
        ps:rev>0&&mktCap>0?mktCap/rev:null,
        pbv:m.priceToBookRatio||null,
        debtEbitda:ebitda>0?netPos/ebitda:null,
      };

      // ── ALIAS para compatibilidad con dashboard-connect.js ─
      // Algunos nombres históricos que puede usar el HTML
      rowData.revenue     = rowData.rev;
      rowData.grossProfit = rowData.gp;
      rowData.netIncome   = rowData.ni;
      rowData.netPosition = rowData.netPos;
      rowData.marketSec   = rowData.mktSec;
      rowData.dilutedShares = rowData.shares;

      return rowData;
    });

    // ── ROIC Incremental ──────────────────────────────────
    const roicIncremental = computed.map((row, i) => {
      if (i===0) return null;
      const prev=computed[i-1];
      const dNOPAT = (row.ebit*(1-row.taxRate/100)) - (prev.ebit*(1-prev.taxRate/100));
      const ci  = row.equity+row.debtST+row.debtLT-row.mktSec;
      const ciP = prev.equity+prev.debtST+prev.debtLT-prev.mktSec;
      const dCI = ci-ciP;
      return Math.abs(dCI)>1000 ? (dNOPAT/dCI)*100 : null;
    });

    // ── Red flags ─────────────────────────────────────────
    const rf = {revDecline:0,ebitMarginDec:0,fcfNeg:0,roicBelow10:0,debtHigh:0,epsDecline:0};
    computed.forEach((r,i)=>{
      if(i===0)return; const p2=computed[i-1];
      if(r.rev<p2.rev) rf.revDecline++;
      if(r.ebitMargin<p2.ebitMargin) rf.ebitMarginDec++;
      if(r.fcf<0) rf.fcfNeg++;
      if(r.roic!==null&&r.roic<10) rf.roicBelow10++;
      if(r.debtEbitda!==null&&r.debtEbitda>2.5) rf.debtHigh++;
      if(r.eps<p2.eps) rf.epsDecline++;
    });

    const capAlloc = computed.map((r,i)=>({
      year:r.year, fcf:r.fcf,
      dividends:Math.abs(r.divPaid), buybacks:Math.abs(r.buybacks),
      growthCapex:r.growthCapex,
      debtRepay:Math.max(0,(computed[i-1]?.debtLT||0)-r.debtLT),
      cashAccum:Math.max(0,r.cash-(computed[i-1]?.cash||0)),
    }));

    const earningsHistory = (earnings||[]).slice(0,12).map(e=>({
      date:e.date, epsEstimate:e.estimatedEps||e.epsEstimated,
      epsActual:e.actualEps||e.eps,
      beat:(e.actualEps||e.eps)>(e.estimatedEps||e.epsEstimated),
      surprise:e.epsSurprisePercentage||e.surprisePercentage,
    }));

    const topInstitutional = (institutional||[])
      .sort((a,b)=>(b.sharesHeld||b.shares||0)-(a.sharesHeld||a.shares||0))
      .slice(0,8).map(s=>({
        name:s.investorName||s.holder,
        shares:s.sharesHeld||s.shares,
        pct:s.ownershipPercent||s.sharesPercentage||0,
      }));

    const recentInsiders = (insider||[]).slice(0,10).map(t=>({
      name:t.reportingName||t.insiderName,
      type:t.transactionType,
      shares:t.securitiesTransacted||t.shares,
      date:t.transactionDate||t.filingDate,
      isBuy:(t.transactionType||'').toLowerCase().includes('purchase')||(t.securitiesTransacted||0)>0,
    }));

    const base = {
      ticker:p.symbol||ticker, name:p.companyName, description:p.description,
      sector:p.sector, industry:p.industry, exchange:p.exchangeShortName,
      ceo:p.ceo, country:p.country, website:p.website,
      employees:p.fullTimeEmployees, ipoDate:p.ipoDate,
      image:p.image, logo:getLogoUrl(ticker),
      price:q?.price||p.price, change:q?.change||p.changes,
      changePct:q?.changesPercentage||p.changesPercentage,
      marketCap:q?.marketCap||p.mktCap, beta:p.beta,
      years, computed, roicIncremental, capitalAllocation:capAlloc,
      redFlags:rf, last:computed[computed.length-1]||{},
      earningsHistory, topInstitutional, recentInsiders,
    };

    return applyOverrides(base, ticker);
  }

  // ── SISTEMA DE OVERRIDES ──────────────────────────────────
  // Aplica datos verificados manualmente contra Annual Reports.
  // Los archivos de override van en /data/<ticker>-overrides.js
  // y deben cargarse ANTES de fmp-api.js en el HTML.
  // Estructura del archivo: const RACE_OVERRIDES = { _meta:{...}, 2023:{...}, ... }
  //
  // Regla: si hay override para un campo, gana sobre el dato de FMP.
  // Si no hay override, el dato de FMP pasa sin cambios.
  // Los márgenes (%) se recalculan automáticamente si hay override de rev/ebit/etc.
  // Los ROIC overrides se almacenan en _roic:{año:valor} por separado.

  function applyOverrides(transformed, ticker) {
    const key = ticker.toUpperCase() + '_OVERRIDES';
    const co  = window[key];
    if (!co) return transformed;  // sin override → datos FMP puros

    const result = { ...transformed };

    result.computed = transformed.computed.map(row => {
      const yr = parseInt(row.year);
      const yearData = co[yr];

      // ROIC override (se guarda separado en _roic)
      const roicOverride = co._roic ? co._roic[yr] : null;

      if (!yearData && !roicOverride) return row;  // año sin overrides

      const patched = { ...row };

      // Aplicar overrides campo por campo
      if (yearData) {
        Object.entries(yearData).forEach(([field, value]) => {
          if (field.startsWith('_')) return;  // ignorar metadatos
          patched[field] = value;
          patched[`${field}_verified`] = true;  // marca de auditoría
        });
      }

      // ROIC override separado
      if (roicOverride !== null && roicOverride !== undefined) {
        patched.roic = roicOverride;
        patched.roic_verified = true;
      }

      // Recalcular márgenes derivados para que sean consistentes
      // con los valores overrideados
      const r = patched.rev || row.rev;
      if (r) {
        patched.grossMargin   = patched.gp      ? (patched.gp      / r) * 100 : row.grossMargin;
        patched.ebitMargin    = patched.ebit     ? (patched.ebit    / r) * 100 : row.ebitMargin;
        patched.ebitdaMargin  = patched.ebitda   ? (patched.ebitda  / r) * 100 : row.ebitdaMargin;
        patched.netMargin     = patched.ni       ? (patched.ni      / r) * 100 : row.netMargin;
        patched.fcfMargin     = patched.fcf      ? (patched.fcf     / r) * 100 : row.fcfMargin;
        patched.fcfConv       = patched.ni && patched.fcf ? (patched.fcf / patched.ni) * 100 : row.fcfConv;
      }

      // Actualizar alias también
      patched.revenue      = patched.rev;
      patched.grossProfit  = patched.gp;
      patched.netIncome    = patched.ni;
      patched.netPosition  = patched.netPos;
      patched.marketSec    = patched.mktSec;
      patched.dilutedShares = patched.shares;

      return patched;
    });

    // Actualizar el último año (last) con los datos parchados
    result.last = result.computed[result.computed.length - 1] || {};

    // Guardar metadata del override para mostrar en UI si se desea
    result._overrideMeta = co._meta || null;

    return result;
  }

  // ── FUNCIÓN PRINCIPAL ─────────────────────────────────────
  async function load(ticker) {
    const raw = await fetchAll(ticker);
    if (!raw) return null;
    return transform(raw, ticker);
    // Nota: applyOverrides() se llama dentro de transform()
    // Los overrides se aplican automáticamente si existe window[TICKER_OVERRIDES]
  }

  // ── FORMATEADORES ─────────────────────────────────────────
  const fmt = {
    big:(n,dec=1,cur='')=>{
      if(n===null||n===undefined||isNaN(n))return'—';
      const a=Math.abs(n),s=n<0?'−':'';
      if(a>=1e9)return s+cur+(a/1e9).toFixed(dec)+'B';
      if(a>=1e6)return s+cur+(a/1e6).toFixed(dec)+'M';
      if(a>=1e3)return s+cur+(a/1e3).toFixed(dec)+'K';
      return s+cur+a.toFixed(dec);
    },
    pct:(n,dec=1)=>(n!=null&&!isNaN(n))?n.toFixed(dec)+'%':'—',
    mult:(n,dec=1)=>(n!=null&&!isNaN(n))?n.toFixed(dec)+'x':'—',
    price:(n,sym='$',dec=2)=>(n!=null&&!isNaN(n))?sym+n.toFixed(dec):'—',
    num:(n)=>(n!=null&&!isNaN(n))?Math.round(n).toLocaleString('es'):'—',
  };

  return { load, fmt, getLogoUrl };

})();
