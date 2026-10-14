
/* ---------- الأقسام التعليمية الجديدة: محرّك مشترك (شاشة واحدة بمكدّس رجوع) ---------- */
const LN={stack:[],sec:null,q:null};
const LN_SEC={
 read:{n:'القراءة',home:()=>rdHome()},dict:{n:'الإملاء',home:()=>dcHome()},wor:{n:'العبادات',home:()=>wrHome()},
 sci:{n:'اكتشف العالم',home:()=>scHome()},life:{n:'مهارات الحياة',home:()=>lfHome()},eng:{n:'English Words',home:()=>enHome()},
 egy:{n:'مصر والعالم',home:()=>egHome()},think:{n:'ألعاب التفكير',home:()=>thHome()},parent:{n:'ركن الأهل',home:()=>prHome()}
};
function lnEnsure(){
  if($('#sLearn'))return;
  const s=document.createElement('section');s.className='screen';s.id='sLearn';s.hidden=true;
  s.innerHTML='<div id="lnBody" class="ln-body"></div>';$('#main').appendChild(s);SCREENS.learn='#sLearn';
}
function lnOpen(sec){lnEnsure();LN.sec=sec;LN.stack=[];LN.q=null;show('learn');lnGo(LN_SEC[sec].home);dlTouch(sec)}
function lnGo(fn){LN.stack.push(fn);LN.q=null;LN.back=false;fn(false)}
function lnBack(){LN.stack.pop();LN.q=null;const f=LN.stack[LN.stack.length-1];LN.back=true;if(f)f(true);else goHome();LN.back=false}
const lnT=t=>{$('#title').textContent=t};
function lnB(h){const b=$('#lnBody');b.innerHTML=h;$('#main').scrollTop=0;return b}
const lnP=a=>(Array.isArray(a)?a:[a]).map(p=>typeof p==='string'?{say:p}:p);
const lnSay=(...a)=>speak(a.flatMap(lnP));
const lnIntro=(...a)=>{if(!LN.back)lnSay(...a)};
const lnEsc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function lnTiles(list,cls=''){
  return `<div class="appgrid ${cls}">${list.map((t,i)=>`<button class="appicon" data-t="${i}" style="--c1:${t.c1};--c2:${t.c2};--cd:${t.cd};--d:${(i%6)*.35}s"><span class="float"><span class="ico tilt">${t.ico||`<span class="em">${t.e}</span>`}<i class="gloss"></i><i class="shine"></i></span></span><span class="lbl">${t.n}${t.sub?`<small class="ln-sub">${t.sub}</small>`:''}</span></button>`).join('')}</div>`;
}
function lnBindTiles(b,list){b.querySelectorAll('[data-t]').forEach(x=>x.onclick=()=>{tone([660],'sine',.05);list[+x.dataset.t].go()})}
const LN_COL=[['#FF9A88','#FF5A45','#C63E2C'],['#4FE0C9','#11A893','#0B7A6B'],['#7CC3FF','#2F8FE6','#1E6CB3'],['#FFD36B','#E39E12','#A87206'],['#D59BFF','#9B4DE0','#6E2BAE'],['#8EE57F','#3FAE4F','#2A7F37'],['#FF9CC8','#F25C9A','#C22E6E'],['#FFB36B','#F2760F','#B25200']];
const lnCol=(i,o)=>{const c=LN_COL[i%LN_COL.length];return Object.assign({c1:c[0],c2:c[1],cd:c[2]},o)};
const lnStarsOf=k=>pget('lnStars',{})[k]||0;
const lnStarTxt=k=>{const s=lnStarsOf(k);return s?'★'.repeat(s)+'☆'.repeat(3-s):''};
function lnPraise(){return pick([
  {say:g('بْرافُو يا بَطَل!','بْرافُو يا بَطَلَة!')},{say:g('شاطِر أَوِي!','شاطْرَة أَوِي!')},
  {say:g('صَحّ! عاش يا بَطَل!','صَحّ! عاش يا بَطَلَة!')},{say:g('مُمْتاز يا حَبِيبِي!','مُمْتاز يا حَبِيبْتِي!')},
  {say:g('هايِل! كَمِّل كِدَه.','هايْلَة! كَمِّلِي كِدَه.')}])}
function lnOops(){return pick([
  {say:g('لَأ يا حَبِيبِي، حاوِل تانِي.','لَأ يا حَبِيبْتِي، حاوْلِي تانِي.')},
  {say:g('قَرَّبْت! جَرَّب تانِي.','قَرَّبْتِي! جَرَّبِي تانِي.')},
  {say:g('مِش دَه، بَسّ إِنْتَ شاطِر، دَوَّر تانِي.','مِش دَه، بَسّ إِنْتِي شاطْرَة، دَوَّرِي تانِي.')}])}
