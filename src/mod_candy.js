/* ---------- مملكة الحلويات: لعبة توصيل ٣ بمستويات وخريطة وحفظ ---------- */
/* ===== CC-MODEL: منطق اللعبة (من غير شاشة) ===== */
const CC_W=8,CC_H=8,CC_LV=100;
const ccRng=seed=>{let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}};
// أشكال الخريطة: "." خانة، " " فاضية
const CC_MASKS=[
 ['........','........','........','........','........','........','........','........'],
 [' ...... ','........','........','........','........','........','........',' ...... '],
 ['  ....  ',' ...... ','........','........','........','........',' ...... ','  ....  '],
 ['........','........','........','...  ...','...  ...','........','........','........'],
 ['  ....  ','  ....  ','........','........','........','........','  ....  ','  ....  '],
 ['........','........',' ...... ','  ....  ','  ....  ',' ...... ','........','........'],
 ['........','........','........','.. .. ..','.. .. ..','........','........','........'],
 ['.... ...','.... ...','........','........','........','........','... ....','... ....']
];
function ccLevel(n,ov){
  if(ov===undefined)ov=(typeof CC_TUNE!=='undefined'&&CC_TUNE[n-1])||null;
  const R=ccRng(n*7919+13),ri=(a,b)=>a+Math.floor(R()*(b-a+1));
  let L;
  if(n===1)L={moves:16,colors:4,goal:{k:'score',n:1200},mask:0};
  else if(n===2)L={moves:18,colors:4,goal:{k:'collect',items:[[0,14],[3,14]]},mask:0};
  else if(n===3)L={moves:20,colors:5,goal:{k:'jelly'},mask:0,jelly:'c4'};
  else if(n===4)L={moves:18,colors:5,goal:{k:'score',n:2600},mask:1};
  else if(n===5)L={moves:20,colors:5,goal:{k:'crate'},mask:0,crate:'row1'};
  else{
    const d=Math.min(1,(n-6)/90),kinds=['collect','jelly','score','crate','jelly','collect','crate','score','jelly','collect'];
    const k=kinds[(n-6)%kinds.length];
    const colors=n>=40&&n%4===0?6:5;
    const mask=n<10?ri(0,1):ri(0,CC_MASKS.length-1);
    const moves=Math.round(26-d*7+ri(-1,1)-(colors===6?-3:0));
    L={moves,colors,mask,goal:{k}};
    if(k==='score')L.goal.n=Math.round((moves*(150+d*70))/100)*100;
    if(k==='collect'){const c=ri(1,colors<6?2:2),items=[],used=new Set();
      const c2=n>20&&R()<.5?3:2;for(let i=0;i<c2;i++){let t;do t=ri(0,colors-1);while(used.has(t));used.add(t);items.push([t,Math.round((14+d*16+ri(-2,3))/(c2===3?1.3:1))])}
      L.goal.items=items}
    if(k==='jelly'){L.jelly=['c4','c6','full','rows','ring','x'][Math.min(5,Math.floor(d*4+R()*2.2))];L.jelly2=d>.45&&R()<.5}
    if(k==='crate'){L.crate=['row1','row2','box','cols','scatter'][Math.min(4,Math.floor(d*3+R()*2))];L.crate2=d>.4&&R()<.55}
    if(k!=='crate'&&n>25&&R()<.3)L.crate=L.crate||'scatter';
  }
  if(ov){if(ov.m)L.moves=ov.m;if(ov.j)L.jelly=ov.j;if(ov.j2===0)L.jelly2=false;if(ov.c)L.crate=ov.c;if(ov.c2===0)L.crate2=false;if(ov.g&&L.goal.k==='score')L.goal.n=ov.g;
    if(ov.f&&L.goal.k==='collect')L.goal.items=L.goal.items.map(([t,c],i)=>[t,ov.f[i]]);if(ov.s)L.stars=ov.s}
  L.n=n;return L;
}
function ccBuild(L,R){
  const B={W:CC_W,H:CC_H,mask:[],g:[],jelly:[],crate:[],colors:L.colors,score:0,moves:L.moves,goal:L.goal,col:{},id:1,L,R};
  const M=CC_MASKS[L.mask||0];
  for(let y=0;y<CC_H;y++){B.mask.push([]);B.g.push([]);B.jelly.push([]);B.crate.push([]);
    for(let x=0;x<CC_W;x++){B.mask[y][x]=M[y][x]==='.';B.g[y][x]=null;B.jelly[y][x]=0;B.crate[y][x]=0}}
  const J=L.jelly,lay=L.jelly2?2:1;
  if(J)for(let y=0;y<CC_H;y++)for(let x=0;x<CC_W;x++){if(!B.mask[y][x])continue;let on=false;
    if(J==='c4')on=x>=2&&x<=5&&y>=2&&y<=5;else if(J==='c6')on=x>=1&&x<=6&&y>=1&&y<=6;else if(J==='full')on=true;
    else if(J==='rows')on=y>=5;else if(J==='ring')on=x===0||y===0||x===7||y===7||x===1||y===1||x===6||y===6;else if(J==='x')on=x===y||x===7-y||Math.abs(x-y)===1||Math.abs(x+y-7)===1;
    if(on)B.jelly[y][x]=(J==='full'||J==='ring')&&lay===2&&(x+y)%2?2:lay}
  const C=L.crate,cl=L.crate2?2:1;
  if(C)for(let y=0;y<CC_H;y++)for(let x=0;x<CC_W;x++){if(!B.mask[y][x])continue;let on=false;
    if(C==='row1')on=y===4;else if(C==='row2')on=y===4||y===5&&(x===0||x===7||x===3||x===4);else if(C==='box')on=y>=3&&y<=4&&x>=2&&x<=5;
    else if(C==='cols')on=(x===2||x===5)&&y>=3&&y<=5;else if(C==='scatter')on=(y===5&&x%3===1)||(y===3&&x%3===2);
    if(on){B.crate[y][x]=cl;B.jelly[y][x]=0}}
  if(L.goal.k==='collect')L.goal.items.forEach(([t])=>B.col[t]=0);
  ccFillFresh(B);return B;
}
const ccIs=(B,x,y)=>x>=0&&y>=0&&x<B.W&&y<B.H&&B.mask[y][x];
const ccHold=(B,x,y)=>ccIs(B,x,y)&&!B.crate[y][x];
const ccNew=(B,t,sp)=>({id:B.id++,t,sp:sp||null});
function ccRandT(B,x,y){
  for(let k=0;k<30;k++){const t=Math.floor(B.R()*B.colors);
    const a=x>=2&&ccT(B,x-1,y)===t&&ccT(B,x-2,y)===t, b=y>=2&&ccT(B,x,y-1)===t&&ccT(B,x,y-2)===t;
    if(!a&&!b)return t}
  return Math.floor(B.R()*B.colors);
}
const ccT=(B,x,y)=>{const c=ccIs(B,x,y)&&B.g[y][x];return c&&c.sp!=='b'&&c.sp!=='used'?c.t:-1};
function ccFillFresh(B){
  for(let tries=0;tries<60;tries++){
    for(let y=0;y<B.H;y++)for(let x=0;x<B.W;x++)B.g[y][x]=ccHold(B,x,y)?ccNew(B,ccRandT(B,x,y)):null;
    if(ccMoves(B).length>=3)return;
  }
}
function ccRuns(B){
  const runs=[];
  for(let y=0;y<B.H;y++){let x=0;while(x<B.W){const t=ccT(B,x,y);if(t<0){x++;continue}let e=x+1;while(e<B.W&&ccT(B,e,y)===t)e++;if(e-x>=3){const c=[];for(let i=x;i<e;i++)c.push([i,y]);runs.push({d:'h',c})}x=e}}
  for(let x=0;x<B.W;x++){let y=0;while(y<B.H){const t=ccT(B,x,y);if(t<0){y++;continue}let e=y+1;while(e<B.H&&ccT(B,x,e)===t)e++;if(e-y>=3){const c=[];for(let i=y;i<e;i++)c.push([x,i]);runs.push({d:'v',c})}y=e}}
  return runs;
}
function ccGroups(B){
  const runs=ccRuns(B),groups=[];const key=([x,y])=>y*16+x;
  runs.forEach(r=>{const ks=new Set(r.c.map(key));const hit=groups.filter(g=>[...ks].some(k=>g.ks.has(k)));
    const ng={ks:new Set(ks),runs:[r]};hit.forEach(g=>{g.ks.forEach(k=>ng.ks.add(k));ng.runs.push(...g.runs);groups.splice(groups.indexOf(g),1)});groups.push(ng)});
  return groups;
}
function ccMoves(B){
  const out=[];
  for(let y=0;y<B.H;y++)for(let x=0;x<B.W;x++){const a=B.g[y][x];if(!a)continue;
    for(const[dx,dy]of[[1,0],[0,1]]){const X=x+dx,Y=y+dy;if(!ccHold(B,X,Y))continue;const b=B.g[Y][X];if(!b)continue;
      if(a.sp==='b'||b.sp==='b'||(a.sp&&b.sp)){out.push([x,y,X,Y]);continue}
      B.g[y][x]=b;B.g[Y][X]=a;const ok=ccLineAt(B,x,y)||ccLineAt(B,X,Y);B.g[y][x]=a;B.g[Y][X]=b;if(ok)out.push([x,y,X,Y])}}
  return out;
}
function ccLineAt(B,x,y){const t=ccT(B,x,y);if(t<0)return false;
  let a=x,b=x;while(ccT(B,a-1,y)===t)a--;while(ccT(B,b+1,y)===t)b++;if(b-a>=2)return true;
  a=y;b=y;while(ccT(B,x,a-1)===t)a--;while(ccT(B,x,b+1)===t)b++;return b-a>=2}
