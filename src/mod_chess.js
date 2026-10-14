/* ---------- الشطرنج: يلعب مع الكمبيوتر، والصعوبة بتزيد مع كل فوز ---------- */
const CH={b:null,turn:'w',sel:-1,moves:[],hist:[],last:null,busy:false,over:false,lvl:1,ep:-1,cr:'KQkq'};
const CH_SAY={
 start:['يَلَّا نِلْعَب شَطَرَنْج! إِنْتَ الحَجَر الأَبْيَض، اِبْدَأ إِنْتَ.','يَلَّا نِلْعَب شَطَرَنْج! إِنْتِي الحَجَر الأَبْيَض، اِبْدَئِي إِنْتِي.'],
 how:['دُوس عَلَى الحَجَر، وِبَعْدِين دُوس عَلَى المَكان اللِّي عايِز تِرُوحُه.','دُوسِي عَلَى الحَجَر، وِبَعْدِين دُوسِي عَلَى المَكان اللِّي عايْزَة تِرُوحِيه.'],
 turn:'دُورَك!', check:'كِشّ!',
 win:['كِشّ مات! بْرافُو، كِسِبْت الكُمْبْيُوتَر!','كِشّ مات! بْرافُو، كِسِبْتِي الكُمْبْيُوتَر!'],
 lose:'الكُمْبْيُوتَر كِسِب المَرَّة دِي. يَلَّا نِحاوِل تانِي!', draw:'تَعادُل! ماحَدِّش كِسِب.',
 up:['طِلِعْت لِمُسْتَوَى أَصْعَب!','طِلِعْتِي لِمُسْتَوَى أَصْعَب!'],
 eat:['شاطِر! أَكَلْت حَجَر!','شاطْرَة! أَكَلْتِي حَجَر!']
};
const CH_V={p:100,n:320,b:330,r:500,q:900,k:0};
// جداول المواقع (من ناحية الأبيض، الصف ٠ = فوق)
const PST={
 p:[0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-20,-20,10,10,5,0,0,0,0,0,0,0,0],
 n:[-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,0,0,0,-20,-40,-30,0,10,15,15,10,0,-30,-30,5,15,20,20,15,5,-30,-30,0,15,20,20,15,0,-30,-30,5,10,15,15,10,5,-30,-40,-20,0,5,5,0,-20,-40,-50,-40,-30,-30,-30,-30,-40,-50],
 b:[-20,-10,-10,-10,-10,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,10,10,5,0,-10,-10,5,5,10,10,5,5,-10,-10,0,10,10,10,10,0,-10,-10,10,10,10,10,10,10,-10,-10,5,0,0,0,0,5,-10,-20,-10,-10,-10,-10,-10,-10,-20],
 r:[0,0,0,0,0,0,0,0,5,10,10,10,10,10,10,5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,0,0,0,5,5,0,0,0],
 q:[-20,-10,-10,-5,-5,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,5,5,5,0,-10,-5,0,5,5,5,5,0,-5,0,0,5,5,5,5,0,-5,-10,5,5,5,5,5,0,-10,-10,0,5,0,0,0,0,-10,-20,-10,-10,-5,-5,-10,-10,-20],
 k:[-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-20,-30,-30,-40,-40,-30,-30,-20,-10,-20,-20,-20,-20,-20,-20,-10,20,20,0,0,0,0,20,20,20,30,10,0,0,10,30,20]};
