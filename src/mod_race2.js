/* ===== العربيات: سواقة في زحمة طريق سريع (حارتين رايح وحارتين جاي) ===== */
// العالم بالمتر: x يمين/شمال، dz المسافة قدّام اللاعب. الحارات الشمال جاية علينا، واليمين ماشية معانا
const TR={lanes:[-4.8,-1.6,1.6,4.8],xmax:5.9,v0:19,vcap:31,vmax:46,CH:60,NCH:5};
const TR_TYPES=[['car',.5,4.6,1.95],['suv',.2,4.9,2.05],['truck',.18,8.6,2.45],['bus',.12,11,2.55]];
const TR_COL=[0xf2f2f2,0x2b2f3a,0x9aa3b2,0x3b6fd8,0x1f8a5a,0xd8a21b,0x8a1f2a,0x5a3b8a,0xe8e4d8,0x16181c];
(function(){ // زرار البنزين وعدّاد السرعة
  const rc=document.querySelector('#sRace .race-ctrl');if(!rc||document.getElementById('gasBtn'))return;
  rc.classList.add('tr3');const gb=document.createElement('button');gb.className='steer gas';gb.id='gasBtn';gb.setAttribute('aria-label','بنزين');
  gb.innerHTML='<span class="ge">🚀</span><small>بنزين</small>';rc.insertBefore(gb,document.getElementById('rightBtn'));
  const hud=document.querySelector('#raceWrap .hud');if(hud){const sp=document.createElement('span');sp.className='spd';sp.innerHTML='<b id="rSpd">٠</b><small>كم/س</small>';hud.insertBefore(sp,hud.lastElementChild)}
  const st=document.querySelector('#raceStart .sm');if(st)st.innerHTML='سوق في الزحمة وعدّي العربيات 🚗🚚<br>دوس 🚀 عشان تسرّع، وعدّي جنبهم قريب تاخد نقط زيادة';
  const hold=(id,on,off)=>{const b=document.getElementById(id);b.addEventListener('pointerdown',e=>{e.preventDefault();b.classList.add('down');on()});['pointerup','pointerleave','pointercancel'].forEach(t=>b.addEventListener(t,()=>{b.classList.remove('down');off()}))};
  hold('leftBtn',()=>RC.hold=-1,()=>{if(RC.hold<0)RC.hold=0});hold('rightBtn',()=>RC.hold=1,()=>{if(RC.hold>0)RC.hold=0});hold('gasBtn',()=>RC.gas=true,()=>RC.gas=false);
  const w=document.getElementById('raceWrap');
  w.addEventListener('pointerdown',e=>{if(e.target.closest('button')||!RC.run)return;const r=w.getBoundingClientRect();RC.hold=e.clientX-r.left<r.width/2?-1:1;RC.wHold=true});
  ['pointerup','pointercancel','pointerleave'].forEach(t=>w.addEventListener(t,()=>{if(RC.wHold){RC.hold=0;RC.wHold=false}}));
  document.addEventListener('keydown',e=>{if(S.screen!=='race')return;if(e.key==='ArrowLeft')RC.hold=-1;if(e.key==='ArrowRight')RC.hold=1;if(e.key==='ArrowUp'||e.key===' '){RC.gas=true;e.preventDefault()}});
  document.addEventListener('keyup',e=>{if(e.key==='ArrowLeft'&&RC.hold<0)RC.hold=0;if(e.key==='ArrowRight'&&RC.hold>0)RC.hold=0;if(e.key==='ArrowUp'||e.key===' ')RC.gas=false});
})();
function steer(d){if(!RC.run)return;RC.tap=d;RC.tapT=.16} // لمسة سريعة = حركة صغيرة
function resetRace(){
  Object.assign(RC,{x:1.6,vx:0,v:0,hold:0,gas:false,tap:0,tapT:0,traffic:[],stars:[],t:0,score:0,bonus:0,dist:0,lives:3,inv:0,shake:0,starsN:0,pop:[],sp:.4,ss:2.5,opp:0});
  if(RC.r3)for(const[o,m]of RC.r3.objs){trRelease(RC.r3,o,m)}
  $('#rScore').textContent=arDigits(0);drawLives();const s=$('#rSpd');if(s)s.textContent=arDigits(0);
}
function trSpawn(){
  const opp=Math.random()<.45,lane=opp?(Math.random()<.5?0:1):(Math.random()<.5?2:3);
  let r=Math.random(),ty=TR_TYPES[0];for(const t of TR_TYPES){if(r<t[1]){ty=t;break}r-=t[1]}
  const dz=150+Math.random()*40;
  // ماتقفلش الطريق كله: لازم حارة فاضية قريبة
  const near=RC.traffic.filter(c=>Math.abs(c.dz-dz)<ty[2]+16);
  if(near.some(c=>c.lane===lane))return;
  if(new Set(near.map(c=>c.lane)).size>=2)return;
  const v=opp?13+Math.random()*7:(ty[0]==='truck'||ty[0]==='bus'?10+Math.random()*5:13+Math.random()*7);
  RC.traffic.push({lane,x:TR.lanes[lane],dz,v,opp,type:ty[0],len:ty[2],w:ty[3],col:TR_COL[Math.floor(Math.random()*TR_COL.length)]});
}
function loop(now){
  if(!RC.run||S.screen!=='race'){RC.run=false;return}
  const dt=Math.min(.05,(now-RC.last)/1000);RC.last=now;RC.t+=dt;
  // السرعة: بتزيد لوحدها شوية شوية، والبنزين بيوصّلها لأقصى سرعة
  const cruise=Math.min(TR.v0+RC.t*.1,TR.vcap),target=RC.gas?TR.vmax:cruise;
  if(RC.v<target)RC.v=Math.min(target,RC.v+(RC.gas?8:6)*dt);else RC.v=Math.max(target,RC.v-7*dt);
  // التوجيه الناعم
  if(RC.tapT>0)RC.tapT-=dt;const inp=RC.hold||(RC.tapT>0?RC.tap:0);
  RC.vx+=(inp*9-RC.vx)*Math.min(1,dt*7);RC.x+=RC.vx*dt;
  if(Math.abs(RC.x)>TR.xmax){RC.x=Math.sign(RC.x)*TR.xmax;RC.vx=0;if(RC.shake<=0)RC.shake=.12}
  RC.dist+=RC.v*dt;
  const opp=RC.x<0; if(opp&&RC.v>20)RC.opp+=dt*(RC.v>30?14:8); // السواقة في الاتجاه المعاكس عليها نقط زيادة
  // العربيات
  RC.sp-=dt;if(RC.sp<=0){trSpawn();RC.sp=(.6+Math.random()*.7)*Math.max(.6,1.3-RC.t/150)*(26/Math.max(RC.v,14))}
  RC.ss-=dt;if(RC.ss<=0){RC.ss=2.2+Math.random()*2.5;const l=Math.floor(Math.random()*4),dz=150;if(!RC.traffic.some(c=>c.lane===l&&Math.abs(c.dz-dz)<12))RC.stars.push({x:TR.lanes[l],dz,rot:0})}
  const PL=4.6,PW=1.9;
  for(const c of RC.traffic){const pdz=c.dz;
    if(c.hit){c.dz+=((c.opp?-c.v:c.v)*.3-RC.v)*dt;c.spin=(c.spin||0)+dt*5;continue}
    // العربية ورا عربية أبطأ في نفس الحارة بتهدّي
    if(!c.opp){const f=RC.traffic.find(o=>o!==c&&o.lane===c.lane&&o.dz>c.dz&&o.dz-c.dz<(o.len+c.len)/2+6);if(f)c.v=Math.min(c.v,f.v)}
    c.dz+=((c.opp?-c.v:c.v)-RC.v)*dt;
    const dx=Math.abs(c.x-RC.x),hitX=dx<(PW+c.w)/2*.92,hitZ=Math.abs(c.dz)<(PL+c.len)/2*.9;
    if(hitX&&hitZ){
      if(RC.inv<=0){c.hit=true;RC.lives--;RC.inv=2;RC.shake=.45;RC.v*=.4;RC.vx=0;boop();drawLives();
        if(RC.lives<=0){endRace();return}
        speak([{say:pick(['حاسِب!','أُوبَّا! خَلِّي بالَك!',g('مِش مُشْكِلَة، كَمِّل!','مِش مُشْكِلَة، كَمِّلِي!')])}],false)}
    }else if(pdz>0&&c.dz<=0&&!c.near&&dx<(PW+c.w)/2+1.25&&RC.v>18){ // عدّيت جنبها قريب
      c.near=true;const b=RC.v>32?40:20;RC.bonus+=b;RC.pop.push({x:c.x,dz:2,t:1,txt:'قريبة! +'+arDigits(b)});tone([660,990],'sine',.06);
      if(Math.random()<.2)speak([{say:pick(['جامِد!','عاش!','إِيه الحَلاوَة دِي!'])}],false)}
  }
  RC.traffic=RC.traffic.filter(c=>c.dz>-40&&c.dz<260);
  for(const s of RC.stars){s.dz-=RC.v*dt;s.rot+=dt*3;
    if(!s.got&&Math.abs(s.x-RC.x)<1.7&&Math.abs(s.dz)<2.6){s.got=true;RC.bonus+=10;RC.starsN++;tone([880,1175],'sine',.07);RC.pop.push({x:s.x,dz:2,t:.8,txt:'+١٠'});
      if(RC.starsN%5===0)speak([{say:pick(['جامِد!','عاش!','إِيه الحَلاوَة دِي!'])}],false)}}
  RC.stars=RC.stars.filter(s=>s.dz>-10&&!s.got);
  if(RC.inv>0)RC.inv-=dt;if(RC.shake>0)RC.shake-=dt;
  RC.pop=RC.pop.filter(p=>(p.t-=dt)>0);
  RC.score=Math.floor(RC.dist/12+RC.bonus+RC.opp);
  $('#rScore').textContent=arDigits(RC.score);const sp=$('#rSpd');if(sp)sp.textContent=arDigits(Math.round(RC.v*3.6));
  drawRace();
  RC.raf=requestAnimationFrame(loop);
}
/* ---- الرسم العادي لو الجهاز مابيدعمش 3D ---- */
function drawRace(){
  if(RC.r3){race3Render();return}
  const c=RC.ctx;if(!c)return;const W=RC.w,H=RC.h,s=Math.min(W/17,32),cx=W/2,py=H*.78,X=x=>cx+x*s,Y=dz=>py-dz*s*.9;
  c.save();if(RC.shake>0)c.translate((Math.random()-.5)*8,(Math.random()-.5)*5);
  c.fillStyle='#5aa846';c.fillRect(-10,-10,W+20,H+20);
  c.fillStyle='#3a3d45';c.fillRect(X(-7.4),0,14.8*s,H);
  const off=((RC.dist||0)*s*.9)%40;
  c.fillStyle='#f2f2f2';c.fillRect(X(-6.6),0,4,H);c.fillRect(X(6.6)-4,0,4,H);c.fillRect(X(0)-3,0,6,H);
  for(const lx of [-3.2,3.2])for(let y=-40+off;y<H;y+=40)c.fillRect(X(lx)-2,y,4,20);
  c.fillStyle='#b9c0c9';c.fillRect(X(-7.6)-3,0,5,H);c.fillRect(X(7.6)-2,0,5,H);
  for(const st of RC.stars||[])drawStar(c,X(st.x),Y(st.dz),s*.8,st.rot);
  for(const t of RC.traffic||[]){const col='#'+t.col.toString(16).padStart(6,'0');drawCar(c,X(t.x),Y(t.dz),t.w*s,t.len*s*.9,col,t.opp)}
  if(!(RC.inv>0&&Math.floor(RC.inv*10)%2))drawCar(c,X(RC.x??1.6),py,1.9*s,4.6*s*.9,S.gender==='f'?'#ff4f9a':'#e8322b',false);
  for(const p of RC.pop||[]){c.globalAlpha=Math.min(1,p.t*2);c.fillStyle='#fff';c.strokeStyle='#5B47E0';c.lineWidth=5;c.font=`800 ${Math.round(s*1.1)}px ${getComputedStyle(document.body).fontFamily}`;c.textAlign='center';const y=Y(p.dz)-(1-p.t)*50;c.strokeText(p.txt,X(p.x),y);c.fillText(p.txt,X(p.x),y);c.globalAlpha=1}
  c.restore();
}
/* ---- المركبات 3D: ملاكي، جيب، عربية نقل بصندوق، أتوبيس (مقدّمتهم لقدّام -z) ---- */
function trGeo(k,f){return M3['g_'+k]||(M3['g_'+k]=f())}
function trWheels(g,list,r){
  if(!M3.tire){M3.tire=std(0x151515,{r:.92});M3.rim=std(0xcfd4dc,{r:.3,m:.8})}
  const wg=trGeo('w'+r,()=>{const q=new T3.CylinderGeometry(r,r,.36,18);q.rotateZ(Math.PI/2);return q}),rg=trGeo('r'+r,()=>{const q=new T3.CylinderGeometry(r*.58,r*.58,.38,8);q.rotateZ(Math.PI/2);return q});
  g.userData.wheels=[];for(const[x,z]of list){const w=new T3.Group();w.add(new T3.Mesh(wg,M3.tire),new T3.Mesh(rg,M3.rim));w.position.set(x,r,z);g.add(w);g.userData.wheels.push(w)}}
