#!/usr/bin/env python3
"""
Language copies of the translated pages.

content/i18n.json lists the languages and which pages are translated, e.g.
  "pages": { "referral-program": ["id"] }
For each of those it writes  <lang folder>/<page>.html  (id/referral-program.html)
from the English  <page>.html :
  - <html lang> set to the language,
  - <base href="../">  so the shared scripts, styles and media resolve from the site root,
  - window.IA_LANG, which the page scripts read to pick content/pages/<page>/<lang>.json,
  - <title> and <meta description> from that file's "meta" block.
The menu, footer and app pop-up read content/shared/<lang>.json (English text -> translation);
this script warns when a key there no longer matches any English text in the code.
build-seo.py then adds the SEO block (canonical, hreflang, sitemap) to these copies too.

The language folders are generated: every run clears their .html files first, so
edit the English page or the content JSON, never the copies.

Run before build-seo.py:   python3 build-i18n.py
Zero dependencies (standard library only).
"""
import os, re, json, html, glob

HERE = os.path.dirname(os.path.abspath(__file__))
SEO_BLOCK = re.compile(r"<!-- seo:start.*?<!-- seo:end -->\n?", re.S)


def load(rel):
    with open(os.path.join(HERE, rel), encoding="utf-8") as f:
        return json.load(f)


def check_shared(cfg):
    """Warn about shared-text keys whose English no longer appears in the code (a reworded menu label)."""
    code = "".join(open(f, encoding="utf-8").read() for f in glob.glob(os.path.join(HERE, "*.jsx")))
    for l in cfg["languages"]:
        rel = f"content/shared/{l['code']}.json"
        if not os.path.exists(os.path.join(HERE, rel)):
            continue
        for key in load(rel).get("text", {}):
            if key not in code and key.replace("'", "\\'") not in code:
                print(f"WARN   {rel}: no English text \"{key}\" in the code — reworded or removed?")


def main():
    cfg = load("content/i18n.json")
    check_shared(cfg)
    langs = {l["code"]: l for l in cfg["languages"]}

    # Clear previous copies (only generated .html files inside the language folders).
    for l in cfg["languages"]:
        if l["path"]:
            for old in glob.glob(os.path.join(HERE, l["path"], "*.html")):
                os.remove(old)

    for page, codes in cfg["pages"].items():
        src_path = os.path.join(HERE, page + ".html")
        if not os.path.exists(src_path):
            raise SystemExit(f"content/i18n.json lists '{page}', but {page}.html doesn't exist")
        src = open(src_path, encoding="utf-8").read()
        for code in codes:
            if code not in langs or not langs[code]["path"]:
                raise SystemExit(f"{page}: unknown language '{code}'")
            lang = langs[code]
            copy_file = f"content/pages/{page}/{code}.json"
            if not os.path.exists(os.path.join(HERE, copy_file)):
                raise SystemExit(f"{page}: {copy_file} is missing")
            meta = load(copy_file).get("meta", {})
            if not meta.get("title") or not meta.get("description"):
                raise SystemExit(f"{copy_file} needs meta.title and meta.description")

            out = SEO_BLOCK.sub("", src)
            out = re.sub(r'<html lang="[^"]*">', f'<html lang="{lang["htmlLang"]}">', out, count=1)
            out = out.replace("<head>\n", "<head>\n<base href=\"../\" />\n"
                              f"<script>window.IA_LANG = {json.dumps(code)};</script>\n", 1)
            out = re.sub(r"<title>.*?</title>", lambda m: f"<title>{html.escape(meta['title'], quote=False)}</title>", out, count=1, flags=re.S)
            out = re.sub(r'<meta name="description" content="[^"]*"\s*/>',
                         lambda m: f'<meta name="description" content="{html.escape(meta["description"], quote=True)}" />', out, count=1)
            os.makedirs(os.path.join(HERE, lang["path"]), exist_ok=True)
            dest = os.path.join(lang["path"], page + ".html")
            open(os.path.join(HERE, dest), "w", encoding="utf-8").write(out)
            print(f"wrote  {dest}")


if __name__ == "__main__":
    main()
