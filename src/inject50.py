import os
B=os.path.dirname(os.path.abspath(__file__))+'/'
P=B+'../build/game.html'
h=open(P,encoding='utf-8').read()
def rep(a,b,cnt=1):
    global h
    assert h.count(a)>=1,a[:70]
    h=h.replace(a,b,cnt)
MARK='/* ---------- الأقسام التعليمية الجديدة: محرّك مشترك'
if MARK in h:
    raise SystemExit('already injected')
css=open(B+'mod_learn.css',encoding='utf-8').read()
rep('</style>',css+'\n</style>')
js=open(B+'learn_data.js',encoding='utf-8').read()+open(B+'mod_learn.js',encoding='utf-8').read()
rep('/* ---------- قايمة الوشوش',js+'\n/* ---------- قايمة الوشوش')
T=lambda i,c1,c2,cd,e,n,d:f'<button class="appicon" id="{i}" style="--c1:{c1};--c2:{c2};--cd:{cd};--d:{d}s"><span class="float"><span class="ico tilt">{e}<i class="gloss"></i><i class="shine"></i></span></span><span class="lbl">{n}</span></button>'
tiles='\n'.join('        '+T(*x) for x in [
 ('readBtn','#FF9A88','#FF5A45','#C63E2C','<span class="gl">بَ</span>','القراءة',3.6),
 ('dictBtn','#7CC3FF','#2F8FE6','#1E6CB3','<span class="em">✏️</span>','الإملاء',4.0),
 ('worBtn','#48D6A0','#0E9467','#096B4A','<span class="em">🤲</span>','العبادات',4.4),
 ('sciBtn','#9FD8FF','#3B9BE8','#1F6DB0','<span class="em">🔬</span>','اكتشف العالم',4.8),
 ('lifeBtn','#FFD36B','#E39E12','#A87206','<span class="em">🕐</span>','مهارات الحياة',5.2),
 ('engBtn','#FFB0C8','#F25C8E','#B92E62','<span class="gl duo"><span>A</span><small>b</small></span>','English Words',5.6),
 ('egyBtn','#F3D27A','#D9A520','#9C7410','<span class="em">🗺️</span>','مصر والعالم',6.0),
 ('thinkBtn','#B9A8FF','#7C5CF2','#5236C4','<span class="em">🧩</span>','ألعاب التفكير',6.4)])
rep('<span class="lbl">مواقف وحلول</span></button>\n      </div>\n    </section>',
    '<span class="lbl">مواقف وحلول</span></button>\n'+tiles+'\n      </div>\n      <button class="pr-entry" id="parentBtn">👨‍👩‍👧 ركن الأهل</button>\n    </section>')
rep('<section class="screen" id="sHome" hidden>\n      <div class="appgrid">','<section class="screen" id="sHome" hidden>\n      <div class="daily-box" id="dailyBox"></div>\n      <div class="appgrid">')
rep("$('#sitBtn').onclick=()=>goSit();","""$('#sitBtn').onclick=()=>goSit();
[['readBtn','read'],['dictBtn','dict'],['worBtn','wor'],['sciBtn','sci'],['lifeBtn','life'],['engBtn','eng'],['egyBtn','egy'],['thinkBtn','think']].forEach(([i,s])=>{$('#'+i).onclick=()=>lnOpen(s)});
$('#parentBtn').onclick=()=>prOpen();""")
rep("$('#backBtn').onclick=()=>{\n","$('#backBtn').onclick=()=>{\n  if(S.screen==='learn'){lnBack();return}\n")
rep("const vb=window.VOICE_PACK&&window.VOICE_PACK[VKEY(p.say)];","const vb=window.VOICE_PACK&&window.VOICE_PACK[p.vk||VKEY(p.say)];")
rep("function show(name){\n  S.screen=name;","function show(name){\n  S.screen=name;\n  if(name==='home'&&typeof dlPaint==='function')setTimeout(()=>{dlPaint();ptCheck()});")
open(P,'w',encoding='utf-8').write(h);print('ok')
