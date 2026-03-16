// ============================================================
// tesinversion.com — Base de datos de empresas
// Para añadir una empresa nueva: añade un objeto al array COMPANIES
// Todo lo demás (index, comparador, empresa) se actualiza solo.
// ============================================================

const COMPANIES = [

  // ── FERRARI ──────────────────────────────────────────────
  {
    ticker:     'RACE',
    name:       'Ferrari N.V.',
    exchange:   'NYSE · EXM',
    sector:     'Lujo automotriz',
    country:    'Italia',
    cat:        ['lujo'],
    logo:       { file:'race-logo.png', bg:'#ffffff', fallback:'SF' },
    qs:         87,
    // Tarjeta del index
    metrics:    ['ROIC 38.2%', 'EBIT 27.4%', 'FCF €1.42B'],
    signals:    [
      { label:'Caja neta', type:'g' },
      { label:'Recompras 5A', type:'g' },
      { label:'Valoración exigente', type:'a' },
    ],
    tesis:      { published: false, date: null },
    // Textos editoriales de la portada
    headline:   'Ferrari no vende coches.\n<em>Vende la imposibilidad de tenerlo.</em>',
    deck:       'Un análisis del monopolio del lujo más rentable del mundo: por qué su modelo es prácticamente irrepetible, qué riesgos no se deben ignorar, y cuánto deberías pagar hoy por él.',
    readTime:   22,
    // Pills de la portada
    pills: [
      { label: 'Market Cap $74.8B', type: '' },
      { label: 'Caja neta +€824M', type: 'green' },
      { label: 'PER 46.2x', type: 'amber' },
    ],
    // Señales hero
    heroSignals: [
      { label:'ROIC 38.2% — excepcional', type:'g' },
      { label:'Caja neta +€824M', type:'g' },
      { label:'Recompras 5 años', type:'g' },
      { label:'FCF conversion 84%', type:'g' },
      { label:'Valoración exigente', type:'a' },
    ],
    // Textos secciones (los que no vienen del API)
    sections: {
      negocio: {
        intro: `Ferrari no opera en el mercado automotriz convencional. Su modelo se basa en la escasez controlada — fiel a la filosofía del fundador de <em>"vender un coche menos de lo que el mercado demanda"</em>. Con producción limitada a ~14,000 unidades anuales, listas de espera de 2–4 años y un precio medio (ASP) de €400k que sube cada año, Ferrari invierte la dinámica oferta-demanda habitual.`,
        pullquote: '"Es un bien Veblen en estado puro: cuanto más sube el precio, más deseable se vuelve."',
      },
      historia: {
        intro: `En 1947, con la Segunda Guerra Mundial recién terminada, Enzo Ferrari decidió construir un motor de 12 cilindros. El IPO en 2015 fue el momento más revelador de la historia reciente — desde entonces la acción se ha multiplicado por más de 8×.`,
      },
      moat: {
        verdict: 'Moat real y multidimensional — pricing power excepcional sostenido durante décadas.',
      },
      reflexion: {
        conclusion: `Ferrari es una de las mejores empresas del mundo. El único problema es que el mercado también lo sabe. A precio actual el margen de seguridad en escenario base es de solo +14%. No es zona de compra agresiva — es empresa para tener en el radar y acumular en correcciones.`,
        queueWatch: `Guidance EBIT margin Q1/Q2 2025, evolución del ASP, recepción del Ferrari elettrica, y que la lista de espera se mantenga intacta.`,
      },
    },
    // Valoración mock (hasta que conectemos DCF real)
    valuation: {
      conservative: { price: '$348', desc: 'FCF CAGR 8% · EV/FCF 38x' },
      base:         { price: '$480', desc: 'FCF CAGR 12% · EV/FCF 44x' },
      optimistic:   { price: '$610', desc: 'FCF CAGR 16% · EV/FCF 50x' },
      price15:      '$318',
      marginBase:   '+14%',
    },
  },

  // ── MICROSOFT ─────────────────────────────────────────────
  {
    ticker:     'MSFT',
    name:       'Microsoft Corporation',
    exchange:   'NASDAQ',
    sector:     'Software / Cloud / IA',
    country:    'Estados Unidos',
    cat:        ['tech'],
    logo:       { file:'msft-logo.png', bg:'#ffffff', fallback:'MSFT', isMsft: true },
    qs:         92,
    metrics:    ['ROIC 28.4%', 'EBIT 43.1%', 'FCF $74B'],
    signals:    [
      { label:'Azure +29%', type:'g' },
      { label:'FCF conv >90%', type:'g' },
      { label:'CapEx IA expansión', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'Microsoft no es solo software.\n<em>Es una red de productos, nube e IA diseñada para volverse indispensable.</em>',
    deck:       '¿Puede Microsoft convertir su apuesta histórica en IA en retornos sostenibles a largo plazo, o el peso del CapEx terminará erosionando la rentabilidad que durante décadas la hizo extraordinaria?',
    readTime:   22,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: 'Azure +29% YoY', type: 'blue' },
      { label: 'PER $—', type: 'amber', id:'coverPer' },
    ],
    heroSignals: [
      { label:'FCF conversion >90%', type:'g' },
      { label:'Azure creciendo +29%', type:'g' },
      { label:'Dividendo 20 años', type:'g' },
      { label:'Recompras netas', type:'g' },
      { label:'CapEx IA en expansión', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `Microsoft es un compounder de alta calidad construido sobre tres pilares que se refuerzan mutuamente: un ecosistema difícil de dejar, ingresos recurrentes que crecen año tras año, y una posición cada vez más central en la infraestructura digital global.`,
        pullquote: '"Casi ninguna empresa en el mundo puede permitirse no usar Microsoft. Esa es la diferencia entre una empresa de software y una empresa de infraestructura."',
      },
      historia: {
        intro: `Pocas empresas han sobrevivido tres transformaciones tecnológicas radicales y salido más fuertes de cada una. La era Nadella desde 2014 es el caso de estudio más importante de la última década — el precio de la acción se multiplicó por más de 12× en su mandato.`,
      },
      moat: {
        verdict: 'Moat estructural excepcional — switching costs que hacen prácticamente imposible salir.',
      },
      reflexion: {
        conclusion: `Microsoft es extraordinaria. El margen de seguridad es positivo en escenario base (+22%) pero ajustado. Es empresa para acumular en correcciones. Por debajo de $370 la relación riesgo/retorno se vuelve mucho más atractiva.`,
        queueWatch: `Crecimiento de Azure cada trimestre, adopción de pago de Copilot en M365, evolución del CapEx, y márgenes del segmento Intelligent Cloud.`,
      },
    },
    valuation: {
      conservative: { price: '$340', desc: 'IA lenta · FCF CAGR 8%' },
      base:         { price: '$520', desc: 'IA según plan · FCF CAGR 14%' },
      optimistic:   { price: '$680', desc: 'IA supera · FCF CAGR 20%' },
      price15:      '$340',
      marginBase:   '+22%',
    },
  },

  // ── META ──────────────────────────────────────────────────
  {
    ticker:     'META',
    name:       'Meta Platforms Inc.',
    exchange:   'NASDAQ',
    sector:     'Redes sociales / IA',
    country:    'Estados Unidos',
    cat:        ['tech'],
    logo:       { file:'meta-logo.png', bg:'#ffffff', fallback:'META' },
    qs:         88,
    metrics:    ['ROIC ~35%', 'EBIT ~42%', 'FCF $52B'],
    signals:    [
      { label:'Reels monetización', type:'g' },
      { label:'IA generativa propia', type:'g' },
      { label:'Reality Labs pérdidas', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'Meta no es una red social.\n<em>Es la mayor plataforma de atención humana del planeta.</em>',
    deck:       '3.2 mil millones de personas abren una app de Meta cada día. La pregunta no es si ese activo tiene valor — es si Zuckerberg puede monetizarlo sin destruirlo.',
    readTime:   20,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: '3.2B usuarios activos', type: 'blue' },
      { label: 'PER $—', type: 'amber', id:'coverPer' },
    ],
    heroSignals: [
      { label:'FCF $52B anuales', type:'g' },
      { label:'Reels superó TikTok en tiempo', type:'g' },
      { label:'Llama 3 modelo propio', type:'g' },
      { label:'Reality Labs −$17B/año', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `Meta gana dinero de una sola manera: publicidad digital. El 97% de sus ingresos viene de mostrar anuncios a los usuarios de Facebook, Instagram, WhatsApp y Threads. Lo que la hace extraordinaria no es el modelo — es la escala y la eficiencia con la que lo ejecuta.`,
        pullquote: '"El negocio de Meta es simple: captura atención, véndela a anunciantes. La IA lo está haciendo más eficiente que nunca."',
      },
      historia: {
        intro: `Meta nació como una red universitaria en 2004 y se convirtió en el mayor sistema de comunicación humana de la historia. La transformación más importante fue la adquisición de Instagram en 2012 por $1B — hoy vale más de $100B. La segunda fue sobrevivir el pivot fallido al metaverso y reinventarse como empresa de IA en 2023.`,
      },
      moat: {
        verdict: 'Moat de efecto red muy fuerte en el corto plazo. El riesgo es la preferencia de los jóvenes por TikTok.',
      },
      reflexion: {
        conclusion: `Meta es una empresa de calidad con FCF extraordinario y management que ha demostrado capacidad de adaptación. El riesgo principal no es financiero — es cultural. Si las nuevas generaciones abandonan las apps de Meta, el negocio puede deteriorarse más rápido de lo que los modelos actuales incorporan.`,
        queueWatch: `Tiempo de uso por demografía (especialmente 18-24 años), crecimiento de revenue por usuario (ARPU), adopción de Threads, y pérdidas de Reality Labs.`,
      },
    },
    valuation: {
      conservative: { price: '$420', desc: 'FCF CAGR 10% · PER 22x' },
      base:         { price: '$620', desc: 'FCF CAGR 18% · PER 28x' },
      optimistic:   { price: '$820', desc: 'FCF CAGR 25% · PER 34x' },
      price15:      '$440',
      marginBase:   '+15%',
    },
  },

  // ── APPLE ─────────────────────────────────────────────────
  {
    ticker:     'AAPL',
    name:       'Apple Inc.',
    exchange:   'NASDAQ',
    sector:     'Tecnología / Consumo',
    country:    'Estados Unidos',
    cat:        ['tech'],
    logo:       { file:'aapl-logo.png', bg:'#ffffff', fallback:'AAPL' },
    qs:         91,
    metrics:    ['ROIC >150%', 'Margen neto 26%', 'FCF $110B'],
    signals:    [
      { label:'Ecosistema cerrado', type:'g' },
      { label:'Services 24% revenue', type:'g' },
      { label:'China dependencia', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'Apple no vende dispositivos.\n<em>Vende un sistema operativo de vida del que nadie quiere salir.</em>',
    deck:       'El verdadero negocio de Apple no es el iPhone — es el ecosistema que hace que cambiar de iPhone sea el mayor inconveniente tecnológico de la vida moderna.',
    readTime:   20,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: 'Services $100B/año', type: 'blue' },
      { label: 'PER $—', type: 'amber', id:'coverPer' },
    ],
    heroSignals: [
      { label:'Ecosistema irrompible', type:'g' },
      { label:'Services creciendo +14%', type:'g' },
      { label:'Recompras $90B/año', type:'g' },
      { label:'China 18% del revenue', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `Apple tiene el negocio de hardware más rentable de la historia y está en proceso de convertirse en una empresa de servicios. El iPhone genera el 52% del revenue, pero Services — App Store, iCloud, Apple Pay, Apple TV+ — genera márgenes del 74% y ya representa el 24% del total.`,
        pullquote: '"El iPhone es el gancho. El ecosistema es la trampa. Los servicios son el negocio."',
      },
      historia: {
        intro: `Apple murió dos veces y resucitó dos veces. En 1997 estaba a 90 días de la quiebra cuando Steve Jobs volvió. En 2007 reinventó el mundo con el iPhone. En 2023 Tim Cook completó la transformación hacia servicios — hoy Services genera más margen absoluto que todo el negocio de Mac.`,
      },
      moat: {
        verdict: 'Switching costs más altos del mundo en el segmento premium. El riesgo regulatorio antimonopolio es real.',
      },
      reflexion: {
        conclusion: `Apple es la empresa con mayor capitalización del mercado por una razón: tiene el ecosistema más valioso y difícil de abandonar del mundo. El precio actual descuenta mucho crecimiento en Services. Es una empresa para mantener en cartera, no para comprar agresivamente.`,
        queueWatch: `Crecimiento de Services (especialmente App Store tras litigios), adopción de Apple Intelligence, evolución de ventas en China y timeline del Apple Car.`,
      },
    },
    valuation: {
      conservative: { price: '$160', desc: 'FCF CAGR 6% · PER 24x' },
      base:         { price: '$220', desc: 'FCF CAGR 10% · PER 28x' },
      optimistic:   { price: '$300', desc: 'FCF CAGR 15% · PER 32x' },
      price15:      '$170',
      marginBase:   '+5%',
    },
  },

  // ── VISA ──────────────────────────────────────────────────
  {
    ticker:     'V',
    name:       'Visa Inc.',
    exchange:   'NYSE',
    sector:     'Pagos digitales',
    country:    'Estados Unidos',
    cat:        ['pagos'],
    logo:       { file:'visa-logo.png', bg:'#ffffff', fallback:'VISA' },
    qs:         94,
    metrics:    ['ROIC ~45%', 'Margen neto 54%', 'FCF $20B'],
    signals:    [
      { label:'Sin riesgo de crédito', type:'g' },
      { label:'Duopolio real', type:'g' },
      { label:'Regulación antimonopolio', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'Visa no mueve dinero.\n<em>Cobra un peaje por cada transacción del mundo.</em>',
    deck:       'El modelo de negocio más cercano a la perfección que existe en los mercados públicos: ingresos crecientes, sin riesgo de crédito, márgenes del 54% y una posición de duopolio que ningún competidor puede romper a escala global.',
    readTime:   18,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: '200B transacciones/año', type: 'blue' },
      { label: 'PER $—', type: 'amber', id:'coverPer' },
    ],
    heroSignals: [
      { label:'Margen neto 54%', type:'g' },
      { label:'Sin riesgo de crédito', type:'g' },
      { label:'Duopolio con Mastercard', type:'g' },
      { label:'Recompras consistentes', type:'g' },
      { label:'Presión regulatoria', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `Visa no presta dinero. No asume el riesgo si no pagas tu tarjeta — eso es del banco. Visa solo procesa la transacción y cobra un pequeño porcentaje por hacerlo. Con 200 mil millones de transacciones al año y márgenes del 54%, es el negocio de cobrar peajes más escalable del mundo.`,
        pullquote: '"Visa tiene el mejor modelo de negocio del mercado: crece con el comercio global sin asumir ningún riesgo de crédito."',
      },
      historia: {
        intro: `Visa nació en 1958 dentro de Bank of America como BankAmericard. Se convirtió en una red independiente en 1976 y salió a bolsa en 2008 en el mayor IPO de la historia hasta entonces. Hoy procesa el 40% de todas las transacciones con tarjeta del mundo.`,
      },
      moat: {
        verdict: 'El moat más sólido del mercado: efectos de red de dos lados imposibles de replicar a escala global.',
      },
      reflexion: {
        conclusion: `Visa es probablemente la empresa con el modelo de negocio más cercano a la perfección en los mercados públicos. El único riesgo estructural real es regulatorio — y es un riesgo que lleva 30 años sin materializarse. Es una empresa para mantener para siempre.`,
        queueWatch: `Volumen de pagos globales, penetración de pagos digitales vs efectivo en mercados emergentes, y cualquier desarrollo regulatorio de la DOJ sobre tarifas de intercambio.`,
      },
    },
    valuation: {
      conservative: { price: '$240', desc: 'FCF CAGR 8% · PER 28x' },
      base:         { price: '$320', desc: 'FCF CAGR 12% · PER 32x' },
      optimistic:   { price: '$420', desc: 'FCF CAGR 16% · PER 36x' },
      price15:      '$255',
      marginBase:   '+18%',
    },
  },

  // ── MASTERCARD ────────────────────────────────────────────
  {
    ticker:     'MA',
    name:       'Mastercard Incorporated',
    exchange:   'NYSE',
    sector:     'Pagos digitales',
    country:    'Estados Unidos',
    cat:        ['pagos'],
    logo:       { file:'ma-logo.png', bg:'#ffffff', fallback:'MA' },
    qs:         93,
    metrics:    ['ROIC ~50%', 'Margen neto 46%', 'FCF $12B'],
    signals:    [
      { label:'Modelo gemelo a Visa', type:'g' },
      { label:'Mayor exposición internacional', type:'g' },
      { label:'Regulación tarifas', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'Mastercard es el gemelo de Visa.\n<em>Pero con mayor exposición a los mercados donde el efectivo todavía domina.</em>',
    deck:       'Si Visa es la empresa de pagos de los mercados desarrollados, Mastercard tiene una ventaja marginal en mercados emergentes donde la transición del efectivo al digital acaba de empezar.',
    readTime:   18,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: '150B transacciones/año', type: 'blue' },
      { label: 'PER $—', type: 'amber', id:'coverPer' },
    ],
    heroSignals: [
      { label:'Margen neto 46%', type:'g' },
      { label:'Sin riesgo de crédito', type:'g' },
      { label:'Mercados emergentes runway', type:'g' },
      { label:'Recompras agresivas', type:'g' },
      { label:'Presión regulatoria', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `El modelo de Mastercard es idéntico al de Visa en su esencia: una red de procesamiento de pagos que cobra una pequeña tarifa por cada transacción sin asumir riesgo de crédito. La diferencia está en la geografía: Mastercard tiene mayor presencia en Europa, Latinoamérica y África.`,
        pullquote: '"Mastercard y Visa son el duopolio más difícil de atacar del mundo. Han tenido 60 años para construir su red y ningún entrante ha podido replicarla a escala global."',
      },
      historia: {
        intro: `Mastercard nació en 1966 como Master Charge, creada por un consorcio de bancos para competir con BankAmericard. Se convirtió en Mastercard en 1979 y salió a bolsa en 2006, dos años antes que Visa.`,
      },
      moat: {
        verdict: 'Idéntico al de Visa — duopolio de red de dos lados. Marginalmente mejor posición en mercados emergentes.',
      },
      reflexion: {
        conclusion: `Mastercard y Visa son prácticamente intercambiables como inversiones. Si tuviera que elegir una, elegiría Mastercard por la exposición marginal mayor a mercados emergentes donde la transición al pago digital tiene décadas de runway.`,
        queueWatch: `Volumen por región (especialmente Latinoamérica y África), crecimiento de servicios de valor añadido, y regulación de tarifas en Europa.`,
      },
    },
    valuation: {
      conservative: { price: '$380', desc: 'FCF CAGR 8% · PER 30x' },
      base:         { price: '$520', desc: 'FCF CAGR 13% · PER 34x' },
      optimistic:   { price: '$680', desc: 'FCF CAGR 18% · PER 38x' },
      price15:      '$390',
      marginBase:   '+20%',
    },
  },

  // ── AUTOZONE ──────────────────────────────────────────────
  {
    ticker:     'AZO',
    name:       'AutoZone Inc.',
    exchange:   'NYSE',
    sector:     'Retail autopartes',
    country:    'Estados Unidos',
    cat:        ['consumo'],
    logo:       { file:'azo-logo.png', bg:'#ffffff', fallback:'AZO' },
    qs:         89,
    metrics:    ['ROIC >50%', 'Margen EBIT 21%', 'FCF $3.5B'],
    signals:    [
      { label:'Share count −75% en 20A', type:'g' },
      { label:'Demanda no cíclica', type:'g' },
      { label:'Deuda estructural alta', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'AutoZone no vende repuestos.\n<em>Es la máquina de recompra de acciones más consistente del mercado.</em>',
    deck:       'En 20 años AutoZone ha reducido su share count un 75% con recompras financiadas con deuda. Es un caso de estudio en capital allocation agresivo — y la razón por la que el ROIC oficial supera el 50%.',
    readTime:   18,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: '7,100 tiendas en USA', type: 'blue' },
      { label: 'Share count −75% 20A', type: 'green' },
    ],
    heroSignals: [
      { label:'Recompras 20 años consecutivos', type:'g' },
      { label:'Demanda inelástica', type:'g' },
      { label:'Posición #1 en autopartes', type:'g' },
      { label:'Deuda neta estructural', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `AutoZone vende repuestos y accesorios para coches. Su cliente principal es el "do-it-yourself" — la persona que prefiere reparar su coche ella misma antes que pagar a un mecánico. En una economía donde los coches viejos duran más y los nuevos son inasequibles, ese cliente no desaparece en ningún ciclo económico.`,
        pullquote: '"AutoZone es el ejemplo más puro de capital allocation disciplinado en el mercado americano. No ha pagado un solo dividendo en su historia. Todo va a recompras."',
      },
      historia: {
        intro: `AutoZone abrió su primera tienda en 1979 en Tennessee. Hoy tiene más de 7,100 tiendas en Estados Unidos y está expandiéndose en México y Brasil. La decisión de focalizarse exclusivamente en recompras en lugar de dividendos desde 1998 es lo que lo convierte en un caso de estudio en capital allocation.`,
      },
      moat: {
        verdict: 'Moat moderado basado en escala, densidad de red y marca. No tiene pricing power extraordinario pero sí posición dominante.',
      },
      reflexion: {
        conclusion: `AutoZone es una empresa de calidad con un capital allocation extraordinario. La deuda neta alta puede parecer un riesgo pero es estructural y gestionada con disciplina durante décadas. Es una empresa para inversores de largo plazo que entienden el modelo de recompras financiadas con deuda.`,
        queueWatch: `Ventas same-store-sales, expansión México/Brasil, evolución de la deuda, y cualquier señal de que el DIY consumer se está debilitando.`,
      },
    },
    valuation: {
      conservative: { price: '$2,400', desc: 'FCF CAGR 6% · PER 18x' },
      base:         { price: '$3,200', desc: 'FCF CAGR 10% · PER 22x' },
      optimistic:   { price: '$4,000', desc: 'FCF CAGR 14% · PER 26x' },
      price15:      '$2,600',
      marginBase:   '+12%',
    },
  },

  // ── AMAZON ────────────────────────────────────────────────
  {
    ticker:     'AMZN',
    name:       'Amazon.com Inc.',
    exchange:   'NASDAQ',
    sector:     'Cloud / Ecommerce / IA',
    country:    'Estados Unidos',
    cat:        ['tech'],
    logo:       { file:'amzn-logo.png', bg:'#ffffff', fallback:'AMZN' },
    qs:         87,
    metrics:    ['AWS ~60% EBIT', 'Margen EBIT 10%', 'FCF $60B'],
    signals:    [
      { label:'AWS líder cloud global', type:'g' },
      { label:'Prime flywheel', type:'g' },
      { label:'Márgenes ecommerce bajos', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'Amazon son dos empresas en una.\n<em>Una startup de ecommerce que subsidia el proveedor de infraestructura más rentable del mundo.</em>',
    deck:       'AWS genera el 60% del beneficio operativo con solo el 17% del revenue. El ecommerce es el envoltorio que mantiene a 200 millones de usuarios Prime enganchados al ecosistema donde AWS puede vender.',
    readTime:   22,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: 'AWS 31% cuota cloud', type: 'blue' },
      { label: 'PER $—', type: 'amber', id:'coverPer' },
    ],
    heroSignals: [
      { label:'AWS #1 en cloud global', type:'g' },
      { label:'200M usuarios Prime', type:'g' },
      { label:'FCF +$60B anuales', type:'g' },
      { label:'Márgenes ecommerce <2%', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `Amazon tiene tres negocios completamente distintos que coexisten bajo una marca: ecommerce (bajo margen, altísimo volumen), AWS (alto margen, crecimiento acelerado), y publicidad (el negocio más silencioso y rentable de la empresa, ya generando $50B+). La clave para entender Amazon es entender que AWS no subsidia al ecommerce — al revés.`,
        pullquote: '"Si retiraras AWS de Amazon, quedaría una empresa de logística con márgenes de supermercado. Si retiraras el ecommerce de Amazon, quedaría el proveedor de infraestructura más valioso del mundo."',
      },
      historia: {
        intro: `Amazon empezó vendiendo libros en 1994. La decisión más importante de Jeff Bezos no fue el ecommerce — fue lanzar AWS en 2006 cuando nadie entendía qué era el cloud computing. Esa decisión convirtió una empresa de retail en la empresa de infraestructura más valiosa del mundo.`,
      },
      moat: {
        verdict: 'Triple moat: escala en logística, posición dominante en cloud, y efecto red de Prime/Marketplace.',
      },
      reflexion: {
        conclusion: `Amazon es una empresa con múltiples motores de crecimiento y un historial de reinvención única. La complejidad del negocio hace difícil la valoración — el precio correcto depende de qué peso le das a AWS vs ecommerce. A precios razonables es una de las mejores empresas para el largo plazo.`,
        queueWatch: `Crecimiento de AWS (compite directamente con Azure), márgenes del ecommerce en Norteamérica, crecimiento del negocio de publicidad, y CapEx en IA.`,
      },
    },
    valuation: {
      conservative: { price: '$140', desc: 'AWS CAGR 15% · SumOfParts conservador' },
      base:         { price: '$220', desc: 'AWS CAGR 22% · SumOfParts base' },
      optimistic:   { price: '$300', desc: 'AWS CAGR 28% · Publicidad acelera' },
      price15:      '$160',
      marginBase:   '+10%',
    },
  },

  // ── NVIDIA ────────────────────────────────────────────────
  {
    ticker:     'NVDA',
    name:       'NVIDIA Corporation',
    exchange:   'NASDAQ',
    sector:     'Semiconductores / IA',
    country:    'Estados Unidos',
    cat:        ['semi'],
    logo:       { file:'nvda-logo.png', bg:'#ffffff', fallback:'NVDA' },
    qs:         90,
    metrics:    ['ROIC >150%', 'Margen EBIT 61%', 'FCF $60B+'],
    signals:    [
      { label:'Monopolio GPUs IA', type:'g' },
      { label:'CUDA ecosistema', type:'g' },
      { label:'Valoración extrema', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'NVIDIA no fabrica chips.\n<em>Fabrica la infraestructura sobre la que se construirá la próxima década de IA.</em>',
    deck:       'NVIDIA tiene hoy la posición más difícil de atacar en tecnología: un monopolio de hardware de IA reforzado por un ecosistema de software (CUDA) que lleva 15 años construyendo. La pregunta no es si vale mucho — es si el precio actual ya descuenta demasiado.',
    readTime:   22,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: 'GPU IA >80% cuota', type: 'blue' },
      { label: 'PER $—', type: 'amber', id:'coverPer' },
    ],
    heroSignals: [
      { label:'Monopolio real en GPUs IA', type:'g' },
      { label:'CUDA: 15 años de ventaja', type:'g' },
      { label:'Margen bruto 75%', type:'g' },
      { label:'Valoración extrema', type:'a' },
      { label:'Riesgo concentración clientes', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `NVIDIA diseña GPUs — unidades de procesamiento gráfico que resultan ser perfectas para el paralelismo masivo que requiere entrenar modelos de IA. El 80%+ del revenue ya viene del Data Center. El CUDA — el ecosistema de software que hace que los GPUs de NVIDIA sean programables — es la barrera de entrada más subestimada del sector.`,
        pullquote: '"Los ingenieros de IA aprenden CUDA antes que cualquier otra herramienta. Cambiar de NVIDIA no es cambiar de hardware — es reescribir años de código y reentrenar a todos tus ingenieros."',
      },
      historia: {
        intro: `NVIDIA fundada en 1993 para GPUs de videojuegos. Jensen Huang apostó por CUDA en 2006 cuando nadie lo veía venir. En 2023, el lanzamiento de ChatGPT convirtió a NVIDIA de empresa de nicho en la empresa más valiosa del mundo en cuestión de meses.`,
      },
      moat: {
        verdict: 'Moat excepcional en el corto plazo. El riesgo de largo plazo es que los clientes (Microsoft, Google, Amazon) diseñen sus propios chips.',
      },
      reflexion: {
        conclusion: `NVIDIA es probablemente la empresa más importante del mundo en este momento. Tiene el monopolio del hardware de IA y el ecosistema de software más difícil de replicar del sector. El único problema es el precio — cotiza con una exigencia que no perdona ninguna decepción. Es una empresa para mantener si ya la tienes, con mucho cuidado si estás comprando ahora.`,
        queueWatch: `Crecimiento de Data Center cada trimestre, progreso de chips alternativos (AMD MI300, Google TPU, custom chips de Microsoft/Amazon), y señales de ciclo de inventario en GPUs.`,
      },
    },
    valuation: {
      conservative: { price: '$60', desc: 'Normalización demanda IA · PER 25x' },
      base:         { price: '$130', desc: 'IA según plan · PER 40x' },
      optimistic:   { price: '$200', desc: 'IA supera · PER 55x' },
      price15:      '$85',
      marginBase:   '+0%',
    },
  },

  // ── GOOGLE ────────────────────────────────────────────────
  {
    ticker:     'GOOGL',
    name:       'Alphabet Inc.',
    exchange:   'NASDAQ',
    sector:     'Publicidad digital / Cloud / IA',
    country:    'Estados Unidos',
    cat:        ['tech'],
    logo:       { file:'googl-logo.png', bg:'#ffffff', fallback:'GOOG' },
    qs:         89,
    metrics:    ['ROIC ~25%', 'Margen EBIT 28%', 'FCF $70B'],
    signals:    [
      { label:'Monopolio búsqueda 91%', type:'g' },
      { label:'Google Cloud acelerando', type:'g' },
      { label:'Riesgo IA en búsqueda', type:'a' },
    ],
    tesis:      { published: false, date: null },
    headline:   'Google es el mayor negocio de publicidad de la historia.\n<em>Y también la empresa que más tiene que perder si la IA cambia cómo buscamos.</em>',
    deck:       'Alphabet controla el 91% de las búsquedas globales y cobra a cada anunciante del mundo por aparecer ahí. La ironía es que la misma IA que está creando con DeepMind podría destruir el modelo de búsqueda que lo financia.',
    readTime:   20,
    pills: [
      { label: 'Market Cap $—', type: '', id:'coverMktCap' },
      { label: '91% cuota búsqueda', type: 'blue' },
      { label: 'PER $—', type: 'amber', id:'coverPer' },
    ],
    heroSignals: [
      { label:'Monopolio búsqueda 91%', type:'g' },
      { label:'YouTube #2 plataforma', type:'g' },
      { label:'Google Cloud +28% YoY', type:'g' },
      { label:'IA amenaza al core business', type:'a' },
      { label:'Riesgo regulatorio antimonopolio', type:'a' },
    ],
    sections: {
      negocio: {
        intro: `Alphabet tiene tres negocios distintos: Google Services (búsqueda, YouTube, Maps — el 86% del revenue), Google Cloud (13% del revenue, creciendo rápido), y Other Bets (Waymo, DeepMind — pérdidas hoy, opcionalidad mañana). El 77% del revenue total viene de publicidad digital.`,
        pullquote: '"Google tiene el negocio de publicidad más rentable del mundo. La pregunta existencial es si ChatGPT es el Netscape que anticipa el fin de la búsqueda por palabras clave."',
      },
      historia: {
        intro: `Google fundado en 1998 por Larry Page y Sergey Brin. El AdWords en 2000 creó el modelo de publicidad por clic que define el negocio hoy. La salida a bolsa en 2004 y la reorganización como Alphabet en 2015 para separar el core de los moonshots.`,
      },
      moat: {
        verdict: 'Moat muy sólido hoy. El riesgo de largo plazo es único: la IA de Google podría disrumpir su propio negocio si la búsqueda tradicional pierde cuota frente a LLMs.',
      },
      reflexion: {
        conclusion: `Alphabet es una empresa de calidad con el dilema estratégico más interesante del mercado: tiene que invertir para que la IA no destruya su negocio, sabiendo que esa misma inversión puede destruirlo antes que la competencia. Es una empresa con upside real si navega la transición bien — y riesgo real si no lo hace.`,
        queueWatch: `Evolución de búsquedas vs ChatGPT/Perplexity, crecimiento de Google Cloud, márgenes del segmento de IA (Gemini), y desarrollos del caso antimonopolio de la DOJ.`,
      },
    },
    valuation: {
      conservative: { price: '$130', desc: 'IA erosiona búsqueda · PER 18x' },
      base:         { price: '$200', desc: 'Transición exitosa · PER 24x' },
      optimistic:   { price: '$260', desc: 'IA amplía el moat · PER 28x' },
      price15:      '$145',
      marginBase:   '+25%',
    },
  },

];

