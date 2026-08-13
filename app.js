const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');
let W, H, dpr, last = 0, idCounter = 347, particles = [], rockets = [], fireworks = [], activeIds = [];
const colors = { gold:'#f7c667', blue:'#72b8ff', red:'#ff6d7d', purple:'#b88cff', green:'#7fe1aa', white:'#e9f3ff', rainbow:'#ffd36a', random:'#f5d28a' };
const colorNames = { gold:'GOLD',blue:'BLUE',red:'RED',purple:'PURPLE',green:'GREEN',white:'WHITE',rainbow:'RAINBOW',random:'RANDOM' };
const shapes = ['CHRYSANTHEMUM','RING','STAR','HEART','SPIRAL','WILLOW','NIAGARA'];
let selected = {color:'gold',shape:'CHRYSANTHEMUM',scale:'large'};
const $ = id => document.getElementById(id);
function resize(){ dpr=Math.min(devicePixelRatio||1,2); W=innerWidth; H=innerHeight; canvas.width=W*dpr; canvas.height=H*dpr; canvas.style.width=W+'px'; canvas.style.height=H+'px'; ctx.setTransform(dpr,0,0,dpr,0,0); }
addEventListener('resize',resize); resize();
function rand(a,b){return a+Math.random()*(b-a)}
function hexRgb(hex){let n=parseInt(hex.slice(1),16);return [(n>>16)&255,(n>>8)&255,n&255]}
function spark(x,y,vx,vy,color,life=1.5,size=1.5){particles.push({x,y,vx,vy,color,life,max:life,size,drag:rand(.965,.985),g:rand(12,28),alpha:1})}
function burst(x,y,config){
  const amount=config.mega?230:config.scale==='small'?55:config.scale==='medium'?92:140, base=colors[config.color]||colors.gold;
  if(config.shape==='NIAGARA'){
    const drops=config.scale==='large'?180:config.scale==='medium'?125:85;
    for(let i=0;i<drops;i++){
      const c=config.color==='rainbow'||config.color==='random'?Object.values(colors)[i%6]:base;
      spark(x+rand(-145,145),y+rand(-7,8),rand(-7,7),rand(32,86),c,rand(1.8,3.3),rand(.8,2));
    }
    for(let i=0;i<22;i++) spark(x+rand(-145,145),y+rand(-3,4),rand(-4,4),rand(8,28),'#fff1bd',rand(.7,1.5),1.5);
    fireworks.push({x,y,color:base,life:1.2,config}); activeIds.push(idCounter++); playBoom(config.scale); $('tonightCount').textContent=(1284+fireworks.length).toLocaleString(); $('fireworkIndex').textContent=String(idCounter).padStart(4,'0'); return;
  }
  for(let i=0;i<amount;i++){
    let a=(Math.PI*2*i/amount)+rand(-.025,.025), speed=rand(55,135)*(config.mega?2.25:config.scale==='large'?1.15:config.scale==='small'?.78:1);
    let xx=Math.cos(a), yy=Math.sin(a), shape=config.shape;
    if(shape==='RING') speed*=.78;
    if(shape==='STAR') speed*= [1,.72,.94,.68][i%4];
    if(shape==='HEART'){const t=a; xx=16*Math.pow(Math.sin(t),3)/16; yy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))/16; const l=Math.hypot(xx,yy)||1; xx/=l;yy/=l; speed*=1.05;}
    if(shape==='SPIRAL'){const twist=i/amount*2.6; xx=Math.cos(a+twist);yy=Math.sin(a+twist);speed*=.75+i/amount*.45;}
    if(shape==='WILLOW'){speed*=rand(.55,1); yy=Math.abs(yy)*.9+.12;}
    let c=base; if(config.color==='rainbow'||config.color==='random'){c=Object.values(colors)[Math.floor(rand(0,6))]}
    spark(x+rand(-2,2),y+rand(-2,2),xx*speed,yy*speed,c,config.mega?rand(2.4,3.8):rand(1.2,2.4),rand(config.mega?1.1:.8,config.mega?3:2.3));
    if(i%6===0) spark(x,y,xx*speed*.45,yy*speed*.45,'#fff3ce',.8,1.1);
  }
  fireworks.push({x,y,color:base,life:1.2,config}); activeIds.push(idCounter++); if(activeIds.length>9)activeIds.shift();
  playBoom(config.scale); $('tonightCount').textContent=(1284+fireworks.length).toLocaleString(); $('fireworkIndex').textContent=String(idCounter).padStart(4,'0');
}
function launch(config, x=rand(W*.2,W*.8), targetY=rand(H*.18,H*.48)){ rockets.push({x,y:H+20,vx:rand(-8,8),vy:rand(-370,-300),targetY,config,trail:[]}); }
function update(dt){
  for(let i=rockets.length-1;i>=0;i--){let r=rockets[i];r.vy+=95*dt;r.x+=r.vx*dt;r.y+=r.vy*dt;r.trail.push({x:r.x,y:r.y});if(r.trail.length>12)r.trail.shift();if(r.vy>0||r.y<r.targetY){burst(r.x,r.y,r.config);rockets.splice(i,1);}}
  for(let i=particles.length-1;i>=0;i--){let p=particles[i];p.vx*=p.drag;p.vy=p.vy*p.drag+p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;if(p.life<=0)particles.splice(i,1);}
  ctx.clearRect(0,0,W,H); drawRockets(); for(const p of particles)drawParticle(p);
}
function drawRockets(){for(const r of rockets){ctx.beginPath();ctx.moveTo(r.x,r.y);for(let i=r.trail.length-1;i>=0;i--)ctx.lineTo(r.trail[i].x,r.trail[i].y);ctx.strokeStyle='rgba(243,198,110,.35)';ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.arc(r.x,r.y,3,0,7);ctx.fillStyle='#fff4ca';ctx.shadowBlur=15;ctx.shadowColor='#f6ba5c';ctx.fill();ctx.shadowBlur=0;}}
function drawParticle(p){let a=Math.max(0,Math.min(1,p.life/p.max));ctx.beginPath();ctx.arc(p.x,p.y,p.size*(.65+a*.55),0,7);ctx.fillStyle=p.color;ctx.globalAlpha=a*.88;ctx.shadowBlur=11;ctx.shadowColor=p.color;ctx.fill();ctx.globalAlpha=1;ctx.shadowBlur=0;}
function ambient(){ if(rockets.length<2&&Math.random()<.018){let c=['gold','blue','purple','white','red'][Math.floor(rand(0,5))];launch({color:c,shape:['CHRYSANTHEMUM','RING'][Math.floor(rand(0,2))],scale:'large',message:''},rand(W*.22,W*.78),rand(H*.16,H*.48));} requestAnimationFrame(ambient); }
function loop(t){let dt=Math.min((t-last)/1000||0,.035);last=t;update(dt);requestAnimationFrame(loop)} requestAnimationFrame(loop);ambient();
function buildOptions(){
  $('colorOptions').innerHTML=Object.keys(colors).map(k=>`<button class="swatch ${k==='gold'?'selected':''}" data-value="${k}" aria-label="${colorNames[k]}" style="--swatch:${colors[k]};background:${colors[k]}"></button>`).join('');
  $('shapeOptions').innerHTML=shapes.map((s,i)=>`<button class="shape-option ${i===0?'selected':''}" data-value="${s}">${s}</button>`).join('');
  document.querySelectorAll('[data-value]').forEach(el=>el.addEventListener('click',()=>{let group=el.parentElement.id; if(group==='colorOptions'){selected.color=el.dataset.value;$('colorLabel').textContent=colorNames[selected.color]} if(group==='shapeOptions'){selected.shape=el.dataset.value;$('shapeLabel').textContent=selected.shape} if(group==='scaleOptions'){selected.scale=el.dataset.value;$('scaleLabel').textContent=selected.scale.toUpperCase()} if(group==='colorOptions'||group==='shapeOptions'||group==='scaleOptions'){el.parentElement.querySelectorAll('[data-value]').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')}}));
} buildOptions();
function showToast(text){const t=$('toast');t.textContent=text;t.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>t.classList.remove('show'),2300)}
function burstFireworkSalvo(){
  showToast('五十発連射 — DIGITAL HANABI OPENING');
  const palette=['gold','blue','red','purple','green','white','rainbow'];
  const forms=['CHRYSANTHEMUM','RING','STAR','HEART','SPIRAL','WILLOW','NIAGARA'];
  for(let i=0;i<50;i++){
    setTimeout(()=>{
      const scale=i%9===0?'large':i%3===0?'medium':'small';
      launch({color:palette[i%palette.length],shape:forms[i%forms.length],scale,message:''},rand(W*.12,W*.88),rand(H*.15,H*.58));
    },i*105);
  }
}
let audioCtx; function playBoom(scale='large'){if(!audioCtx)return;const now=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.setValueAtTime(scale==='large'?100:170,now);o.frequency.exponentialRampToValueAtTime(38,now+.65);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(scale==='large'?.22:.1,now+.025);g.gain.exponentialRampToValueAtTime(.0001,now+.8);o.connect(g).connect(audioCtx.destination);o.start(now);o.stop(now+.85);}
function enableSound(){if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();$('soundIcon').textContent='🔊';$('soundButton').classList.add('sound-on');showToast('音と一緒に、夜空をお楽しみください');}
$('soundButton').onclick=enableSound; $('openComposer').onclick=()=>{enableSound();burstFireworkSalvo()}; $('closeComposer').onclick=()=>{$('composer').classList.remove('open');$('composer').setAttribute('aria-hidden','true');$('heroCopy').style.opacity='1'};
$('megaLaunch').onclick=()=>{
  enableSound();
  const megaColors=['gold','blue','red','purple','green','white','rainbow'].sort(()=>Math.random()-.5).slice(0,3);
  const targets=[
    {color:megaColors[0],x:W*.28,y:Math.max(H*.17,H*.22)},
    {color:megaColors[1],x:W*.5,y:Math.max(H*.12,H*.17)},
    {color:megaColors[2],x:W*.72,y:Math.max(H*.17,H*.22)}
  ];
  targets.forEach(target=>launch({color:target.color,shape:'CHRYSANTHEMUM',scale:'large',mega:true,message:''},target.x,target.y));
};
$('giftToggle').onclick=()=>{const input=$('giftRecipient');const active=input.disabled;input.disabled=!active;$('giftToggle').classList.toggle('active',active);$('giftToggle').textContent=active?'♥ プレゼント花火':'♡ プレゼント花火にする';if(active)input.focus()};
$('chatForm').onsubmit=e=>{e.preventDefault();const input=$('chatInput'),text=input.value.trim();if(!text)return;addChat('YOU',text);input.value='';};
function addChat(name,text){const wrap=$('chatMessages'),item=document.createElement('div');item.className='chat-message';item.innerHTML=`<b>${name}</b>${text.replace(/[<>]/g,'')}`;wrap.appendChild(item);while(wrap.children.length>5)wrap.removeChild(wrap.firstChild);}
['きれい…！','今日も参加できた','ハート見えた♡','すごい連射！','ナイアガラきた'].forEach((text,i)=>setTimeout(()=>addChat(['Aoi','ゆう','hana','sky_08','M'][i],text),800+i*900));
setInterval(()=>{if(Math.random()<.36)addChat(['guest_21','mika','summer','光のひと','K'][Math.floor(Math.random()*5)],['きれい！','次の一発待ってる','夜空が育ってる','拍手です ✦'][Math.floor(Math.random()*4)])},6200);
$('launchButton').onclick=()=>{const recipient=$('giftRecipient').value.trim();const config={...selected,message:$('messageInput').value.trim()};launch(config);$('composer').classList.remove('open');$('heroCopy').style.opacity='1';if(recipient)showToast(`${recipient}さんへ、花火を贈りました`)};
$('scheduleButton').onclick=()=>{const when=prompt('打ち上げ日時を入力してください（例：2026-08-13 20:30）');if(when){localStorage.setItem('hanabi-scheduled',JSON.stringify({when,config:{...selected,message:$('messageInput').value.trim()},recipient:$('giftRecipient').value.trim()}));showToast(`${when} に、あなたの花火を予約しました`);}};
function checkSchedule(){const saved=localStorage.getItem('hanabi-scheduled');if(!saved)return;try{const item=JSON.parse(saved),when=new Date(item.when.replace(' ','T'));if(!Number.isNaN(when.getTime())&&Date.now()>=when.getTime()){launch(item.config);localStorage.removeItem('hanabi-scheduled');showToast(item.recipient?`${item.recipient}さんへの花火が夜空に届きました`:'予約した花火が夜空に届きました')}}catch(e){localStorage.removeItem('hanabi-scheduled')}}setInterval(checkSchedule,1000);
canvas.addEventListener('pointerdown',e=>{if(e.target!==canvas)return;enableSound();let press=Date.now(),timer=setTimeout(()=>{},10);const release=ev=>{clearTimeout(timer);canvas.releasePointerCapture?.(e.pointerId);let held=Math.min(Date.now()-press,1600),scale=held>950?'large':held>450?'medium':'small';launch({...selected,scale},ev.clientX,ev.clientY);canvas.removeEventListener('pointerup',release)};canvas.setPointerCapture?.(e.pointerId);canvas.addEventListener('pointerup',release);});
canvas.addEventListener('click',e=>{if(rockets.length===0&&particles.length>10){const a=$('applause');a.style.left=e.clientX+'px';a.style.top=e.clientY+'px';a.classList.remove('show');void a.offsetWidth;a.classList.add('show');showToast('APPLAUSE  ✦  光が返りました');}});
$('artModeButton').onclick=()=>document.body.classList.toggle('art-mode');
if(location.pathname==='/art'||location.search.includes('art=true'))document.body.classList.add('art-mode');
setTimeout(()=>{$('heroCopy').style.opacity='.72'},7000);