const isW=p=>p&&p===p.toUpperCase(), colOf=p=>p?(isW(p)?'w':'b'):null;
function chInit(){CH.b=[...'rnbqkbnrpppppppp'+'.'.repeat(32)+'PPPPPPPPRNBQKBNR'].map(c=>c==='.'?null:c);CH.turn='w';CH.ep=-1;CH.cr='KQkq';CH.sel=-1;CH.hist=[];CH.last=null;CH.over=false;CH.won=false;CH.busy=false;CH.hint=null;CH.cap={w:[],b:[]}}
function chAttacked(b,sq,by){ // هل المربع ده متهاجم من اللون by
  const r=sq>>3,c=sq&7;
  const pd=by==='w'?1:-1; for(const dc of[-1,1]){const rr=r+pd,cc=c+dc;if(rr>=0&&rr<8&&cc>=0&&cc<8){const p=b[rr*8+cc];if(p&&colOf(p)===by&&p.toLowerCase()==='p')return true}}
  for(const[dr,dc]of[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]){const rr=r+dr,cc=c+dc;if(rr>=0&&rr<8&&cc>=0&&cc<8){const p=b[rr*8+cc];if(p&&colOf(p)===by&&p.toLowerCase()==='n')return true}}
  for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let rr=r+dr,cc=c+dc,first=true;while(rr>=0&&rr<8&&cc>=0&&cc<8){const p=b[rr*8+cc];if(p){if(colOf(p)===by){const t=p.toLowerCase(),diag=dr&&dc;if(t==='q'||(t==='r'&&!diag)||(t==='b'&&diag)||(t==='k'&&first))return true}break}rr+=dr;cc+=dc;first=false}}
  return false;
}
function chPseudo(st,col){
  const b=st.b,mv=[],R=(f,t,pr)=>mv.push({f,t,pr});
  for(let s=0;s<64;s++){const p=b[s];if(!p||colOf(p)!==col)continue;const t=p.toLowerCase(),r=s>>3,c=s&7;
    if(t==='p'){const d=col==='w'?-1:1,start=col==='w'?6:1,last=col==='w'?0:7,one=s+d*8;
      if(r+d>=0&&r+d<8&&!b[one]){if(r+d===last)R(s,one,'q');else{R(s,one);if(r===start&&!b[one+d*8])R(s,one+d*8)}}
      for(const dc of[-1,1]){const cc=c+dc;if(cc<0||cc>7)continue;const tt=(r+d)*8+cc;if(r+d<0||r+d>7)continue;if((b[tt]&&colOf(b[tt])!==col)||tt===st.ep)R(s,tt,r+d===last?'q':undefined)}}
    else if(t==='n'||t==='k'){const ds=t==='n'?[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
      for(const[dr,dc]of ds){const rr=r+dr,cc=c+dc;if(rr<0||rr>7||cc<0||cc>7)continue;const tt=rr*8+cc;if(!b[tt]||colOf(b[tt])!==col)R(s,tt)}
      if(t==='k'){const opp=col==='w'?'b':'w',row=col==='w'?7:0;if(s===row*8+4&&!chAttacked(b,s,opp)){
        if(st.cr.includes(col==='w'?'K':'k')&&!b[s+1]&&!b[s+2]&&b[s+3]&&b[s+3].toLowerCase()==='r'&&!chAttacked(b,s+1,opp)&&!chAttacked(b,s+2,opp))R(s,s+2,'c');
        if(st.cr.includes(col==='w'?'Q':'q')&&!b[s-1]&&!b[s-2]&&!b[s-3]&&b[s-4]&&b[s-4].toLowerCase()==='r'&&!chAttacked(b,s-1,opp)&&!chAttacked(b,s-2,opp))R(s,s-2,'c')}}}
    else{const ds=t==='b'?[[1,1],[1,-1],[-1,1],[-1,-1]]:t==='r'?[[1,0],[-1,0],[0,1],[0,-1]]:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
      for(const[dr,dc]of ds){let rr=r+dr,cc=c+dc;while(rr>=0&&rr<8&&cc>=0&&cc<8){const tt=rr*8+cc;if(b[tt]){if(colOf(b[tt])!==col)R(s,tt);break}R(s,tt);rr+=dr;cc+=dc}}}}
  return mv;
}
function chApply(st,m){ // يرجّع حالة جديدة
  const b=st.b.slice(),p=b[m.f],t=p.toLowerCase(),col=colOf(p);let ep=-1,cr=st.cr,cap=b[m.t];
  if(t==='p'&&m.t===st.ep&&!b[m.t]){const cs=m.t+(col==='w'?8:-8);cap=b[cs];b[cs]=null}
  b[m.t]=m.pr==='q'?(col==='w'?'Q':'q'):p;b[m.f]=null;
  if(t==='p'&&Math.abs(m.t-m.f)===16)ep=(m.t+m.f)/2;
  if(m.pr==='c'){if(m.t>m.f){b[m.f+1]=b[m.f+3];b[m.f+3]=null}else{b[m.f-1]=b[m.f-4];b[m.f-4]=null}}
  if(t==='k')cr=cr.replace(col==='w'?/[KQ]/g:/[kq]/g,'');
  const rk={63:'K',56:'Q',7:'k',0:'q'};for(const sq of[m.f,m.t])if(rk[sq])cr=cr.replace(rk[sq],'');
  return{b,ep,cr,cap};
}
function chKing(b,col){const k=col==='w'?'K':'k';return b.indexOf(k)}
function chLegal(st,col){const opp=col==='w'?'b':'w';return chPseudo(st,col).filter(m=>{const n=chApply(st,m);return !chAttacked(n.b,chKing(n.b,col),opp)})}
function chEval(b){let s=0;for(let i=0;i<64;i++){const p=b[i];if(!p)continue;const t=p.toLowerCase();const v=CH_V[t]+(isW(p)?PST[t][i]:PST[t][(7-(i>>3))*8+(i&7)]);s+=isW(p)?v:-v}return s}
let CH_NODES=0,CH_END=0;
function chSearch(st,col,depth,alpha,beta,q){
  CH_NODES++;
  if((CH_NODES&255)===0&&Date.now()>CH_END)depth=Math.min(depth,0),q=false;
  const opp=col==='w'?'b':'w',sign=col==='w'?1:-1;
  if(depth<=0){const stand=sign*chEval(st.b);if(!q)return stand;if(stand>=beta)return stand;if(stand>alpha)alpha=stand;
    const caps=chPseudo(st,col).filter(m=>st.b[m.t]);caps.sort((a,b)=>CH_V[st.b[b.t].toLowerCase()]-CH_V[st.b[a.t].toLowerCase()]);
    for(const m of caps){const n=chApply(st,m);if(chAttacked(n.b,chKing(n.b,col),opp))continue;const v=-chSearch(n,opp,0,-beta,-alpha,q);if(v>=beta)return v;if(v>alpha)alpha=v;if(CH_NODES>60000)break}return alpha}
  const ms=chLegal(st,col);
  if(!ms.length)return chAttacked(st.b,chKing(st.b,col),opp)?-100000-depth:0;
  ms.sort((a,b)=>(st.b[b.t]?CH_V[st.b[b.t].toLowerCase()]:0)-(st.b[a.t]?CH_V[st.b[a.t].toLowerCase()]:0));
  let best=-Infinity;
  for(const m of ms){const v=-chSearch(chApply(st,m),opp,depth-1,-beta,-alpha,q);if(v>best)best=v;if(v>alpha)alpha=v;if(alpha>=beta)break}
  return best;
}
function chBest(st,col,lvl){
  const ms=chLegal(st,col);if(!ms.length)return null;
  const cfg=[null,{d:0,rnd:1},{d:1,rnd:.6},{d:1,rnd:.25},{d:2,rnd:.25},{d:2,rnd:.1},{d:2,rnd:0,q:1},{d:3,rnd:.05},{d:3,rnd:0,q:1},{d:4,rnd:0},{d:4,rnd:0,q:1}][Math.min(10,lvl)];
  if(Math.random()<cfg.rnd||cfg.d===0)return pick(ms);
  CH_NODES=0;CH_END=Date.now()+900;const opp=col==='w'?'b':'w';let scored=[],al=-Infinity;
  ms.sort((a,b)=>(st.b[b.t]?CH_V[st.b[b.t].toLowerCase()]:0)-(st.b[a.t]?CH_V[st.b[a.t].toLowerCase()]:0));
  for(const m of ms){const v=-chSearch(chApply(st,m),opp,cfg.d-1,-Infinity,-(al-40),!!cfg.q);if(v>al)al=v;scored.push([m,v+Math.random()*6])}
  scored.sort((a,b)=>b[1]-a[1]);
  if(lvl<=4&&scored.length>2&&Math.random()<.3)return scored[1][0];
  return scored[0][0];
}
// ---------- الواجهة ----------
const CH_G={k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
function chOpen(){
  if(!$('#sChess')){const s=document.createElement('section');s.className='screen';s.id='sChess';s.hidden=true;
    s.innerHTML=`<div class="ch-top"><span class="ch-lvl" id="chLvl"></span><span class="ch-st" id="chSt"></span></div>
      <div class="ch-caps" id="chCapB"></div><div class="ch-wrap"><div class="ch-board" id="chBoard"></div></div><div class="ch-caps" id="chCapW"></div>
      <div class="row ch-btns"><button class="btn2 c-sky" id="chUndo">↩️ ارجع خطوة</button><button class="btn2 c-sun" id="chHint">💡 ساعدني</button><button class="btn2 c-coral" id="chNew">🔄 جديد</button></div>
      <p class="ch-note">كل ما تكسب الكمبيوتر، المستوى يصعب. الكمبيوتر بيلعب بالأسود.</p>`;
    $('#main').appendChild(s);SCREENS.chess='#sChess';
    $('#chUndo').onclick=()=>{if(CH.busy||CH.won||CH.hist.length<1)return;const h=CH.hist.pop();Object.assign(CH,h);CH.over=false;CH.sel=-1;chDraw()};
    $('#chHint').onclick=()=>{if(CH.busy||CH.over||CH.turn!=='w')return;const m=chBest({b:CH.b,ep:CH.ep,cr:CH.cr},'w',5);if(m){CH.hint=m;chDraw();setTimeout(()=>{CH.hint=null;chDraw()},2200)}};
    $('#chNew').onclick=()=>{chInit();chDraw();speak([{say:CH_SAY.turn}])};
  }
  CH.lvl=pget('chLvl',1);chInit();show('chess');chDraw();
  speak([{say:gs(CH_SAY.start)},{say:gs(CH_SAY.how)}]);
}
function chDraw(){
  const bd=$('#chBoard');let h='';const legal=CH.sel>=0?chLegal({b:CH.b,ep:CH.ep,cr:CH.cr},'w').filter(m=>m.f===CH.sel):[];
  const chk=['w','b'].map(c=>chAttacked(CH.b,chKing(CH.b,c),c==='w'?'b':'w')?chKing(CH.b,c):-1);
  for(let i=0;i<64;i++){const r=i>>3,c=i&7,p=CH.b[i],dark=(r+c)%2===1;
    const cls=['sq',dark?'d':'l'];if(i===CH.sel)cls.push('sel');if(CH.last&&(i===CH.last.f||i===CH.last.t))cls.push('last');if(chk.includes(i))cls.push('chk');
    if(CH.hint&&(i===CH.hint.f||i===CH.hint.t))cls.push('hint');
    const tg=legal.find(m=>m.t===i);if(tg)cls.push(p?'cap':'mv');
    h+=`<div class="${cls.join(' ')}" data-i="${i}">${p?`<span class="pc ${isW(p)?'w':'b'}${CH.last&&CH.last.t===i?' moved':''}">${CH_G[p.toLowerCase()]}</span>`:''}${c===0?`<i class="rk">${8-r}</i>`:''}${r===7?`<i class="fl">${'abcdefgh'[c]}</i>`:''}</div>`}
  bd.innerHTML=h;bd.querySelectorAll('.sq').forEach(e=>e.onclick=()=>chTap(+e.dataset.i));
  $('#chLvl').textContent=`المستوى ${arDigits(CH.lvl)} من ١٠`;
  $('#chSt').textContent=CH.over?CH.over:CH.turn==='w'?'دورك ♙':'الكمبيوتر بيفكر… 🤔';
  $('#chCapW').innerHTML=CH.cap.w.map(p=>`<span class="b">${CH_G[p]}</span>`).join('');$('#chCapB').innerHTML=CH.cap.b.map(p=>`<span class="w">${CH_G[p]}</span>`).join('');
}
function chTap(i){
  if(CH.busy||CH.over||CH.turn!=='w')return;
  const p=CH.b[i];
  if(CH.sel>=0){const m=chLegal({b:CH.b,ep:CH.ep,cr:CH.cr},'w').find(m=>m.f===CH.sel&&m.t===i);
    if(m){chDo(m);return}}
  if(p&&isW(p)){CH.sel=i;tone([660],'sine',.05)}else CH.sel=-1;
  chDraw();
}
function chDo(m){
  CH.hist.push({b:CH.b,ep:CH.ep,cr:CH.cr,turn:'w',last:CH.last,cap:{w:CH.cap.w.slice(),b:CH.cap.b.slice()}});
  const col=colOf(CH.b[m.f]);const n=chApply({b:CH.b,ep:CH.ep,cr:CH.cr},m);
  if(n.cap)CH.cap[col].push(n.cap.toLowerCase());
  CH.b=n.b;CH.ep=n.ep;CH.cr=n.cr;CH.last=m;CH.sel=-1;CH.turn=col==='w'?'b':'w';
  tone(n.cap?[300,200]:[440],'triangle',.06);
  if(n.cap&&col==='w'&&Math.random()<.5)speak([{say:gs(CH_SAY.eat)}],false);
  chDraw();
  if(chCheckEnd())return;
  if(chAttacked(CH.b,chKing(CH.b,CH.turn),col))speak([{say:CH_SAY.check}],false);
  if(CH.turn==='b'){CH.busy=true;chDraw();setTimeout(()=>{const mv=chBest({b:CH.b,ep:CH.ep,cr:CH.cr},'b',CH.lvl);CH.busy=false;if(mv){const h=CH.hist.length;chDo(mv);CH.hist.length=h}},450)}
}
function chCheckEnd(){
  const col=CH.turn,ms=chLegal({b:CH.b,ep:CH.ep,cr:CH.cr},col);
  const left=CH.b.filter(Boolean).map(p=>p.toLowerCase()).sort().join('');
  if(ms.length&&left!=='kk')return false;
  const inChk=chAttacked(CH.b,chKing(CH.b,col),col==='w'?'b':'w');
  if(!ms.length&&inChk&&col==='b'){CH.over='كش مات! كسبت 🏆';CH.won=true;chDraw();ding();confetti($('#chBoard'));const up=CH.lvl<10;if(up){CH.lvl++;pset('chLvl',CH.lvl)}
    S.stars+=3;pset('stars',S.stars);$('#starTotal').textContent=arDigits(S.stars);speak([{say:gs(CH_SAY.win)},...(up?[{say:gs(CH_SAY.up)}]:[])]);chDraw();return true}
  if(!ms.length&&inChk){CH.over='الكمبيوتر كسب، حاول تاني 💪';boop();speak([{say:CH_SAY.lose}]);chDraw();return true}
  CH.over='تعادل 🤝';speak([{say:CH_SAY.draw}]);chDraw();return true;
}
