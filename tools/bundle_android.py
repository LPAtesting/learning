#!/usr/bin/env python3
"""Refresh android/www/index.html (the single-file page the APK ships) from the web app.

Usage:  python3 tools/bundle_android.py            (run from the repository root)

The APK page is a self-unpacking bundle: a manifest of gzipped, base64 files keyed by
uuid, and a template (the app HTML with every local file reference replaced by a uuid).
This keeps the existing bundle's fonts, icons and React copies, and refreshes:
  - the app script (everything from <script type="text/x-dc"> to the end of the page);
  - support.js and the data scripts listed in the app's <helmet>, re-embedded from disk.
Data files that are new get a uuid derived from their path; files no longer used are dropped.
"""
import base64, gzip, json, re, sys, uuid

APP = "DealCraft App.dc.html"
OUT = "android/www/index.html"


def tag_span(src, t):
    m = re.search(r'(<script type="__bundler/' + t + r'">\n)(.*?)(\n\s*</script>)', src, re.S)
    if not m:
        sys.exit("bundle_android: no __bundler/" + t + " block in " + OUT)
    return m.start(2), m.end(2)


def main():
    app = open(APP, encoding="utf-8").read()
    src = open(OUT, encoding="utf-8").read()
    ms, me = tag_span(src, "manifest")
    ts, te = tag_span(src, "template")
    man = json.loads(src[ms:me])
    tpl = json.loads(src[ts:te])

    def data_of(u):
        e = man[u]; b = base64.b64decode(e["data"])
        return gzip.decompress(b) if e.get("compressed") else b

    def embed(path, mime="application/javascript"):
        b = open(path, "rb").read()
        for u in man:  # unchanged file: keep its uuid
            if "javascript" in man[u]["mime"] and data_of(u) == b:
                return u
        u = str(uuid.uuid5(uuid.NAMESPACE_URL, "dealcraft:" + path))
        man[u] = {"mime": mime, "compressed": True, "data": base64.b64encode(gzip.compress(b, 9, mtime=0)).decode()}
        return u

    # support.js: the first <script src> in <head>
    m = re.search(r'<script src="([0-9a-f-]{36})"></script>', tpl)
    sup = embed("support.js", man[m.group(1)]["mime"])
    tpl = tpl[:m.start(1)] + sup + tpl[m.end(1):]

    # data scripts in <helmet>, in the app's order
    helmet = app[app.index("<helmet>"):app.index("</helmet>")]
    paths = re.findall(r'<script src="(data/[^"]+)"></script>', helmet)
    tags = "".join('<script src="%s"></script>\n' % embed(p) for p in paths)
    m = re.search(r'(?:<script src="[0-9a-f-]{36}"></script>\n)+(?=</helmet>)', tpl)
    if not m:
        sys.exit("bundle_android: helmet script list not found in the template")
    tpl = tpl[:m.start()] + tags + tpl[m.end():]

    # the app itself
    a, b = app.index('<script type="text/x-dc"'), tpl.index('<script type="text/x-dc"')
    tail = app[a:].replace("data-dc-script data-props", 'data-dc-script="" data-props', 1)
    tail = re.sub(r"</script>\s*</body>\s*</html>\s*$", "</script>\n\n\n</body></html>", tail)  # as the browser serialised it
    tpl = tpl[:b] + tail

    used = set(re.findall(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", tpl + src[:ms]))
    ext = src[src.index('<script type="__bundler/ext_resources">'):ts]
    used |= set(re.findall(r'"uuid":"([0-9a-f-]{36})"', ext))
    man = {u: e for u, e in man.items() if u in used}

    out = (src[:ms] + json.dumps(man, ensure_ascii=False, separators=(",", ":")) + src[me:ts]
           + json.dumps(tpl, ensure_ascii=False).replace("</", "<\\u002F") + src[te:])
    open(OUT, "w", encoding="utf-8").write(out)
    print("bundle_android: %d files embedded, %d data scripts, %.1f MB" % (len(man), len(paths), len(out) / 1e6))


if __name__ == "__main__":
    main()