const ccKey=(x,y)=>y*16+x, ccXY=k=>[k%16,k>>4];
// يمسح خانات ويشغّل الحلويات المميزة اللي فيها بالتسلسل
function ccClear(B,keys,ph,opts){
  opts=opts||{};const clear=new Set(keys),q=[...keys],blasts=[],seen=new Set();
  while(q.length){const k=q.shift();const[x,y]=ccXY(k);const c=B.g[y]&&B.g[y][x];if(!c||!c.sp||c.sp==='used'||seen.has(c.id)||(opts.keep&&opts.keep.has(c.id)))continue;seen.add(c.id);
    let add=[];
    if(c.sp==='h')for(let i=0;i<B.W;i++)add.push([i,y]);
    else if(c.sp==='v')for(let i=0;i<B.H;i++)add.push([x,i]);
    else if(c.sp==='w')for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)add.push([x+i,y+j]);
    else if(c.sp==='b'){const cnt={};B.g.forEach(r=>r.forEach(o=>{if(o&&o.sp!=='b')cnt[o.t]=(cnt[o.t]||0)+1}));let tt=-1,m=-1;for(const t in cnt)if(cnt[t]>m){m=cnt[t];tt=+t}
      for(let j=0;j<B.H;j++)for(let i=0;i<B.W;i++){const o=B.g[j][i];if(o&&o.t===tt&&o.sp!=='b')add.push([i,j])}}
    blasts.push({x,y,sp:c.sp,t:c.t});
    add.forEach(([i,j])=>{if(!ccIs(B,i,j))return;const kk=ccKey(i,j);if(B.crate[j][i]){clear.add(kk);return}if(!clear.has(kk)){clear.add(kk);q.push(kk)}})}
  return ccApply(B,clear,ph,blasts,opts);
}
function ccApply(B,clear,ph,blasts,opts){
  opts=opts||{};const cells=[],crateHit=new Set(),mult=Math.max(1,opts.casc||1);let pts=0;
  const creates=opts.creates||[],keepId=new Set(creates.map(c=>c.id));
  clear.forEach(k=>{const[x,y]=ccXY(k);
    if(B.crate[y][x]){if(!crateHit.has(k)){crateHit.add(k);B.crate[y][x]--;pts+=40;cells.push({x,y,crate:B.crate[y][x]})}return}
    const c=B.g[y][x];
    if(B.jelly[y][x]>0&&(c||opts.blast)){B.jelly[y][x]--;pts+=60}
    if(c&&!keepId.has(c.id)){if(B.col[c.t]!==undefined&&c.sp!=='b'&&c.sp!=='used')B.col[c.t]++;pts+=20*mult;cells.push({x,y,id:c.id,t:c.t,sp:c.sp,jelly:B.jelly[y][x]});B.g[y][x]=null}
    else if(c&&keepId.has(c.id))cells.push({x,y,jelly:B.jelly[y][x],stay:1})});
  // الصناديق اللي جنب خانات اتمسحت بتصليح
  if(!opts.noAdj){const adj=new Set();clear.forEach(k=>{const[x,y]=ccXY(k);if(B.crate[y]&&B.crate[y][x]!==undefined&&crateHit.has(k))return;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const X=x+dx,Y=y+dy;if(ccIs(B,X,Y)&&B.crate[Y][X]&&!crateHit.has(ccKey(X,Y)))adj.add(ccKey(X,Y))})});
    adj.forEach(k=>{const[x,y]=ccXY(k);B.crate[y][x]--;pts+=40;cells.push({x,y,crate:B.crate[y][x]})})}
  creates.forEach(c=>{const o=B.g[c.y][c.x];if(o&&o.id===c.id)o.sp=c.sp;pts+=c.sp==='b'?200:c.sp==='w'?120:60});
  B.score+=pts;
  ph.push({k:'clear',cells,creates:creates.map(c=>({x:c.x,y:c.y,id:c.id,sp:c.sp,t:B.g[c.y][c.x]?B.g[c.y][c.x].t:c.t})),blasts:blasts||[],pts,casc:opts.casc||1});
}
function ccGravity(B,ph){
  const from={},moved=[],spawns=[],colSpawn={};
  for(let guard=0;guard<200;guard++){let ch=false;
    for(let y=B.H-1;y>=0;y--)for(let x=0;x<B.W;x++){
      if(!ccHold(B,x,y)||B.g[y][x])continue;
      let yy=y-1;while(yy>=0&&ccIs(B,x,yy)&&!B.crate[yy][x]&&!B.g[yy][x])yy--;
      if(yy>=0&&ccHold(B,x,yy)&&B.g[yy][x]){const c=B.g[yy][x];if(!(c.id in from))from[c.id]=[x,yy];B.g[y][x]=c;B.g[yy][x]=null;ch=true;continue}
      let top=true;for(let j=yy;j>=0;j--)if(ccIs(B,x,j)){top=false;break}
      if(yy<0||top){colSpawn[x]=(colSpawn[x]||0)+1;const c=ccNew(B,Math.floor(B.R()*B.colors));B.g[y][x]=c;from[c.id]=[x,(yy<0?-1:yy)-colSpawn[x]+1-(yy<0?0:0)];spawns.push(c.id);ch=true;continue}
      for(const dx of[-1,1]){const X=x+dx,Y=y-1;if(!ccHold(B,X,Y)||!B.g[Y][X])continue;if(ccHold(B,X,y)&&!B.g[y][X])continue;
        const c=B.g[Y][X];if(!(c.id in from))from[c.id]=[X,Y];B.g[y][x]=c;B.g[Y][X]=null;ch=true;break}
    }
    if(!ch)break}
  // الحلويات الجديدة بتبدأ فوق العمود
  const cnt={};
  for(let y=B.H-1;y>=0;y--)for(let x=0;x<B.W;x++){const c=B.g[y][x];if(!c||!(c.id in from))continue;
    if(spawns.includes(c.id)){let top=0;while(top<B.H&&!ccIs(B,x,top))top++;cnt[x]=(cnt[x]||0)+1;moved.push({id:c.id,t:c.t,sp:c.sp,fx:x,fy:top-cnt[x],x,y,n:1})}
    else moved.push({id:c.id,fx:from[c.id][0],fy:from[c.id][1],x,y})}
  if(moved.length)ph.push({k:'fall',moved});
}
function ccSpecialFor(g,swap){
  const lens=g.runs.map(r=>r.c.length),hasH=g.runs.some(r=>r.d==='h'),hasV=g.runs.some(r=>r.d==='v');
  let sp=null;if(Math.max(...lens)>=5)sp='b';else if(hasH&&hasV)sp='w';else if(Math.max(...lens)===4)sp=g.runs[0].d==='h'?'v':'h';
  return sp;
}
function ccResolve(B,ph,swap){
  let casc=0;
  for(let guard=0;guard<60;guard++){
    const groups=ccGroups(B);if(!groups.length)break;casc++;
    const clear=new Set(),creates=[];
    groups.forEach(g=>{g.ks.forEach(k=>clear.add(k));const sp=ccSpecialFor(g,swap);if(!sp)return;
      let pos=null;const cand=[...g.ks];
      if(swap)for(const s of swap){const k=ccKey(s[0],s[1]);if(g.ks.has(k)){pos=k;break}}
      if(pos==null){if(sp==='w'){const hk=new Set(g.runs.filter(r=>r.d==='h').flatMap(r=>r.c.map(([x,y])=>ccKey(x,y))));pos=g.runs.filter(r=>r.d==='v').flatMap(r=>r.c.map(([x,y])=>ccKey(x,y))).find(k=>hk.has(k))}
        if(pos==null){const r=g.runs.reduce((a,b)=>b.c.length>a.c.length?b:a);const m=r.c[Math.floor((r.c.length-1)/2)];pos=ccKey(m[0],m[1])}}
      let[x,y]=ccXY(pos);let c=B.g[y][x];
      if(c&&c.sp){const alt=cand.find(k=>{const[a,b]=ccXY(k);const o=B.g[b][a];return o&&!o.sp});if(alt==null)return;[x,y]=ccXY(alt);c=B.g[y][x]}
      if(c&&!creates.some(o=>o.id===c.id))creates.push({x,y,id:c.id,sp,t:c.t})});
    const keep=new Set(creates.map(c=>c.id));
    ccClear(B,[...clear],ph,{creates,keep,casc});
    ccGravity(B,ph);swap=null;
  }
  return casc;
}
// تبديل حلويتين، بيرجّع مراحل الحركة أو null لو التبديل مش صح
function ccSwap(B,x1,y1,x2,y2){
  if(!ccHold(B,x1,y1)||!ccHold(B,x2,y2)||Math.abs(x1-x2)+Math.abs(y1-y2)!==1)return null;
  const a=B.g[y1][x1],b=B.g[y2][x2];if(!a||!b)return null;
  const ph=[{k:'swap',a:{id:a.id,x:x2,y:y2},b:{id:b.id,x:x1,y:y1}}];
  B.g[y1][x1]=b;B.g[y2][x2]=a;
  const sA=a.sp,sB=b.sp;let combo=false;
  if(sA==='b'||sB==='b'){combo=true;const bomb=sA==='b'?a:b,o=sA==='b'?b:a,bp=sA==='b'?[x2,y2]:[x1,y1],op=sA==='b'?[x1,y1]:[x2,y2];
    const keys=[ccKey(...bp)];
    if(o.sp==='b'){bomb.sp='used';o.sp='used';for(let y=0;y<B.H;y++)for(let x=0;x<B.W;x++)if(ccIs(B,x,y))keys.push(ccKey(x,y));
      ph.push({k:'beam',x:bp[0],y:bp[1],all:1});ccClear(B,keys,ph,{blast:1,casc:2})}
    else{const tt=o.t,conv=[];for(let y=0;y<B.H;y++)for(let x=0;x<B.W;x++){const c=B.g[y][x];if(c&&c.t===tt&&c.sp!=='b'){keys.push(ccKey(x,y));
        if(o.sp&&!c.sp){c.sp=o.sp==='w'?'w':(B.R()<.5?'h':'v');conv.push({id:c.id,sp:c.sp,t:c.t})}}}
      bomb.sp='used';ph.push({k:'beam',x:bp[0],y:bp[1],to:keys.slice(1).map(ccXY),conv});
      ccClear(B,keys,ph,{blast:1,casc:2})}
  }else if(sA&&sB){combo=true;const[cx,cy]=[x2,y2],keys=[];const ws=sA==='w'||sB==='w',both=sA==='w'&&sB==='w';
    if(both){for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++)keys.push(ccKey(cx+i,cy+j))}
    else if(ws){for(let j=-1;j<=1;j++){for(let i=0;i<B.W;i++)keys.push(ccKey(i,cy+j));for(let i=0;i<B.H;i++)keys.push(ccKey(cx+j,i))}}
    else{for(let i=0;i<B.W;i++)keys.push(ccKey(i,cy));for(let i=0;i<B.H;i++)keys.push(ccKey(cx,i))}
    a.sp=null;b.sp=null;
    ph.push({k:'combo',x:cx,y:cy,kind:both?'ww':ws?'sw':'ss'});
    ccClear(B,keys.filter(k=>{const[x,y]=ccXY(k);return ccIs(B,x,y)}),ph,{blast:1,casc:2})}
  else if(!ccLineAt(B,x1,y1)&&!ccLineAt(B,x2,y2)){B.g[y1][x1]=a;B.g[y2][x2]=b;return[{k:'swap',a:{id:a.id,x:x2,y:y2},b:{id:b.id,x:x1,y:y1}},{k:'swap',a:{id:a.id,x:x1,y:y1},b:{id:b.id,x:x2,y:y2},back:1}]}
  if(combo)ccGravity(B,ph);
  B.moves--;
  const casc=ccResolve(B,ph,combo?null:[[x1,y1],[x2,y2]]);
  ph.casc=casc+(combo?1:0);ph.combo=combo;
  return ph;
}
function ccGoalLeft(B){
  const G=B.goal;
  if(G.k==='score')return[{k:'score',left:Math.max(0,G.n-B.score),of:G.n}];
  if(G.k==='collect')return G.items.map(([t,n])=>({k:'t',t,left:Math.max(0,n-(B.col[t]||0)),of:n}));
  if(G.k==='jelly'){let s=0;B.jelly.forEach(r=>r.forEach(v=>s+=v));return[{k:'jelly',left:s}]}
  if(G.k==='crate'){let s=0;B.crate.forEach(r=>r.forEach(v=>s+=v));return[{k:'crate',left:s}]}
}
const ccWon=B=>ccGoalLeft(B).every(o=>o.left<=0);
function ccStarsFor(L){if(L.stars)return L.stars;const m=L.moves,base=L.goal.k==='score'?L.goal.n:Math.round(m*90/100)*100;
  return[base,Math.round(base*1.45/100)*100,Math.round(base*2/100)*100]}
