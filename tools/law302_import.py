#!/usr/bin/env python3
"""Build data/law302.js from LAW302 "Learning Journey + MCQ Bank" markdown files.

Usage:  python3 tools/law302_import.py WEEK12.md WEEK13.md [...] > data/law302.js

Each file must follow the shared content model (see each file's Part A):
  PART C  Learning journey: "### STAGE n: title" > "#### Module n.m: title" > blocks
          (Objective, ELI5, Big idea, Rules & authorities, Traps, Practice).
  PART D  MCQ bank: "#### Qww-s.n" with Set/Level/Tags, Prompt, Options A-D,
          Correct, Feedback per option, Hint and Source.

Lessons follow the Practice lines: a stage without modules is one lesson, a stage
intro that comes before its modules is a reading-only overview, and modules that
have no Practice line of their own are merged into the next module that does.
Integration sets that no Practice line names go to the Stage 6 wrap-up.
"""
import json, re, sys

WEEKS = {
  "12": {"t": "Foreign Judgments I", "full": "Recognition and enforcement: principles",
         "color": ["#2A7A8C", "#1D5966", "#E4F1F4"],
         "sub": "What a foreign judgment can do in Singapore, which regime applies, why Singapore recognises it, the common law requirements, and its effect as res judicata."},
  "13": {"t": "Foreign Judgments II", "full": "Defences, anti-enforcement injunctions and the CCAA",
         "color": ["#7B4FA0", "#5A3778", "#F1E9F7"],
         "sub": "The common law defences, anti-enforcement injunctions, Part 3 of the Choice of Court Agreements Act 2016, and the three regimes side by side."},
}
# Path icons by lesson key (week:code). Anything missing falls back to "book".
ICONS = {
  "12:S0": "compass", "12:S1": "branch", "12:S2": "star", "12:S3": "check", "12:3.1": "book", "12:3.2": "cards",
  "12:3.3": "coins", "12:3.4": "map", "12:3.5": "users", "12:3.6": "lock", "12:S4": "shield", "12:S5": "layers", "12:S6": "trophy",
  "13:S0": "refresh", "13:S1": "map", "13:2.1": "x", "13:2.2": "flame", "13:2.3": "shield", "13:2.4": "users",
  "13:2.5": "merge", "13:2.6": "branch", "13:2.7": "target", "13:2.8": "clock", "13:S3": "lock", "13:S4": "book",
  "13:S5": "layers", "13:S6": "trophy",
}
LEVELS = {"L1": "Foundations", "L2": "Rules & cases", "L3": "Apply", "L4": "Traps & critique"}


def die(msg):
    sys.stderr.write("law302_import: " + msg + "\n"); sys.exit(1)


def plain(s):
    """Markdown inline -> plain text (question bank style)."""
    s = re.sub(r"\*{1,3}([^*]+?)\*{1,3}", r"\1", s)
    return s.replace("*", "").strip()


# ---------- badges on journey bullets ----------
def badges(text):
    b = []
    if re.search(r"\*\*[^*]*\b(?:[Oo]pen|uncertain)\b[^*]*\*\*|\(Open\b|This is open|\bleft (?:\w+ ){0,2}open\b|open question", text):
        b.append("open")
    if re.search(r"\bobiter\b", text, re.I):
        b.append("obiter")
    if re.search(r"Academic view|C&Y critique|\*\*Critique\*\*|Better view|C&Y's three arguments|C&Y argue|C&Y prefer", text):
        b.append("acad")
    if "Missing reading" in text:
        b.append("miss")
    return b


# ---------- lists ----------
LIST_RE = re.compile(r"^( *)(?:([-*])|(\d+)\.) (.*)$")


def parse_list(lines, i, base=0):
    """Parse a (nested) markdown list starting at lines[i]. Returns (node, next_i)."""
    items, ordered = [], None
    while i < len(lines):
        m = LIST_RE.match(lines[i])
        if not m:
            break
        ind = len(m.group(1))
        if ind < base:
            break
        if ind > base:  # child of the previous item
            if not items:
                die("bad list indent: " + lines[i])
            child, i = parse_list(lines, i, ind)
            items[-1].setdefault("c", []).append(child)
            continue
        if ordered is None:
            ordered = m.group(3) is not None
        items.append({"t": m.group(4).strip()})
        i += 1
    return ({"ol" if ordered else "ul": items}, i)


