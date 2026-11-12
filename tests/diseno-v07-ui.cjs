'use strict';
/* Boceto UX v0.7: verifica estructura/semántica sin ejecutar fórmulas.
 * node tests/diseno-v07-ui.cjs */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../laboratorio/diseno-v07/index.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,1);
assert.doesNotThrow(()=>new vm.Script(scripts[0][1]));
for(let i=1;i<=5;i++){
 assert.match(html,new RegExp('id="step'+i+'"'));
 assert.match(html,new RegExp('data-goto="'+i+'"'));
}
for(const id of ['history-years','mobile-year','financial-table','mobile-financial','use-da','maintenance-input','estimate-sales','estimate-ebit','estimate-tax','multiple-input','safety-input','edit-estimates','previous','continue']){
 assert.match(html,new RegExp('id="'+id+'"'),id);
}
assert.match(html,/max-width:630px/,'Estilos móviles dedicados');
assert.match(html,/\.data-table-scroll\{display:none\}\.mobile-history\{display:block\}/,'Históricos móviles no comprimidos');
assert.match(html,/DATO DEL INFORME/,'Distinguir cifras fuente');
assert.match(html,/TU ESTIMACIÓN/,'Distinguir edición');
assert.match(html,/RESULTADO CALCULADO/,'Distinguir resultados');
assert.match(html,/EJEMPLO VISUAL · PRECIOS FICTICIOS SIN CÁLCULO/,'No mostrar ficticios como reales');
assert.doesNotMatch(html,/valoracion-modelo\.js|referencia-inversion\.js|sec-historicos/,'El wireframe no carga motores ni datos SEC');
assert.match(html,/aria-live="polite"/);
assert.match(html,/prefers-reduced-motion/);
console.log('OK: cinco pasos, controles, colores, versión móvil y aislamiento financiero del wireframe.');