function ccStarCount(B){const s=ccStarsFor(B.L);return B.score>=s[2]?3:B.score>=s[1]?2:1}
// خلط اللوحة لو مافيش حركات
function ccShuffle(B){
  const cs=[];B.g.forEach(r=>r.forEach(c=>{if(c)cs.push(c)}));
  for(let k=0;k<80;k++){for(let i=cs.length-1;i>0;i--){const j=Math.floor(B.R()*(i+1));[cs[i],cs[j]]=[cs[j],cs[i]]}
    let n=0;for(let y=0;y<B.H;y++)for(let x=0;x<B.W;x++)if(B.g[y][x])B.g[y][x]=cs[n++];
    if(!ccGroups(B).length&&ccMoves(B).length)return true}
  B.g.forEach((r,y)=>r.forEach((c,x)=>{if(c&&!c.sp)c.t=ccRandT(B,x,y)}));
  return ccMoves(B).length>0;
}
// لما المستوى يخلص: الحركات الباقية تتحوّل لحلويات مخططة وتنفجر
function ccBonus(B){
  const ph=[];let m=Math.min(B.moves,10);B.score+=B.moves*100;
  const cs=[];B.g.forEach((r,y)=>r.forEach((c,x)=>{if(c&&!c.sp)cs.push([x,y,c])}));
  for(let i=cs.length-1;i>0;i--){const j=Math.floor(B.R()*(i+1));[cs[i],cs[j]]=[cs[j],cs[i]]}
  const pick=cs.slice(0,m);if(!pick.length)return ph;
  pick.forEach(([x,y,c])=>c.sp=B.R()<.5?'h':'v');
  ph.push({k:'conv',list:pick.map(([x,y,c])=>({id:c.id,sp:c.sp,t:c.t}))});
  B.moves=0;
  ccClear(B,pick.map(([x,y])=>ccKey(x,y)),ph,{blast:1,casc:3});ccGravity(B,ph);ccResolve(B,ph,null);
  // أي حلويات مميزة فاضلة تتفجّر كمان
  for(let k=0;k<4;k++){const sp=[];B.g.forEach((r,y)=>r.forEach((c,x)=>{if(c&&c.sp&&c.sp!=='used')sp.push(ccKey(x,y))}));if(!sp.length)break;ccClear(B,sp,ph,{blast:1,casc:3});ccGravity(B,ph);ccResolve(B,ph,null)}
  return ph;
}
function ccSerialize(B){return{g:B.g.map(r=>r.map(c=>c?[c.t,c.sp||0]:0)),jelly:B.jelly,crate:B.crate,score:B.score,moves:B.moves,col:B.col}}
function ccRestore(L,s){const B=ccBuild(L,ccRng(Date.now()));B.g=s.g.map(r=>r.map(c=>c?ccNew(B,c[0],c[1]||null):null));B.jelly=s.jelly;B.crate=s.crate;B.score=s.score;B.moves=s.moves;B.col=s.col||B.col;return B}
/* ===== CC-VIEW ===== */
const CC_C=[['#FF8FA3','#FF4D6D','#B3123A','فراولة'],['#FFC56E','#FF9F1C','#C25E00','برتقان'],['#FFF07A','#FFD60A','#B38F00','ليمون'],['#7BE495','#2DC653','#13843A','نعناع'],['#8EC5FF','#3A86FF','#1450B8','توت'],['#CFA2FF','#9D4EDD','#5A189A','عنب']];
const CC_SHAPE=[
 'M50 12C72 12 88 28 88 50S72 88 50 88 12 72 12 50 28 12 50 12Z',
 'M34 14H66Q72 14 75 19L89 45Q92 50 89 55L75 81Q72 86 66 86H34Q28 86 25 81L11 55Q8 50 11 45L25 19Q28 14 34 14Z',
 'M50 8C58 24 84 44 84 62C84 80 68 92 50 92S16 80 16 62C16 44 42 24 50 8Z',
 'M28 14H72Q86 14 86 28V72Q86 86 72 86H28Q14 86 14 72V28Q14 14 28 14Z',
 'M50 8L88 42Q91 45 88 49L54 90Q50 94 46 90L12 49Q9 45 12 42Z',
 'M50 9L61 35 89 37Q95 38 91 43L69 61 77 88Q78 94 72 91L50 76 28 91Q22 94 23 88L31 61 9 43Q5 38 11 37L39 35Z'];