function trLights(g,w,zf,zb,y){
  if(!M3.hl){M3.hl=std(0xffffff,{e:0xfff1b8,ei:2});M3.tl=std(0x400000,{e:0xff2020,ei:1.6})}
  const b=trGeo('lt',()=>new T3.BoxGeometry(.4,.16,.08));
  for(const x of[-w/2+.35,w/2-.35]){const h=new T3.Mesh(b,M3.hl);h.position.set(x,y,zf);const t=new T3.Mesh(b,M3.tl);t.position.set(x,y,zb);g.add(h,t)}}
function trShadow(g,w,l){const s=new T3.Mesh(trGeo('sh',()=>new T3.PlaneGeometry(1,1)),M3.shm||(M3.shm=new T3.MeshBasicMaterial({color:0,transparent:true,opacity:.3,depthWrite:false})));s.scale.set(w+.5,l+.6,1);s.rotation.x=-Math.PI/2;s.position.y=.03;g.add(s)}
function trBox(g,geoK,size,mat,pos){const m=new T3.Mesh(trGeo(geoK,()=>new T3.BoxGeometry(...size)),mat);m.position.set(...pos);m.castShadow=true;g.add(m);return m}
function makeVehicle(type,color){
  if(type==='car'){const c=makeCar(color);c.userData.wheels=c.userData.wheels;return c}
  const g=new T3.Group(),paint=new T3.MeshPhysicalMaterial({color,metalness:.35,roughness:.35,clearcoat:.8,clearcoatRoughness:.1});g.userData.paint=paint;
  const glass=M3.glass||(M3.glass=new T3.MeshPhysicalMaterial({color:0x16222f,metalness:.3,roughness:.05,clearcoat:1})),dark=M3.dark||(M3.dark=std(0x22252b,{r:.7}));
  if(type==='suv'){
    trBox(g,'s1',[2.05,1.0,4.9],paint,[0,.95,0]);trBox(g,'s2',[1.95,.78,3.3],glass,[0,1.82,.25]);trBox(g,'s3',[2.0,.12,3.2],paint,[0,2.25,.3]);
    trBox(g,'s4',[2.07,.16,4.92],dark,[0,.5,0]);trWheels(g,[[-1,-1.55],[1,-1.55],[-1,1.55],[1,1.55]],.46);trLights(g,2.05,-2.46,2.46,1.1);trShadow(g,2.05,4.9)}
  else if(type==='truck'){
    trBox(g,'t1',[2.35,2.1,2.2],paint,[0,1.55,-3.2]);trBox(g,'t2',[2.2,.85,.06],glass,[0,2.05,-4.32]);trBox(g,'t3',[2.38,.3,2.22],dark,[0,.55,-3.2]);
    const box=trBox(g,'t4',[2.5,2.9,6.2],M3.boxw||(M3.boxw=std(0xf4f4f2,{r:.5})),[0,2.05,1.0]);box.receiveShadow=true;
    trBox(g,'t5',[2.52,.18,6.22],paint,[0,.95,1.0]);trBox(g,'t6',[1.6,.3,7.5],dark,[0,.55,.2]);
    trWheels(g,[[-1.08,-3.1],[1.08,-3.1],[-1.08,2.2],[1.08,2.2],[-1.08,3.3],[1.08,3.3]],.5);trLights(g,2.35,-4.32,4.12,.8);trShadow(g,2.5,8.6)}
  else{ // أتوبيس
    trBox(g,'b1',[2.55,2.9,11],paint,[0,1.85,0]);trBox(g,'b2',[2.58,.95,9.2],glass,[0,2.45,.4]);trBox(g,'b3',[2.35,1.3,.06],glass,[0,2.3,-5.52]);
    trBox(g,'b4',[2.6,.25,11.02],M3.boxw||(M3.boxw=std(0xf4f4f2,{r:.5})),[0,1.15,0]);trBox(g,'b5',[2.4,.1,9],M3.boxw,[0,3.32,0]);
    trWheels(g,[[-1.15,-3.6],[1.15,-3.6],[-1.15,3.4],[1.15,3.4]],.52);trLights(g,2.55,-5.52,5.52,.85);trShadow(g,2.55,11)}
  return g}
