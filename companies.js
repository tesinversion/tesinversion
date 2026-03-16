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
    logo:       { file:'race-logo.png', bg:'#c8102e', fallback:'SF' },
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
    logo:       { file:'msft-logo.png', bg:'#00a4ef', fallback:'MSFT', isMsft: true },
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
    logo:       { file:'meta-logo.png', bg:'#0082fb', fallback:'META' },
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
    logo:       { file:'aapl-logo.png', bg:'#000000', fallback:'AAPL' },
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
    logo:       { file:'visa-logo.png', bg:'#1a1f71', fallback:'VISA' },
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
    logo:       { file:'ma-logo.png', bg:'#eb001b', fallback:'MA' },
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
    logo:       { file:'azo-logo.png', bg:'#e31837', fallback:'AZO' },
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
    logo:       { file:'amzn-logo.png', bg:'#ff9900', fallback:'AMZN' },
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
    logo:       { file:'nvda-logo.png', bg:'#76b900', fallback:'NVDA' },
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
    logo:       { file:'googl-logo.png', bg:'#4285f4', fallback:'GOOG' },
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
    return `<div style="width:${size}px;height:${size}px;border-radius:${br};background:${company.logo.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;border:0.5px solid rgba(0,0,0,0.08)"><svg viewBox="0 0 21 21" width="${size*0.7}" height="${size*0.7}"><rect x="0" y="0" width="10" height="10" fill="#f25022"/><rect x="11" y="0" width="10" height="10" fill="#7fba00"/><rect x="0" y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg></div>`;
  }
  return `<div style="width:${size}px;height:${size}px;border-radius:${br};background:${company.logo.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;border:0.5px solid rgba(0,0,0,0.08)"><img src="${company.logo.file}" alt="${company.name}" style="width:${size*0.85}px;height:${size*0.85}px;object-fit:contain" onerror="this.parentElement.innerHTML='<span style=&quot;font-family:monospace;font-size:${Math.round(size*0.28)}px;font-weight:600;color:white&quot;>${company.logo.fallback}</span>'"></div>`;
}