const CC_TIPS=['اسحب حلوة جنب حلوة عشان يبقوا ٣ زي بعض في صف أو عمود.','٤ حلويات ورا بعض بيعملوا حلوة مخطّطة، بتمسح صف أو عمود كامل!','٣ و٣ على شكل حرف L أو T بيعملوا حلوة مغلّفة، بتفرقع كل اللي حواليها!','٥ حلويات ورا بعض بيعملوا كرة قوس قزح، بدّلها مع أي لون تمسحه كله!','العب جنب الصناديق عشان تكسرها، وبعضها محتاج ضربتين.'];
const CC_SAY={start:'يَلَّا نِبْدَأ المُسْتَوَى!',win:['بْرافُو! خَلَّصْت المُسْتَوَى، وِطِلِعْت لِلمُسْتَوَى اللِّي بَعْدُه!','بْرافُو! خَلَّصْتِي المُسْتَوَى، وِطِلِعْتِي لِلمُسْتَوَى اللِّي بَعْدُه!'],
 lose:['لَأ يا حَبِيبِي، حاوِل تانِي.','لَأ يا حَبِيبْتِي، حاوْلِي تانِي.'],lock:['المُسْتَوَى دَه لِسَّه مَقْفُول. خَلَّص اللِّي قَبْلُه الأَوِّل.','المُسْتَوَى دَه لِسَّه مَقْفُول. خَلَّصِي اللِّي قَبْلُه الأَوِّل.'],
 wow:['جامِد!','رائِع!','هايِل!'],combo:['كُومْبُو! اِسْتَمِرّ كِدَه!','كُومْبُو! اِسْتَمِرِّي كِدَه!']};
