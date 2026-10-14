
/* ---------- مواقف وحلول: الطفل يختار التصرف الصح في مواقف الحياة ---------- */
const SIT={cat:null,i:-1,miss:0,done:false};
const sitProg=()=>pget('sitStars',{});
function sitEnsure(){
  if($('#sSit'))return;
  const s=document.createElement('section');s.className='screen';s.id='sSit';s.hidden=true;s.innerHTML='<div id="sitBody" class="sit-body"></div>';
  $('#main').appendChild(s);SCREENS.sit='#sSit';
}
function goSit(){
  sitEnsure();SIT.view='home';show('sit');$('#title').textContent='مواقف وحلول';
  const P=sitProg();
  $('#sitBody').innerHTML=`<div class="sit-hero"><span>🦸</span><p>مواقف بتحصل كل يوم… تعالَ نتعلّم نتصرّف صح!</p></div>
   <div class="appgrid two">${SIT_CATS.map((c,k)=>{const L=SITS.filter(x=>x.cat===c.id),d=L.filter(x=>P[SITS.indexOf(x)]).length;
    return `<button class="appicon" data-c="${c.id}" style="--c1:${c.c1};--c2:${c.c2};--cd:${c.cd};--d:${k*.4}s"><span class="float"><span class="ico tilt"><span class="em">${c.e}</span><i class="gloss"></i><i class="shine"></i></span></span><span class="lbl">${c.n}<small class="sit-cnt">${arDigits(d)} من ${arDigits(L.length)}</small></span></button>`}).join('')}</div>`;
  $('#sitBody').querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>sitCat(b.dataset.c));
  speak([{say:gs(SIT_SAY.home)}]);
}
function sitCat(id,quiet){
  SIT.cat=id;SIT.view='cat';const c=SIT_CATS.find(x=>x.id===id),P=sitProg();
  $('#title').textContent=c.n;
  $('#sitBody').innerHTML=`<div class="sit-list">${SITS.map((x,i)=>x.cat!==id?'':`<button class="sit-item" data-i="${i}" style="--c:${c.c2}"><span class="sit-ie">${x.sc[0]}${x.sc[2]}</span><span class="sit-it">${x.t}</span><span class="sit-st">${P[i]?'★'.repeat(P[i])+'☆'.repeat(3-P[i]):'جديد ✨'}</span></button>`).join('')}</div>`;
  $('#sitBody').querySelectorAll('.sit-item').forEach(b=>b.onclick=()=>sitOpen(+b.dataset.i));
  if(!quiet)tone([660],'sine',.05);
}
function sitScene(x){
  const c=SIT_CATS.find(k=>k.id===x.cat);
  return `<div class="sit-stage" style="background:${c.bg}"><span class="sit-a a1">${x.sc[0]}</span><span class="sit-a a2">${x.sc[1]}</span><span class="sit-bub">${x.sc[2]}</span><span class="sit-a a3">${x.sc[3]}</span><span class="sit-cat">${c.e}</span></div>`;
}
function sitOpen(i){
  const x=SITS[i];SIT.i=i;SIT.miss=0;SIT.done=false;SIT.view='sit';SIT.tried=new Set();
  $('#title').textContent=x.t;
  $('#sitBody').innerHTML=`${sitScene(x)}<p class="sit-story">${plain(x.s)}</p>
    <div class="sit-opts">${x.o.map((o,k)=>`<button class="sit-opt" data-k="${k}"><b>${arDigits(k+1)}</b><span>${plain(o)}</span></button>`).join('')}</div>
    <div class="sit-fb" id="sitFb" hidden></div>
    <div class="row sit-btns"><button class="btn2 c-sky" id="sitRe">🔊 اسمع تاني</button><button class="btn2 c-teal" id="sitNext" hidden>الموقف اللي بعده ◀</button></div>`;
  $('#sitBody').querySelectorAll('.sit-opt').forEach(b=>b.onclick=()=>sitAns(+b.dataset.k,b));
  $('#sitRe').onclick=()=>sitRead(x);
  $('#sitNext').onclick=()=>{const nx=SITS.findIndex((y,k)=>k>i&&y.cat===x.cat);if(nx>=0)sitOpen(nx);else sitCatDone(x.cat)};
  $('#main').scrollTop=0;sitRead(x);
}
function sitHl(k){document.querySelectorAll('.sit-opt').forEach((b,j)=>b.classList.toggle('rd',j===k))}
function sitRead(x){
  const O=[SIT_SAY.o1,SIT_SAY.o2,SIT_SAY.o3];
  speak([{say:x.s,on:()=>sitHl(-1)},{say:gs(SIT_SAY.pick)},...x.o.flatMap((o,k)=>[{say:O[k],on:()=>sitHl(k)},{say:o}]),{say:'',on:()=>sitHl(-1)}]);
}
function sitAns(k,b){
  const x=SITS[SIT.i];if(SIT.done||b.disabled)return;sitHl(-1);
  const fb=$('#sitFb');fb.hidden=false;
  if(k===x.ok){
    SIT.done=true;b.classList.add('ok');ding();confetti(b);
    document.querySelectorAll('.sit-opt').forEach(o=>o.disabled=true);
    const st=SIT.miss===0?3:SIT.miss===1?2:1,P=sitProg();P[SIT.i]=Math.max(P[SIT.i]||0,st);pset('sitStars',P);
    S.stars+=st;pset('stars',S.stars);$('#starTotal').textContent=arDigits(S.stars);
    fb.className='sit-fb ok';fb.innerHTML=`<p>${plain(x.f[k])}</p><div class="sit-les">💡 ${plain(x.les)}</div><div class="sit-s3">${'★'.repeat(st)}<i>${'★'.repeat(3-st)}</i></div>`;
    $('#sitNext').hidden=false;
    speak([{say:x.f[k]},{say:x.les}]);
  }else{
    SIT.miss++;b.classList.add('no');b.disabled=true;boop();b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');
    fb.className='sit-fb no';fb.innerHTML=`<p>${plain(x.f[k])}</p>`;
    speak([{say:x.f[k]},{say:gs(SIT_SAY.again)}]);
  }
  fb.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function sitCatDone(id){
  const P=sitProg(),all=SITS.every((x,i)=>x.cat!==id||P[i]);
  if(all){S.raceRuns=Math.max(S.raceRuns||0,3);
    const ov=document.createElement('div');ov.className='iqdone';ov.innerHTML=`<div class="card"><p class="k">${SIT_CATS.find(c=>c.id===id).n}</p><div style="font-size:4rem">🏅</div><p class="m">${g('بقيت بطل في التصرف!','بقيتي بطلة في التصرف!')}</p><button class="go">🎁 العب ألعاب الجوايز</button><button class="go" style="margin-top:10px;background:linear-gradient(180deg,#7CC3FF,#2F8FE6);box-shadow:0 6px 0 #1E6CB3">رجوع للمواقف</button></div>`;
    document.body.appendChild(ov);ding();setTimeout(()=>confetti(ov.querySelector('.m')),300);
    const bs=ov.querySelectorAll('.go');bs[0].onclick=()=>{ov.remove();openGames()};bs[1].onclick=()=>{ov.remove();goSit()};
    speak([{say:gs(SIT_SAY.done)}]);
  }else sitCat(id);
}
function sitBack(){if(SIT.view==='sit'){sitCat(SIT.cat,true);return}if(SIT.view==='cat'){goSit();return}goHome()}
