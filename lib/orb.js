/* ported from the original single-file page */
export default function init(){
var FU=getComputedStyle(document.documentElement).getPropertyValue('--f-unb').trim()||'Unbounded',FI=getComputedStyle(document.documentElement).getPropertyValue('--f-ins').trim()||"'Instrument Serif'";

/* The LinkedIn button: a small 3D glass orb with two tilted orbit rings. It leans toward the pointer,
   its highlight follows the cursor, and it spins up and brightens as the cursor gets close. */
(function(){
if(document.body.classList.contains('nogl')||!window.THREE)return;
var T=THREE,li=document.getElementById('li');
var c=document.createElement('canvas');c.className='li3';c.setAttribute('aria-hidden','true');li.insertBefore(c,li.firstChild);
var rd;try{rd=new T.WebGLRenderer({canvas:c,antialias:true,alpha:true})}catch(e){c.remove();return}
rd.setPixelRatio(Math.min(devicePixelRatio||1,2));rd.setSize(100,100,false);rd.setClearColor(0x000000,0);
var sc=new T.Scene(),cam=new T.PerspectiveCamera(30,1,.1,20),grp=new T.Group(),AD=T.AdditiveBlending;
cam.position.z=7;sc.add(grp);
var cv=document.createElement('canvas');cv.width=cv.height=64;var g2=cv.getContext('2d'),gr=g2.createRadialGradient(32,32,0,32,32,32);
gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.3,'rgba(255,255,255,.5)');gr.addColorStop(1,'rgba(255,255,255,0)');
g2.fillStyle=gr;g2.fillRect(0,0,64,64);var spr=new T.CanvasTexture(cv);
// glass orb with fresnel rim, thin-film colour and a cursor-driven highlight
var sm=new T.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,
 uniforms:{t:{value:0},g:{value:0},L:{value:new T.Vector3(-.4,.5,.8)}},
 vertexShader:'varying vec3 N;varying vec3 P;void main(){N=normalize(normalMatrix*normal);P=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'varying vec3 N;varying vec3 P;uniform float t,g;uniform vec3 L;'+
 'void main(){vec3 n=normalize(N);float f=pow(1.-n.z,2.2);'+
 'vec3 irid=.5+.5*cos(6.2831*(f*1.1+P.y*.35+t*.07+vec3(0.,.33,.67)));'+
 'float sw=.5+.5*sin(P.x*5.+P.y*3.+t*1.3+sin(P.z*4.+t));'+
 'vec3 col=vec3(.08,.1,.16)+irid*(.25+.6*f)*(.8+.6*g)+vec3(.15,.2,.4)*sw*.18;'+
 'vec3 h=normalize(L+vec3(0.,0.,1.));float sp=pow(max(dot(n,h),0.),48.);'+
 'col+=vec3(1.)*sp*(.35+g*.4);'+
  'float a=clamp(.22+f*.75+sp+g*.08,0.,1.);gl_FragColor=vec4(col,a);}'});
var orb=new T.Mesh(new T.SphereGeometry(.98,48,32),sm);orb.renderOrder=0;grp.add(orb);
// two tilted orbit rings, each with a bright bead
var cfg=[[1.34,1.15,.25,.55],[1.52,.45,-.9,-.4]],rings=[];
cfg.forEach(function(q){
 var pts=[];for(var k=0;k<=120;k++){var a=k/120*Math.PI*2;pts.push(new T.Vector3(Math.cos(a)*q[0],Math.sin(a)*q[0],0))}
 var lm=new T.LineBasicMaterial({color:0xcfe0ff,transparent:true,opacity:.55,blending:AD,depthTest:false,depthWrite:false});
 var l=new T.LineLoop(new T.BufferGeometry().setFromPoints(pts),lm);l.rotation.set(q[1],q[2],0);l.renderOrder=1;grp.add(l);
 rings.push({o:l,s:q[3]});
});
var lt=0,rx=0,ry=0,Ls=new T.Vector3(-.4,.5,.8),Lt=new T.Vector3();
function cl(v,a,b){return Math.min(Math.max(v,a),b)}
function update(t,g,dx,dy,dd){
 var dt=Math.min(Math.max(t-lt,0),.05);lt=t;if(!dt)dt=.016;
 var ux=dx/(dd+1),uy=dy/(dd+1),near=.3+.7*g;
 Lt.set(ux*.85,-uy*.85,.65).normalize();Ls.lerp(Lt,1-Math.exp(-dt*8));sm.uniforms.L.value.copy(Ls);
 sm.uniforms.t.value=t;sm.uniforms.g.value=g;
 var k=1-Math.exp(-dt*5);
 ry+=(cl(dx/170,-1,1)*.5*near-ry)*k;rx+=(cl(dy/170,-1,1)*.5*near-rx)*k;
 grp.rotation.y=ry;grp.rotation.x=rx;grp.scale.setScalar(1+g*.07);
 orb.rotation.y=t*.25*(1+g*3);orb.rotation.x=t*.12;
 for(var j=0;j<rings.length;j++){var R=rings[j];R.o.rotation.z+=dt*R.s*(1+g*5);R.o.material.opacity=.4+.35*g}
 rd.render(sc,cam);
}
window.LI3={update:update};
})();

}
