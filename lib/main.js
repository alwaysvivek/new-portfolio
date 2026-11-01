/* ported from the original single-file page */
export default function init(){
var FU=getComputedStyle(document.documentElement).getPropertyValue('--f-unb').trim()||'Unbounded',FI=getComputedStyle(document.documentElement).getPropertyValue('--f-ins').trim()||"'Instrument Serif'";

(function(){
var cv=document.getElementById('c'),menu=document.getElementById('menu'),li=document.getElementById('li'),tag=document.getElementById('tag'),items=menu.querySelectorAll('.b,.s'),menuOn=false,Z0=1;
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var tp=document.getElementById('tagp'),words=[],tt=tp.textContent.trim().split(/\s+/);
tp.setAttribute('aria-label',tp.textContent.trim());tp.textContent='';
tt.forEach(function(w,i){var s=document.createElement('span');s.className='w';s.setAttribute('aria-hidden','true');s._o=w;s.style.setProperty('--i',i);var hl={people:1,technology:2,creativity:3,impact:4}[w.toLowerCase().replace(/[^a-z]/g,'')];if(hl)s.className+=' hl hl'+hl;
s.textContent=w;
 tp.appendChild(s);words.push(s);if(i<tt.length-1)tp.appendChild(document.createTextNode(' '))});
var gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'high-performance'});
if(!gl){document.body.classList.add('nogl');return}

var VS='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
var FS=`precision highp float;
uniform sampler2D M;uniform vec2 R;uniform vec2 P[5];uniform vec2 F;uniform float T,V,I,B,S,FI,ZZ;
float asp;
float hash(vec2 x){return fract(sin(dot(x,vec2(12.9898,78.233)))*43758.5453);}
float gb(vec2 a,vec2 c,float k){vec2 d=a-c;return exp(-dot(d,d)*k);}
vec3 bgf(vec2 p){
 vec2 a=p*vec2(asp,1.);vec3 c=vec3(0.);
 c+=vec3(.35,.5,1.)*gb(a,vec2(asp*.28+.08*sin(T*.3),.55+.1*cos(T*.4)),7.)*.9;
 c+=vec3(.62,.4,1.)*gb(a,vec2(asp*.58+.07*cos(T*.25),.42),8.)*.8;
 c+=vec3(1.,.62,.28)*gb(a,vec2(asp*.86,.62+.06*sin(T*.35)),9.)*.8;
 float rb=sin(a.x*7.+a.y*4.5+T*.25+sin(a.y*3.))*.5+.5;
 c+=vec3(.7,.8,1.)*smoothstep(.93,1.,rb)*.9;
 return c;}
vec3 flare(vec2 uv){
 vec2 a=vec2(asp,1.);vec2 v=(uv-F)*a;float d=length(v);
 vec3 c=vec3(1.,.93,.82)*(exp(-d*d*1800.)*1.4+exp(-d*d*120.)*.28+exp(-d*5.5)*.05);
 c+=vec3(.5,.66,1.)*exp(-abs(v.y)*90.)*exp(-abs(v.x)*2.4)*.32;
 c+=vec3(1.,.7,.45)*exp(-abs(v.y)*30.)*exp(-abs(v.x)*5.)*.06;
 vec2 ax=vec2(.5)-F;
 for(int i=0;i<5;i++){
  float f=float(i);vec2 pg=F+ax*(f*.46-.3);float dg=length((uv-pg)*a);
  float r=.035+.022*f;float w=.006+.003*f;float q=(dg-r)/w;
  float ring=exp(-q*q);float disc=1.-smoothstep(0.,r,dg);
  vec3 tint=.5+.5*cos(6.2831*(f*.21+vec3(0.,.33,.67)));
  c+=tint*(ring*.5+disc*.07)*(.55/(1.+f*.4));}
 float ang=atan(v.y,v.x);float hq=(d-.2)/.025;
 c+=(.5+.5*cos(6.2831*(ang*.3183+vec3(0.,.33,.67))))*exp(-hq*hq)*.08;
 return c;}
void main(){
 vec2 uv=gl_FragCoord.xy/R;asp=R.x/R.y;vec2 a=vec2(asp,1.);
 if(ZZ>.981){vec2 dc0=(uv-vec2(.5))*a;float rr0=length(dc0);float rq0=(fract(rr0*2.4-T*.05)-.5)/.05;vec3 e0=bgf(uv)*.13+vec3(.55,.65,1.)*exp(-rr0*rr0*2.5)*.07+vec3(.7,.8,1.)*exp(-rq0*rq0)*.035*exp(-rr0*1.5);e0+=(hash(gl_FragCoord.xy+floor(T*24.))-.5)*.03;gl_FragColor=vec4(clamp(e0,0.,1.),1.);return;}
 float z=ZZ,ze=z*z*(3.-2.*z),Zs=exp(ze*5.2);vec2 Cz=mix(F,vec2(.5),smoothstep(0.,.85,z));vec2 sc=F+(uv-Cz)/Zs;
 vec2 L=P[0];vec2 dl=(uv-L)*a;float d2=dot(dl,dl);
 vec2 q=uv-vec2(0.,S);
 // fluid wake: pointer + trailing blobs bend the glass
 for(int i=0;i<5;i++){
  vec2 di=(uv-P[i])*a;float li=exp(-dot(di,di)*34.);
  q+=normalize(di+1e-5)/a*(-li*.017/(1.+float(i)*.7));}
 float lens=exp(-d2*34.);
 q+=normalize(dl+1e-5)/a*sin(sqrt(d2)*55.-T*5.)*lens*.004*V;
 q+=.0016*vec2(sin(uv.y*9.+T*.7+sin(uv.x*5.+T*.4)),cos(uv.x*8.+T*.6));
 float h=0.;vec2 g=vec2(0.);
 for(int i=0;i<16;i++){
  float f=float(i);float ring=i<8?1.:2.3;float an=f*.7854+(i<8?0.:.39);
  vec2 dd=vec2(cos(an),sin(an));
  float m=texture2D(M,q+dd*B*ring/R).r;h+=m;g+=dd*m/ring;}
 h/=16.;g/=16.;
 float c0=texture2D(M,q).r;
 vec3 n=normalize(vec3(-g*8.,1.));
 float edge=1.-smoothstep(.5,.95,h);
 vec2 ro=n.xy*(.11+.07*lens);
 vec3 rf=vec3(bgf(uv+ro).r,bgf(uv+ro*1.18).g,bgf(uv+ro*1.38).b);
 vec3 K=normalize(vec3(-.45,.7,.55));
 float kd=max(dot(n,K),0.),kb=max(dot(n,-K),0.);
 vec3 face=vec3(.40,.415,.45)+.12*smoothstep(.2,1.,h);
 face+=rf*1.9;
 face+=vec3(.9,.95,1.)*pow(kd,1.6)*.55+vec3(.8,.85,1.)*kb*.2;
 face+=vec3(1.)*edge*edge*.55;
 face+=vec3(1.)*exp(-pow((h-.72)/.045,2.))*.38;
 face*=1.-.18*smoothstep(.55,.2,h)*(1.-kd);
 vec3 l=normalize(vec3((L-uv)*a,.3));vec3 hv=normalize(l+vec3(0.,0.,1.));
 float spec=pow(max(dot(n,hv),0.),60.)*exp(-d2*5.);
 float diff=max(dot(n,l),0.)*exp(-d2*8.);
 vec3 fr=mix(vec3(1.,.8,.55),vec3(.6,.75,1.),clamp(n.x*3.+.5,0.,1.));
 face+=spec*2.4+diff*.45+edge*fr*exp(-d2*12.)*1.3;
 // the lens flare also lights the glass
 vec3 lf=normalize(vec3((F-uv)*a,.45));
 face+=pow(max(dot(n,normalize(lf+vec3(0.,0.,1.))),0.),45.)*vec3(1.,.9,.78)*1.1*FI;
 vec3 bg=bgf(sc)*.07;
 float halo=h*(1.-c0);
 bg+=halo*(.1+.3*exp(-d2*8.))*vec3(.85,.9,1.);
 vec3 col=bg+c0*face*I;
 col+=flare(sc)*FI*(1.+z)*(1.-smoothstep(.72,.96,z));
 vec2 dc=(uv-vec2(.5))*a;float rr=length(dc);float rq=(fract(rr*2.4-T*.05)-.5)/.05;
 vec3 endc=bgf(uv)*.13+vec3(.55,.65,1.)*exp(-rr*rr*2.5)*.07+vec3(.7,.8,1.)*exp(-rq*rq)*.035*exp(-rr*1.5);
 col=mix(col,endc,smoothstep(.7,.98,z));
 col+=(hash(gl_FragCoord.xy+floor(T*24.))-.5)*.03;
 gl_FragColor=vec4(clamp(col,0.,1.),1.);}`;

function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o}
var pr=gl.createProgram();
try{gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr)}catch(e){document.body.classList.add('nogl');return}
gl.useProgram(pr);
var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
var loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
var U={};['M','R','F','T','V','I','B','S','FI','ZZ'].forEach(function(k){U[k]=gl.getUniformLocation(pr,k)});
U.P=gl.getUniformLocation(pr,'P[0]');
var tex=gl.createTexture(),mk=document.createElement('canvas'),cx=mk.getContext('2d'),bevel=10;

