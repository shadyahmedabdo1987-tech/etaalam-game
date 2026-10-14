
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
// ---------- رسم المزرعة (منظر مايل مجسّم) ----------
// كل الأماكن بالنسبة لعرض الخريطة FW. الأرض بتترسم معيّنات (أيزومتري)
const FM_H=2.44;
const FM_PA=.125,FM_PY=.47,FM_PHW=.118,FM_PHH=.059;
const fPlotXY=i=>{const c=i%4,r=Math.floor(i/4);return[.5+(c-r-.5)*FM_PA,FM_PY+(c+r)*FM_PA/2]};
const FM_PEN={coop:[.27,1.05],barn:[.73,1.05],sheep:[.27,1.40],bees:[.73,1.40]};
const FM_PHW2=.23,FM_PHH2=.115;
const FM_FAC={bakery:[.18,1.85],juice:[.5,1.85],cake:[.82,1.85]};
const FM_DECO=[[.08,.44],[.93,.83],[.06,.86],[.5,.36],[.94,1.22],[.06,1.22],[.5,1.6],[.08,2.38],[.5,2.4],[.92,2.38],[.5,2.25]];
const FM_TREES=[[.04,.36,'o'],[.96,.4,'p'],[.96,.52,'o'],[.03,.7,'p'],[.97,1.6,'p'],[.03,1.6,'o'],[.12,2.27,'f'],[.24,2.33,'f'],[.06,2.15,'f'],[.97,2.2,'p'],[.36,.14,'p']];
const FM_HAY=[[.1,.33],[.15,.355],[.62,1.6],[.38,1.61],[.42,2.3]];
// ---- ألوان وتدرّجات مشتركة ----
const FM_DEFS=`<svg width="0" height="0" style="position:absolute"><defs>
 <linearGradient id="fmCyl" x1="0" x2="1"><stop offset="0" stop-color="#8E98A6"/><stop offset=".35" stop-color="#F1F4F8"/><stop offset=".7" stop-color="#C3CAD4"/><stop offset="1" stop-color="#7D8796"/></linearGradient>
 <linearGradient id="fmHayG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FBE38A"/><stop offset="1" stop-color="#D9A93A"/></linearGradient>
 <radialGradient id="fmLeaf" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9BE36A"/><stop offset=".6" stop-color="#4FB33A"/><stop offset="1" stop-color="#2E7D2A"/></radialGradient>
 <radialGradient id="fmLeaf2" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7FCF6A"/><stop offset=".6" stop-color="#2F8F45"/><stop offset="1" stop-color="#1B5E33"/></radialGradient>
 <radialGradient id="fmWater" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#B8EDFF"/><stop offset=".6" stop-color="#46B4EE"/><stop offset="1" stop-color="#2A86C4"/></radialGradient>
 <pattern id="fmLawn" width="80" height="40" patternUnits="userSpaceOnUse"><path d="M0 20L40 0 80 20 40 40Z" fill="rgba(255,255,255,.07)"/></pattern>
</defs></svg>`;
// ---- مبنى مجسّم: حيطتين وسقف جمالون ----
function fIso(o){const h=o.h||34,rh=o.rh||26,P=a=>a.map(p=>p.join(',')).join(' ');
  const L=[10,85],F=[60,110],R=[110,85],Lt=[10,85-h],Ft=[60,110-h],Rt=[110,85-h],G1=[35,72.5-h-rh],G2=[85,97.5-h-rh];
  const fl=(s,z)=>[10+50*s,85+25*s-z],fr=(s,z)=>[60+50*s,110-25*s-z],q=(f,s0,s1,z0,z1)=>P([f(s0,z0),f(s1,z0),f(s1,z1),f(s0,z1)]);
  let s=`<svg viewBox="0 -10 120 130" class="fm-svg"><path d="M2 88L60 117 118 88 60 59Z" fill="rgba(0,0,0,.22)"/>`;
  s+=`<polygon points="${P([L,F,Ft,Lt])}" fill="${o.wl}"/><polygon points="${P([F,R,Rt,Ft])}" fill="${o.wr}"/>`;
  if(o.planks)for(let z=8;z<h;z+=7)s+=`<path d="M${P([fl(0,z),fl(1,z)])}M${P([fr(0,z),fr(1,z)])}" stroke="rgba(0,0,0,.13)" stroke-width="1.2" fill="none"/>`.replace(/M([\d.]+),([\d.]+) ([\d.]+),([\d.]+)/g,'M$1 $2L$3 $4');
  s+=`<polygon points="${q(fl,0,1,0,4)}" fill="rgba(0,0,0,.18)"/><polygon points="${q(fr,0,1,0,4)}" fill="rgba(0,0,0,.25)"/>`;
  // شبابيك على الحيطة الشمال
  [[.16,.38],[.62,.84]].forEach(([a,b])=>{s+=`<polygon points="${q(fl,a,b,11,25)}" fill="#fff"/><polygon points="${q(fl,a+.03,b-.03,13,23)}" fill="${o.win||'#9FDcff'}"/><polygon points="${q(fl,a+.03,(a+b)/2,13,23)}" fill="rgba(255,255,255,.45)"/>`});
  if(o.awn)s+=`<polygon points="${q(fl,0,1,26,31)}" fill="${o.awn}"/>`+[0,1,2,3,4].map(i=>`<polygon points="${q(fl,i*.2,i*.2+.1,26,31)}" fill="#fff"/>`).join('');
  // الباب
  s+=`<polygon points="${q(fr,.34,.66,0,24)}" fill="${o.tr||'#fff'}"/><polygon points="${q(fr,.37,.63,0,22)}" fill="${o.dr}"/>`;
  if(o.barnX)s+=`<path d="M${fr(.37,0).join(' ')}L${fr(.63,22).join(' ')}M${fr(.63,0).join(' ')}L${fr(.37,22).join(' ')}" stroke="${o.tr||'#fff'}" stroke-width="2.4"/>`;
  else s+=`<circle cx="${fr(.58,11)[0]}" cy="${fr(.58,11)[1]}" r="1.6" fill="#FFD23F"/>`;
  // الجمالون والسقف
  s+=`<polygon points="${P([Ft,Rt,G2])}" fill="${o.gab||o.wr}"/><polygon points="${P([G1,G2,Rt,[60,60-h]])}" fill="${o.rd}"/>`;
  if(o.gwin)s+=`<circle cx="85" cy="${97.5-h-rh*.42}" r="5" fill="${o.tr||'#fff'}"/><circle cx="85" cy="${97.5-h-rh*.42}" r="3.4" fill="#3A2A1A"/>`;
  s+=`<polygon points="${P([[Lt[0]-4,Lt[1]+3],[Ft[0],Ft[1]+5],[G2[0],G2[1]],[G1[0]-3,G1[1]]])}" fill="${o.rf}"/>`;
  for(let t=.2;t<1;t+=.2){const a=[Lt[0]-4+(G1[0]-3-Lt[0]+4)*t,Lt[1]+3+(G1[1]-Lt[1]-3)*t],b=[Ft[0]+(G2[0]-Ft[0])*t,Ft[1]+5+(G2[1]-Ft[1]-5)*t];s+=`<path d="M${a.join(' ')}L${b.join(' ')}" stroke="rgba(0,0,0,.14)" stroke-width="1.6"/>`}
  s+=`<path d="M${G1[0]-3} ${G1[1]}L${G2.join(' ')}" stroke="rgba(255,255,255,.55)" stroke-width="2.5" stroke-linecap="round"/><path d="M${Lt[0]-4} ${Lt[1]+3}L${Ft[0]} ${Ft[1]+5}" stroke="rgba(0,0,0,.25)" stroke-width="2.5" stroke-linecap="round"/>`;
  s+=`<path d="M${Ft[0]} ${Ft[1]+1}L${G2.join(' ')}L${Rt.join(' ')}" stroke="${o.tr||'#fff'}" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`;
  if(o.chim){const x=30,y=G1[1]+16;s+=`<polygon points="${P([[x,y],[x+6,y+3],[x+6,y-15],[x,y-18]])}" fill="#A0563E"/><polygon points="${P([[x+6,y+3],[x+12,y],[x+12,y-18],[x+6,y-15]])}" fill="#7A3E2C"/><polygon points="${P([[x,y-18],[x+6,y-21],[x+12,y-18],[x+6,y-15]])}" fill="#4A2A1E"/>`}
  if(o.sign)s+=`<text x="${fl(.5,0)[0]}" y="${fl(.5,32)[1]-1}" font-size="13" text-anchor="middle">${o.sign}</text>`;
  return s+`</svg>`}