// ── FUNCIONES DE AYUDA ────────────────────────────────────
// Obtener empresa por ticker
function getCompany(ticker) {
  return COMPANIES.find(c => c.ticker === ticker.toUpperCase()) || null;
}

// Obtener todas las empresas de una categoría
function getByCategory(cat) {
  return cat === 'all' ? COMPANIES : COMPANIES.filter(c => c.cat.includes(cat));
}

// Logo HTML — devuelve el elemento de logo correcto
function logoHTML(company, size=40) {
  const r = size/2;
  const br = size <= 28 ? '50%' : '10px';
  if(company.logo.isMsft) {
    return `<div style="width:${size}px;height:${size}px;border-radius:${br};background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;border:0.5px solid rgba(0,0,0,0.08)"><svg viewBox="0 0 21 21" width="${size*0.65}" height="${size*0.65}"><rect x="0" y="0" width="10" height="10" fill="#f25022"/><rect x="11" y="0" width="10" height="10" fill="#7fba00"/><rect x="0" y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg></div>`;
  }
  return `<div style="width:${size}px;height:${size}px;border-radius:${br};background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;border:0.5px solid rgba(0,0,0,0.08)"><img src="${company.logo.file}" alt="${company.name}" style="width:${size*0.82}px;height:${size*0.82}px;object-fit:contain" onerror="this.parentElement.innerHTML='<span style=&quot;font-family:'DM Mono',monospace;font-size:${Math.round(size*0.26)}px;font-weight:600;color:#4a4a44&quot;>${company.logo.fallback}</span>'"></div>`;
}