function layout(){
 var dpr=Math.min(window.devicePixelRatio||1,1.5),W=innerWidth,H=innerHeight;
 cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);mk.width=cv.width;mk.height=cv.height;
 gl.viewport(0,0,cv.width,cv.height);
 cx.font="700 100px "+FU+",'Arial Black',sans-serif";
 var wV=cx.measureText('vivek').width/100,wD=cx.measureText('dagar').width/100,off=cx.measureText('vi').width/100,
     asc=cx.measureText('d').actualBoundingBoxAscent/100||.74,desc=cx.measureText('g').actualBoundingBoxDescent/100||.2;
 var portrait=W<H*.85,total=Math.max(wV,off+wD),gapEm=portrait?.14:.09;
 var s=Math.min(W*.92/total,H*.66/(2*asc+gapEm+desc));
 var gap=s*gapEm,bh=(2*asc+desc)*s+gap;
 var x0=(W-total*s)/2,top=H*(portrait?.44:.47)-bh/2;
 var b1=top+asc*s,b2=b1+gap+asc*s;
 document.documentElement.style.setProperty('--x',x0+'px');Z0=document.getElementById('runway').offsetTop;
 lcx=li.offsetLeft+li.offsetWidth/2;lcy=li.offsetTop+li.offsetHeight/2;
 cx.fillStyle='#000';cx.fillRect(0,0,mk.width,mk.height);
 cx.fillStyle='#fff';cx.textBaseline='alphabetic';cx.font='700 '+(s*dpr)+"px "+FU+",'Arial Black',sans-serif";
 cx.fillText('vivek',x0*dpr,b1*dpr);cx.fillText('dagar',(x0+off*s)*dpr,b2*dpr);
 bevel=Math.max(5,s*dpr*.05);
 gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,mk);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 if(RM)draw(performance.now());
}

