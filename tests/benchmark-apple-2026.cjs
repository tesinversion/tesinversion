'use strict';
/* Benchmark financiero documental Apple FY2025/26.
   FUENTE: Apple FY2026 Form 10-K, presentado 2026-11-03:
   https://www.sec.gov/Archives/edgar/data/320193/000032019326000026/aapl-20260926.htm
   Todas las cantidades monetarias en USD millones de la fuente, convertidas a USD.
   Las filas se crean sintéticamente con la estructura SEC: NO sustituyen una
   validación real de Company Facts por red. */
const assert = require('node:assert/strict');
const {parseCompanyFacts,applyOverrides} = require('../src/sec-historico.cjs');
const cik=320193,entityName='APPLE BENCHMARK NO VIVO';
const entries={};
const DATA=[
 {year:2025,start:'2024-09-29',end:'2025-09-27',revenue:416161,ebit:133050,preTax:132729,tax:20719,cfo:111482,capex:12715,cp:7979,current:12350,long:78328,assets:359241,equity:73733,cash:35934,eps:7.46},
 {year:2026,start:'2025-09-28',end:'2026-09-26',revenue:478834,ebit:158063,preTax:159237,tax:27062,cfo:145097,capex:9041,cp:1997,current:9906,long:68208,assets:404548,equity:112093,cash:36305,eps:8.98}
];
function put(tag,unit,period,value,instant=false){
 const key=entries[tag]??={units:{}};
 const arr=key.units[unit]??=[];
 arr.push({end:period.end,...(instant?{}:{start:period.start}),val:value,form:'10-K',fp:'FY',filed:'2026-11-03',accn:'0000320193-26-000026',fy:2026});
}
for(const period of DATA){
 const money=[
 ['Revenues','revenue',false],
 ['OperatingIncomeLoss','ebit',false],
 ['IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest','preTax',false],
 ['IncomeTaxExpenseBenefit','tax',false],
 ['NetCashProvidedByUsedInOperatingActivities','cfo',false],
 ['PaymentsToAcquirePropertyPlantAndEquipment','capex',false],
 ['CommercialPaper','cp',true],
 ['LongTermDebtCurrent','current',true],
 ['LongTermDebtNoncurrent','long',true],
 ['Assets','assets',true],
 ['StockholdersEquity','equity',true],
 ['CashAndCashEquivalentsAtCarryingValue','cash',true]
 ];
 for(const [tag,key,instant] of money)put(tag,'USD',period,period[key]*1e6,instant);
 put('EarningsPerShareDiluted','USD/shares',period,period.eps);
}
const source={cik,entityName,facts:{'us-gaap':entries}};
const parsed=parseCompanyFacts(source);
const exact=(actual,expected,label)=>assert.equal(actual,expected,label);
const near=(actual,expected,label)=>assert.ok(Math.abs(actual-expected)<1e-8,label+': '+actual+' != '+expected);
assert.deepEqual(parsed.rows.map(r=>r.year),[2025,2026]);
const [fy25,fy26]=parsed.rows.map(r=>r.amounts);
exact(fy25.totalDebt.v/1e6,98657,'Apple FY25 deudas reconocidas');
exact(fy26.totalDebt.v/1e6,80111,'Apple FY26 deudas reconocidas');
exact(fy26.netDebt.v/1e6,43806,'Apple FY26 deuda neta solo caja');
exact(fy26.fcf.v/1e6,136056,'Apple FY26 FCF CFO-CapEx');
exact(fy25.fcf.v/1e6,98767,'Apple FY25 FCF CFO-CapEx');
near(fy26.revenueGrowth.v,(478834/416161-1)*100,'Crecimiento 2026');
near(fy26.ebitMargin.v,158063/478834*100,'Margen EBIT 2026');
near(fy26.taxRate.v,27062/159237*100,'Impuestos efectivos 2026');
near(fy26.epsGrowth.v,(8.98/7.46-1)*100,'Crecimiento EPS 2026');
near(fy26.roicApprox.v,89.7542500594566,'ROIC APROXIMADO, no retorno incremental');
const newData=applyOverrides(parsed,{'2025-09-27|commercialPaper':{value:9000e6,reason:'Corrección de prueba'}});
exact(parsed.rows[0].amounts.totalDebt.v/1e6,98657,'Sin mutación de cifra SEC');
exact(newData.rows[0].amounts.totalDebt.v/1e6,99678,'Ajuste y recálculo de deuda');
assert.ok(newData.rows[1].amounts.roicApprox.v!==fy26.roicApprox.v,'ROIC cambia si cambia capital invertido anterior');
console.log('OK: benchmark Apple FY2025/26, 14 aserciones sobre datos 10-K transcritos; NO SEC API real');