// إعادة استخدام المركبات بدل ما نعمل جديدة كل مرة
function trGet(R,o){const k=o.type,pool=R.pool[k]||(R.pool[k]=[]);let m=pool.pop();if(!m){m=makeVehicle(k,o.col);R.sc.add(m)}
  m.visible=true;m.userData.paint&&m.userData.paint.color.setHex(o.col);m.rotation.set(0,o.opp?Math.PI:0,0);m.position.y=0;return m}
function trRelease(R,o,m){if(o.type==='star'||m.userData.isStar){R.sc.remove(m)}else{m.visible=false;(R.pool[o.type]||(R.pool[o.type]=[])).push(m)}R.objs.delete(o)}
/* ---- المشهد: طريق سريع بحارتين في كل اتجاه، كباري فوق المية، صخور ونجيلة ---- */
function race3Init(cv){
  const r=r3Make(cv);if(!r)return null;
  const R={r,objs:new Map(),pool:{},chunks:[],t0:performance.now(),wheelRot:0};
  const sc=R.sc=new T3.Scene();
  sc.background=skyTex([[0,'#4a97e6'],[.5,'#a9d6ff'],[1,'#eaf6ff']]);sc.fog=new T3.Fog(0xcfe6fb,70,190);
  R.cam=new T3.PerspectiveCamera(62,1,.1,500);
  sc.add(new T3.HemisphereLight(0xdcefff,0x5a7a40,1.2));
  const sun=R.sun=new T3.DirectionalLight(0xfff2d8,2.7);sun.position.set(-10,24,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
  Object.assign(sun.shadow.camera,{left:-16,right:16,top:24,bottom:-30,near:1,far:90});sun.shadow.bias=-.0008;sun.target.position.set(0,0,-12);sc.add(sun,sun.target);
  const LEN=TR.CH*TR.NCH+40,TILE=16;
  // الأسفلت: خطوط متقطعة بين الحارات، وخط متصل في النص وعلى الأطراف
  R.roadTex=cTex(512,512,(c,w,h)=>{c.fillStyle='#45484f';c.fillRect(0,0,w,h);
    for(let i=0;i<16000;i++){const v=50+Math.random()*50;c.fillStyle=`rgba(${v},${v},${v+6},.5)`;c.fillRect(Math.random()*w,Math.random()*h,2,2)}
    const X=m=>w/2+m/14.8*w;c.fillStyle='rgba(0,0,0,.16)';for(const m of[-4.8,-1.6,1.6,4.8])c.fillRect(X(m)-20,0,40,h);
    c.fillStyle='#f4f4f4';c.fillRect(X(-6.5)-4,0,8,h);c.fillRect(X(6.5)-4,0,8,h);c.fillRect(X(0)-5,0,10,h);
    for(const m of[-3.2,3.2])c.fillRect(X(m)-4,0,8,h*.4);
    c.fillStyle='#8a7d68';c.fillRect(0,0,X(-6.9),h);c.fillRect(X(6.9),0,w-X(6.9),h);
  },[1,LEN/TILE]);
  const road=new T3.Mesh(new T3.PlaneGeometry(14.8,LEN),new T3.MeshStandardMaterial({map:R.roadTex,roughness:.85}));
  road.rotation.x=-Math.PI/2;road.position.set(0,.02,-LEN/2+40);road.receiveShadow=true;sc.add(road);
  // الدرابزين المعدني على الجانبين
  const railM=std(0xc9cfd6,{m:.75,r:.3});
  for(const x of[-7.55,7.55]){const rl=new T3.Mesh(new T3.BoxGeometry(.12,.32,LEN),railM);rl.position.set(x,.78,-LEN/2+40);rl.castShadow=true;sc.add(rl);const rl2=rl.clone();rl2.position.y=.42;rl2.scale.y=.5;sc.add(rl2)}
  // المية تحت الكباري
  R.waterTex=cTex(256,256,(c,w,h)=>{const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#27b4c9');g.addColorStop(1,'#1d93b8');c.fillStyle=g;c.fillRect(0,0,w,h);
    c.strokeStyle='rgba(255,255,255,.22)';c.lineWidth=3;for(let i=0;i<40;i++){const x=Math.random()*w,y=Math.random()*h;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+10,y-5,x+22,y);c.stroke()}},[10,14]);
  const water=new T3.Mesh(new T3.PlaneGeometry(260,LEN+80),new T3.MeshStandardMaterial({map:R.waterTex,roughness:.15,metalness:.2}));water.rotation.x=-Math.PI/2;water.position.set(0,-4.2,-LEN/2+40);sc.add(water);
  R.grassTex=cTex(256,256,(c,w,h)=>{c.fillStyle='#8fae4f';c.fillRect(0,0,w,h);for(let i=0;i<9000;i++){const gg=140+Math.random()*60;c.fillStyle=`rgba(${110+Math.random()*50},${gg},${50+Math.random()*30},.55)`;c.fillRect(Math.random()*w,Math.random()*h,2,3)}},[6,6]);
  const grassM=new T3.MeshStandardMaterial({map:R.grassTex,roughness:1}),cliffM=std(0x6d665c,{r:1,flat:true}),rockM=std(0x8a8378,{r:.95,flat:true}),rockM2=std(0x6f6a62,{r:.95,flat:true}),deckM=std(0xb8b2a6,{r:.8}),postM=std(0x8e959e,{m:.6,r:.4});
  const rockG=[new T3.DodecahedronGeometry(1,0),new T3.IcosahedronGeometry(1,0)];
  // قطع الطريق: كل قطعة يا أرض يا كوبري، وبتتكرّر مع الحركة
  for(let i=0;i<TR.NCH;i++){
    const ch=new T3.Group(),bridge=i%3===1,L=TR.CH;ch.userData.bridge=bridge;
    if(!bridge){const under=new T3.Mesh(new T3.BoxGeometry(15.6,4.2,L),cliffM);under.position.set(0,-2.1,0);ch.add(under);
      for(const s of[-1,1]){const gp=new T3.Mesh(new T3.PlaneGeometry(90,L),grassM);gp.rotation.x=-Math.PI/2;gp.position.set(s*(7.8+45),0,0);gp.receiveShadow=true;ch.add(gp);
        for(const z of[-L/2,L/2]){const cf=new T3.Mesh(new T3.BoxGeometry(90,4.4,1.2),cliffM);cf.position.set(s*(7.8+45),-2.2,z);ch.add(cf)}
        for(let k=0;k<5;k++){const rk=new T3.Mesh(rockG[k%2],k%2?rockM:rockM2);rk.scale.set(1+Math.random()*2.2,.7+Math.random()*1.2,1+Math.random()*2);rk.position.set(s*(10+Math.random()*30),.3,(Math.random()-.5)*L);rk.rotation.y=Math.random()*3;rk.castShadow=true;ch.add(rk)}
        for(let k=0;k<4;k++){const t=makeTree();t.position.set(s*(12+Math.random()*28),0,(Math.random()-.5)*L);t.scale.setScalar(1.3+Math.random()*.6);ch.add(t)}}}
    else{const dk=new T3.Mesh(new T3.BoxGeometry(15.6,1.1,L),deckM);dk.position.set(0,-.55,0);dk.receiveShadow=true;ch.add(dk);
      for(const z of[-L/4,L/4]){const pl=new T3.Mesh(new T3.BoxGeometry(10,4,2.2),deckM);pl.position.set(0,-3,z);ch.add(pl)}
      for(const s of[-1,1])for(const z of[-L/2+2,L/2-2]){const rk=new T3.Mesh(rockG[0],rockM);rk.scale.set(6+Math.random()*4,3.4,4+Math.random()*3);rk.position.set(s*(12+Math.random()*8),-2.6,z);rk.castShadow=true;ch.add(rk)}}
    // قوايم الدرابزين وأعمدة النور
    for(let z=-L/2;z<L/2;z+=4)for(const s of[-1,1]){const p=new T3.Mesh(trGeo('pst',()=>new T3.BoxGeometry(.14,.9,.14)),postM);p.position.set(s*7.62,.45,z);ch.add(p)}
    for(const s of[-1,1]){const lp=new T3.Group();const p=new T3.Mesh(new T3.CylinderGeometry(.08,.1,6,8),postM);p.position.y=3;const a=new T3.Mesh(new T3.BoxGeometry(1.4,.08,.08),postM);a.position.set(-s*.65,5.95,0);const l=new T3.Mesh(new T3.BoxGeometry(.5,.12,.28),std(0xfffbe0,{e:0xfff3b0,ei:1.4}));l.position.set(-s*1.25,5.88,0);lp.add(p,a,l);lp.position.set(s*8.1,0,(s>0?-L/4:L/4));ch.add(lp)}
    ch.position.z=20-i*L;sc.add(ch);R.chunks.push(ch);
  }
  // جبال بعيدة وسحاب
  const mm=[std(0x7d9fc0,{flat:true,r:1}),std(0x8fb3d1,{flat:true,r:1})];
  for(let i=0;i<14;i++){const m=new T3.Mesh(new T3.ConeGeometry(22+Math.random()*20,26+Math.random()*30,6),mm[i%2]);m.position.set(-170+i*26,6,-260-Math.random()*40);sc.add(m)}
  const cm=std(0xffffff,{r:1,flat:true});
  for(let i=0;i<8;i++){const g=new T3.Group();for(let k=0;k<4;k++){const s=new T3.Mesh(new T3.IcosahedronGeometry(3+Math.random()*2,1),cm);s.position.set(k*3.2,Math.random()*1.5,Math.random()*2);g.add(s)}g.position.set(-90+i*24,34+Math.random()*12,-200-Math.random()*40);sc.add(g)}
  R.player=makeCar(S.gender==='f'?0xff4f9a:0xe8322b);sc.add(R.player);
  return R;
}
function race3Render(){
  const R=RC.r3;if(!R)return;
  const now=performance.now(),dt=Math.min(.05,(now-(R.last||now))/1000);R.last=now;
  const v=RC.run?RC.v:0,x=RC.x??1.6;
  R.roadTex.offset.y=(R.roadTex.offset.y+v*dt/16)%1;R.waterTex.offset.y=(R.waterTex.offset.y+v*dt/22+dt*.01)%1;
  const span=TR.CH*TR.NCH;for(const ch of R.chunks){ch.position.z+=v*dt;if(ch.position.z>20+TR.CH)ch.position.z-=span}
  // اللاعب
  const P=R.player;P.position.set(x,0,0);P.rotation.y=-RC.vx*.045;P.rotation.z=RC.vx*.01;
  R.wheelRot-=v*dt/.4;for(const w of P.userData.wheels)w.rotation.z=R.wheelRot;
  P.visible=!(RC.inv>0&&Math.floor(RC.inv*10)%2);
  const seen=new Set();
  for(const o of RC.traffic||[]){let m=R.objs.get(o);if(!m){m=trGet(R,o);R.objs.set(o,m)}seen.add(o);
    m.position.set(o.x,0,-o.dz);
    if(o.hit){m.rotation.y=(o.opp?Math.PI:0)+(o.spin||0);m.position.x=o.x+Math.sin(o.spin||0)*.8}
    const ws=m.userData.wheels;if(ws)for(const w of ws)w.rotation.z-=(o.opp?-o.v:o.v)*dt/.45}
  for(const s of RC.stars||[]){let m=R.objs.get(s);if(!m){m=starMesh(1.3);m.userData.isStar=true;R.sc.add(m);R.objs.set(s,m)}seen.add(s);m.position.set(s.x,1.1+Math.sin(now/300+s.x)*.15,-s.dz);m.rotation.y=s.rot}
  for(const[o,m]of[...R.objs])if(!seen.has(o))trRelease(R,o,m);
  // النقط اللي بتطير
  for(const p of RC.pop||[]){if(!p.sp){p.sp=trPop(p.txt);R.sc.add(p.sp)}p.sp.position.set(p.x,2.4+(1-p.t)*3,-2-p.dz);p.sp.material.opacity=Math.min(1,p.t*2)}
  for(const s of[...R.sc.children])if(s.isSprite&&!(RC.pop||[]).some(p=>p.sp===s))R.sc.remove(s);
  // الكاميرا من فوق ورا العربية زي ألعاب الطرق السريعة
  const sh=RC.shake>0?(Math.random()-.5)*.4:0,cx=x*.55,asp=R.cam.aspect,up=asp<.8?1.25:1;
  const fv=asp<.8?58:50;if(R.cam.fov!==fv){R.cam.fov=fv;R.cam.updateProjectionMatrix()}
  R.cam.position.set(cx+sh,11.5*up+sh*.5,9.5*up);R.cam.lookAt(cx,0,-11);
  R.sun.position.set(x-10,24,6);R.sun.target.position.set(x,0,-12);
  R.r.render(R.sc,R.cam);
}
function trPop(txt){const W=txt.length>4?640:256;
  const t=cTex(W,128,(c,w,h)=>{c.direction='rtl';c.font='800 80px "Baloo Bhaijaan 2", Tahoma, sans-serif';c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.lineWidth=16;c.strokeStyle='#5B47E0';c.strokeText(txt,w/2,h/2+4);c.fillStyle='#FFE27A';c.fillText(txt,w/2,h/2+4)});
  const s=new T3.Sprite(new T3.SpriteMaterial({map:t,transparent:true,depthTest:false}));s.renderOrder=20;s.scale.set(W/128*1.4,1.4,1);return s}
