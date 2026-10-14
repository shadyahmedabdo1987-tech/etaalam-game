import os
B=os.path.dirname(os.path.abspath(__file__))+'/'
P=B+'../build/game.html'
h=open(P,encoding='utf-8').read()
i=h.find('function race3Render(){');assert i>0
j=h.find('\n}\n',i)+3
h=h[:j]+open(B+'mod_race2.js',encoding='utf-8').read()+h[j:]
open(P,'w',encoding='utf-8').write(h);print('ok54')