const CC={B:null,L:null,n:1,busy:false,sel:null,els:{},cs:40,hintT:0,plus:false,ended:false,lastWow:0};
const ccSave=()=>pget('cc',{unl:1,stars:{},best:{}});
function ccSvg(t,sp){
  if(sp==='b')return`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#3B2A6B" stroke="#1E1340" stroke-width="3"/>${CC_C.map((c,i)=>{const a0=i*60*Math.PI/180,a1=(i+1)*60*Math.PI/180;return`<path d="M50 50L${50+36*Math.cos(a0)} ${50+36*Math.sin(a0)}A36 36 0 0 1 ${50+36*Math.cos(a1)} ${50+36*Math.sin(a1)}Z" fill="${c[1]}"/>`}).join('')}<circle cx="50" cy="50" r="15" fill="#fff"/><path d="M50 40a10 10 0 1 1-9 13" fill="none" stroke="#9D4EDD" stroke-width="4" stroke-linecap="round"/><ellipse cx="36" cy="30" rx="12" ry="7" fill="#fff" opacity=".55" transform="rotate(-30 36 30)"/></svg>`;
  const c=CC_C[t];let x='';
  if(sp==='h'||sp==='v'){const r=sp==='h'?(y=>`<rect x="0" y="${y}" width="100" height="8"/>`):(y=>`<rect x="${y}" y="0" width="8" height="100"/>`);x=`<g clip-path="url(#ccp${t})" fill="#fff" opacity=".9">${[26,46,66].map(r).join('')}</g>`}
  let w='';if(sp==='w')w=`<path d="M4 34L20 50 4 66Z M96 34L80 50 96 66Z" fill="${c[1]}" stroke="${c[2]}" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="50" r="45" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="7 6" opacity=".95"/>`;
  return`<svg viewBox="0 0 100 100">${w}<path d="${CC_SHAPE[t]}" fill="url(#ccg${t})" stroke="${c[2]}" stroke-width="3.5" stroke-linejoin="round"/>${x}<ellipse cx="38" cy="32" rx="14" ry="8" fill="#fff" opacity=".6" transform="rotate(-25 38 32)"/><circle cx="63" cy="66" r="3.5" fill="#fff" opacity=".45"/></svg>`;
}
const ccDefs=()=>`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${CC_C.map((c,i)=>`<radialGradient id="ccg${i}" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="${c[0]}"/><stop offset=".6" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient><clipPath id="ccp${i}"><path d="${CC_SHAPE[i]}"/></clipPath>`).join('')}</defs></svg>`;
const ccJellySvg=()=>`<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="18" fill="#FF7EB6" stroke="#D63384" stroke-width="5"/><ellipse cx="38" cy="32" rx="16" ry="8" fill="#fff" opacity=".55"/></svg>`;
const ccCrateSvg=()=>`<svg viewBox="0 0 100 100"><rect x="8" y="8" width="84" height="84" rx="10" fill="#C98A4B" stroke="#7A4A1D" stroke-width="5"/><path d="M14 14L86 86M86 14L14 86" stroke="#9B6431" stroke-width="7"/></svg>`;
function ccEnsure(){
  if($('#sCandy'))return;
  const s=document.createElement('section');s.className='screen';s.id='sCandy';s.hidden=true;
  s.innerHTML=`${ccDefs()}
  <div class="cc-map" id="ccMap"><div class="cc-mtop"><span class="cc-tot">⭐ <b id="ccTot">٠</b></span><button class="cc-cont" id="ccCont"></button></div><div class="cc-path" id="ccPath"></div></div>
  <div class="cc-game" id="ccGame" hidden>
    <div class="cc-hud"><div class="cc-box cc-mv"><small>الحركات</small><b id="ccMv">٠</b></div><div class="cc-box cc-goal"><small>المطلوب</small><div id="ccGoal"></div></div><div class="cc-box cc-lvb"><small>المستوى</small><b id="ccLvN">١</b></div></div>
    <div class="cc-sbar"><div class="cc-sfill" id="ccFill"></div><i id="ccSt1"></i><i id="ccSt2"></i><i id="ccSt3"></i><b id="ccScore">٠</b></div>
    <div class="cc-bwrap"><div class="cc-board" id="ccBoard"><div class="cc-tiles" id="ccTiles"></div><div class="cc-pieces" id="ccPieces"></div><div class="cc-fx" id="ccFx"></div></div><div class="cc-toast" id="ccToast"></div></div>
    <div class="cc-btns"><button class="btn2 c-sky" id="ccToMap">🗺️ الخريطة</button><button class="btn2 c-coral" id="ccRe">🔄 من الأول</button></div>
  </div>
`;
  $('#main').appendChild(s);SCREENS.candy='#sCandy';
  // النافذة على مستوى الصفحة عشان حركة دخول الشاشة ما تحركهاش
  const pop=document.createElement('div');pop.className='cc-pop';pop.id='ccPop';pop.hidden=true;document.body.appendChild(pop);
  $('#ccToMap').onclick=()=>{if(CC.busy)return;ccSaveCur();ccShowMap()};
  $('#ccRe').onclick=()=>{if(CC.busy)return;ccStart(CC.n,false)};
  const pc=$('#ccPieces');let st=null;
  pc.addEventListener('pointerdown',e=>{if(CC.busy||CC.ended)return;const c=ccCellAt(e);if(!c)return;st={x:e.clientX,y:e.clientY,c,moved:false};try{pc.setPointerCapture(e.pointerId)}catch(_){} ccIdle()});
  pc.addEventListener('pointermove',e=>{if(!st||st.moved||CC.busy)return;const dx=e.clientX-st.x,dy=e.clientY-st.y,th=CC.cs*.32;if(Math.abs(dx)<th&&Math.abs(dy)<th)return;st.moved=true;
    const[x,y]=st.c;const[X,Y]=Math.abs(dx)>Math.abs(dy)?[x+(dx>0?1:-1),y]:[x,y+(dy>0?1:-1)];ccSel(null);ccTry(x,y,X,Y)});
  const up=()=>{if(!st)return;const s0=st;st=null;if(s0.moved||CC.busy)return;const[x,y]=s0.c;
    if(CC.sel&&Math.abs(CC.sel[0]-x)+Math.abs(CC.sel[1]-y)===1){const[a,b]=CC.sel;ccSel(null);ccTry(a,b,x,y)}
    else if(CC.sel&&CC.sel[0]===x&&CC.sel[1]===y)ccSel(null);else{ccSel([x,y]);tone([660],'sine',.04)}};
  pc.addEventListener('pointerup',up);pc.addEventListener('pointercancel',()=>{st=null});
  addEventListener('resize',()=>{if(S.screen==='candy'&&!$('#ccGame').hidden&&!CC.busy)ccRender()});
}
function ccCellAt(e){const r=$('#ccPieces').getBoundingClientRect();const x=Math.floor((e.clientX-r.left)/CC.cs),y=Math.floor((e.clientY-r.top)/CC.cs);
  // اللوحة من الشمال لليمين حتى في العربي
  return CC.B&&ccHold(CC.B,x,y)&&CC.B.g[y][x]?[x,y]:null}
