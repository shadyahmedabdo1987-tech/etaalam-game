# يجمّع mod_farm2 من الملفات: الجزء القديم (البيانات والمنطق) + الرسم الجديد farm_iso
import re
import os
D=os.path.dirname(os.path.abspath(__file__))+'/'
B=D+'../'
js=open(B+'mod_farm2.js',encoding='utf-8').read()
a=js.index('// ---------- رسم المزرعة');b=js.index('// ---- الأرض ----')
js=js[:a]+open(D+'farm_iso.js',encoding='utf-8').read()+js[b:]
open(B+'mod_farm2.js','w',encoding='utf-8').write(js)
css=open(B+'mod_farm2.css',encoding='utf-8').read()
c=css.index('/* ---------- خريطة المزرعة ---------- */')
css=css[:c]+open(D+'farm_iso_a.css',encoding='utf-8').read()+open(D+'farm_keep.css',encoding='utf-8').read()+'.fm-pop{z-index:600}\n'
open(B+'mod_farm2.css','w',encoding='utf-8').write(css)
