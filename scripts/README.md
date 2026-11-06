# Fuente compartida del diccionario

La web ahora utiliza **una única fuente editable**: `data/terminos.json`. Este archivo contiene las 167 definiciones y sus atributos.

- `index.html` utiliza `assets/terminos.js`, generado a partir del JSON. Las 167 definiciones NO deben editarse directamente en el HTML.
- `roic/index.html` es una **página estática generada**, legible por Google y basada en la definición del JSON, con contexto educativo adicional.
- `sitemap.xml` incluye la portada y la página piloto.

Para actualizar una definición, edita `data/terminos.json` y ejecuta desde la raíz:

```bash
python3 scripts/generar_paginas.py
```

Incluye los archivos regenerados en el mismo commit. **No edites `assets/terminos.js` o `roic/index.html` a mano.**

La lista `FORMULA_UPDATES` dentro del HTML se mantiene para preservar el comportamiento actual del diccionario. Cuando el catálogo esté completamente normalizado, podremos simplificarla en una revisión independiente. Esta primera fase prioriza no romper nada.

## Validaciones manuales antes de publicar

1. Abrir la portada, entrar al diccionario y comprobar que sigue mostrando 167 términos y 11 categorías.
2. Probar búsqueda, guardados, fórmulas, test, versiones móviles y enlace directo `/#term=roic`.
3. Abrir `/roic/` y comprobar definición, fórmula, ejemplo y enlaces de regreso al diccionario y Substack.
4. Revisar el sitemap `/sitemap.xml` y confirmar que solo se indexa `/roic/` cuando se apruebe publicar.
5. Verificar GA4 sin contabilizar clics hacia Substack como suscripciones.

Los cambios deben revisarse primero en un **Deploy Preview de Netlify**. No fusionar la rama sin aprobación.


## Lote SEO piloto (noviembre de 2026)

La configuración editorial de las páginas publicables se guarda en `data/paginas-seo.json`.
Ahora contiene ROIC, FCF, WACC, DCF y margen de seguridad. Cada página dispone de una URL
individual, pero utiliza la definición y los ejemplos del mismo archivo `data/terminos.json`.

El comando `python3 scripts/generar_paginas.py` actualiza en orden:

1. `assets/terminos.js`, con el catálogo del diccionario interactivo.
2. `roic/index.html`, conservando su presentación piloto ya aprobada.
3. Las otras cuatro páginas desde la plantilla `scripts/plantilla-seo.html`.
4. `assets/paginas-seo.js`, para mostrar un enlace contextual solo en los términos con guía.
5. `sitemap.xml`, con todas las páginas configuradas.

**No editar manualmente los archivos generados.** Para añadir una página, se incorpora su
configuración en `data/paginas-seo.json`, se revisa la calidad editorial del término
y se ejecuta el generador. Las páginas individuales no dependen de JavaScript para
mostrar su definición principal.

Nota editorial: las definiciones de WACC y DCF carecen actualmente de fórmula en el
catálogo; la plantilla no inventa fórmulas. Antes de escalar a 167 URL, revisar
manualmente su contenido y los títulos para evitar páginas demasiado similares o de poco valor.
