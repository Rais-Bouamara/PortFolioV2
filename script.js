// CANVAS PARTICLES
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
const CHARS='01{}[];()=>const let function return import export class extends'.split(' ');
function mkParticle(){
  return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,alpha:Math.random()*.4+.05,char:CHARS[Math.floor(Math.random()*CHARS.length)],size:Math.floor(Math.random()*5+8),color:Math.random()>.5?'#22c55e':'#22d3ee'}
}
for(let i=0;i<60;i++)particles.push(mkParticle());
function draw(){
  ctx.clearRect(0,0,W,H);
  for(const p of particles){
    ctx.globalAlpha=p.alpha;
    ctx.fillStyle=p.color;
    ctx.font=`${p.size}px 'JetBrains Mono',monospace`;
    ctx.fillText(p.char,p.x,p.y);
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<-50||p.x>W+50||p.y<-50||p.y>H+50)Object.assign(p,mkParticle());
  }
  ctx.globalAlpha=1;
  requestAnimationFrame(draw);
}
draw();
 
// TYPING ANIMATION
const NAME='Raïs Bouamara';
const el=document.getElementById('typed-name');
let i=0;
function type(){
  if(i<=NAME.length){
    el.innerHTML=NAME.slice(0,i)+'<span class="cursor"></span>';
    i++;setTimeout(type,80);
  }
}
setTimeout(type,600);
 
// SCROLL REVEAL
const reveals=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // animate skill bars
      e.target.querySelectorAll('.skill-fill').forEach(b=>{
        b.style.transform=`scaleX(${b.dataset.width})`;
        b.classList.add('animated');
      });
    }
  });
},{threshold:.15});
reveals.forEach(r=>obs.observe(r));
 
// NAV active link
const sections=document.querySelectorAll('section[id]');
const links=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-200)cur=s.id});
  links.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+cur?'var(--cyan)':'var(--muted)'});
});
