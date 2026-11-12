'use strict';
// Ejecutar desde raíz del repositorio: node tests/deuda-sec-historicos.cjs
// Casos estructurados sintéticos que reproducen partidas de 10-K oficiales.
// NO demuestran que Company Facts devuelva siempre estas etiquetas.
const assert = require('node:assert/strict');
const {parseCompanyFacts,applyOverrides} = require('../src/sec-historico.cjs');
function make({end='2025-09-27',revenue=100000,current,noncurrent,aggregate,commercialPaper,borrowings,shortGeneric,cash=35934}={}){
 const [year]=end.split('-');
 const usgaap={};
 function instant(tag,amount){if(amount===undefined)return;usgaap[tag]={units:{USD:[{val:amount*1e6,end,form:'10-K',fp:'FY',filed:'2026-10-31',accn:'0000320193-25-000079'}]}};}
 usgaap.Revenues={units:{USD:[{val:revenue*1e6,start:String(+year-1)+'-09-28',end,form:'10-K',fp:'FY',filed:'2026-10-31',accn:'0000320193-25-000079'}]}};
 instant('Assets',359241);
 instant('StockholdersEquity',73733);
 instant('CashAndCashEquivalentsAtCarryingValue',cash);
 instant('LongTermDebtCurrent',current);
 instant('LongTermDebtNoncurrent',noncurrent);
 instant('LongTermDebtAndFinanceLeaseObligationsIncludingCurrentMaturities',aggregate);
 instant('CommercialPaper',commercialPaper);
 instant('ShortTermBorrowings',borrowings);
 instant('ShortTermDebtCurrent',shortGeneric);
 return {cik:320193,entityName:'TEST',facts:{'us-gaap':usgaap}};
}
const tests=[
 ['Apple FY2025 (deuda a plazo y papel comercial)',{current:12350,noncurrent:78328,commercialPaper:7979},98657],
 ['Apple: commercial paper incluido en préstamos agregados',{current:12350,noncurrent:78328,commercialPaper:7979,borrowings:7979},98657],
 ['Agregado a plazo sin doble contar porciones',{current:12350,noncurrent:78328,aggregate:90678,commercialPaper:7979},98657],
 ['Microsoft FY2025 (sin papel comercial)',{current:2999,noncurrent:40152,commercialPaper:0},43151],
 ['Microsoft FY2024',{current:2249,noncurrent:42688,commercialPaper:6693},51630],
 ['Coca-Cola FY2025 préstamos agregados',{current:1822,noncurrent:42119,commercialPaper:1495,borrowings:1551},45492],
 ['Préstamos agregados mayores que papel comercial',{aggregate:90678,commercialPaper:7979,borrowings:9000},99678],
 ['Inconsistencia préstamos menores que commercial paper',{aggregate:90678,commercialPaper:7979,borrowings:5000},null],
 ['Etiqueta genérica ambigua de deuda corriente',{aggregate:90678,commercialPaper:7979,shortGeneric:5000},null],
 ['Solo deuda a plazo sin papel comercial',{current:12350,noncurrent:78328},90678],
 ['Sin componente corriente ni agregado',{noncurrent:78328,commercialPaper:7979},null]
];
let done=0;
for(const [name,values,expected] of tests){
 const row=parseCompanyFacts(make(values)).rows[0];
 const actual=row.amounts.totalDebt?.v/1e6??null;
 assert.equal(actual,expected,name);
 done++;
}
const raw=parseCompanyFacts(make({current:12350,noncurrent:78328,commercialPaper:7979}));
const fixed=applyOverrides(raw,{'2025-09-27|commercialPaper':{value:8500e6,reason:'Prueba'}});
assert.equal(fixed.rows[0].amounts.totalDebt.v/1e6,99178);
assert.equal(raw.rows[0].amounts.totalDebt.v/1e6,98657);
done++;
console.log('OK:',done,'comprobaciones de reconciliación deuda / restauración SEC');
