# Arquitectura de la Inversión — valoración guiada v0.4 (propuesta conceptual)

**Fecha:** 11-11-2026  
**Estado:** propuesta de experiencia de usuario; no es metodología de valoración aprobada ni implementación del cálculo.  
**Origen:** instrucción de la autora: que un principiante pueda valorar paso a paso con guía, sin complejidad innecesaria, conservando íntegro el módulo histórico aprobado v0.3.1.  
**Alcance:** diseño funcional independiente. No copiar la estructura, fórmulas expresivas ni presentación de materiales del curso Invertir desde Cero; revisión jurídica comercial pendiente. No desplegar en producción sin aprobación.

## Principio de diseño
Una decisión por pantalla, información precargada desde fuentes verificadas cuando exista, explicación natural y posibilidad de editar. No mostrar entradas técnicas que no ayudan a la decisión del principiante. La precisión y trazabilidad tienen prioridad sobre completar la pantalla.

## Recorrido visible
**1 · Entender el pasado (módulo existente)**: buscar ticker SEC; revisar estados de resultados, balance y flujos; cinco años inicialmente y hasta diez; indicadores clave y fuente por cifra; ajustes manuales por ejercicio fiscal y restauración. No borrar, duplicar ni rehacer esta interfaz. CTA separado: «Empezar valoración».

**2 · Caja sostenible del negocio**: mostrar CFO–CapEx histórico como **referencia descriptiva** y construir, cuando datos y definiciones se validen, flujo disponible para todos los proveedores de capital **FCFF**. Explicar «la caja que puede generar el negocio después de reinvertir»; no sustituir automáticamente FCFF por CFO–CapEx. Si faltan CapEx, depreciación, capital de trabajo o impuestos relevantes, mostrar qué falta y pedir intervención explícita; no rellenar por cero. El usuario revisa y confirma una base de partida, con valores fuente y notas.

**3 · Proyectar cinco años**: proponer una vista simple con supuestos editables de crecimiento anual de ventas, margen EBIT, impuestos sobre beneficio operativo y reinversión operativa neta. Autocompletar solo cuando se haya validado la fuente; permitir editar cada año en detalle mediante «Personalizar por año». Para principiante, preferir valores generales por defecto explicables y la tabla de los 5 años debajo, sin obligar a ingresar 20 cifras. Fórmula conceptual proyectada FCFF_t = EBIT_t × (1−tasa impositiva operativa) − reinversión neta_t. Históricamente NOPAT e inversión neta requieren revisar NWC, adquisiciones y activos intangibles. No asignar por defecto tasa de reinversión provisoria como si fuera confirmada.

**4 · Valorar el negocio**: seleccionar **múltiplo de salida EV/FCFF** (hipótesis editable y justificada) y **tasa de descuento para la empresa (WACC)**, explicada en términos sencillos. Ambos campos son esenciales para un valor presente, no supuestos que se inventan. Deuda neta, otros activos/pasivos no operativos y número de acciones diluidas se precargan de información verificada, quedan visibles y corregibles. Separar EBITDA y PER como posibilidades posteriores, no mezclar métodos al inicio.

**5 · Resultado**: presentar el **valor razonable estimado hoy por acción**, precio de compra con margen de seguridad seleccionado, desglose breve de cómo se obtuvo, sensibilidad y advertencia sobre hipótesis. Cotización de mercado y fecha solo cuando exista fuente de precios verificable. «Precio estimado dentro de cinco años» debe tener etiqueta y supuestos propios de deuda y acciones futuras: no confundirlo con precio actual ni presentarlo automáticamente sin datos. Botón «Editar supuestos» y exportación posterior, conservando el origen de cada dato. Un escenario base editable primero; otros escenarios se incorporan más adelante.

## Coherencia financiera: EV/FCFF + descuento (modelo combinado)
No replicar ninguna fórmula de un archivo privado de terceros. Fuente conceptual independiente CFA Institute, *Free Cash Flow Valuation* (2026): https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/free-cash-flow-valuation ; Damodaran, NYU Stern: https://pages.stern.nyu.edu/~adamodar/New_Home_Page/littlebook/cashflows.htm

- FCFF_t = EBIT_t × (1 − impuestos operativos_t) − reinversión neta_t. La historia CFO−CapEx es una métrica distinta; puede servir de contraste, no sustituir automáticamente el flujo empresarial.
- Valor terminal al final del año 5 = FCFF_5 × múltiplo EV/FCFF de salida (la selección del múltiplo requiere justificación).
- EV hoy = suma de FCFF de los 5 años traídos a valor presente con WACC + valor terminal traído al presente con WACC.
- Capital atribuible a accionistas = EV hoy + activos no operativos relevantes − deuda y otras reclamaciones pertinentes, sin duplicar caja ni arrendamientos.
- Valor por acción hoy = valor atribuible a accionistas / acciones diluidas adecuadas.
- Precio de entrada con margen de seguridad = valor por acción × (1 − margen elegido).
- **Clasificación rigurosa:** el uso de un múltiplo de salida incorpora valoración relativa, aunque se descuenten flujos intermedios. Describir como «estimación de valor basada en flujos y múltiplo EV/FCFF», no como precio intrínseco objetivo, único o garantizado.
- El WACC es una tasa de descuento, **no** el método principal. El usuario eligió EV/FCF; se hará internamente consistente como EV/FCFF.
- Datos de compañías financieras o empresas con estructuras contables atípicas requieren método específico o aviso de no aplicabilidad.

## Experiencia UI estilo macOS
- Conservar la interfaz histórica v0.3.1 y un panel inicial limpio: [Históricos] [Valorar empresa] (segunda opción solo cuando esté lista para prueba).
- Navegación: progreso 1 de 5, Anterior/Continuar, guardar localmente trabajo y volver a editar supuestos. Nunca anunciar que un dato queda guardado hasta verificar persistencia.
- Por pantalla: título que formule una pregunta clara, ≤ 3–5 campos principales, ejemplos breves, enlaces «¿Qué significa?» y «Ver cálculo» opcionales.
- Mostrar procedencia: SEC, cálculo derivado o ajuste del usuario, con año fiscal preciso.
- Los ajustes manuales de datos históricos siguen estando separados del valor original SEC.
- No añadir una tabla extensa de 10 años y proyecciones en una sola pantalla, ni introducir ajustes contables de auditoría en el recorrido básico.
- Responsividad, accesibilidad, formato de dinero, números negativos, errores y estados de carga; no bloquear una corrección si hay forma verificable de documentarla.

## Bloqueos antes de construir un motor calculador fiable
1. Aprobar definiciones de FCFF e inversión neta (incluidas adquisiciones, intangibles y NWC), sobre todo cuando las etiquetas SEC son incompletas.
2. Revisar el puente entre valor empresarial, deuda neta, otros activos, intereses minoritarios, arrendamientos y acciones diluidas.
3. Definir el uso de WACC y el criterio de múltiplo de salida documentado.
4. Ejecutar pruebas numéricas manuales independientes con empresas diversas y evitar valores ficticios no etiquetados.
5. Comprobar acceso a cotización y timestamp antes de mostrar margen vs mercado.
6. Mantener la PR #6 en borrador y la web pública intacta; publicación y comercialización necesitan autorización y revisión jurídica.

## Próximo entregable
Prototipo navegable de pantallas paso a paso **solo en rama de prueba**, con datos ficticios inequívocamente marcados y sin motor de precios efectivo hasta validar las fórmulas. Presentar a la autora para aprobación antes de conectar un precio real.
