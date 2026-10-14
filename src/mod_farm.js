
/* ---------- المزرعة السعيدة: ازرع واحصد وابني، وفيها مستويات ومهام ---------- */
const FARM_SAY={
 welcome:['أَهْلاً بِيك فِي المَزْرَعَة السَّعِيدَة! اِزْرَع، وِاحْصُد، وِابْنِي مَزْرَعْتَك.','أَهْلاً بِيكِي فِي المَزْرَعَة السَّعِيدَة! اِزْرَعِي، وِاحْصُدِي، وِابْنِي مَزْرَعْتِك.'],
 how:['اِخْتار البُذُور، وِدُوس عَلَى الأَرْض الفاضْيَة عَشان تِزْرَع.','اِخْتارِي البُذُور، وِدُوسِي عَلَى الأَرْض الفاضْيَة عَشان تِزْرَعِي.'],
 ready:'الزَّرْع اِسْتَوَى! يَلَّا نِحْصُد.',
 harvest:['شاطِر! حَصَدْت المَحْصُول.','شاطْرَة! حَصَدْتِي المَحْصُول.'],
 water:'مَيَّة لِلزَّرْع، عَشان يِكْبَر بِسُرْعَة!',
 coins:['مَعاكْش فُلُوس كِفايَة. بِيع حاجَة مِن المَخْزَن.','مَعاكِيش فُلُوس كِفايَة. بِيعِي حاجَة مِن المَخْزَن.'],
 task:['بْرافُو! خَلَّصْت المُهِمَّة.','بْرافُو! خَلَّصْتِي المُهِمَّة.'],
 level:['مَبْرُوك! طِلِعْت مُسْتَوَى جِدِيد فِي المَزْرَعَة.','مَبْرُوك! طِلِعْتِي مُسْتَوَى جِدِيد فِي المَزْرَعَة.'],
 build:['بْرافُو! بَنَيْت مَبْنَى جِدِيد.','بْرافُو! بَنَيْتِي مَبْنَى جِدِيد.'],
 feed:'الحَيَوانات بِتاكُل، وِشْوَيَّة وِتِدِّينا الخِير.',
 product:['المُنْتَج جاهِز! دُوس عَلِيه عَشان تاخْدُه.','المُنْتَج جاهِز! دُوسِي عَلِيه عَشان تاخْدِيه.'],
 need:['مِحْتاج حاجات الأَوِّل. شُوف المَطْلُوب.','مِحْتاجَة حاجات الأَوِّل. شُوفِي المَطْلُوب.'],
 plot:['اِشْتَرِيت أَرْض جِدِيدَة!','اِشْتَرِيتِي أَرْض جِدِيدَة!'],
 lock:'دِي هَتِتْفِتِح فِي مُسْتَوَى أَعْلَى.'
};
// المحاصيل: lv مستوى الفتح، c سعر البذرة، t وقت الطوي بالثواني، s سعر البيع، x خبرة
const FCROP={
 wheat:{n:'قمح',e:'🌾',lv:1,c:2,t:20,s:4,x:1},
 carrot:{n:'جزر',e:'🥕',lv:1,c:4,t:35,s:8,x:2},
 tomato:{n:'طماطم',e:'🍅',lv:2,c:7,t:55,s:14,x:3},
 corn:{n:'ذرة',e:'🌽',lv:3,c:10,t:80,s:20,x:4},
 straw:{n:'فراولة',e:'🍓',lv:4,c:14,t:110,s:28,x:5},
 sun:{n:'عباد الشمس',e:'🌻',lv:5,c:18,t:140,s:36,x:6},
 pumpkin:{n:'قرع',e:'🎃',lv:7,c:28,t:220,s:58,x:8},
 melon:{n:'بطيخ',e:'🍉',lv:9,c:36,t:300,s:76,x:10}};
// المباني: in المطلوب، out الناتج، t الوقت
const FBLD={
 coop:{n:'عشة الفراخ',e:'🐔',lv:2,c:40,in:{wheat:2},out:'egg',t:40},
 barn:{n:'زريبة البقرة',e:'🐄',lv:3,c:90,in:{corn:1},out:'milk',t:60},
 bakery:{n:'المخبز',e:'🏪',lv:4,c:150,in:{wheat:3,egg:1},out:'bread',t:75},
 sheep:{n:'حظيرة الخرفان',e:'🐑',lv:5,c:200,in:{carrot:2},out:'wool',t:90},
 juice:{n:'مصنع العصير',e:'🏭',lv:6,c:260,in:{straw:2},out:'juice',t:80},
 cake:{n:'محل الكيك',e:'🧁',lv:8,c:380,in:{egg:2,milk:1,straw:1},out:'cake',t:120},
 bees:{n:'خلية النحل',e:'🐝',lv:10,c:450,in:{sun:2},out:'honey',t:110}};
