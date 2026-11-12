# Propuesta UX v0.7 — calculadora de valor intrínseco

**Estado:** propuesta de diseño y flujo, pendiente de aprobación de la autora. **NO IMPLEMENTAR NI MODIFICAR FÓRMULAS** hasta definir el diseño. Preparado el 12/11/2026 a partir de la revisión de las hojas Instrucciones, 1.IS, 2.FCF y 4.Valoracion del Excel de referencia y de las decisiones aprobadas del Índice maestro. La inspiración es su jerarquía y claridad de edición; no reproducir diseño, textos, estructura creativa ni fórmulas del archivo.

## Principios de producto
- Una sola calculadora, no varias páginas que dupliquen datos o búsqueda.
- Para principiantes: números y decisiones primero, definiciones después.
- La pantalla muestra **qué ocurrió**, **qué se está suponiendo** y **qué se estima**; nunca mezcla sus colores ni sus nombres.
- Máximo 1 objetivo principal por etapa, texto de orientación de 1–2 líneas, 1 acción primaria «Continuar» y 1 secundaria «Anterior». Los detalles se revelan a petición.
- Sin términos FCFF, NOPAT, WACC ni capital de trabajo en la vista básica sin una explicación imprescindible. No ocultar los cálculos necesarios: ubicarlos en «Ver cómo se calculó».
- Una estimación sin referencia no se rellena ni se sustituye por cero; mostrar «Pendiente de revisar» y explicar el siguiente paso.
- Los resultados son estimaciones para varios escenarios; **no** probabilidades ni garantía de precio. Diferenciar siempre valor estimado hoy, precio teórico dentro de cinco años y precio de compra bajo margen de seguridad.
- Compatibilidad con teclado, lector de pantalla, alto contraste y móvil. No depender solo del color.

## Sistema visual propuesto
- Marca/acción: azul profundo `#142169`; fondo general `#F8F9FB`; tipografía `#1E293B`.
- **Dato del informe**: tarjeta `#EDF3F9`, texto `#365579`, etiqueta «DATO DEL INFORME» y enlace de fuente. Si se corrige, mostrar «AJUSTADO» con historial de origen/restauración.
- **Tu estimación**: tarjeta `#FFF5DF`, borde `#D7B46B`, texto `#805B1D`, icono lápiz y etiqueta «TU ESTIMACIÓN». Input blanco y claramente editable.
- **Resultado calculado**: blanco con borde discreto `#DDE3EB`, cifra en azul marca, etiqueta «CALCULADO». No presentarlo como reportado por la empresa.
- Advertencias: texto breve y junto al campo o en el paso final; sin bloques extensos repetidos. Estado experimental en un único pie o encabezado, no en cada tarjeta.
- Jerarquía tipográfica: título de etapa 24 px, nombre del dato 14–15 px, cifra 20–28 px, ayudas 12–13 px; unidades y ejercicio fiscal siempre visibles.
- Contenido acotado, grandes espacios en blanco, tarjetas sobrias, sin adornos, estilo macOS/Apple coherente con la marca.

## Recorrido único — cinco etapas

### 1. Conocer la empresa
**Pregunta principal:** «¿Qué sabemos del negocio?»
- Buscar ticker una vez; mostrar nombre, ticker, última fecha fiscal y origen de datos.
- Fila de resumen con Ventas, Margen EBIT, Beneficio Neto, FCF y Deuda neta cuando existan y estén identificados.
- Debajo, pestañas **Resultados / Balance / Flujos** con selector 5 o 10 años; conservar la versión histórica aprobada, indicadores destacados y correcciones manuales trazables.
- Evitar introducir proyecciones aquí. «Continuar: revisar FCF».

### 2. Revisar el FCF
**Pregunta principal:** «¿Cuánta caja ha generado la empresa?»
- Cifras del informe: Flujo de caja operativo, CapEx total registrado, FCF histórico calculado y depreciación y amortización, con fecha y unidades.
- Tabla breve 5 años por defecto; ampliar 10.
- Mostrar por separado, sin sustituir los datos históricos, **CapEx de mantenimiento (estimado)** y **CapEx de crecimiento (estimado)**. Ambos son estimaciones, no hechos reportados salvo desglose explícito de la compañía.
- Ajuste único opcional visible: mantenimiento estimado, con referencia/ayuda breve, sin autocompletar como dato oficial.
- «Ver cómo se calcula el FCF» solo como detalle, no bloque largo.
- Continuar con una distinción clara de caja real y caja normalizada hipotética.

