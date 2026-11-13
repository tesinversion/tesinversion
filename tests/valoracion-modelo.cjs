'use strict';
/* Pruebas numéricas independientes del navegador. Ejecutar: node tests/valoracion-modelo.cjs */
const assert=require('node:assert/strict');
const {calculate}=require('../laboratorio/historicos/valoracion-modelo.js');
const near=(a,b,message)=>assert.ok(Math.abs(a-b)<=1e-8,message+': '+a+' vs '+b);
const base={
 year0:2025,sales0:1000,da0:0,maintenance0:0,growthPct:0,marginPct:10,taxPct:0,
 growthInvestmentPct:0,workingCapitalPct:0,multiple:10,discountPct:10,
 netDebt0:0,shares0:100,safetyPct:20,growthGap:0,marginGap:0,multipleGap:0
};
const simple=calculate(base);
assert.equal(simple.ok,true,JSON.stringify(simple.errors));
near(simple.scenarios.base.priceToday,10,'Valor presente: 5 flujos de 100 y terminal 1.000 al 10 %');
near(simple.scenarios.base.priceYear5,10,'Valor terminal por acción');
near(simple.scenarios.base.buyBelow,8,'Precio máximo con 20 % de seguridad');
near(simple.scenarios.base.pvFlows+simple.scenarios.base.pvTerminal,1000,'Puente DCF');
for(const [label,v] of Object.entries(simple.scenarios))near(v.priceToday,10,'Sin diferencias escenarios: '+label);

const multipleAsText=calculate({...base,multiple:'10',multipleGap:'3'});
assert.equal(multipleAsText.ok,true,JSON.stringify(multipleAsText.errors));
near(multipleAsText.scenarios.low.multiple,7,'Múltiplo conservador aun si entrada es texto');
near(multipleAsText.scenarios.high.multiple,13,'Múltiplo optimista aun si entrada es texto');

const richer=calculate({...base,da0:20,maintenance0:20,growthPct:10,marginPct:20,taxPct:20,
 growthInvestmentPct:30,workingCapitalPct:5,multiple:12,growthGap:2,marginGap:1,multipleGap:2});
assert.equal(richer.ok,true,JSON.stringify(richer.errors));
assert.ok(richer.scenarios.low.priceToday<richer.scenarios.base.priceToday);
assert.ok(richer.scenarios.base.priceToday<richer.scenarios.high.priceToday);
near(richer.scenarios.base.rows[0].expansion,30,'Inversion expansión sobre incremento ventas');
near(richer.scenarios.base.rows[0].deltaWorkingCapital,5,'Inversión capital trabajo');
near(richer.scenarios.base.rows[0].depreciation,22,'Depreciación proporcional a ventas');
near(richer.scenarios.base.rows[0].maintenance,22,'Mantenimiento proporcional a ventas');

const debt=calculate({...base,netDebt0:200});
assert.equal(debt.ok,true);
near(debt.scenarios.base.priceToday,8,'Puente deuda neta hoy');
near(debt.scenarios.base.priceYear5,8,'Puente deuda neta al año 5 constante');
const shares=calculate({...base,shares5:50});
assert.equal(shares.ok,true);
near(shares.scenarios.base.priceToday,10,'Acciones futuras no alteran precio hoy');
near(shares.scenarios.base.priceYear5,20,'Acciones futuras alteran precio año 5');
const editedYear=calculate({...base,annual:{1:{growthPct:20}}});
assert.equal(editedYear.ok,true);
near(editedYear.scenarios.base.rows[0].revenue,1200,'Anulación individual primer año');
assert.equal(calculate({...base,maintenance0:null}).ok,false,'Ausente no es cero');
assert.equal(calculate({...base,shares0:null}).ok,false,'Acciones faltantes bloquean precio');
assert.equal(calculate({...base,multiple:2,multipleGap:3}).ok,false,'Múltiplo conservador negativo bloqueado');
assert.equal(calculate({...base,marginPct:-10}).ok,false,'FCF terminal negativo no admite múltiplo');
assert.equal(calculate({...base,marketPrice:25}).scenarios.base.comparison.quote,25,'Cotización ingresada manual');
console.log('OK · Motor: valor presente, precio futuro, seguridad, deuda, acciones, escenarios, reinversión y datos faltantes.');