const FPROD={egg:{n:'بيض',e:'🥚',s:10,x:2},milk:{n:'لبن',e:'🥛',s:16,x:3},bread:{n:'عيش',e:'🍞',s:34,x:5},wool:{n:'صوف',e:'🧶',s:30,x:5},juice:{n:'عصير',e:'🧃',s:38,x:5},cake:{n:'كيك',e:'🍰',s:70,x:9},honey:{n:'عسل',e:'🍯',s:60,x:8}};
const FDECO={tree:{n:'شجرة',e:'🌳',lv:2,c:25,x:4},flower:{n:'ورد',e:'🌷',lv:3,c:30,x:5},well:{n:'بير مية',e:'⛲',lv:4,c:60,x:8},house:{n:'بيت المزرعة',e:'🏡',lv:5,c:120,x:15},mill:{n:'طاحونة',e:'🌬️',lv:6,c:160,x:18},dog:{n:'كلب الحراسة',e:'🐕',lv:7,c:140,x:15},tractor:{n:'جرار',e:'🚜',lv:9,c:300,x:30}};
const FITEM=k=>FCROP[k]||FPROD[k];
const FMAXLV=15, FPLOT_MAX=12, fNeed=l=>12+l*10;
const FCUST=['👵','👴','🧑‍🌾','👩‍🍳','👦','👧','🧕','👨‍🍳'];
let F=null, FSEL='wheat', FT=0;
function fLoad(){
  F=pget('farm',null);
  if(!F||!F.plots)F={coins:30,xp:0,lvl:1,plots:Array.from({length:6},()=>({c:null,t0:0,w:0})),inv:{wheat:2},bld:{},deco:[],tasks:[],done:0};
  F.inv=F.inv||{};F.bld=F.bld||{};F.deco=F.deco||[];F.tasks=F.tasks||[];
  while(F.tasks.length<3)F.tasks.push(fNewTask());
}
function fSave(){pset('farm',F)}
const fNow=()=>Date.now();
function fCropsOpen(){return Object.keys(FCROP).filter(k=>FCROP[k].lv<=F.lvl)}
function fItemsOpen(){const it=fCropsOpen();for(const k in FBLD)if(F.bld[k])it.push(FBLD[k].out);return it}
function fNewTask(){
  const pool=fItemsOpen(),n=Math.min(pool.length,F.lvl<3?1:pick([1,2,2,3].slice(0,F.lvl<5?2:4)));
  const need={},used=new Set();let coins=0,xp=0;
  for(let i=0;i<n;i++){let k;do k=pick(pool);while(used.has(k)&&used.size<pool.length);used.add(k);
    const it=FITEM(k),q=FPROD[k]?1+Math.floor(Math.random()*Math.min(3,1+F.lvl/4)):2+Math.floor(Math.random()*Math.min(6,2+F.lvl/2));
    need[k]=(need[k]||0)+q;coins+=it.s*q;xp+=it.x*q}
  return{who:pick(FCUST),need,coins:Math.round(coins*1.4+5),xp:Math.round(xp*1.5+2)};
}
function fAddXP(x){
  F.xp+=x;let up=false;
  while(F.lvl<FMAXLV&&F.xp>=fNeed(F.lvl)){F.xp-=fNeed(F.lvl);F.lvl++;up=true}
  if(F.lvl>=FMAXLV)F.xp=Math.min(F.xp,fNeed(F.lvl));
  if(up)setTimeout(fLevelUp,350);
}
function fLevelUp(){
  const nw=[...Object.values(FCROP),...Object.values(FBLD),...Object.values(FDECO)].filter(o=>o.lv===F.lvl);
  const ov=document.createElement('div');ov.className='iqdone fm-up';
  ov.innerHTML=`<div class="card"><p class="k">المزرعة السعيدة</p><div class="fm-lvbig">${arDigits(F.lvl)}</div><p class="m">مستوى جديد! 🎉</p>${nw.length?`<p class="k">اتفتح لك:</p><div class="fm-new">${nw.map(o=>`<span><b>${o.e}</b>${o.n}</span>`).join('')}</div>`:''}<button class="go">يلا نكمل 🌱</button></div>`;
  document.body.appendChild(ov);ding();setTimeout(()=>confetti(ov.querySelector('.fm-lvbig')),300);
  speak([{say:gs(FARM_SAY.level)}]);
  ov.querySelector('.go').onclick=()=>{ov.remove();fDraw()};
}
function fFloat(el,txt){
  if(!el)return;const r=el.getBoundingClientRect(),d=document.createElement('div');d.className='fm-float';d.textContent=txt;
  d.style.left=(r.left+r.width/2)+'px';d.style.top=(r.top+r.height/3)+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1100);
}
const fCoinSnd=()=>tone([988,1319],'square',.06);
function fStage(p){const cr=FCROP[p.c],el=(fNow()-p.t0)/1000,pr=Math.min(1,el/cr.t);return{pr,left:Math.max(0,Math.ceil(cr.t-el))}}
function fTime(s){return s>=60?`${arDigits(Math.floor(s/60))}:${arDigits(String(s%60).padStart(2,'0'))}`:`${arDigits(s)} ث`}
function fOpen(){
  if(!$('#sFarm')){const s=document.createElement('section');s.className='screen';s.id='sFarm';s.hidden=true;
    s.innerHTML=`<div class="fm-hud"><span class="fm-coins">🪙 <b id="fmCoins"></b></span><span class="fm-lv"><i id="fmLv"></i><span class="fm-bar"><span id="fmXP"></span></span></span></div>
      <div class="fm-scene"><div class="fm-sky"><span class="fm-sunb">☀️</span><span class="fm-cloud c1">☁️</span><span class="fm-cloud c2">☁️</span></div>
        <div class="fm-deco" id="fmDeco"></div><div class="fm-field" id="fmField"></div></div>
      <div class="fm-seeds" id="fmSeeds"></div>
      <p class="sec-title">🏠 المباني</p><div class="fm-blds" id="fmBlds"></div>
      <p class="sec-title">📦 المخزن</p><div class="fm-inv" id="fmInv"></div>
      <div class="fm-tools"><button class="btn2 c-teal" id="fmTasksB">📋 المهام <span class="fm-dot" id="fmTDot"></span></button><button class="btn2 c-sun" id="fmShopB">🔨 ابني وزيّن</button><button class="btn2 c-coral" id="fmSellB">💰 السوق</button></div>`;
    $('#main').appendChild(s);SCREENS.farm='#sFarm';
    $('#fmTasksB').onclick=fTasks;$('#fmShopB').onclick=fShop;$('#fmSellB').onclick=fMarket;
  }
  fLoad();show('farm');fDraw();clearInterval(FT);FT=setInterval(()=>{if(S.screen!=='farm'){clearInterval(FT);return}fTick()},1000);
  const ready=F.plots.some(p=>p.c&&fStage(p).pr>=1);
  speak([{say:gs(FARM_SAY.welcome)},...(ready?[{say:FARM_SAY.ready}]:[{say:gs(FARM_SAY.how)}])]);
}
function fTick(){
  document.querySelectorAll('#fmField .fm-plot').forEach(el=>{const p=F.plots[+el.dataset.i];if(!p||!p.c)return;const st=fStage(p),was=el.dataset.ready==='1';
    if(st.pr>=1&&!was){fDrawPlot(el,p)}else if(st.pr<1){const b=el.querySelector('.fm-pb i');if(b)b.style.width=(st.pr*100)+'%';const t=el.querySelector('.fm-tl');if(t)t.textContent=fTime(st.left);
      const em=el.querySelector('.fm-crop');const stg=st.pr<.34?0:st.pr<.7?1:2;if(em&&+em.dataset.s!==stg)fDrawPlot(el,p)}});
  document.querySelectorAll('#fmBlds .fm-bld').forEach(el=>{const k=el.dataset.k,b=F.bld[k];if(!b||!b.t0)return;const left=Math.ceil(FBLD[k].t-(fNow()-b.t0)/1000);
    if(left<=0&&el.dataset.ready!=='1')fDrawBlds();else{const t=el.querySelector('.fm-tl');if(t&&left>0)t.textContent=fTime(left)}});
}
function fDrawPlot(el,p){
  el.className='fm-plot';el.dataset.ready='0';
  if(!p.c){el.innerHTML=`<span class="fm-plus">＋</span><span class="fm-seedhint">${FCROP[FSEL].e}</span>`;el.classList.add('empty');return}
  const cr=FCROP[p.c],st=fStage(p);
  if(st.pr>=1){el.dataset.ready='1';el.classList.add('ready');el.innerHTML=`<span class="fm-crop ripe" data-s="3">${cr.e}${cr.e}<br>${cr.e}</span><span class="fm-spark">✨</span>`;return}
  const stg=st.pr<.34?0:st.pr<.7?1:2;
  el.innerHTML=`<span class="fm-crop s${stg}" data-s="${stg}">${stg===0?'🌱':stg===1?'🌿':cr.e}</span>${p.w?'<span class="fm-wet">💧</span>':'<span class="fm-wbtn">💧</span>'}<span class="fm-tl">${fTime(st.left)}</span><span class="fm-pb"><i style="width:${st.pr*100}%"></i></span>`;
}
function fDraw(){
  $('#fmCoins').textContent=arDigits(F.coins);$('#fmLv').textContent=`مستوى ${arDigits(F.lvl)}`;
  $('#fmXP').style.width=(F.lvl>=FMAXLV?100:Math.min(100,F.xp/fNeed(F.lvl)*100))+'%';
  const fld=$('#fmField');fld.innerHTML='';
  F.plots.forEach((p,i)=>{const el=document.createElement('button');el.dataset.i=i;fDrawPlot(el,p);el.onclick=e=>fPlotTap(i,el,e);fld.appendChild(el)});
  if(F.plots.length<FPLOT_MAX){const el=document.createElement('button');el.className='fm-plot buy';el.innerHTML=`<span>🚧</span><small>أرض جديدة<br>🪙 ${arDigits(fPlotCost())}</small>`;el.onclick=()=>fBuyPlot(el);fld.appendChild(el)}
  $('#fmSeeds').innerHTML=Object.entries(FCROP).map(([k,c])=>{const lock=c.lv>F.lvl;return`<button class="fm-seed${k===FSEL?' on':''}${lock?' lock':''}" data-k="${k}"><b>${lock?'🔒':c.e}</b><span>${c.n}</span><small>${lock?`مستوى ${arDigits(c.lv)}`:`🪙 ${arDigits(c.c)}`}</small></button>`}).join('');
  $('#fmSeeds').querySelectorAll('.fm-seed').forEach(b=>b.onclick=()=>{const c=FCROP[b.dataset.k];if(c.lv>F.lvl){boop();speak([{say:FARM_SAY.lock}]);return}FSEL=b.dataset.k;tone([660],'sine',.05);fDraw()});
  $('#fmDeco').innerHTML=F.deco.map((k,i)=>`<span class="fm-dc" style="--i:${i}">${FDECO[k].e}</span>`).join('');
  fDrawBlds();fDrawInv();
  $('#fmTDot').hidden=!F.tasks.some(fCanDo);
}
function fDrawBlds(){
  const box=$('#fmBlds');box.innerHTML=Object.entries(FBLD).map(([k,b])=>{
    const own=F.bld[k],st=own&&own.t0?Math.ceil(b.t-(fNow()-own.t0)/1000):null;let cls='fm-bld',body;
    if(!own){cls+=b.lv>F.lvl?' lock':' buyable';body=`<small>${b.lv>F.lvl?`🔒 مستوى ${arDigits(b.lv)}`:`🔨 🪙 ${arDigits(b.c)}`}</small>`}
    else if(st===null)body=`<small class="fm-in">${Object.entries(b.in).map(([i,q])=>`${FITEM(i).e}×${arDigits(q)}`).join(' ')} ← ${FPROD[b.out].e}</small>`;
    else if(st>0){cls+=' busy';body=`<small class="fm-tl">${fTime(st)}</small>`}
    else{cls+=' ready';body=`<span class="fm-out">${FPROD[b.out].e}</span><small>جاهز!</small>`}
    return`<button class="${cls}" data-k="${k}" data-ready="${st!==null&&st<=0?1:0}"><b>${b.e}</b><span>${b.n}</span>${body}</button>`}).join('');
  box.querySelectorAll('.fm-bld').forEach(el=>el.onclick=()=>fBldTap(el.dataset.k,el));
}
function fDrawInv(){
  const ks=Object.keys(F.inv).filter(k=>F.inv[k]>0);
  $('#fmInv').innerHTML=ks.length?ks.map(k=>`<span class="fm-it"><b>${FITEM(k).e}</b>${arDigits(F.inv[k])}</span>`).join(''):'<p class="fm-empty">المخزن فاضي، ازرع واحصد 🌱</p>';
}
function fPlotTap(i,el,e){
  const p=F.plots[i];
  if(!p.c){const c=FCROP[FSEL];if(F.coins<c.c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}
    F.coins-=c.c;p.c=FSEL;p.t0=fNow();p.w=0;fSave();tone([392,523],'triangle',.07);fFloat(el,`-${arDigits(c.c)} 🪙`);fDraw();return}
  const st=fStage(p);
  if(st.pr>=1){const cr=FCROP[p.c],q=2;F.inv[p.c]=(F.inv[p.c]||0)+q;p.c=null;p.t0=0;p.w=0;fAddXP(cr.x);fSave();
    tone([523,784,1047],'sine',.07);fFloat(el,`+${arDigits(q)} ${cr.e}`);
    if(Math.random()<.35)speak([{say:gs(FARM_SAY.harvest)}],false);fDraw();return}
  if(!p.w){p.w=1;const cr=FCROP[p.c],left=cr.t*1000-(fNow()-p.t0);p.t0-=left/2;fSave();tone([880,660,990],'sine',.06);
    el.classList.add('watering');speak([{say:FARM_SAY.water}],false);setTimeout(()=>fDrawPlot(el,p),700);return}
  tone([440],'sine',.05);
}
const fPlotCost=()=>20+(F.plots.length-6)*25;
function fBuyPlot(el){const c=fPlotCost();if(F.coins<c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}
  F.coins-=c;F.plots.push({c:null,t0:0,w:0});fAddXP(3);fSave();ding();fFloat(el,`-${arDigits(c)} 🪙`);speak([{say:gs(FARM_SAY.plot)}]);fDraw()}