// ── EMPRESAS ADICIONALES (añadidas) ───────────────────────

// ── WALMART ───────────────────────────────────────────────
COMPANIES.push({
  ticker:'WMT', name:'Walmart Inc.', exchange:'NYSE',
  sector:'Retail masivo', country:'Estados Unidos', cat:['consumo'],
  logo:{ file:'wmt-logo.png', bg:'#ffffff', fallback:'WMT' }, qs:84,
  metrics:['Revenue $648B','Margen EBIT 4.1%','FCF $15B'],
  signals:[{label:'#1 retailer mundial',type:'g'},{label:'eCommerce +22%',type:'g'},{label:'Márgenes bajos',type:'a'}],
  tesis:{ published:false, date:null },
  headline:'Walmart no es una tienda.\n<em>Es la mayor empresa de distribución de la historia humana.</em>',
  deck:'$648B de revenue anuales, 2.1 millones de empleados, y una transición a eCommerce que está convirtiendo el gigante del retail físico en la tercera plataforma de publicidad digital más grande de EE.UU.',
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'eCommerce +22%',type:'blue'},{label:'2.1M empleados',type:''}],
  heroSignals:[{label:'#1 retailer del mundo',type:'g'},{label:'eCommerce acelerando',type:'g'},{label:'Walmart+ en crecimiento',type:'g'},{label:'Márgenes muy ajustados',type:'a'}],
  sections:{
    negocio:{intro:'Walmart gana dinero vendiendo volumen a margen mínimo. El margen neto ronda el 2.5% — pero sobre $648B de revenue eso es $16B de beneficio neto. La ventaja competitiva no es el precio por unidad sino la escala logística que ningún competidor puede replicar. Hoy está añadiendo una segunda pata: publicidad digital en su red de tiendas y app.',pullquote:'"Walmart es el mejor negocio de logística del mundo disfrazado de cadena de supermercados."'},
    historia:{intro:'Sam Walton abrió la primera tienda en Rogers, Arkansas en 1962. La filosofía era simple: precios bajos todos los días. Hoy Walmart opera en 19 países, tiene la mayor flota de camiones privada de EE.UU. y está invirtiendo $14B anuales en tecnología para competir con Amazon.'},
    moat:{verdict:'Moat de escala y logística — el más difícil de replicar en retail. Débil en márgenes y diferenciación de producto.'},
    reflexion:{conclusion:'Walmart es una empresa de calidad conservadora — no crecerá al 20% anual, pero tampoco desaparece. La transformación digital es real. Es empresa para inversores que valoran estabilidad y dividendo creciente sobre crecimiento agresivo.',queueWatch:'eCommerce growth, Walmart+ suscriptores, publicidad digital revenue, y evolución de márgenes operativos.'},
  },
  valuation:{conservative:{price:'$70',desc:'CAGR 4% · PER 28x'},base:{price:'$95',desc:'CAGR 8% · PER 32x'},optimistic:{price:'$120',desc:'CAGR 12% · PER 36x'},price15:'$72',marginBase:'+8%'},
});

