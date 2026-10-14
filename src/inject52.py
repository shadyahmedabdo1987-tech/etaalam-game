import os
B=os.path.dirname(os.path.abspath(__file__))+'/'
P=B+'../build/game.html'
h=open(P,encoding='utf-8').read()
def swap(start,new):
    global h
    i=h.find(start);assert i>=0,start
    j=h.find('/* ----------',i+10);assert j>i
    h=h[:i]+new.rstrip()+'\n'+h[j:]
swap('/* ---------- المزرعة السعيدة: ازرع',open(B+'mod_farm2.js',encoding='utf-8').read())
swap('/* ---------- المزرعة السعيدة ---------- */',open(B+'mod_farm2.css',encoding='utf-8').read())
open(P,'w',encoding='utf-8').write(h);print('ok52')
