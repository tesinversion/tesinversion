'use strict';
/* node tests/referencia-inversion.cjs */
const assert=require('node:assert/strict');
const {analyze}=require('../laboratorio/historicos/referencia-inversion.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,String(a)+' vs '+String(b));
function rows({wc=-3,rates=[20,20,20,20,20],years=6,missingNwc=false}={}){
 let nwc=100e6;
 return Array.from({length:years},(_,i)=>{
  if(i>0)nwc+=wc*1e6;
  const rate=i===0?20:rates[i-1];
  return {year:2020+i,amounts:{
   revenue:{v:(1000+i*100)*1e6},capex:{v:(20+rate)*1e6},da:{v:20e6},
   ...(missingNwc?{}:{nwcApprox:{v:nwc}})
  }};
 });
}
const a=analyze(rows());
assert.equal(a.available,true);
close(a.capex.rate,20);
close(a.workingCapital.rate,-3);
assert.equal(a.capex.observations.length,5);
const b=analyze(rows({wc:5}));
close(b.workingCapital.rate,5);
assert.equal(analyze(rows({years:2})).available,false);
assert.equal(analyze(rows({missingNwc:true})).available,false);
const erratic=analyze(rows({rates:[10,150,5,300,45]}));
assert.equal(erratic.capex.available,false);
assert.equal(erratic.workingCapital.available,true);
assert.equal(erratic.available,false,'No convertir datos faltantes en valores');
console.log('OK: inversión histórica, observaciones, negativos, insuficiencia, dispersión y separación de referencias.');