def tag_badges(node, on=True):
    for it in node.get("ul", node.get("ol", [])):
        if on:
            b = badges(it["t"])
            if b:
                it["b"] = b
        for c in it.get("c", []):
            tag_badges(c, on)


# ---------- mermaid flowchart ----------
def parse_mermaid(src):
    nodes, edges, order = {}, [], []
    tok = r'([A-Za-z0-9_]+)(?:\["([^"]*)"\]|\{"([^"]*)"\})?'
    for line in src:
        line = line.strip()
        if not line or line.startswith("flowchart") or line.startswith("graph"):
            continue
        m = re.match(tok + r'\s*-->\s*(?:\|"([^"]*)"\|\s*)?' + tok + r"\s*$", line)
        if not m:
            die("unparsed mermaid line: " + line)
        a, al, ad, lab, b, bl, bd = m.groups()
        for n, l, d in ((a, al, ad), (b, bl, bd)):
            if n not in nodes:
                nodes[n] = {"t": "", "q": False}; order.append(n)
            if l is not None:
                nodes[n] = {"t": l, "q": False}
            if d is not None:
                nodes[n] = {"t": d, "q": True}
        edges.append([a, b, lab or ""])
    targets = {e[1] for e in edges}
    roots = [n for n in order if n not in targets]
    return {"root": roots[0], "nodes": nodes, "edges": edges}


# ---------- learning journey (Part C) ----------
def parse_container(lines):
    """Blocks of one stage intro or module."""
    blocks, practice, i, sec = [], [], 0, None
    while i < len(lines):
        ln = lines[i]
        s = ln.strip()
        if not s or s == "---":
            i += 1; continue
        if s.startswith("```mermaid"):
            j = i + 1
            while not lines[j].strip().startswith("```"):
                j += 1
            title = sec["title"] if sec and sec.get("k") == "pendflow" else ""
            if sec and sec.get("k") == "pendflow":
                blocks.remove(sec)
            blocks.append({"k": "flow", "title": title or "Decision tree", "g": parse_mermaid(lines[i + 1:j])})
            sec = None; i = j + 1; continue
        if s.startswith(">"):
            q = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                q.append(re.sub(r"^\s*> ?", "", lines[i]).replace("Use the question sets in Part D to check yourself.", "Use the practice questions to check yourself.")); i += 1
            first = q[0]
            m = re.match(r"\*\*ELI5:\*\*\s*(.*)", first)
            if not m:
                continue  # a build note for the app author, not learner content
            q[0] = m.group(1)
            blocks.append({"k": "eli5", "n": parse_rich(q)}); sec = None; continue
        m = re.match(r"\*\*(Objective|Big idea|Practice):\*\*\s*(.*)$", s)
        if m:
            f, v = m.groups()
            if f == "Practice":
                practice.append(v)
            else:
                blocks.append({"k": "obj" if f == "Objective" else "big", "t": v})
            sec = None; i += 1; continue
        m = re.match(r"^\*\*(.+?)\*\*\s*(\(.*\))?:?\s*$", s)
        if m and not re.search(r":\*\*", s):
            title, note = m.group(1), (m.group(2) or "")
            sub = ""
            pm = re.match(r"(.*?)\s*\((.*)\)$", title)
            if pm:
                title, sub = pm.group(1), pm.group(2)
            if note:
                sub = (sub + "; " if sub else "") + note.strip("()")
            if title == "Traps":
                sec = {"k": "traps", "n": []}
            elif "flowchart" in title.lower():
                sec = {"k": "pendflow", "title": title}
            else:
                sec = {"k": "sec", "title": title, "sub": sub, "n": []}
            blocks.append(sec); i += 1; continue
        if LIST_RE.match(ln):
            node, i = parse_list(lines, i, len(LIST_RE.match(ln).group(1)))
            if sec is None or sec["k"] == "pendflow":
                sec = {"k": "sec", "title": "", "sub": "", "n": []}; blocks.append(sec)
            sec["n"].append(node); continue
        # loose paragraph
        if sec is None or sec["k"] not in ("sec", "traps"):
            sec = {"k": "sec", "title": "", "sub": "", "n": []}; blocks.append(sec)
        sec["n"].append({"p": s}); i += 1
    for b in blocks:
        if b["k"] in ("sec", "traps"):
            for n in b["n"]:
                if "ul" in n or "ol" in n:
                    tag_badges(n, b["k"] == "sec")
    return blocks, practice