function ccSel(c){document.querySelectorAll('.cc-c.sel').forEach(e=>e.classList.remove('sel'));CC.sel=c;if(c){const o=CC.B.g[c[1]][c[0]];if(o&&CC.els[o.id])CC.els[o.id].classList.add('sel')}}
/* ---- الخريطة ---- */
function ccOpen(){
  ccEnsure();show('candy');ccShowMap();
  const P=ccSave(),cur=pget('ccCur',null);
  setTimeout(()=>ccLevelPop(cur&&cur.n?cur.n:Math.min(P.unl,CC_LV)),350);
}
function ccShowMap(){
  ccIdle();CC.B=null;$('#ccGame').hidden=true;$('#ccMap').hidden=false;$('#ccPop').hidden=true;$('#title').textContent='مملكة الحلويات';
  const P=ccSave(),cur=pget('ccCur',null),path=$('#ccPath');let tot=0;for(const k in P.stars)tot+=P.stars[k];$('#ccTot').textContent=arDigits(tot);
  const nxt=cur&&cur.n?cur.n:Math.min(P.unl,CC_LV);$('#ccCont').textContent=`▶ ${cur&&cur.n?'كمّل':'العب'} المستوى ${arDigits(nxt)}`;$('#ccCont').onclick=()=>ccLevelPop(nxt);
  const RowH=92,H=CC_LV*RowH+80,W=path.clientWidth||360;path.style.height=H+'px';
  const pos=n=>{const i=n-1;return[W/2+Math.sin(i*.85)*W*.3,H-50-i*RowH]};
  let svg=`<svg class="cc-road" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><polyline points="${Array.from({length:CC_LV},(_,i)=>pos(i+1).join(',')).join(' ')}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${Array.from({length:CC_LV},(_,i)=>pos(i+1).join(',')).join(' ')}" fill="none" stroke="#FFB3D1" stroke-width="6" stroke-dasharray="2 14" stroke-linecap="round"/></svg>`;
  const deco=['🍭','🍬','🧁','🍩','🍪','🍫','🍰','🍦'];let d='';for(let i=0;i<CC_LV;i+=2){const side=i%4?.08:.86;d+=`<span class="cc-deco" style="left:${(side*100).toFixed(1)}%;top:${H-60-i*RowH-30}px">${deco[i/2%deco.length]}</span>`}
  let nodes='';for(let n=1;n<=CC_LV;n++){const[x,y]=pos(n),st=P.stars[n]||0,lock=n>P.unl,curN=n===nxt;
    nodes+=`<button class="cc-node${lock?' lock':''}${st?' done':''}${curN?' cur':''}${n%10===0?' boss':''}" data-n="${n}" style="left:${x}px;top:${y}px"><span>${lock?'🔒':arDigits(n)}</span>${st?`<i>${'★'.repeat(st)}${'☆'.repeat(3-st)}</i>`:''}${curN&&S.face?`<em class="cc-me">${faceSVG(S.face)}</em>`:''}</button>`}
  path.innerHTML=svg+d+nodes;
  path.querySelectorAll('.cc-node').forEach(b=>b.onclick=()=>{const n=+b.dataset.n;if(n>ccSave().unl){boop();speak([{say:gs(CC_SAY.lock)}]);return}tone([660,880],'sine',.05);ccLevelPop(n)});
  setTimeout(()=>{const c=path.querySelector('.cc-node.cur');if(c)c.scrollIntoView({block:'center'})},60);
}
function ccGoalHTML(L,big){
  const G=L.goal,ic=t=>`<span class="cc-gi">${ccSvg(t)}</span>`;
  if(G.k==='score')return`<span class="cc-gt">اجمع ${arDigits(G.n)} نقطة</span>`;
  if(G.k==='collect')return`<span class="cc-gt">اجمع:</span> ${G.items.map(([t,n])=>`${ic(t)}<b>×${arDigits(n)}</b>`).join(' ')}`;
  if(G.k==='jelly')return`<span class="cc-gi">${ccJellySvg()}</span><span class="cc-gt">امسح كل الجيلي</span>`;
  return`<span class="cc-gi">${ccCrateSvg()}</span><span class="cc-gt">اكسر كل الصناديق</span>`;
}
function ccLevelPop(n){
  const L=ccLevel(n),P=ccSave(),cur=pget('ccCur',null),st=P.stars[n]||0,res=cur&&cur.n===n;
  const pop=$('#ccPop');pop.hidden=false;
  pop.innerHTML=`<div class="card"><p class="k">${n%10===0?'👑 ':''}المستوى ${arDigits(n)}</p><div class="cc-pst">${[0,1,2].map(i=>`<span class="${i<st?'on':''}">★</span>`).join('')}</div>
   <div class="cc-pgoal">${ccGoalHTML(L,1)}</div><p class="cc-pm">في ${arDigits(res?cur.s.moves:L.moves)} حركة</p>${n<=5?`<p class="cc-tip">💡 ${CC_TIPS[n-1]}</p>`:''}
   ${res?`<button class="go" id="ccGo">▶ كمّل من مطرح ما وقفت</button><button class="go ln-back" id="ccNew">🔄 ابدأ المستوى من الأول</button>`:`<button class="go" id="ccGo">▶ يلا نلعب</button>`}<button class="cc-x" id="ccX">✕</button></div>`;
  $('#ccGo').onclick=()=>{pop.hidden=true;ccStart(n,res)};if(res)$('#ccNew').onclick=()=>{pop.hidden=true;ccStart(n,false)};
  $('#ccX').onclick=()=>{pop.hidden=true};
}
/* ---- اللعب ---- */
function ccStart(n,resume){
  const L=ccLevel(n);CC.n=n;CC.L=L;CC.ended=false;CC.sel=null;CC.lastWow=0;
  const cur=pget('ccCur',null);
  if(resume&&cur&&cur.n===n&&cur.s){CC.B=ccRestore(L,cur.s);CC.plus=!!cur.plus}else{CC.B=ccBuild(L,ccRng(Date.now()));CC.plus=false;pset('ccCur',{n,s:ccSerialize(CC.B),plus:false})}
  $('#ccMap').hidden=true;$('#ccPop').hidden=true;$('#ccGame').hidden=false;$('#title').textContent='مملكة الحلويات';
  $('#ccLvN').textContent=arDigits(n);ccRender();ccHud();
  if(!resume)speak([{say:CC_SAY.start}]);
  if(CC.B.moves<=0){ccLose();return}
  if(!ccMoves(CC.B).length)ccNoMoves();
  ccIdle();
}
function ccSaveCur(){if(CC.B&&!CC.ended)pset('ccCur',{n:CC.n,s:ccSerialize(CC.B),plus:CC.plus})}
const ccPx=(x,y)=>`translate3d(${x*CC.cs}px,${y*CC.cs}px,0)`;
function ccRender(){
  const B=CC.B,bd=$('#ccBoard'),wrap=bd.parentElement;const W=Math.min((wrap.clientWidth||356)-16,470);CC.cs=Math.floor(W/B.W);
  bd.style.width=CC.cs*B.W+'px';bd.style.height=CC.cs*B.H+'px';bd.style.setProperty('--cs',CC.cs+'px');
  let t='';for(let y=0;y<B.H;y++)for(let x=0;x<B.W;x++){if(!B.mask[y][x])continue;
    t+=`<div class="cc-t${(x+y)%2?' alt':''}" style="transform:${ccPx(x,y)}" id="cct${x}_${y}">${B.jelly[y][x]?`<i class="cc-j j${B.jelly[y][x]}">${ccJellySvg()}</i>`:''}${B.crate[y][x]?`<i class="cc-k k${B.crate[y][x]}">${ccCrateSvg()}</i>`:''}</div>`}
  $('#ccTiles').innerHTML=t;const pc=$('#ccPieces');pc.innerHTML='';CC.els={};
  for(let y=0;y<B.H;y++)for(let x=0;x<B.W;x++){const c=B.g[y][x];if(c)ccMk(c,x,y)}
}
function ccMk(c,x,y){const e=document.createElement('div');e.className='cc-c';e.style.transform=ccPx(x,y);e.innerHTML=ccSvg(c.t,c.sp==='used'?null:c.sp);$('#ccPieces').appendChild(e);CC.els[c.id]=e;return e}
function ccTile(x,y){const B=CC.B,el=$(`#cct${x}_${y}`);if(!el)return;
  el.innerHTML=`${B.jelly[y][x]?`<i class="cc-j j${B.jelly[y][x]}">${ccJellySvg()}</i>`:''}${B.crate[y][x]?`<i class="cc-k k${B.crate[y][x]}">${ccCrateSvg()}</i>`:''}`}