// ── COSTCO ────────────────────────────────────────────────
COMPANIES.push({
  ticker:'COST', name:'Costco Wholesale Corp.', exchange:'NASDAQ',
  sector:'Retail membresía', country:'Estados Unidos', cat:['consumo'],
  logo:{ file:'cost-logo.png', bg:'#ffffff', fallback:'COST' }, qs:91,
  metrics:['Revenue $254B','Margen memb. 72%','Renovación 93%'],
  signals:[{label:'Membresía 93% renovación',type:'g'},{label:'Sin competencia real',type:'g'},{label:'PER exigente',type:'a'}],
  tesis:{ published:false, date:null },
  headline:'Costco no vende productos.\n<em>Vende el derecho de comprarle a Costco.</em>',
  deck:'El modelo de membresía de Costco tiene un 93% de tasa de renovación y márgenes del 72% en ese segmento. El negocio de retail casi no gana dinero — todo el beneficio viene de que los socios pagan por el privilegio de entrar.',
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'Membresía 93% renov.',type:'green'},{label:'134M socios',type:'blue'}],
  heroSignals:[{label:'93% renovación membresía',type:'g'},{label:'Modelo sin competencia directa',type:'g'},{label:'Lealtad de cliente excepcional',type:'g'},{label:'PER históricamente alto',type:'a'}],
  sections:{
    negocio:{intro:'Costco opera almacenes de grandes dimensiones donde solo pueden entrar los socios. La membresía cuesta $65-130/año y tiene una tasa de renovación del 93% — la más alta de cualquier servicio de suscripción del mercado. El retail en sí funciona casi sin margen; el negocio real es la membresía.',pullquote:'"Costco ha creado el único modelo de retail donde la lealtad del cliente es tan alta que casi no necesita publicidad."'},
    historia:{intro:'Jim Sinegal y Jeffrey Brotman fundaron Costco en 1983 en Seattle. La filosofía de nunca marcar un producto más de un 14% sobre el coste ha permanecido intacta 40 años. Hoy opera 890+ almacenes en 14 países.'},
    moat:{verdict:'Moat de modelo de negocio único — la membresía crea switching costs emocionales y económicos muy reales.'},
    reflexion:{conclusion:'Costco es una de las mejores empresas del mundo en términos de ejecución y lealtad de cliente. La valoración siempre parece cara — y siempre ha sido justificada. Es empresa para mantener indefinidamente.',queueWatch:'Tasa de renovación de membresías, same-store-sales, expansión internacional, y cualquier señal de presión competitiva de Amazon/Walmart.'},
  },
  valuation:{conservative:{price:'$800',desc:'CAGR 8% · PER 38x'},base:{price:'$1,050',desc:'CAGR 12% · PER 44x'},optimistic:{price:'$1,300',desc:'CAGR 16% · PER 50x'},price15:'$820',marginBase:'+5%'},
});