const LN_SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9Z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>';
/* حفظ النجوم + مكافأة + متابعة ولي الأمر */
function lnSave(key,st){
  const P=pget('lnStars',{});P[key]=Math.max(P[key]||0,st);pset('lnStars',P);
  S.stars+=st;pset('stars',S.stars);$('#starTotal').textContent=arDigits(S.stars);
  const L=pget('lnLog',[]);L.push({k:key,s:st,d:dlToday()});pset('lnLog',L.slice(-300));
  dlMark(LN.sec);
}
function lnFinish(key,miss,again){
  const st=miss===0?3:miss<=2?2:1;lnSave(key,st);S.raceRuns=Math.max(S.raceRuns||0,3);
  const ov=document.createElement('div');ov.className='iqdone';
  ov.innerHTML=`<div class="card"><p class="k">${lnEsc(LN_SEC[LN.sec]?LN_SEC[LN.sec].n:'')}</p><div class="stars3">${[0,1,2].map(i=>`<span class="${i<st?'on':''}" style="animation-delay:${i*.18}s">★</span>`).join('')}</div><p class="m">${g('برافو! كسبت','برافو! كسبتي')} ${arDigits(st)} ${st===1?'نجمة':'نجوم'}</p><button class="go">🎁 العب ألعاب الجوايز</button>${again?'<button class="go ln-again">🔁 مرة كمان</button>':''}<button class="go ln-back">رجوع</button></div>`;
  document.body.appendChild(ov);ding();setTimeout(()=>confetti(ov.querySelector('.m')),300);
  ov.querySelector('.go').onclick=()=>{ov.remove();openGames()};
  const a=ov.querySelector('.ln-again');if(a)a.onclick=()=>{ov.remove();again()};
  ov.querySelector('.ln-back').onclick=()=>{ov.remove();lnBack()};
  speak([{say:gs(LN_SAY.done)}]);
}
/* محرّك الأسئلة: q = {top, say[], opts:[{h,ok}], okSay[], cls} */
function lnQuiz(cfg){
  LN.q={cfg,i:0,miss:0,tok:Math.random()};
  lnB(`<div class="ln-quiz"><div class="ln-dots" id="lnDots"></div><div class="ln-top" id="lnTop"></div><div class="ln-opts" id="lnOpts"></div></div>`);
  if(cfg.title)lnT(cfg.title);
  lnQShow(cfg.intro?lnP(cfg.intro):[{say:LN_SAY.quizStart}]);
}
function lnQShow(pre=[]){
  const Q=LN.q,cfg=Q.cfg,q=cfg.qs[Q.i];Q.cur=q;q.locked=false;
  $('#lnDots').innerHTML=cfg.qs.map((_,i)=>`<i class="${i<Q.i?'on':i===Q.i?'cur':''}"></i>`).join('');
  $('#lnTop').innerHTML=`${q.top||''}<button class="ln-listen" id="lnListen">${LN_SPK}<span>اسمع السؤال</span></button>`;
  $('#lnListen').onclick=()=>lnSay(q.say);
  const box=$('#lnOpts');box.className='ln-opts '+(q.cls||'');
  box.innerHTML=q.opts.map((o,i)=>`<button class="ln-opt" data-i="${i}">${o.h}</button>`).join('');
  box.querySelectorAll('.ln-opt').forEach(b=>b.onclick=()=>lnQAns(b,q.opts[+b.dataset.i],q));
  if(q.after)q.after($('#lnTop'));
  speak([...pre,...lnP(q.say)]);
}
function lnQAns(b,o,q){
  const Q=LN.q;if(!Q||q.locked||b.disabled)return;
  if(o.ok){
    q.locked=true;b.classList.add('ok');ding();confetti(b);
    document.querySelectorAll('#lnOpts .ln-opt').forEach(x=>x.disabled=true);
    const my=Q;speak([lnPraise(),...lnP(q.okSay||[])]).then(()=>{
      if(LN.q!==my)return;Q.i++;
      if(Q.i>=Q.cfg.qs.length){LN.q=null;lnFinish(Q.cfg.key,Q.miss,Q.cfg.again)}else lnQShow();
    });
  }else{
    Q.miss++;b.classList.add('no');b.disabled=true;boop();b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');
    speak([lnOops(),...lnP(q.say)]);
  }
}
/* كروت التعلّم: items = {h, t, say[]} */
function lnCards(o){
  lnT(o.title);
  const b=lnB(`${o.head||''}<div class="ln-cards ${o.cls||''}">${o.items.map((it,i)=>`<button class="ln-card" data-i="${i}" style="${it.st||''}"><span class="ln-ce">${it.h}</span><span class="ln-ct">${it.t}</span>${it.sub?`<small>${it.sub}</small>`:''}</button>`).join('')}</div>
   ${o.quiz?`<button class="btn2 c-sun ln-big" id="lnQz">🎯 اختبر نفسك ${o.qkey?`<small>${lnStarTxt(o.qkey)}</small>`:''}</button>`:''}${o.more||''}`);
  b.querySelectorAll('.ln-card').forEach(c=>c.onclick=()=>{const it=o.items[+c.dataset.i];c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop');lnSay(it.say)});
  const z=$('#lnQz');if(z)z.onclick=()=>lnGo(()=>o.quiz());
  if(o.onReady)o.onReady(b);
  return b;
}
/* رتّب بالترتيب الصح: items بالترتيب = {h, t, say?} */
function lnOrder(o){
  lnT(o.title);let nxt=0,miss=0;
  const idx=shuffle(o.items.map((_,i)=>i));
  const b=lnB(`<p class="ln-instr">${lnEsc(o.instr||'رتّب بالترتيب الصح')}</p><div class="ln-slots">${o.items.map((_,i)=>`<div class="ln-slot" data-s="${i}"><b>${arDigits(i+1)}</b></div>`).join('')}</div>
   <div class="ln-pool">${idx.map(i=>`<button class="ln-pc" data-i="${i}"><span>${o.items[i].h}</span>${o.items[i].t?`<small>${lnEsc(o.items[i].t)}</small>`:''}</button>`).join('')}</div>`);
  b.querySelectorAll('.ln-pc').forEach(p=>p.onclick=()=>{
    const i=+p.dataset.i;
    if(i===nxt){
      const sl=b.querySelector(`[data-s="${i}"]`);sl.innerHTML=`<span>${o.items[i].h}</span>`;sl.classList.add('fill');p.classList.add('used');p.disabled=true;tone([784],'sine',.07);nxt++;
      if(nxt>=o.items.length){ding();confetti(sl);speak([{say:LN_SAY.orderOk}]).then(()=>{if(S.screen==='learn')lnFinish(o.key,miss,o.again)})}
      else if(o.items[i].say)lnSay(o.items[i].say);
    }else{miss++;boop();p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake');speak([{say:LN_SAY.orderNo}])}
  });
  speak(lnP(o.intro||[{say:o.instrSay||WR_SAY.orderQ}]));
}
/* عارض الخطوات (الوضوء/الصلاة/القصص) */
function lnSteps(o){
  lnT(o.title);let i=0;
  const b=lnB(`<div class="ln-step" id="lnStep" style="background:${o.bg||'linear-gradient(160deg,#E9E4FF,#B9ACFF)'}"></div><p class="ln-stxt" id="lnStxt"></p>
   <div class="ln-sbtns"><button class="btn2 c-sky" id="lnPrev">▶ السابق</button><button class="btn2 c-teal" id="lnNext">التالي ◀</button></div><div id="lnEnd"></div>`);
  const paint=()=>{
    const s=o.steps[i];
    $('#lnStep').innerHTML=`<span class="ln-sn">${arDigits(i+1)} / ${arDigits(o.steps.length)}</span><span class="ln-se">${s.h}</span>${s.t?`<b>${lnEsc(s.t)}</b>`:''}`;
    $('#lnStxt').textContent=plain(s.say);$('#lnPrev').disabled=i===0;
    $('#lnNext').textContent=i===o.steps.length-1?(o.endLbl||'خلصت ✔'):'التالي ◀';
    const st=$('#lnStep');st.classList.remove('in');void st.offsetWidth;st.classList.add('in');
    lnSay(s.say);
  };
  $('#lnPrev').onclick=()=>{if(i>0){i--;paint()}};
  $('#lnNext').onclick=()=>{if(i<o.steps.length-1){i++;paint()}else{dlMark(LN.sec);o.onEnd&&o.onEnd($('#lnEnd'))}};
  if(o.intro)speak(lnP(o.intro)).then(r=>{if(r&&S.screen==='learn')paint()});else paint();
  if(o.intro){const s=o.steps[0];$('#lnStep').innerHTML=`<span class="ln-sn">${arDigits(1)} / ${arDigits(o.steps.length)}</span><span class="ln-se">${s.h}</span>${s.t?`<b>${lnEsc(s.t)}</b>`:''}`;$('#lnStxt').textContent=plain(s.say);$('#lnPrev').disabled=true}
}
/* تركيب الكلمة بالحروف (القراءة والإملاء) */
function lnWordGame(o){ // o:{key,title,words,showPic,intro}
  lnT(o.title);let wi=0,miss=0;
  const play=()=>{
    const w=o.words[wi];let nx=0,pic=o.showPic;
    const extra=shuffle(RD_LET.filter(l=>!w.s.includes(l))).slice(0,w.s.length>3?2:3);
    const bank=shuffle([...w.s.map((l,i)=>({l,i})),...extra.map(l=>({l,i:-1}))]);
    const b=lnB(`<div class="ln-dots">${o.words.map((_,i)=>`<i class="${i<wi?'on':i===wi?'cur':''}"></i>`).join('')}</div>
     <div class="ln-wpic" id="lnWpic">${pic?w.e:'<span class="ln-q">؟</span>'}</div>
     <div class="ln-wrow"><button class="ln-listen sm" id="lnHear">${LN_SPK}<span>اسمع</span></button>${pic?'':'<button class="ln-listen sm" id="lnHint">💡<span>مساعدة</span></button>'}</div>
     <div class="ln-wslots">${w.s.map((_,i)=>`<span class="ln-ws" data-s="${i}"></span>`).join('')}</div>
     <div class="ln-wfull" id="lnWfull"></div>
     <div class="ln-bank">${bank.map((x,j)=>`<button class="ln-lt" data-j="${j}">${x.l}</button>`).join('')}</div>`);
    $('#lnHear').onclick=()=>lnSay({say:w.w});
    const h=$('#lnHint');if(h)h.onclick=()=>{$('#lnWpic').innerHTML=w.e;h.disabled=true};
    b.querySelectorAll('.ln-lt').forEach(t=>t.onclick=()=>{
      const x=bank[+t.dataset.j];
      if(x.l===w.s[nx]){
        const sl=b.querySelector(`[data-s="${nx}"]`);sl.textContent=x.l;sl.classList.add('fill');t.disabled=true;t.classList.add('used');tone([660+nx*60],'sine',.06);nx++;
        if(nx>=w.s.length){
          $('#lnWfull').textContent=w.w;$('#lnWpic').innerHTML=w.e;ding();confetti($('#lnWfull'));
          b.querySelectorAll('.ln-lt').forEach(z=>z.disabled=true);
          speak([lnPraise(),{say:w.w}]).then(r=>{if(!r||S.screen!=='learn')return;wi++;if(wi>=o.words.length)lnFinish(o.key,miss,o.again);else play()});
        }
      }else{miss++;boop();t.classList.remove('shake');void t.offsetWidth;t.classList.add('shake');speak([{say:RD_SAY.wrongLetter}])}
    });
    speak(wi===0?[...lnP(o.intro),{say:w.w}]:[{say:w.w}]);
  };
  play();
}

/* ===== ١. القراءة ===== */
function rdHome(back){
  lnT('القراءة');
  const L=[
   lnCol(0,{n:'الحركات',ico:'<span class="gl">بَ</span>',sub:lnStarTxt('read:har'),go:()=>lnGo(rdHar)}),
   lnCol(1,{n:'المقاطع',ico:'<span class="gl">بُ بِ</span>',sub:lnStarTxt('read:syl'),go:()=>lnGo(rdSylPick)}),
   lnCol(2,{n:'تركيب الكلمات',e:'🧩',sub:[1,2,3].map(l=>lnStarsOf('read:build'+l)).reduce((a,b)=>a+b)?'★':'',go:()=>lnGo(rdBuildLv)}),
   lnCol(3,{n:'قراءة الجمل',e:'📝',sub:lnStarTxt('read:sent'),go:()=>lnGo(rdSent)})];
  const b=lnB(lnTiles(L,'two'));lnBindTiles(b,L);
  if(!back)lnSay(RD_SAY.home);
}
const rdMark=(k,l='ب')=>`<span class="ln-har">${l}${RD_HAR.find(h=>h.k===k).m}</span>`;
const RD_HN={fa:'الفَتْحَة',da:'الضَّمَّة',ka:'الكَسْرَة',su:'السُّكُون',sh:'الشَّدَّة'};
function rdHar(){
  lnCards({title:'الحركات',items:RD_HAR.map(h=>({h:rdMark(h.k),t:h.n,say:h.say})),qkey:'read:har',
    quiz:()=>lnQuiz({key:'read:har',title:'الحركات',qs:shuffle(RD_HAR.slice(0,4).concat(RD_HAR)).slice(0,6).map(h=>({
      say:[{say:'فِين'},{say:RD_HN[h.k]}],top:`<div class="ln-big-t">فين ${h.n}؟</div>`,cls:'big',
      opts:shuffle([h,...shuffle(RD_HAR.filter(x=>x!==h)).slice(0,2)]).map(x=>({h:rdMark(x.k,pick(['ب','ت','م','س','ك'])),ok:x===h}))}))})});
  lnIntro(RD_SAY.har);
}
function rdSylPick(back){
  lnT('المقاطع');
  const b=lnB(`<p class="ln-instr">اختار حرف</p><div class="ln-letters">${RD_LET.map((l,i)=>`<button class="ln-lbtn" data-i="${i}">${l}</button>`).join('')}</div>
   <button class="btn2 c-sun ln-big" id="lnQz">🎯 اختبر نفسك <small>${lnStarTxt('read:syl')}</small></button>`);
  b.querySelectorAll('.ln-lbtn').forEach(x=>x.onclick=()=>lnGo(()=>rdSyl(RD_LET[+x.dataset.i])));
  $('#lnQz').onclick=()=>lnGo(rdSylQuiz);
  if(!back)lnSay(RD_SAY.sylPick);
}
const rdSylPart=(l,k)=>({say:rdSylTxt(l,k),show:rdShow(l,k),vk:'syl_'+l+'_'+k});
function rdSyl(l){
  lnT('حرف '+l);
  const K=['fa','da','ka','su'];
  const b=lnB(`<div class="ln-syls">${K.map(k=>`<button class="ln-syl" data-k="${k}"><b>${rdShow(l,k)}</b><small>${RD_HAR.find(h=>h.k===k).n}</small></button>`).join('')}</div>
    <button class="btn2 c-teal ln-big" id="lnAll">${LN_SPK} اسمع الكل</button>`);
  b.querySelectorAll('.ln-syl').forEach(x=>x.onclick=()=>{x.classList.remove('pop');void x.offsetWidth;x.classList.add('pop');speak([rdSylPart(l,x.dataset.k)])});
  $('#lnAll').onclick=()=>speak(K.map(k=>Object.assign(rdSylPart(l,k),{pause:450,on:()=>b.querySelectorAll('.ln-syl').forEach(z=>z.classList.toggle('rd',z.dataset.k===k))})));
  speak(K.map(k=>Object.assign(rdSylPart(l,k),{pause:450,on:()=>b.querySelectorAll('.ln-syl').forEach(z=>z.classList.toggle('rd',z.dataset.k===k))})));
}
function rdSylQuiz(){
  const K=['fa','da','ka'];
  lnQuiz({key:'read:syl',title:'المقاطع',intro:[{say:RD_SAY.sylQ}],again:()=>rdSylQuiz(),qs:Array.from({length:8},(_,i)=>{
    const l=pick(RD_LET),k=pick(K);
    const opts=i%2?shuffle(K).map(kk=>({l,k:kk})):shuffle([{l,k},...shuffle(RD_LET.filter(x=>x!==l)).slice(0,2).map(x=>({l:x,k}))]);
    return{say:[rdSylPart(l,k)],cls:'big',top:'<div class="ln-big-t">اسمع واختار</div>',okSay:[],opts:opts.map(o=>({h:`<span class="ln-har">${rdShow(o.l,o.k)}</span>`,ok:o.l===l&&o.k===k}))};
  })});
}
function rdBuildLv(back){
  lnT('تركيب الكلمات');
  const L=[1,2,3].map(lv=>lnCol(lv+3,{n:'المستوى '+arDigits(lv),e:['🐣','🐥','🦅'][lv-1],sub:RD_LV[lv-1]+' '+lnStarTxt('read:build'+lv),go:()=>lnGo(()=>rdBuild(lv))}));
  const b=lnB(lnTiles(L));lnBindTiles(b,L);
  if(!back)lnSay(RD_SAY.build);
}
function rdBuild(lv){lnWordGame({key:'read:build'+lv,title:'تركيب الكلمات',showPic:true,intro:[{say:RD_SAY.build}],words:shuffle(RD_WORDS.filter(w=>w.lv===lv)).slice(0,6),again:()=>rdBuild(lv)})}
function rdSent(){
  lnQuiz({key:'read:sent',title:'قراءة الجمل',intro:[{say:RD_SAY.sent}],again:()=>rdSent(),qs:shuffle(RD_SENT.slice()).slice(0,6).map(s=>({
    say:[],top:`<div class="ln-sent">${s.t}</div>`,cls:'emo',okSay:[{say:s.t}],
    after:t=>{const lb=t.querySelector('#lnListen');lb.querySelector('span').textContent='اسمع الجملة';lb.onclick=()=>lnSay({say:s.t})},
    opts:shuffle([s.e,...s.x]).map(e=>({h:e,ok:e===s.e}))}))});
}

/* ===== ٢. الإملاء ===== */
function dcHome(back){
  lnT('الإملاء');
  const L=[1,2,3].map(lv=>lnCol(lv-1,{n:'المستوى '+arDigits(lv),e:['✏️','📝','🏆'][lv-1],sub:RD_LV[lv-1]+' '+lnStarTxt('dict:'+lv),go:()=>lnGo(()=>dcPlay(lv))}));
  const b=lnB(lnTiles(L));lnBindTiles(b,L);
  if(!back)lnSay(DC_SAY.home);
}
function dcPlay(lv){lnWordGame({key:'dict:'+lv,title:'الإملاء',showPic:false,intro:[{say:DC_SAY.q}],words:shuffle(RD_WORDS.filter(w=>w.lv===lv)).slice(0,6),again:()=>dcPlay(lv)})}

/* ===== ٣. العبادات ===== */
function wrHome(back){
  lnT('العبادات');
  const L=[
   lnCol(1,{n:'الوضوء',e:'💧',sub:lnStarTxt('wor:wudu'),go:()=>lnGo(wrWudu)}),
   lnCol(5,{n:'الصلاة',e:'🕌',sub:lnStarTxt('wor:pray'),go:()=>lnGo(wrPray)}),
   lnCol(2,{n:'الصلوات الخمس',e:'🕐',sub:lnStarTxt('wor:salat'),go:()=>lnGo(wrSalat)}),
   lnCol(3,{n:'الأذكار',e:'🤲',go:()=>lnGo(wrAdh)}),
   lnCol(4,{n:'قصص الأنبياء',e:'📜',go:()=>lnGo(wrProph)})];
  const b=lnB(lnTiles(L));lnBindTiles(b,L);
  if(!back)lnSay(WR_SAY.home);
}
function wrStepsGo(key,title,steps,intro){
  lnSteps({title,steps:steps.map(s=>({h:s.e,t:s.t,say:s.say})),intro,endLbl:'رتّب الخطوات 🧩',
    onEnd:()=>lnGo(()=>lnOrder({key,title:'رتّب '+title,instr:'رتّب الخطوات من الأول للآخر',items:steps.map(s=>({h:s.e,t:s.t})),again:()=>lnOrder({key,title:'رتّب '+title,instr:'رتّب الخطوات من الأول للآخر',items:steps.map(s=>({h:s.e,t:s.t}))})}))});
}
function wrWudu(){wrStepsGo('wor:wudu','الوضوء',WR_WUDU,[{say:WR_SAY.wudu}])}
function wrPray(){wrStepsGo('wor:pray','الصلاة',WR_PRAY,[{say:WR_SAY.pray}])}
const WR_SN=['صَلاة الفَجْر','صَلاة الضُّهْر','صَلاة العَصْر','صَلاة المَغْرِب','صَلاة العِشا'];
function wrSalat(){
  lnCards({title:'الصلوات الخمس',items:WR_SALAT.map(s=>({h:s.e,t:s.t,sub:arDigits(s.r)+' ركعات',say:s.say})),qkey:'wor:salat',
    quiz:()=>lnQuiz({key:'wor:salat',title:'الصلوات الخمس',qs:shuffle(WR_SALAT.map((s,i)=>({s,i}))).map(({s,i})=>({
      say:[{say:WR_SN[i]},{say:WR_SAY.salatQ}],top:`<div class="ln-big-e">${s.e}</div><div class="ln-big-t">صلاة ${s.t}</div>`,cls:'big',okSay:[{say:s.say}],
      opts:[2,3,4].map(n=>({h:arDigits(n),ok:n===s.r}))}))})});
  lnIntro(WR_SAY.salat);
}
function wrAdh(back){
  lnT('الأذكار');
  const b=lnB(`<div class="ln-list">${WR_ADH.map((a,i)=>`<button class="ln-li" data-i="${i}"><span class="ln-lie">${a.e}</span><span class="ln-lit">${a.t}</span><span class="ln-lis">${pget('adhSeen',{})[i]?'✔':''}</span></button>`).join('')}</div>`);
  b.querySelectorAll('.ln-li').forEach(x=>x.onclick=()=>lnGo(()=>wrAdhOne(+x.dataset.i)));
  if(!back)lnSay(WR_SAY.adh);
}
function wrAdhOne(i){
  const a=WR_ADH[i];lnT(a.t);
  const P=pget('adhSeen',{});P[i]=1;pset('adhSeen',P);dlMark('wor');
  const b=lnB(`<div class="ln-adh"><span class="ln-adhe">${a.e}</span>${a.x.map(x=>`<p class="ln-dua">${x.d}</p>`).join('')}<p class="ln-note">💡 ${plain(a.note)}</p></div>
   <div class="ln-sbtns"><button class="btn2 c-teal" id="lnRep">${LN_SPK} اسمع تاني</button>${i<WR_ADH.length-1?'<button class="btn2 c-sky" id="lnNx">الذكر اللي بعده ◀</button>':''}</div>`);
  const go=()=>speak([...a.x.map(x=>({say:x.d,pause:500})),{say:a.note}]);
  $('#lnRep').onclick=go;const n=$('#lnNx');if(n)n.onclick=()=>{LN.stack.pop();lnGo(()=>wrAdhOne(i+1))};
  go();
}
function wrProph(back){
  lnT('قصص الأنبياء');
  const b=lnB(`<div class="ln-list">${WR_PROPH.map((p,i)=>`<button class="ln-li" data-i="${i}"><span class="ln-lie">${p.e}</span><span class="ln-lit">${p.n}</span><span class="ln-lis">${lnStarTxt('wor:p'+i)}</span></button>`).join('')}</div>`);
  b.querySelectorAll('.ln-li').forEach(x=>x.onclick=()=>lnGo(()=>wrStory(+x.dataset.i)));
  if(!back)lnSay(WR_SAY.proph);
}
function wrStory(i){
  const p=WR_PROPH[i];
  lnSteps({title:p.n,bg:p.bg,steps:p.s.map(s=>({h:p.e,say:s})),endLbl:'الدرس والأسئلة ◀',onEnd:end=>{
    end.innerHTML=`<div class="ln-les">💡 ${plain(p.les)}</div><button class="btn2 c-sun ln-big" id="lnPq">🎯 جاوب على الأسئلة</button>`;
    $('#lnPq').onclick=()=>lnGo(()=>wrStoryQ(i));
    speak([{say:WR_SAY.les},{say:p.les}]);
  }});
}
function wrStoryQ(i){
  const p=WR_PROPH[i],O=[SIT_SAY.o1,SIT_SAY.o2,SIT_SAY.o3];
  lnQuiz({key:'wor:p'+i,title:p.n,intro:[{say:WR_SAY.qs}],qs:p.q.map(q=>({
    say:[{say:q.q},...q.o.flatMap((o,k)=>[{say:O[k]},{say:o}])],top:`<div class="ln-qtxt">${plain(q.q)}</div>`,cls:'txt',
    opts:q.o.map((o,k)=>({h:`<b>${arDigits(k+1)}</b> ${plain(o)}`,ok:k===q.a}))}))});
}

/* ===== ٤. اكتشف العالم ===== */
function scHome(back){
  lnT('اكتشف العالم');
  const L=SC_TOP.map(t=>({n:t.n,e:t.e,c1:t.c1,c2:t.c2,cd:t.cd,sub:lnStarTxt('sci:'+t.k),go:()=>lnGo(()=>scTopic(t))}));
  const b=lnB(lnTiles(L));lnBindTiles(b,L);
  if(!back)lnSay(SC_SAY.home);
}
function scTopic(t){
  const sens=t.k==='senses',plant=t.k==='plants';
  lnCards({title:t.n,items:t.items.map(it=>({h:it.e,t:plain(it.n),say:[{say:it.n},{say:it.f}]})),qkey:'sci:'+t.k,
    more:plant?'<button class="btn2 c-teal ln-big" id="lnPo">🌱 رتّب مراحل النبات</button>':'',
    onReady:()=>{const po=$('#lnPo');if(po)po.onclick=()=>lnGo(()=>lnOrder({key:'sci:plantOrder',title:'مراحل النبات',instrSay:SC_SAY.plantOrder,instr:'رتّب من البذرة للثمرة',items:t.items.slice(0,6).map(it=>({h:it.e,t:plain(it.n)}))}))},
    quiz:()=>lnQuiz({key:'sci:'+t.k,title:t.n,again:()=>LN.stack[LN.stack.length-1](true),qs:(sens?shuffle(t.items.slice()):shuffle(t.items.slice()).slice(0,6)).map(it=>{
      const pool=sens?SC_TOP[0].items.filter(x=>['👁️','👂','👃','👅','✋'].includes(x.e)):t.items;
      const ok=sens?pool.find(x=>x.e===it.e):it;
      return{say:sens?[{say:it.q}]:[{say:'فِين'},{say:it.n}],top:sens?`<div class="ln-qtxt">${plain(it.q)}</div>`:`<div class="ln-big-t">فين ${plain(it.n)}؟</div>`,cls:'emo',okSay:[{say:it.f}],
        opts:shuffle([ok,...shuffle(pool.filter(x=>x!==ok)).slice(0,2)]).map(x=>({h:x.e,ok:x===ok}))};
    })})});
  lnIntro(t.intro,SC_SAY.cards);
}

/* ===== ٥. مهارات الحياة ===== */
function lfHome(back){
  lnT('مهارات الحياة');
  const L=[
   lnCol(2,{n:'الساعة',e:'🕐',sub:lnStarTxt('life:clock'),go:()=>lnGo(lfClockHome)}),
   lnCol(3,{n:'فلوس مصر',e:'💵',sub:lnStarTxt('life:money'),go:()=>lnGo(lfMoney)}),
   lnCol(5,{n:'البقالة',e:'🛒',sub:lnStarTxt('life:shop'),go:()=>lnGo(lfShopHome)}),
   lnCol(0,{n:'أيام الأسبوع',e:'📅',sub:lnStarTxt('life:days'),go:()=>lnGo(()=>lfSeq('days'))}),
   lnCol(4,{n:'شهور السنة',e:'🗓️',sub:lnStarTxt('life:months'),go:()=>lnGo(()=>lfSeq('months'))})];
  const b=lnB(lnTiles(L));lnBindTiles(b,L);
  if(!back)lnSay(LF_SAY.home);
}
const lfDig=(h,m)=>`${arDigits(h)}:${arDigits(String(m).padStart(2,'0'))}`;
function lfClock(h,m,big){
  const ha=((h%12)+m/60)*30,ma=m*6;
  const nums=Array.from({length:12},(_,i)=>{const n=i+1,a=n*30*Math.PI/180;return `<text x="${100+Math.sin(a)*72}" y="${100-Math.cos(a)*72+7}" text-anchor="middle">${arDigits(n)}</text>`}).join('');
  const ticks=Array.from({length:60},(_,i)=>{const a=i*6*Math.PI/180,r1=i%5?88:84;return `<line x1="${100+Math.sin(a)*r1}" y1="${100-Math.cos(a)*r1}" x2="${100+Math.sin(a)*92}" y2="${100-Math.cos(a)*92}" stroke="#9A93C9" stroke-width="${i%5?1.2:3}"/>`}).join('');
  return `<svg class="ln-clock${big?' big':''}" viewBox="0 0 200 200"><circle cx="100" cy="100" r="97" fill="#fff" stroke="#5B47E0" stroke-width="6"/>${ticks}<g class="ln-cnum">${nums}</g>
   <line x1="100" y1="100" x2="100" y2="52" stroke="#1F2350" stroke-width="8" stroke-linecap="round" transform="rotate(${ha} 100 100)" class="ln-hh"/>
   <line x1="100" y1="100" x2="100" y2="28" stroke="#FF5A45" stroke-width="5" stroke-linecap="round" transform="rotate(${ma} 100 100)" class="ln-mh"/><circle cx="100" cy="100" r="7" fill="#FFC633" stroke="#1F2350" stroke-width="2"/></svg>`;
}
const lfTimePart=(h,q)=>({say:lfTime(h,q)});
function lfClockHome(back){
  lnT('الساعة');let h=3,q=0;
  const b=lnB(`<div class="ln-clockbox">${lfClock(3,0,1)}</div><p class="ln-instr" id="lnCt">${lfDig(3,0)}</p>
   <div class="ln-sbtns"><button class="btn2 c-sun" id="lnCq">🎯 الساعة كام؟</button><button class="btn2 c-teal" id="lnCs">🕹️ اضبط الساعة</button></div>`);
  b.querySelector('.ln-clockbox').onclick=()=>{q++;if(q>3){q=0;h=h%12+1}$('.ln-clockbox').innerHTML=lfClock(h,q*15,1);$('#lnCt').textContent=lfDig(h,q*15);speak([lfTimePart(h,q)])};
  $('#lnCq').onclick=()=>lnGo(lfClockQuiz);$('#lnCs').onclick=()=>lnGo(lfClockSet);
  if(!back)lnSay(LF_SAY.clock,LF_SAY.clock2);
}
function lfClockQuiz(){
  const used=new Set();
  lnQuiz({key:'life:clock',title:'الساعة كام؟',again:()=>lfClockQuiz(),qs:Array.from({length:6},(_,i)=>{
    let h,q;do{h=1+Math.floor(Math.random()*12);q=i<2?0:i<4?pick([0,2]):pick([0,1,2,3])}while(used.has(h+'_'+q));used.add(h+'_'+q);
    const c=new Set([h+'_'+q]);while(c.size<3){c.add((1+Math.floor(Math.random()*12))+'_'+(i<2?0:pick([0,1,2,3])))}
    return{say:[{say:LF_SAY.clockQ}],top:`<div class="ln-clockbox sm">${lfClock(h,q*15)}</div>`,cls:'txt',okSay:[lfTimePart(h,q)],
      opts:shuffle([...c]).map(x=>{const[hh,qq]=x.split('_').map(Number);return{h:`<span class="ln-dig">${lfDig(hh,qq*15)}</span>`,ok:x===h+'_'+q}})};
  })});
}
function lfClockSet(){
  lnT('اضبط الساعة');let round=0,miss=0;
  const play=()=>{
    const th=1+Math.floor(Math.random()*12),tq=round<2?0:pick([0,1,2,3]);let h=12,m=0;
    const b=lnB(`<div class="ln-dots">${[0,1,2,3,4].map(i=>`<i class="${i<round?'on':i===round?'cur':''}"></i>`).join('')}</div>
     <p class="ln-target">خلّي الساعة <b>${lfDig(th,tq*15)}</b></p><div class="ln-clockbox" id="lnCb">${lfClock(h,m,1)}</div>
     <div class="ln-cset"><div><small>العقرب القصير (الساعة)</small><button class="btn2 c-sky" data-a="h-">−</button><button class="btn2 c-sky" data-a="h+">+</button></div>
     <div><small>العقرب الطويل (الدقايق)</small><button class="btn2 c-coral" data-a="m-">−</button><button class="btn2 c-coral" data-a="m+">+</button></div></div>
     <button class="btn2 c-teal ln-big" id="lnCok">✔ تمام</button>`);
    const paint=()=>{$('#lnCb').innerHTML=lfClock(h,m,1)};
    b.querySelectorAll('[data-a]').forEach(x=>x.onclick=()=>{const a=x.dataset.a;if(a==='h+')h=h%12+1;if(a==='h-')h=h===1?12:h-1;if(a==='m+')m=(m+15)%60;if(a==='m-')m=(m+45)%60;tone([520],'sine',.04);paint()});
    $('#lnCok').onclick=()=>{
      if(h===th&&m===tq*15){ding();confetti($('#lnCb'));speak([lnPraise(),lfTimePart(th,tq)]).then(r=>{if(!r||S.screen!=='learn')return;round++;if(round>=5)lnFinish('life:clockset',miss,()=>lfClockSet());else play()})}
      else{miss++;boop();speak([lnOops(),{say:LF_SAY.setQ},lfTimePart(th,tq)])}
    };
    speak([{say:LF_SAY.setQ},lfTimePart(th,tq)]);
  };
  play();
}
function lfMoneyH(x,sm){
  return x.k==='coin'?`<span class="ln-coin${sm?' sm':''}" style="--mc:${x.c}"><b>${x.lbl}</b></span>`:`<span class="ln-note${sm?' sm':''}" style="--mc:${x.c}"><b>${x.lbl}</b><i>جنيه</i></span>`;
}
function lfMoney(){
  lnCards({title:'فلوس مصر',cls:'wide',items:LF_MONEY.map(x=>({h:lfMoneyH(x),t:plain(x.n),say:[{say:x.n}]})),qkey:'life:money',
    quiz:()=>lnQuiz({key:'life:money',title:'فلوس مصر',qs:shuffle(LF_MONEY.slice()).slice(0,6).map(x=>({say:[{say:'فِين'},{say:x.n}],top:`<div class="ln-big-t">فين ${plain(x.n)}؟</div>`,cls:'money',
      opts:shuffle([x,...shuffle(LF_MONEY.filter(y=>y!==x)).slice(0,2)]).map(y=>({h:lfMoneyH(y,1),ok:y===x}))}))})});
  lnIntro(LF_SAY.money);
}
function lfShopHome(back){
  lnT('البقالة');
  const L=[lnCol(5,{n:'ادفع بالظبط',e:'💵',sub:lnStarTxt('life:shop'),go:()=>lnGo(lfShop)}),lnCol(2,{n:'الباقي كام؟',e:'🪙',sub:lnStarTxt('life:change'),go:()=>lnGo(lfChange)})];
  const b=lnB(lnTiles(L,'two'));lnBindTiles(b,L);
  if(!back)lnSay(LF_SAY.shop);
}
function lfShop(){
  lnT('ادفع بالظبط');let round=0,miss=0;const items=shuffle(LF_SHOP.slice()).slice(0,5);
  const wallet=LF_MONEY.filter(x=>[1,5,10,20].includes(x.v));
  const play=()=>{
    const it=items[round];let paid=[];
    const b=lnB(`<div class="ln-dots">${items.map((_,i)=>`<i class="${i<round?'on':i===round?'cur':''}"></i>`).join('')}</div>
     <div class="ln-item"><span>${it.e}</span><b>${plain(it.n)}</b><em>${arDigits(it.p)} جنيه</em></div>
     <div class="ln-paid" id="lnPaid"></div><p class="ln-instr" id="lnSum">دفعت: ${arDigits(0)} جنيه</p>
     <div class="ln-wallet">${wallet.map((x,i)=>`<button data-w="${i}">${lfMoneyH(x,1)}</button>`).join('')}</div>
     <div class="ln-sbtns"><button class="btn2 c-coral" id="lnClr">↺ امسح</button><button class="btn2 c-teal" id="lnPay">💳 ادفع</button></div>`);
    const paint=()=>{$('#lnPaid').innerHTML=paid.map(x=>lfMoneyH(x,1)).join('');$('#lnSum').textContent=`دفعت: ${arDigits(paid.reduce((a,x)=>a+x.v,0))} جنيه`};
    b.querySelectorAll('[data-w]').forEach(x=>x.onclick=()=>{if(paid.length<12){paid.push(wallet[+x.dataset.w]);tone([700],'sine',.05);paint()}});
    $('#lnClr').onclick=()=>{paid=[];paint()};
    $('#lnPay').onclick=()=>{
      const s=paid.reduce((a,x)=>a+x.v,0);
      if(s===it.p){ding();confetti($('#lnPaid'));speak([lnPraise()]).then(r=>{if(!r||S.screen!=='learn')return;round++;if(round>=items.length)lnFinish('life:shop',miss,()=>lfShop());else play()})}
      else{miss++;boop();speak([{say:s>it.p?LF_SAY.over:LF_SAY.less}])}
    };
    speak(round===0?[{say:LF_SAY.pay},{say:it.n},{say:LF_PRICE[it.p]}]:[{say:it.n},{say:LF_PRICE[it.p]}]);
  };
  play();
}
function lfChange(){
  lnQuiz({key:'life:change',title:'الباقي كام؟',again:()=>lfChange(),qs:shuffle(LF_SHOP.slice()).slice(0,5).map(it=>{
    const note=LF_MONEY.find(x=>x.k==='note'&&x.v>it.p&&x.v<=50)||LF_MONEY[5],ch=note.v-it.p;
    const o=new Set([ch]);[ch+1,ch-1,ch+5,ch-5,ch+2].forEach(v=>{if(o.size<3&&v>0)o.add(v)});
    return{say:[{say:it.n},{say:LF_PRICE[it.p]},{say:LF_SAY.change}],cls:'txt',
      top:`<div class="ln-item sm"><span>${it.e}</span><b>${plain(it.n)}</b><em>${arDigits(it.p)} جنيه</em></div><div class="ln-paid">${lfMoneyH(note,1)}</div>`,
      opts:shuffle([...o]).map(v=>({h:`<span class="ln-dig">${arDigits(v)}</span> جنيه`,ok:v===ch}))};
  })});
}
function lfSeq(kind){
  const D=kind==='days'?LF_DAYS:LF_MONTHS,key='life:'+kind;
  lnCards({title:kind==='days'?'أيام الأسبوع':'شهور السنة',cls:'seq',items:D.map((d,i)=>({h:`<span class="ln-num">${arDigits(i+1)}</span>`,t:plain(d),say:[{say:d}]})),qkey:key,
    quiz:()=>lnQuiz({key,title:kind==='days'?'أيام الأسبوع':'شهور السنة',qs:shuffle(D.map((_,i)=>i)).slice(0,6).map(i=>{
      const nx=(i+1)%D.length,others=shuffle(D.map((_,j)=>j).filter(j=>j!==nx&&j!==i)).slice(0,2);
      return{say:[{say:kind==='days'?LF_SAY.dayNext:LF_SAY.monNext},{say:D[i]}],top:`<div class="ln-big-t">إيه اللي بعد «${plain(D[i])}»؟</div>`,cls:'txt',okSay:[{say:D[nx]}],
        opts:shuffle([nx,...others]).map(j=>({h:plain(D[j]),ok:j===nx}))};
    })})});
  if(!LN.back)speak([{say:kind==='days'?LF_SAY.days:LF_SAY.months},...D.map(d=>({say:d,pause:300}))]);
}

/* ===== ٦. English Words ===== */
const enVis=(t,it)=>t.k==='colors'?`<span class="ln-color" style="background:${it[2]}"></span>`:it[2];
function enHome(back){
  lnT('English Words');
  const L=[...EN_TOP.map(t=>({n:t.n,sub:t.ar+' '+lnStarTxt('eng:'+t.k),e:t.e,c1:t.c1,c2:t.c2,cd:t.cd,go:()=>lnGo(()=>enTopic(t))})),
    lnCol(2,{n:'Sentences',sub:'جمل بسيطة '+lnStarTxt('eng:sent'),e:'💬',go:()=>lnGo(enSent)})];
  const b=lnB(lnTiles(L));lnBindTiles(b,L);b.querySelectorAll('.lbl').forEach(x=>x.dir='auto');
  if(!back)lnSay(EN_SAY.home);
}
function enTopic(t){
  lnCards({title:t.n,cls:'en',items:t.items.map(it=>({h:enVis(t,it),t:`<bdi dir="ltr">${it[0]}</bdi>`,sub:it[1],say:[{say:it[0],l:'en'}]})),qkey:'eng:'+t.k,
    quiz:()=>lnQuiz({key:'eng:'+t.k,title:t.n,qs:shuffle(t.items.slice()).slice(0,6).map(it=>({say:[{say:'فِين'},{say:it[0],l:'en'}],top:`<div class="ln-big-t" dir="ltr">${it[0]}</div>`,cls:'emo',
      opts:shuffle([it,...shuffle(t.items.filter(x=>x!==it)).slice(0,2)]).map(x=>({h:enVis(t,x),ok:x===it}))}))})});
  lnIntro(EN_SAY.cards);
}
function enSent(){
  lnCards({title:'Sentences',cls:'en sent',items:EN_SENT.map(s=>({h:s.e,t:`<bdi dir="ltr">${s.t}</bdi>`,sub:s.ar,say:[{say:s.t,l:'en'}]})),qkey:'eng:sent',
    quiz:()=>lnQuiz({key:'eng:sent',title:'Sentences',intro:[{say:EN_SAY.sent}],qs:shuffle(EN_SENT.slice()).slice(0,6).map(s=>({say:[{say:s.t,l:'en'}],top:`<div class="ln-big-t" dir="ltr">${s.t}</div>`,cls:'emo',okSay:[],
      opts:shuffle([s,...shuffle(EN_SENT.filter(x=>x!==s&&x.e!==s.e)).slice(0,2)]).map(x=>({h:x.e,ok:x===s}))}))})});
  lnIntro(EN_SAY.sent);
}

/* ===== ٧. مصر والعالم ===== */
const EG_PYR='<svg viewBox="0 0 64 64" class="ln-svgi"><path d="M4 54h56" stroke="#C9A24A" stroke-width="3"/><path d="M8 54 26 22l18 32Z" fill="#E8C468" stroke="#B88A2A" stroke-width="2"/><path d="M26 22l18 32h-9Z" fill="#C99A3A"/><path d="M34 54 46 32l12 22Z" fill="#E8C468" stroke="#B88A2A" stroke-width="2"/><circle cx="50" cy="12" r="6" fill="#FFC633"/></svg>';
const egIco=e=>e==='pyr'?EG_PYR:e;
function egHome(back){
  lnT('مصر والعالم');
  const L=[lnCol(3,{n:'أماكن مشهورة',ico:`<span class="em">${EG_PYR}</span>`,sub:lnStarTxt('egy:land'),go:()=>lnGo(egLand)}),
    lnCol(0,{n:'خريطة مصر',e:'🗺️',sub:lnStarTxt('egy:map'),go:()=>lnGo(()=>egMap(false))}),
    lnCol(2,{n:'أعلام الدول',e:'🏳️',sub:lnStarTxt('egy:flags'),go:()=>lnGo(egFlags)})];
  const b=lnB(lnTiles(L));lnBindTiles(b,L);
  if(!back)lnSay(EG_SAY.home);
}
function egLand(){
  lnCards({title:'أماكن مشهورة في مصر',items:EG_LAND.map(x=>({h:egIco(x.e),t:plain(x.n),sub:x.w,say:[{say:x.n},{say:x.f}]})),qkey:'egy:land',
    quiz:()=>lnQuiz({key:'egy:land',title:'أماكن مشهورة',qs:shuffle(EG_LAND.slice()).slice(0,6).map(x=>({say:[{say:'فِين'},{say:x.n}],top:`<div class="ln-big-t">فين ${plain(x.n)}؟</div>`,cls:'emo',okSay:[{say:x.f}],
      opts:shuffle([x,...shuffle(EG_LAND.filter(y=>y!==x)).slice(0,2)]).map(y=>({h:egIco(y.e),ok:y===x}))}))})});
  lnIntro(EG_SAY.land);
}
const egXY=([lo,la])=>[(lo-24.4)/(37.4-24.4)*300,(32-la)/(32-21.6)*240];
function egMapSvg(){
  const pts=EG_SHAPE.map(p=>egXY(p).map(v=>v.toFixed(1)).join(',')).join(' ');
  const line=a=>a.map(p=>egXY(p).map(v=>v.toFixed(1)).join(',')).join(' ');
  return `<svg class="ln-map" viewBox="-6 -26 312 282"><rect x="-6" y="-26" width="312" height="282" rx="18" fill="#BFE3FF"/>
   <text x="110" y="-10" class="ln-sea">البحر الأبيض المتوسط</text><text x="262" y="196" class="ln-sea" transform="rotate(-58 262 196)">البحر الأحمر</text>
   <polygon points="${pts}" fill="#F3DFA7" stroke="#C9A24A" stroke-width="2.5" stroke-linejoin="round"/>
   <polyline points="${line(EG_NILE)}" fill="none" stroke="#3B9BE8" stroke-width="3.5" stroke-linecap="round"/><polyline points="${line(EG_NILE2)}" fill="none" stroke="#3B9BE8" stroke-width="3" stroke-linecap="round"/>
   ${EG_CITY.map((c,i)=>{const[x,y]=egXY(c.ll);return `<g class="ln-city" data-c="${i}"><circle cx="${x}" cy="${y}" r="13" fill="transparent"/><circle cx="${x}" cy="${y}" r="${c.cap?7:5.5}" class="dot ${c.cap?'cap':''}"/><text x="${x+(c.dx||0)}" y="${y+(c.dy==null?-10:c.dy)}" class="lbl">${plain(c.n)}</text></g>`}).join('')}</svg>`;
}
function egMap(){
  lnT('خريطة مصر');
  const b=lnB(`<div class="ln-mapbox">${egMapSvg()}</div><button class="btn2 c-sun ln-big" id="lnMq">🎯 فين المدينة؟ <small>${lnStarTxt('egy:map')}</small></button>`);
  b.querySelectorAll('.ln-city').forEach(c=>c.onclick=()=>{const x=EG_CITY[+c.dataset.c];b.querySelectorAll('.ln-city').forEach(z=>z.classList.toggle('hi',z===c));speak([{say:x.n}])});
  $('#lnMq').onclick=()=>lnGo(egMapQuiz);
  lnIntro(EG_SAY.map);
}
function egMapQuiz(){
  lnT('فين المدينة؟');let round=0,miss=0;const Q=shuffle(EG_CITY.map((_,i)=>i)).slice(0,6);
  const play=()=>{
    const ci=Q[round],c=EG_CITY[ci];
    const b=lnB(`<div class="ln-dots">${Q.map((_,i)=>`<i class="${i<round?'on':i===round?'cur':''}"></i>`).join('')}</div><p class="ln-target">فين <b>${plain(c.n)}</b>؟</p><div class="ln-mapbox quiz">${egMapSvg()}</div>`);
    let lock=false;
    b.querySelectorAll('.ln-city').forEach(g0=>g0.onclick=()=>{
      if(lock)return;const i=+g0.dataset.c;
      if(i===ci){lock=true;g0.classList.add('ok');ding();speak([lnPraise(),{say:c.n}]).then(r=>{if(!r||S.screen!=='learn')return;round++;if(round>=Q.length)lnFinish('egy:map',miss,()=>egMapQuiz());else play()})}
      else{miss++;g0.classList.add('no');boop();speak([lnOops(),{say:EG_SAY.mapQ},{say:c.n}])}
    });
    speak([{say:EG_SAY.mapQ},{say:c.n}]);
  };
  play();
}
function flagSvg(k){
  const R=(y,h,c)=>`<rect x="0" y="${y}" width="60" height="${h}" fill="${c}"/>`,V=(x,w,c)=>`<rect x="${x}" y="0" width="${w}" height="40" fill="${c}"/>`;
  const star=(cx,cy,r,c)=>{let p='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;p+=`${(cx+Math.cos(a)*rr).toFixed(1)},${(cy+Math.sin(a)*rr).toFixed(1)} `}return `<polygon points="${p}" fill="${c}"/>`};
  const cres=(cx,cy,r,c,bg)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/><circle cx="${cx+r*.32}" cy="${cy}" r="${r*.8}" fill="${bg}"/>`;
  let s='';
  switch(k){
   case 'eg':s=R(0,13.4,'#CE1126')+R(13.3,13.4,'#fff')+R(26.6,13.4,'#000')+`<path d="M30 15c-2 2-4 4-4 7 2 1 6 1 8 0 0-3-2-5-4-7Z" fill="#C09300"/><rect x="27" y="22" width="6" height="3" fill="#C09300"/>`;break;
   case 'sa':s=R(0,40,'#006C35')+`<text x="30" y="20" text-anchor="middle" font-size="7.5" fill="#fff" font-family="Amiri Quran,serif">لا إله إلا الله</text><path d="M14 28h30l4-2" stroke="#fff" stroke-width="1.8" fill="none"/>`;break;
   case 'ae':s=R(0,13.4,'#00732F')+R(13.3,13.4,'#fff')+R(26.6,13.4,'#000')+V(0,15,'#FF0000');break;
   case 'jo':s=R(0,13.4,'#000')+R(13.3,13.4,'#fff')+R(26.6,13.4,'#007A3D')+`<polygon points="0,0 28,20 0,40" fill="#CE1126"/>`+star(9,20,3.2,'#fff');break;
   case 'ps':s=R(0,13.4,'#000')+R(13.3,13.4,'#fff')+R(26.6,13.4,'#007A3D')+`<polygon points="0,0 22,20 0,40" fill="#CE1126"/>`;break;
   case 'sd':s=R(0,13.4,'#D21034')+R(13.3,13.4,'#fff')+R(26.6,13.4,'#000')+`<polygon points="0,0 20,20 0,40" fill="#007229"/>`;break;
   case 'kw':s=R(0,13.4,'#007A3D')+R(13.3,13.4,'#fff')+R(26.6,13.4,'#CE1126')+`<polygon points="0,0 15,13.3 15,26.7 0,40" fill="#000"/>`;break;
   case 'ma':s=R(0,40,'#C1272D')+`<polygon points="30,9 33.5,19.5 44.5,19.5 35.5,26 39,36.5 30,30 21,36.5 24.5,26 15.5,19.5 26.5,19.5" fill="none" stroke="#006233" stroke-width="2"/>`;break;
   case 'dz':s=V(0,30,'#006233')+V(30,30,'#fff')+cres(31,20,9,'#D21034','#fff')+star(36,20,4,'#D21034');break;
   case 'tn':s=R(0,40,'#E70013')+`<circle cx="30" cy="20" r="11" fill="#fff"/>`+cres(29,20,7.5,'#E70013','#fff')+star(32,20,3.6,'#E70013');break;
   case 'lb':s=R(0,10,'#ED1C24')+R(10,20,'#fff')+R(30,10,'#ED1C24')+`<polygon points="30,12 38,27 22,27" fill="#00A651"/><rect x="29" y="27" width="2" height="3" fill="#00A651"/>`;break;
   case 'tr':s=R(0,40,'#E30A17')+cres(23,20,10,'#fff','#E30A17')+star(33,20,4.5,'#fff');break;
   case 'jp':s=R(0,40,'#fff')+`<circle cx="30" cy="20" r="11" fill="#BC002D"/>`;break;
   case 'fr':s=V(0,20,'#0055A4')+V(20,20,'#fff')+V(40,20,'#EF4135');break;
   case 'it':s=V(0,20,'#009246')+V(20,20,'#fff')+V(40,20,'#CE2B37');break;
   case 'de':s=R(0,13.4,'#000')+R(13.3,13.4,'#DD0000')+R(26.6,13.4,'#FFCE00');break;
   case 'cn':s=R(0,40,'#DE2910')+star(11,11,6,'#FFDE00')+star(21,5,2,'#FFDE00')+star(24,10,2,'#FFDE00')+star(24,16,2,'#FFDE00')+star(21,21,2,'#FFDE00');break;
  }
  return `<svg class="ln-flag" viewBox="0 0 60 40" preserveAspectRatio="none"><g>${s}</g><rect x=".5" y=".5" width="59" height="39" fill="none" stroke="rgba(0,0,0,.18)"/></svg>`;
}
function egFlags(){
  lnCards({title:'أعلام الدول',cls:'flags',items:FLAGS.map(f=>({h:flagSvg(f.k),t:plain(f.n),say:[{say:f.n}]})),qkey:'egy:flags',
    quiz:()=>lnQuiz({key:'egy:flags',title:'أعلام الدول',qs:shuffle(FLAGS.slice()).slice(0,6).map(f=>({say:[{say:EG_SAY.flagQ},{say:f.n}],top:`<div class="ln-big-t">فين علم ${plain(f.n)}؟</div>`,cls:'flags',
      opts:shuffle([f,...shuffle(FLAGS.filter(x=>x!==f)).slice(0,2)]).map(x=>({h:flagSvg(x.k),ok:x===f}))}))})});
  lnIntro(EG_SAY.flags);
}

/* ===== ٨. ألعاب التفكير ===== */
function thHome(back){
  lnT('ألعاب التفكير');
  const L=[lnCol(4,{n:'لعبة الذاكرة',e:'🃏',sub:[1,2,3].some(l=>lnStarsOf('think:mem'+l))?'★':'',go:()=>lnGo(thMemLv)}),
    lnCol(2,{n:'إيه اللي بعده؟',e:'🔁',sub:lnStarTxt('think:pat'),go:()=>lnGo(thPat)}),
    lnCol(0,{n:'الأشكال',ico:'<span class="em">🔺</span>',sub:lnStarTxt('think:shapes'),go:()=>lnGo(thShapes)}),
    lnCol(5,{n:'رتّب الحكاية',e:'🎞️',sub:lnStarTxt('think:story'),go:()=>lnGo(thStory)})];
  const b=lnB(lnTiles(L));lnBindTiles(b,L);
  if(!back)lnSay(TH_SAY.home);
}
function thMemLv(back){
  lnT('لعبة الذاكرة');
  const L=[[1,4,'🐣 سهل'],[2,6,'🐥 متوسط'],[3,8,'🦅 صعب']].map(([l,n,t],i)=>lnCol(i+1,{n:t,e:['🐶','🍎','🚗'][i],sub:arDigits(n)+' أزواج '+lnStarTxt('think:mem'+l),go:()=>lnGo(()=>thMem(l,n))}));
  const b=lnB(lnTiles(L));lnBindTiles(b,L);
  if(!back)lnSay(TH_SAY.mem);
}
function thMem(lv,n){
  lnT('لعبة الذاكرة');
  const set=shuffle(pick(TH_MEM).slice()).slice(0,n),cards=shuffle([...set,...set]);
  let open=[],found=0,moves=0,lock=false;
  const b=lnB(`<p class="ln-instr" id="lnMv">المحاولات: ${arDigits(0)}</p><div class="ln-mem c${n}">${cards.map((e,i)=>`<button class="ln-mc" data-i="${i}"><span class="f">❓</span><span class="b">${e}</span></button>`).join('')}</div>`);
  b.querySelectorAll('.ln-mc').forEach(c=>c.onclick=()=>{
    if(lock||c.classList.contains('up'))return;c.classList.add('up');tone([600],'sine',.04);open.push(c);
    if(open.length===2){moves++;$('#lnMv').textContent='المحاولات: '+arDigits(moves);lock=true;
      const[a,z]=open;
      if(cards[+a.dataset.i]===cards[+z.dataset.i]){setTimeout(()=>{a.classList.add('done');z.classList.add('done');ding();open=[];lock=false;found++;
        if(found===n){const miss=moves<=Math.ceil(n*1.6)?0:moves<=Math.ceil(n*2.3)?1:3;speak([{say:gs(TH_SAY.memWin)}]).then(()=>{if(S.screen==='learn')lnFinish('think:mem'+lv,miss,()=>thMem(lv,n))})}},350)}
      else setTimeout(()=>{a.classList.remove('up');z.classList.remove('up');open=[];lock=false},900);
    }
  });
  lnIntro(TH_SAY.mem);
}
function thPatGen(i){
  const SH=['🔴','🔵','🟢','🟡','🟣','🟠'],EM=['🐶','🐱','🍎','⭐','🌙','🚗','🐟','🌸'];
  const t=i<2?0:i<4?pick([1,2]):pick([2,3,4]);
  if(t===4){const st=1+Math.floor(Math.random()*4),d=pick([1,2]),seq=[0,1,2,3].map(k=>st+k*d),ans=st+4*d;
    const o=new Set([ans]);[ans+1,ans-1,ans+d+1].forEach(v=>{if(o.size<3&&v>0&&v!==ans)o.add(v)});
    return{seq:seq.map(v=>`<span class="ln-pn">${arDigits(v)}</span>`),ans:`<span class="ln-pn">${arDigits(ans)}</span>`,opts:[...o].map(v=>`<span class="ln-pn">${arDigits(v)}</span>`)}}
  const pool=shuffle((Math.random()<.5?SH:EM).slice());
  const unit=t===0?[pool[0],pool[1]]:t===1?[pool[0],pool[0],pool[1]]:t===2?[pool[0],pool[1],pool[2]]:[pool[0],pool[1],pool[1]];
  const len=unit.length*2+(t===0?1:0),full=Array.from({length:len+1},(_,k)=>unit[k%unit.length]);
  const ans=full[len];return{seq:full.slice(0,len),ans,opts:[...new Set([ans,...pool.slice(0,4)])].slice(0,3)};
}
function thPat(){
  lnQuiz({key:'think:pat',title:'إيه اللي بعده؟',again:()=>thPat(),qs:Array.from({length:6},(_,i)=>{const p=thPatGen(i);
    return{say:[{say:TH_SAY.pat}],top:`<div class="ln-pat">${p.seq.map(x=>`<span>${x}</span>`).join('')}<span class="ln-pq">؟</span></div>`,cls:'emo',
      opts:shuffle(p.opts.slice()).map(o=>({h:o,ok:o===p.ans}))}})});
}
function shapeSvg(k,c='#5B47E0'){
  const P={circle:'<circle cx="50" cy="50" r="38"/>',square:'<rect x="14" y="14" width="72" height="72" rx="4"/>',triangle:'<polygon points="50,10 90,86 10,86"/>',
   rect:'<rect x="6" y="26" width="88" height="48" rx="4"/>',heart:'<path d="M50 86C20 64 8 48 8 32 8 18 19 10 30 10c9 0 16 5 20 13 4-8 11-13 20-13 11 0 22 8 22 22 0 16-12 32-42 54Z"/>',
   oval:'<ellipse cx="50" cy="50" rx="30" ry="42"/>',diamond:'<polygon points="50,6 88,50 50,94 12,50"/>'};
  const poly=(n,r=42)=>`<polygon points="${Array.from({length:n},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return `${(50+Math.cos(a)*r).toFixed(1)},${(52+Math.sin(a)*r).toFixed(1)}`}).join(' ')}"/>`;
  const starP=()=>{let p='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?18:44;p+=`${(50+Math.cos(a)*r).toFixed(1)},${(53+Math.sin(a)*r).toFixed(1)} `}return `<polygon points="${p}"/>`};
  const body=P[k]||(k==='pent'?poly(5):k==='hex'?poly(6):starP());
  return `<svg class="ln-shape" viewBox="0 0 100 100"><g fill="${c}" stroke="rgba(0,0,0,.18)" stroke-width="3" stroke-linejoin="round">${body}</g></svg>`;
}
const TH_SC=['#FF5A45','#2F8FE6','#11A893','#F2AE10','#9B4DE0','#F25C9A','#3FAE4F','#F2760F','#5B47E0','#C63E2C'];
function thShapes(){
  lnCards({title:'الأشكال',items:TH_SHAPES.map((s,i)=>({h:shapeSvg(s.k,TH_SC[i]),t:plain(s.n),say:[{say:s.n},{say:s.f}]})),qkey:'think:shapes',
    quiz:()=>lnQuiz({key:'think:shapes',title:'الأشكال',qs:shuffle(TH_SHAPES.map((s,i)=>({s,i}))).slice(0,6).map(({s,i})=>({say:[{say:'فِين'},{say:s.n}],top:`<div class="ln-big-t">فين ${plain(s.n)}؟</div>`,cls:'emo',
      opts:shuffle([i,...shuffle(TH_SHAPES.map((_,j)=>j).filter(j=>j!==i)).slice(0,2)]).map(j=>({h:shapeSvg(TH_SHAPES[j].k,TH_SC[(j+3)%10]),ok:j===i}))}))})});
  lnIntro(TH_SAY.shapes);
}
function thStory(){
  const st=pick(TH_STORIES);
  lnOrder({key:'think:story',title:'رتّب الحكاية: '+st.t,instr:'إيه اللي حصل الأول؟',instrSay:TH_SAY.story,items:st.s.map(e=>({h:e})),again:()=>{LN.stack.pop();lnGo(thStory)}});
}

/* ===== ركن الأهل، وقت الشاشة، ودرس اليوم ===== */
const dlToday=(d=new Date())=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const kKey=(n,k)=>'p:'+normName(n)+':'+k;
const kget=(n,k,d)=>store.get(kKey(n,k),d), kset=(n,k,v)=>store.set(kKey(n,k),v);
const SEC_INFO={read:['القراءة','📖'],dict:['الإملاء','✏️'],wor:['العبادات','🕌'],sci:['اكتشف العالم','🔬'],life:['مهارات الحياة','🕐'],eng:['English Words','🇬🇧'],
 egy:['مصر والعالم','🗺️'],think:['ألعاب التفكير','🧩'],letters:['الحروف','🔤'],numbers:['الأرقام','🔢'],animals:['الحيوانات','🦁'],quran:['القرآن الكريم','📗'],
 hadith:['الأحاديث','🕌'],story:['القصص','📚'],iq:['الذكاء','🧠'],math:['الرياضيات','➗'],sit:['مواقف وحلول','🦸'],games:['ألعاب الجوايز','🎮']};
function secOf(){
  const s=S.screen;
  if(s==='learn')return LN.sec==='parent'?null:LN.sec;
  if(s==='qlist'||s==='surah')return 'quran';if(s==='hlist'||s==='hadith')return 'hadith';
  if(s==='iq'||s==='iqq'||s==='medal')return 'iq';if(s==='board'||s==='lang'||s==='done')return S.cat||null;
  if(['games','race','jump','chess','farm','blocks'].includes(s))return 'games';
  if(['sit','math','story'].includes(s))return s;return null;
}
function dlMinutes(name,day=dlToday()){const A=kget(name,'act',{})[day]||{};return Object.values(A).reduce((a,b)=>a+b,0)}
let dlLastTick=Date.now();
setInterval(()=>{
  const now=Date.now(),dt=Math.min(30,(now-dlLastTick)/1000);dlLastTick=now;
  if(!S.name||S.screen==='login'||document.hidden)return;
  if($('#ptLock'))return;
  const sec=secOf();if(!sec)return;
  const A=pget('act',{}),d=dlToday();A[d]=A[d]||{};A[d][sec]=Math.round(((A[d][sec]||0)+dt/60)*100)/100;
  const keys=Object.keys(A);if(keys.length>40)keys.sort((a,b)=>new Date(a)-new Date(b)).slice(0,keys.length-40).forEach(k=>delete A[k]);
  pset('act',A);
  if((A[d][sec]||0)>=2)dlMark(sec,true);
  ptCheck();
},10000);
document.addEventListener('visibilitychange',()=>{dlLastTick=Date.now()});
/* وقت الشاشة */
function ptLimit(){return +pget('limit',0)}
function ptCheck(){
  const lim=ptLimit();if(!lim||!S.name||S.screen==='login')return;
  const extra=(pget('limitExtra',{})[dlToday()]||0);
  if(dlMinutes(S.name)>=lim+extra&&!$('#ptLock'))ptLock(lim);
}
function ptLock(lim){
  vStop&&vStop();
  const ov=document.createElement('div');ov.className='iqdone';ov.id='ptLock';
  ov.innerHTML=`<div class="card"><div style="font-size:4rem">🌙</div><p class="m">خلص وقت اللعب النهارده</p><p class="k">الوقت المسموح: ${arDigits(lim)} دقيقة. نكمّل بكرة إن شاء الله!</p><button class="go" style="background:linear-gradient(180deg,#7CC3FF,#2F8FE6);box-shadow:0 6px 0 #1E6CB3">👨‍👩‍👧 ولي الأمر</button></div>`;
  document.body.appendChild(ov);
  ov.querySelector('.go').onclick=()=>prGate(ok=>{if(!ok)return;const E=pget('limitExtra',{});E[dlToday()]=(E[dlToday()]||0)+15;pset('limitExtra',E);ov.remove();tone([660,880],'sine',.08)},'وقت إضافي ١٥ دقيقة');
  speak([{say:PR_SAY.limit}]);
}
/* درس اليوم */
const DL_POOL=[['read','dict','sci','eng','life','letters','numbers'],['quran','wor','hadith','sit'],['think','math','iq','egy']];
function dlHash(s){let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h}
function dlPlan(){const d=dlToday(),h=dlHash(d+normName(S.name));return DL_POOL.map((p,i)=>p[(h>>>(i*5))%p.length])}
function dlState(){const D=pget('daily',{});const d=dlToday();if(!D[d])D[d]={done:[],given:0};return [D,D[d]]}
function dlMark(sec,byTime){
  if(!S.name||!sec)return;const plan=dlPlan();if(!plan.includes(sec))return;
  const[D,T]=dlState();if(T.done.includes(sec))return;T.done.push(sec);
  const ks=Object.keys(D);if(ks.length>40)ks.sort((a,b)=>new Date(a)-new Date(b)).slice(0,ks.length-40).forEach(k=>delete D[k]);
  pset('daily',D);
  if(T.done.length>=3&&!T.given){T.given=1;pset('daily',D);dlReward()}
  if(S.screen==='home')dlPaint();
}
function dlTouch(sec){}
function dlReward(){
  const y=new Date();y.setDate(y.getDate()-1);
  const st=pget('streak',{n:0,last:''});st.n=st.last===dlToday(y)?st.n+1:st.last===dlToday()?st.n:1;st.last=dlToday();st.best=Math.max(st.best||0,st.n);pset('streak',st);
  S.stars+=5;pset('stars',S.stars);$('#starTotal').textContent=arDigits(S.stars);S.raceRuns=Math.max(S.raceRuns||0,3);
  setTimeout(()=>{
    const ov=document.createElement('div');ov.className='iqdone';
    const badge=[30,14,7,3].find(n=>st.n===n);
    ov.innerHTML=`<div class="card"><p class="k">درس اليوم</p><div style="font-size:4rem">${badge?'🏆':'🎉'}</div><p class="m">${g('خلصت درس النهارده كله!','خلصتي درس النهارده كله!')}</p><p class="k">🔥 ${arDigits(st.n)} ${st.n===1?'يوم':'أيام'} ورا بعض · ⭐ +${arDigits(5)}</p>${badge?`<p class="ln-badge">وسام ${arDigits(badge)} أيام 🏅</p>`:''}<button class="go">🎁 العب ألعاب الجوايز</button><button class="go ln-back" style="margin-top:10px;background:linear-gradient(180deg,#7CC3FF,#2F8FE6);box-shadow:0 6px 0 #1E6CB3">تمام</button></div>`;
    document.body.appendChild(ov);ding();setTimeout(()=>confetti(ov.querySelector('.m')),300);
    ov.querySelector('.go').onclick=()=>{ov.remove();openGames()};ov.querySelector('.ln-back').onclick=()=>ov.remove();
    speak([{say:gs(PR_SAY.dayDone)},...(st.n>=2?[{say:gs(PR_SAY.streak)}]:[])]);
  },1200);
}
function dlOpenSec(sec){
  if(LN_SEC[sec])return lnOpen(sec);
  const m={quran:()=>$('#quranBtn').click(),hadith:()=>$('#hadithBtn').click(),sit:()=>goSit(),math:()=>goMath(),iq:()=>goIQ(),story:()=>$('#storyBtn').click(),
    letters:()=>document.querySelector('[data-cat="letters"]').click(),numbers:()=>document.querySelector('[data-cat="numbers"]').click(),animals:()=>document.querySelector('[data-cat="animals"]').click()};
  (m[sec]||goHome)();
}
function dlPaint(){
  const box=$('#dailyBox');if(!box||!S.name)return;
  const plan=dlPlan(),[,T]=dlState(),st=pget('streak',{n:0,last:''});
  const y=new Date();y.setDate(y.getDate()-1);const live=st.last===dlToday()||st.last===dlToday(y)?st.n:0;
  box.innerHTML=`<div class="dl-head"><b>📅 درس اليوم</b><span class="dl-fire">🔥 ${arDigits(live)}</span></div>
   <div class="dl-tasks">${plan.map(s=>`<button class="dl-task${T.done.includes(s)?' ok':''}" data-s="${s}"><span>${SEC_INFO[s][1]}</span><small>${SEC_INFO[s][0]}</small><i>${T.done.includes(s)?'✔':''}</i></button>`).join('')}</div>`;
  box.querySelectorAll('.dl-task').forEach(t=>t.onclick=()=>{tone([660],'sine',.05);dlOpenSec(t.dataset.s)});
}
/* بوابة ولي الأمر: رقم سري من ٤ أرقام */
function prGate(cb,why){
  const pin=store.get('parentPin','');let typed='',first='',stage=pin?'enter':'new';
  const ov=document.createElement('div');ov.className='iqdone pr-gate';
  let built=false;
  const build=()=>{ov.innerHTML=`<div class="card"><p class="k">${why?lnEsc(why)+' · ':''}ركن الأهل 🔒</p><p class="m pr-msg"></p><div class="pr-dots">${[0,1,2,3].map(()=>'<i></i>').join('')}</div>
    <div class="pr-pad">${[1,2,3,4,5,6,7,8,9,'⌫',0,'✕'].map(k=>`<button data-k="${k}">${typeof k==='number'?arDigits(k):k}</button>`).join('')}</div><button class="pr-forgot">نسيت الرقم السري</button></div>`;
    ov.querySelectorAll('.pr-pad button').forEach(b=>b.onclick=()=>press(b.dataset.k));
    ov.querySelector('.pr-forgot').onclick=()=>forgot();built=true};
  // بنرسم النافذة مرة واحدة بس، وكل ضغطة بتحدّث النقط والرسالة من غير ما النافذة تتفتح من الأول
  const paint=msg=>{if(!built||!ov.querySelector('.pr-pad'))build();
    ov.querySelector('.pr-msg').textContent=msg;
    ov.querySelectorAll('.pr-dots i').forEach((d,i)=>d.classList.toggle('on',i<typed.length));
    ov.querySelector('.pr-forgot').hidden=stage!=='enter'};
  const msgs={enter:'اكتب الرقم السري',new:'اختار رقم سري من ٤ أرقام',confirm:'اكتب الرقم تاني للتأكيد'};
  const press=k=>{
    if(k==='✕'){ov.remove();cb(false);return}if(k==='⌫'){typed=typed.slice(0,-1);paint(msgs[stage]);return}
    if(typed.length<4)typed+=k;paint(msgs[stage]);
    if(typed.length===4)setTimeout(()=>{
      if(stage==='enter'){if(typed===store.get('parentPin','')){ov.remove();cb(true)}else{boop();typed='';paint('الرقم غلط، حاول تاني')}}
      else if(stage==='new'){first=typed;typed='';stage='confirm';paint(msgs.confirm)}
      else{if(typed===first){store.set('parentPin',first);ov.remove();cb(true)}else{boop();typed='';stage='new';paint('الرقمين مش زي بعض، ابدأ تاني')}}
    },200);
  };
  const forgot=()=>{const a=6+Math.floor(Math.random()*4),b=12+Math.floor(Math.random()*8);
    ov.innerHTML=`<div class="card"><p class="k">سؤال للكبار بس</p><p class="m">${arDigits(a)} × ${arDigits(b)} = ؟</p><input class="pr-in" id="prAns" inputmode="numeric" placeholder="اكتب الناتج"><button class="go" id="prOk">تأكيد</button><button class="go" id="prNo" style="margin-top:10px;background:#ccc;box-shadow:0 6px 0 #999">إلغاء</button></div>`;
    ov.querySelector('#prOk').onclick=()=>{const v=String(ov.querySelector('#prAns').value).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));if(+v===a*b){store.set('parentPin','');typed='';stage='new';built=false;paint(msgs.new)}else boop()};
    ov.querySelector('#prNo').onclick=()=>{ov.remove();cb(false)}};
  paint(msgs[stage]);document.body.appendChild(ov);
}
function prOpen(){prGate(ok=>{if(ok)lnOpen('parent')})}
let PR_KID=null;
function prHome(){
  lnT('ركن الأهل');
  const kids=kidsList();if(!PR_KID||!kids.some(k=>normName(k.name)===normName(PR_KID)))PR_KID=(kids[0]||{}).name||S.name;
  const n=PR_KID,act=kget(n,'act',{}),days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(d)}
  const mins=days.map(d=>Object.values(act[dlToday(d)]||{}).reduce((a,b)=>a+b,0));
  const week={};days.forEach(d=>{const A=act[dlToday(d)]||{};for(const k in A)week[k]=(week[k]||0)+A[k]});
  const stars=kget(n,'lnStars',{}),secSt={};for(const k in stars){const s=k.split(':')[0];(secSt[s]=secSt[s]||[]).push(stars[k])}
  const sit=kget(n,'sitStars',{});const sv=Object.values(sit);if(sv.length)secSt.sit=sv;
  const avg=s=>secSt[s]?secSt[s].reduce((a,b)=>a+b,0)/secSt[s].length:null;
  const rated=Object.keys(secSt).filter(s=>SEC_INFO[s]).sort((a,b)=>avg(b)-avg(a));
  const best=rated[0],weak=rated.length>1?rated[rated.length-1]:null;
  const mx=Math.max(10,...mins),st=kget(n,'streak',{n:0,best:0}),lim=+kget(n,'limit',0);
  const dn=['حد','اتنين','تلات','أربع','خميس','جمعة','سبت'];
  const secs=Object.keys(SEC_INFO).filter(s=>week[s]||secSt[s]).sort((a,b)=>(week[b]||0)-(week[a]||0));
  const fm=m=>m<1?'أقل من دقيقة':arDigits(Math.round(m))+' دقيقة';
  const b=lnB(`<div class="pr-kids">${kids.map(k=>`<button class="pr-kid${normName(k.name)===normName(n)?' on':''}" data-n="${lnEsc(k.name)}">${k.gender==='f'?'👧':'👦'} ${lnEsc(k.name)}</button>`).join('')}</div>
   <div class="pr-cards"><div><b>⭐ ${arDigits(kget(n,'stars',0))}</b><small>النجوم</small></div><div><b>⏱ ${fm(mins[6])}</b><small>النهارده</small></div><div><b>📅 ${fm(mins.reduce((a,b)=>a+b,0))}</b><small>آخر ٧ أيام</small></div><div><b>🔥 ${arDigits(st.n||0)}</b><small>أيام ورا بعض (أحسن ${arDigits(st.best||0)})</small></div></div>
   <div class="pr-box"><p class="pr-h">وقت التعلّم في آخر ٧ أيام</p><div class="pr-bars">${mins.map((m,i)=>`<div><span style="height:${Math.max(3,m/mx*100)}%"></span><small>${dn[days[i].getDay()]}</small><em>${arDigits(Math.round(m))}</em></div>`).join('')}</div></div>
   ${best||weak?`<div class="pr-box pr-sw">${best?`<p>💪 <b>أقوى حاجة:</b> ${SEC_INFO[best][1]} ${SEC_INFO[best][0]}</p>`:''}${weak&&weak!==best?`<p>🎯 <b>محتاج تمرين أكتر:</b> ${SEC_INFO[weak][1]} ${SEC_INFO[weak][0]}</p>`:''}</div>`:''}
   <div class="pr-box"><p class="pr-h">اتعلّم إيه الأسبوع ده</p>${secs.length?secs.map(s=>{const a=avg(s);return `<div class="pr-row"><span>${SEC_INFO[s][1]} ${SEC_INFO[s][0]}</span><em>${fm(week[s]||0)}</em><i>${a!=null?'★'.repeat(Math.round(a))+'☆'.repeat(3-Math.round(a)):''}</i></div>`}).join(''):'<p class="pr-empty">لسه ما لعبش الأسبوع ده.</p>'}</div>
   <div class="pr-box"><p class="pr-h">⏰ وقت الشاشة في اليوم</p><div class="pr-lim">${[0,15,30,45,60,90,120].map(v=>`<button data-l="${v}" class="${v===lim?'on':''}">${v?arDigits(v)+' د':'بدون حد'}</button>`).join('')}</div><p class="pr-note">لما الوقت يخلص، ميس بسمة بتقول للطفل يرتاح، واللعبة بتقفل لحد بكرة. تقدر تزوّد ١٥ دقيقة بالرقم السري.</p></div>
   <div class="pr-box"><button class="btn2 c-sky" id="prPin">🔑 غيّر الرقم السري</button></div>`);
  b.querySelectorAll('.pr-kid').forEach(x=>x.onclick=()=>{PR_KID=x.dataset.n;prHome()});
  b.querySelectorAll('.pr-lim button').forEach(x=>x.onclick=()=>{kset(n,'limit',+x.dataset.l);tone([660],'sine',.05);prHome()});
  $('#prPin').onclick=()=>{store.set('parentPin','');prGate(()=>prHome(),'رقم سري جديد')};
}
