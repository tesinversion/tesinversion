/* Arquitectura de la Inversión · Motor propio de valoración v0.6 (laboratorio).
 * Flujo del negocio: NOPAT + D&A − CapEx de mantenimiento − CapEx de expansión − Δ capital de trabajo.
 * EV hoy: suma de FCFF de años 1–5 descontados + EV terminal del año 5 descontado.
 * Patrimonio: EV menos deuda neta, más otros activos no operativos (si se confirman).
 * Todas las cifras monetarias en MILLONES de USD, acciones en MILLONES.
 * Método para análisis educativo, no predice precios de mercado. */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 if(root)root.ADIValuation=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const finite=v=>typeof v==='number'&&Number.isFinite(v);
 const num=v=>v===null||v===undefined||v===''?null:Number(v);
 const round=(n,p=6)=>Math.round((n+Number.EPSILON)*Math.pow(10,p))/Math.pow(10,p);
 function validate(input){
  const errors=[];
  const req=[
   ['sales0','Ventas del último ejercicio'],
   ['da0','Depreciación y amortización del último ejercicio'],
   ['maintenance0','CapEx de mantenimiento estimado'],
   ['growthPct','Crecimiento anual de ventas'],
   ['marginPct','Margen operativo futuro'],
   ['taxPct','Tasa de impuestos operativos'],
   ['growthInvestmentPct','Inversión de expansión por cada 100 de ventas nuevas'],
   ['workingCapitalPct','Capital de trabajo por cada 100 de ventas nuevas'],
   ['multiple','Múltiplo de salida EV/FCF del negocio'],
   ['discountPct','Tasa de descuento anual del negocio'],
   ['netDebt0','Deuda neta de hoy'],
   ['shares0','Acciones actuales en millones'],
   ['safetyPct','Margen de seguridad']
  ];
  for(const [key,label] of req){if(!finite(num(input[key])))errors.push(label+' — falta definir una cifra verificable o estimación explícita.');}
  if(errors.length)return errors;
  const check=(condition,text)=>{if(condition)errors.push(text);};
  check(!Number.isInteger(input.year0)||input.year0<1900||input.year0>2200,'Ejercicio fiscal no válido.');
  check(input.sales0<=0,'Las ventas de partida deben ser positivas.');
  check(input.da0<0,'La depreciación no puede ser negativa.');
  check(input.maintenance0<0,'El mantenimiento estimado no puede ser negativo.');
  check(input.growthPct<=-100||input.growthPct>150,'Crecimiento fuera del rango admitido (-100 % a 150 %).');
  check(input.marginPct<=-100||input.marginPct>100,'Margen operativo fuera del rango admitido.');
  check(input.maintenance0>input.sales0*10,'El mantenimiento estimado supera diez veces las ventas de partida. Verifica las unidades en millones.');
  check(input.taxPct<0||input.taxPct>60,'Impuestos operativos fuera del rango admitido (0 % a 60 %).');
  check(input.growthInvestmentPct<0||input.growthInvestmentPct>500,'Inversión de expansión fuera del rango admitido.');
  check(input.workingCapitalPct < -200 || input.workingCapitalPct > 200,'Capital de trabajo fuera del rango admitido (-200 a 200 por cada 100 de ventas adicionales).');
  check(input.multiple<=0||input.multiple>100,'El múltiplo debe ser mayor que cero y menor o igual a 100.');
  check(input.discountPct<=0||input.discountPct>50,'La tasa de descuento debe estar entre 0 % y 50 %.');
  check(input.shares0<=0,'Debe haber acciones en circulación.');
  check(input.safetyPct<0||input.safetyPct>=100,'El margen de seguridad debe estar entre 0 % y menos de 100 %.');
  for(const [k,label] of [['growthGap','Variación de crecimiento'],['marginGap','Variación de margen'],['multipleGap','Variación de múltiplo']]){
   check(!finite(num(input[k]))||num(input[k])<0||num(input[k])>100,label+' debe ser un número válido no negativo.');
  }
  for(const [k,label] of [['netDebt5','Deuda neta futura'],['shares5','Acciones futuras'],['otherAssets0','Otros activos no operativos'],['otherAssets5','Otros activos no operativos futuros'],['marketPrice','Cotización de mercado']]){
   const n=num(input[k]);if(n!==null)check(!finite(n)||(k==='shares5'&&n<=0),label+' no es válido.');
  }
  if(input.annual){
   for(let i=1;i<=5;i++){
    const a=input.annual[i]||{};
    for(const [key,lower,upper] of [['growthPct',-99,150],['marginPct',-100,100],['taxPct',0,60],['growthInvestmentPct',0,500],['workingCapitalPct',-200,200]]){
     const x=num(a[key]);if(x!==null&&(!finite(x)||x<lower||x>upper))errors.push('Supuesto de '+key+' fuera de rango en año '+i+'.');
    }
   }
  }
  return errors;
 }
 function calculate(raw){
  const input={...raw};
  const numeric=['year0','sales0','da0','maintenance0','growthPct','marginPct','taxPct','growthInvestmentPct','workingCapitalPct','multiple','discountPct','netDebt0','shares0','safetyPct','growthGap','marginGap','multipleGap','netDebt5','shares5','otherAssets0','otherAssets5','marketPrice'];
  for(const key of numeric)input[key]=num(raw[key]);
  if(raw.annual){
   input.annual={};
   for(const [year,values] of Object.entries(raw.annual)){
    input.annual[year]={};
    for(const [key,value] of Object.entries(values||{}))input.annual[year][key]=num(value);
   }
  }
  const errors=validate(input);
  if(errors.length)return {ok:false,errors};
  const shifts={low:-1,base:0,high:1};
  const scenarios={};
  const discount=input.discountPct/100;
  const shares5=input.shares5===null?input.shares0:input.shares5;
  const debt5=input.netDebt5===null?input.netDebt0:input.netDebt5;
  const extra0=input.otherAssets0===null?0:input.otherAssets0;
  const extra5=input.otherAssets5===null?extra0:input.otherAssets5;
  for(const key of Object.keys(shifts)){
   const sign=shifts[key];
   const growthDelta=sign*input.growthGap,marginDelta=sign*input.marginGap;
   const multiple=input.multiple+sign*input.multipleGap;
   if(multiple<=0){errors.push('El múltiplo del escenario conservador debe ser positivo. Ajusta la diferencia entre escenarios.');continue;}
   let revenue=input.sales0,presentFlows=0;
   const rows=[];
   for(let year=1;year<=5;year++){
    const override=input.annual&&input.annual[year]||{};
    const get=(prop,fallback)=>finite(num(override[prop]))?num(override[prop]):fallback;
    const growth=get('growthPct',input.growthPct)+growthDelta;
    const margin=get('marginPct',input.marginPct)+marginDelta;
    const tax=get('taxPct',input.taxPct);
    const growthInvest=get('growthInvestmentPct',input.growthInvestmentPct);
    const wcRate=get('workingCapitalPct',input.workingCapitalPct);
    if(growth<=-100||growth>150||margin<=-100||margin>100){errors.push('El escenario '+key+' produce un crecimiento o margen fuera del rango admitido.');break;}
    const previous=revenue;
    revenue=previous*(1+growth/100);
    const changeInSales=revenue-previous;
    const ebit=revenue*margin/100;
    const cashTaxes=Math.max(0,ebit)*tax/100; // sin activar créditos fiscales hipotéticos
    const nopat=ebit-cashTaxes;
    const scale=revenue/input.sales0;
    const depreciation=input.da0*scale;
    const maintenance=input.maintenance0*scale;
    const expansion=Math.max(0,changeInSales)*growthInvest/100;
    const deltaWorkingCapital=changeInSales*wcRate/100; // inversión o liberación
    const fcff=nopat+depreciation-maintenance-expansion-deltaWorkingCapital;
    const discounted=fcff/Math.pow(1+discount,year);
    presentFlows+=discounted;
    rows.push({year,yearFiscal:Number(input.year0)+year,revenue,changeInSales,ebit,cashTaxes,nopat,depreciation,maintenance,expansion,deltaWorkingCapital,fcff,discounted});
   }
   if(rows.length!==5)continue;
   const terminalFCF=rows[4].fcff;
   if(terminalFCF<=0){errors.push('El FCF del año 5 en el escenario '+key+' no es positivo. El múltiplo de salida no es interpretable.');continue;}
   const enterpriseFuture=terminalFCF*multiple;
   const pvTerminal=enterpriseFuture/Math.pow(1+discount,5);
   const enterpriseNow=presentFlows+pvTerminal;
   const equityNow=enterpriseNow-input.netDebt0+extra0;
   const equityFuture=enterpriseFuture-debt5+extra5;
   if(equityNow<=0||equityFuture<=0){errors.push('El patrimonio estimado de '+key+' no es positivo. Revisa deuda, flujos y supuestos.');continue;}
   const priceToday=equityNow/input.shares0;
   const priceYear5=equityFuture/shares5;
   const buyBelow=priceToday*(1-input.safetyPct/100);
   const quote=num(input.marketPrice);
   scenarios[key]={rows,multiple,enterpriseFuture,pvFlows:presentFlows,pvTerminal,enterpriseNow,equityNow,priceToday,priceYear5,buyBelow,year5FCF:terminalFCF,
    comparison:quote!==null&&quote>0?{quote,vsValuePct:(priceToday/quote-1)*100,vsFuturePct:(priceYear5/quote-1)*100,belowBuyLevel:quote<=buyBelow}:null};
  }
  if(errors.length)return {ok:false,errors};
  return {ok:true,method:'FCFF_5YR_EXIT_EV_FCFF',currency:'USD',units:'millions',scenarios,inputs:input,
   note:'Los escenarios son sensibilidades a hipótesis, no intervalos estadísticos de confianza. El precio futuro supone deuda neta y acciones futuras iguales a las actuales salvo edición explícita.'};
 }
 return {calculate,validate,round};
});