var th=Math.PI+(Math.random()-.5)*.9,FC=Math.cos(th),FS=Math.sin(th),mpx=-1e4,mpy=-1e4,lg=0,ltx=0,lty=0,lcx=0,lcy=0,tgt={x:.5,y:.5},cur={x:-.2,y:.6},tr=[],last=-1e9,seen=false,vel=0,t0=performance.now(),prev=t0,ss=window.scrollY||0;
for(var i=0;i<5;i++)tr.push({x:-.2,y:.6});
var arr=new Float32Array(10);
function cl(v){return Math.min(Math.max(v,0),1)}function sm(v){return v*v*(3-2*v)}
function pm(x,y){mpx=x;mpy=y;tgt.x=x/innerWidth;tgt.y=1-y/innerHeight;last=performance.now();seen=true;if(RM)draw(last)}
addEventListener('pointermove',function(e){pm(e.clientX,e.clientY)},{passive:true});
addEventListener('pointerdown',function(e){pm(e.clientX,e.clientY)},{passive:true});
addEventListener('touchmove',function(e){var t=e.touches[0];if(t)pm(t.clientX,t.clientY)},{passive:true});
addEventListener('pointerleave',function(){last=performance.now()-2000;mpx=-1e4});
if(RM)addEventListener('scroll',function(){draw(performance.now())},{passive:true});

