import os
B=os.path.dirname(os.path.abspath(__file__))+'/'
P=B+'../build/game.html'
h=open(P,encoding='utf-8').read()
def rep(a,b):
    global h
    assert h.count(a)>=1,a[:80]
    h=h.replace(a,b,1)
if 'مملكة الحلويات: لعبة توصيل' in h: raise SystemExit('already')
rep('</style>',open(B+'mod_candy.css',encoding='utf-8').read()+'\n</style>')
js=open(B+'cc_tune.js',encoding='utf-8').read()+open(B+'mod_candy.js',encoding='utf-8').read()
rep('/* ---------- قايمة الوشوش',js+'\n/* ---------- قايمة الوشوش')
rep('<span class="lbl">المكعبات</span></button>\n','<span class="lbl">المكعبات</span></button>\n        <button class="appicon" id="gCandy" style="--c1:#FFB0D9;--c2:#F2509A;--cd:#B5226A;--d:1.25s"><span class="float"><span class="ico tilt"><span class="em">🍭</span><i class="gloss"></i><i class="shine"></i></span></span><span class="lbl">مملكة الحلويات</span></button>\n')
rep("$('#gFarm').onclick=","$('#gCandy').onclick=()=>{if((S.raceRuns||0)>0){S.raceRuns--;ccOpen()}else openGames()};\n$('#gFarm').onclick=")
rep("$('#backBtn').onclick=()=>{\n","$('#backBtn').onclick=()=>{\n  if(S.screen==='candy'){ccBack();return}\n")
rep("name==='farm'?'المزرعة السعيدة'","name==='farm'?'المزرعة السعيدة':name==='candy'?'مملكة الحلويات'")
rep("function show(name){\n  S.screen=name;","function show(name){\n  S.screen=name;\n  if(name!=='candy'){const cp=document.getElementById('ccPop');if(cp)cp.hidden=true}")
open(P,'w',encoding='utf-8').write(h);print('ok51')
