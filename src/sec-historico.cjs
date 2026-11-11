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
function derive(facts,period){const d={year:period.year,end:period.end,start:period.start,amounts:{},status:[]};const keys=Object.keys(tags);
for(const k of keys){d.amounts[k]=choose(facts,k,period.year,period.end,['assets','currentAssets','cash','receivables','inventory','ppe','goodwill','currentLiabilities','liabilities','equity','shortDebt','longDebt','debtTotal','sharesEnd'].includes(k)?null:period.start,units[k]||'USD');}
const a=d.amounts, g=k=>val(a[k]);
if(g('gross')===null&&g('revenue')!==null&&g('cogs')!==null)a.gross=mk(g('revenue')-g('cogs'),'Ventas − costo de ventas',['revenue','cogs']);
if(g('cogs')===null&&g('revenue')!==null&&g('gross')!==null)a.cogs=mk(g('revenue')-g('gross'),'Ventas − beneficio bruto',['revenue','gross']);
if(g('liabilities')===null&&g('assets')!==null&&g('equity')!==null)a.liabilities=mk(g('assets')-g('equity'),'Activos − patrimonio',['assets','equity']);
if(g('netIncome')!==null&&g('revenue')!==null&&g('revenue')!==0)a.netMargin=mk(g('netIncome')/g('revenue')*100,'Beneficio neto ÷ ventas',['netIncome','revenue']);
if(g('gross')!==null&&g('revenue')!==null&&g('revenue')!==0)a.grossMargin=mk(g('gross')/g('revenue')*100,'Beneficio bruto ÷ ventas',['gross','revenue']);
if(g('ebit')!==null&&g('revenue')!==null&&g('revenue')!==0)a.ebitMargin=mk(g('ebit')/g('revenue')*100,'EBIT ÷ ventas',['ebit','revenue']);
if(g('taxExpense')!==null&&g('preTax')!==null&&g('preTax')!==0)a.taxRate=mk(g('taxExpense')/g('preTax')*100,'Impuestos ÷ beneficio antes de impuestos',['taxExpense','preTax']);
if(g('cfo')!==null&&g('capex')!==null){a.fcf=mk(g('cfo')-Math.abs(g('capex')),'Flujo operativo − compras de propiedades, planta y equipo',['cfo','capex']);if(g('revenue')!==null&&g('revenue')!==0)a.fcfMargin=mk(g('fcf')/g('revenue')*100,'FCF convencional ÷ ventas',['fcf','revenue']);}
if(g('debtTotal')!==null)a.totalDebt=mk(g('debtTotal'),'Deuda financiera reportada',['debtTotal']);
else if(g('shortDebt')!==null&&g('longDebt')!==null)a.totalDebt=mk(g('shortDebt')+g('longDebt'),'Deuda financiera a corto + largo plazo',['shortDebt','longDebt']);
if(g('totalDebt')!==null&&g('cash')!==null)a.netDebt=mk(g('totalDebt')-g('cash'),'Deuda financiera − efectivo',['totalDebt','cash']);
if(g('currentAssets')!==null&&g('currentLiabilities')!==null&&g('currentLiabilities')!==0)a.currentRatio=mk(g('currentAssets')/g('currentLiabilities'),'Activos corrientes ÷ pasivos corrientes',['currentAssets','currentLiabilities']);
if(g('assets')!==null&&g('liabilities')!==null&&g('equity')!==null){let residual=Math.abs(g('assets')-g('liabilities')-g('equity'))/Math.max(1,Math.abs(g('assets')));if(residual>.01)d.status.push('El balance no concilia con activos = pasivos + patrimonio (>1 %); podría haber intereses no controladores o diferencias de reporte.');}
if(g('ebit')!==null&&g('opex')!==null&&g('gross')!==null&&Math.abs(g('gross')-g('opex')-g('ebit'))/Math.max(1,Math.abs(g('revenue')||1))>.02)d.status.push('EBIT, beneficio bruto y gastos operativos totales no concilian; existen partidas no representadas o diferencias de definición.');
return d;
}
function parseCompanyFacts(json){if(!json||!json.facts||!json.facts['us-gaap']||!json.cik)throw Error('El archivo debe ser Company Facts JSON con taxonomía US-GAAP y CIK de la SEC.');
const spans=periods(json);if(!spans.length)throw Error('No se detectaron ejercicios anuales 10-K válidos con ventas, beneficio neto o flujo operativo.');
const rows=spans.map(p=>derive(json,p));for(let i=0;i<rows.length;i++){const a=rows[i].amounts, b=rows[i-1]?.amounts;const revenue=val(a.revenue),before=val(b?.revenue);if(i&&revenue!==null&&before!==null&&before!==0){a.revenueGrowth=mk((revenue/before-1)*100,'Variación de ventas frente al ejercicio anterior',['revenue']);}const shares=val(a.sharesEnd),prevShares=val(b?.sharesEnd);if(i&&shares!==null&&prevShares!==null&&prevShares!==0)a.sharesGrowth=mk((shares/prevShares-1)*100,'Variación de acciones en circulación',['sharesEnd']);}
const missing=new Set();for(const row of rows){for(const k of ['revenue','ebit','assets','equity','cfo','capex'])if(!row.amounts[k])missing.add(k);}
return {name:json.entityName||'Empresa SEC',cik:String(json.cik).padStart(10,'0'),currency:'USD',rows,missing:[...missing],source:'SEC EDGAR Company Facts',generatedAt:new Date().toISOString(),limitations:['Estados originales en US-GAAP, no datos de TIKR.','Los importes reportados pueden contener reclasificaciones y ajustes en años comparativos.','FCF = flujo operativo − CapEx; no equivale automáticamente a FCFF para valoración EV/FCF.','Las filas de gastos pueden solaparse y no deben sumarse automáticamente.']};
}
return {parseCompanyFacts,periods,derive,tags};
});
