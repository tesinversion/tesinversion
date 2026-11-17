'use strict';
/* Validación estática de integración y estructura: node tests/valoracion-guiada-ui.cjs.
 * No sustituye pruebas visuales reales ni conciliación SEC frente a 10-K. */
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../laboratorio/historicos/index.html'),'utf8');
const legacy=fs.readFileSync(path.join(__dirname,'../laboratorio/valoracion/index.html'),'utf8');
const model=fs.readFileSync(path.join(__dirname,'../laboratorio/historicos/valoracion-modelo.js'),'utf8');
const reference=fs.readFileSync(path.join(__dirname,'../laboratorio/historicos/referencia-inversion.js'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]+?)<\/script>/g)].map(m=>m[1]);
assert.equal(scripts.length,2,'Parser SEC y controlador de calculadora deben permanecer separados');
scripts.forEach((script,i)=>assert.doesNotThrow(()=>new vm.Script(script,{filename:'calculadora-'+i})));
assert.doesNotThrow(()=>new vm.Script(model,{filename:'valoracion-modelo.js'}));
assert.match(html,/<script src="\.\/valoracion-modelo\.js"><\/script>/,'Cargar motor de valoración propio');
assert.match(html,/<script src="\.\/referencia-inversion\.js"><\/script>/,'Cargar referencia histórica');
assert.doesNotThrow(()=>new vm.Script(reference,{filename:'referencia-inversion.js'}));

for(let i=1;i<=5;i++)assert.match(html,new RegExp('data-journey="'+i+'"'),'Etapa '+i);
for(const name of ['lookup','tabs','sourcebox','financial-body','restore-all','history-section',
 'valuation-stage','valuation-content','journey-prev','journey-next']){
 assert.match(html,new RegExp('id="'+name+'"'),'Falta '+name);
}
assert.match(html,/function applyOverrides\(/,'Mantener correcciones SEC y su origen');
assert.match(html,/function recalculate\(\)/,'Recalcular indicadores históricos al corregir');
assert.match(html,/function saveJourney\(/,'Conservar datos entre etapas');
assert.match(html,/localStorage\.setItem\(journeyKey\(\)/,'Guardar supuestos por empresa');
assert.match(html,/if\(step>1&&!state\.report\)/,'Impedir avanzar sin empresa');
assert.match(html,/const five=state\.report\.rows\.slice\(-5\)/,'Años históricos visibles');
assert.match(html,/data-journey="5"/,'Cinco etapas en una experiencia');
assert.match(html,/valuation-field user-estimate/,'Distinguir supuestos editables');
assert.match(html,/valuation-fact source-data/,'Distinguir datos históricos');
assert.match(html,/Flujo de caja operativo/,'Explicar CFO');
assert.match(html,/CapEx registrado/,'No ocultar CapEx original');
assert.match(html,/CapEx anual estimas para mantenimiento/,'Ajuste de mantenimiento editable');
assert.match(html,/data-action="use-da-proxy"/,'Copiar D&A solo con decisión del usuario');
assert.match(html,/growthInvestmentPct/,'Inversión para expansión futura');
assert.match(html,/workingCapitalPct/,'Capital de trabajo futuro');
assert.match(html,/ADIInvestmentReference\.analyze\(state\.report\.rows\)/,'Referencia calculada desde históricos');
assert.match(html,/data-action="use-historical-expansion"/,'Aplicación manual de expansión');
assert.match(html,/data-action="use-historical-working-capital"/,'Aplicación manual de capital de trabajo');
assert.match(html,/investment-details/,'Detallado técnico opcional');
assert.match(html,/al menos tres años comparables/,'Umbral de datos históricos');
assert.match(html,/No tienes que adivinar/,'La interfaz no exige adivinar tasas');
assert.match(html,/próximos cinco ejercicios fiscales/,'Explicar horizonte temporal');
assert.match(html,/growthGap/,'Escenarios mediante cambios explícitos');
assert.match(html,/marginGap/,'Sensibilidad al margen');
assert.match(html,/multipleGap/,'Sensibilidad al múltiplo');
assert.match(html,/jSource\('Deuda neta aproximada'/,'Deuda aproximada, no predicción');
assert.match(html,/data-action="copy-shares"/,'Permitir copiar acciones previa revisión');
assert.match(html,/function projectionInput\(/,'Convertir historial y supuestos al motor');
assert.match(html,/ADIValuation\.calculate\(projectionInput\(\)\)/,'Resultado conectado al motor');
assert.match(html,/Faltan datos para calcularlo/,'No inventar precios ante datos faltantes');
assert.match(html,/Valor razonable|VALOR RAZONABLE/,'Mostrar valor de hoy');
assert.match(html,/Precio teórico al final del año 5/,'Separar valor futuro');
assert.match(html,/escenarios|Escenarios/,'Mostrar rango con escenarios');
assert.match(html,/intervalo estadístico/,'Aclarar que el rango no es un intervalo estadístico');
assert.match(html,/market-date/,'Fecha para cotización manual');
assert.match(html,/revisar fuente|REVISAR FUENTE/,'Trazabilidad');
assert.doesNotMatch(html,/location\.assign\(['"]\.\.\/valoracion\//,'No volver a segunda aplicación');
assert.doesNotMatch(legacy,/function renderStep\(/,'No mantener una interfaz duplicada');
assert.match(legacy,/location\.replace\(target\.href\)/,'Enlace anterior redirige al único producto');
console.log('OK · Interfaz unificada con históricos, cinco etapas, edición, escenarios, precio futuro y validación sin números inventados.');
