// ============================================================
// tesinversion.com — Overrides verificados: Ferrari N.V. (RACE)
// Datos extraídos manualmente de filings oficiales SEC
// Moneda: EUR millones (excepto EPS en EUR por acción)
//
// Fuentes:
//   2019–2021 → Form 20-F 2021 (SEC, Feb 2022)
//   2021–2023 → Annual Report & Form 20-F 2023 (SEC)
//   2023–2025 → Annual Report & Form 20-F 2025 (SEC, Mar 2026)
//
// Última verificación: Marzo 2026
// ============================================================

const RACE_OVERRIDES = {

  _meta: {
    currency: 'EUR',
    currencyNote: 'Ferrari reporta en EUR. FMP a veces mezcla EUR/USD en años pre-2022. Todos los overrides están en EUR millones.',
    lastVerified: '2026-03-18',
    sources: [
      '20-F 2021 (Feb 2022) — cubre 2019, 2020, 2021',
      'Annual Report 2023 (SEC) — cubre 2021, 2022, 2023',
      'Annual Report 2025 / 20-F 2025 — cubre 2023, 2024, 2025',
    ],
    fcfNote: 'FCF usado = Free Cash Flow from Industrial Activities (definición Ferrari: OpCF industrial - CapEx PP&E e Intangibles). Más conservador que FCF consolidado grupal.',
    roicNote: 'ROIC calculado manualmente a partir de balance sheet verificado. Fórmula: EBIT×(1-t) / Capital Invertido × 100. Capital Invertido = Equity + DeudaTotal + OperatingLeases - MarketableSecurities.',
  },

  // ── 2019 ──────────────────────────────────────────────────
  // Fuente: 20-F 2021, Income Statement y FCF table
  2019: {
    rev:      3766,   // Net revenues €M
    ebit:      917,   // Operating profit (EBIT) €M
    ebitda:   1269,   // EBITDA = EBIT + D&A (917 + 352)
    da:        352,   // Amortization & depreciation €M
    ni:        699,   // Net profit €M
    eps:      3.71,   // Diluted EPS €
    taxRate:  20.2,   // Tax rate % (176M / 875M EBT)
    fcf:       675,   // FCF Industrial €M (tabla FCF, 20-F 2021)
    capexTotal: 706,  // Investments PP&E + Intangibles €M (tabla FCF)
    grossMargin: 52.1,// (3766-1805)/3766 — coste ventas 1805
    ebitMargin:  24.4,// 917/3766
    ebitdaMargin:33.7,// 1269/3766
    netMargin:   18.6,// 699/3766
    fcfMargin:   17.9,// 675/3766
  },

  // ── 2020 ──────────────────────────────────────────────────
  2020: {
    rev:      3460,
    ebit:      716,
    ebitda:   1143,   // EBIT 716 + D&A 427
    da:        427,
    ni:        609,
    eps:      3.28,
    taxRate:   8.7,   // Anomalía COVID: 58M / 667M EBT (créditos fiscales)
    fcf:       171,   // FCF Industrial €M — muy bajo por COVID
    capexTotal: 709,
    grossMargin: 51.3,
    ebitMargin:  20.7,
    ebitdaMargin:33.0,
    netMargin:   17.6,
    fcfMargin:    4.9,
  },

  // ── 2021 ──────────────────────────────────────────────────
  // Confirmado por ambas fuentes: 20-F 2021 y AR 2023
  2021: {
    rev:      4271,
    ebit:     1075,
    ebitda:   1531,   // EBIT 1075 + D&A 456
    da:        456,
    ni:        833,
    eps:      4.50,
    taxRate:  20.1,   // 209M / 1042M EBT
    fcf:       642,   // FCF Industrial €M
    capexTotal: 737,
    grossMargin: 51.3,
    ebitMargin:  25.2,
    ebitdaMargin:35.8,
    netMargin:   19.5,
    fcfMargin:   15.0,
  },

  // ── 2022 ──────────────────────────────────────────────────
  // Fuente: Annual Report 2023 (SEC)
  2022: {
    rev:      5095,
    ebit:     1227,
    ebitda:   1773,   // EBIT 1227 + D&A 546
    da:        546,
    ni:        939,
    eps:      5.09,
    taxRate:  20.3,   // 239M / 1178M EBT
    fcf:       758,   // FCF Industrial €M
    capexTotal: 805,
    grossMargin: 48.0,
    ebitMargin:  24.1,
    ebitdaMargin:34.8,
    netMargin:   18.4,
    fcfMargin:   14.9,
  },

  // ── 2023 ──────────────────────────────────────────────────
  // Confirmado por AR 2023 y 20-F 2025
  2023: {
    rev:      5970,
    ebit:     1617,
    ebitda:   2279,   // EBIT 1617 + D&A 662
    da:        662,
    ni:       1257,
    eps:      6.90,
    taxRate:  21.5,   // 345M / 1602M EBT
    fcf:       932,   // FCF Industrial €M
    capexTotal: 869,
    grossMargin: 49.8,
    ebitMargin:  27.1,
    ebitdaMargin:38.2,
    netMargin:   21.1,
    fcfMargin:   15.6,
  },

  // ── 2024 ──────────────────────────────────────────────────
  // Fuente: Annual Report 2025 / 20-F 2025
  2024: {
    rev:      6677,
    ebit:     1888,
    ebitda:   2555,   // EBIT 1888 + D&A 667
    da:        667,
    ni:       1526,
    eps:      8.46,
    taxRate:  19.2,   // 363M / 1889M EBT
    fcf:      1027,   // FCF Industrial €M
    capexTotal: 989,
    grossMargin: 50.1,
    ebitMargin:  28.3,
    ebitdaMargin:38.3,
    netMargin:   22.9,
    fcfMargin:   15.4,
  },

  // ── 2025 ──────────────────────────────────────────────────
  // Fuente: Annual Report 2025 / 20-F 2025 (FY cerrado 31 dic 2025)
  2025: {
    rev:      7146,
    ebit:     2110,
    ebitda:   2772,   // EBIT 2110 + D&A 662
    da:        662,
    ni:       1600,
    eps:      8.96,
    taxRate:  22.5,   // 464M / 2064M EBT
    fcf:      1535,   // FCF Industrial €M
    capexTotal: 943,
    grossMargin: 51.7,
    ebitMargin:  29.5,
    ebitdaMargin:38.8,
    netMargin:   22.4,
    fcfMargin:   21.5,
  },

  // ── ROIC VERIFICADO ───────────────────────────────────────
  // Calculado manualmente aplicando la fórmula de tesinversion.com
  // ROIC = EBIT × (1-t) / Capital Invertido × 100
  // Capital Invertido = Equity + DeudaTotal + OperatingLeases − MarketableSecurities
  // Nota: sujeto a revisión cuando se confirme balance sheet EUR vs USD en FMP
  _roic: {
    2019: 29.4,
    2020: 18.2,
    2021: 28.6,
    2022: 31.4,
    2023: 33.8,
    2024: 38.2,
    // 2025: pendiente de verificación de balance sheet 2025
  },

};
