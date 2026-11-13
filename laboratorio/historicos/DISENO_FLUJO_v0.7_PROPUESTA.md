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

## Ajustes de las primeras cinco secciones (v0.7.1, 12/11/2026)

La autora revisó y aprobó la dirección visual de las tablas simplificadas y la etapa 3; solicitó estas cinco correcciones **antes de revisar otras etapas**:

1. **Resultados:** control deslizante de **1 a 10 años**, no selector fijo de cinco/diez. Conservar el número elegido al navegar entre Resultados, Balance y Flujos. Añadir gastos operativos después de crecimiento de ventas, margen neto, acciones en circulación, variación porcentual de acciones, EPS y crecimiento porcentual de EPS. Destacar los indicadores clave con una banda azul discreta.
2. **Balance:** conservar lectura simple, mismo selector de años y orden lógico: efectivo, cuentas por cobrar, inventario y total de activos corrientes; activos no corrientes y activos totales; cuentas por pagar, pasivos corrientes, capital de trabajo neto; pasivos no corrientes, pasivos totales; deuda financiera, deuda neta y patrimonio. El «capital de trabajo neto» exhibido aquí es activos corrientes menos pasivos corrientes: no confundirlo automáticamente con la inversión en capital de trabajo operativo usada en valoración.
3. **Flujo de caja:** mismo selector 1–10; añadir compensación en acciones, depreciación y amortización y bloque de inversión y financiación/asignación del capital: adquisiciones, otras inversiones, dividendos, recompras, emisión de acciones, nueva deuda, pago de deuda y flujo neto de financiación. Mantener unidad en millones USD y signos coherentes para entradas/salidas.
4. **CapEx de mantenimiento:** indicar que el valor editable es una estimación **anual para el ejercicio base 2025** y que su posible utilización en la proyección 2026–2030 depende de la futura validación del modelo. Sugerir depreciación y amortización (D&A) como referencia inicial o proxy, con advertencia sobre inflación, envejecimiento de activos y necesidades reales de reposición. No calcular automáticamente la inversión futura en el wireframe.
5. **Proyecciones:** tabla con las tres filas conocidas (crecimiento ventas, margen EBIT e impuestos) y cinco columnas de ejercicios reales **2021–2025**, seguidas de una columna en ámbar para el **año en curso del ejemplo 2026**. La estimación general sirve de referencia para 2027–2030, editables por año en desplegable. Los datos históricos de 2026 y otros años se actualizarán según ejercicio realmente disponible al construir la herramienta funcional.

**Estado:** ejecutado **solo en el boceto visual v0.7.1** de `laboratorio/diseno-v07/index.html`; el motor financiero y la calculadora real permanecen intactos. Los datos de la demostración son ficticios y no hay cálculos reales de valores por acción. Tests estáticos y simulación aislada de navegación pasaron; todavía falta inspección real de navegador y confirmación visual de la autora.

## Ajuste de calendario aprobado · v0.7.2 (12/11/2026)

La autora confirmó la dirección del diseño y solicitó dos precisiones: (1) al tratar información real, utilizar lo más reciente efectivamente **publicado** a la fecha de consulta, incluido 2026 cuando corresponda; los ejercicios abiertos se identificarán como **«Año en curso»** y no se mezclarán con ejercicios anuales cerrados; (2) la columna amarilla de la etapa 3 debe titularse **«2026–2030 · Tu estimación»** (cinco ejercicios), no «2026 · Tu estimación». El rótulo «Año en curso» se presenta por separado. El boceto ilustrativo mantiene resultados completos ficticios 2016–2025: su fecha de corte es el 12 de noviembre de 2026, pero no pretende representar cifras verificadas ni mostrar un trimestre 2026 simulado como anual completo.

**En implementación funcional futura:** detectar la fecha de cierre de cada empresa, su última información anual y trimestral, y evitar suponer que todas cierran en diciembre o que todos los ejercicios 2026 siguen abiertos. Mostrar por separado el último año fiscal cerrado y los datos parciales acumulados del año fiscal en curso, con sus fechas y enlaces a fuentes. El horizonte proyectado se deriva del ejercicio fiscal base pertinente, no se fija universalmente en 2026–2030.

Solo se ajustaron textos del wireframe; el modelo financiero y la calculadora operativa permanecen intactos.

## Ajuste visual v0.7.3 — 2026 en primer plano y etapas 4–5 (13/11/2026)

La autora solicita corregir todas las referencias visuales que hagan parecer 2025 el año actual y continuar con la siguiente fase del diseño. En el boceto aislado de `laboratorio/diseno-v07/index.html`:

- Se muestra **Año en curso: 2026** y fecha de referencia 12/11/2026. El resumen usa un ejemplo hipotético de cifras acumuladas de enero a septiembre de 2026, **expresamente parciales y ficticias**.
- Los ejercicios **2016–2025** permanecen en la tabla histórica cerrada; **2025 es el último ejercicio anual cerrado del ejemplo**, no una sustitución incorrecta de 2026. Se añade un bloque independiente «Año en curso · 2026» en cada pestaña de resultados, balance y flujos, sin incorporar el trimestre a sumas anuales ni al slider 1–10 años.
- La etapa 2 muestra el FCF parcial del año en curso (ejemplo 2026), CapEx acumulado y D&A parcial; la estimación editable de mantenimiento se rotula explícitamente para el **periodo 2026–2030**. La D&A del último año cerrado 2025 puede usarse como simple referencia, **nunca como cifra confirmada para 2026–2030**.
- La etapa 3 conserva cinco ejercicios anuales cerrados 2021–2025 para comparar, pero identifica por separado los datos parciales del año en curso y mantiene 2026–2030 como horizonte de supuestos.
- La etapa 4 se reduce a los campos visibles **EV/FCF** y **Margen de seguridad**, revisión compacta de deuda/acciones parciales 2026 y tres escenarios conservador/base/optimista con múltiplos **ficticios** 13×/16×/19×. Detalles de sensibilidades y demás variables en ayuda opcional.
- La etapa 5 simplifica resultados con **valor razonable hoy** (referencia de fecha 12/11/2026), **valor teórico en cinco años** (final de 2030) y **nivel de compra con margen de seguridad**. Precio de mercado queda vacío; todos los valores por acción son **ficticios y no reaccionan a las casillas del boceto**.
- Se mantienen paleta, tipografía, selector deslizante de 1–10 años, navegación y estructura móviles. No se modificó la calculadora de producción, el parser SEC ni el motor de valoración.

**Precaución:** la empresa ficticia del boceto cierra en diciembre y para noviembre 2026 el último año fiscal completo es 2025. En una compañía real la fecha fiscal y publicación pueden ser diferentes: la vista deberá identificar siempre el último ejercicio fiscal cerrado, periodos intermedios y fuentes 10-K/10-Q. **No sustituir todos los años 2025 indiscriminadamente por 2026** porque sería presentar cifras anuales incompletas como resultados cerrados. La revisión de fórmulas se mantiene en pausa.

**Estado:** propuesta visual implementada en rama de prueba, pendiente de revisión y aprobación de autora.
