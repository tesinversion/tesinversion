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
