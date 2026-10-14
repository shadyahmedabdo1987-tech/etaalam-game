
/* ---------- بلوك بلاست: حط الأشكال في الشبكة وكمّل صفوف وعمدان ---------- */
const BB_N=8;
const BB_COL=['#FF5A5F','#FF9F1C','#FFD23F','#3FD08A','#2F8FE6','#9B4DE0','#FF5FA2','#11A893'];
const BB_SHAPES=[
 [[0,0]],[[0,0],[1,0]],[[0,0],[0,1]],[[0,0],[1,0],[2,0]],[[0,0],[0,1],[0,2]],
 [[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[2,0],[3,0],[4,0]],[[0,0],[0,1],[0,2],[0,3],[0,4]],
 [[0,0],[1,0],[0,1],[1,1]],[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]],
 [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]],
 [[0,0],[0,1],[1,1]],[[1,0],[0,1],[1,1]],[[0,0],[1,0],[0,1]],[[0,0],[1,0],[1,1]],
 [[0,0],[0,1],[0,2],[1,2]],[[1,0],[1,1],[1,2],[0,2]],[[0,0],[1,0],[2,0],[0,1]],[[0,0],[1,0],[2,0],[2,1]],
 [[0,0],[1,0],[1,1],[1,2]],[[0,0],[1,0],[0,1],[0,2]],[[0,1],[1,1],[2,1],[2,0]],[[0,0],[0,1],[1,1],[2,1]],
 [[0,0],[1,0],[2,0],[1,1]],[[1,0],[0,1],[1,1],[2,1]],[[0,0],[0,1],[0,2],[1,1]],[[1,0],[1,1],[1,2],[0,1]],
 [[0,0],[1,0],[1,1],[2,1]],[[1,0],[2,0],[0,1],[1,1]],[[0,0],[0,1],[1,1],[1,2]],[[1,0],[1,1],[0,1],[0,2]],
 [[0,0],[1,1]],[[1,0],[0,1]],[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]]
];
const BB_W=[6,6,6,6,6,4,4,2,2,6,2,3,3,4,4,4,4,3,3,3,3,3,3,3,3,4,4,4,4,3,3,3,3,3,3,2,2];
const BB_SAY={
 start:['يَلَّا نِلْعَب المُكَعَّبات! اِسْحَب الشَّكْل وِحُطُّه فِي المُرَبَّعات، وِكَمِّل صَفّ أَوْ عامُود عَشان يِتْمِسِح.','يَلَّا نِلْعَب المُكَعَّبات! اِسْحَبِي الشَّكْل وِحُطِّيه فِي المُرَبَّعات، وِكَمِّلِي صَفّ أَوْ عامُود عَشان يِتْمِسِح.'],
 back:['أَهْلاً بِيك تانِي! كَمِّل اللِّعْبَة مِن مَطْرَح ما وَقَّفْت.','أَهْلاً بِيكِي تانِي! كَمِّلِي اللِّعْبَة مِن مَطْرَح ما وَقَّفْتِي.'],
 clear:['جامِد!','رائِع!','هايِل!'],
 combo:['كُومْبُو! اِسْتَمِرّ كِدَه!','كُومْبُو! اِسْتَمِرِّي كِدَه!'],
 over:'خَلَصِت الأَماكِن! يَلَّا نِبْدَأ لِعْبَة جِدِيدَة.',
 best:['بْرافُو! جِبْت أَحْسَن سْكُور جِدِيد!','بْرافُو! جِبْتِي أَحْسَن سْكُور جِدِيد!']
};
const BB={g:null,tray:[],score:0,best:0,combo:0,drag:null,over:false};
function bbSave(){pset('bb',{g:BB.g,tray:BB.tray,score:BB.score,combo:BB.combo,over:BB.over});pset('bbBest',BB.best)}
function bbPiece(){
  // الأشكال الصغيرة أكتر لما الشبكة تتملي، عشان الطفل ما يقفلش بسرعة
  const fill=BB.g?BB.g.flat().filter(Boolean).length/(BB_N*BB_N):0;
  let tot=0;const w=BB_SHAPES.map((s,i)=>{const v=BB_W[i]*(fill>.55&&s.length>4?.4:1);tot+=v;return v});
  let r=Math.random()*tot,i=0;for(;i<w.length;i++){r-=w[i];if(r<=0)break}
  return {s:BB_SHAPES[Math.min(i,BB_SHAPES.length-1)],c:Math.floor(Math.random()*BB_COL.length)};
}
function bbFits(p,x,y){return p.s.every(([dx,dy])=>{const X=x+dx,Y=y+dy;return X>=0&&Y>=0&&X<BB_N&&Y<BB_N&&!BB.g[Y][X]})}
function bbCanAny(p){for(let y=0;y<BB_N;y++)for(let x=0;x<BB_N;x++)if(bbFits(p,x,y))return true;return false}
function bbNewTray(){
  // نضمن إن فيه شكل واحد على الأقل يدخل
  let t;for(let k=0;k<30;k++){t=[bbPiece(),bbPiece(),bbPiece()];if(t.some(bbCanAny))break}
  BB.tray=t;
}
function bbNew(){BB.g=Array.from({length:BB_N},()=>Array(BB_N).fill(0));BB.score=0;BB.combo=0;BB.over=false;bbNewTray();bbSave()}
function bbOpen(){
  if(!$('#sBlocks')){const s=document.createElement('section');s.className='screen';s.id='sBlocks';s.hidden=true;
    s.innerHTML=`<div class="bb-top"><div class="bb-sc"><small>السكور</small><b id="bbScore">٠</b></div><div class="bb-sc best"><small>👑 أحسن سكور</small><b id="bbBest">٠</b></div></div>
      <div class="bb-wrap"><div class="bb-grid" id="bbGrid"></div><div class="bb-combo" id="bbCombo"></div></div>
      <div class="bb-tray" id="bbTray"></div>
      <div class="row bb-btns"><button class="btn2 c-coral" id="bbRestart">🔄 لعبة جديدة</button></div>
      <div class="bb-over" id="bbOver" hidden><div class="card"><p class="t">خلصت الأماكن!</p><p class="s" id="bbOverS"></p><button class="go" id="bbAgain">🔄 العب تاني</button></div></div>`;
    $('#main').appendChild(s);SCREENS.blocks='#sBlocks';
    $('#bbRestart').onclick=()=>{bbNew();bbDraw();tone([523,659],'sine',.06)};
    $('#bbAgain').onclick=()=>{$('#bbOver').hidden=true;bbNew();bbDraw()};
  }
  BB.best=pget('bbBest',0);const sv=pget('bb',null);
  const resume=sv&&sv.g&&!sv.over&&sv.g.flat().some(Boolean);
  if(resume)Object.assign(BB,sv);else bbNew();
  $('#bbOver').hidden=true;show('blocks');bbDraw();
  speak([{say:gs(resume?BB_SAY.back:BB_SAY.start)}]);
}
function bbCellPx(){const g=$('#bbGrid');return g.getBoundingClientRect().width/BB_N}
function bbDraw(){
  const gr=$('#bbGrid');let h='';
  for(let y=0;y<BB_N;y++)for(let x=0;x<BB_N;x++){const v=BB.g[y][x];h+=`<i class="bb-c${v?' f':''}" data-x="${x}" data-y="${y}" style="${v?`--c:${BB_COL[v-1]}`:''}"></i>`}
  gr.innerHTML=h;
  $('#bbScore').textContent=arDigits(BB.score);$('#bbBest').textContent=arDigits(Math.max(BB.best,BB.score));
  const tr=$('#bbTray');tr.innerHTML='';
  BB.tray.forEach((p,i)=>{const d=document.createElement('div');d.className='bb-slot';
    if(p){const w=Math.max(...p.s.map(a=>a[0]))+1,hh=Math.max(...p.s.map(a=>a[1]))+1,can=bbCanAny(p);
      d.innerHTML=`<div class="bb-pc${can?'':' no'}" style="--w:${w};--h:${hh}">${p.s.map(([x,y])=>`<i style="grid-column:${x+1};grid-row:${y+1};--c:${BB_COL[p.c]}"></i>`).join('')}</div>`;
      d.querySelector('.bb-pc').addEventListener('pointerdown',e=>bbDragStart(e,i))}
    tr.appendChild(d)});
}
function bbDragStart(e,i){
  if(BB.over)return;e.preventDefault();const p=BB.tray[i];if(!p)return;
  const cs=bbCellPx(),w=Math.max(...p.s.map(a=>a[0]))+1,h=Math.max(...p.s.map(a=>a[1]))+1;
  const gh=document.createElement('div');gh.className='bb-ghost';gh.style.cssText=`--cs:${cs}px;width:${w*cs}px;height:${h*cs}px`;
  gh.innerHTML=p.s.map(([x,y])=>`<i style="left:${x*cs}px;top:${y*cs}px;--c:${BB_COL[p.c]}"></i>`).join('');
  document.body.appendChild(gh);
  BB.drag={i,p,gh,w,h,cs,x:-1,y:-1,lift:Math.max(cs*1.6,60)};
  e.target.closest('.bb-slot').classList.add('drag');tone([440],'sine',.04);
  bbDragMove(e);
  const mv=ev=>bbDragMove(ev),up=ev=>{window.removeEventListener('pointermove',mv);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',up);bbDragEnd()};
  window.addEventListener('pointermove',mv);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',up);
}
function bbDragMove(e){
  const D=BB.drag;if(!D)return;
  const left=e.clientX-D.w*D.cs/2, top=e.clientY-D.h*D.cs-D.lift*.35;
  D.gh.style.transform=`translate(${left}px,${top}px)`;
  const r=$('#bbGrid').getBoundingClientRect(),cs=r.width/BB_N;
  const gx=Math.round((left-r.left)/cs),gy=Math.round((top-r.top)/cs);
  document.querySelectorAll('.bb-c.pv,.bb-c.pvno,.bb-c.clr').forEach(c=>c.classList.remove('pv','pvno','clr'));
  if(gx>-D.w&&gy>-D.h&&gx<BB_N&&gy<BB_N&&bbFits(D.p,gx,gy)){
    D.x=gx;D.y=gy;
    D.p.s.forEach(([dx,dy])=>{const c=document.querySelector(`.bb-c[data-x="${gx+dx}"][data-y="${gy+dy}"]`);if(c){c.classList.add('pv');c.style.setProperty('--pc',BB_COL[D.p.c])}});
    // نوري الصفوف اللي هتتمسح
    const tmp=BB.g.map(r=>r.slice());D.p.s.forEach(([dx,dy])=>tmp[gy+dy][gx+dx]=1);
    const {rows,cols}=bbFull(tmp);rows.forEach(y=>{for(let x=0;x<BB_N;x++)document.querySelector(`.bb-c[data-x="${x}"][data-y="${y}"]`).classList.add('clr')});cols.forEach(x=>{for(let y=0;y<BB_N;y++)document.querySelector(`.bb-c[data-x="${x}"][data-y="${y}"]`).classList.add('clr')});
  }else{D.x=-1;D.y=-1}
}
function bbFull(g){const rows=[],cols=[];for(let y=0;y<BB_N;y++)if(g[y].every(Boolean))rows.push(y);for(let x=0;x<BB_N;x++)if(g.every(r=>r[x]))cols.push(x);return{rows,cols}}
function bbDragEnd(){
  const D=BB.drag;BB.drag=null;if(!D)return;D.gh.remove();
  document.querySelectorAll('.bb-slot.drag').forEach(s=>s.classList.remove('drag'));
  if(D.x<0){bbDraw();return}
  BB.tray[D.i]=null;D.p.s.forEach(([dx,dy])=>BB.g[D.y+dy][D.x+dx]=D.p.c+1);
  BB.score+=D.p.s.length;tone([392,523],'triangle',.05);
  const {rows,cols}=bbFull(BB.g),n=rows.length+cols.length;
  if(n){
    BB.combo++;const pts=n*10*BB_N/8*(n>1?n:1)+(BB.combo>1?BB.combo*10:0);BB.score+=Math.round(pts);
    bbDraw();
    const cells=new Set();rows.forEach(y=>{for(let x=0;x<BB_N;x++)cells.add(x+','+y)});cols.forEach(x=>{for(let y=0;y<BB_N;y++)cells.add(x+','+y)});
    cells.forEach(k=>{const[x,y]=k.split(',');const c=document.querySelector(`.bb-c[data-x="${x}"][data-y="${y}"]`);if(c){c.classList.add('pop');c.style.animationDelay=(Math.abs(x-D.x)+Math.abs(y-D.y))*25+'ms'}});
    cells.forEach(k=>{const[x,y]=k.split(',').map(Number);BB.g[y][x]=0});
    ding();const cb=$('#bbCombo');cb.textContent=BB.combo>1?`كومبو ×${arDigits(BB.combo)}`:n>1?`${arDigits(n)} خطوط!`:'رائع!';cb.classList.remove('on');void cb.offsetWidth;cb.classList.add('on');
    if(BB.combo>1&&BB.combo%2===0)speak([{say:gs(BB_SAY.combo)}],false);else if(n>1||Math.random()<.4)speak([{say:pick(BB_SAY.clear)}],false);
    setTimeout(bbAfter,420);
  }else{BB.combo=0;bbAfter()}
}
function bbAfter(){
  if(BB.tray.every(p=>!p))bbNewTray();
  const isBest=BB.score>BB.best;if(isBest)BB.best=BB.score;
  BB.over=!BB.tray.some(p=>p&&bbCanAny(p));
  bbSave();bbDraw();
  if(BB.over){
    $('#bbOverS').innerHTML=`السكور: <b>${arDigits(BB.score)}</b><br>👑 أحسن سكور: ${arDigits(BB.best)}`;
    setTimeout(()=>{$('#bbOver').hidden=false;boop();speak([{say:BB_SAY.over},...(BB.score>0&&BB.score>=BB.best?[{say:gs(BB_SAY.best)}]:[])])},500);
    if(BB.score>=BB.best&&BB.score>0){S.stars+=3;pset('stars',S.stars);$('#starTotal').textContent=arDigits(S.stars)}
  }
}
