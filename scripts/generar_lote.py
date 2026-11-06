#!/usr/bin/env python3
"""Regenera las páginas SEO desde data/terminos.json y data/paginas-seo.json.
Ejecutar: python3 scripts/generar_lote.py
Los archivos HTML, sitemap.xml y assets/paginas-seo.js son generados; no editarlos a mano.
"""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def esc(value):
    return html.escape(str(value), quote=True)


def paragraphs(text):
    return "\n".join(
        "<p>" + esc(p.strip()).replace("\n", "<br>") + "</p>"
        for p in (text or "").split("\n\n") if p.strip()
    )


def render(term, info, template):
    slug = info["slug"]
    url = "https://tesinversion.com/" + slug + "/"
    example = term.get("example", "")
    if term["id"] == "roic":
        # Evitar estadísticas generales sin atribución verificable en la guía.
        example = example.split("Como dato importante:")[0].strip()
    formula = term.get("formula") or ""
    formula_section = (
        '<section aria-labelledby="calculo">'
        '<h2 id="calculo">Fórmula de ' + esc(term["es"]) + '</h2>'
        '<div class="formula">' + esc(formula) + '</div></section>'
        if formula else ""
    )
    schema = {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": term["es"],
        "alternateName": term.get("en") or term["es"],
        "description": term["definition"],
        "url": url,
        "inDefinedTermSet": "https://tesinversion.com/"
    }
    fields = {
        "__TITLE__": esc(info["title"]),
        "__META__": esc(info["intro"][:160]),
        "__URL__": esc(url),
        "__SLUG__": esc(slug.replace("-", "_")),
        "__SCHEMA__": json.dumps(schema, ensure_ascii=False).replace("</", "<\\/"),
        "__CATEGORY__": esc(term["cat"].capitalize()),
        "__HEADING__": esc(info["heading"]),
        "__INTRO__": esc(info["intro"]),
        "__NAME__": esc(term["es"]),
        "__DEFINITION__": paragraphs(term["definition"]),
        "__FORMULA_SECTION__": formula_section,
        "__EXAMPLE__": paragraphs(example),
        "__INSIGHT__": esc(info["insight"]),
        "__ID__": esc(term["id"])
    }
    page = template
    for key, value in fields.items():
        page = page.replace(key, value)
    assert "__" not in page, "Marcador no resuelto"
    return page


def main():
    catalog = json.loads((ROOT / "data/terminos.json").read_text(encoding="utf-8"))
    config = json.loads((ROOT / "data/paginas-seo.json").read_text(encoding="utf-8"))
    template = (ROOT / "scripts/plantilla-seo.html").read_text(encoding="utf-8")
    by_id = {term["id"]: term for term in catalog}
    assert len(by_id) == len(catalog) == 167, "Catálogo incompleto o con ids duplicados"
    slugs = [entry["slug"] for entry in config]
    assert len(slugs) == len(set(slugs)), "Slugs duplicados"
    for entry in config:
        assert entry["id"] in by_id, "Id desconocido: " + entry["id"]
        dest = ROOT / entry["slug"] / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(render(by_id[entry["id"]], entry, template), encoding="utf-8")
    page_index = {entry["id"]: {"slug": entry["slug"]} for entry in config}
    (ROOT / "assets/paginas-seo.js").write_text(
        "// Generado desde data/paginas-seo.json con scripts/generar_lote.py\n"
        "window.SEO_PAGES = " + json.dumps(page_index, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8"
    )
    urls = ["https://tesinversion.com/"] + [
        "https://tesinversion.com/" + slug + "/" for slug in slugs
    ]
    sitemap = ('<?xml version="1.0" encoding="UTF-8"?>\n'
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
               + "".join("  <url><loc>" + esc(url) + "</loc></url>\n" for url in urls)
               + "</urlset>\n")
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    print("Generadas", len(config), "páginas y sitemap:", len(urls), "URLs")


if __name__ == "__main__":
    main()