// ── NIKE ──────────────────────────────────────────────────
COMPANIES.push({
  ticker:'NKE', name:'Nike Inc.', exchange:'NYSE',
  sector:'Consumo discrecional / Deporte', country:'Estados Unidos', cat:['consumo'],
  logo:{ file:'nke-logo.png', bg:'#ffffff', fallback:'NKE' }, qs:80,
  metrics:['Revenue $51B','Margen bruto 44%','FCF $4B'],
  signals:[{label:'Marca #1 deporte global',type:'g'},{label:'Modelo DTC creciendo',type:'g'},{label:'China en transición',type:'a'}],
  tesis:{ published:false, date:null },
  headline:'Nike no vende zapatillas.\n<em>Vende la aspiración de ser atleta.</em>',
  deck:'La marca más valiosa del deporte está en transición: de modelo wholesale masivo a direct-to-consumer. La ejecución ha sido difícil — pero el activo de marca subyacente sigue siendo de los más defensibles del mundo.',
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'Marca #1 deporte',type:'blue'},{label:'DTC 45% revenue',type:'green'}],
  heroSignals:[{label:'Marca más valiosa del deporte',type:'g'},{label:'Jordan Brand >$7B',type:'g'},{label:'DTC márgenes superiores',type:'g'},{label:'China -10% revenue',type:'a'},{label:'Transición DTC con fricciones',type:'a'}],
  sections:{
    negocio:{intro:'Nike diseña, comercializa y vende calzado, ropa y equipamiento deportivo. El 55% del revenue todavía viene de wholesale (tiendas multimarca), pero el modelo está migrando hacia DTC — Nike.com y tiendas propias — que genera márgenes 10pp superiores. Jordan Brand, la submarca más rentable, genera $7B+ de revenue de forma independiente.',pullquote:'"Just Do It" no es un eslogan de marketing. Es la proposición de valor más efectiva de la historia del consumo masivo."'},
    historia:{intro:'Phil Knight fundó Nike en 1964 como distribuidor de zapatillas japonesas. El Swoosh fue diseñado en 1971 por $35. Hoy la marca vale $33B. La contratación de Michael Jordan en 1984 fue la decisión de marketing más rentable de la historia del deporte.'},
    moat:{verdict:'Moat de marca excepcional en el segmento performance. Más débil en lifestyle/moda donde Adidas y New Balance compiten bien.'},
    reflexion:{conclusion:'Nike está en un momento de transición difícil pero su activo de marca subyacente no se ha deteriorado. A precios deprimidos ofrece una oportunidad interesante para el inversor paciente. La ejecución del nuevo CEO es el monitor más importante.',queueWatch:'Progreso de la transición DTC, revenue en China, inventarios, y métricas de engagement de la app Nike.'},
  },
  valuation:{conservative:{price:'$65',desc:'FCF CAGR 4% · PER 22x'},base:{price:'$95',desc:'FCF CAGR 9% · PER 28x'},optimistic:{price:'$125',desc:'FCF CAGR 14% · PER 32x'},price15:'$70',marginBase:'+10%'},
});

