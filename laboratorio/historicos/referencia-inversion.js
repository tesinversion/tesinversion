/* Arquitectura de la Inversión · referencia histórica orientativa de inversión v0.6.1.
 * No rellena supuestos por sí sola; requiere selección expresa del usuario.
 * Los ratios de CapEx pueden ser muy engañosos en empresas con infraestructura
 * escalonada, adquisiciones o crecimiento de ventas con desfase temporal. */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 if(root)root.ADIInvestmentReference=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const amt=(row,key)=>{
  const n=row&&row.amounts&&row.amounts[key]&&row.amounts[key].v;
  return typeof n==='number'&&Number.isFinite(n)?n:null;
 };
 const median=v=>{
  if(!v.length)return null;
  const sorted=v.slice().sort((a,b)=>a-b),i=Math.floor(sorted.length/2);
  return sorted.length%2?sorted[i]:(sorted[i-1]+sorted[i])/2;
 };
 const summarize=(values,minimum,maximum,kind)=>{
  const kept=values.filter(x=>Number.isFinite(x.rate)&&x.rate>=minimum&&x.rate<=maximum);
  if(kept.length<3)return {available:false,observations:kept,reason:'Faltan al menos tres ejercicios comparables con información suficiente.'};
  const rate=median(kept.map(x=>x.rate));
  const deviation=median(kept.map(x=>Math.abs(x.rate-rate)));
  const volatile=deviation>Math.max(15,Math.abs(rate)*0.75);
  if(volatile)return {available:false,observations:kept,rate:null,reason:'La inversión histórica fue demasiado irregular para utilizar un porcentaje como referencia automática.'};
  return {available:true,observations:kept,rate:Math.round(rate*100)/100,method:kind,variability:deviation};
 };
 function analyze(rows){
  if(!Array.isArray(rows)||rows.length<4)return {available:false,capex:{available:false,observations:[],reason:'Se necesitan varios ejercicios anuales.'},workingCapital:{available:false,observations:[],reason:'Se necesitan varios ejercicios anuales.'},notes:[]};
  const years=rows.slice(-6),growth=[],working=[];
  let positiveYears=0;
  for(let i=1;i<years.length;i++){
   const before=years[i-1],now=years[i];
   if(!Number.isInteger(before.year)||!Number.isInteger(now.year)||now.year!==before.year+1)continue;
   const oldSales=amt(before,'revenue'),newSales=amt(now,'revenue');
   if(oldSales===null||newSales===null||oldSales<=0)continue;
   const added=newSales-oldSales;
   // La base de ventas nuevas casi nula multiplica artificialmente ratios.
   if(added<=0||added/oldSales<0.02)continue;
   positiveYears++;
   const capex=amt(now,'capex'),da=amt(now,'da');
   if(capex!==null&&da!==null&&da>=0&&Math.abs(capex)>=da){
    growth.push({year:now.year,rate:(Math.abs(capex)-da)/added*100,capex:Math.abs(capex),da,additionalSales:added});
   }
   const nwc=amt(now,'nwcApprox'),previousNwc=amt(before,'nwcApprox');
   if(nwc!==null&&previousNwc!==null){
    working.push({year:now.year,rate:(nwc-previousNwc)/added*100,changeNwc:nwc-previousNwc,additionalSales:added});
   }
  }
  const capex=summarize(growth,0,500,'(CapEx registrado − D&A) ÷ aumento de ventas');
  const workingCapital=summarize(working,-200,200,'Variación del capital de trabajo operativo ÷ aumento de ventas');
  const available=capex.available&&workingCapital.available;
  return {
   available,capex,workingCapital,positiveYears,
   years:years.map(r=>r.year),
   notes:[
    'Se observan como máximo cinco variaciones anuales consecutivas, utilizando únicamente años con ventas crecientes al menos 2 %.',
    'CapEx de crecimiento ≈ CapEx registrado menos depreciación y amortización; es una aproximación y puede fallar si el mantenimiento real difiere.',
    'El capital de trabajo se deriva de partidas aproximadas del balance y requiere conciliación con los informes originales.',
    'Las inversiones pueden generar ventas varios años después. Esta referencia histórica no es un pronóstico ni una cifra auditada.',
    'Si alguna serie es insuficiente o muy variable, los supuestos quedan vacíos hasta que el usuario los justifique.'
   ]
  };
 }
 return {analyze,median};
});