var wc=[],clk=0,lf=0,E=function(i){return document.getElementById(i)},tb=E('tb'),tb2=E('tb2'),tb3=E('tb3'),dm=E('dm'),dm2=E('dm2'),dm3=E('dm3'),
 KEY={1:'255,170,90',2:'90,210,255',4:'190,130,255'},GLY='▓▒░/\\#&*+=<>?%$';
// the line is liquid glass: words reveal as you read, and the whole line flows through an animated displacement
function tagFX(t,hp,NW,sv){
 for(var w=0;w<words.length;w++){var kw=sm(cl(hp*NW-w));words[w].style.opacity=(.14+.86*kw).toFixed(3);words[w].style.transform='translate3d(0,'+((1-kw)*.2).toFixed(3)+'em,0)'}
 tb3.setAttribute('baseFrequency',(.007+.0025*Math.sin(t*.5)).toFixed(4)+' '+(.016+.004*Math.cos(t*.43)).toFixed(4));
 dm3.setAttribute('scale',(3.5+1.5*Math.sin(t*.9)+sv*12).toFixed(1))}
function liq(t,mm){if(mm<.01||clk<.02)return;var bf=(.006+.002*Math.sin(t*.5)).toFixed(4)+' '+(.013+.003*Math.cos(t*.37)).toFixed(4);
 tb.setAttribute('baseFrequency',bf);tb2.setAttribute('baseFrequency',bf);dm.setAttribute('scale',(13+6*Math.sin(t*.8)).toFixed(1));
 clk*=.88;dm2.setAttribute('scale',(16+clk*120).toFixed(1))}
