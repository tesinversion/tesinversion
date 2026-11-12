'use strict';
/* Motor original de lectura histórica SEC XBRL. No usa ni reproduce las fórmulas de la plantilla del curso. */
(function(root,factory){const lib=factory();if(typeof module==='object'&&module.exports)module.exports=lib;else root.SecHistorico=lib;})(typeof window!=='undefined'?window:this,function(){
const tags={
  revenue:['RevenueFromContractWithCustomerExcludingAssessedTax','Revenues','SalesRevenueNet','SalesRevenueGoodsNet','RevenueFromContractWithCustomerIncludingAssessedTax','SalesRevenueServicesNet','RevenueFromContractWithCustomerIncludingAssessedTax'],
  cogs:['CostOfRevenue','CostOfGoodsAndServicesSold','CostOfGoodsSold','CostOfSales'],
  gross:['GrossProfit'],
  sga:['SellingGeneralAndAdministrativeExpense'],
  rd:['ResearchAndDevelopmentExpense'],
  opex:['OperatingExpenses'],
  ebit:['OperatingIncomeLoss'],
  interest:['InterestExpense','InterestExpenseNonOperating'],
  interestIncome:['InvestmentIncomeInterest','InterestIncomeExpenseAfterProvisionForLoanLoss'],
  preTax:['IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest','IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments'],
  taxExpense:['IncomeTaxExpenseBenefit'],
  netIncome:['NetIncomeLoss','ProfitLoss'],
  eps:['EarningsPerShareDiluted'],
  diluted:['WeightedAverageNumberOfDilutedSharesOutstanding','WeightedAverageNumberOfSharesOutstandingBasicAndDiluted'],
  basic:['WeightedAverageNumberOfSharesOutstandingBasic'],
  assets:['Assets'],
  currentAssets:['AssetsCurrent'],
  cash:['CashAndCashEquivalentsAtCarryingValue'],
  receivables:['AccountsNotesAndOtherReceivablesNetCurrent','AccountsReceivableNetCurrent','AccountsReceivableNet'],
  inventory:['InventoryNet'],
  ppe:['PropertyPlantAndEquipmentNet'],
  goodwill:['Goodwill'],
  currentLiabilities:['LiabilitiesCurrent'],
  liabilities:['Liabilities'],
  equity:['StockholdersEquity','StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest'],
  shortDebt:['LongTermDebtCurrent','ShortTermBorrowings','ShortTermDebtCurrent'],
  shortBorrowings:['ShortTermBorrowings','ShortTermDebtCurrent'],
  commercialPaper:['CommercialPaper'],
  longDebt:['LongTermDebtNoncurrent','LongTermDebt','LongTermDebtAndCapitalLeaseObligations'],
  debtTotal:['LongTermDebtAndFinanceLeaseObligationsIncludingCurrentMaturities'],
  sharesEnd:['CommonStockSharesOutstanding'],
  cfo:['NetCashProvidedByUsedInOperatingActivities'],
  cfi:['NetCashProvidedByUsedInInvestingActivities'],
  cff:['NetCashProvidedByUsedInFinancingActivities'],
  capex:['PaymentsToAcquirePropertyPlantAndEquipment'],
  da:['DepreciationDepletionAndAmortization','DepreciationDepletionAndAmortizationPropertyPlantAndEquipment','DepreciationAmortizationAndAccretionNet'],
  sbc:['ShareBasedCompensation'],
  buybacks:['PaymentsForRepurchaseOfCommonStock','PaymentsForRepurchaseOfEquity'],
  dividends:['PaymentsOfDividends','PaymentsOfDividendsCommonStock'],
  cashChange:['CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect','CashAndCashEquivalentsPeriodIncreaseDecrease']
};
const units={diluted:'shares',basic:'shares',sharesEnd:'shares',eps:'USD/shares'};
const duration=(fact)=>!!(fact.start&&fact.end);
const isAnnual=(f)=>{if(!/^10-K(?:\/A)?$/.test(f.form||'')||f.fp&&f.fp!=='FY')return false;if(!duration(f))return false;let days=(Date.parse(f.end)-Date.parse(f.start))/86400000;return days>=330&&days<=395;};
const isInstant=(f)=>/^10-K(?:\/A)?$/.test(f.form||'')&&!duration(f);
const daysDiff=(a,b)=>Math.abs((Date.parse(a)-Date.parse(b))/86400000);
const toSource=(f,tag,cik)=>({tag,filing:f.form,filed:f.filed,accession:f.accn,period_start:f.start||null,period_end:f.end,cik,link:f.accn?`https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${f.accn.replace(/-/g,'')}/`:''});
function series(input,k,unit){const facts=input?.facts?.['us-gaap']||{};return (tags[k]||[]).flatMap((tag,p)=>{const arr=facts[tag]?.units?.[unit]||[];return arr.filter(f=>Number.isFinite(f.val)).map(f=>({...f,_tag:tag,_priority:p}));});}
function choose(facts,k,year,anchorEnd,anchorStart,unit){const arr=series(facts,k,unit).filter(f=>{
  if(duration(f)!==!!anchorStart)return false;
  if(!(anchorStart?isAnnual(f):isInstant(f)))return false;
  if(f.end!==anchorEnd)return false;
  if(anchorStart && daysDiff(f.start,anchorStart)>8)return false;
  return true;
});
  arr.sort((a,b)=> (a._priority-b._priority) || String(b.filed).localeCompare(String(a.filed)) || String(b.accn).localeCompare(String(a.accn)));
  const f=arr[0];return f?{v:f.val,meta:toSource(f,f._tag,facts.cik)}:null;
}
const mk=(v,description,items)=>Number.isFinite(v)?{v,meta:{calculated:true,description,inputs:items}}:null;
const val=(obj)=>obj?obj.v:null;
function periods(input){const anchors=series(input,'revenue','USD').filter(isAnnual);
  let all=anchors.length?anchors:series(input,'netIncome','USD').filter(isAnnual);
  if(!all.length){all=series(input,'cfo','USD').filter(isAnnual);}
  const groups=new Map();for(const a of all){const yr=Number((a.end||'').slice(0,4));if(yr<1990||yr>2100)continue;const old=groups.get(yr);if(!old||a._priority<old._priority||(a._priority===old._priority && a.filed>old.filed))groups.set(yr,a);}
  return [...groups.values()].sort((a,b)=>a.end.localeCompare(b.end)).slice(-10).map(f=>({year:Number(f.end.slice(0,4)),end:f.end,start:f.start,form:f.form,accession:f.accn,filed:f.filed}));
}
function deriveMetrics(d){
const a=d.amounts, g=k=>val(a[k]);
if(g('gross')===null&&g('revenue')!==null&&g('cogs')!==null)a.gross=mk(g('revenue')-g('cogs'),'Ventas − costo de ventas',['revenue','cogs']);
if(g('cogs')===null&&g('revenue')!==null&&g('gross')!==null)a.cogs=mk(g('revenue')-g('gross'),'Ventas − beneficio bruto',['revenue','gross']);
if(g('liabilities')===null&&g('assets')!==null&&g('equity')!==null)a.liabilities=mk(g('assets')-g('equity'),'Activos − patrimonio',['assets','equity']);
if(g('netIncome')!==null&&g('revenue')!==null&&g('revenue')!==0)a.netMargin=mk(g('netIncome')/g('revenue')*100,'Beneficio neto ÷ ventas',['netIncome','revenue']);
if(g('gross')!==null&&g('revenue')!==null&&g('revenue')!==0)a.grossMargin=mk(g('gross')/g('revenue')*100,'Beneficio bruto ÷ ventas',['gross','revenue']);
if(g('ebit')!==null&&g('revenue')!==null&&g('revenue')!==0)a.ebitMargin=mk(g('ebit')/g('revenue')*100,'EBIT ÷ ventas',['ebit','revenue']);
if(g('taxExpense')!==null&&g('preTax')!==null&&g('preTax')!==0)a.taxRate=mk(g('taxExpense')/g('preTax')*100,'Impuestos ÷ beneficio antes de impuestos',['taxExpense','preTax']);
if(g('cfo')!==null&&g('capex')!==null){a.fcf=mk(g('cfo')-Math.abs(g('capex')),'Flujo operativo − compras de propiedades, planta y equipo',['cfo','capex']);if(g('revenue')!==null&&g('revenue')!==0)a.fcfMargin=mk(g('fcf')/g('revenue')*100,'FCF convencional ÷ ventas',['fcf','revenue']);}
// Deuda: no agregar simultáneamente totales y componentes que puedan solaparse.
// Un agregado de deuda a plazo incluye sus porciones corriente y no corriente.
// ShortTermBorrowings puede incluir CommercialPaper: elegir el agregado, nunca sumar ambos.
const tagOf=k=>{
 const meta=a[k]?.meta;
 return meta?.manual ? (meta.original?.meta?.tag||null) : (meta?.tag||null);
};
const positive=k=>g(k)!==null&&Number.isFinite(g(k))&&g(k)>=0;
let termValue=null, termKeys=[],termDescription='';
if(positive('debtTotal')){
 termValue=g('debtTotal');
 termKeys=['debtTotal'];
 termDescription='Deuda a plazo agregada (incluye vencimientos corrientes; puede incluir arrendamientos financieros)';
}else if(positive('shortDebt')&&positive('longDebt')&&
  (tagOf('shortDebt')==='LongTermDebtCurrent' || a.shortDebt?.meta?.manual) &&
  tagOf('longDebt')==='LongTermDebtNoncurrent'){
 termValue=g('shortDebt')+g('longDebt');
 termKeys=['shortDebt','longDebt'];
 termDescription='Deuda a plazo: porción corriente + no corriente';
}
const cp=positive('commercialPaper')?g('commercialPaper'):null;
const borrowed=positive('shortBorrowings')?g('shortBorrowings'):null;
const borrowTag=tagOf('shortBorrowings');
let extra=0,extraKeys=[],extraDescription='',ambiguous=false;
if(borrowed!==null&&borrowTag==='ShortTermBorrowings'){
 if(cp!==null&&borrowed+Math.max(1,borrowed)*0.001<cp){
  ambiguous=true;
  d.status.push('Deuda: el papel comercial supera los préstamos de corto plazo reportados; no se suman dos partidas potencialmente solapadas.');
 }else{
  extra=borrowed;
  extraKeys=['shortBorrowings'];
  extraDescription='préstamos de corto plazo (pueden incluir papel comercial)';
 }
}else if(cp!==null){
 if(borrowed!==null&&borrowTag==='ShortTermDebtCurrent'){
  ambiguous=true;
  d.status.push('Deuda: la etiqueta agregada ShortTermDebtCurrent puede incluir papel comercial y vencimientos de deuda; se requiere conciliación del 10-K.');
 }else{
  extra=cp;
  extraKeys=['commercialPaper'];
  extraDescription='papel comercial';
 }
}else if(borrowed!==null&&borrowTag==='ShortTermDebtCurrent'){
 ambiguous=true;
 d.status.push('Deuda: ShortTermDebtCurrent puede solaparse con vencimientos de deuda a plazo. Se requiere revisión antes de calcular deuda total.');
}
if(termValue===null){
 d.status.push('Deuda: faltan componentes identificados sin solapamiento (porción corriente/no corriente o agregado completo); deuda total y ratios derivados no calculados.');
}else if(!ambiguous){
 a.totalDebt=mk(termValue+extra,termDescription+(extraKeys.length?' + '+extraDescription:'')+'. No incluye pasivos operativos.',['debtTotal',...termKeys,...extraKeys].filter((x,i,arr)=>x!=='debtTotal'||termKeys.length===0));
}
if(g('totalDebt')!==null&&g('cash')!==null)a.netDebt=mk(g('totalDebt')-g('cash'),'Deuda financiera − efectivo',['totalDebt','cash']);
if(g('currentAssets')!==null&&g('currentLiabilities')!==null&&g('currentLiabilities')!==0)a.currentRatio=mk(g('currentAssets')/g('currentLiabilities'),'Activos corrientes ÷ pasivos corrientes',['currentAssets','currentLiabilities']);
// Ratios de historial: se muestran solo con todos los insumos necesarios. No se sustituyen faltantes por cero.
if(g('totalDebt')!==null&&g('totalDebt')>=0&&g('assets')!==null&&g('assets')>0)
 a.debtAssetRatio=mk(g('totalDebt')/g('assets')*100,'Deuda financiera identificada ÷ activos totales',['totalDebt','assets']);
if(g('ebit')!==null&&g('da')!==null){
 a.ebitdaApprox=mk(g('ebit')+g('da'),'Aproximación EBITDA: EBIT + depreciación y amortización reportada en flujo de efectivo',['ebit','da']);
 if(g('netDebt')!==null&&g('ebitdaApprox')>0)
  a.netDebtEbitda=mk(g('netDebt')/g('ebitdaApprox'),'Deuda neta orientativa ÷ EBITDA aproximado (requiere EBITDA positivo)',['netDebt','ebitdaApprox']);
}
if(g('equity')!==null&&g('totalDebt')!==null&&g('cash')!==null)
 a.investedCapitalApprox=mk(g('equity')+g('totalDebt')-g('cash'),'Capital invertido orientativo: patrimonio + deuda financiera identificada − efectivo',['equity','totalDebt','cash']);
if(g('ebit')!==null&&g('taxRate')!==null&&g('taxRate')>=0&&g('taxRate')<=100&&g('preTax')>0)
 a.nopatApprox=mk(g('ebit')*(1-g('taxRate')/100),'NOPAT orientativo: EBIT × (1 − tasa efectiva de impuestos)',['ebit','taxRate']);
if(g('currentAssets')!==null&&g('currentLiabilities')!==null&&g('cash')!==null&&g('shortDebt')!==null)
 a.nwcApprox=mk(g('currentAssets')-g('cash')-g('currentLiabilities')+g('shortDebt'),'Capital de trabajo operativo aproximado: (activo corriente − caja) − (pasivo corriente − deuda corriente)',['currentAssets','cash','currentLiabilities','shortDebt']);
if(g('assets')!==null&&g('liabilities')!==null&&g('equity')!==null){let residual=Math.abs(g('assets')-g('liabilities')-g('equity'))/Math.max(1,Math.abs(g('assets')));if(residual>.01)d.status.push('El balance no concilia con activos = pasivos + patrimonio (>1 %); podría haber intereses no controladores o diferencias de reporte.');}
if(g('ebit')!==null&&g('opex')!==null&&g('gross')!==null&&Math.abs(g('gross')-g('opex')-g('ebit'))/Math.max(1,Math.abs(g('revenue')||1))>.02)d.status.push('EBIT, beneficio bruto y gastos operativos totales no concilian; existen partidas no representadas o diferencias de definición.');
return d;
}
function derive(facts,period){const d={year:period.year,end:period.end,start:period.start,amounts:{},status:[]};const keys=Object.keys(tags);
for(const k of keys){d.amounts[k]=choose(facts,k,period.year,period.end,['assets','currentAssets','cash','receivables','inventory','ppe','goodwill','currentLiabilities','liabilities','equity','shortDebt','shortBorrowings','commercialPaper','longDebt','debtTotal','sharesEnd'].includes(k)?null:period.start,units[k]||'USD');}
return deriveMetrics(d);
}
function deriveHistory(rows){
for(let i=0;i<rows.length;i++){
 const row=rows[i],a=row.amounts,prev=rows[i-1],b=prev?.amounts||{};
 const adjacent=!!prev && row.year-prev.year===1;
 const revenue=val(a.revenue),before=val(b.revenue);
 if(adjacent&&revenue!==null&&before!==null&&before!==0)
  a.revenueGrowth=mk((revenue/before-1)*100,'Variación de ventas frente al ejercicio anterior',['revenue']);
 const shares=val(a.sharesEnd),prevShares=val(b.sharesEnd);
 if(adjacent&&shares!==null&&prevShares!==null&&prevShares!==0)
  a.sharesGrowth=mk((shares/prevShares-1)*100,'Variación de acciones al cierre del ejercicio',['sharesEnd']);
 const eps=val(a.eps),prevEps=val(b.eps);
 if(adjacent&&eps!==null&&prevEps!==null&&prevEps>0&&eps>=0)
  a.epsGrowth=mk((eps/prevEps-1)*100,'Variación del beneficio diluido por acción (si el EPS anterior es positivo)',['eps']);
 const ic=val(a.investedCapitalApprox),prevIc=val(b.investedCapitalApprox),nopat=val(a.nopatApprox);
 if(adjacent&&ic!==null&&prevIc!==null&&ic>0&&prevIc>0&&nopat!==null)
  a.roicApprox=mk(nopat/((ic+prevIc)/2)*100,'ROIC orientativo: NOPAT dividido entre capital invertido medio (sin ajustes de arrendamientos, I+D, exceso de caja ni extraordinarios)',['nopatApprox','investedCapitalApprox']);
 const nwc=val(a.nwcApprox),prevNwc=val(b.nwcApprox),capex=val(a.capex),da=val(a.da);
 if(adjacent&&nwc!==null&&prevNwc!==null&&capex!==null&&da!==null&&nopat!==null&&nopat>0)
  a.reinvestmentRateApprox=mk((Math.abs(capex)-da+nwc-prevNwc)/nopat*100,'Reinversión orientativa: (CapEx − D&A + variación del capital de trabajo operativo) ÷ NOPAT. Excluye adquisiciones, ajustes de I+D y arrendamientos',['capex','da','nwcApprox','nopatApprox']);
 const lastFive=rows.slice(Math.max(0,i-4),i+1).map(x=>val(x.amounts.roicApprox)).filter(Number.isFinite).sort((x,y)=>x-y);
 if(lastFive.length>=3){
  const mid=Math.floor(lastFive.length/2);
  const median=lastFive.length%2?lastFive[mid]:(lastFive[mid-1]+lastFive[mid])/2;
  a.roicMedian5=mk(median,'Mediana del ROIC orientativo de hasta cinco ejercicios, con al menos tres observaciones válidas',['roicApprox']);
 }
}
return rows;
}
function parseCompanyFacts(json){if(!json||!json.facts||!json.facts['us-gaap']||!json.cik)throw Error('El archivo debe ser Company Facts JSON con taxonomía US-GAAP y CIK de la SEC.');
const spans=periods(json);if(!spans.length)throw Error('No se detectaron ejercicios anuales 10-K válidos con ventas, beneficio neto o flujo operativo.');
const rows=spans.map(p=>derive(json,p));
deriveHistory(rows);
const missing=new Set();for(const row of rows){for(const k of ['revenue','ebit','assets','equity','cfo','capex'])if(!row.amounts[k])missing.add(k);}
return {name:json.entityName||'Empresa SEC',cik:String(json.cik).padStart(10,'0'),currency:'USD',rows,missing:[...missing],source:'SEC EDGAR Company Facts',generatedAt:new Date().toISOString(),limitations:['Estados originales en US-GAAP, no datos de TIKR.','Los importes reportados pueden contener reclasificaciones y ajustes en años comparativos.','FCF = flujo operativo − CapEx; no equivale automáticamente a FCFF para valoración EV/FCF.','Las filas de gastos pueden solaparse y no deben sumarse automáticamente.','ROIC, EBITDA, deuda neta y reinversión son aproximaciones contables no ajustadas; su fiabilidad puede variar por sector, adquisiciones, arrendamientos, gasto en I+D y clasificación de la SEC.','ROIC histórico se resume con la mediana de hasta cinco ejercicios y al menos tres observaciones válidas; se omite cuando faltan datos.']};
}

/* Overrides represent user-provided review corrections, never changes to SEC originals.
   Keys have exact fiscal-end dates (YYYY-MM-DD) and US-GAAP fields; derived values are
   completely recalculated from source values after overrides have been applied. */
function applyOverrides(report,overrides={}){
 if(!report||!Array.isArray(report.rows))throw Error('Historial original inválido');
 const list=report.rows.map(row=>({
  ...row,
  amounts:Object.fromEntries(Object.entries(row.amounts).filter(([,obj])=>obj && !obj.meta?.calculated)),
  status:[]
 }));
 for(const [identifier,change] of Object.entries(overrides)){
  const parts=identifier.split('|');if(parts.length!==2)continue;
  const [end,key]=parts;
  if(!/^\d{4}-\d{2}-\d{2}$/.test(end)||!Object.hasOwn(tags,key))continue;
  const r=list.find(x=>x.end===end);
  if(!r||!change||!Number.isFinite(change.value))continue;
  const before=report.rows.find(x=>x.end===end)?.amounts?.[key]||null;
  r.amounts[key]={
   v:change.value,
   meta:{manual:true,
     period_end:end,
     original:before,
     reason:String(change.reason||'').slice(0,300),
     sourceUrl:String(change.sourceUrl||'').slice(0,500),
     editedAt:String(change.editedAt||''),
     originalDocument:before?.meta||null}
  };
 }
 for(const r of list)deriveMetrics(r);
 deriveHistory(list);
 return {...report,rows:list,manualAdjustments:Object.keys(overrides).length};
}
return {parseCompanyFacts,periods,derive,tags,applyOverrides};
});