// ── NETFLIX ───────────────────────────────────────────────
COMPANIES.push({
  ticker:'NFLX', name:'Netflix Inc.', exchange:'NASDAQ',
  sector:'Streaming / Entretenimiento', country:'Estados Unidos', cat:['tech'],
  logo:{ file:'nflx-logo.png', bg:'#ffffff', fallback:'NFLX' }, qs:83,
  metrics:['Revenue $39B','Margen EBIT 26%','FCF $7B+'],
  signals:[{label:'300M+ suscriptores',type:'g'},{label:'Publicidad acelerando',type:'g'},{label:'Contenido costoso',type:'a'}],
  tesis:{ published:false, date:null },
  headline:'Netflix no es una plataforma de streaming.\n<em>Es el estudio de entretenimiento más eficiente del mundo.</em>',
  deck:'Netflix gasta $17B anuales en contenido y compite contra los mayores estudios del mundo. Lo que la hace diferente es la escala global — amortiza ese coste entre 300M de suscriptores en 190 países.',
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'300M+ suscriptores',type:'blue'},{label:'FCF $7B+',type:'green'}],
  heroSignals:[{label:'300M suscriptores globales',type:'g'},{label:'Tier publicidad creciendo',type:'g'},{label:'Password sharing resuelto',type:'g'},{label:'Contenido $17B/año',type:'a'}],
  sections:{
    negocio:{intro:'Netflix cobra una suscripción mensual y produce/licencia contenido de entretenimiento. El modelo tiene dos capas: el tier estándar de suscripción y el tier con publicidad (más barato, con anuncios) que está creciendo rápido y mejorando los márgenes. La solución del password sharing en 2023 añadió 30M de suscriptores de pago.',pullquote:'"Netflix ha demostrado que el contenido original a escala global no es solo posible — es la mejor defensa contra los competidores con IP legacy."'},
    historia:{intro:'Netflix empezó en 1997 enviando DVDs por correo. El pivot al streaming en 2007 fue visionario. La apuesta por contenido original con House of Cards en 2013 fue la segunda gran decisión. Hoy produce contenido en 50+ idiomas.'},
    moat:{verdict:'Moat de escala en datos y contenido — el algoritmo de recomendación mejora con cada usuario. Débil frente a competidores con IP legacy como Disney.'},
    reflexion:{conclusion:'Netflix ha ganado las guerras del streaming — la mayoría de competidores están perdiendo dinero o retirándose. La pregunta ahora es hasta dónde puede expandir los márgenes con el tier de publicidad. Tiene potencial de ser mucho más rentable de lo que parece hoy.',queueWatch:'Crecimiento de suscriptores, ARPU por región, revenue de publicidad, y señales de que los competidores (Disney+, Max) están recuperando terreno.'},
  },
  valuation:{conservative:{price:'$450',desc:'FCF CAGR 10% · PER 30x'},base:{price:'$700',desc:'FCF CAGR 18% · PER 38x'},optimistic:{price:'$950',desc:'FCF CAGR 25% · PER 45x'},price15:'$500',marginBase:'+12%'},
});

// ── MOODYS ────────────────────────────────────────────────
COMPANIES.push({
  ticker:"MCO", name:"Moody's Corporation", exchange:'NYSE',
  sector:'Servicios financieros / Ratings', country:'Estados Unidos', cat:['pagos'],
  logo:{ file:'mco-logo.png', bg:'#ffffff', fallback:'MCO' }, qs:93,
  metrics:["ROIC >30%",'Margen EBIT 37%','FCF $2.2B'],
  signals:[{label:'Duopolio con S&P',type:'g'},{label:'Modelo regulatorio protegido',type:'g'},{label:'Cíclico con mercados deuda',type:'a'}],
  tesis:{ published:false, date:null },
  headline:"Moody's no evalúa deuda.\n<em>Tiene licencia gubernamental para decidir el coste del dinero global.</em>",
  deck:"Moody's y S&P controlan el 80% del mercado global de ratings. Cada vez que un gobierno o empresa quiere emitir deuda, necesita su opinión. Es el oligopolio más defensible del mundo financiero.",
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'Duopolio ratings',type:'blue'},{label:'Margen EBIT 37%',type:'green'}],
  heroSignals:[{label:'Duopolio de facto con S&P',type:'g'},{label:'Modelo regulatorio no replicable',type:'g'},{label:'Pricing power estructural',type:'g'},{label:'Cíclico con emisiones de deuda',type:'a'}],
  sections:{
    negocio:{intro:"Moody's tiene dos segmentos: Moody's Investors Service (ratings de crédito, 52% del revenue) y Moody's Analytics (software y datos financieros, 48%). El negocio de ratings es el más defensible — emitir deuda sin rating de Moody's o S&P es prácticamente imposible en los mercados institucionales.",pullquote:'"Hay tres superpotencias globales: EE.UU., Alemania y Moody\'s." — Thomas Friedman, 1996. Sigue siendo igual de cierto."'},
    historia:{intro:"Moody's fue fundado en 1909 por John Moody. Fue la primera agencia en calificar bonos de ferrocarril. Formó parte de Dun & Bradstreet hasta 2000 cuando se separó. La crisis de 2008 dañó su reputación pero no su posición de mercado — prueba del moat regulatorio."},
    moat:{verdict:'Moat excepcional y regulatorio — el más difícil de atacar del sector financiero. La reputación es el producto y lleva 100+ años construyéndose.'},
    reflexion:{conclusion:"Moody's es una empresa extraordinaria para el inversor de largo plazo. El moat regulatorio la protege de la competencia, y el segmento de Analytics diversifica la ciclicidad de los ratings. Es empresa para mantener indefinidamente.",queueWatch:'Volumen de emisiones de deuda globales (indicador adelantado de revenue), crecimiento de Analytics, y cualquier cambio regulatorio post-crisis.'},
  },
  valuation:{conservative:{price:'$280',desc:'FCF CAGR 7% · PER 28x'},base:{price:'$420',desc:'FCF CAGR 12% · PER 35x'},optimistic:{price:'$560',desc:'FCF CAGR 17% · PER 42x'},price15:'$300',marginBase:'+18%'},
});