def parse_rich(lines):
    """Paragraphs and lists (used inside ELI5 blockquotes)."""
    out, i, para = [], 0, []
    def flush():
        if para:
            out.append({"p": " ".join(para)}); para.clear()
    while i < len(lines):
        ln = lines[i]
        if not ln.strip():
            flush(); i += 1; continue
        m = LIST_RE.match(ln)
        if m:
            flush(); node, i = parse_list(lines, i, len(m.group(1))); out.append(node); continue
        para.append(ln.strip()); i += 1
    flush()
    return out


def expand_ids(spec, wk):
    ids = []
    for part in [p.strip() for p in spec.split(",") if p.strip()]:
        m = re.match(r"Q(\d+)-(\d+)\.(\d+)(?:\s+to\s+Q\1-\2\.(\d+))?$", part)
        if not m:
            die("bad practice spec: " + part)
        w, s, a, b = m.groups()
        if w != wk:
            die("practice id from another week: " + part)
        for n in range(int(a), int(b or a) + 1):
            ids.append("Q%s-%s.%d" % (w, s, n))
    return ids


def split_parts(text):
    pc = text.index("## PART C"); pd = text.index("## PART D")
    return text[pc:pd], text[pd:]


def parse_journey(partc, wk):
    stages, cur, mod = [], None, None
    for ln in partc.split("\n"):
        m = re.match(r"^### STAGE (\d+): (.*)$", ln)
        if m:
            cur = {"n": m.group(1), "title": m.group(2).strip(), "intro": [], "mods": []}; stages.append(cur); mod = None; continue
        m = re.match(r"^#### Module (\d+\.\d+): (.*)$", ln)
        if m:
            mod = {"code": m.group(1), "title": m.group(2).strip(), "lines": []}; cur["mods"].append(mod); continue
        if cur is None:
            continue
        (mod["lines"] if mod else cur["intro"]).append(ln)
    return stages


def tidy_title(t):
    t = plain(t)
    t = re.sub(r"\s*\((?:Merck|\*?Merck\*?) [^)]*\)$", "", t)
    t = re.sub(r"^Wrap-up, ", "Wrap-up: ", t).replace(" (ELI5)", "")
    return t[:1].upper() + t[1:]


def lower1(t):
    return t[:1].lower() + t[1:]


