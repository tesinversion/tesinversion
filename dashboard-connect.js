// ============================================================
// tesinversion.com — Integración del dashboard con datos reales
// Incluir DESPUÉS de fmp-api.js y ANTES del cierre de </body>
// ============================================================

(async function initDashboard() {

  // ── TICKER ───────────────────────────────────────────────
  // Leer el ticker desde la URL (?ticker=RACE) o usar Ferrari por defecto
  const params = new URLSearchParams(window.location.search);
  const TICKER = params.get('ticker') || 'RACE';

  // ── ESTADO DE CARGA ──────────────────────────────────────
  showLoadingState(true);

  // ── CARGAR DATOS ─────────────────────────────────────────
  const data = await FMP.load(TICKER);

  if (!data) {
    showError('No se pudieron cargar los datos. Verifica tu API key.');
    return;
  }

  // ── RELLENAR EL DASHBOARD ────────────────────────────────
  fillHeader(data);
  fillResumen(data);
  fillFinancieros(data);
  fillRetornoCapital(data);
  fillSaludFinanciera(data);
  fillCapitalAllocation(data);
  fillValoracion(data);
  fillScorecard(data);
  fillGuidance(data);
  fillAccionistas(data);
  fillRedFlags(data);

  showLoadingState(false);

  // ── HEADER ───────────────────────────────────────────────
  function fillHeader(d) {
    setText('[data-field="company-name"]',  d.name);
    setText('[data-field="ticker-line"]',   `${d.exchange}: ${d.ticker} · ${d.sector} · ${d.industry}`);
    setText('[data-field="price"]',         FMP.fmt.price(d.price));
    setText('[data-field="change"]',        `${d.change >= 0 ? '+' : ''}${FMP.fmt.price(d.change)} ${d.changePct >= 0 ? '+' : ''}${FMP.fmt.pct(d.changePct)} hoy`);
    setStyle('[data-field="change"]', 'color', d.changePct >= 0 ? 'var(--green-t)' : 'var(--red-t)');
    setText('[data-field="market-cap"]',    FMP.fmt.big(d.marketCap));
    setText('[data-field="net-position"]',  d.last.netPosition < 0 ? `+${FMP.fmt.big(Math.abs(d.last.netPosition))} caja neta` : FMP.fmt.big(d.last.netPosition) + ' deuda neta');
    setStyle('[data-field="net-position"]', 'color', d.last.netPosition < 0 ? 'var(--green-t)' : 'var(--red-t)');
    setText('[data-field="eps"]',           FMP.fmt.price(d.last.eps));
    setText('[data-field="employees"]',     FMP.fmt.num(d.employees));
    setText('[data-field="ceo"]',           d.ceo || '—');
    setText('[data-field="website"]',       d.website || '—');
    setText('[data-field="quality-score"]', calcQualityScore(d) + '/100');
  }

  // ── RESUMEN — MÉTRICAS CLAVE ─────────────────────────────
  function fillResumen(d) {
    const l = d.last;

    // Métricas grid
    setMetricTile('revenue',        FMP.fmt.big(l.revenue), pctChange(d, 'revenue'));
    setMetricTile('ebit',           FMP.fmt.big(l.ebit),    `Margen: ${FMP.fmt.pct(l.ebitMargin)}`);
    setMetricTile('net-income',     FMP.fmt.big(l.netIncome), `Margen: ${FMP.fmt.pct(l.netMargin)}`);
    setMetricTile('fcf',            FMP.fmt.big(l.fcf),     `Conv: ${FMP.fmt.pct(l.fcfConv)}`);
    setMetricTile('fcf-per-share',  FMP.fmt.price(l.fcfPS), 'FCF / acc. diluidas');
    setMetricTile('fcf-yield',      FMP.fmt.pct(l.fcfYield),'FCF/acción ÷ precio');
    setMetricTile('eps',            FMP.fmt.price(l.eps),   pctChange(d, 'eps'));
    setMetricTile('roic',           FMP.fmt.pct(l.roic),    `Media 5A: ${FMP.fmt.pct(avg5(d, 'roic'))}`);
    setMetricTile('per',            FMP.fmt.mult(l.per),    'Media histórica calculada');
    setMetricTile('ev-ebitda',      FMP.fmt.mult(l.evEbitda),'EV / EBITDA');
    setMetricTile('payout-div',     FMP.fmt.pct(l.payoutDiv), 'Dividendos / beneficio neto');
    setMetricTile('payout-total',   FMP.fmt.pct(l.payoutTotal), 'Divid. + recompras / FCF');
  }

  // ── FINANCIEROS — P&L TABLE ──────────────────────────────
  function fillFinancieros(d) {
    // Actualizar cabeceras con años reales
    const headers = d.years.slice(-5);
    headers.forEach((yr, i) => {
      setText(`[data-year-col="${i}"]`, yr);
    });

    const rows = d.computed.slice(-5);

    // Revenue
    setFinRow('revenue',       rows.map(r => FMP.fmt.big(r.revenue)));
    setFinRow('gross-profit',  rows.map(r => FMP.fmt.big(r.grossProfit)));
    setFinRow('gross-margin',  rows.map(r => FMP.fmt.pct(r.grossMargin)));
    setFinRow('ebit',          rows.map(r => FMP.fmt.big(r.ebit)));
    setFinRow('ebit-margin',   rows.map(r => FMP.fmt.pct(r.ebitMargin)));
    setFinRow('ebitda',        rows.map(r => FMP.fmt.big(r.ebitda)));
    setFinRow('ebitda-margin', rows.map(r => FMP.fmt.pct(r.ebitdaMargin)));
    setFinRow('net-income',    rows.map(r => FMP.fmt.big(r.netIncome)));
    setFinRow('net-margin',    rows.map(r => FMP.fmt.pct(r.netMargin)));
    setFinRow('eps',           rows.map(r => FMP.fmt.price(r.eps)));
    setFinRow('fcf',           rows.map(r => FMP.fmt.big(r.fcf)));
    setFinRow('fcf-per-share', rows.map(r => FMP.fmt.price(r.fcfPS)));
    setFinRow('fcf-yield',     rows.map(r => FMP.fmt.pct(r.fcfYield)));
    setFinRow('fcf-conv',      rows.map(r => FMP.fmt.pct(r.fcfConv)));
  }

  // ── RETORNO CAPITAL ──────────────────────────────────────
  function fillRetornoCapital(d) {
    const l = d.last;
    setText('[data-field="roic-current"]',  FMP.fmt.pct(l.roic));
    setText('[data-field="roic-avg5"]',     FMP.fmt.pct(avg5(d, 'roic')));
    setText('[data-field="roic-incremental"]', FMP.fmt.pct(d.roicIncremental[d.roicIncremental.length - 1]));
    setText('[data-field="roe"]',           FMP.fmt.pct(l.roe));
    setText('[data-field="roa"]',           FMP.fmt.pct(l.roa));
    setText('[data-field="reinv-rate"]',    FMP.fmt.pct(l.reinvRate));
    setText('[data-field="fcf-conv"]',      FMP.fmt.pct(l.fcfConv));

    // Actualizar gráfico ROIC histórico
    updateChartData('roicHistChart', d.years, d.computed.map(r => r.roic));
    updateChartData('roicIncrChart', d.years, d.roicIncremental);
  }

  // ── SALUD FINANCIERA ─────────────────────────────────────
  function fillSaludFinanciera(d) {
    const l = d.last;
    const debtEbitda = l.debtEbitda;

    setText('[data-field="debt-total"]',    FMP.fmt.big(l.debtST + l.debtLT));
    setText('[data-field="cash-total"]',    FMP.fmt.big(l.cash + l.marketSec));
    setText('[data-field="net-position"]',  l.netPosition < 0
      ? `+${FMP.fmt.big(Math.abs(l.netPosition))} caja neta`
      : FMP.fmt.big(l.netPosition) + ' deuda neta');
    setText('[data-field="icr"]',           FMP.fmt.mult(l.icr));
    setText('[data-field="debt-ebitda"]',   FMP.fmt.mult(debtEbitda));
    setText('[data-field="debt-ebitda-label"]',
      debtEbitda < 0 ? 'Caja neta — señal verde' :
      debtEbitda < 2 ? 'Deuda controlada — señal verde' :
      debtEbitda < 4 ? 'Deuda elevada — señal amarilla' :
                       'Deuda crítica — señal roja');

    // Actualizar tacómetros
    if (typeof drawGauges === 'function') {
      window._gaugeDebtVal = debtEbitda;
      window._gaugeICRVal  = l.icr;
      drawGauges();
    }

    // WC
    setText('[data-field="wc"]', FMP.fmt.big(l.wc));

    // Gráfico deuda histórica
    updateChartData('debtEvChart', d.years, d.computed.map(r => -(r.netPosition / 1e6)));
  }

  // ── CAPITAL ALLOCATION ───────────────────────────────────
  function fillCapitalAllocation(d) {
    updateCapitalAllocChart(d.capitalAllocation, d.years);
    updateChartData('buybackChart', d.years, d.computed.map(r => Math.abs(r.buybacks) / 1e6));
    updateChartData('sharesChart',  d.years, d.computed.map(r => r.dilutedShares / 1e6));
  }

  // ── VALORACIÓN ───────────────────────────────────────────
  function fillValoracion(d) {
    const l = d.last;
    setText('[data-field="per-current"]',       FMP.fmt.mult(l.per));
    setText('[data-field="ev-ebitda-current"]',  FMP.fmt.mult(l.evEbitda));
    setText('[data-field="ev-ebit-current"]',    FMP.fmt.mult(l.evEbit));
    setText('[data-field="ev-fcf-current"]',     FMP.fmt.mult(l.evFcf));
    setText('[data-field="ps-current"]',         FMP.fmt.mult(l.ps));
    setText('[data-field="pbv-current"]',        FMP.fmt.mult(l.pbv));

    // Precio para retorno ≥15%
    const price15 = calcPrice15(d);
    setText('[data-field="price-15pct"]', FMP.fmt.price(price15));
  }

  // ── SCORECARD / ÍNDICE DE CALIDAD ────────────────────────
  function fillScorecard(d) {
    const score = calcQualityScore(d);
    setText('[data-field="quality-score-total"]', score + '/100');

    // Actualizar barras individuales
    const scores = calcQualityScoreBreakdown(d);
    Object.entries(scores).forEach(([key, val]) => {
      const bar = document.querySelector(`[data-score-bar="${key}"]`);
      const pts = document.querySelector(`[data-score-pts="${key}"]`);
      if (bar) bar.style.width = (val * 10) + '%';
      if (pts) pts.textContent  = val.toFixed(1) + '/10';
      if (pts) pts.className = 'score-pts ' + (val >= 8 ? 'high' : val >= 6 ? 'mid' : 'low');
    });
  }

  // ── GUIDANCE ─────────────────────────────────────────────
  function fillGuidance(d) {
    const tbody = document.querySelector('[data-earnings-tbody]');
    if (!tbody || !d.earningsHistory.length) return;

    tbody.innerHTML = d.earningsHistory.slice(0, 8).map(e => {
      const diff    = e.epsActual && e.epsEstimate ? ((e.epsActual - e.epsEstimate) / Math.abs(e.epsEstimate) * 100) : null;
      const beat    = e.beat;
      const badgeCls = beat ? 'badge badge-green' : 'badge badge-red';
      const badgeTxt = beat ? 'Beat' : 'Miss';
      const diffTxt  = diff !== null ? `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%` : '—';

      return `<tr>
        <td>${e.date}</td>
        <td>EPS</td>
        <td class="num">${e.epsEstimate ? '$' + e.epsEstimate.toFixed(2) : '—'}</td>
        <td class="num">${e.epsActual   ? '$' + e.epsActual.toFixed(2)   : '—'}</td>
        <td><span class="${badgeCls}">${badgeTxt}</span></td>
        <td class="num ${beat ? 'pos' : 'neg'}">${diffTxt}</td>
      </tr>`;
    }).join('');

    // Tasa de cumplimiento
    const beats = d.earningsHistory.filter(e => e.beat).length;
    const total  = d.earningsHistory.filter(e => e.epsActual && e.epsEstimate).length;
    const rate   = total > 0 ? ((beats / total) * 100).toFixed(0) : '—';
    setText('[data-field="guidance-rate"]', rate + '%');
  }

  // ── ACCIONISTAS ──────────────────────────────────────────
  function fillAccionistas(d) {
    const wrap = document.querySelector('[data-institutional-tbody]');
    if (!wrap) return;
    wrap.innerHTML = d.topInstitutional.map(s => `
      <div class="sh-row">
        <span class="sh-name">${s.name}</span>
        <span class="sh-type">Institucional</span>
        <div class="sh-bar-bg"><div class="sh-bar" style="width:${Math.min(100, s.pct * 4)}%;background:#34c759"></div></div>
        <span class="sh-pct">${FMP.fmt.pct(s.pct, 1)}</span>
      </div>`).join('');

    updateChartData('sharesHistChart', d.years, d.computed.map(r => r.dilutedShares / 1e6));
  }

  // ── RED FLAGS AUTOMÁTICAS ────────────────────────────────
  function fillRedFlags(d) {
    const flags = d.redFlags;
    const l = d.last;

    // ROIC
    updateFlag('flag-roic', l.roic >= 15 ? 'green' : l.roic >= 8 ? 'yellow' : 'red',
      `ROIC ${FMP.fmt.pct(l.roic)}`,
      l.roic >= 15 ? `Supera umbral de calidad (15%). Media mercado: 13%.` :
      l.roic >= 8  ? `Por debajo del umbral de calidad (15%). Cerca de la media del mercado.` :
                     `Por debajo de la media del mercado (8%). Revisar deterioro estructural.`);

    // Deuda
    updateFlag('flag-debt', l.netPosition < 0 ? 'green' : l.debtEbitda < 2 ? 'green' : l.debtEbitda < 4 ? 'yellow' : 'red',
      l.netPosition < 0 ? `Caja neta ${FMP.fmt.big(Math.abs(l.netPosition))}` : `Deuda neta / EBITDA ${FMP.fmt.mult(l.debtEbitda)}`,
      l.netPosition < 0 ? 'Posición de caja neta — fortaleza financiera excepcional.' :
      l.debtEbitda < 2  ? 'Deuda controlada, por debajo del umbral de calidad (2x).' :
                          'Deuda elevada. Revisar capacidad de cobertura.');

    // FCF
    updateFlag('flag-fcf', l.fcfConv >= 80 ? 'green' : l.fcfConv >= 60 ? 'yellow' : 'red',
      `FCF conversion ${FMP.fmt.pct(l.fcfConv)}`,
      l.fcfConv >= 80 ? 'Alta calidad de earnings. El negocio convierte beneficio en caja real.' :
      l.fcfConv >= 60 ? 'FCF conversion moderada. Verificar si hay partidas no recurrentes.' :
                        `⚠️ FCF ${flags.yearsFCFNegative > 0 ? flags.yearsFCFNegative + ' años negativo consecutivos.' : 'por debajo del umbral de calidad.'}`);

    // Dilución
    const lastShares = d.computed[d.computed.length-1]?.dilutedShares;
    const firstShares = d.computed[0]?.dilutedShares;
    const dilution5y = firstShares ? ((lastShares - firstShares) / firstShares) * 100 : null;
    updateFlag('flag-dilution', dilution5y < 0 ? 'green' : dilution5y < 3 ? 'yellow' : 'red',
      dilution5y < 0 ? `Recompras netas: ${FMP.fmt.pct(dilution5y)}` : `Dilución neta: +${FMP.fmt.pct(dilution5y)}`,
      dilution5y < 0 ? 'Reducción neta del share count. Management alineado con accionistas.' :
                       'Share count creciendo. Verificar si recompras cubren las stock options.');
  }

  // ── CÁLCULO DEL ÍNDICE DE CALIDAD ───────────────────────
  // 10 criterios × 10 puntos = 100 puntos máximo
  function calcQualityScoreBreakdown(d) {
    const l   = d.last;
    const avg = (key, n=5) => avg5(d, key, n);

    // 1. ROIC consistente >15%
    const roicAvg  = avg('roic');
    const roic5Pct = d.computed.slice(-5).filter(r => r.roic >= 15).length / 5;
    const s1 = Math.min(10, roicAvg >= 25 ? 10 : roicAvg >= 15 ? 7 + roic5Pct*3 : roicAvg >= 8 ? 4 : 1);

    // 2. Márgenes estables o crecientes
    const margins = d.computed.slice(-5).map(r => r.ebitMargin);
    const margTrend = margins.length > 1 ? margins[margins.length-1] - margins[0] : 0;
    const s2 = margTrend > 2 ? 10 : margTrend > 0 ? 8 : margTrend > -2 ? 6 : margTrend > -5 ? 4 : 2;

    // 3. Salud financiera
    const s3 = l.netPosition < 0 ? 10 : l.debtEbitda < 1 ? 9 : l.debtEbitda < 2 ? 7 : l.debtEbitda < 3 ? 5 : l.debtEbitda < 4 ? 3 : 1;

    // 4. FCF conversion >80%
    const s4 = l.fcfConv >= 90 ? 10 : l.fcfConv >= 80 ? 8.5 : l.fcfConv >= 70 ? 6.5 : l.fcfConv >= 60 ? 5 : 3;

    // 5. Capital allocation y recompras
    const shares = d.computed.slice(-5).map(r => r.dilutedShares);
    const dilNet = shares.length > 1 ? (shares[shares.length-1] - shares[0]) / shares[0] * 100 : 0;
    const s5 = dilNet < -5 ? 10 : dilNet < 0 ? 8 : dilNet < 2 ? 6 : dilNet < 5 ? 4 : 2;

    // 6. Crecimiento EPS consistente
    const epsList  = d.computed.slice(-5).map(r => r.eps);
    const epsGrowY = epsList.filter((e, i) => i > 0 && e > epsList[i-1]).length;
    const s6 = epsGrowY >= 4 ? 10 : epsGrowY >= 3 ? 8 : epsGrowY >= 2 ? 6 : epsGrowY >= 1 ? 4 : 2;

    // 7. ROIC incremental vs WACC (estimado 8%)
    const wacc      = 8;
    const riLast5   = d.roicIncremental.slice(-5).filter(v => v !== null);
    const riAboveW  = riLast5.filter(v => v > wacc).length / Math.max(riLast5.length, 1);
    const s7 = riAboveW >= 0.8 ? 10 : riAboveW >= 0.6 ? 7.5 : riAboveW >= 0.4 ? 5 : 3;

    // 8. Guidance accuracy (basado en earningsHistory)
    const earns  = d.earningsHistory.filter(e => e.epsActual && e.epsEstimate);
    const beatPct = earns.length > 0 ? earns.filter(e => e.beat).length / earns.length : 0.5;
    const s8 = beatPct >= 0.85 ? 10 : beatPct >= 0.75 ? 8 : beatPct >= 0.65 ? 6 : beatPct >= 0.5 ? 4 : 2;

    // 9. Insider ownership (aproximado con compras recientes)
    const insiderBuys = d.recentInsiders.filter(t => t.isBuy).length;
    const s9 = insiderBuys >= 3 ? 10 : insiderBuys >= 2 ? 8 : insiderBuys >= 1 ? 6 : 4;

    // 10. Dilución neta
    const s10 = dilNet < -8 ? 10 : dilNet < -3 ? 8.5 : dilNet < 0 ? 7 : dilNet < 2 ? 5 : dilNet < 5 ? 3 : 1;

    return { roic: s1, margins: s2, debt: s3, fcfConv: s4, capitalAlloc: s5,
             epsGrowth: s6, roicIncr: s7, guidance: s8, insiders: s9, dilution: s10 };
  }

  function calcQualityScore(d) {
    const b = calcQualityScoreBreakdown(d);
    return Math.round(Object.values(b).reduce((a, v) => a + v, 0));
  }

  // Precio de compra para retorno anual ≥15% a 5 años
  function calcPrice15(d) {
    const fcfGrowth = 0.12; // CAGR FCF histórico
    const exitMult  = d.last.evFcf || 44;
    const shares    = d.last.dilutedShares;
    const netPos    = d.last.netPosition;
    const fcfYear5  = d.last.fcf * Math.pow(1 + fcfGrowth, 5);
    const evYear5   = fcfYear5 * exitMult;
    const mcYear5   = evYear5 - netPos;
    const priceYear5 = mcYear5 / shares;
    // Descontar al 15% para obtener precio de compra hoy
    return priceYear5 / Math.pow(1.15, 5);
  }

  // ── HELPERS ──────────────────────────────────────────────

  function avg5(d, key, n=5) {
    const vals = d.computed.slice(-n).map(r => r[key]).filter(v => v !== null && v !== undefined);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  }

  function pctChange(d, key) {
    const arr = d.computed.slice(-2).map(r => r[key]);
    if (arr.length < 2 || !arr[0]) return '';
    const chg = ((arr[1] - arr[0]) / Math.abs(arr[0])) * 100;
    return `${chg >= 0 ? '+' : ''}${chg.toFixed(1)}% vs año anterior`;
  }

  function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function setStyle(selector, prop, val) {
    const el = document.querySelector(selector);
    if (el) el.style[prop] = val;
  }

  function setMetricTile(key, value, sub) {
    setText(`[data-metric="${key}"] .mt-value`, value);
    setText(`[data-metric="${key}"] .mt-sub`,   sub || '');
  }

  function setFinRow(key, values) {
    const cells = document.querySelectorAll(`[data-fin-row="${key}"] td.num`);
    values.forEach((v, i) => { if (cells[i]) cells[i].textContent = v; });
  }

  function updateFlag(key, color, name, desc) {
    const el = document.querySelector(`[data-flag="${key}"]`);
    if (!el) return;
    const dot = el.querySelector('.flag-dot');
    const nameEl = el.querySelector('.flag-name');
    const descEl = el.querySelector('.flag-desc');
    const valEl  = el.querySelector('.flag-val');
    if (dot) { dot.className = 'flag-dot'; dot.classList.add(color); }
    if (nameEl) nameEl.textContent = name;
    if (descEl) descEl.textContent = desc;
    if (valEl)  { valEl.className = `flag-val ${color}`; }
  }

  function updateChartData(chartId, labels, data) {
    const instance = window.chartInstances && window.chartInstances[chartId];
    if (!instance) return;
    instance.data.labels = labels;
    instance.data.datasets[0].data = data;
    instance.update('none');
  }

  function updateCapitalAllocChart(alloc, years) {
    const instance = window.chartInstances && window.chartInstances['capAlloc'];
    if (!instance) return;
    const M = 1e6;
    instance.data.labels = years;
    instance.data.datasets[0].data = alloc.map(r => r.dividends / M);
    instance.data.datasets[1].data = alloc.map(r => r.buybacks / M);
    instance.data.datasets[2].data = alloc.map(r => r.growthCapex / M);
    instance.data.datasets[3].data = alloc.map(r => r.debtRepay / M);
    instance.data.datasets[4].data = alloc.map(r => r.cashAccum / M);
    instance.update('none');
  }

  function showLoadingState(loading) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = loading ? 'flex' : 'none';
  }

  function showError(msg) {
    showLoadingState(false);
    const el = document.getElementById('error-banner');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
    else alert(msg);
  }

})();
