'use strict';
/* Prueba de integración estructural y sintaxis para la calculadora unificada.
 * No reemplaza las pruebas visuales en navegador ni la conciliación SEC/10-K.
 * Ejecutar: node tests/valoracion-guiada-ui.cjs */
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const assert=require('node:assert/strict');

const html=fs.readFileSync(path.join(__dirname,'../laboratorio/historicos/index.html'),'utf8');
const old=fs.readFileSync(path.join(__dirname,'../laboratorio/valoracion/index.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
assert.equal(scripts.length,2,'Debe preservarse el motor SEC y la interfaz unificada');
scripts.forEach((script,i)=>assert.doesNotThrow(()=>new vm.Script(script,{filename:'calculadora-script-'+i})));

for(const id of ['lookup','upload','load-demo','tabs','financial-body','sourcebox','restore-all','launch-wizard','history-section','valuation-stage','valuation-content','journey-prev','journey-next']){
 assert.match(html,new RegExp('id="'+id+'"'),'Falta el elemento '+id);
}
for(let i=1;i<=5;i++)assert.match(html,new RegExp('data-journey="'+i+'"'));
assert.match(html,/const journey=\{/,'La guía debe existir en el mismo documento');
assert.match(html,/function setJourneyStep\(/);
assert.match(html,/if\(step>1&&!state\.report\)/,'No debe avanzar sin empresa');
assert.match(html,/setJourneyStep\(2\)/,'La primera etapa debe continuar a caja sostenible');
assert.match(html,/state\.report\.rows\.at\(-1\)/,'La guía debe utilizar el reporte histórico existente');
assert.match(html,/function loadJourney\(/);
assert.match(html,/function saveJourney\(/);
assert.match(html,/localStorage\.setItem\(journeyKey\(\)/,'Persistencia local por empresa');
assert.match(html,/function recalculate\(\)\{state\.report=engine\.applyOverrides/,'Conservar el recálculo histórico');
assert.match(html,/function explain\(year,key\)/,'Conservar el acceso a fuentes/correcciones');
assert.match(html,/function renderJourney\(/);
assert.match(html,/Último ejercicio disponible/,'La caja necesita una fecha precisa');
assert.match(html,/cashRows=state\.report\.rows\.slice\(-5\)/,'Comparar cinco ejercicios disponibles');
assert.match(html,/mediana histórica de FCF/i,'La mediana debe estar explicada');
assert.doesNotMatch(html,/jField\('fcffBasis'/,'No solicitar FCFF arbitrario en pantalla básica');
assert.match(html,/Impuestos y reinversión \(ajustes avanzados opcionales\)/,'Reservar supuestos complejos para detalle opcional');
assert.match(html,/NOPAT = EBIT después de impuestos operativos/,'Explicar NOPAT');
assert.match(html,/Antes de calcular un precio harán falta hipótesis comprobables/,'No ocultar bloqueo financiero');
assert.match(html,/Number\(r\.year\)\+5/,'Proyección identificada por años fiscales');

assert.match(html,/Pendiente de validación/,'No producir precio sin motor auditado');
assert.doesNotMatch(html,/location\.assign\(['"]\.\.\/valoracion\//,'No deben existir saltos a una segunda app');
assert.doesNotMatch(old,/function renderStep\(/,'La ruta anterior no debe incluir otro asistente funcional');
assert.match(old,/location\.replace\(target\.href\)/,'La ruta anterior debe redirigir');
assert.match(old,/target\.searchParams\.set\('ticker',ticker\)/,'Conservar ticker en enlaces antiguos');
assert.match(html,/aria-label="Estados financieros"/);
assert.match(html,/aria-label="Etapas de la calculadora"/);
assert.match(html,/DEMO|fictici/i,'La demostración debe seguir identificada');
console.log('OK: una sola entrada, 5 etapas, historial y correcciones preservados, persistencia, sintaxis y redirección antigua');