def build_week(path):
    text = open(path, encoding="utf-8").read()
    m = re.search(r"^# LAW302 .*?Week (\d+)", text, re.M)
    if not m:
        die(path + ": no '# LAW302 ... Week n' heading")
    wk = m.group(1)
    if wk not in WEEKS:
        die("add Week " + wk + " to WEEKS in this script (title, colours, summary)")
    meta = WEEKS[wk]
    partc, partd = split_parts(text)
    stages = parse_journey(partc, wk)
    questions = parse_questions(partd, wk)
    qids = {q["src"] for q in questions}
    used = {}
    out_stages = []
    for st in stages:
        sid = "w%s.s%s" % (wk, st["n"])
        intro, intro_prac = parse_container(st["intro"])
        lessons = []
        is_cmp = re.search(r"compar", st["title"], re.I)
        if is_cmp:
            intro = to_compare(intro)
        if st["mods"]:
            has_intro = any(b["k"] != "obj" for b in intro)
            if has_intro:
                lessons.append({"id": sid, "key": "S" + st["n"], "code": "Stage " + st["n"], "kind": "overview", "t": "Overview: " + lower1(tidy_title(st["title"])),
                                "blocks": intro, "prac": intro_prac})
            pend = []
            for md in st["mods"]:
                blocks, prac = parse_container(md["lines"])
                pend.append((md, blocks))
                if prac:
                    if len(pend) == 1:
                        lessons.append({"id": "w%s.m%s" % (wk, md["code"]), "key": md["code"], "code": md["code"], "kind": "module",
                                        "t": tidy_title(md["title"]), "blocks": blocks, "prac": prac})
                    else:
                        merged = []
                        for pm, pb in pend:
                            merged.append({"k": "h", "t": "Module %s: %s" % (pm["code"], plain(pm["title"]))})
                            merged.extend(pb)
                        lessons.append({"id": "w%s.m%s" % (wk, pend[0][0]["code"]), "key": "S" + st["n"], "code": "Stage " + st["n"], "kind": "stage",
                                        "t": tidy_title(st["title"]), "blocks": merged, "prac": prac,
                                        "mods": [pm["code"] for pm, _ in pend]})
                    pend = []
            if pend:
                die("Stage %s: modules after the last Practice line" % st["n"])
        else:
            lessons.append({"id": sid, "key": "S" + st["n"], "code": "Stage " + st["n"], "kind": "stage", "t": tidy_title(st["title"]),
                            "blocks": intro, "prac": intro_prac})
        for l in lessons:
            ids = []
            for p in l.pop("prac"):
                ids.extend(expand_ids(p, wk))
            for q in ids:
                if q not in qids:
                    die("practice names a missing question: " + q)
                if q in used:
                    die("question practised twice: " + q)
                used[q] = l["id"]
            l["ic"] = ICONS.get(wk + ":" + l.pop("key"), "book")
        sub = next((b["t"] for b in intro if b["k"] == "obj"), "")
        if not sub and st["mods"]:
            sub = " · ".join("%s %s" % (md["code"], tidy_title(md["title"])) for md in st["mods"])
        out_stages.append({"id": sid, "n": st["n"], "title": tidy_title(st["title"]), "sub": plain(sub), "lessons": lessons})
    # Unclaimed sets (integration problems) go to the last stage's last lesson.
    last = out_stages[-1]["lessons"][-1]
    for q in questions:
        if q["src"] not in used:
            used[q["src"]] = last["id"]
    for q in questions:
        q["lesson"] = used.pop(q["src"])
    for st in out_stages:
        for l in st["lessons"]:
            l["nq"] = sum(1 for q in questions if q["lesson"] == l["id"])
    about = parse_about(text)
    week = {"id": "w" + wk, "num": wk, "label": "Week " + wk, "t": meta["t"], "full": meta["full"], "sub": meta["sub"],
            "color": meta["color"], "about": about, "stages": out_stages}
    return week, questions


def to_compare(blocks):
    """Stage 5: the per-issue bullets become one comparison table."""
    out, rows = [], []
    for b in blocks:
        if b["k"] != "sec":
            out.append(b); continue
        for n in b["n"]:
            for it in n.get("ul", []):
                row = {"h": plain(it["t"]), "cells": {}, "note": []}
                for c in it.get("c", []):
                    for ci in c.get("ul", []):
                        m = re.match(r"(CL|REFJA|CCAA): (.*)$", ci["t"])
                        if m:
                            row["cells"][m.group(1)] = m.group(2)
                        else:
                            row["note"].append(ci["t"])
                rows.append(row)
    out.append({"k": "cmp", "cols": [["CL", "Common law"], ["REFJA", "REFJA"], ["CCAA", "CCAA"]], "rows": rows})
    return out


def parse_about(text):
    """Header note, abbreviations and the source-coverage notes, for the week's 'Sources & notes' card."""
    head = text[:text.index("## PART A")] if "## PART A" in text else ""
    built = re.search(r"\*\*Built from:\*\*\s*(.*)", head)
    abbr = re.search(r"\*\*Abbreviations:\*\*\s*(.*)", head)
    pb = text[text.index("## PART B"):text.index("## PART C")]
    secs = []
    for m in re.finditer(r"^### B\d\. ([^\n]*)\n(.*?)(?=^### |\Z)", pb, re.M | re.S):
        lines = [l for l in m.group(2).split("\n") if l.strip() and l.strip() != "---"]
        title = m.group(1).replace(" ✓", "").strip()
        title = {"In the project": "Readings covered"}.get(title, title)
        secs.append({"title": title, "n": parse_rich(lines)})
    return {"built": built.group(1).strip() if built else "", "abbr": abbr.group(1).strip() if abbr else "", "secs": secs}


