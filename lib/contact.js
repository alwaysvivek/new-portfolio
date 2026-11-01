/* ported from the original single-file page */
export default function init(){
var FU=getComputedStyle(document.documentElement).getPropertyValue('--f-unb').trim()||'Unbounded',FI=getComputedStyle(document.documentElement).getPropertyValue('--f-ins').trim()||"'Instrument Serif'";

(function(){
var E=function(i){return document.getElementById(i)},B=document.body,cp=E('cpage'),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var P0='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z';
var D={intro:{n:'vivek dagar',h:'let’s build something',c:'#8fb4ff'},
li:{n:'LinkedIn',h:'in/vivekkdagar',c:'#4a9dff',p:P0,f:1},
gh:{n:'GitHub',h:'@alwaysvivek',c:'#b07bff',p:'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'},
em:{n:'Email',h:'viv3kdagar@gmail.com',c:'#ff9f4a',p:'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6'},
cv:{n:'Resume',h:'view resume · coming soon',c:'#3fd0ff',p:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8'}};
var rows={},opened=false,pushed=false,cur='intro',setK=null,toastT,ctl=document.querySelector('a[href="#contact"]');
cp.querySelectorAll('.row').forEach(function(a){var k=a.dataset.k,d=D[k];rows[k]=a;a.style.setProperty('--ac',d.c);
 a.querySelector('.ic').innerHTML='<svg viewBox="0 0 24 24" '+(d.f?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"')+' aria-hidden="true"><path d="'+d.p+'"/></svg>';
 var on=function(){if(setK)setK(k);for(var j in rows)rows[j].classList.toggle('on',j===k)};
 a.addEventListener('pointerenter',on);a.addEventListener('focus',on);
 a.addEventListener('pointermove',function(e){var r=a.getBoundingClientRect();a.style.setProperty('--mx',(e.clientX-r.left)+'px');a.style.setProperty('--my',(e.clientY-r.top)+'px')});
 if(k==='cv')a.addEventListener('click',function(e){e.preventDefault();var t=E('toast');t.textContent='Resume coming soon';t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('on')},2000)});
});
cp.querySelectorAll('.cpi').forEach(function(n,i){n.style.setProperty('--d',(.08+i*.07).toFixed(2)+'s')});
function show(on){if(on===opened)return;opened=on;B.classList.toggle('c-open',on);window.__pause=on;cp.setAttribute('aria-hidden',on?'false':'true');
 ['menu','li','hero'].forEach(function(i){var n=E(i);if(n)n.inert=on});
 if(on){E('cback').focus({preventScroll:true});if(window.__c3)window.__c3(true)}
 else{if(window.scrollY<5)scrollTo(0,document.documentElement.scrollHeight);if(ctl)ctl.focus({preventScroll:true})}}
function open(){try{if(location.hash!=='#contact'){location.hash='contact';pushed=true}}catch(e){}show(true)}
function close(){if(pushed){pushed=false;try{history.back()}catch(e){}setTimeout(function(){show(false)},350)}else{try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}show(false)}}
if(ctl)ctl.addEventListener('click',function(){setTimeout(open,RM?0:140)});
E('cback').addEventListener('click',close);
addEventListener('keydown',function(e){if(e.key==='Escape'&&opened)close()});
addEventListener('hashchange',function(){show(location.hash==='#contact')});
if(location.hash==='#contact')show(true);

if(B.classList.contains('nogl')||!window.THREE){E('st3').parentNode.style.display='none';return}
var T=THREE,mx=0,my=0,tmx=0,tmy=0;
addEventListener('pointermove',function(e){tmx=e.clientX/innerWidth*2-1;tmy=1-e.clientY/innerHeight*2},{passive:true});

/* ---------- 3D contact preview ---------- */
var st=E('st3'),rd;try{rd=new T.WebGLRenderer({canvas:st,antialias:true,alpha:true})}catch(e){st.parentNode.style.display='none';return}
rd.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
var sc=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,30),card=new T.Group(),act=new T.Color(D.intro.c),ac=new T.Color(D.intro.c);cam.position.z=9;sc.add(card);
var fx=document.createElement('canvas');fx.width=1024;fx.height=640;var x=fx.getContext('2d'),tex=new T.CanvasTexture(fx);tex.anisotropy=8;
function rr(a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function face(k){var d=D[k];x.clearRect(0,0,1024,640);
 var g=x.createLinearGradient(0,0,1024,640);g.addColorStop(0,'#151a2c');g.addColorStop(1,'#090b13');rr(6,6,1012,628,56);x.fillStyle=g;x.fill();
 var gl=x.createRadialGradient(840,100,0,840,100,420);gl.addColorStop(0,d.c+'66');gl.addColorStop(1,d.c+'00');x.save();x.clip();x.fillStyle=gl;x.fillRect(0,0,1024,640);x.restore();
 var b=x.createLinearGradient(0,0,1024,640);b.addColorStop(0,d.c);b.addColorStop(.5,'rgba(255,255,255,.3)');b.addColorStop(1,d.c);rr(6,6,1012,628,56);x.lineWidth=4;x.strokeStyle=b;x.stroke();
 x.fillStyle=x.strokeStyle='#fff';
 if(d.p){x.save();x.translate(84,76);x.scale(7,7);var p=new Path2D(d.p);if(d.f)x.fill(p);else{x.lineWidth=2;x.lineCap=x.lineJoin='round';x.stroke(p)}x.restore()}
 else{x.font="700 130px "+FU+",'Arial Black',sans-serif";x.fillText('vd',84,200)}
 x.fillStyle='#fff';x.font="400 118px "+FI+",serif";x.fillText(d.n.toUpperCase(),84,440);
 x.fillStyle=d.c;x.font="400 28px "+FU+",sans-serif";x.fillText(d.h,84,520);tex.needsUpdate=true}
var sh=new T.Shape(),w=3.2,h=2,r=.2;
sh.moveTo(-w/2+r,-h/2);sh.lineTo(w/2-r,-h/2);sh.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);sh.lineTo(w/2,h/2-r);sh.quadraticCurveTo(w/2,h/2,w/2-r,h/2);sh.lineTo(-w/2+r,h/2);sh.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);sh.lineTo(-w/2,-h/2+r);sh.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);
var body=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:.08,bevelEnabled:true,bevelThickness:.02,bevelSize:.02,bevelSegments:3,curveSegments:8}),new T.MeshStandardMaterial({color:0x10131f,metalness:.6,roughness:.3}));body.position.z=-.04;card.add(body);
var pl=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:tex,transparent:true}));pl.position.z=.065;card.add(pl);
sc.add(new T.AmbientLight(0xffffff,.45));var L1=new T.PointLight(0xffffff,1.3,0,2),L2=new T.PointLight(0xb07bff,1,0,2);L1.position.set(2.5,2.5,4);L2.position.set(-3,-2,3);sc.add(L1,L2);