function ccHud(){
  const B=CC.B;$('#ccMv').textContent=arDigits(B.moves);$('#ccMv').parentElement.classList.toggle('low',B.moves<=5);
  $('#ccScore').textContent=arDigits(B.score);const s=ccStarsFor(B.L),top=s[2]*1.12;$('#ccFill').style.width=Math.min(100,B.score/top*100)+'%';
  [1,2,3].forEach(i=>{const e=$('#ccSt'+i);const v=i===1?(s[0]||s[1]*.5):s[i-1];e.style.right=Math.min(96,v/top*100)+'%';e.classList.toggle('on',B.score>=v&&(i>1||B.score>0))});
  const gl=ccGoalLeft(B);
  $('#ccGoal').innerHTML=gl.map(o=>{const ok=o.left<=0,v=ok?'✔':arDigits(o.left);
    if(o.k==='t')return`<span class="cc-gl${ok?' ok':''}"><span class="cc-gi">${ccSvg(o.t)}</span><b>${v}</b></span>`;
    if(o.k==='jelly')return`<span class="cc-gl${ok?' ok':''}"><span class="cc-gi">${ccJellySvg()}</span><b>${v}</b></span>`;
    if(o.k==='crate')return`<span class="cc-gl${ok?' ok':''}"><span class="cc-gi">${ccCrateSvg()}</span><b>${v}</b></span>`;
    return`<span class="cc-gl${ok?' ok':''}"><span class="cc-gt">🎯</span><b>${v}</b></span>`}).join('');
}
const ccWait=ms=>new Promise(r=>setTimeout(r,ms));
async function ccTry(x1,y1,x2,y2){
  const B=CC.B;if(CC.busy||CC.ended||!ccHold(B,x2,y2)||!B.g[y2]||!B.g[y2][x2])return;
  CC.busy=true;ccIdle(true);
  const ph=ccSwap(B,x1,y1,x2,y2);
  if(!ph){CC.busy=false;return}
  if(ph.length===2&&ph[1].back){tone([392],'triangle',.05);await ccAnim(ph);boop();CC.busy=false;ccIdle();return}
  tone([523],'sine',.05);
  await ccAnim(ph);
  if(ph.combo)speak([{say:gs(CC_SAY.combo)}]);else if(ph.casc>=3&&Date.now()-CC.lastWow>4000){CC.lastWow=Date.now();speak([{say:pick(CC_SAY.wow)}])}
  ccHud();
  await ccAfter();
  CC.busy=false;ccIdle();
}
async function ccAfter(){
  const B=CC.B;
  if(ccWon(B)){await ccWin();return}
  if(B.moves<=0){ccSaveCur();ccLose();return}
  if(!ccMoves(B).length)await ccNoMoves();
  ccSaveCur();
}
async function ccNoMoves(){
  ccToast('مفيش حركات... هنلخبط الحلويات! 🔀');await ccWait(700);
  if(!ccShuffle(CC.B))ccFillFresh(CC.B);
  document.querySelectorAll('.cc-c').forEach(e=>e.classList.add('shuf'));await ccWait(250);ccRender();ccSaveCur();
}
function ccToast(t){const e=$('#ccToast');e.textContent=t;e.classList.remove('on');void e.offsetWidth;e.classList.add('on')}
async function ccAnim(ph){
  const B=CC.B;
  for(const p of ph){
    if(p.k==='swap'){const a=CC.els[p.a.id],b=CC.els[p.b.id];if(a)a.style.transform=ccPx(p.a.x,p.a.y);if(b)b.style.transform=ccPx(p.b.x,p.b.y);await ccWait(170)}
    else if(p.k==='beam'){ccFxBomb(p);await ccWait(380)}
    else if(p.k==='combo'){ccFxRing(p.x,p.y,p.kind==='ww'?5:3,'#FFD60A');tone([392,523,659,784],'square',.05);await ccWait(200)}
    else if(p.k==='conv'){p.list.forEach(o=>{const e=CC.els[o.id];if(e){e.innerHTML=ccSvg(o.t,o.sp);e.classList.add('new')}});tone([880,988],'sine',.06);await ccWait(260)}
    else if(p.k==='clear'){
      p.blasts.forEach(b=>{if(b.sp==='h'||b.sp==='v')ccFxBeam(b.x,b.y,b.sp);else if(b.sp==='w')ccFxRing(b.x,b.y,3,'#fff');});
      if(p.blasts.length)tone([700,500],'sawtooth',.05);
      const f=Math.min(6,p.casc||1);tone([440+f*70,520+f*80],'sine',.05);
      let sx=0,sy=0,sn=0;
      p.cells.forEach(c=>{if(c.id){const e=CC.els[c.id];if(e){e.classList.add('pop');setTimeout(()=>e.remove(),260);delete CC.els[c.id]}sx+=c.x;sy+=c.y;sn++}
        if(c.crate!==undefined||c.jelly!==undefined||c.stay)ccTile(c.x,c.y);if(c.crate!==undefined)ccFxRing(c.x,c.y,1,'#C98A4B')});
      p.creates.forEach(c=>{const e=CC.els[c.id];if(e){e.innerHTML=ccSvg(c.t,c.sp);e.classList.remove('new');void e.offsetWidth;e.classList.add('new')}});
      if(p.creates.length)tone([660,880,1100],'sine',.06);
      if(sn&&p.pts)ccFxPts(sx/sn,sy/sn,p.pts);
      ccHud();await ccWait(230)}
    else if(p.k==='fall'){let mx=0;
      p.moved.forEach(m=>{let e=CC.els[m.id];if(m.n){e=ccMk({id:m.id,t:m.t,sp:m.sp},m.fx,m.fy);e.style.transition='none';void e.offsetWidth}
        if(!e)return;const d=Math.hypot(m.x-m.fx,m.y-m.fy),ms=Math.round(110+70*Math.sqrt(d)*1.6);mx=Math.max(mx,ms);
        e.style.transition=`transform ${ms}ms cubic-bezier(.45,.05,.6,1.25)`;e.style.transform=ccPx(m.x,m.y)});
      await ccWait(mx+20);p.moved.forEach(m=>{const e=CC.els[m.id];if(e)e.style.transition=''})}
  }
}
function ccFx(cls,css,html,ms){const e=document.createElement('div');e.className='cc-f '+cls;Object.assign(e.style,css);if(html)e.innerHTML=html;$('#ccFx').appendChild(e);setTimeout(()=>e.remove(),ms||600)}
function ccFxBeam(x,y,d){const cs=CC.cs;if(d==='h')ccFx('beam h',{top:(y*cs+cs*.3)+'px',height:cs*.4+'px'});else ccFx('beam v',{left:(x*cs+cs*.3)+'px',width:cs*.4+'px'})}
function ccFxRing(x,y,r,col){const cs=CC.cs;ccFx('ring',{left:(x+.5)*cs+'px',top:(y+.5)*cs+'px',width:r*cs+'px',height:r*cs+'px',borderColor:col})}
function ccFxPts(x,y,n){const cs=CC.cs;ccFx('pts',{left:(x+.5)*cs+'px',top:(y+.5)*cs+'px'},'+'+arDigits(n),900)}
function ccFxBomb(p){const cs=CC.cs;ccFxRing(p.x,p.y,p.all?8:2,'#fff');(p.to||[]).forEach(([x,y])=>{const dx=(x-p.x)*cs,dy=(y-p.y)*cs,L=Math.hypot(dx,dy),a=Math.atan2(dy,dx);
  ccFx('zap',{left:(p.x+.5)*cs+'px',top:(p.y+.5)*cs+'px',width:L+'px',transform:`rotate(${a}rad)`})});
  (p.conv||[]).forEach(o=>{const e=CC.els[o.id];if(e)e.innerHTML=ccSvg(o.t,o.sp)});tone([1200,900,1500],'triangle',.06)}
