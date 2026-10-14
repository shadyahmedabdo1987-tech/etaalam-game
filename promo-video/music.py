import numpy as np, wave
SR=44100;DUR=151.0;BPM=100;beat=60/BPM;N=int(SR*DUR)
L=np.zeros(N);R=np.zeros(N)
def note(f):return 440*2**((f-69)/12)
def add(sig,start,panl=1,panr=1):
    i=int(start*SR);j=min(N,i+len(sig))
    if i>=N:return
    L[i:j]+=sig[:j-i]*panl;R[i:j]+=sig[:j-i]*panr
prog=[[48,52,55,59],[43,47,50,55],[45,48,52,55],[41,45,48,52]]  # Cmaj7 G Am F
bars=int(DUR/(4*beat))+1
rng=np.random.default_rng(3)
for b in range(bars):
    t0=b*4*beat;ch=prog[b%4];intensity=0 if b<2 else 1
    # pad
    d=4*beat;tt=np.arange(int(d*SR))/SR;env=np.minimum(1,tt/0.6)*np.minimum(1,(d-tt)/0.5)
    pad=sum(np.sin(2*np.pi*note(m+12)*tt+0.3*np.sin(2*np.pi*0.3*tt))+0.3*np.sin(2*np.pi*note(m+12)*2.003*tt) for m in ch)*env*0.05
    add(pad,t0,1,0.9)
    # bass
    for k in (0,2):
        dd=1.8*beat;tt=np.arange(int(dd*SR))/SR;env=np.exp(-tt*2.2)*np.minimum(1,tt/0.01)
        add(np.sin(2*np.pi*note(ch[0]-12)*tt)*env*0.22*intensity,t0+k*beat)
    if intensity:
        # pluck arp 8ths
        pat=[0,1,2,3,2,1,2,3]
        for k in range(8):
            m=ch[pat[k]]+24;dd=0.45;tt=np.arange(int(dd*SR))/SR
            tri=2*np.abs(2*((note(m)*tt)%1)-1)-1
            env=np.exp(-tt*9)*np.minimum(1,tt/0.004)
            add(tri*env*0.055,t0+k*beat/2,0.6+0.4*(k%2),1-0.4*(k%2))
        # kick
        for k in (0,2):
            dd=0.35;tt=np.arange(int(dd*SR))/SR;f=50+90*np.exp(-tt*30)
            add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*9)*0.28,t0+k*beat)
        # clap/snare soft
        for k in (1,3):
            dd=0.18;n=rng.standard_normal(int(dd*SR));tt=np.arange(len(n))/SR
            n=np.diff(np.concatenate([[0],n]))*np.exp(-tt*22)*0.07;add(n,t0+k*beat)
        # shaker
        for k in range(8):
            dd=0.06;n=rng.standard_normal(int(dd*SR));tt=np.arange(len(n))/SR
            n=np.diff(np.concatenate([[0],n]))*np.exp(-tt*60)*(0.03 if k%2 else 0.018);add(n,t0+k*beat/2,0.8,1)
    # sparkle bell every 2 bars
    if b%2==1 and intensity:
        for k,m in enumerate([ch[3]+36,ch[2]+36]):
            dd=1.2;tt=np.arange(int(dd*SR))/SR;env=np.exp(-tt*3.5)
            add((np.sin(2*np.pi*note(m)*tt)+0.4*np.sin(2*np.pi*note(m)*3.01*tt))*env*0.03,t0+3*beat+k*beat/2,1,0.7)
# fades
fi=int(1.5*SR);L[:fi]*=np.linspace(0,1,fi);R[:fi]*=np.linspace(0,1,fi)
fo=int(4*SR);L[-fo:]*=np.linspace(1,0,fo);R[-fo:]*=np.linspace(1,0,fo)
m=max(np.abs(L).max(),np.abs(R).max());L/=m*1.12;R/=m*1.12
st=np.stack([L,R],1);st=(st*32767).astype(np.int16)
w=wave.open('music.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(st.tobytes());w.close();print('ok')
