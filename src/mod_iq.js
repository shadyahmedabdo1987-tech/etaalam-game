/* ---------- رحلة الذكاء: ٥٠ مستوى من سن سنتين لحد ١١ سنة ---------- */
const IQJ_LV=50, IQJ_PER=6;
const IQJ_AGES=[
 {a:2,e:'🐣',c1:'#FFF3C4',c2:'#FFE08A',n:'عالم الكتاكيت'},{a:3,e:'🧸',c1:'#FFE0EC',c2:'#FFC2D8',n:'غابة الدباديب'},
 {a:4,e:'🎨',c1:'#E3F4FF',c2:'#C2E4FF',n:'وادي الألوان'},{a:5,e:'🦁',c1:'#E6F8E0',c2:'#C6EDB6',n:'سافاري الأسود'},
 {a:6,e:'🏰',c1:'#EFE6FF',c2:'#D9C6FF',n:'قلعة الألغاز'},{a:7,e:'🌋',c1:'#FFE9DC',c2:'#FFCDB0',n:'جبل البركان'},
 {a:8,e:'🌊',c1:'#DDF6FA',c2:'#B4E9F2',n:'بحر الأرقام'},{a:9,e:'🏜️',c1:'#FFF1D6',c2:'#FBDDA8',n:'صحراء الكنوز'},
 {a:10,e:'🚀',c1:'#E1E4FF',c2:'#C0C6FF',n:'مدينة الفضاء'},{a:11,e:'👑',c1:'#FFF6CC',c2:'#FFE680',n:'تاج العباقرة'}];
