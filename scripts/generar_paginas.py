#!/usr/bin/env python3
"""Genera recursos estáticos del diccionario desde una sola fuente editorial.

Fuente editable: data/terminos.json
Archivos generados: assets/terminos.js, roic/index.html y sitemap.xml
Ejecutar: python3 scripts/generar_paginas.py
No editar a mano los archivos generados.
"""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "terminos.json"


def escape(text: object) -> str:
    return html.escape(str(text), quote=True)


def paragraphs(text: str) -> str:
    return "\n".join(
        "<p>" + escape(p.strip()).replace("\n", "<br>") + "</p>"
        for p in text.split("\n\n")
        if p.strip()
    )


def main() -> None:
    terms = json.loads(DATA.read_text(encoding="utf-8"))
    assert isinstance(terms, list) and len(terms) == 167, "Esperaba 167 términos"
    ids = [term["id"] for term in terms]
    assert len(set(ids)) == len(ids), "Existen identificadores duplicados"
    roic = next(term for term in terms if term["id"] == "roic")
    assert roic["formula"] == "ROIC = NOPAT / Capital invertido"

    generated_js = (
        "// Generado desde data/terminos.json con scripts/generar_paginas.py.\n"
        "// Modificar solo el JSON y ejecutar el generador.\n"
        "window.DICTIONARY_TERMS = "
        + json.dumps(terms, ensure_ascii=False, separators=(",", ":"))
        + ";\n"
    )
    (ROOT / "assets" / "terminos.js").write_text(generated_js, encoding="utf-8")

    # Conservar el ejemplo numérico del material original; no reutilizar
    # los baremos del S&P 500 sin una fuente que los sustente.
    example = roic["example"].split("Como dato importante:")[0].strip()

    template = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ROIC: qué es, cómo se calcula y ejemplo | Diccionario del Inversor</title>
  <meta name="description" content="Entiende qué es el ROIC, cómo se calcula con NOPAT y capital invertido, y cómo interpretarlo al analizar empresas. Incluye un ejemplo sencillo.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://tesinversion.com/roic/">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <meta name="theme-color" content="#1B2B6B">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Arquitectura de la Inversión">
  <meta property="og:title" content="ROIC: qué es, cómo se calcula y ejemplo">
  <meta property="og:description" content="Una explicación práctica del retorno sobre el capital invertido.">
  <meta property="og:url" content="https://tesinversion.com/roic/">
  <meta name="twitter:card" content="summary">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- GA4: misma propiedad que el diccionario principal -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-VCZWBBCFV7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VCZWBBCFV7');
    function trackSubscription(){
      gtag('event', 'newsletter_outbound_click', {placement:'roic_page',destination:'subscribe'});
    }
  </script>
  <script type="application/ld+json">__SCHEMA__</script>
  <style>
    :root{--blue:#1B2B6B;--deep:#09162f;--gold:#E7B94B;--ink:#19233c;--muted:#5d6880;--line:#e3e7ef;--surface:#fff;--background:#f6f8fc}
    *{box-sizing:border-box}
    body{margin:0;background:var(--background);color:var(--ink);font:16px/1.75 'Inter',sans-serif}
    a{color:var(--blue);text-underline-offset:3px}
    a:focus-visible{outline:3px solid var(--gold);outline-offset:4px;border-radius:4px}
    .nav{background:var(--deep);color:#fff}
    .nav-inner{max-width:1080px;margin:auto;padding:15px 24px;display:flex;justify-content:space-between;align-items:center;gap:20px}
    .brand{font:600 20px/1.2 'Crimson Pro',serif;color:#fff;text-decoration:none}
    .brand span{color:var(--gold)}
    .nav a:last-child{color:#fff;text-decoration:none;font-size:13px}
    .hero{background:linear-gradient(145deg,#0d1840,var(--blue));color:#fff;padding:70px 24px 76px}
    .hero-inner{max-width:820px;margin:auto}
    .eyebrow{text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:700;color:#F4C76A}
    h1,h2{font-family:'Crimson Pro',serif;line-height:1.14}
    h1{font-size:clamp(40px,6vw,64px);margin:16px 0}
    .intro{max-width:720px;font-size:18px;color:#edf1ff;margin:0}
    main{max-width:860px;padding:0 24px 54px;margin:-32px auto 0;position:relative}
    article{background:var(--surface);border:1px solid var(--line);border-radius:20px;box-shadow:0 14px 36px #14274c12;padding:clamp(24px,5vw,54px)}
    section+section{border-top:1px solid var(--line);margin-top:30px;padding-top:25px}
    h2{font-size:clamp(27px,4vw,35px);color:#182c5b;margin:0 0 15px}
    p{margin:0 0 14px}
    p:last-child{margin-bottom:0}
    .formula{display:block;padding:19px 22px;background:#eff3fa;border-left:4px solid #D4A017;border-radius:8px;font-size:16px;font-weight:700;color:#162b60;overflow-wrap:anywhere}
    .tip{color:var(--muted);font-size:14px;margin-top:14px}
    .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:27px}
    .actions a{display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);border-radius:100px;padding:12px 20px;font-size:14px;font-weight:600;text-decoration:none}
    .actions a.primary{background:var(--blue);color:#fff;border-color:var(--blue)}
    aside{border-radius:18px;background:var(--deep);color:#fff;padding:30px;margin-top:24px;text-align:center}
    aside h2{color:#fff;font-size:29px}
    aside p{color:#e1e6f3;max-width:620px;margin:0 auto 22px}
    aside a{display:inline-flex;background:#F4C76A;color:#122344;text-decoration:none;padding:13px 28px;border-radius:100px;font-weight:700}
    footer{max-width:820px;margin:auto;padding:0 24px 38px;color:#6b7384;font-size:12px;text-align:center}
    @media(max-width:600px){.nav-inner{align-items:flex-start;flex-direction:column;gap:8px}.hero{padding:45px 22px 65px}main{padding:0 16px 35px}article{border-radius:16px}}
  </style>
</head>
<body>
  <header class="nav"><div class="nav-inner">
    <a class="brand" href="/">Arquitectura <span>de la Inversión</span></a>
    <a href="/">← Volver al diccionario completo</a>
  </div></header>
  <div class="hero"><div class="hero-inner">
    <div class="eyebrow">Diccionario del Inversor · Rentabilidad</div>
    <h1>ROIC: qué es y cómo se calcula</h1>
    <p class="intro">Qué mide el retorno sobre el capital invertido, cómo leer su fórmula y por qué importa al analizar una empresa.</p>
  </div></div>
  <main>
    <article>
      <section aria-labelledby="definicion">
        <h2 id="definicion">¿Qué es el ROIC?</h2>
        __DEFINITION__
      </section>
      <section aria-labelledby="calculo">
        <h2 id="calculo">Fórmula del ROIC</h2>
        <div class="formula">__FORMULA__</div>
        <p class="tip">NOPAT: beneficio operativo después de impuestos. El capital invertido representa el capital que la empresa utiliza en sus operaciones.</p>
      </section>
      <section aria-labelledby="ejemplo">
        <h2 id="ejemplo">Un ejemplo sencillo</h2>
        __EXAMPLE__
      </section>
      <section aria-labelledby="interpretacion">
        <h2 id="interpretacion">¿Cómo interpretarlo?</h2>
        <p>El ROIC no se interpreta únicamente por ser alto o bajo. Conviene observar su evolución en varios años y compararlo con el costo del capital (WACC). Un ROIC superior al WACC indica creación de valor según esta medida; uno inferior indica que el retorno no cubre ese costo.</p>
        <div class="actions">
          <a class="primary" href="/#term=roic">Abrir ROIC en el diccionario →</a>
          <a href="/#term=wacc">Consultar WACC</a>
        </div>
      </section>
    </article>
    <aside>
      <h2>¿Quieres aprender a analizar empresas?</h2>
      <p>Recibe gratis artículos sobre análisis fundamental, valoración y conceptos financieros para invertir con más criterio.</p>
      <a href="https://tesinversion.substack.com/subscribe" target="_blank" rel="noopener noreferrer" onclick="trackSubscription()">Suscríbete gratis →</a>
    </aside>
  </main>
  <footer>Arquitectura de la Inversión · Contenido educativo e informativo, no asesoramiento financiero. Invertir implica riesgos, incluida la posible pérdida del capital.</footer>
</body>
</html>
"""
    schema = {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": "ROIC",
        "alternateName": "Return on Invested Capital",
        "description": roic["definition"],
        "url": "https://tesinversion.com/roic/",
        "inDefinedTermSet": "https://tesinversion.com/",
    }
    page = (
        template
        .replace("__SCHEMA__", json.dumps(schema, ensure_ascii=False).replace("</", "<\\/"))
        .replace("__DEFINITION__", paragraphs(roic["definition"]))
        .replace("__FORMULA__", escape(roic["formula"]))
        .replace("__EXAMPLE__", paragraphs(example))
    )
    out = ROOT / "roic" / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page, encoding="utf-8")

    sitemap = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://tesinversion.com/</loc></url>
  <url><loc>https://tesinversion.com/roic/</loc></url>
</urlset>
"""
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    print("OK: 167 términos; generados assets/terminos.js, roic/index.html, sitemap.xml")


if __name__ == "__main__":
    main()