// ── ADOBE ─────────────────────────────────────────────────
COMPANIES.push({
  ticker:'ADBE', name:'Adobe Inc.', exchange:'NASDAQ',
  sector:'Software creativo / IA', country:'Estados Unidos', cat:['tech'],
  logo:{ file:'adbe-logo.png', bg:'#ffffff', fallback:'ADBE' }, qs:89,
  metrics:['ROIC >35%','Margen EBIT 35%','FCF $8B'],
  signals:[{label:'Creative Cloud monopolio',type:'g'},{label:'Firefly IA integrado',type:'g'},{label:'Competencia IA generativa',type:'a'}],
  tesis:{ published:false, date:null },
  headline:'Adobe no vende software creativo.\n<em>Vende el estándar sobre el que trabaja toda la industria creativa global.</em>',
  deck:'Photoshop, Illustrator, Premiere, Acrobat — Adobe ha convertido sus productos en verbos del lenguaje creativo. La transición a suscripción y la integración de IA con Firefly definen la próxima década.',
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'Creative Cloud estándar',type:'blue'},{label:'FCF $8B',type:'green'}],
  heroSignals:[{label:'Switching costs extremos',type:'g'},{label:'Creative Cloud 30M+ usuarios',type:'g'},{label:'Firefly IA generativa',type:'g'},{label:'Competencia Canva y IA',type:'a'}],
  sections:{
    negocio:{intro:'Adobe tiene dos segmentos principales: Digital Media (Creative Cloud + Document Cloud, 76% del revenue) y Digital Experience (marketing software, 24%). Creative Cloud es el negocio más defensible — diseñadores y creativos llevan décadas aprendiendo estas herramientas y no las cambian voluntariamente.',pullquote:'"Decir que sabes Photoshop en tu CV es como decir que sabes caminar. Es el estándar que no se cuestiona."'},
    historia:{intro:'Adobe fundado en 1982 por John Warnock y Chuck Geschke, inventores del PDF. La transición de venta de licencias perpetuas a suscripción en 2013 fue polémica — y fue la mejor decisión estratégica de la empresa. El intento de adquirir Figma por $20B fue bloqueado por reguladores en 2023.'},
    moat:{verdict:'Moat de switching costs muy fuerte. El riesgo nuevo es que las herramientas de IA generativa (Midjourney, Sora) puedan reducir la barrera de entrada creativa.'},
    reflexion:{conclusion:'Adobe es una empresa de calidad con un moat bien establecido que está siendo desafiado por la IA generativa. La integración de Firefly es la respuesta correcta. Si la ejecución es buena, el moat se mantiene; si la IA democratiza la creatividad, el cliente base de Adobe podría reducirse. Es una empresa para vigilar de cerca.',queueWatch:'Adopción de Firefly de pago, crecimiento de Creative Cloud ARR, señales de churn por competencia de herramientas IA gratuitas.'},
  },
  valuation:{conservative:{price:'$320',desc:'FCF CAGR 6% · PER 28x'},base:{price:'$480',desc:'FCF CAGR 11% · PER 35x'},optimistic:{price:'$640',desc:'FCF CAGR 16% · PER 42x'},price15:'$340',marginBase:'+8%'},
});

// ── McDONALDS ─────────────────────────────────────────────
COMPANIES.push({
  ticker:'MCD', name:"McDonald's Corporation", exchange:'NYSE',
  sector:'Restauración / Franquicias', country:'Estados Unidos', cat:['consumo'],
  logo:{ file:'mcd-logo.png', bg:'#ffffff', fallback:'MCD' }, qs:88,
  metrics:['ROIC >20%','Margen EBIT 46%','FCF $8B'],
  signals:[{label:'Modelo franquicia 95%',type:'g'},{label:'Dividendo 47 años creciente',type:'g'},{label:'Deuda alta estructural',type:'a'}],
  tesis:{ published:false, date:null },
  headline:"McDonald's no vende hamburguesas.\n<em>Es la mayor empresa inmobiliaria del mundo disfrazada de restaurante.</em>",
  deck:"El negocio real de McDonald's no es la comida — es el alquiler de las ubicaciones más estratégicas del mundo a sus franquiciados. El 95% de los restaurantes son franquicias que pagan royalties y alquiler. Por eso los márgenes operativos son del 46%.",
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'40,000 restaurantes',type:'blue'},{label:'Dividendo 47 años',type:'green'}],
  heroSignals:[{label:'Modelo franquicia casi perfecto',type:'g'},{label:'Dividendo Aristócrata 47A',type:'g'},{label:'Real estate estratégico global',type:'g'},{label:'Deuda neta alta',type:'a'}],
  sections:{
    negocio:{intro:"McDonald's opera bajo un modelo de franquicia donde el franquiciado paga el coste operativo del restaurante — personal, ingredientes, energía. McDonald's cobra royalties (5% de las ventas) y alquiler de las ubicaciones que posee. Con el 95% franquiciado, el capital invertido es mínimo y los márgenes son de empresa de software.",pullquote:'"El negocio de McDonald\'s son los bienes raíces. La comida es simplemente el mecanismo para llenar los locales." — Ray Kroc'},
    historia:{intro:"Ray Kroc tomó control de la pequeña cadena de los hermanos McDonald en 1954. La visión no era la hamburguesa — era la replicabilidad. Hoy tiene 40,000 restaurantes en 100+ países. Es el mayor operador de bienes raíces estratégicos del mundo."},
    moat:{verdict:'Moat de marca global y escala inmobiliaria. Ambos son casi imposibles de replicar. La marca es el moat más duradero del sector restauración.'},
    reflexion:{conclusion:"McDonald's es una empresa de altísima calidad para inversores que buscan estabilidad, dividendo creciente y exposición global. La deuda alta es estructural y gestionada con disciplina. No es empresa de crecimiento agresivo — es empresa de compound interest paciente.",queueWatch:'Same-store-sales globales, adopción de la app digital, evolución de precios medios, y señales de cambio en hábitos de consumo generacional.'},
  },
  valuation:{conservative:{price:'$220',desc:'FCF CAGR 5% · PER 22x'},base:{price:'$300',desc:'FCF CAGR 9% · PER 27x'},optimistic:{price:'$380',desc:'FCF CAGR 13% · PER 32x'},price15:'$230',marginBase:'+10%'},
});

