"""Regenerate the Chinese WOFF2 subsets after changing Chinese copy.

Requires fonttools and brotli. Pass a directory containing NotoSansSC.ttf,
NotoSerifSC.ttf and their Noto{Sans,Serif}SC-LICENSE.txt files, downloaded from:
https://github.com/google/fonts/tree/main/ofl/notosanssc
https://github.com/google/fonts/tree/main/ofl/notoserifsc

Usage: python scripts/build-chinese-fonts.py /path/to/source-fonts
This is a maintenance command; the website build uses the committed subsets.
"""

from copy import deepcopy
from pathlib import Path
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
destination = root / "public/assets/fonts"
characters = set(range(0x20, 0x7F))
for path in (root / "src").rglob("*"):
    if path.suffix in {".ts", ".tsx", ".json"}:
        characters.update(ord(c) for c in path.read_text() if 0x2E80 <= ord(c) <= 0xFFEF)

for family, weights in [("NotoSansSC", [400, 600]), ("NotoSerifSC", [400])]:
    font = TTFont(source / f"{family}.ttf")
    missing = characters - font.getBestCmap().keys()
    if missing:
        raise ValueError(f"{family} lacks characters: {sorted(missing)}")
    options = subset.Options()
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=characters)
    subsetter.subset(font)
    for weight in weights:
        output = instantiateVariableFont(deepcopy(font), {"wght": weight}, inplace=True)
        output.flavor = "woff2"
        path = destination / f"{family}-{weight}.woff2"
        output.save(path)
        print(f"{path.name}: {path.stat().st_size:,} bytes; {len(characters)} characters")
    licence = (source / f"{family}-LICENSE.txt").read_text()
    (destination / f"{family}-LICENSE.txt").write_text("\n".join(line.rstrip() for line in licence.splitlines()) + "\n")