const FM_ART={
 house:()=>fIso({wl:'#FBEFD5',wr:'#E3CDA5',rf:'#E0503F',rd:'#A8322A',dr:'#8A5530',tr:'#fff',chim:1,gwin:1,h:36}),
 coop:()=>fIso({wl:'#D79A55',wr:'#B47A3C',rf:'#8B4A2B',rd:'#5E2F1A',dr:'#5A3418',tr:'#F6E3C0',planks:1,h:28,rh:22}),
 barn:()=>fIso({wl:'#D8443A',wr:'#AE2F28',rf:'#6E4A3A',rd:'#4A3026',dr:'#8E2018',tr:'#fff',planks:1,barnX:1,gwin:1,h:34}),
 sheep:()=>fIso({wl:'#E6D3A8',wr:'#C6B184',rf:'#6B8E23',rd:'#4A6418',dr:'#6A5131',tr:'#fff',planks:1,barnX:1,h:30}),
 bakery:()=>fIso({wl:'#FFE3B3',wr:'#E8BE84',rf:'#E07A2E',rd:'#A9561C',dr:'#A0522D',tr:'#fff',chim:1,awn:'#E0503F',sign:'🍞'}),
 juice:()=>fIso({wl:'#D7F0FF',wr:'#A9D2EC',rf:'#2F8FE6',rd:'#1E66A8',dr:'#3A6EA5',tr:'#fff',chim:1,awn:'#FF9F1C',sign:'🧃'}),
 cake:()=>fIso({wl:'#FFE0EF',wr:'#F2B9D3',rf:'#F25C8E',rd:'#B83466',dr:'#C2185B',tr:'#fff',awn:'#FF8FB8',sign:'🍰'}),
 bees:()=>`<svg viewBox="0 -10 120 130" class="fm-svg"><ellipse cx="60" cy="104" rx="46" ry="12" fill="rgba(0,0,0,.2)"/>${[[38,96],[82,96],[60,84]].sort((a,b)=>a[1]-b[1]).map(([x,y])=>fHive(x,y)).join('')}</svg>`,
 silo:()=>`<svg viewBox="0 0 140 150" class="fm-svg"><ellipse cx="70" cy="132" rx="62" ry="15" fill="rgba(0,0,0,.22)"/>
  <rect x="58" y="30" width="44" height="98" fill="url(#fmCyl)"/><ellipse cx="80" cy="128" rx="22" ry="8" fill="#7D8796"/>${[52,76,100].map(y=>`<path d="M58 ${y}Q80 ${y+9} 102 ${y}" stroke="#7D8796" stroke-width="2" fill="none"/>`).join('')}
  <path d="M58 30Q58 6 80 4 102 6 102 30Q80 40 58 30Z" fill="#D9483B"/><path d="M64 22Q70 10 80 8" stroke="rgba(255,255,255,.6)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M58 30Q80 40 102 30" stroke="#8E2018" stroke-width="2" fill="none"/>
  <path d="M96 36V124" stroke="#5A6270" stroke-width="2"/>${[44,56,68,80,92,104,116].map(y=>`<path d="M93 ${y}H99" stroke="#5A6270" stroke-width="1.6"/>`).join('')}
  ${fCrate(30,120)}${fCrate(48,128)}${fCrate(38,106)}<text x="44" y="104" font-size="12" text-anchor="middle">🌾</text></svg>`,
 board:()=>`<svg viewBox="0 0 120 120" class="fm-svg"><ellipse cx="60" cy="108" rx="40" ry="9" fill="rgba(0,0,0,.2)"/><rect x="24" y="52" width="7" height="56" rx="2" fill="#6E4122"/><rect x="89" y="52" width="7" height="56" rx="2" fill="#6E4122"/>
  <path d="M10 22L60 8 110 22V70L60 84 10 70Z" fill="#B97A45" stroke="#6E4122" stroke-width="3" stroke-linejoin="round"/><path d="M10 38L60 24 110 38M10 54L60 40 110 54" stroke="rgba(0,0,0,.13)" stroke-width="2" fill="none"/>
  <path d="M6 22L60 6 114 22 60 0Z" fill="#7A4A22"/>
  <rect x="20" y="28" width="22" height="26" fill="#FFFDF2" transform="rotate(-8 31 41)"/><rect x="49" y="22" width="22" height="26" fill="#FFF3C4" transform="rotate(3 60 35)"/><rect x="78" y="28" width="22" height="26" fill="#FFFDF2" transform="rotate(8 89 41)"/>
  <circle cx="31" cy="30" r="3" fill="#E0294F"/><circle cx="60" cy="24" r="3" fill="#2F8FE6"/><circle cx="89" cy="30" r="3" fill="#2DC653"/></svg>`,
 stall:()=>`<svg viewBox="0 0 120 120" class="fm-svg"><path d="M4 92L60 118 116 92 60 66Z" fill="rgba(0,0,0,.2)"/>
  <rect x="16" y="40" width="5" height="56" fill="#7A4A2A"/><rect x="99" y="40" width="5" height="56" fill="#7A4A2A"/>
  <path d="M10 70L60 92 110 70V82L60 104 10 82Z" fill="#B47A3C"/><path d="M10 70L60 48 110 70 60 92Z" fill="#D79A55"/><path d="M10 82L60 104V92L10 70Z" fill="#9C6630"/>
  <text x="40" y="80" font-size="15">🥕</text><text x="58" y="76" font-size="15">🍅</text><text x="50" y="88" font-size="15">🌽</text><text x="72" y="84" font-size="14">🍓</text>
  <path d="M4 34L60 10 116 34 60 58Z" fill="#E0294F"/><path d="M18 28L74 52M32 22L88 46M46 16L102 40" stroke="#fff" stroke-width="7" opacity=".9"/>
  <path d="M4 34L60 58 116 34" stroke="#A8122F" stroke-width="2" fill="none"/></svg>`,
 lock:()=>`<svg viewBox="0 -10 120 130" class="fm-svg"><path d="M6 88L60 115 114 88 60 61Z" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.95)" stroke-width="2.5" stroke-dasharray="7 5"/>
  <rect x="56" y="58" width="5" height="34" fill="#7A4A2A"/><path d="M36 44L84 44 84 66 36 66Z" fill="#F6E3C0" stroke="#7A4A2A" stroke-width="3"/><path d="M44 52H76M44 58H70" stroke="#C49A5A" stroke-width="2.4"/></svg>`
};
function fHive(x,y){return`<g transform="translate(${x-14} ${y-34})"><path d="M0 30L14 37 28 30V12L14 19 0 12Z" fill="#E9B33A"/><path d="M14 37L28 30V12L14 19Z" fill="#C48A1C"/><path d="M0 12L14 5 28 12 14 19Z" fill="#FFDD77"/><path d="M0 20L14 27 28 20" stroke="#B9831B" stroke-width="1.5" fill="none"/><path d="M-2 12L14 3 30 12 14 21Z" fill="#8B5A2B"/><path d="M-2 12L14 21 30 12" stroke="#5E3A18" stroke-width="1.5" fill="none"/><rect x="5" y="27" width="5" height="2.4" fill="#4A2A08" transform="skewY(26)"/></g>`}
function fCrate(x,y){return`<g transform="translate(${x} ${y})"><path d="M-10 -5L0 0 10 -5V-15L0 -10 -10 -15Z" fill="#C98A4B"/><path d="M0 0L10 -5V-15L0 -10Z" fill="#9C6630"/><path d="M-10 -15L0 -20 10 -15 0 -10Z" fill="#E0AE6E"/><path d="M-10 -10L0 -5 10 -10" stroke="#7A4A22" stroke-width="1.2" fill="none"/></g>`}
// ---- الحيوانات (رسومات أصلية) ----
const FM_ANI={
 '🐔':`<svg viewBox="0 0 100 100"><ellipse cx="52" cy="92" rx="26" ry="6" fill="rgba(0,0,0,.2)"/><path d="M44 78V90M58 78V90" stroke="#F29E1F" stroke-width="4" stroke-linecap="round"/><path d="M72 46Q92 30 88 58Q86 70 74 70Z" fill="#F1EDE4"/><ellipse cx="54" cy="62" rx="26" ry="20" fill="#FFFFFF"/><ellipse cx="58" cy="62" rx="14" ry="9" fill="#E7E1D4" transform="rotate(-12 58 62)"/><circle cx="32" cy="40" r="13" fill="#fff"/><path d="M24 26Q27 18 31 26Q34 17 38 27Q42 21 42 30Z" fill="#E53935"/><path d="M20 40L10 44 20 47Z" fill="#F7A21B"/><path d="M24 48Q22 56 28 54Z" fill="#E53935"/><circle cx="28" cy="38" r="2.6" fill="#222"/><circle cx="27.3" cy="37.2" r=".9" fill="#fff"/></svg>`,
 '🐄':`<svg viewBox="0 0 100 100"><ellipse cx="54" cy="92" rx="38" ry="6" fill="rgba(0,0,0,.2)"/><path d="M30 70V90M42 72V91M70 72V91M80 70V90" stroke="#EDE7DC" stroke-width="7" stroke-linecap="round"/><path d="M30 88V90M42 89V91M70 89V91M80 88V90" stroke="#3B2A20" stroke-width="7" stroke-linecap="round"/><rect x="24" y="38" width="64" height="40" rx="18" fill="#FFFFFF"/><path d="M50 40Q62 38 64 50Q58 60 48 54Q42 46 50 40ZM74 58Q84 56 86 66Q80 74 72 70Z" fill="#2E2A2A"/><ellipse cx="60" cy="78" rx="9" ry="5" fill="#F7B6C4"/><path d="M88 46Q96 52 94 66" stroke="#EDE7DC" stroke-width="3" fill="none"/><circle cx="94" cy="68" r="3.5" fill="#3B2A20"/><rect x="6" y="30" width="28" height="30" rx="12" fill="#FFFFFF"/><path d="M14 30Q18 20 24 28" fill="#2E2A2A"/><ellipse cx="18" cy="54" rx="13" ry="9" fill="#F7B6C4"/><circle cx="13" cy="54" r="1.8" fill="#A8566B"/><circle cx="22" cy="54" r="1.8" fill="#A8566B"/><path d="M8 28Q6 20 10 18M30 28Q34 20 30 18" stroke="#E8D9A8" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="4" cy="36" rx="5" ry="3" fill="#F2E3E3"/><ellipse cx="36" cy="36" rx="5" ry="3" fill="#F2E3E3"/><circle cx="15" cy="40" r="2.6" fill="#222"/><circle cx="26" cy="40" r="2.6" fill="#222"/></svg>`,
 '🐑':`<svg viewBox="0 0 100 100"><ellipse cx="54" cy="92" rx="34" ry="6" fill="rgba(0,0,0,.2)"/><path d="M34 74V90M46 76V91M66 76V91M76 74V90" stroke="#3A3436" stroke-width="5" stroke-linecap="round"/>${[[36,50,13],[50,44,14],[64,46,14],[78,54,12],[42,64,13],[58,66,14],[72,66,12],[56,54,16]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#FBF8F1" stroke="#E2DACB" stroke-width="1.5"/>`).join('')}<ellipse cx="20" cy="50" rx="11" ry="14" fill="#4A4245"/><ellipse cx="9" cy="46" rx="6" ry="3" fill="#4A4245" transform="rotate(-25 9 46)"/><ellipse cx="31" cy="44" rx="6" ry="3" fill="#4A4245" transform="rotate(25 31 44)"/><circle cx="20" cy="38" r="7" fill="#FBF8F1"/><circle cx="16" cy="50" r="2.4" fill="#fff"/><circle cx="24" cy="50" r="2.4" fill="#fff"/><circle cx="16" cy="50" r="1.3" fill="#111"/><circle cx="24" cy="50" r="1.3" fill="#111"/></svg>`,
 '🐝':`<svg viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="18" ry="4" fill="rgba(0,0,0,.15)"/><g class="fm-wing"><ellipse cx="46" cy="30" rx="12" ry="18" fill="rgba(220,245,255,.85)" stroke="#9CC" transform="rotate(-25 46 30)"/><ellipse cx="62" cy="30" rx="10" ry="15" fill="rgba(220,245,255,.8)" stroke="#9CC" transform="rotate(20 62 30)"/></g><ellipse cx="54" cy="58" rx="26" ry="18" fill="#FFC928"/><path d="M48 41Q44 58 48 75M62 42Q58 58 62 74" stroke="#2B2118" stroke-width="7" fill="none"/><path d="M80 58L90 60 80 63Z" fill="#2B2118"/><circle cx="28" cy="54" r="13" fill="#2B2118"/><circle cx="24" cy="51" r="3" fill="#fff"/><path d="M24 42Q20 30 14 30M30 42Q32 30 38 28" stroke="#2B2118" stroke-width="2" fill="none"/></svg>`};
// ---- الفلاح ----
const FM_FARMER=`<svg viewBox="0 0 60 100"><ellipse cx="30" cy="96" rx="16" ry="4" fill="rgba(0,0,0,.25)"/><g class="fm-legs"><rect x="20" y="70" width="8" height="24" rx="3" fill="#2D5DA8"/><rect x="32" y="70" width="8" height="24" rx="3" fill="#2D5DA8"/><rect x="18" y="90" width="12" height="6" rx="3" fill="#5A3418"/><rect x="31" y="90" width="12" height="6" rx="3" fill="#5A3418"/></g>
 <rect x="14" y="42" width="32" height="32" rx="10" fill="#D9483B"/><path d="M14 52H46M14 62H46M24 42V74M36 42V74" stroke="rgba(0,0,0,.15)" stroke-width="2"/><rect x="18" y="52" width="24" height="24" rx="5" fill="#3B73C9"/><rect x="21" y="44" width="4" height="12" fill="#3B73C9"/><rect x="35" y="44" width="4" height="12" fill="#3B73C9"/><circle cx="23" cy="56" r="1.6" fill="#FFD23F"/><circle cx="37" cy="56" r="1.6" fill="#FFD23F"/>
 <rect x="6" y="46" width="9" height="22" rx="4.5" fill="#D9483B"/><rect x="45" y="46" width="9" height="22" rx="4.5" fill="#D9483B"/><circle cx="10" cy="68" r="4.5" fill="#F2C29B"/><circle cx="50" cy="68" r="4.5" fill="#F2C29B"/>
 <circle cx="30" cy="30" r="13" fill="#F2C29B"/><path d="M18 34Q30 50 42 34Q36 40 30 40 24 40 18 34Z" fill="#8A5A3A"/><circle cx="25" cy="29" r="1.8" fill="#222"/><circle cx="35" cy="29" r="1.8" fill="#222"/><ellipse cx="30" cy="33" rx="2.6" ry="2" fill="#E3A07A"/>
 <ellipse cx="30" cy="20" rx="24" ry="6" fill="#E8C35A"/><path d="M18 20Q18 6 30 6 42 6 42 20Z" fill="#F2D27A"/><path d="M18 17Q30 21 42 17" stroke="#C0392B" stroke-width="3" fill="none"/></svg>`;
const FM_TRUCK=`<svg viewBox="0 0 120 80"><ellipse cx="60" cy="72" rx="54" ry="7" fill="rgba(0,0,0,.22)"/><path d="M8 30H70V62H8Z" fill="#3B9AE1"/><path d="M8 30H70" stroke="#2373B4" stroke-width="3"/><path d="M12 34H66V44H12Z" fill="#E9C46A"/><path d="M14 26Q22 18 30 26M34 26Q42 18 50 26M52 26Q60 18 66 26" fill="#E9C46A"/><path d="M70 36H94L110 50V62H70Z" fill="#E0503F"/><path d="M76 40H92L102 50H76Z" fill="#BFE8FF"/><rect x="104" y="54" width="8" height="5" rx="2" fill="#FFE066"/><rect x="6" y="58" width="108" height="6" rx="3" fill="#555"/><circle cx="28" cy="64" r="9" fill="#2B2B2B"/><circle cx="28" cy="64" r="4" fill="#C9CED6"/><circle cx="92" cy="64" r="9" fill="#2B2B2B"/><circle cx="92" cy="64" r="4" fill="#C9CED6"/></svg>`;
function fTree(k){
  if(k==='p')return`<svg viewBox="0 0 60 100" class="fm-svg"><ellipse cx="30" cy="94" rx="20" ry="5" fill="rgba(0,0,0,.25)"/><rect x="26" y="74" width="8" height="20" fill="#7A4A2A"/><path d="M30 6L52 46H8Z" fill="#3E9B4F"/><path d="M30 26L56 66H4Z" fill="#33874A"/><path d="M30 46L58 82H2Z" fill="#2A7540"/><path d="M30 6L8 46H20ZM30 26L4 66H18ZM30 46L2 82H18Z" fill="rgba(255,255,255,.14)"/></svg>`;
  const fr=k==='f';return`<svg viewBox="0 0 70 100" class="fm-svg"><ellipse cx="35" cy="94" rx="22" ry="5" fill="rgba(0,0,0,.25)"/><path d="M31 94V62Q28 52 22 48M37 94V60Q42 52 48 50" stroke="#7A4A2A" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="22" cy="44" r="18" fill="url(#fmLeaf2)"/><circle cx="48" cy="44" r="18" fill="url(#fmLeaf2)"/><circle cx="35" cy="28" r="22" fill="url(#fmLeaf)"/><circle cx="35" cy="52" r="15" fill="url(#fmLeaf2)"/>${fr?[[22,40],[44,30],[36,50],[50,48],[28,24],[18,52]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.2" fill="#E53935"/><circle cx="${x-1.3}" cy="${y-1.3}" r="1.3" fill="#fff" opacity=".7"/>`).join(''):''}</svg>`}
const FM_HAYB=`<svg viewBox="0 0 60 44" class="fm-svg"><ellipse cx="30" cy="38" rx="27" ry="6" fill="rgba(0,0,0,.22)"/><path d="M6 14H46V36H6Z" fill="url(#fmHayG)"/><ellipse cx="46" cy="25" rx="9" ry="11" fill="#E7BE52"/><ellipse cx="46" cy="25" rx="5" ry="6.5" fill="none" stroke="#C99A2E" stroke-width="1.5"/><ellipse cx="6" cy="25" rx="9" ry="11" fill="#F3D372"/><path d="M14 14V36M34 14V36" stroke="#A8792A" stroke-width="2"/></svg>`;
// ---- أدوات ----
const fx=v=>v*FW+'px';
const fz=y=>Math.round(y*100)+10;
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
// ---- الأرض اللي ورا كل حاجة (نجيلة وطرق وبحيرة) ----
function fGround(){const H=FM_H*1000;let s=`<svg class="fm-ground" viewBox="0 0 1000 ${H}" preserveAspectRatio="none"><rect width="1000" height="${H}" fill="url(#fmLawn)"/>`;
  // أرض الغيط
  s+=`<path d="M500 ${(FM_PY-.12)*1000}L${(.5+3.5*FM_PA+.03)*1000} ${(FM_PY+1.75*FM_PA)*1000}L${(.5+.5*FM_PA)*1000} ${(FM_PY+3.25*FM_PA+.11)*1000}L${(.5-3.5*FM_PA-.06)*1000} ${(FM_PY+1.25*FM_PA+.03)*1000}Z" fill="#8BC660" stroke="#A9D97A" stroke-width="6" stroke-linejoin="round"/>`;
  const road=(pts,w)=>`<path d="M${pts.map(p=>p.join(' ')).join('L')}" stroke="#C99A5B" stroke-width="${w+10}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M${pts.map(p=>p.join(' ')).join('L')}" stroke="#E6C489" stroke-width="${w}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M${pts.map(p=>p.join(' ')).join('L')}" stroke="rgba(255,255,255,.25)" stroke-width="4" stroke-dasharray="2 22" fill="none" stroke-linecap="round"/>`;
  s+=road([[-20,710],[500,970],[1020,710]],34)+road([[-20,1760],[500,1505],[1020,1760]],30)+road([[-20,2010],[500,2265],[1020,2010]],26)+road([[500,970],[500,1505]],18);
  s+=road([[200,300],[440,420]],18);
  // شوية ورد وحشيش
  let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
  for(let i=0;i<70;i++){const x=rnd()*1000,y=rnd()*H,t=rnd();
    s+=t<.55?`<path d="M${x} ${y}l-4 -10M${x} ${y}l0 -13M${x} ${y}l4 -10" stroke="#4E9E36" stroke-width="2.6" stroke-linecap="round"/>`:`<circle cx="${x}" cy="${y}" r="4.5" fill="${['#FFF','#FFD23F','#FF7BA8','#B48CFF'][i%4]}"/><circle cx="${x}" cy="${y}" r="1.8" fill="#F4A100"/>`}
  // البحيرة
  s+=`<ellipse cx="740" cy="2150" rx="200" ry="92" fill="#C9B48A"/><ellipse cx="740" cy="2144" rx="186" ry="82" fill="url(#fmWater)"/><path d="M640 2120Q680 2110 720 2122M760 2170Q800 2160 830 2172" stroke="rgba(255,255,255,.6)" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s+=[[580,2110],[905,2165],[860,2075]].map(([x,y])=>`<path d="M${x} ${y}q-6 -30 -2 -40M${x+5} ${y}q4 -28 10 -36" stroke="#3E8A2E" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="${x-2}" cy="${y-38}" rx="3.5" ry="9" fill="#7A4A22"/>`).join('');
  return s+`</svg>`}
// ---- رسم الخريطة كلها ----
function fDraw(){
  $('#fmCoins').textContent=arDigits(F.coins);$('#fmLv').textContent=arDigits(F.lvl);
  $('#fmXP').style.width=(F.lvl>=FMAXLV?100:Math.min(100,F.xp/fNeed(F.lvl)*100))+'%';
  $('#fmTDot').hidden=!F.tasks.some(fCanDo);
  const w=$('#fmWorld');FW=Math.min(w.clientWidth||360,620);w.style.height=FW*FM_H+'px';w.style.setProperty('--u',FW/100+'px');
  const now=fNow(),dly=p=>`animation-delay:-${(now/1000)%p}s`;
  // حاجة واقفة على الأرض: x,y نقطة القاعدة، wd العرض، asp نسبة الارتفاع للعرض، base مكان القاعدة جوّه الصورة
  const stand=(x,y,wd,asp,base)=>`left:${fx(x-wd/2)};top:${fx(y-wd*asp*base)};width:${fx(wd)};z-index:${fz(y)}`;
  let h=FM_DEFS+fGround();
  FM_TREES.forEach(([x,y,k],i)=>{const wd=k==='p'?.1:.13,asp=k==='p'?100/60:100/70;h+=`<span class="fm-tree" style="${stand(x,y,wd,asp,.94)};${dly(5+i)}">${fTree(k)}</span>`});
  FM_HAY.forEach(([x,y])=>h+=`<span class="fm-hay" style="${stand(x,y,.08,44/60,.86)}">${FM_HAYB}</span>`);
  // البيت ولوحة الطلبات والمخزن
  h+=`<button class="fm-b" id="fmHouse" style="${stand(.2,.29,.3,130/120,.92)}">${FM_ART.house()}<em class="fm-lab">بيتي</em><span class="fm-smoke" style="${dly(3)}">💨</span></button>`;
  h+=`<button class="fm-b" id="fmBoard" style="${stand(.53,.27,.22,1,.9)}">${FM_ART.board()}<em class="fm-lab">الطلبات</em>${F.tasks.some(fCanDo)?'<span class="fm-bub ready">✅</span>':''}</button>`;
  h+=`<span class="fm-truck" style="${stand(.66,.35,.2,80/120,.85)}">${FM_TRUCK}</span>`;
  h+=`<button class="fm-b" id="fmSilo" style="${stand(.84,.33,.3,150/140,.88)}">${FM_ART.silo()}<em class="fm-lab">المخزن</em></button>`;
  // الأرض الزراعية
  const pw=FM_PHW*2,ph=pw*170/200;
  for(let i=0;i<FPLOT_MAX;i++){const[cx,cy]=fPlotXY(i),st=`left:${fx(cx-FM_PHW)};top:${fx(cy-FM_PHH-pw*.3)};width:${fx(pw)};height:${fx(ph)};z-index:${fz(cy)}`;
    if(i<F.plots.length){const p=F.plots[i];h+=`<button class="fm-plot" data-i="${i}" ${fPlotInner(p)} style="${st}">${fPlotSvg(p)}${fPlotBody(p)}</button>`}
    else if(i===F.plots.length)h+=`<button class="fm-plot buy" id="fmBuyPlot" style="${st}">${fSoil('buy')}<i class="fm-buyt"><b>🚧</b>أرض جديدة<br>🪙 ${arDigits(fPlotCost())}</i></button>`;
    else h+=`<span class="fm-plot wild" style="${st}">${fSoil('wild')}</span>`}
  // الحظاير
  for(const k in FM_PEN){const [cx,cy]=FM_PEN[k],b=FBLD[k],own=F.bld[k];
    h+=`<div class="fm-pen${own?'':' lock'}" data-k="${k}" style="left:${fx(cx-FM_PHW2)};top:${fx(cy-FM_PHH2)};width:${fx(FM_PHW2*2)};height:${fx(FM_PHH2*2)};z-index:${fz(cy-.06)}">${fPenSvg(k,!!own,0)}`;
    if(!own){h+=`<button class="fm-b fm-lockb" data-k="${k}" style="left:25%;top:-28%;width:50%">${FM_ART.lock()}<span class="fm-ghost">${b.e}</span><em class="fm-lab">${b.n}</em><span class="fm-sign">${b.lv>F.lvl?`🔒 مستوى ${arDigits(b.lv)}`:`🔨 🪙 ${arDigits(b.c)}`}</span></button></div>`;continue}
    h+=`<button class="fm-b fm-shed" data-k="${k}" style="left:2%;top:-52%;width:40%">${FM_ART[k]()}</button><em class="fm-penlab">${b.n}</em>`;
    const n=own.a.length,slots=[[64,40],[80,58],[44,60],[60,80]];
    own.a.forEach((a,j)=>{const[x,y]=slots[j],st=!a.t0?'hungry':fLeft(a.t0,b.t)>0?'busy':'ready';
      h+=`<button class="fm-an ${st}${k==='bees'?' bee':''}" data-k="${k}" data-j="${j}" style="left:${x}%;top:${y}%;z-index:${y};${dly(6+j)}"><span class="fm-ae" style="${dly(7+j*1.3)}">${FM_ANI[b.an]}</span>${st==='hungry'?`<span class="fm-bub feed">${FITEM(b.feed).e}</span>`:st==='busy'?fRing(a.t0,b.t):`<span class="fm-bub ready">${FPROD[b.out].e}</span>`}</button>`});
    if(n<b.max){const[x,y]=slots[n];h+=`<button class="fm-addan" data-k="${k}" style="left:${x}%;top:${y}%;z-index:${y}">＋${b.an}<small>🪙${arDigits(fAnCost(k))}</small></button>`}
    h+=fPenSvg(k,true,1)+`</div>`}
  // المصانع
  for(const k in FM_FAC){const[x,y]=FM_FAC[k],b=FBLD[k],own=F.bld[k],S=stand(x,y,.3,130/120,.92);
    if(!own){h+=`<button class="fm-b fm-lockb" data-k="${k}" style="${S}">${FM_ART.lock()}<span class="fm-ghost">${b.e}</span><em class="fm-lab">${b.n}</em><span class="fm-sign">${b.lv>F.lvl?`🔒 مستوى ${arDigits(b.lv)}`:`🔨 🪙 ${arDigits(b.c)}`}</span></button>`;continue}
    const st=!own.t0?'idle':fLeft(own.t0,b.t)>0?'busy':'ready';
    h+=`<button class="fm-b fm-fac ${st}" data-k="${k}" style="${S}">${FM_ART[k]()}<em class="fm-lab">${b.n}</em>${st==='busy'?`<span class="fm-smoke on" style="${dly(2)}">💨</span>${fRing(own.t0,b.t)}`:st==='ready'?`<span class="fm-bub ready">${FPROD[b.out].e}</span>`:''}</button>`}
  // البطة في البحيرة والسوق
  h+=`<span class="fm-duck" style="left:${fx(.66)};top:${fx(2.1)};z-index:${fz(2.12)};${dly(9)}">🦆</span>`;
  h+=`<button class="fm-b" id="fmStall" style="${stand(.3,2.18,.32,1,.95)}">${FM_ART.stall()}<em class="fm-lab">السوق</em></button>`;
  // الزينة
  F.deco.slice(0,FM_DECO.length).forEach((k,i)=>{const[x,y]=FM_DECO[i];h+=`<span class="fm-dc" style="left:${fx(x)};top:${fx(y)};z-index:${fz(y)};${dly(4+i)}">${FDECO[k].e}</span>`});
  // الفلاح ماشي على الطريق
  const P=(x,y)=>`${(x*FW).toFixed(1)} ${(y*FW).toFixed(1)}`;
  h+=`<span class="fm-farmer" style="offset-path:path('M${P(.04,.73)}L${P(.5,.968)}L${P(.5,1.5)}L${P(.96,1.73)}');width:${fx(.085)}"><span class="fm-fflip">${FM_FARMER}</span></span>`;
  w.innerHTML=h;
  // الأحداث
  $('#fmHouse').onclick=e=>{e.stopPropagation();fPop($('#fmHouse'),`<b>🏡 بيت المزرعة</b><p>مستوى المزرعة ${arDigits(F.lvl)} · خلّصت ${arDigits(F.done)} طلب</p>`)};
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
// ---- أرضية الحظيرة والسور (الورا تحت الحيوانات والقدّام فوقهم) ----
const FM_PENF={coop:['#E3C890','#CDAE70'],barn:['#7CC45A','#5FA545'],sheep:['#8BD468','#6DB94F'],bees:['#9BDA74','#7DC25C']};
function fPenSvg(k,own,front){
  const post=(x,y)=>`<rect x="${x-2.2}" y="${y-17}" width="4.4" height="18" rx="1.5" fill="#9C6630"/><rect x="${x-2.2}" y="${y-17}" width="2" height="18" fill="#C98A4B"/><path d="M${x-2.6} ${y-17}L${x} ${y-19.5} ${x+2.6} ${y-17}Z" fill="#7A4A22"/>`;
  const edge=(a,b,gap)=>{let s='';const n=7;for(let i=0;i<=n;i++){const t=i/n;if(gap&&t>.62&&t<.98)continue;s+=post(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t)}
    const seg=(t0,t1,dz)=>`<path d="M${a[0]+(b[0]-a[0])*t0} ${a[1]+(b[1]-a[1])*t0-dz}L${a[0]+(b[0]-a[0])*t1} ${a[1]+(b[1]-a[1])*t1-dz}" stroke="#B9773D" stroke-width="3.2" stroke-linecap="round"/>`;
    return(gap?seg(0,.62,6)+seg(0,.62,13):seg(0,1,6)+seg(0,1,13))+s};
  if(front)return own?`<svg class="fm-penf front" viewBox="0 0 200 100" preserveAspectRatio="none">${edge([0,50],[100,100],0)}${edge([200,50],[100,100],1)}</svg>`:'';
  const[c1,c2]=FM_PENF[k];
  if(!own)return`<svg class="fm-penf" viewBox="0 0 200 100" preserveAspectRatio="none"><path d="M100 2L198 50 100 98 2 50Z" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-dasharray="6 5"/></svg>`;
  let s=`<svg class="fm-penf" viewBox="0 0 200 100" preserveAspectRatio="none"><path d="M100 4L200 54 100 104 0 54Z" fill="rgba(0,0,0,.15)"/><path d="M100 0L200 50 100 100 0 50Z" fill="${c1}"/>`;
  let sd=k.length*13;const rnd=()=>(sd=(sd*9301+49297)%233280)/233280;
  for(let i=0;i<26;i++){const u=rnd()*2-1,v=rnd()*2-1;s+=`<ellipse cx="${100+(u-v)*42}" cy="${50+(u+v)*21}" rx="5" ry="2.4" fill="${c2}"/>`}
  if(k==='bees')s+=[[.1,.5],[-.4,.2],[.5,-.3],[.3,.6],[-.2,-.5]].map(([u,v],i)=>`<circle cx="${100+(u-v)*48}" cy="${50+(u+v)*24}" r="3" fill="${['#FFF','#FF7BA8','#FFD23F','#B48CFF','#fff'][i]}"/>`).join('');
  // معلف
  s+=`<path d="M128 70L148 60 156 64 136 74Z" fill="#7A4A22"/><path d="M130 70L148 61 154 64 136 73Z" fill="${k==='coop'?'#E9C46A':k==='bees'?'#7FD3F7':'#9ED36A'}"/>`;
  return s+edge([0,50],[100,0],0)+edge([100,0],[200,50],0)+`</svg>`}
// ---- قطعة الأرض: معيّن طين بخطوط ----
function fSoil(kind){
  if(kind==='buy')return`<svg class="fm-soil" viewBox="0 -60 200 170"><path d="M100 2L198 50 100 98 2 50Z" fill="rgba(255,255,255,.28)" stroke="#fff" stroke-width="3" stroke-dasharray="9 7"/></svg>`;
  if(kind==='wild')return`<svg class="fm-soil" viewBox="0 -60 200 170"><path d="M100 4L196 50 100 96 4 50Z" fill="#79B955" opacity=".55"/>${[[70,46],[120,40],[100,64],[140,56],[60,60]].map(([x,y])=>`<path d="M${x} ${y}l-5 -12M${x} ${y}l0 -15M${x} ${y}l5 -12" stroke="#4E9E36" stroke-width="3" stroke-linecap="round"/>`).join('')}</svg>`;
  let s=`<path d="M0 50L100 100 200 50V62L100 112 0 62Z" fill="#6A3F1A"/><path d="M100 100V112L200 62V50Z" fill="#52300F"/><path d="M100 0L200 50 100 100 0 50Z" fill="${kind==='wet'?'#6E4321':'#8F5C2E'}"/>`;
  for(let i=1;i<6;i++){const t=i/6;s+=`<path d="M${100*t+6} ${50-50*t+3}L${100+100*t-6} ${100-50*t-3}" stroke="${kind==='wet'?'#5A3416':'#74471F'}" stroke-width="7" stroke-linecap="round"/><path d="M${100*t+6} ${50-50*t+0}L${100+100*t-6} ${100-50*t-6}" stroke="rgba(255,220,170,.18)" stroke-width="2" stroke-linecap="round"/>`}
  return`<svg class="fm-soil" viewBox="0 -60 200 170">${s}</svg>`}
// ---- رسم النبات حسب نوعه ومرحلته ----
function fCropSvg(k,stg,x,y){const g=(c)=>`<g transform="translate(${x} ${y})">${c}</g>`;
  if(stg===0)return g(`<path d="M0 0Q-8 -10 -12 -8Q-6 -2 0 0Q8 -12 12 -10Q6 -2 0 0" fill="#6CCB45"/><path d="M0 0V-6" stroke="#4E9E36" stroke-width="2"/>`);
  if(k==='wheat'){const c=stg===3?'#F2C14E':stg===2?'#C9D35A':'#7CC64A',d=stg===3?'#C9962A':'#6BA53A';let s='';
    for(const a of[-10,-4,2,8]){s+=`<path d="M${a*.6} 0Q${a} -18 ${a*1.3} ${-26-Math.abs(a)%5}" stroke="${d}" stroke-width="2" fill="none"/>`;if(stg>1)s+=`<ellipse cx="${a*1.3}" cy="${-30-Math.abs(a)%5}" rx="3.2" ry="8" fill="${c}" transform="rotate(${a} ${a*1.3} ${-30-Math.abs(a)%5})"/>`}
    return g(s)}
  if(k==='corn'){let s=`<path d="M0 0V-44" stroke="#4E9E36" stroke-width="4"/><path d="M0 -14Q-16 -22 -20 -12M0 -24Q16 -34 20 -22M0 -36Q-12 -46 -16 -40" stroke="#5FB83E" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    if(stg>=2)s+=`<ellipse cx="5" cy="-30" rx="5" ry="10" fill="${stg===3?'#FFD23F':'#D8E27A'}"/><path d="M1 -22Q4 -36 9 -40" stroke="#7CC64A" stroke-width="3" fill="none"/>`;return g(s)}
  if(k==='sun'){let s=`<path d="M0 0V-38" stroke="#4E9E36" stroke-width="3.5"/><path d="M0 -14Q-12 -20 -14 -10M0 -22Q12 -28 14 -18" stroke="#5FB83E" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    if(stg===3)s+=[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="0" cy="-50" rx="4" ry="8" fill="#FFC928" transform="rotate(${a} 0 -42)"/>`).join('')+`<circle cx="0" cy="-42" r="7" fill="#7A4A22"/>`;
    else if(stg===2)s+=`<circle cx="0" cy="-41" r="6" fill="#8BC34A"/>`;return g(s)}
  // نباتات قصيرة: ورق أخضر وعليه الثمرة
  let s=`<ellipse cx="-7" cy="-7" rx="9" ry="6" fill="#4FA83A"/><ellipse cx="7" cy="-8" rx="9" ry="6" fill="#5FB83E"/><ellipse cx="0" cy="-14" rx="9" ry="7" fill="#6CCB45"/>`;
  if(stg>=2){const fr={carrot:`<path d="M-4 -2L0 10 4 -2Z" fill="#FF8A1F"/><path d="M-3 -2Q0 -20 3 -2" fill="#4FA83A"/>`,
      tomato:`<circle cx="-6" cy="-12" r="5" fill="#E53935"/><circle cx="6" cy="-16" r="5" fill="#E53935"/><circle cx="0" cy="-6" r="5" fill="#E53935"/>`,
      straw:`<path d="M-8 -8q4 9 8 0q-4 -3 -8 0" fill="#E53950"/><path d="M2 -12q4 9 8 0q-4 -3 -8 0" fill="#E53950"/>`,
      pumpkin:`<ellipse cx="0" cy="-6" rx="13" ry="9" fill="#FF8A1F"/><path d="M-5 -14Q-7 -6 -5 2M5 -14Q7 -6 5 2" stroke="#D96A0C" stroke-width="2" fill="none"/><rect x="-1.5" y="-18" width="3" height="5" fill="#4E7A22"/>`,
      melon:`<ellipse cx="0" cy="-7" rx="14" ry="9" fill="#3E9B3E"/><path d="M-10 -12Q0 -16 10 -12M-12 -6Q0 -10 12 -6M-10 -1Q0 -4 10 -1" stroke="#9BDA74" stroke-width="2" fill="none"/>`}[k]||'';
    s+=stg===2?`<g opacity=".6" transform="scale(.75)">${fr}</g>`:fr}
  return g(s)}
function fPlotSvg(p){if(!p.c)return fSoil('dry');const st=fStage(p),stg=st.pr>=1?3:st.pr<.34?0:st.pr<.7?1:2;
  let s=fSoil(p.w?'wet':'dry').replace('</svg>','');
  const pts=[];for(const u of[-1,0,1])for(const v of[-1,0,1])pts.push([100+(u-v)*48,50+(u+v)*24]);pts.sort((a,b)=>a[1]-b[1]);
  pts.forEach(([x,y])=>s+=fCropSvg(p.c,stg,x,y+4));
  return s+`</svg>`}
function fPlotInner(p){if(!p.c)return'data-s="-1"';const st=fStage(p);return`data-s="${st.pr>=1?3:st.pr<.34?0:st.pr<.7?1:2}"`}
function fPlotBody(p){
  if(!p.c)return`<span class="fm-empty">＋</span>`;
  const cr=FCROP[p.c],st=fStage(p);
  if(st.pr>=1)return`<span class="fm-bub ready sm">${cr.e}</span>`;
  return`${p.w?'':'<span class="fm-drop">💧</span>'}${fRing(p.t0,cr.t)}`;
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
