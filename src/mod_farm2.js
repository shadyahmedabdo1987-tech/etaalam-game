
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
const FPROD={egg:{n:'بيض',e:'🥚',s:10,x:2},milk:{n:'لبن',e:'🥛',s:16,x:3},bread:{n:'عيش',e:'🍞',s:34,x:5},wool:{n:'صوف',e:'🧶',s:30,x:5},juice:{n:'عصير',e:'🧃',s:38,x:5},cake:{n:'كيك',e:'🍰',s:70,x:9},honey:{n:'عسل',e:'🍯',s:60,x:8}};
const FDECO={tree:{n:'شجرة',e:'🌳',lv:2,c:25,x:4},flower:{n:'ورد',e:'🌷',lv:3,c:30,x:5},well:{n:'بير مية',e:'⛲',lv:4,c:60,x:8},house:{n:'بيت المزرعة',e:'🏡',lv:5,c:120,x:15},mill:{n:'طاحونة',e:'🌬️',lv:6,c:160,x:18},dog:{n:'كلب الحراسة',e:'🐕',lv:7,c:140,x:15},tractor:{n:'جرار',e:'🚜',lv:9,c:300,x:30}};
// ---------- خريطة المزرعة: كل حاجة متبنية بتبان على الأرض ----------
// type: pen = حظيرة فيها حيوانات بتاكل وتنتج، fac = مصنع بيحوّل مواد لمنتج
const FBLD={
 coop:{n:'عشة الفراخ',e:'🐔',lv:2,c:40,type:'pen',an:'🐔',feed:'wheat',out:'egg',t:40,ac:20,max:4},
 barn:{n:'حظيرة البقر',e:'🐄',lv:3,c:90,type:'pen',an:'🐄',feed:'corn',out:'milk',t:60,ac:45,max:3},
 bakery:{n:'المخبز',e:'🏪',lv:4,c:150,type:'fac',in:{wheat:3,egg:1},out:'bread',t:75},
 sheep:{n:'حظيرة الخرفان',e:'🐑',lv:5,c:200,type:'pen',an:'🐑',feed:'carrot',out:'wool',t:90,ac:60,max:3},
 juice:{n:'مصنع العصير',e:'🏭',lv:6,c:260,type:'fac',in:{straw:2},out:'juice',t:80},
 cake:{n:'محل الكيك',e:'🧁',lv:8,c:380,type:'fac',in:{egg:2,milk:1,straw:1},out:'cake',t:120},
 bees:{n:'خلية النحل',e:'🐝',lv:10,c:450,type:'pen',an:'🐝',feed:'sun',out:'honey',t:110,ac:80,max:3}};