### 3. Estimar los próximos cinco años
**Pregunta principal:** «¿Qué esperas de la empresa?»
- Encabezado permanente «Estimaciones para [año fiscal siguiente]–[quinto año]».
- Una tabla numérica con **Crecimiento de ventas / Margen EBIT / Impuestos**.
- Columnas «Último ejercicio», «Referencia histórica (si fiable)», «Tu estimación». Mostrar una estimación por defecto aplicable a los 5 años y opción «Cambiar año por año».
- Mostrar una mini tabla de ventas, EBIT y FCF proyectado, solo cuando el método esté validado.
- **Inversión para crecer y cambios operativos**: no pedir razones «por cada $100 de ventas» como dos campos frontales. Mostrar preferentemente «Inversión prevista para sostener el crecimiento» como dato/calculo con fuente y estado. Poner ratios, detalles del capital de trabajo y partidas técnicas en «Ver cálculo y ajustar».
- Nunca sugerir que una mediana histórica equivale a una previsión; si la inversión no puede estimarse de forma defendible, dejar el resultado pendiente.

### 4. Elegir valoración y escenarios
**Pregunta principal:** «¿Cuánto pagarías por la caja futura?»
- **Múltiplo EV/FCF** como una decisión visible, junto a referencias históricas/comparables verificadas cuando existan.
- **Margen de seguridad** editable, con explicación de una línea.
- Presentar un escenario **Base** y una herramienta compacta para escenarios **Conservador / Optimista** (por ejemplo diferencias en crecimiento, margen y múltiplo). No exigir una serie de campos desconocidos sin guía.
- Deuda neta y acciones mostradas como datos a revisar; permitir corregir con fuente. La tasa necesaria para convertir futuro a presente se diseñará y explicará **después** de escoger la fórmula final; no etiquetarla como tasa arbitraria ni esconderla sin transparencia.
- No afirmar que este conjunto preliminar de campos es financieramente suficiente: fase de fórmulas decidirá qué otros supuestos son imprescindibles.

### 5. Ver resultados
**Pregunta principal:** «¿Qué rango de valor estimamos y qué implicaría comprar hoy?»
- Tres columnas conservador / base / optimista.
- Valores distintos y claramente titulados: **Valor razonable estimado HOY**, **precio teórico al final del AÑO 5**, **precio de compra con margen de seguridad**.
- Mostrar **precio de mercado** solo con fuente/fecha verificable o como importe manual claramente etiquetado; señalar diferencia vs valor de hoy, sin mezclarlo con precio futuro.
- «Cambiar estimaciones» regresa al campo sin perder cambios; «Ver desglose» ofrece detalles financieros, no la vista principal.
- No mostrar centavos que impliquen precisión espuria; usar rangos entendibles y aclarar que son escenarios de supuestos, no intervalos estadísticos.

## Lenguaje público establecido
Usar: Ventas, Crecimiento de ventas, Margen EBIT, Impuestos, Flujo de caja operativo, CapEx total, CapEx de mantenimiento (estimado), CapEx de crecimiento (estimado), FCF, Deuda neta, Acciones, EV/FCF, Precio actual, Valor razonable estimado hoy, Precio teórico en cinco años, Margen de seguridad.

Evitar en pantallas principales salvo ayuda solicitada: NOPAT, FCFF, WACC, ratios de inversión por $100 de ventas adicionales, «proxy», «mediana de variaciones», «net change in cash» y avisos técnicos largos.

## Reglas de UX y contenido
- Fuente y ejercicio fiscal junto a cada dato histórico. Los ajustes manuales originales siguen trazables.
- **No volver a buscar la empresa** al pasar de etapa. Botones atrás/continuar fijos al fondo; indicadores de pasos completados.
- No convertir un campo vacío en cero ni rellenarlo automáticamente con cifras no verificadas.
- Casillas editables bien identificadas, con unidad y ejemplos opcionales. Columna «Tu estimación» domina el foco; datos de la empresa hacen de referencia.
- Desktop: tabla ancha legible; móvil: tarjetas por dato o año, no una tabla ilegible de cinco años.
- Mostrar estados de falta de datos mediante una frase concreta y acción correcta, no alertas financieras largas.
- Mantener una sola versión de la empresa y de los supuestos en memoria local durante la sesión.

## Condiciones de cierre de esta fase
1. Aprobación de la autora del vocabulario, las cinco etapas, jerarquía de datos y paleta.
2. Aprobación del wireframe desktop y móvil (sin fórmula financiera).
3. Solo después: revisar el modelo financiero, su compatibilidad EV/FCF, CapEx/working capital, tasa de descuento, deuda, acciones y casos numéricos.
4. Después de auditoría financiera: conectar cifras y precio; validar 10-K y pruebas reales.
5. Ningún cambio a `main`, publicación ni cobros sin autorización.

**No se ha aplicado esta propuesta al HTML ni al motor de valoración existente.**
