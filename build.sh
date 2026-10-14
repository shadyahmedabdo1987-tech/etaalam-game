#!/bin/sh
# يبني ملف اللعبة app/index.html من الملفات اللي في src
set -e
cd "$(dirname "$0")"
mkdir -p build
cp src/base.html build/game.html
python3 src/inject50.py
python3 src/inject51.py
python3 src/inject52.py
G=build/game.html
{ printf '<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>body{margin:0}[hidden]{display:none!important}</style>\n'; sed -n '1,/<\/style>/p' $G; printf '</head>\n<body>\n'; sed -n '/<\/style>/,$p' $G | tail -n +2; printf '\n</body>\n</html>\n'; } > app/index.html
echo "تم: app/index.html"