# ---------- MCQ bank (Part D) ----------
def parse_questions(partd, wk):
    qs = []
    blocks = re.split(r"^#### (Q\d+-\d+\.\d+)\s*$", partd, flags=re.M)
    for k in range(1, len(blocks), 2):
        src, body = blocks[k], blocks[k + 1]
        if not src.startswith("Q" + wk + "-"):
            die("question from another week: " + src)
        def field(name):
            m = re.search(r"^- \*\*" + re.escape(name) + r":\*\*\s*(.*)$", body, re.M)
            return m.group(1).strip() if m else None
        setl = field("Set")
        lv = re.search(r"\*\*Level:\*\*\s*(L\d)", setl).group(1)
        tags = [t.strip() for t in re.search(r"\*\*Tags:\*\*\s*(.*)$", setl).group(1).split(",") if t.strip()]
        prompt = field("Prompt")
        opts = dict(re.findall(r"^  - \*\*([A-D])\.\*\*\s*(.*)$", body, re.M))
        fb = {}
        for L, mark, txt in re.findall(r"^  - \*\*([A-D]) — ([✓✗])[^*]*\*\*\s*(.*)$", body, re.M):
            fb[L] = (mark, txt)
        corr = field("Correct")
        if sorted(opts) != list("ABCD") or sorted(fb) != list("ABCD"):
            die(src + ": needs options and feedback for A-D")
        if [L for L in "ABCD" if fb[L][0] == "✓"] != [corr]:
            die(src + ": Correct (%s) does not match the ✓ feedback" % corr)
        q = {"id": "LAW302-" + src, "src": src, "type": "mcq", "prompt": plain(prompt),
             "options": [{"t": plain(opts[L]), "correct": L == corr, "why": plain(fb[L][1])} for L in "ABCD"],
             "hint": plain(field("Hint") or ""), "cite": plain(field("Source") or ""), "lv": lv, "tags": tags}
        qs.append(q)
    if not qs:
        die("no questions found")
    return qs


def main(paths):
    weeks, bank = [], []
    for p in paths:
        w, qs = build_week(p)
        weeks.append(w); bank.extend(qs)
    weeks.sort(key=lambda w: int(w["num"]))
    for q in bank:
        del q["src"]
    nq = len(bank)
    journey = {"track": {"id": "lj", "name": "LAW302 Conflict of Laws", "short": "LAW302",
                         "color": "#2A7A8C", "dark": "#1D5966", "since": "2026-10-28",
                         "levels": LEVELS},
               "weeks": weeks}
    out = ["/* DealCraft data: LAW302 Commercial Conflict of Laws, learning journey and MCQ bank (%s; %d questions)." % (
        ", ".join(w["label"] for w in weeks), nq),
        "   GENERATED by tools/law302_import.py from the weekly 'Learning Journey + MCQ' files. Do not edit; edit the sources and re-run. */",
        "window.DC_BANK = window.DC_BANK || {};",
        "window.DC_BANK._journey = " + json.dumps(journey, ensure_ascii=False, separators=(",", ":")) + ";",
        "window.DC_BANK.law302 = ["]
    out.append(",\n".join(json.dumps(q, ensure_ascii=False, separators=(",", ":")) for q in bank))
    out.append("];")
    out.append("window.DC_BANK._ljReady = true;")
    sys.stdout.write("\n".join(out) + "\n")
    sys.stderr.write("law302_import: %d weeks, %d lessons, %d questions\n" % (
        len(weeks), sum(len(s["lessons"]) for w in weeks for s in w["stages"]), nq))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        die("usage: law302_import.py WEEK.md [WEEK.md ...] > data/law302.js")
    main(sys.argv[1:])
