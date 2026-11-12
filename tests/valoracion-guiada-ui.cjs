'use strict';
/* Pruebas de navegación SIN navegador real: no validan layout ni SEC en vivo.
 * node tests/valoracion-guiada-ui.cjs */
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const wizard = fs.readFileSync(path.join(__dirname,'../laboratorio/valoracion/index.html'),'utf8');
const history = fs.readFileSync(path.join(__dirname,'../laboratorio/historicos/index.html'),'utf8');
const source = wizard.match(/<script>([\s\S]+?)<\/script>/)[1];

function execute({ticker='',saved={},transfer=null}={}){
 const events={};
 const nodes=new Map();
 function el(id){
  const x={id,hidden:false,style:{},dataset:{},innerHTML:'',textContent:'',value:'',
   className:'',classList:{toggle(){}},setAttribute(){},removeAttribute(){},
   addEventListener(type,cb){events[id+':'+type]=cb;},focus(){},disabled:false};
  nodes.set(id,x);return x;
 }
 ['stage','stage-title','step-kicker','progress-fill','status','back','next','flow-status'].forEach(el);
 const nav=Array.from({length:5},(_,i)=>Object.assign(el('nav'+i),{dataset:{step:String(i)}}));
 const document={
  getElementById(id){return nodes.get(id)||el(id);},
  querySelectorAll(css){return css==='.steplink'?nav:[];}
 };
 const local=new Map(Object.entries(saved));
 const session=new Map(transfer?['adi-wizard-source'].map(k=>[k,JSON.stringify(transfer)]):[]);
 const stores=(map)=>({getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)});
 const params={get(k){return k==='ticker'?ticker:null;}};
 const context={document,localStorage:stores(local),sessionStorage:stores(session),
   location:{search:ticker?'?ticker='+ticker:''},window:{scrollTo(){}},
   URLSearchParams:class{constructor(){}get(k){return params.get(k);}},
   fetch:async()=>({ok:false,json:async()=>({error:'API simulada no disponible'})}),
   AbortController:class{constructor(){this.signal={};}abort(){}},setTimeout(){return 1;},clearTimeout(){}};
 vm.runInNewContext(source,context,{timeout:1000});
 return {events,nodes,local,session};
}

const a=execute(), get=()=>a.nodes.get('stage').innerHTML;
assert.match(get(),/Primero, conoce el negocio/);
assert.match(get(),/Usar ejemplo ficticio/);
a.events['next:click']();
assert.match(get(),/Primero, conoce el negocio/);
assert.match(a.nodes.get('status').textContent,/busca una empresa o utiliza el ejemplo ficticio/);
a.events['use-demo:click']();
assert.match(get(),/Empresa de demostración/);
for(const expected of [/¿Cuánta caja puede generar\?/,/¿Cómo imaginas los próximos cinco años\?/,/¿Con qué supuestos valoraremos el negocio\?/,/Revisa tu análisis\./]){
 a.events['next:click']();assert.match(get(),expected);
}
assert.match(get(),/Pendiente de validación/);
assert.doesNotMatch(get(),/\$\s*[0-9][0-9.,]*\s*por acción/);
a.events['back:click']();assert.match(get(),/¿Con qué supuestos valoraremos el negocio\?/);
a.events['next:click']();assert.match(get(),/Tu empresa y caja/);
assert.ok(wizard.includes('localStorage.setItem'));
assert.match(history,/id="launch-wizard"/);
assert.match(history,/sessionStorage.setItem\('adi-wizard-source'/);
assert.match(history,/openingTicker==='IMPORT'/);
assert.match(history,/\bfunction applyOverrides\(/);
assert.match(wizard,/aria-current/);
const transfer={ticker:'AAPL',mode:'live',report:{
 name:'Apple',ticker:'AAPL',cik:'0000320193',rows:[{year:2026,end:'2026-09-26',
 amounts:{revenue:{v:100000000000},ebitMargin:{v:25},fcf:{v:18000000000}}}]}};
const b=execute({ticker:'AAPL',transfer});
assert.match(b.nodes.get('stage').innerHTML,/Apple/);
assert.match(b.nodes.get('stage').innerHTML,/2026/);
assert.match(wizard,/Referencia histórica/);
assert.match(wizard,/historyLink.href/);
const c=execute({ticker:'IMPORT',transfer:{...transfer,ticker:'IMPORT',mode:'file'}});
assert.match(c.nodes.get('stage').innerHTML,/Apple/);
console.log('OK: bloquear avance sin empresa, demo habilitada, navegación 5 pasos, regreso, contexto histórico y precio bloqueado');
