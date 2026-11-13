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
assert.match(html,/id="history-years" type="range" min="1" max="10" step="1"/,'Selector continuo de 1 a 10 años');
assert.match(html,/id="history-years-value"/,'Años seleccionados visibles');
assert.match(html,/history-years'\)\.addEventListener\('input'/,'Actualización al desplazar la barra');
assert.match(html,/var count=5|count=5/,'Mantener 5 años por defecto');
assert.match(html,/fin='results'/,'Vista inicial de resultados');
assert.match(html,/\.data-table-scroll\{display:none\}\.mobile-history\{display:block\}/,'Históricos móviles no comprimidos');
assert.match(html,/AÑO EN CURSO · EJEMPLO/,'Distinguir cifras parciales del año en curso');
for(const row of [
 'Gastos operativos','Margen neto','Acciones en circulación','Variación de acciones en circulación','EPS','Crecimiento EPS',
 'Total activos corrientes','Total activos no corrientes','Cuentas por cobrar','Cuentas por pagar','Inventario','Capital de trabajo neto',
 'Total pasivos corrientes','Total pasivos no corrientes','Compensación en acciones','Depreciación y amortización',
 'Dividendos pagados','Recompras de acciones','Nueva deuda','Pago de deuda','Flujo neto de financiación'
])assert.ok(html.includes(row),'Indicador omitido: '+row);
for(const year of [2021,2022,2023,2024,2025]){
 assert.match(html,new RegExp('<th scope="col">'+year+'</th>'),'Año histórico en proyecciones: '+year);
}
assert.match(html,/2026–2030 <small>Tu estimación<\/small>/,'Estimación amarilla cubre los cinco años 2026–2030');
assert.match(html,/Año en curso: 2026/,'Año en curso se identifica aparte');
assert.match(html,/12 de noviembre de 2026/,'Fecha de corte visible del boceto');
assert.match(html,/informes publicados de cada empresa/,'Años fiscales reales y datos publicados');
assert.match(html,/Tu estimación anual para 2026–2030/,'Periodo quinquenal del mantenimiento visible');
assert.match(html,/D&amp;A\) anual de 2025/,'D&A anual cerrada como aproximación y advertencia');
assert.match(html,/2026–2030/,'Horizonte futuro visible');
assert.match(html,/TU ESTIMACIÓN/,'Distinguir edición');
assert.match(html,/RESULTADO CALCULADO/,'Distinguir resultados');
assert.match(html,/PRECIOS FICTICIOS · EJEMPLO VISUAL · NO SE CALCULAN/,'No mostrar ficticios como reales');
assert.match(html,/AÑO EN CURSO · 2026/,'Franja separada de datos parciales');
assert.match(html,/Enero–septiembre · cifras ficticias, no anuales/,'Cifras 2026 parciales');
assert.match(html,/último ejercicio anual cerrado: 2025/,'Último ejercicio 2025 sigue como referencia, no como actualidad');
assert.match(html,/2026–2030 · tu estimación/,'Horizonte futuro de cinco años');
assert.match(html,/PRECIO ACTUAL DE MERCADO/,'Mercado sin precio inventado');
assert.match(html,/Precio teórico en 5 años/,'Valor futuro separado');
assert.match(html,/2030 · final del horizonte/,'Destino futuro explícito');
assert.match(html,/13×/,'Escenario conservador de ejemplo');
assert.match(html,/16×/,'Escenario base de ejemplo');
assert.match(html,/19×/,'Escenario optimista de ejemplo');
assert.doesNotMatch(html,/valoracion-modelo\.js|referencia-inversion\.js|sec-historicos/,'El wireframe no carga motores ni datos SEC');
assert.match(html,/aria-valuetext/,'Lectura accesible del número de años');
assert.match(html,/overflow-x:auto/,'Tablas anchas desplazables horizontalmente');
assert.match(html,/aria-live="polite"/);
assert.match(html,/prefers-reduced-motion/);
console.log('OK: boceto v0.7.3, 2026 parcial separado de 2025 anual, cinco etapas, escenarios y rango ficticio sin motor.');