// ── PEPSI ─────────────────────────────────────────────────
COMPANIES.push({
  ticker:'PEP', name:'PepsiCo Inc.', exchange:'NASDAQ',
  sector:'Consumo defensivo', country:'Estados Unidos', cat:['consumo'],
  logo:{ file:'pep-logo.png', bg:'#ffffff', fallback:'PEP' }, qs:86,
  metrics:['Revenue $91B','Margen EBIT 15%','FCF $9B'],
  signals:[{label:'Dividendo 51 años creciente',type:'g'},{label:'Frito-Lay 57% EBIT',type:'g'},{label:'Bebidas bajo presión',type:'a'}],
  tesis:{ published:false, date:null },
  headline:'PepsiCo no es una empresa de refrescos.\n<em>Es la mayor empresa de snacks del mundo con un negocio de bebidas incluido.</em>',
  deck:'El 57% del beneficio operativo de PepsiCo viene de Frito-Lay — Doritos, Lays, Cheetos, Quaker. La Pepsi-Cola es el segundo negocio. Esa diversificación hace de PepsiCo una empresa más defensiva y menos cíclica de lo que parece.',
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'Dividend King 51 años',type:'green'},{label:'Frito-Lay #1 snacks',type:'blue'}],
  heroSignals:[{label:'Dividend King 51 años consecutivos',type:'g'},{label:'Frito-Lay dominancia snacks',type:'g'},{label:'Pricing power probado',type:'g'},{label:'Bebidas perdiendo cuota',type:'a'}],
  sections:{
    negocio:{intro:'PepsiCo tiene cuatro negocios bajo una marca: Frito-Lay North America (snacks), Quaker Foods, PepsiCo Beverages (bebidas USA) e International. Frito-Lay es el joya de la corona — tiene una posición dominante en snacks con marcas que generan márgenes del 28% y crecimiento consistente.',pullquote:'"Frito-Lay tiene el mejor perfil de negocio del sector de consumo. Márgenes altos, demanda inelástica, y marcas que llevan 70 años en los hogares americanos."'},
    historia:{intro:'PepsiCo formado en 1965 por la fusión de Pepsi-Cola y Frito-Lay. La adquisición de Tropicana (1998) y Quaker (2001) amplió el portfolio. La empresa lleva 51 años incrementando el dividendo — uno de los records más largos del mercado.'},
    moat:{verdict:'Moat de marca y distribución en snacks excepcional. Más débil en bebidas donde Coca-Cola mantiene ventaja.'},
    reflexion:{conclusion:'PepsiCo es la elección de inversión defensiva más sólida del sector consumo. El dividendo creciente de 51 años, el dominio de Frito-Lay y la diversificación geográfica hacen de esta empresa una posición permanente para cualquier cartera de largo plazo.',queueWatch:'Crecimiento de Frito-Lay, volumen de bebidas carbonatadas, evolución del pricing en un entorno de inflación normalizada.'},
  },
  valuation:{conservative:{price:'$140',desc:'FCF CAGR 4% · PER 22x'},base:{price:'$180',desc:'FCF CAGR 7% · PER 26x'},optimistic:{price:'$220',desc:'FCF CAGR 10% · PER 30x'},price15:'$145',marginBase:'+5%'},
});

// ── TARGET ────────────────────────────────────────────────
COMPANIES.push({
  ticker:'TGT', name:'Target Corporation', exchange:'NYSE',
  sector:'Retail masivo', country:'Estados Unidos', cat:['consumo'],
  logo:{ file:'tgt-logo.png', bg:'#ffffff', fallback:'TGT' }, qs:77,
  metrics:['Revenue $110B','Margen EBIT 5%','FCF $3B'],
  signals:[{label:'Marca diferenciada en retail',type:'g'},{label:'Same-day delivery',type:'g'},{label:'Margen bajo presión',type:'a'}],
  tesis:{ published:false, date:null },
  headline:'Target no es Walmart.\n<em>Es el retailer que convenció a las clases medias de que ir de compras puede ser una experiencia.</em>',
  deck:'Target ocupa el espacio entre Walmart (precio) y los grandes almacenes (experiencia). Su mix de marcas propias, diseño de tienda y fidelización ha creado un cliente que va a Target cuando no necesita ir — eso es moat.',
  readTime:16,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'1,950 tiendas USA',type:'blue'},{label:'Círculo de Clientes 100M',type:'green'}],
  heroSignals:[{label:'Marcas propias 33% del revenue',type:'g'},{label:'100M miembros Circle',type:'g'},{label:'Same-day delivery dominante',type:'g'},{label:'Márgenes EBIT comprimidos',type:'a'}],
  sections:{
    negocio:{intro:'Target opera tiendas físicas en EE.UU. con un posicionamiento entre el discount puro y el departament store. El 33% del revenue viene de marcas propias — Cat&Jack, All in Motion, A New Day — con márgenes superiores al portfolio de marcas externas. El programa Circle tiene 100M de miembros activos.',pullquote:'"Target ha logrado lo que ningún otro retailer masivo: hacer que el cliente se sienta bien siendo cliente."'},
    historia:{intro:'Target fundado en 1902 como Dayton Dry Goods Company. El primer Target abrió en 1962 en Roseville, Minnesota. La separación de Marshall Field en 2004 y la venta de las farmacias CVS en 2015 fueron los pivots estratégicos que definieron el Target moderno.'},
    moat:{verdict:'Moat moderado — diferenciación de marca en retail es real pero frágil. La competencia de Amazon y Walmart online es el riesgo principal.'},
    reflexion:{conclusion:'Target está en una transición difícil post-COVID donde los márgenes se han comprimido y el consumidor ha bajado su gasto discrecional. La marca sigue siendo muy fuerte. Es empresa para el inversor con paciencia que cree en la recuperación de márgenes.',queueWatch:'Same-store-sales, evolución de márgenes brutos, crecimiento del negocio digital, y comparativa con Walmart y Amazon en penetración del consumidor.'},
  },
  valuation:{conservative:{price:'$95',desc:'FCF CAGR 4% · PER 14x'},base:{price:'$140',desc:'FCF CAGR 8% · PER 18x'},optimistic:{price:'$185',desc:'FCF CAGR 12% · PER 22x'},price15:'$100',marginBase:'+15%'},
});

// ── ESTEE LAUDER ──────────────────────────────────────────
COMPANIES.push({
  ticker:'EL', name:'The Estée Lauder Companies', exchange:'NYSE',
  sector:'Lujo / Belleza', country:'Estados Unidos', cat:['lujo'],
  logo:{ file:'el-logo.png', bg:'#ffffff', fallback:'EL' }, qs:75,
  metrics:['Revenue $15B','Margen EBIT 10%','FCF $1B'],
  signals:[{label:'Portfolio marcas premium',type:'g'},{label:'Recuperación en proceso',type:'a'},{label:'China dependencia 30%',type:'a'}],
  tesis:{ published:false, date:null },
  headline:'Estée Lauder no vende cremas.\n<em>Vende la promesa de que la belleza tiene precio — y ese precio puede ser muy alto.</em>',
  deck:'La empresa más importante del lujo de belleza global está en su momento más difícil en 20 años: China no se ha recuperado como esperaban, los márgenes se han comprimido, y el dividendo ha sido cortado. ¿Es una oportunidad o un deterioro estructural?',
  readTime:18,
  pills:[{label:'Market Cap $—',type:'',id:'coverMktCap'},{label:'Portfolio 25+ marcas',type:'blue'},{label:'Travel retail líder',type:''}],
  heroSignals:[{label:'Portfolio de marcas: La Mer, MAC, Clinique',type:'g'},{label:'#1 travel retail belleza',type:'g'},{label:'China 30% revenue — no recuperado',type:'a'},{label:'Márgenes comprimidos',type:'a'}],
  sections:{
    negocio:{intro:'Estée Lauder tiene 25+ marcas de belleza en todos los segmentos: skincare (La Mer, Clinique), maquillaje (MAC, Bobbi Brown), fragancias (Jo Malone, Tom Ford Beauty). El canal de travel retail — perfumerías de aeropuertos — representa el 25% del revenue y ha sido el más impactado por la caída del turismo asiático.',pullquote:'"Estée Lauder construyó el mejor portfolio de marcas de lujo en belleza. El problema de hoy es de ciclo, no de estrategia."'},
    historia:{intro:'Fundada por Estée Lauder en 1946 con cuatro productos. La empresa familiar mantiene el control con la familia Lauder con >80% del poder de voto. La adquisición de Tom Ford Beauty en 2023 y MAC en los años 90 fueron los movimientos estratégicos más importantes.'},
    moat:{verdict:'Moat de portfolio de marcas real pero bajo presión. La dependencia de China y travel retail hace el negocio más volátil de lo que el inversor de largo plazo querría.'},
    reflexion:{conclusion:'Estée Lauder es una empresa de calidad en un momento de ciclo adverso. Si China se recupera y el travel retail vuelve a crecer, los márgenes pueden recuperar niveles históricos. Es una apuesta al ciclo más que a la calidad estructural — con el riesgo de que China no se recupere tan rápido como el mercado espera.',queueWatch:'Revenue en China, recuperación del travel retail, evolución de márgenes brutos, y señales de que el consumidor de lujo chino está volviendo.'},
  },
  valuation:{conservative:{price:'$50',desc:'Recuperación lenta · PER 20x'},base:{price:'$90',desc:'China normaliza · PER 30x'},optimistic:{price:'$140',desc:'China acelera · PER 40x'},price15:'$58',marginBase:'+20%'},
});

