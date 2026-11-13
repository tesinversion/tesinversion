# Auditoría de definiciones — módulo histórico (11 de noviembre de 2026)

**Estado:** investigación y pruebas documentales. No certifica ninguna cifra recuperada por la API SEC Company Facts. La vista previa es experimental; PR #6 en borrador, sin despliegue en producción.

## Fuentes primarias
- Apple FY2026 Form 10-K presentado el 03/11/2026: https://www.sec.gov/Archives/edgar/data/320193/000032019326000026/aapl-20260926.htm
- Apple FY2025 Form 10-K: https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm
- Definiciones de flujo al capital, retorno y reinversión: Damodaran (NYU Stern), https://pages.stern.nyu.edu/~adamodar/

## Benchmark AAPL en millones USD (extraído de las tablas del 10-K FY2026)
| Ejercicio | Ventas | EBIT | CFO | CapEx, desembolso | FCF convencional | Deuda a plazo corriente | Deuda a plazo no corriente | Papel comercial | Deuda a plazo + CP |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FY2025 | 416.161 | 133.050 | 111.482 | 12.715 | 98.767 | 12.350 | 78.328 | 7.979 | 98.657 |
| FY2026 | 478.834 | 158.063 | 145.097 | 9.041 | 136.056 | 9.906 | 68.208 | 1.997 | 80.111 |

Los importes de FY2025 se presentan también como comparativos en el informe FY2026; pueden diferir de versiones previamente registradas cuando hay reclasificaciones o reexpresiones. El FCF convencional = CFO − valor absoluto de CapEx. **No equivale necesariamente a FCFF para el múltiplo EV/FCF.**

## Distinción metodológica esencial
1. **ROIC mostrado, provisional:** NOPAT / promedio del capital invertido al principio y al final del ejercicio. NOPAT = EBIT × (1 − impuestos efectivos). Capital invertido **aproximado** = patrimonio contable + deuda financiera identificada − efectivo y equivalentes.
2. Apple puede mostrar un ROIC contable especialmente elevado por efecto de recompras y bajo capital contable. **No equivale al rendimiento incremental de nuevas inversiones.** Su denominador omite ajustes de arrendamientos, efectivo no operativo, I+D capitalizable y otros efectos contables.
3. **Reinversión mostrada, provisional:** (CapEx − D&A + Δ capital de trabajo operativo aproximado) / NOPAT. No incorpora adquisiciones, determinadas inversiones intangibles, arrendamientos ni ajustes propios de cada negocio. Si NOPAT es no positivo se omite. Una tasa negativa o superior al 100 % puede ser válida y requiere explicación, no una corrección automática.
4. **Ratio de endeudamiento mostrado:** deuda financiera identificada / activos. Es distinto de pasivos totales / activos y de deuda / patrimonio. Esta definición aún requiere aprobación explícita.
5. **Deuda neta / EBITDA mostrado, provisional:** deuda a plazo y préstamos de corto plazo identificados menos caja, dividida entre EBIT + D&A reportadas. Las etiquetas US-GAAP de deuda pueden solaparse; el motor omite cálculo si falta desglose sin solapamiento razonable. La inclusión de arrendamientos debe definirse.
6. **Datos no disponibles:** mostrar «—», no cero. Cada cifra manual debe quedar separada del valor SEC y con motivo/ejercicio fiscal.

## Pruebas de regresión
- `tests/deuda-sec-historicos.cjs`: 12 comprobaciones de escenarios de deuda y ajuste manual, con fixtures sintéticos basados en partidas publicadas de AAPL, MSFT y KO.
- `tests/benchmark-apple-2026.cjs`: datos de 10-K de Apple FY2025/FY2026 transcritos a un formato de prueba inspirado en XBRL. Revisa ingresos, FCF, deuda, márgenes, EPS, ROIC aproximado y recálculo por edición.
- Una prueba con *fixtures* no garantiza la exactitud de la extracción automática Company Facts: falta revisar la respuesta real y la correspondencia de etiquetas y ejercicios por emisor.

## Decisiones pendientes
- Tratar ROIC como una estimación contable, no como retorno incremental.
- Definir capital invertido ajustado (arrendamientos, exceso de caja, goodwill, I+D) y tax rate normalizado.
- Separar reinversión orgánica, adquisiciones y gastos intangibles; documentar la definición que se apruebe.
- Probar el importador contra el 10-K más reciente de cada empresa y detectar ejercicios fiscales distintos.
- No construir ni comercializar valoración EV/FCF hasta definir FCFF compatible con enterprise value y revisar licencias de materiales educativos previos.


## Revisión conceptual del 11/11/2026 — explicación y pendientes
Se añadió en la interfaz un desplegable **«Entender ROIC y reinversión»**. Solo presenta definiciones, un ejemplo didáctico y advertencias; el motor no cambió.

### ROIC reportado hoy
- NOPAT = EBIT × (1 − tipo impositivo efectivo del ejercicio).
- Capital invertido = patrimonio contable + deuda financiera identificada − efectivo y equivalentes.
- ROIC anual = NOPAT / capital invertido medio de dos cierres; histórico = mediana hasta cinco observaciones si al menos tres son válidas.
- **Límite:** el tipo efectivo puede incluir efectos extraordinarios; el capital invertido no incorpora todos los ajustes que se consideran en un ROIC normalizado (arrendamientos, exceso de caja, I+D capitalizable, goodwill, etc.).
- **No equivale** a rentabilidad incremental de capital nuevo. Recompras pueden reducir patrimonio y magnificar el porcentaje.

### Reinversión reportada hoy
- Formula programada = (CapEx − D&A + variación de capital de trabajo aproximado) / NOPAT.
- La función \`nwcApprox\` actualmente suma \`shortDebt\` al pasivo corriente para excluir deuda financiera, pero **\`shortDebt\` solo selecciona una etiqueta** (por ejemplo vencimientos de deuda a plazo), y puede omitir papel comercial y otros préstamos de corto plazo; necesita reconciliación con \`totalDebt\` y sus componentes sin duplicación.
- No incluye adquisiciones ni algunas inversiones intangibles, entre otras diferencias. Una tasa negativa no implica error; necesita explicación.
- No usar el resultado para proyectar beneficios o crecimiento hasta aprobar y probar la metodología.

### Criterios por decidir antes de cambiar las fórmulas
1. ROIC operativo **sin ajustes** frente a ROIC normalizado **con ajustes explícitos**; mostrar ambos si es útil pero no sustituir sin aviso.
2. Impuestos reportados frente a tipo impositivo operativo normalizado y tratamiento de ejercicios extraordinarios.
3. Capital invertido operativo con deuda de arrendamientos, caja excedentaria, intangibles y goodwill.
4. Reinversión **orgánica** separada de adquisiciones e I+D u otros intangibles; control consistente del capital de trabajo operativo.
5. Comparar ROIC histórico con rentabilidad incremental estimada, explicitando que ésta requiere información/hipótesis adicionales.

Fuentes independientes de referencia (no material de cursos): Damodaran, [Return on Capital](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/roc.html) y [Definitions](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/definitions.html). Fórmulas de la implementación verificadas directamente en \`src/sec-historico.cjs\`.