function fHas(need){return Object.entries(need).every(([k,q])=>(F.inv[k]||0)>=q)}
function fBldTap(k,el){
  const b=FBLD[k],own=F.bld[k];
  if(!own){if(b.lv>F.lvl){boop();speak([{say:FARM_SAY.lock}]);return}fBuild(k,el);return}
  if(own.t0){const left=b.t-(fNow()-own.t0)/1000;
    if(left<=0){F.inv[b.out]=(F.inv[b.out]||0)+1;own.t0=0;fAddXP(FPROD[b.out].x);fSave();tone([523,784,1047],'sine',.07);fFloat(el,`+١ ${FPROD[b.out].e}`);fDraw()}
    else tone([440],'sine',.05);return}
  if(!fHas(b.in)){boop();speak([{say:gs(FARM_SAY.need)}]);el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');return}
  for(const[i,q]of Object.entries(b.in))F.inv[i]-=q;own.t0=fNow();fSave();tone([392,494,587],'triangle',.07);speak([{say:FARM_SAY.feed}],false);fDraw();
}
function fBuild(k,el){const b=FBLD[k];if(F.coins<b.c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}
  F.coins-=b.c;F.bld[k]={t0:0};fAddXP(10);fSave();ding();if(el)confetti(el);speak([{say:gs(FARM_SAY.build)}]);fDraw()}
function fSheet(title,html){
  const ov=document.createElement('div');ov.className='fm-sheet';ov.innerHTML=`<div class="card"><div class="fm-sh-h"><b>${title}</b><button class="fm-x" aria-label="اقفل">✕</button></div><div class="fm-sh-b">${html}</div></div>`;
  document.body.appendChild(ov);ov.querySelector('.fm-x').onclick=()=>ov.remove();ov.onclick=e=>{if(e.target===ov)ov.remove()};return ov;
}
const fCanDo=t=>fHas(t.need);
function fTasks(){
  const ov=fSheet('📋 مهام المزرعة',`<p class="fm-sub">خلّصت ${arDigits(F.done)} مهمة</p>`+F.tasks.map((t,i)=>{const ok=fCanDo(t);return`<div class="fm-task${ok?' ok':''}"><span class="fm-who">${t.who}</span><div class="fm-need">${Object.entries(t.need).map(([k,q])=>`<span class="${(F.inv[k]||0)>=q?'have':''}">${FITEM(k).e} ${arDigits(Math.min(F.inv[k]||0,q))}/${arDigits(q)}</span>`).join('')}</div><div class="fm-rw">🪙 ${arDigits(t.coins)}<br>⭐ ${arDigits(t.xp)}</div><button class="btn2 ${ok?'c-teal':'c-sky'} fm-do" data-i="${i}" ${ok?'':'disabled'}>${ok?'سلّم ✓':'لسه'}</button><button class="fm-skip" data-i="${i}" title="غيّر المهمة">🔄</button></div>`}).join(''));
  ov.querySelectorAll('.fm-do').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,t=F.tasks[i];if(!fCanDo(t))return;
    for(const[k,q]of Object.entries(t.need))F.inv[k]-=q;F.coins+=t.coins;F.done++;F.tasks[i]=fNewTask();fAddXP(t.xp);
    S.stars++;pset('stars',S.stars);$('#starTotal').textContent=arDigits(S.stars);fSave();ding();confetti(b);speak([{say:gs(FARM_SAY.task)}]);ov.remove();fDraw();setTimeout(fTasks,600)});
  ov.querySelectorAll('.fm-skip').forEach(b=>b.onclick=()=>{F.tasks[+b.dataset.i]=fNewTask();fSave();ov.remove();fTasks()});
}
function fShop(){
  const row=(k,o,kind)=>{const own=kind==='b'?!!F.bld[k]:F.deco.filter(x=>x===k).length,lock=o.lv>F.lvl;
    return`<div class="fm-shop${lock?' lock':''}"><b>${lock?'🔒':o.e}</b><span>${o.n}${kind==='b'?`<small>${Object.entries(o.in).map(([i,q])=>FITEM(i).e+'×'+arDigits(q)).join(' ')} ← ${FPROD[o.out].e}</small>`:`<small>+${arDigits(o.x)} خبرة${own?` · عندك ${arDigits(own)}`:''}</small>`}</span>${lock?`<em>مستوى ${arDigits(o.lv)}</em>`:kind==='b'&&own?'<em>✓ اتبنى</em>':`<button class="btn2 c-sun fm-buy" data-k="${k}" data-t="${kind}">🪙 ${arDigits(o.c)}</button>`}</div>`};
  const ov=fSheet('🔨 ابني وزيّن',`<p class="fm-sub">المباني بتعمل منتجات</p>${Object.entries(FBLD).map(([k,o])=>row(k,o,'b')).join('')}<p class="fm-sub">الزينة بتدّيك خبرة وتحلّي المزرعة</p>${Object.entries(FDECO).map(([k,o])=>row(k,o,'d')).join('')}`);
  ov.querySelectorAll('.fm-buy').forEach(b=>b.onclick=()=>{const k=b.dataset.k;
    if(b.dataset.t==='b'){ov.remove();fBuild(k,null);return}
    const o=FDECO[k];if(F.coins<o.c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}
    if(F.deco.length>=14){boop();return}
    F.coins-=o.c;F.deco.push(k);fAddXP(o.x);fSave();ding();speak([{say:gs(FARM_SAY.build)}]);ov.remove();fDraw()});
}
function fMarket(){
  const ks=Object.keys(F.inv).filter(k=>F.inv[k]>0);
  const ov=fSheet('💰 السوق',ks.length?`<p class="fm-sub">بيع حاجات من المخزن وخد فلوس</p>`+ks.map(k=>{const it=FITEM(k);return`<div class="fm-shop"><b>${it.e}</b><span>${it.n}<small>عندك ${arDigits(F.inv[k])} · الواحدة بـ 🪙 ${arDigits(it.s)}</small></span><button class="btn2 c-coral fm-s1" data-k="${k}">بيع ١</button><button class="btn2 c-sun fm-sa" data-k="${k}">الكل</button></div>`}).join(''):'<p class="fm-empty">المخزن فاضي. ازرع واحصد الأول 🌱</p>');
  const sell=(k,n,b)=>{n=Math.min(n,F.inv[k]||0);if(!n)return;F.inv[k]-=n;const c=FITEM(k).s*n;F.coins+=c;fSave();fCoinSnd();fFloat(b,`+${arDigits(c)} 🪙`);ov.remove();fDraw();fMarket()};
  ov.querySelectorAll('.fm-s1').forEach(b=>b.onclick=()=>sell(b.dataset.k,1,b));
  ov.querySelectorAll('.fm-sa').forEach(b=>b.onclick=()=>sell(b.dataset.k,99,b));
}