var rings=[[2.5,1.15,.25,.5],[2.9,.5,-.9,-.35]].map(function(q){var m=new T.MeshBasicMaterial({color:0xcfe0ff,transparent:true,opacity:.5,blending:T.AdditiveBlending,depthWrite:false}),o=new T.Group(),t=new T.Mesh(new T.TorusGeometry(q[0],.008,8,160),m),bd=new T.Mesh(new T.SphereGeometry(.07,16,12),new T.MeshBasicMaterial({color:0xffffff}));bd.position.x=q[0];o.add(t,bd);o.rotation.set(q[1],q[2],0);sc.add(o);return{o:o,m:m,s:q[3]}});
face('intro');if(document.fonts)document.fonts.ready.then(function(){face(cur==='intro'?'intro':cur)});
var WH=new T.Color(0xffffff),flip=-1,pend=null,t0=performance.now(),lt=t0;
setK=function(k){if(k===cur)return;cur=k;pend=k;act.set(D[k].c);if(flip<0)flip=0};
function size(){var W=st.clientWidth,H=st.clientHeight;if(!W||!H)return;rd.setSize(W,H,false);cam.aspect=W/H;cam.updateProjectionMatrix();var s=Math.min(1,cam.aspect*.95);card.scale.setScalar(s);rings.forEach(function(q){q.o.scale.setScalar(s)})}
addEventListener('resize',function(){if(opened)size()});
function loop(now){if(!opened)return;requestAnimationFrame(loop);var t=(now-t0)/1000,dt=Math.min((now-lt)/1000,.05);lt=now;
 var e=0;if(flip>=0){flip+=dt/.9;e=flip>=1?1:flip*flip*(3-2*flip);if(pend&&flip>.45){face(pend);pend=null}if(flip>=1)flip=-1}
 card.rotation.y=e*Math.PI*2+mx*.45;card.rotation.x=-my*.3+Math.sin(t*.8)*.04;card.position.y=Math.sin(t*1.1)*.08;
 ac.lerp(act,1-Math.exp(-dt*6));L1.color.copy(ac);
 rings.forEach(function(q){q.o.rotation.z+=dt*q.s;q.m.color.copy(ac).lerp(WH,.5)});
 rd.render(sc,cam)}
window.__c3=function(on){if(!on)return;size();lt=performance.now();requestAnimationFrame(loop)};
st.addEventListener('click',function(){if(cur!=='intro'&&rows[cur])rows[cur].click()});
st.style.cursor='pointer';
if(opened)window.__c3(true);
})();

}
