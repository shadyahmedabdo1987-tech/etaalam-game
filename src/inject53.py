import os
B=os.path.dirname(os.path.abspath(__file__))+'/'
P=B+'../build/game.html'
h=open(P,encoding='utf-8').read()
i=h.find('</style>');assert i>0
h=h[:i]+'\n'+open(B+'mod_theme.css',encoding='utf-8').read()+h[i:]
old="const CH_G={k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};"
assert old in h
h=h.replace(old,open(B+'chess_pcs.js',encoding='utf-8').read())
open(P,'w',encoding='utf-8').write(h);print('ok53')