/* ---- مساعدة لو الطفل وقف شوية ---- */
function ccIdle(stop){clearTimeout(CC.hintT);document.querySelectorAll('.cc-c.hint').forEach(e=>e.classList.remove('hint'));if(stop||!CC.B||CC.ended)return;
  CC.hintT=setTimeout(()=>{if(CC.busy||!CC.B||S.screen!=='candy')return;const ms=ccMoves(CC.B);if(!ms.length)return;
    const best=ms.find(([a,b,c,d])=>CC.B.g[b][a].sp||CC.B.g[d][c].sp)||ms[Math.floor(Math.random()*ms.length)];
    [[best[0],best[1]],[best[2],best[3]]].forEach(([x,y])=>{const o=CC.B.g[y][x];if(o&&CC.els[o.id])CC.els[o.id].classList.add('hint')})},CC.n<=3?2500:6000)}
/* ---- نهاية المستوى ---- */
async function ccWin(){
  CC.ended=true;ccIdle(true);const B=CC.B;
  ccToast(B.moves>0?'🎉 خلّصت المطلوب! الحركات الباقية بتتحوّل لحلويات مفرقعة':'🎉 خلّصت المطلوب!');
  await ccWait(900);
  const ph=ccBonus(B);if(ph.length)await ccAnim(ph);ccHud();await ccWait(300);
  const n=CC.n,stars=ccStarCount(B),P=ccSave();
  P.stars[n]=Math.max(P.stars[n]||0,stars);P.best[n]=Math.max(P.best[n]||0,B.score);if(n>=P.unl)P.unl=Math.min(CC_LV,n+1);if(n===CC_LV)P.done=1;pset('cc',P);pset('ccCur',null);
  const pop=$('#ccPop');pop.hidden=false;
  pop.innerHTML=`<div class="card"><p class="k">المستوى ${arDigits(n)}</p><div class="stars3">${[0,1,2].map(i=>`<span class="${i<stars?'on':''}" style="animation-delay:${i*.2}s">★</span>`).join('')}</div>
    <p class="m">${n===CC_LV?g('خلّصت كل المستويات! إنت بطل 🏆','خلّصتي كل المستويات! إنتي بطلة 🏆'):g('برافو! كسبت','برافو! كسبتي')+' '+(stars===1?'نجمة واحدة':arDigits(stars)+' نجوم')}</p>
    <p class="cc-psc">النقط: <b>${arDigits(B.score)}</b> · أحسن نتيجة: <b>${arDigits(P.best[n])}</b></p>
    ${n<CC_LV?`<button class="go" id="ccNext">المستوى اللي بعده ◀</button>`:''}<button class="go ln-back" id="ccMapB">🗺️ الخريطة</button></div>`;
  ding();setTimeout(()=>confetti(pop.querySelector('.m')),250);speak([{say:gs(CC_SAY.win)}]);
  const nb=$('#ccNext');if(nb)nb.onclick=()=>{pop.hidden=true;ccStart(n+1,false)};$('#ccMapB').onclick=()=>{pop.hidden=true;ccShowMap()};
}
function ccLose(){
  CC.ended=true;ccIdle(true);const B=CC.B,pop=$('#ccPop');pop.hidden=false;
  const gl=ccGoalLeft(B);
  pop.innerHTML=`<div class="card"><p class="k">المستوى ${arDigits(CC.n)}</p><div style="font-size:3.4rem">😮</div><p class="m">خلصت الحركات!</p>
    <div class="cc-pgoal"><span class="cc-gt">فاضل:</span> ${gl.map(o=>o.k==='t'?`<span class="cc-gi">${ccSvg(o.t)}</span><b>${arDigits(o.left)}</b>`:o.k==='jelly'?`<span class="cc-gi">${ccJellySvg()}</span><b>${arDigits(o.left)}</b>`:o.k==='crate'?`<span class="cc-gi">${ccCrateSvg()}</span><b>${arDigits(o.left)}</b>`:`<b>${arDigits(o.left)} نقطة</b>`).join(' ')}</div>
    ${CC.plus?'':`<button class="go" id="ccPlus">🎁 خُد ٥ حركات زيادة</button>`}<button class="go ln-again" id="ccAgain">🔄 حاول تاني</button><button class="go ln-back" id="ccMapL">🗺️ الخريطة</button></div>`;
  boop();speak([{say:gs(CC_SAY.lose)}]);
  const p5=$('#ccPlus');if(p5)p5.onclick=()=>{pop.hidden=true;CC.plus=true;CC.ended=false;B.moves+=5;ccHud();ccSaveCur();ccIdle();tone([523,659,784],'sine',.07)};
  $('#ccAgain').onclick=()=>{pop.hidden=true;ccStart(CC.n,false)};$('#ccMapL').onclick=()=>{pop.hidden=true;pset('ccCur',null);ccShowMap()};
}
function ccBack(){
  if(!$('#ccPop').hidden&&!$('#ccGame').hidden&&!CC.ended){$('#ccPop').hidden=true;return}
  if(!$('#ccGame').hidden){if(CC.busy)return;ccSaveCur();ccShowMap();return}
  if(!$('#ccPop').hidden){$('#ccPop').hidden=true;return}
  openGames(true);
}