function iqjLoad(){const d=pget('iqJ',null);return d&&typeof d.lvl==='number'?d:{lvl:0,st:{},age:0}}
function iqjSave(d){pset('iqJ',d)}
const IQ_SAY={
 seq:'كَمِّل السِّلْسِلَة… إِيه الرَّقَم اللِّي يِيجِي بَعْد كِدَه؟',
 math:['حِلّ المَسْأَلَة دِي… النّاتِج كام؟','حِلِّي المَسْأَلَة دِي… النّاتِج كام؟'],
 count:['كام واحْدَة هِنا؟ عِدّ كُوَيِّس.','كام واحْدَة هِنا؟ عِدِّي كُوَيِّس.'],
 miss:'إِيه اللِّي ناقِص مَكان عَلامِةْ الاِسْتِفْهام؟',
 analog:['فَكَّر كُوَيِّس… الحاجَة دِي بِتْرُوح مَع إِيه؟','فَكَّرِي كُوَيِّس… الحاجَة دِي بِتْرُوح مَع إِيه؟'],
 gone:['إِيه الحاجَة اللِّي اخْتَفِت؟ دُوس عَلِيها.','إِيه الحاجَة اللِّي اخْتَفِت؟ دُوسِي عَلِيها.'],
 sym:'كُلّ صُورَة لِيها رَقَم… اِعْرَف قِيمِةْ الصُّورَة اللِّي عَلِيها عَلامِةْ اسْتِفْهام.',
 oddn:'مِين الرَّقَم المُخْتَلِف عَن الباقْيِين؟',
 map:['يَلَّا نِكَمِّل رِحْلِةْ الذَّكاء! دُوس عَلَى المُسْتَوَى اللِّي بِيِنَوَّر.','يَلَّا نِكَمِّل رِحْلِةْ الذَّكاء! دُوسِي عَلَى المُسْتَوَى اللِّي بِيِنَوَّر.'],
 age:['عُمْرَك كام سَنَة؟ اِخْتار عُمْرَك عَشان نِبْدَأ مِن المُسْتَوَى المُناسِب.','عُمْرِك كام سَنَة؟ اِخْتارِي عُمْرِك عَشان نِبْدَأ مِن المُسْتَوَى المُناسِب.'],
 lock:['المُسْتَوَى دَه لِسَّه مَقْفُول. خَلَّص اللِّي قَبْلُه الأَوِّل.','المُسْتَوَى دَه لِسَّه مَقْفُول. خَلَّصِي اللِّي قَبْلُه الأَوِّل.'],
 up:['بْرافُو! خَلَّصْت المُسْتَوَى، وِطِلِعْت لِلمُسْتَوَى اللِّي بَعْدُه!','بْرافُو! خَلَّصْتِي المُسْتَوَى، وِطِلِعْتِي لِلمُسْتَوَى اللِّي بَعْدُه!'],
 all:['مَبْرُوك! خَلَّصْت رِحْلِةْ الذَّكاء كُلَّها! إِنْتَ بَطَل حَقِيقِي!','مَبْرُوك! خَلَّصْتِي رِحْلِةْ الذَّكاء كُلَّها! إِنْتِي بَطَلَة حَقِيقِيَّة!'],
 lvl:'يَلَّا نِبْدَأ المُسْتَوَى!'
};
const gs=v=>Array.isArray(v)?g(v[0],v[1]):v;
const ANALOG=[['🐟','🌊'],['🐦','🪺'],['🐝','🍯'],['🐄','🥛'],['🐔','🥚'],['🌧️','☂️'],['✏️','📄'],['🔑','🔒'],['⚽','🥅'],['🐶','🦴'],['🐰','🥕'],['🐒','🍌'],['👟','🧦'],['🌙','⭐'],['🚗','⛽'],['🦷','🪥'],['🍞','🧈'],['🎨','🖌️']];
const NUMS=n=>`<b class="qn">${arDigits(n)}</b>`;
function numOpts(ans,spread,k=3){const s=new Set([ans]);let guard=0;while(s.size<k&&guard++<200){const d=(Math.floor(Math.random()*spread)+1)*(Math.random()<.5?-1:1);if(ans+d>=0)s.add(ans+d)}return shuffle([...s])}
function qNum(ans,stageHTML,say,sig,spread=3,k=3){const o=numOpts(ans,spread,k);return{sig,stage:stageHTML,opts:o.map(NUMS),ans:o.indexOf(ans),four:k===4,say,num:true}}
function iqjTypes(age){
  if(age<=2)return['shadow','size','oddsame','patAB','memory'];
  if(age===3)return['shadow','size','odd','pattern','count','memory'];
  if(age===4)return['count','pattern','odd','memory','size','shadow'];
  if(age===5)return['seq1','addpic','pattern','odd','gone','count'];
  if(age===6)return['seq','addpic','subpic','analog','gone','pattern'];
  if(age===7)return['seq','add20','analog','missmid','oddnum','gone'];
  if(age===8)return['seq2','mult','sym1','analog','gone','missmid'];
  if(age===9)return['seqalt','mult9','div','sym2','oddnum','analog'];
  if(age===10)return['seqhard','multi','sym2','numanalog','gone','seqalt'];
  return['seqhard','frac','sym3','numanalog','multi','seqalt'];
}
function makeQL1(L){
  const age=2+Math.floor(L/5), sub=L%5, R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), t=pick(iqjTypes(age));
  const k=age>=6?4:3;
  switch(t){
    case 'shadow':case 'size':case 'odd':case 'memory':case 'pattern':return makeQ1(t);
    case 'oddsame':{const a=pick(EMO2);let b;do{b=pick(EMO2)}while(b===a);const it=shuffle([a,a,b]);return{sig:'O'+it.join(''),stage:'',opts:it,ans:it.indexOf(b),say:'مِين المُخْتَلِف؟ دُوس عَلَى الحاجَة اللِّي مِش زَيّ الباقْيِين.'}}
    case 'patAB':{const a=pick(SHP);let b;do{b=pick(SHP)}while(b===a);const seq=[a,b,a,b];let w=SHP.filter(x=>x!==a);const o=shuffle([a,...shuffle(w).slice(0,2)]);
      return{sig:'Pab'+SHP.indexOf(a)+SHP.indexOf(b),stage:seq.map(shapeHTML).join('')+'<span class="qm">؟</span>',opts:o.map(shapeHTML),ans:o.indexOf(a),pat:true,say:'بُصّ عَلَى الأَشْكال… إِيه الشَّكْل اللِّي يِيجِي بَعْد كِدَه؟'}}
    case 'count':{const n=age<=3?R(1,5):R(3,10),e=pick(EMO2);return qNum(n,`<div class="qcount">${Array.from({length:n},()=>`<span>${e}</span>`).join('')}</div>`,gs(IQ_SAY.count),'C'+e+n,2,k)}
    case 'seq1':{const st=R(0,6+sub*2);const a=[st,st+1,st+2,st+3];return qNum(st+4,a.map(NUMS).join('<i class="qa">←</i>')+'<i class="qa">←</i><span class="qm">؟</span>',IQ_SAY.seq,'S1'+st,2,k)}
    case 'seq':case 'seq2':{const steps=t==='seq'?[1,2,-1,5,10]:[2,3,4,5,-2,-3];const d=pick(steps);const st=d<0?R(12,30):R(1,10+sub*3);const a=[0,1,2,3].map(i=>st+i*d);
      const dbl=t==='seq2'&&Math.random()<.35;if(dbl){const s0=R(1,4),b=[s0,s0*2,s0*4,s0*8];return qNum(s0*16,b.map(NUMS).join('<i class="qa">←</i>')+'<i class="qa">←</i><span class="qm">؟</span>',IQ_SAY.seq,'SD'+s0,8,k)}
      return qNum(st+4*d,a.map(NUMS).join('<i class="qa">←</i>')+'<i class="qa">←</i><span class="qm">؟</span>',IQ_SAY.seq,'S'+st+'_'+d,Math.max(2,Math.abs(d)),k)}
    case 'seqalt':{const st=R(1,8),d1=R(1,3),d2=R(2,5);const a=[st,st+d1,st+d1+d2,st+2*d1+d2,st+2*d1+2*d2];return qNum(st+3*d1+2*d2,a.map(NUMS).join('<i class="qa">←</i>')+'<i class="qa">←</i><span class="qm">؟</span>',IQ_SAY.seq,'SA'+st+d1+d2,3,k)}
    case 'seqhard':{const kind=R(0,3);let a,ans,sig;
      if(kind===0){const s0=R(1,4);a=[s0,s0+1,s0+2,s0+3].map(x=>x*x);ans=(s0+4)**2;sig='SQ'+s0}
      else if(kind===1){let x=R(1,5);a=[x];for(let i=0;i<3;i++){x=x*2+1;a.push(x)}ans=x*2+1;sig='SM'+a[0]}
      else if(kind===2){let p=R(1,3),q=R(1,4);a=[p,q];for(let i=0;i<3;i++)a.push(a[a.length-1]+a[a.length-2]);ans=a[a.length-1]+a[a.length-2];sig='SF'+p+q}
      else{const s0=R(2,6);a=[s0,s0*3,s0*3-2,(s0*3-2)*3];ans=(s0*3-2)*3-2;sig='SX'+s0}
      return qNum(ans,a.map(NUMS).join('<i class="qa">←</i>')+'<i class="qa">←</i><span class="qm">؟</span>',IQ_SAY.seq,sig,Math.max(3,Math.round(ans*.15)),k)}
    case 'addpic':{const e=pick(EMO2),a=R(1,age<=5?3:5),b=R(1,age<=5?2:4),row=n=>Array.from({length:n},()=>`<span>${e}</span>`).join('');
      return qNum(a+b,`<div class="qeq"><div class="qcount sm">${row(a)}</div><b class="qop">+</b><div class="qcount sm">${row(b)}</div><b class="qop">=</b><span class="qm">؟</span></div>`,gs(IQ_SAY.math),'AP'+e+a+b,2,k)}
    case 'subpic':{const e=pick(EMO2),a=R(4,8),b=R(1,a-1),row=(n,x)=>Array.from({length:n},(_,i)=>`<span class="${i>=n-x?'gone':''}">${e}</span>`).join('');
      return qNum(a-b,`<div class="qeq"><div class="qcount sm">${row(a,b)}</div><b class="qop">−</b>${NUMS(b)}<b class="qop">=</b><span class="qm">؟</span></div>`,gs(IQ_SAY.math),'SP'+a+b,2,k)}
    case 'add20':{const sub2=Math.random()<.45;let a=R(5,15),b=R(2,9);if(sub2&&b>a)[a,b]=[b,a];const ans=sub2?a-b:a+b;
      return qNum(ans,`<div class="qeq">${NUMS(a)}<b class="qop">${sub2?'−':'+'}</b>${NUMS(b)}<b class="qop">=</b><span class="qm">؟</span></div>`,gs(IQ_SAY.math),'A'+a+(sub2?'-':'+')+b,3,k)}
    case 'mult':case 'mult9':{const a=R(2,t==='mult'?5:9),b=R(2,t==='mult'?5:9);return qNum(a*b,`<div class="qeq">${NUMS(a)}<b class="qop">×</b>${NUMS(b)}<b class="qop">=</b><span class="qm">؟</span></div>`,gs(IQ_SAY.math),'M'+a+'x'+b,Math.max(2,a),k)}
    case 'div':{const b=R(2,6),ans=R(2,9);return qNum(ans,`<div class="qeq">${NUMS(b*ans)}<b class="qop">÷</b>${NUMS(b)}<b class="qop">=</b><span class="qm">؟</span></div>`,gs(IQ_SAY.math),'D'+b*ans+'/'+b,3,k)}
    case 'multi':{const a=R(2,6),b=R(2,6),c=R(1,9),plus=Math.random()<.5;const ans=plus?a*b+c:a*b-c;if(ans<0)return makeQL1(L);
      return qNum(ans,`<div class="qeq">(${NUMS(a)}<b class="qop">×</b>${NUMS(b)})<b class="qop">${plus?'+':'−'}</b>${NUMS(c)}<b class="qop">=</b><span class="qm">؟</span></div>`,gs(IQ_SAY.math),'MU'+a+b+c+plus,4,k)}
    case 'frac':{const d=pick([2,4,3]),ans=R(2,9),w=d*ans;const nm={2:'نص',3:'تلت',4:'ربع'}[d];
      return qNum(ans,`<div class="qeq"><b class="qw">${nm}</b>${NUMS(w)}<b class="qop">=</b><span class="qm">؟</span></div>`,gs(IQ_SAY.math),'F'+d+'_'+w,3,k)}
    case 'missmid':{const d=pick([2,3,5,10]),st=R(1,20);const a=[0,1,2,3,4].map(i=>st+i*d);const hole=R(1,3);
      return qNum(a[hole],a.map((x,i)=>i===hole?'<span class="qm">؟</span>':NUMS(x)).join('<i class="qa">←</i>'),IQ_SAY.miss,'MM'+st+d+hole,Math.max(2,d),k)}
    case 'oddnum':{const even=Math.random()<.5,pool=[];while(pool.length<3){const x=R(1,40)*2+(even?0:1);if(!pool.includes(x))pool.push(x)}let o;do{o=R(1,40)*2+(even?1:0)}while(pool.includes(o));
      const it=shuffle([...pool,o]);return{sig:'ON'+it.join(','),stage:'<b style="font-size:1.4rem">زوجي ولا فردي؟</b>',opts:it.map(NUMS),ans:it.indexOf(o),four:true,say:IQ_SAY.oddn,num:true}}
    case 'analog':{const [p1,p2]=shuffle(ANALOG.slice()).slice(0,2);const wr=shuffle(ANALOG.filter(x=>x!==p1&&x!==p2)).slice(0,k-1).map(x=>x[1]);const o=shuffle([p2[1],...wr]);
      return{sig:'AN'+p1[0]+p2[0]+o.join(''),stage:`<div class="qan"><span>${p1[0]}</span><i class="qa">←</i><span>${p1[1]}</span></div><div class="qan"><span>${p2[0]}</span><i class="qa">←</i><span class="qm">؟</span></div>`,opts:o,ans:o.indexOf(p2[1]),four:k===4,say:gs(IQ_SAY.analog)}}
    case 'numanalog':{const f=pick([[x=>x*2,'×2'],[x=>x*3,'×3'],[x=>x+5,'+5'],[x=>x*x,'²'],[x=>x*2+1,'×2+1']]);const a=R(2,6);let b;do{b=R(2,7)}while(b===a);
      return qNum(f[0](b),`<div class="qan">${NUMS(a)}<i class="qa">←</i>${NUMS(f[0](a))}</div><div class="qan">${NUMS(b)}<i class="qa">←</i><span class="qm">؟</span></div>`,IQ_SAY.miss,'NA'+f[1]+a+b,4,k)}
    case 'sym1':{const e=pick(['🍎','🍌','⭐','🐱','🚗']),v=R(2,9),n=R(2,3);
      return qNum(v,`<div class="qeq">${Array.from({length:n},()=>`<span class="qs">${e}</span>`).join('<b class="qop">+</b>')}<b class="qop">=</b>${NUMS(v*n)}</div><div class="qeq"><span class="qs">${e}</span><b class="qop">=</b><span class="qm">؟</span></div>`,IQ_SAY.sym,'Y1'+e+v+n,3,k)}
    case 'sym2':case 'sym3':{const [e1,e2,e3]=shuffle(['🍎','🍌','⭐','🐱','🚗','🎈']).slice(0,3),a=R(1,9),b=R(1,9),c=R(1,6);
      if(t==='sym2')return qNum(b,`<div class="qeq"><span class="qs">${e1}</span><b class="qop">+</b><span class="qs">${e1}</span><b class="qop">=</b>${NUMS(2*a)}</div><div class="qeq"><span class="qs">${e1}</span><b class="qop">+</b><span class="qs">${e2}</span><b class="qop">=</b>${NUMS(a+b)}</div><div class="qeq"><span class="qs">${e2}</span><b class="qop">=</b><span class="qm">؟</span></div>`,IQ_SAY.sym,'Y2'+a+b,3,k);
      return qNum(c,`<div class="qeq"><span class="qs">${e1}</span><b class="qop">+</b><span class="qs">${e1}</span><b class="qop">=</b>${NUMS(2*a)}</div><div class="qeq"><span class="qs">${e1}</span><b class="qop">+</b><span class="qs">${e2}</span><b class="qop">=</b>${NUMS(a+b)}</div><div class="qeq"><span class="qs">${e2}</span><b class="qop">×</b><span class="qs">${e3}</span><b class="qop">=</b>${NUMS(b*c)}</div><div class="qeq"><span class="qs">${e3}</span><b class="qop">=</b><span class="qm">؟</span></div>`,IQ_SAY.sym,'Y3'+a+b+c,3,k)}
    case 'gone':{const n=age<=6?4:5,it=shuffle(EMO2.slice()).slice(0,n),g0=it[R(0,n-1)];const rest=it.filter(x=>x!==g0);const others=shuffle(EMO2.filter(x=>!it.includes(x))).slice(0,k-1);const o=shuffle([g0,...others]);
      return{sig:'G'+it.join(''),stage:`<div class="qcount">${it.map(x=>`<span>${x}</span>`).join('')}</div>`,stage2:`<div class="qcount">${rest.map(x=>`<span>${x}</span>`).join('')}<span class="qm">؟</span></div>`,opts:o,ans:o.indexOf(g0),four:k===4,gone:true,say:'رَكِّز كُوَيِّس… وِافْتِكِر الصُّورَة دِي!'}}
  }
  return makeQ1('shadow');
}
function makeQL(L){
  const hist=pget('iqHist',[]);let q;
  for(let i=0;i<80;i++){q=makeQL1(L);if(!hist.includes(q.sig))break}
  hist.push(q.sig);pset('iqHist',hist.slice(-600));return q;
}
// ---------- الخريطة ----------
function iqjPos(i){const x=50+Math.sin(i*.9)*30, y=110+i*112;return[x,y]}
function goIQ(){
  show('iq');
  const d=iqjLoad();
  $('#hcName').textContent=S.name;
  const lv=Math.min(d.lvl,IQJ_LV-1), ag=IQJ_AGES[Math.floor(lv/5)];
  $('#hcLvl').textContent=d.lvl>=IQJ_LV?'خلّص الرحلة كلها! 👑':`المستوى ${arDigits(lv+1)} من ${arDigits(IQJ_LV)} · ${ag.n}`;
  $('#hcPts').textContent=`${arDigits(S.iqPts)} نقطة ذكاء · ⭐ ${arDigits(Object.values(d.st).reduce((a,b)=>a+b,0))}`;
  $('#hcFace').innerHTML=S.face?faceSVG(S.face):faceSVG('locked');
  const inBand=d.lvl%5;
  $('#hcProgTxt').textContent=d.lvl>=IQJ_LV?'كسبت كل الوشوش!':`${arDigits(inBand)} من ٥ مستويات`;
  $('#hcBar').style.width=(d.lvl>=IQJ_LV?100:inBand/5*100)+'%';
  $('#hcMedals').innerHTML=S.faces.length?S.faces.map(k=>`<span class="mini-medal">${faceSVG(k)}</span>`).join(''):'<span>لسه، خلّص أول ٥ مستويات!</span>';
  const sec=document.querySelector('#sIQ .sec-title');if(sec)sec.textContent='رحلة الذكاء 🗺️';
  const box=$('#iqCats');box.className='iqmap';box.innerHTML='';
  // خلفيات المناطق
  const H=iqjPos(IQJ_LV-1)[1]+120;box.style.height=H+'px';
  IQJ_AGES.forEach((A,k)=>{const top=iqjPos(k*5)[1]-80,h=5*112;const z=document.createElement('div');z.className='iqzone';z.style.cssText=`top:${top}px;height:${h}px;background:linear-gradient(180deg,${A.c1},${A.c2})`;
    z.innerHTML=`<span class="zlab">${A.e} ${A.n} · ${arDigits(A.a)} ${A.a<=10&&A.a>2?'سنين':'سنة'}</span><span class="zdeco z1">${A.e}</span><span class="zdeco z2">${A.e}</span>`;box.appendChild(z)});
  // الطريق
  const pts=[...Array(IQJ_LV).keys()].map(iqjPos);let path=`M ${pts[0][0]} ${pts[0][1]}`;
  for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i];path+=` C ${x0} ${y0+56}, ${x1} ${y1-56}, ${x1} ${y1}`}
  const W=box.clientWidth||360;
  const sv=`<svg class="iqroad" viewBox="0 0 100 ${H}" preserveAspectRatio="none" style="height:${H}px"><path d="${path}" class="r1"/><path d="${path}" class="r2"/><path d="${path}" class="r3"/></svg>`;
  box.insertAdjacentHTML('beforeend',sv);
  for(let i=0;i<IQJ_LV;i++){const [x,y]=pts[i];const b=document.createElement('button');const st=d.st[i]||0,done=i<d.lvl,cur=i===d.lvl;
    b.className='iqnode'+(done?' done':'')+(cur?' cur':'')+(i>d.lvl?' lock':'')+((i+1)%5===0?' boss':'');b.style.cssText=`left:${x}%;top:${y}px`;
    b.innerHTML=`<span class="nn">${i>d.lvl?'🔒':arDigits(i+1)}</span>${done?`<span class="ns">${'★'.repeat(st)}${'☆'.repeat(3-st)}</span>`:''}${(i+1)%5===0&&!done?'<span class="gift">🎁</span>':''}`;
    b.onclick=()=>{if(i>d.lvl){speak([{say:gs(IQ_SAY.lock)}]);b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');return}startLevel(i)};box.appendChild(b)}
  // البطل على الطريق
  const av=document.createElement('div');av.className='iqav';av.id='iqAv';const [ax,ay]=pts[Math.min(d.lvl,IQJ_LV-1)];av.style.cssText=`left:${ax}%;top:${ay-54}px`;av.innerHTML=S.face?faceSVG(S.face):'<span style="font-size:2.2rem">🧒</span>';box.appendChild(av);
  setTimeout(()=>{const t=$('#iqAv');if(t)t.scrollIntoView({block:'center',behavior:'smooth'})},250);
  if(IQ.moveFrom!=null&&IQ.moveFrom<d.lvl){const [fx,fy]=pts[IQ.moveFrom];av.style.transition='none';av.style.left=fx+'%';av.style.top=(fy-54)+'px';void av.offsetWidth;
    setTimeout(()=>{av.style.transition='left 1.4s cubic-bezier(.5,0,.3,1),top 1.4s cubic-bezier(.5,0,.3,1)';av.style.left=ax+'%';av.style.top=(ay-54)+'px';av.classList.add('walk');tone([523,659,784],'sine',.12);setTimeout(()=>av.classList.remove('walk'),1500)},500)}
  IQ.moveFrom=null;
  if(!d.age){iqjAskAge();return}
  speak([{say:gs(IQ_SAY.map)}]);
}
function iqjAskAge(){
  const m=document.createElement('div');m.className='iqage';m.innerHTML=`<div class="card"><p class="t">عمر ${esc(S.name)} كام سنة؟</p><div class="ages">${IQJ_AGES.map(A=>`<button data-a="${A.a}">${arDigits(A.a)}<small>${A.e}</small></button>`).join('')}</div></div>`;
  document.body.appendChild(m);
  m.querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=+b.dataset.a;const d=iqjLoad();d.age=a;const start=(a-2)*5;if(d.lvl<start)d.lvl=start;iqjSave(d);m.remove();goIQ()});
  speak([{say:gs(IQ_SAY.age)}]);
}
// ---------- لعب المستوى ----------
function startLevel(i){IQ.L=i;IQ.n=0;IQ.miss=0;IQ.cat={name:`المستوى ${arDigits(i+1)}`};show('iqq');iqNext(true)}
function startIQ(cat){goIQ()}
function iqDots(){const n=IQ.L==null?5:IQJ_PER;$('#iqDots').innerHTML=Array.from({length:n},(_,i)=>`<i class="${i<IQ.n?'on':i===IQ.n?'cur':''}"></i>`).join('')}
function iqNext(first){
  clearTimeout(IQ.timer);
  const q=makeQL(IQ.L); IQ.q=q; IQ.locked=false; iqDots();
  const stg=$('#iqStage');stg.classList.toggle('pat',!!q.pat);stg.classList.toggle('numq',!!q.num);stg.innerHTML=q.stage||'<b style="font-size:1.5rem">دوس على المختلف</b>';
  const box=$('#iqOpts'); box.className='iq-opts'+(q.four?' four':'')+(q.num?' nums':''); box.innerHTML='';
  q.opts.forEach((o,i)=>{const b=document.createElement('button');b.className='opt';b.innerHTML=o;b.onclick=()=>iqAnswer(b,i);box.appendChild(b)});
  const pre=first?[{say:IQ_SAY.lvl}]:[];
  if(q.memory||q.gone){
    box.style.visibility='hidden';
    speak([...pre,{say:q.say}]);
    IQ.timer=setTimeout(()=>{if(IQ.q!==q||S.screen!=='iqq')return;$('#iqStage').innerHTML=q.gone?q.stage2:'<span class="cover">؟</span>';box.style.visibility='visible';
      speak([{say:q.gone?gs(IQ_SAY.gone):g('إِيه الصُّورَة اللِّي كانِت مِسْتَخَبِّيَّة؟ دُوس عَلِيها.','إِيه الصُّورَة اللِّي كانِت مِسْتَخَبِّيَّة؟ دُوسِي عَلِيها.')}])},q.gone?3600:2600);
  }else{box.style.visibility='visible';speak([...pre,{say:q.say}])}
}
function iqAnswer(btn,i){
  const q=IQ.q; if(IQ.locked||btn.disabled)return;
  if(i===q.ans){
    IQ.locked=true;btn.classList.add('ok');ding();confetti(btn);
    document.querySelectorAll('#iqOpts .opt').forEach(b=>b.disabled=true);
    S.iqPts+=10;S.stars++;pset('stars',S.stars);IQ.n++;saveIQ();iqDots();$('#starTotal').textContent=arDigits(S.stars);
    const done=IQ.n>=IQJ_PER;
    speak([pick([{say:g('شاطِر! +عَشَر نُقَط.','شاطْرَة! +عَشَر نُقَط.')},{say:'بْرافُو! إِجابَة ذَكِيَّة!'},{say:g('عاش يا ذَكِي!','عاش يا ذَكِيَّة!')}])]).then(()=>{
      if(IQ.q!==q||S.screen!=='iqq')return;
      if(done)iqLevelDone(); else iqNext(false);
    });
  }else{
    IQ.miss++;btn.classList.add('no');btn.disabled=true;boop();btn.classList.remove('shake');void btn.offsetWidth;btn.classList.add('shake');
    speak([pick([{say:g('قَرَّبْت! فَكَّر تانِي.','قَرَّبْتِي! فَكَّرِي تانِي.')},{say:g('لَأ يا حَبِيبِي، جَرَّب تانِي.','لَأ يا حَبِيبْتِي، جَرَّبِي تانِي.')}])]);
  }
}
function iqLevelDone(){
  const d=iqjLoad(),L=IQ.L,stars=IQ.miss===0?3:IQ.miss<=2?2:1;
  d.st[L]=Math.max(d.st[L]||0,stars);const was=d.lvl;if(L===d.lvl)d.lvl=Math.min(IQJ_LV,L+1);iqjSave(d);
  S.iqPts+=30;saveIQ();
  const bandDone=L===was&&(L+1)%5===0;
  // شاشة نجوم المستوى
  const ov=document.createElement('div');ov.className='iqdone';ov.innerHTML=`<div class="card"><p class="k">المستوى ${arDigits(L+1)}</p><div class="stars3">${[0,1,2].map(i=>`<span class="${i<stars?'on':''}" style="animation-delay:${.25+i*.3}s">★</span>`).join('')}</div><p class="m">${stars===3?'ممتاز! من غير ولا غلطة':stars===2?'شاطر جدًا!':'برافو! كمّل'}</p><button class="go">${bandDone?'استلم الجايزة 🎁':'يلا على اللي بعده ←'}</button></div>`;
  document.body.appendChild(ov);ding();setTimeout(()=>confetti(ov.querySelector('.stars3')),500);
  speak([{say:d.lvl>=IQJ_LV&&L===IQJ_LV-1?gs(IQ_SAY.all):gs(IQ_SAY.up)}]);
  ov.querySelector('.go').onclick=()=>{ov.remove();IQ.L=null;
    if(bandDone){iqStageDone();return}
    IQ.moveFrom=was<d.lvl?was:null;goIQ()};
}
$('#mLater').onclick=()=>{IQ.moveFrom=null;goIQ()};
