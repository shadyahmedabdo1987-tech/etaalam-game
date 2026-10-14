
/* ---------- الرياضيات: جمع وطرح وضرب وقسمة، عربي وإنجليزي ---------- */
const MA_U=['صِفْر','واحِد','اِتْنِين','تَلاتَة','أَرْبَعَة','خَمْسَة','سِتَّة','سَبْعَة','تَمانْيَة','تِسْعَة','عَشَرَة','حِداشَر','اِتْناشَر','تَلَتّاشَر','أَرْبَعْتاشَر','خَمَسْتاشَر','سِتّاشَر','سَبَعْتاشَر','تَمَنْتاشَر','تِسَعْتاشَر'];
const MA_T=['','','عِشْرِين','تَلاتِين','أَرْبِعِين','خَمْسِين','سِتِّين','سَبْعِين','تَمانِين','تِسْعِين'];
const maW=s=>'وِ'+s.replace(/^اِ/,'ا');
function maAr(n){
  if(n<20)return MA_U[n];
  if(n<100){const t=Math.floor(n/10),u=n%10;return u?`${MA_U[u]} ${maW(MA_T[t])}`:MA_T[t]}
  if(n===100)return 'مِيَّة';
  return 'مِيَّة '+maW(maAr(n-100));
}
const EN_U=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const EN_T=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function maEn(n){
  if(n<20)return EN_U[n];
  if(n<100){const t=Math.floor(n/10),u=n%10;return EN_T[t]+(u?'-'+EN_U[u]:'')}
  return 'one hundred'+(n>100?' and '+maEn(n-100):'');
}
const maCap=s=>s[0].toUpperCase()+s.slice(1);
// العمليات: لكل رقم جدول من ١٠ مسائل (الضرب لحد ١٢)
const MA_OPS={
 add:{n:'الجمع',e:'➕',sym:'+',max:10,c1:'#7CC3FF',c2:'#2F8FE6',cd:'#1E6CB3',
  facts:n=>Array.from({length:10},(_,k)=>[n,k+1,n+k+1]),
  ar:(a,b,c)=>`${maAr(a)} زائِد ${maAr(b)} يِساوِي ${maAr(c)}.`, en:(a,b,c)=>`${maCap(maEn(a))} plus ${maEn(b)} equals ${maEn(c)}.`},
 sub:{n:'الطرح',e:'➖',sym:'−',max:10,c1:'#FF9A88',c2:'#FF5A45',cd:'#C63E2C',
  facts:n=>Array.from({length:10},(_,k)=>[n+k+1,n,k+1]),
  ar:(a,b,c)=>`${maAr(a)} ناقِص ${maAr(b)} يِساوِي ${maAr(c)}.`, en:(a,b,c)=>`${maCap(maEn(a))} minus ${maEn(b)} equals ${maEn(c)}.`},
 mul:{n:'الضرب',e:'✖️',sym:'×',max:12,c1:'#D59BFF',c2:'#9B4DE0',cd:'#6E2BAE',
  facts:n=>Array.from({length:12},(_,k)=>[n,k+1,n*(k+1)]),
  ar:(a,b,c)=>`${maAr(a)} فِي ${maAr(b)} يِساوِي ${maAr(c)}.`, en:(a,b,c)=>`${maCap(maEn(a))} times ${maEn(b)} equals ${maEn(c)}.`},
 div:{n:'القسمة',e:'➗',sym:'÷',max:10,c1:'#4FE0C9',c2:'#11A893',cd:'#0B7A6B',
  facts:n=>Array.from({length:10},(_,k)=>[n*(k+1),n,k+1]),
  ar:(a,b,c)=>`${maAr(a)} عَلَى ${maAr(b)} يِساوِي ${maAr(c)}.`, en:(a,b,c)=>`${maCap(maEn(a))} divided by ${maEn(b)} equals ${maEn(c)}.`}
};
const MA_SAY={
 home:['يَلَّا نِتْعَلِّم الرِّياضِيّات! اِخْتار: الجَمْع، وَلّا الطَّرْح، وَلّا الضَّرْب، وَلّا القِسْمَة.','يَلَّا نِتْعَلِّم الرِّياضِيّات! اِخْتارِي: الجَمْع، وَلّا الطَّرْح، وَلّا الضَّرْب، وَلّا القِسْمَة.'],
 add:'الجَمْع يَعْنِي نِحُطّ الحاجات عَلَى بَعْض، فَتِكْتَر.',
 sub:'الطَّرْح يَعْنِي نِشِيل حاجات، فَتِقِلّ.',
 mul:'الضَّرْب يَعْنِي نِجْمَع نَفْس الرَّقَم كَذا مَرَّة.',
 div:'القِسْمَة يَعْنِي نِوَزَّع الحاجات عَلَى بَعْض بِالتَّساوِي.',
 pick:['اِخْتار الرَّقَم اللِّي عايِز تِتْعَلِّم جَدْوَلُه، أَوْ دُوس اِخْتَبِر نَفْسَك.','اِخْتارِي الرَّقَم اللِّي عايْزَة تِتْعَلِّمِي جَدْوَلُه، أَوْ دُوسِي اِخْتَبِرِي نَفْسِك.'],
 table:['دُوس عَلَى أَيّ مَسْأَلَة عَشان تِسْمَعْها، أَوْ دُوس اِسْمَع الجَدْوَل كُلُّه.','دُوسِي عَلَى أَيّ مَسْأَلَة عَشان تِسْمَعِيها، أَوْ دُوسِي اِسْمَعِي الجَدْوَل كُلُّه.'],
 enq:'What is the answer?',
 done:['بْرافُو! خَلَّصْت الاِخْتِبار، وِكِسِبْت أَلْعاب الجَوايِز!','بْرافُو! خَلَّصْتِي الاِخْتِبار، وِكِسِبْتِي أَلْعاب الجَوايِز!'],
 again:['خَلَّصْت الاِخْتِبار! يَلَّا نِحاوِل تانِي عَشان تِجِيب الدَّرَجَة النِّهائِيَّة.','خَلَّصْتِي الاِخْتِبار! يَلَّا نِحاوِل تانِي عَشان تِجِيبِي الدَّرَجَة النِّهائِيَّة.']
};
const MA={op:'add',n:1,lang:'ar',q:null,qi:0,ok:0,miss:0,list:[],play:0};
const maSay=(f)=>MA.lang==='en'?MA_OPS[MA.op].en(...f):MA_OPS[MA.op].ar(...f);
function maEnsure(){
  if($('#sMath'))return;
  const s=document.createElement('section');s.className='screen';s.id='sMath';s.hidden=true;
  s.innerHTML=`<div class="ma-lang"><button data-l="ar">عربي</button><button data-l="en">English</button></div>
   <div id="maBody" class="ma-body"></div>`;
  $('#main').appendChild(s);SCREENS.math='#sMath';
  s.querySelectorAll('.ma-lang button').forEach(b=>b.onclick=()=>{MA.lang=b.dataset.l;pset('maLang',MA.lang);maLangPaint();tone([660],'sine',.05);if(MA.view==='table')maTable(MA.n,true);else if(MA.view==='quiz'){const f=MA.q;maQPaint()}});
}
function maLangPaint(){document.querySelectorAll('.ma-lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===MA.lang))}
const maNum=n=>MA.lang==='en'?String(n):arDigits(n);
function goMath(){
  maEnsure();MA.lang=pget('maLang','ar');MA.view='home';MA.play++;show('math');maLangPaint();
  $('#maBody').innerHTML=`<div class="appgrid">${Object.entries(MA_OPS).map(([k,o],i)=>`<button class="appicon" data-op="${k}" style="--c1:${o.c1};--c2:${o.c2};--cd:${o.cd};--d:${i*.4}s"><span class="float"><span class="ico tilt"><span class="em ma-op">${o.sym}</span><i class="gloss"></i><i class="shine"></i></span></span><span class="lbl">${o.n}</span></button>`).join('')}</div>`;
  $('#maBody').querySelectorAll('[data-op]').forEach(b=>b.onclick=()=>maOp(b.dataset.op));
  speak([{say:gs(MA_SAY.home)}]);
}
function maOp(op,back){
  MA.op=op;MA.view='op';MA.play++;const o=MA_OPS[op];
  $('#title').textContent=o.n;
  $('#maBody').innerHTML=`<p class="sec-title">اختار الجدول</p><div class="ma-nums">${Array.from({length:o.max},(_,i)=>`<button style="--c:${o.c2};--cd:${o.cd}" data-n="${i+1}">${maNum(i+1)}</button>`).join('')}</div>
   <button class="btn2 c-sun ma-quizb" id="maQuizAll">🎯 اختبر نفسك في ${o.n}</button>`;
  $('#maBody').querySelectorAll('.ma-nums button').forEach(b=>b.onclick=()=>maTable(+b.dataset.n));
  $('#maQuizAll').onclick=()=>maQuiz(0);
  if(!back)speak([{say:MA_SAY[op]},{say:gs(MA_SAY.pick)}]);
}
function maVisual(f){ // صورة بسيطة للمسائل الصغيرة
  const op=MA.op,[a,b,c]=f,E='🍎';
  if(op==='add'&&c<=12)return `<div class="ma-vis"><span>${E.repeat(a)}</span><b>+</b><span>${'🍐'.repeat(b)}</span></div>`;
  if(op==='sub'&&a<=12)return `<div class="ma-vis"><span>${E.repeat(c)}<s>${E.repeat(b)}</s></span></div>`;
  if(op==='mul'&&c<=24)return `<div class="ma-vis grid">${Array.from({length:a},()=>`<span>${'⭐'.repeat(b)}</span>`).join('')}</div>`;
  if(op==='div'&&a<=24)return `<div class="ma-vis grid">${Array.from({length:b},()=>`<span>${'🍬'.repeat(c)}</span>`).join('')}</div>`;
  return '';
}
function maFact(f){const o=MA_OPS[MA.op];return `<span class="ma-eq" dir="ltr">${maNum(f[0])} <i>${o.sym}</i> ${maNum(f[1])} <i>=</i> <b>${maNum(f[2])}</b></span>`}
function maTable(n,quiet){
  MA.n=n;MA.view='table';MA.play++;const o=MA_OPS[MA.op];MA.list=o.facts(n);
  $('#title').textContent=`جدول ${o.n} ${arDigits(n)}`;
  $('#maBody').innerHTML=`<div class="ma-rows">${MA.list.map((f,i)=>`<button class="ma-row" data-i="${i}">${maFact(f)}<span class="ma-spk">🔊</span></button>`).join('')}</div>
   <div class="row ma-btns"><button class="btn2 c-teal" id="maPlay">▶️ اسمع الجدول كله</button><button class="btn2 c-sun" id="maQuizN">🎯 اختبرني في الجدول ده</button></div>`;
  $('#maBody').querySelectorAll('.ma-row').forEach(b=>b.onclick=()=>{MA.play++;maHl(+b.dataset.i);speak([{say:maSay(MA.list[+b.dataset.i])}]).then(()=>maHl(-1))});
  $('#maPlay').onclick=maPlayAll;$('#maQuizN').onclick=()=>maQuiz(n);
  if(!quiet)speak([{say:gs(MA_SAY.table)}]);
}
function maHl(i){document.querySelectorAll('.ma-row').forEach((r,k)=>r.classList.toggle('on',k===i));const r=document.querySelector(`.ma-row[data-i="${i}"]`);if(r)r.scrollIntoView({block:'nearest',behavior:'smooth'})}
async function maPlayAll(){
  const tok=++MA.play;
  for(let i=0;i<MA.list.length;i++){if(tok!==MA.play||S.screen!=='math')return;maHl(i);await speak([{say:maSay(MA.list[i])}]);await new Promise(r=>setTimeout(r,250))}
  if(tok===MA.play)maHl(-1);
}
function maQuiz(n){
  MA.view='quiz';MA.play++;MA.qn=n;MA.qi=0;MA.ok=0;MA.miss=0;MA.seen=new Set();maNext();
}
function maPick(){
  const o=MA_OPS[MA.op];let f,guard=0;
  do{const n=MA.qn||1+Math.floor(Math.random()*o.max);f=pick(o.facts(n))}while(MA.seen.has(f.join())&&guard++<50);
  MA.seen.add(f.join());return f;
}
function maNext(){
  const f=maPick();MA.q=f;MA.locked=false;
  const s=new Set([f[2]]);let g=0;while(s.size<4&&g++<200){const d=f[2]+(Math.floor(Math.random()*7)-3)*(Math.random()<.5?1:(MA.op==='mul'?f[0]:1));if(d>=0&&d!==f[2])s.add(d)}
  MA.opts=shuffle([...s]);maQPaint();
  speak([{say:MA.lang==='en'?MA_SAY.enq:gs(IQ_SAY.math)}]);
}
function maQPaint(){
  const f=MA.q,o=MA_OPS[MA.op];$('#title').textContent=`اختبار ${o.n}`;
  $('#maBody').innerHTML=`<div class="ma-prog">${Array.from({length:10},(_,i)=>`<i class="${i<MA.qi?'on':i===MA.qi?'cur':''}"></i>`).join('')}</div>
   <div class="ma-qcard"><span class="ma-eq big" dir="ltr">${maNum(f[0])} <i>${o.sym}</i> ${maNum(f[1])} <i>=</i> <b>؟</b></span>${maVisual(f)}</div>
   <div class="ma-opts">${MA.opts.map((v,i)=>`<button class="opt" data-v="${v}">${maNum(v)}</button>`).join('')}</div>`;
  $('#maBody').querySelectorAll('.ma-opts .opt').forEach(b=>b.onclick=()=>maAns(b));
}
function maAns(b){
  if(MA.locked||b.disabled)return;const f=MA.q,v=+b.dataset.v;
  if(v===f[2]){
    MA.locked=true;b.classList.add('ok');ding();confetti(b);MA.ok++;S.stars++;pset('stars',S.stars);$('#starTotal').textContent=arDigits(S.stars);
    document.querySelectorAll('.ma-opts .opt').forEach(x=>x.disabled=true);
    $('.ma-qcard .ma-eq b').textContent=maNum(f[2]);
    speak([{say:maSay(f)}]).then(()=>{if(MA.q!==f||S.screen!=='math')return;MA.qi++;if(MA.qi>=10)maDone();else maNext()});
  }else{
    MA.miss++;b.classList.add('no');b.disabled=true;boop();b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');
    speak([pick([{say:g('قَرَّبْت! فَكَّر تانِي.','قَرَّبْتِي! فَكَّرِي تانِي.')},{say:g('لَأ يا حَبِيبِي، جَرَّب تانِي.','لَأ يا حَبِيبْتِي، جَرَّبِي تانِي.')}])]);
  }
}
function maDone(){
  const good=MA.miss<=3,stars=MA.miss===0?3:MA.miss<=3?2:1;
  if(good)S.raceRuns=Math.max(S.raceRuns||0,3);
  const ov=document.createElement('div');ov.className='iqdone';
  ov.innerHTML=`<div class="card"><p class="k">اختبار ${MA_OPS[MA.op].n}</p><div class="stars3">${[0,1,2].map(i=>`<span class="${i<stars?'on':''}" style="animation-delay:${.25+i*.3}s">★</span>`).join('')}</div><p class="m">${stars===3?'ممتاز! من غير ولا غلطة':stars===2?'شاطر جدًا!':'برافو! كمّل تمرين'}</p>${good?'<button class="go ma-games">🎁 العب ألعاب الجوايز</button>':''}<button class="go ma-again" style="margin-top:10px;background:linear-gradient(180deg,#7CC3FF,#2F8FE6);box-shadow:0 6px 0 #1E6CB3">🔁 اختبار تاني</button></div>`;
  document.body.appendChild(ov);ding();setTimeout(()=>confetti(ov.querySelector('.stars3')),500);
  speak([{say:gs(good?MA_SAY.done:MA_SAY.again)}]);
  const gb=ov.querySelector('.ma-games');if(gb)gb.onclick=()=>{ov.remove();openGames()};
  ov.querySelector('.ma-again').onclick=()=>{ov.remove();maQuiz(MA.qn)};
}
function maBack(){
  MA.play++;
  if(MA.view==='table'||MA.view==='quiz'){maOp(MA.op,true);return}
  if(MA.view==='op'){goMath();return}
  goHome();
}