function draw(now){
 var dt=Math.min((now-prev)/1000,.05);prev=now;if(RM)dt=1;
 var t=(now-t0)/1000,H=innerHeight;
 var sy=window.scrollY,maxS=Math.max(1,document.documentElement.scrollHeight-H);
 ss+=(sy-ss)*(RM?1:1-Math.exp(-dt*12));
 var zl=Math.max(1,maxS-Z0-.12*H),p=cl(ss/Math.max(1,Z0)),z=Math.min(Math.max((ss-Z0)/zl,0),1);
 var idle=(now-last)>2600,ix,iy;
 if(RM){ix=.55;iy=.55}
 else if(!seen&&t<2.6){var k=1-Math.pow(1-t/2.6,3);ix=-.1+1.2*k;iy=.55+.12*Math.sin(k*5)}
 else{ix=.5+.42*Math.sin(t*.33);iy=.52+.2*Math.sin(t*.51+1)}
 var gx=idle?ix:tgt.x,gy=idle?iy:tgt.y,px=cur.x,py=cur.y,kc=RM?1:1-Math.exp(-dt*(idle?1.6:9));
 cur.x+=(gx-cur.x)*kc;cur.y+=(gy-cur.y)*kc;
 vel+=(Math.min(Math.hypot(cur.x-px,cur.y-py)*60,1)-vel)*(1-Math.exp(-dt*6));
 arr[0]=cur.x;arr[1]=cur.y;
 for(var i=1;i<5;i++){var kk=RM?1:1-Math.exp(-dt*9*Math.pow(.62,i));tr[i].x+=((i==1?cur.x:tr[i-1].x)-tr[i].x)*kk;tr[i].y+=((i==1?cur.y:tr[i-1].y)-tr[i].y)*kk;arr[i*2]=tr[i].x;arr[i*2+1]=tr[i].y}
 // lens flare travels diagonally across the whole page as you scroll
 var wob=.05*Math.sin(p*6.2832),fx=.5+FC*(.36-.7*p)-FS*wob+(cur.x-.5)*.03,fy=.5+FS*(.38-.74*p)+FC*wob+(cur.y-.5)*.03+(RM?0:.008*Math.sin(t*.5));
 var a=RM?1:Math.min(t/1.2,1);
 gl.uniform1i(U.M,0);gl.uniform2f(U.R,cv.width,cv.height);gl.uniform2fv(U.P,arr);gl.uniform2f(U.F,fx,fy);
 gl.uniform1f(U.T,RM?3:t);gl.uniform1f(U.V,vel);gl.uniform1f(U.I,a*a*(3-2*a)*(1-Math.min(z*4,1)));gl.uniform1f(U.ZZ,z);gl.uniform1f(U.B,bevel);
 gl.uniform1f(U.S,ss/H);gl.uniform1f(U.FI,.9*(.6+.4*a));
 gl.drawArrays(gl.TRIANGLES,0,3);
 // stage 2: tagline arrives with the first scroll, words light up while it is pinned, then it dissolves into the zoom
 var u=sm(cl((ss/H-.5)/.5)),ex=sm(cl((ss-Z0)/(zl*.45))),hp=RM?1:cl((ss-.5*H)/(.8*H)),NW=words.length+2;
 tag.style.opacity=(u*(1-ex)).toFixed(3);
 tag.style.setProperty('--ty',((1-u)*46).toFixed(1)+'px');tag.style.setProperty('--sc',(1+ex*.12).toFixed(4));
 tag.style.filter=((u*(1-ex)>.01?'url(#liq3)':'')+(ex>.01?' blur('+(ex*16).toFixed(1)+'px)':''))||'none';
 if(u*(1-ex)>.01)tagFX(t,hp,NW,Math.min(Math.abs(sy-ss)/H*6,1),fx*innerWidth,(1-fy)*innerHeight);
 // stage 3: the index rises out of the zoom, item by item
 var mm=sm(cl((z-.78)/.22));
 menu.style.visibility=mm>.01?'visible':'hidden';menu.style.pointerEvents=mm>.6?'auto':'none';
 if((mm>.6)!==menuOn){menuOn=mm>.6;menu.setAttribute('aria-hidden',menuOn?'false':'true')}
 for(var j=0;j<items.length;j++){var mj=cl(mm*1.8-j*.2);items[j].style.opacity=mj.toFixed(3);items[j].style.transform='translate3d(0,'+((1-mj)*34).toFixed(1)+'px,0)';items[j].style.filter=mj<.99?'blur('+((1-mj)*12).toFixed(1)+'px)':'none'}
 var ddx=mpx-lcx,ddy=mpy-lcy,dd=Math.hypot(ddx,ddy),gt=Math.max(0,1-dd/170),kl=RM?1:1-Math.exp(-dt*10);
 lg+=(gt-lg)*kl;ltx+=(ddx*.32*gt-ltx)*kl;lty+=(ddy*.32*gt-lty)*kl;
 li.style.setProperty('--g',lg.toFixed(3));li.style.setProperty('--tx',ltx.toFixed(2)+'px');li.style.setProperty('--ty',lty.toFixed(2)+'px');
 li.style.setProperty('--ix',(ltx*.5).toFixed(2)+'px');li.style.setProperty('--iy',(lty*.5).toFixed(2)+'px');
 li.style.setProperty('--mx',(50+ddx/(dd+1)*40*Math.max(.3,gt)).toFixed(1)+'%');li.style.setProperty('--my',(50+ddy/(dd+1)*40*Math.max(.3,gt)).toFixed(1)+'%');
 if(window.LI3)window.LI3.update(t,lg,ddx,ddy,dd);
 if(window.NET)NET.draw(t,u*(1-ex),hp,cur.x,1-cur.y);liq(t,mm);
}
function loop(now){if(!window.__pause)draw(now);requestAnimationFrame(loop)}
items.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var t=a.querySelector('.t');t.classList.remove('pop');void t.offsetWidth;t.classList.add('pop');clk=1;
 var r=document.createElement('i');r.className='rp';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);setTimeout(function(){r.remove();t.classList.remove('pop')},1100)})});
addEventListener('resize',layout);
var go=function(){layout();if(!RM)requestAnimationFrame(loop);else draw(performance.now())};
if(document.fonts&&document.fonts.load){
 Promise.race([document.fonts.load("700 100px "+FU+"","vivek dagar"),new Promise(function(r){setTimeout(r,1200)})]).then(go,go);
}else go();
})();

}
