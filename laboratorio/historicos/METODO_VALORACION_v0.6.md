# Calculadora unificada de valor intrínseco · Metodología experimental v0.6

**Estado:** prototipo de laboratorio en PR #6, sin fusión a `main` ni autorización de comercialización. Motor propio. No reproducir expresiones, código ni diseño de la plantilla IDC. Fecha de revisión: 12/11/2026.

## Para qué sirve

Permitir a un inversor individual (principiante o intermedio) revisar estados financieros y construir **un rango de valoración basado en tres escenarios**, sin perder las cifras originales. Mostrar por separado el valor razonable estimado **hoy**, el precio **teórico al final de cinco años** y el nivel de compra con margen de seguridad. Los escenarios no son intervalos estadísticos ni predicciones de cotización.

## Qué ve el usuario

1. **Históricos.** Buscar empresa, consultar resultados, balance y flujo de efectivo, distinguir 5/10 ejercicios, origen SEC y ajustes manuales.
2. **FCF y CapEx.** Comparar flujo operativo, CapEx registrado en activos fijos (sin desglose mantenimiento/crecimiento), D&A y FCF convencional: `CFO − CapEx registrado`. El usuario puede estimar el mantenimiento; usar D&A como aproximación es una **decisión editable**, no una cifra reportada. Mostrar FCF normalizado como hipótesis, nunca como caja observada.
3. **Próximos cinco años.** Supuestos de crecimiento anual de ventas, margen operativo, impuestos operativos, inversión para crecer por cada 100 USD de ventas adicionales y cambios de capital de trabajo por cada 100 USD adicionales. Campos por año opcionales. No recomendar automáticamente tasas no verificadas.
4. **Valoración.** Múltiplo de salida empresarial sobre FCF del negocio, tasa anual de descuento del negocio, margen de seguridad, deuda neta y número de acciones. La deuda extraída de SEC es aproximada y el usuario debe revisarla/copiarla; no se da por verificada. El usuario define diferencias de crecimiento, margen y múltiplo para escenarios conservador y optimista. Opcionales: deuda/acciones futuras, activos no operativos y cotización manual fechada.
5. **Resultado.** Si faltan datos, no calcula precio. Si están completos, presenta tres escenarios, rango de valor presente por acción, valor teórico del año 5, nivel de compra y desglose de cálculos. Es posible regresar y editar.

**Convención visual:** azul grisáceo = datos reportados y cálculos trazables; ámbar con lápiz = hipótesis editables. Las correcciones SEC se identifican y preservan el original.

## Un único método de valoración

Modelo de **flujos de caja del negocio proyectados a cinco años con múltiplo terminal EV/FCFF**, no un múltiplo sobre el CFO−CapEx histórico tomado directamente. Los pasos financieros básicos son:

- Ventas del año `t`: ventas de `t−1` por `(1 + crecimiento_t)`.
- EBIT: ventas proyectadas por margen EBIT elegido.
- Impuesto operativo: `max(0, EBIT) × tasa de impuestos operativos` (no incorpora por defecto NOL ni créditos fiscales).
- NOPAT: `EBIT − impuesto operativo`.
- D&A proyectada: D&A del último ejercicio escalada proporcionalmente con ventas (supuesto simplificado del modelo).
- CapEx mantenimiento proyectado: mantenimiento elegido sobre el último ejercicio, también escalado con ventas (supuesto simplificado).
- CapEx crecimiento: `max(0, incremento de ventas) × inversión para expansión / 100`. Si las ventas disminuyen, este componente se establece en cero; no implica que la empresa no deba seguir invirtiendo.
- Variación de capital de trabajo: `incremento de ventas × capital de trabajo / 100`; puede liberar fondos si caen las ventas.
- **FCFF del negocio:** `NOPAT + D&A − mantenimiento − CapEx crecimiento − Δ capital de trabajo`.
- Valor terminal empresarial en año 5: `FCFF año 5 × múltiplo de salida`. Exige FCFF terminal positivo.
- Valor empresarial hoy: suma de los cinco FCFF descontados a la tasa empresarial (WACC) **más** el valor terminal descontado por cinco años.
- Patrimonio hoy: `EV hoy − deuda neta hoy + otros activos no operativos hoy`. Precio razonable hoy: patrimonio dividido entre acciones actuales verificadas (en millones).
- Patrimonio al final del año 5: `EV terminal año 5 − deuda neta futura + otros activos no operativos futuros`. Precio teórico al año 5: patrimonio terminal dividido entre acciones futuras.
- Nivel de compra bajo valor hoy: `precio razonable hoy × (1 − margen seguridad / 100)`.

La tasa de descuento debe ser compatible con un FCFF de toda la empresa. No mezclar flujo posterior a intereses con el múltiplo EV. La cifra de D&A disponible en SEC puede incluir partidas de distinta naturaleza. Para futuras acciones y deuda, si no se ingresan nuevos valores, el modelo **los mantiene constantes** explícitamente; eso no equivale a prever una recompra, emisión o reducción de deuda. Los activos no operativos opcionales se consideran cero si no se introducen. Las cotizaciones manuales no se verifican automáticamente.

## Tres escenarios: sensibilidades, no probabilidades

- **Conservador:** crecimiento anual y margen EBIT menores que la hipótesis base, y múltiplo terminal inferior.
- **Base:** supuestos elegidos.
- **Optimista:** crecimiento anual, margen EBIT y múltiplo mayores.
- Las diferencias se introducen explícitamente en puntos porcentuales y veces del múltiplo; **no se inventan**. Si no se introducen, se bloquea el cálculo.
- Impuestos, mantenimiento, inversión para crecer y capital de trabajo se mantienen igual entre escenarios salvo hipótesis editadas por año. Es un límite importante.
- El rango de precios actuales muestra el mínimo y el máximo de los tres resultados, **no** un margen estadístico de error.

## Fuentes, límites y criterios de publicación

El parser histórico de SEC y todas las métricas derivadas deben compararse con los 10-K/10-Q y las notas de cada empresa, especialmente deuda neta, CapEx, D&A, compensación en acciones y capital de trabajo. Todavía no se ha certificado la extracción en vivo para AAPL, MSFT y KO.

Se aplicaron pruebas numéricas con casos sintéticos y simulación aislada de las cinco etapas. No equivalen a una auditoría financiera independiente, pruebas de navegador real en computadora/móvil, estudio de UX con principiantes o una revisión legal de derechos de autor/contrato.

Antes de un lanzamiento comercial: reconciliación SEC contra documentos primarios; validación de FCFF con múltiples empresas y sectores; revisión de tratamiento de gastos I+D, arrendamientos, impuestos, deuda y recompras; pruebas de accesibilidad y navegadores; revisión legal y aprobación expresa de la autora. No desplegar ni cobrar desde este laboratorio sin aprobación.

**Uso educativo e informativo; no constituye asesoramiento ni recomendación de inversión.**