const FITEM=k=>FCROP[k]||FPROD[k];
const FMAXLV=15, FPLOT_MAX=12, fNeed=l=>12+l*10;
const FCUST=['👵','👴','🧑‍🌾','👩‍🍳','👦','👧','🧕','👨‍🍳'];
let F=null, FSEL='wheat', FT=0, FW=360;
function fLoad(){
  F=pget('farm',null);
  if(!F||!F.plots)F={coins:30,xp:0,lvl:1,plots:Array.from({length:6},()=>({c:null,t0:0,w:0})),inv:{wheat:2},bld:{},deco:[],tasks:[],done:0};
  F.inv=F.inv||{};F.bld=F.bld||{};F.deco=F.deco||[];F.tasks=F.tasks||[];
  // تحويل الحفظ القديم: الحظيرة بقت فيها حيوانات كل واحد لوحده
  for(const k in F.bld){const b=FBLD[k];if(!b){delete F.bld[k];continue}const o=F.bld[k];
    if(b.type==='pen'&&!o.a){o.a=[{t0:o.t0||0},{t0:0}];delete o.t0}
    if(b.type==='fac'&&o.t0===undefined)o.t0=0}
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
// ---------- رسم المزرعة ----------
// الأماكن على الخريطة بالنسبة لعرض الشاشة (x,y من عرض الخريطة)
const FM_H=2.5;
const FM_FAC={bakery:[.18,1.6],juice:[.5,1.6],cake:[.82,1.6]};
const FM_PEN={coop:[.025,1.065,.31,.355],barn:[.345,1.065,.31,.355],sheep:[.665,1.065,.31,.355],bees:[.04,1.845,.44,.32]};
const FM_DECO=[[.1,2.27],[.3,2.28],[.5,2.27],[.12,2.42],[.32,2.43],[.52,2.42],[.03,.995],[.97,.995],[.53,2.03],[.9,2.44],[.7,2.45]];
const FM_TREES=[[.02,.27,'🌳'],[.98,.27,'🌲'],[.02,.62,'🌲'],[.98,.6,'🌳'],[.02,2.2,'🌳'],[.98,2.18,'🌲'],[.02,2.47,'🌲'],[.97,2.47,'🌳']];
// ---- رسومات المباني (SVG) ----
function fWall(w,roof,o){o=o||{};return`<svg viewBox="0 0 120 112" class="fm-svg"><ellipse cx="60" cy="104" rx="52" ry="7" fill="rgba(0,0,0,.18)"/>
 ${o.chim?`<rect x="78" y="10" width="12" height="26" rx="2" fill="#8A5A44"/><rect x="76" y="8" width="16" height="6" rx="2" fill="#6E4535"/>`:''}
 <rect x="14" y="44" width="92" height="58" rx="5" fill="${w}" stroke="rgba(0,0,0,.18)" stroke-width="2"/>
 ${o.planks?`<path d="M14 58H106M14 72H106M14 86H106" stroke="rgba(0,0,0,.12)" stroke-width="2"/>`:''}
 <path d="M6 48L60 12 114 48Z" fill="${roof}" stroke="rgba(0,0,0,.2)" stroke-width="2" stroke-linejoin="round"/>
 <path d="M6 48L60 12 114 48" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-linejoin="round" transform="translate(0,4)"/>
 ${o.awn?`<path d="M14 50H106V60Q100 66 94 60 88 66 82 60 76 66 70 60 64 66 58 60 52 66 46 60 40 66 34 60 28 66 22 60 16 66 14 60Z" fill="${o.awn}"/><path d="M26 50V62M50 50V62M74 50V62M98 50V62" stroke="#fff" stroke-width="7" opacity=".85"/>`:''}
 <rect x="48" y="70" width="24" height="32" rx="3" fill="${o.door||'#7A4A2A'}"/><circle cx="67" cy="87" r="2" fill="#FFD23F"/>
 <rect x="22" y="66" width="18" height="16" rx="3" fill="#BFE8FF" stroke="#fff" stroke-width="3"/><rect x="80" y="66" width="18" height="16" rx="3" fill="#BFE8FF" stroke="#fff" stroke-width="3"/>
</svg>`}
const FM_ART={
 house:()=>fWall('#F7E3C0','#D9483B',{chim:1}),
 silo:()=>`<svg viewBox="0 0 140 112" class="fm-svg"><ellipse cx="70" cy="104" rx="64" ry="7" fill="rgba(0,0,0,.18)"/>
  <rect x="100" y="18" width="30" height="84" rx="4" fill="#C9CED6" stroke="#9AA1AC" stroke-width="2"/><path d="M100 22Q115 2 130 22Z" fill="#8E96A3"/><path d="M100 40H130M100 60H130M100 80H130" stroke="#9AA1AC" stroke-width="2"/>
  <rect x="10" y="40" width="94" height="62" rx="4" fill="#C8372D" stroke="#8E2018" stroke-width="2"/><path d="M4 44L57 10 110 44Z" fill="#7A2A22"/><path d="M14 46L57 18 100 46" fill="none" stroke="#fff" stroke-width="4"/>
  <rect x="36" y="58" width="42" height="44" fill="#fff"/><rect x="40" y="62" width="34" height="40" fill="#A42A20"/><path d="M40 62L74 102M74 62L40 102" stroke="#fff" stroke-width="4"/><circle cx="57" cy="32" r="7" fill="#fff"/><circle cx="57" cy="32" r="4" fill="#8E2018"/></svg>`,
 board:()=>`<svg viewBox="0 0 120 112" class="fm-svg"><ellipse cx="60" cy="104" rx="46" ry="6" fill="rgba(0,0,0,.18)"/><rect x="22" y="56" width="8" height="48" fill="#7A4A2A"/><rect x="90" y="56" width="8" height="48" fill="#7A4A2A"/>
  <rect x="12" y="14" width="96" height="58" rx="6" fill="#B97A45" stroke="#7A4A2A" stroke-width="3"/><path d="M12 30H108M12 46H108M12 62H108" stroke="rgba(0,0,0,.12)" stroke-width="2"/>
  <rect x="20" y="22" width="24" height="30" fill="#FFFDF2" transform="rotate(-6 32 37)"/><rect x="48" y="20" width="24" height="30" fill="#FFF3C4" transform="rotate(4 60 35)"/><rect x="76" y="22" width="24" height="30" fill="#FFFDF2" transform="rotate(-3 88 37)"/>
  <circle cx="32" cy="24" r="3" fill="#E0294F"/><circle cx="60" cy="22" r="3" fill="#2F8FE6"/><circle cx="88" cy="24" r="3" fill="#2DC653"/></svg>`,
 coop:()=>fWall('#C98A4B','#8B4A2B',{planks:1,door:'#5A3418'}),
 barn:()=>fWall('#E9E2D0','#3E7CB1',{planks:1,door:'#5A6B7A'}),
 sheep:()=>fWall('#D9C7A3','#6B8E23',{planks:1,door:'#6A5131'}),
 bakery:()=>fWall('#FFE3B3','#E07A2E',{chim:1,door:'#A0522D'}),
 juice:()=>fWall('#D7F0FF','#2F8FE6',{chim:1,door:'#3A6EA5'}),
 cake:()=>fWall('#FFE0EF','#F25C8E',{awn:'#FF8FB8',door:'#C2185B'}),
 bees:()=>`<svg viewBox="0 0 120 112" class="fm-svg"><ellipse cx="60" cy="104" rx="40" ry="6" fill="rgba(0,0,0,.18)"/><rect x="30" y="74" width="60" height="28" rx="4" fill="#F2B632" stroke="#B9831B" stroke-width="2"/><rect x="34" y="48" width="52" height="26" rx="4" fill="#F7C548" stroke="#B9831B" stroke-width="2"/><rect x="38" y="24" width="44" height="24" rx="4" fill="#FFD866" stroke="#B9831B" stroke-width="2"/><path d="M32 20H88L82 12H38Z" fill="#8B5A2B"/><rect x="52" y="92" width="16" height="5" rx="2" fill="#5A3A10"/></svg>`,
 stall:()=>`<svg viewBox="0 0 120 112" class="fm-svg"><ellipse cx="60" cy="104" rx="52" ry="6" fill="rgba(0,0,0,.18)"/><rect x="16" y="40" width="6" height="62" fill="#7A4A2A"/><rect x="98" y="40" width="6" height="62" fill="#7A4A2A"/>
  <path d="M8 22H112L104 44H16Z" fill="#E0294F"/><path d="M26 22L22 44M46 22L44 44M66 22V44M86 22L88 44" stroke="#fff" stroke-width="9"/><path d="M16 44Q21 52 26 44 31 52 36 44 41 52 46 44 51 52 56 44 61 52 66 44 71 52 76 44 81 52 86 44 91 52 96 44 101 52 104 44Z" fill="#E0294F"/>
  <rect x="12" y="72" width="96" height="30" rx="4" fill="#C98A4B" stroke="#7A4A2A" stroke-width="2"/><path d="M12 86H108" stroke="rgba(0,0,0,.15)" stroke-width="2"/></svg>`,
 lock:()=>`<svg viewBox="0 0 120 112" class="fm-svg"><ellipse cx="60" cy="104" rx="48" ry="6" fill="rgba(0,0,0,.12)"/><path d="M14 102V46L60 14 106 46V102Z" fill="rgba(255,255,255,.35)" stroke="rgba(255,255,255,.9)" stroke-width="3" stroke-dasharray="8 6" stroke-linejoin="round"/></svg>`,
 soil:()=>`<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="fm-soil"><rect x="2" y="4" width="96" height="92" rx="12" fill="#7A4C22"/><rect x="2" y="2" width="96" height="88" rx="12" fill="#946032"/>${[16,32,48,64,80].map(y=>`<path d="M10 ${y}Q50 ${y+5} 90 ${y}" stroke="#6E431C" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}</svg>`
};
const FM_PENBG={coop:'#E8D6A6',barn:'#7FCB5B',sheep:'#8BD468',bees:'#9BDA74'};
// ---- أدوات ----
const fx=v=>v*FW+'px';
function fPx(el){const r=el.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]}
function fFly(fromEl,emo){const s=$('#fmSilo');if(!fromEl||!s)return;const[a,b]=fPx(fromEl),[c,d]=fPx(s);const e=document.createElement('div');e.className='fm-fly';e.textContent=emo;
  e.style.left=a+'px';e.style.top=b+'px';document.body.appendChild(e);requestAnimationFrame(()=>{e.style.transform=`translate(${c-a}px,${d-b}px) scale(.6)`;e.style.opacity='.2'});
  setTimeout(()=>{e.remove();s.classList.remove('bump');void s.offsetWidth;s.classList.add('bump')},800)}
function fPopClose(){document.querySelectorAll('.fm-pop').forEach(p=>p.remove())}
function fPop(anchor,html){fPopClose();const w=$('#fmWorld');const p=document.createElement('div');p.className='fm-pop';p.innerHTML=html;w.appendChild(p);
  const wr=w.getBoundingClientRect(),r=anchor.getBoundingClientRect();let x=r.left-wr.left+r.width/2,y=r.top-wr.top;
  const pw=Math.min(300,FW-16);p.style.width=pw+'px';p.style.left=Math.max(8,Math.min(FW-pw-8,x-pw/2))+'px';
  const ph=p.offsetHeight;if(y-ph-10<4){p.style.top=(r.bottom-wr.top+10)+'px';p.classList.add('below')}else p.style.top=(y-ph-10)+'px';
  p.style.setProperty('--ax',(x-parseFloat(p.style.left))+'px');p.onclick=e=>e.stopPropagation();return p}
const fLeft=(t0,dur)=>Math.max(0,Math.ceil(dur-(fNow()-t0)/1000));
const fRing=(t0,dur)=>`<i class="fm-tm" data-t0="${t0}" data-d="${dur}"><b>${fTime(fLeft(t0,dur))}</b><s><u style="width:${Math.min(100,(fNow()-t0)/10/dur)}%"></u></s></i>`;
// ---- فتح الشاشة ----
function fOpen(){
  if(!$('#sFarm')){const s=document.createElement('section');s.className='screen';s.id='sFarm';s.hidden=true;
    s.innerHTML=`<div class="fm-hud"><span class="fm-lv"><i id="fmLv"></i><span class="fm-bar"><span id="fmXP"></span></span></span><span class="fm-coins">🪙 <b id="fmCoins"></b></span>
      <span class="fm-hbtns"><button id="fmShopB" aria-label="ابني وزيّن">🔨</button><button id="fmTasksB" aria-label="الطلبات">📋<span class="fm-dot" id="fmTDot"></span></button><button id="fmInvB" aria-label="المخزن">📦</button></span></div>
      <div class="fm-world" id="fmWorld"></div>`;
    $('#main').appendChild(s);SCREENS.farm='#sFarm';
    $('#fmTasksB').onclick=fTasks;$('#fmShopB').onclick=fShop;$('#fmInvB').onclick=fInvSheet;
    $('#fmWorld').addEventListener('click',fPopClose);
    addEventListener('resize',()=>{if(S.screen==='farm')fDraw()});
  }
  fLoad();show('farm');fDraw();clearInterval(FT);FT=setInterval(()=>{if(S.screen!=='farm'){clearInterval(FT);return}fTick()},1000);
  const ready=F.plots.some(p=>p.c&&fStage(p).pr>=1);
  speak([{say:gs(FARM_SAY.welcome)},...(ready?[{say:FARM_SAY.ready}]:[{say:gs(FARM_SAY.how)}])]);
}
function fTick(){
  let redraw=false;
  document.querySelectorAll('#fmWorld .fm-tm').forEach(t=>{const t0=+t.dataset.t0,d=+t.dataset.d,l=fLeft(t0,d);if(l<=0){redraw=true;return}
    t.querySelector('b').textContent=fTime(l);t.querySelector('u').style.width=Math.min(100,(fNow()-t0)/10/d)+'%'});
  document.querySelectorAll('#fmWorld .fm-plot').forEach(el=>{const p=F.plots[+el.dataset.i];if(p&&p.c){const st=fStage(p),stg=st.pr>=1?3:st.pr<.34?0:st.pr<.7?1:2;if(+el.dataset.s!==stg)redraw=true}});
  if(redraw&&!document.querySelector('.fm-pop'))fDraw();
}
// ---- رسم الخريطة كلها ----
function fDraw(){
  $('#fmCoins').textContent=arDigits(F.coins);$('#fmLv').textContent=arDigits(F.lvl);
  $('#fmXP').style.width=(F.lvl>=FMAXLV?100:Math.min(100,F.xp/fNeed(F.lvl)*100))+'%';
  $('#fmTDot').hidden=!F.tasks.some(fCanDo);
  const w=$('#fmWorld');FW=Math.min(w.clientWidth||360,620);w.style.height=FW*FM_H+'px';w.style.setProperty('--u',FW/100+'px');
  const now=fNow(),dly=p=>`animation-delay:-${(now/1000)%p}s`;
  let h=`<div class="fm-path" style="left:0;right:0;top:${fx(.255)};height:${fx(.045)}"></div><div class="fm-path" style="left:0;right:0;top:${fx(1.025)};height:${fx(.03)}"></div><div class="fm-path" style="left:0;right:0;top:${fx(1.43)};height:${fx(.03)}"></div><div class="fm-path" style="left:0;right:0;top:${fx(1.79)};height:${fx(.03)}"></div><div class="fm-path" style="left:${fx(.485)};width:${fx(.03)};top:${fx(.27)};height:${fx(1.55)}"></div>`;
  FM_TREES.forEach(([x,y,e],i)=>h+=`<span class="fm-tree" style="left:${fx(x)};top:${fx(y)};${dly(5+i)}">${e}</span>`);
  // البيت ولوحة الطلبات والمخزن
  h+=`<button class="fm-b" id="fmHouse" style="left:${fx(.03)};top:${fx(.01)};width:${fx(.3)}">${FM_ART.house()}<em class="fm-lab">بيتي</em><span class="fm-smoke" style="${dly(3)}">💨</span></button>`;
  h+=`<button class="fm-b" id="fmBoard" style="left:${fx(.37)};top:${fx(.02)};width:${fx(.27)}">${FM_ART.board()}<em class="fm-lab">الطلبات</em><span class="fm-truck">🚚</span>${F.tasks.some(fCanDo)?'<span class="fm-bub ready">✅</span>':''}</button>`;
  h+=`<button class="fm-b" id="fmSilo" style="left:${fx(.67)};top:${fx(.0)};width:${fx(.32)}">${FM_ART.silo()}<em class="fm-lab">المخزن</em></button>`;
  // الأرض الزراعية
  for(let i=0;i<FPLOT_MAX;i++){const col=i%4,row=Math.floor(i/4),L=.04+col*.235,T=.33+row*.225,S=.215;
    if(i<F.plots.length){const p=F.plots[i];h+=`<button class="fm-plot" data-i="${i}" ${fPlotInner(p)} style="left:${fx(L)};top:${fx(T)};width:${fx(S)};height:${fx(S*.92)}">${FM_ART.soil()}${fPlotBody(p)}</button>`}
    else if(i===F.plots.length)h+=`<button class="fm-plot buy" id="fmBuyPlot" style="left:${fx(L)};top:${fx(T)};width:${fx(S)};height:${fx(S*.92)}"><span>🚧</span><small>أرض جديدة<br>🪙 ${arDigits(fPlotCost())}</small></button>`;
    else h+=`<span class="fm-plot wild" style="left:${fx(L)};top:${fx(T)};width:${fx(S)};height:${fx(S*.92)}">🌾</span>`}
  // الحظاير
  for(const k in FM_PEN){const [L,T,W,H]=FM_PEN[k],b=FBLD[k],own=F.bld[k];
    h+=`<div class="fm-pen${own?'':' lock'}" data-k="${k}" style="left:${fx(L)};top:${fx(T)};width:${fx(W)};height:${fx(H)};--pg:${FM_PENBG[k]}">`;
    if(!own){h+=`<button class="fm-b fm-lockb" data-k="${k}" style="left:22%;top:8%;width:56%">${FM_ART.lock()}<span class="fm-ghost">${b.e}</span><em class="fm-lab">${b.n}</em><span class="fm-sign">${b.lv>F.lvl?`🔒 مستوى ${arDigits(b.lv)}`:`🔨 🪙 ${arDigits(b.c)}`}</span></button></div>`;continue}
    h+=`<button class="fm-b fm-shed" data-k="${k}" style="left:2%;top:-7%;width:36%">${FM_ART[k]()}</button><em class="fm-penlab">${b.n}</em>`;
    const n=own.a.length,slots=k==='bees'?[[62,28],[84,58],[46,72]]:[[64,30],[86,50],[30,74],[64,76]];
    own.a.forEach((a,j)=>{const[x,y]=slots[j],st=!a.t0?'hungry':fLeft(a.t0,b.t)>0?'busy':'ready';
      h+=`<button class="fm-an ${st}" data-k="${k}" data-j="${j}" style="left:${x}%;top:${y}%;${dly(6+j)}"><span class="fm-ae" style="${dly(4+j*1.3)}">${b.an}</span>${st==='hungry'?`<span class="fm-bub feed">${FITEM(b.feed).e}</span>`:st==='busy'?fRing(a.t0,b.t):`<span class="fm-bub ready">${FPROD[b.out].e}</span>`}</button>`});
    if(n<b.max){const[x,y]=slots[n];h+=`<button class="fm-addan" data-k="${k}" style="left:${x}%;top:${y}%">＋${b.an}<small>🪙${arDigits(fAnCost(k))}</small></button>`}
    h+=`</div>`}
  // المصانع
  for(const k in FM_FAC){const[x,y]=FM_FAC[k],b=FBLD[k],own=F.bld[k],L=x-.15,T=y-.13;
    if(!own){h+=`<button class="fm-b fm-lockb" data-k="${k}" style="left:${fx(L)};top:${fx(T)};width:${fx(.3)}">${FM_ART.lock()}<span class="fm-ghost">${b.e}</span><em class="fm-lab">${b.n}</em><span class="fm-sign">${b.lv>F.lvl?`🔒 مستوى ${arDigits(b.lv)}`:`🔨 🪙 ${arDigits(b.c)}`}</span></button>`;continue}
    const st=!own.t0?'idle':fLeft(own.t0,b.t)>0?'busy':'ready';
    h+=`<button class="fm-b fm-fac ${st}" data-k="${k}" style="left:${fx(L)};top:${fx(T)};width:${fx(.3)}">${FM_ART[k]()}<span class="fm-badge">${FPROD[b.out].e}</span><em class="fm-lab">${b.n}</em>${st==='busy'?`<span class="fm-smoke on" style="${dly(2)}">💨</span>${fRing(own.t0,b.t)}`:st==='ready'?`<span class="fm-bub ready">${FPROD[b.out].e}</span>`:''}</button>`}
  h+=`<div class="fm-path" style="left:0;right:0;top:${fx(2.19)};height:${fx(.03)}"></div><div class="fm-pond" style="left:${fx(.6)};top:${fx(2.25)};width:${fx(.34)};height:${fx(.16)}"><span class="fm-duck" style="${dly(9)}">🦆</span></div>`;
  // السوق
  h+=`<button class="fm-b" id="fmStall" style="left:${fx(.58)};top:${fx(1.86)};width:${fx(.34)}">${FM_ART.stall()}<span class="fm-goods">🥕🌽🍓</span><em class="fm-lab">السوق</em></button>`;
  // الزينة
  F.deco.slice(0,FM_DECO.length).forEach((k,i)=>{const[x,y]=FM_DECO[i];h+=`<span class="fm-dc" style="left:${fx(x)};top:${fx(y)};${dly(4+i)}">${FDECO[k].e}</span>`});
  w.innerHTML=h;
  // الأحداث
  $('#fmHouse').onclick=e=>{e.stopPropagation();const p=fPop($('#fmHouse'),`<b>🏡 بيت المزرعة</b><p>مستوى المزرعة ${arDigits(F.lvl)} · خلّصت ${arDigits(F.done)} طلب</p>`);};
  $('#fmBoard').onclick=e=>{e.stopPropagation();fTasks()};
  $('#fmSilo').onclick=e=>{e.stopPropagation();fInvSheet()};
  $('#fmStall').onclick=e=>{e.stopPropagation();fMarket()};
  const bp=$('#fmBuyPlot');if(bp)bp.onclick=e=>{e.stopPropagation();fBuyPlot(bp)};
  w.querySelectorAll('.fm-plot[data-i]').forEach(el=>el.onclick=e=>{e.stopPropagation();fPlotTap(+el.dataset.i,el)});
  w.querySelectorAll('.fm-lockb').forEach(el=>el.onclick=e=>{e.stopPropagation();fLockTap(el.dataset.k,el)});
  w.querySelectorAll('.fm-an').forEach(el=>el.onclick=e=>{e.stopPropagation();fAnTap(el.dataset.k,+el.dataset.j,el)});
  w.querySelectorAll('.fm-shed').forEach(el=>el.onclick=e=>{e.stopPropagation();fShedTap(el.dataset.k,el)});
  w.querySelectorAll('.fm-addan').forEach(el=>el.onclick=e=>{e.stopPropagation();fAddAnimal(el.dataset.k,el)});
  w.querySelectorAll('.fm-fac').forEach(el=>el.onclick=e=>{e.stopPropagation();fFacTap(el.dataset.k,el)});
}
function fPlotInner(p){if(!p.c)return'data-s="-1"';const st=fStage(p);return`data-s="${st.pr>=1?3:st.pr<.34?0:st.pr<.7?1:2}"`}
function fPlotBody(p){
  if(!p.c)return`<span class="fm-empty">＋</span>`;
  const cr=FCROP[p.c],st=fStage(p);
  if(st.pr>=1)return`<span class="fm-crops ripe">${[0,1,2,3,4,5].map(i=>`<i style="--i:${i}">${cr.e}</i>`).join('')}</span><span class="fm-bub ready sm">🧺</span>`;
  const stg=st.pr<.34?0:st.pr<.7?1:2;
  return`<span class="fm-crops s${stg}">${[0,1,2,3,4,5].map(i=>`<i style="--i:${i}">${stg===0?'🌱':stg===1?'🌿':cr.e}</i>`).join('')}</span>${p.w?'':'<span class="fm-drop">💧</span>'}${fRing(p.t0,p.w?cr.t:cr.t)}`;
}
// ---- الأرض ----
function fPlant(i,k){const p=F.plots[i],c=FCROP[k];if(F.coins<c.c)return false;F.coins-=c.c;p.c=k;p.t0=fNow();p.w=0;return true}
function fPlotTap(i,el){
  const p=F.plots[i];
  if(!p.c){
    const seeds=Object.entries(FCROP);
    const pop=fPop(el,`<b>🌱 تزرع إيه؟</b><div class="fm-seedg">${seeds.map(([k,c])=>{const lock=c.lv>F.lvl;return`<button class="fm-sd${lock?' lock':''}${k===FSEL?' on':''}" data-k="${k}"><b>${lock?'🔒':c.e}</b><span>${c.n}</span><small>${lock?`مستوى ${arDigits(c.lv)}`:`🪙${arDigits(c.c)} · ${fTime(c.t)}`}</small></button>`}).join('')}</div>
      <button class="fm-all">🌱 ازرع الأرض الفاضية كلها</button>`);
    pop.querySelectorAll('.fm-sd').forEach(b=>b.onclick=()=>{const k=b.dataset.k,c=FCROP[k];if(c.lv>F.lvl){boop();speak([{say:FARM_SAY.lock}]);return}
      FSEL=k;if(!fPlant(i,k)){boop();speak([{say:gs(FARM_SAY.coins)}]);return}fSave();tone([392,523],'triangle',.07);fPopClose();fDraw();
      const ne=document.querySelector(`.fm-plot[data-i="${i}"]`);fFloat(ne,`-${arDigits(c.c)} 🪙`)});
    pop.querySelector('.fm-all').onclick=()=>{let n=0;F.plots.forEach((q,j)=>{if(!q.c&&fPlant(j,FSEL))n++});
      if(!n){boop();speak([{say:gs(FARM_SAY.coins)}]);return}fSave();tone([392,523,659],'triangle',.07);fPopClose();fDraw()};
    return}
  const st=fStage(p),cr=FCROP[p.c];
  if(st.pr>=1){const q=2;F.inv[p.c]=(F.inv[p.c]||0)+q;p.c=null;p.t0=0;p.w=0;fAddXP(cr.x);fSave();
    tone([523,784,1047],'sine',.07);fFloat(el,`+${arDigits(q)} ${cr.e}`);fFly(el,cr.e);
    if(Math.random()<.35)speak([{say:gs(FARM_SAY.harvest)}],false);fDraw();return}
  if(!p.w){p.w=1;const left=cr.t*1000-(fNow()-p.t0);p.t0-=left/2;fSave();tone([880,660,990],'sine',.06);
    el.classList.add('watering');speak([{say:FARM_SAY.water}],false);setTimeout(fDraw,700);return}
  fPop(el,`<b>${cr.e} ${cr.n}</b><p>فاضل ${fTime(st.left)} ويطلع ⏳</p>`);tone([440],'sine',.05);
}
const fPlotCost=()=>20+(F.plots.length-6)*25;
function fBuyPlot(el){const c=fPlotCost();if(F.coins<c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}
  F.coins-=c;F.plots.push({c:null,t0:0,w:0});fAddXP(3);fSave();ding();fFloat(el,`-${arDigits(c)} 🪙`);speak([{say:gs(FARM_SAY.plot)}]);fDraw()}
function fHas(need){return Object.entries(need).every(([k,q])=>(F.inv[k]||0)>=q)}
// ---- البناء ----
function fLockTap(k,el){const b=FBLD[k];
  if(b.lv>F.lvl){boop();speak([{say:FARM_SAY.lock}]);fPop(el,`<b>${b.e} ${b.n}</b><p>🔒 بيتفتح في مستوى ${arDigits(b.lv)}</p>`);return}
  const pop=fPop(el,`<b>${b.e} ${b.n}</b><p>${b.type==='pen'?`فيها ${b.an} بياكل ${FITEM(b.feed).e} ويدّيك ${FPROD[b.out].e}`:`بيعمل ${FPROD[b.out].e} من ${Object.entries(b.in).map(([i,q])=>FITEM(i).e+'×'+arDigits(q)).join(' ')}`}</p><button class="fm-go">🔨 ابنيها بـ 🪙 ${arDigits(b.c)}</button>`);
  pop.querySelector('.fm-go').onclick=()=>{fPopClose();fBuild(k,el)}}
function fBuild(k,el){const b=FBLD[k];if(F.coins<b.c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}
  F.coins-=b.c;F.bld[k]=b.type==='pen'?{a:[{t0:0},{t0:0}]}:{t0:0};fAddXP(10);fSave();
  if(el){el.innerHTML='<span class="fm-build">🏗️</span>';el.classList.add('building')}tone([392,330,392,523],'square',.08);
  setTimeout(()=>{fDraw();ding();const ne=document.querySelector(`[data-k="${k}"]`);if(ne)confetti(ne);speak([{say:gs(FARM_SAY.build)}])},1300)}
// ---- الحيوانات ----
const fAnCost=k=>FBLD[k].ac*(F.bld[k].a.length-1);
function fAddAnimal(k,el){const b=FBLD[k],c=fAnCost(k);if(F.coins<c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}
  F.coins-=c;F.bld[k].a.push({t0:0});fAddXP(4);fSave();ding();fFloat(el,`-${arDigits(c)} 🪙`);fDraw()}
function fAnTap(k,j,el){const b=FBLD[k],a=F.bld[k].a[j];
  if(!a.t0){if((F.inv[b.feed]||0)<1){boop();speak([{say:gs(FARM_SAY.need)}]);fPop(el,`<b>${b.an} جعان!</b><p>محتاج ${FITEM(b.feed).e} ${FITEM(b.feed).n}. ازرعه واحصده الأول 🌱</p>`);return}
    F.inv[b.feed]--;a.t0=fNow();fSave();tone([392,494,587],'triangle',.07);fFloat(el,`-١ ${FITEM(b.feed).e}`);speak([{say:FARM_SAY.feed}],false);fDraw();return}
  const left=fLeft(a.t0,b.t);
  if(left>0){fPop(el,`<b>${b.an} بياكل 😋</b><p>${FPROD[b.out].e} هيجهز بعد ${fTime(left)}</p>`);tone([440],'sine',.05);return}
  F.inv[b.out]=(F.inv[b.out]||0)+1;a.t0=0;fAddXP(FPROD[b.out].x);fSave();tone([523,784,1047],'sine',.07);fFloat(el,`+١ ${FPROD[b.out].e}`);fFly(el,FPROD[b.out].e);
  if(Math.random()<.4)speak([{say:gs(FARM_SAY.product)}],false);fDraw()}
// الضغط على الحظيرة نفسها: يلمّ كل الجاهز ويأكّل كل الجعانين
function fShedTap(k,el){const b=FBLD[k],own=F.bld[k];let got=0,fed=0,miss=0;
  own.a.forEach(a=>{if(a.t0&&fLeft(a.t0,b.t)<=0){F.inv[b.out]=(F.inv[b.out]||0)+1;a.t0=0;fAddXP(FPROD[b.out].x);got++}});
  own.a.forEach(a=>{if(!a.t0){if((F.inv[b.feed]||0)>0){F.inv[b.feed]--;a.t0=fNow();fed++}else miss++}});
  if(!got&&!fed){if(miss){boop();speak([{say:gs(FARM_SAY.need)}]);fPop(el,`<b>${b.n}</b><p>محتاج ${FITEM(b.feed).e} ${FITEM(b.feed).n} عشان تأكّلهم</p>`)}else fPop(el,`<b>${b.n}</b><p>كلهم بياكلوا دلوقتي 😋</p>`);return}
  fSave();if(got){fFloat(el,`+${arDigits(got)} ${FPROD[b.out].e}`);fFly(el,FPROD[b.out].e);tone([523,784,1047],'sine',.07)}else tone([392,494,587],'triangle',.07);
  if(fed)speak([{say:FARM_SAY.feed}],false);fDraw()}
// ---- المصانع ----
function fFacTap(k,el){const b=FBLD[k],own=F.bld[k];
  if(own.t0){const left=fLeft(own.t0,b.t);
    if(left<=0){F.inv[b.out]=(F.inv[b.out]||0)+1;own.t0=0;fAddXP(FPROD[b.out].x);fSave();tone([523,784,1047],'sine',.07);fFloat(el,`+١ ${FPROD[b.out].e}`);fFly(el,FPROD[b.out].e);fDraw()}
    else{fPop(el,`<b>${b.n} شغّال ⚙️</b><p>${FPROD[b.out].e} هيجهز بعد ${fTime(left)}</p>`);tone([440],'sine',.05)}return}
  const ok=fHas(b.in);
  const pop=fPop(el,`<b>${b.e} ${b.n}</b><div class="fm-rec">${Object.entries(b.in).map(([i,q])=>`<span class="${(F.inv[i]||0)>=q?'have':'miss'}">${FITEM(i).e} ${arDigits(Math.min(F.inv[i]||0,q))}/${arDigits(q)}</span>`).join('')}<em>←</em><span class="out">${FPROD[b.out].e}</span></div><p>⏱️ ${fTime(b.t)}</p><button class="fm-go"${ok?'':' disabled'}>${ok?'▶ ابدأ الشغل':'محتاج حاجات الأول'}</button>`);
  pop.querySelector('.fm-go').onclick=()=>{if(!fHas(b.in)){boop();speak([{say:gs(FARM_SAY.need)}]);return}
    for(const[i,q]of Object.entries(b.in))F.inv[i]-=q;own.t0=fNow();fSave();fPopClose();tone([392,494,587],'triangle',.07);fDraw()}}
// ---- المخزن ----
function fInvSheet(){const ks=Object.keys(F.inv).filter(k=>F.inv[k]>0);
  const ov=fSheet('📦 المخزن',ks.length?`<div class="fm-invg">${ks.map(k=>`<span class="fm-it"><b>${FITEM(k).e}</b>${FITEM(k).n}<em>${arDigits(F.inv[k])}</em></span>`).join('')}</div><button class="btn2 c-coral fm-tomk">💰 بيع في السوق</button>`:'<p class="fm-empty2">المخزن فاضي، ازرع واحصد 🌱</p>');
  const m=ov.querySelector('.fm-tomk');if(m)m.onclick=()=>{ov.remove();fMarket()}}
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
    const info=kind==='b'?(o.type==='pen'?`${o.an} بياكل ${FITEM(o.feed).e} ← ${FPROD[o.out].e}`:`${Object.entries(o.in).map(([i,q])=>FITEM(i).e+'×'+arDigits(q)).join(' ')} ← ${FPROD[o.out].e}`):`+${arDigits(o.x)} خبرة${own?` · عندك ${arDigits(own)}`:''}`;
    return`<div class="fm-shop${lock?' lock':''}"><b>${lock?'🔒':o.e}</b><span>${o.n}<small>${info}</small></span>${lock?`<em>مستوى ${arDigits(o.lv)}</em>`:kind==='b'&&own?`<button class="btn2 c-teal fm-see" data-k="${k}">👀 شوفها</button>`:`<button class="btn2 c-sun fm-buy" data-k="${k}" data-t="${kind}">🪙 ${arDigits(o.c)}</button>`}</div>`};
  const ov=fSheet('🔨 ابني وزيّن',`<p class="fm-sub">المباني بتبان في المزرعة، والحيوانات بتاكل وتدّيك منتجات</p>${Object.entries(FBLD).map(([k,o])=>row(k,o,'b')).join('')}<p class="fm-sub">الزينة بتتحط في المزرعة وبتدّيك خبرة</p>${Object.entries(FDECO).map(([k,o])=>row(k,o,'d')).join('')}`);
  const goTo=k=>{ov.remove();const el=document.querySelector(`#fmWorld [data-k="${k}"]`);if(el){el.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>{el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash')},400)}return el};
  ov.querySelectorAll('.fm-see').forEach(b=>b.onclick=()=>goTo(b.dataset.k));
  ov.querySelectorAll('.fm-buy').forEach(b=>b.onclick=()=>{const k=b.dataset.k;
    if(b.dataset.t==='b'){const o=FBLD[k];if(F.coins<o.c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}const el=goTo(k);setTimeout(()=>fBuild(k,el),500);return}
    const o=FDECO[k];if(F.coins<o.c){boop();speak([{say:gs(FARM_SAY.coins)}]);return}
    if(F.deco.length>=FM_DECO.length){boop();return}
    F.coins-=o.c;F.deco.push(k);fAddXP(o.x);fSave();ding();speak([{say:gs(FARM_SAY.build)}]);ov.remove();fDraw();
    const d=document.querySelectorAll('#fmWorld .fm-dc');const last=d[d.length-1];if(last){last.scrollIntoView({block:'center',behavior:'smooth'});last.classList.add('flash')}});
}
function fMarket(){
  const ks=Object.keys(F.inv).filter(k=>F.inv[k]>0);
  const ov=fSheet('💰 السوق',ks.length?`<p class="fm-sub">بيع حاجات من المخزن وخد فلوس</p>`+ks.map(k=>{const it=FITEM(k);return`<div class="fm-shop"><b>${it.e}</b><span>${it.n}<small>عندك ${arDigits(F.inv[k])} · الواحدة بـ 🪙 ${arDigits(it.s)}</small></span><button class="btn2 c-coral fm-s1" data-k="${k}">بيع ١</button><button class="btn2 c-sun fm-sa" data-k="${k}">الكل</button></div>`}).join(''):'<p class="fm-empty">المخزن فاضي. ازرع واحصد الأول 🌱</p>');
  const sell=(k,n,b)=>{n=Math.min(n,F.inv[k]||0);if(!n)return;F.inv[k]-=n;const c=FITEM(k).s*n;F.coins+=c;fSave();fCoinSnd();fFloat(b,`+${arDigits(c)} 🪙`);ov.remove();fDraw();fMarket()};
  ov.querySelectorAll('.fm-s1').forEach(b=>b.onclick=()=>sell(b.dataset.k,1,b));
  ov.querySelectorAll('.fm-sa').forEach(b=>b.onclick=()=>sell(b.dataset.k,99,b));
}
