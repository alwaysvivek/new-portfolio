import Scene from '../components/Scene';

export default function Page(){
  return (
    <>

<canvas id="c" aria-hidden="true"></canvas>
<svg width="0" height="0" style={{'position':'absolute'}} aria-hidden="true"><defs>
<filter id="liq" x="-6%" y="-12%" width="112%" height="124%"><feTurbulence id="tb" type="fractalNoise" baseFrequency=".006 .013" numOctaves="2" seed="3"/><feDisplacementMap id="dm" in="SourceGraphic" scale="13" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="liq2" x="-25%" y="-35%" width="150%" height="170%"><feTurbulence id="tb2" type="fractalNoise" baseFrequency=".006 .013" numOctaves="2" seed="3"/><feDisplacementMap id="dm2" in="SourceGraphic" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="liq3" x="-5%" y="-15%" width="110%" height="130%"><feTurbulence id="tb3" type="fractalNoise" baseFrequency=".008 .02" numOctaves="2" seed="7"/><feDisplacementMap id="dm3" in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>
</defs></svg>
<a className="li" id="li" href="https://www.linkedin.com/in/vivekkdagar/" target="_blank" rel="noopener noreferrer" aria-label="vivek dagar on linkedin"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg></a>
<div className="wrap">
 <section className="hero" id="hero"><h1 className="sr">vivek dagar</h1></section>
 <section className="hold" id="hold" aria-hidden="true"></section>
 <section className="runway" id="runway" aria-hidden="true"></section>
</div>

<div className="tag" id="tag"><p id="tagp">connecting people, technology &amp; creativity to turn ambitious ideas into meaningful impact.</p></div>


<nav className="menu" id="menu" aria-label="site" aria-hidden="true">
 <div className="big">
  <a className="b" href="#projects" style={{'--o':'15'}}><i className="rn">I</i><span className="t">Projects</span></a>
  <a className="b" href="#case-studies" style={{'--o':'5'}}><i className="rn">II</i><span className="t">Case studies</span></a>
  <a className="b" href="#about" style={{'--o':'23'}}><i className="rn">III</i><span className="t">About</span></a>
 </div>
 <div className="small">
  <div className="grp">
   <a className="s" href="#skills"><span className="t">Skills</span></a>
   <a className="s" href="#education"><span className="t">Education</span></a>
  </div>
  <a className="s" href="#contact"><span className="t">Contact</span></a>
 </div>
</nav>


<div id="cbg" aria-hidden="true"></div>
<div id="cpage" role="dialog" aria-modal="true" aria-label="contact" aria-hidden="true">
 <button id="cback" className="cb cpi" type="button">← Index</button>
 <div>
  <p className="ey cpi">Contact</p>
  <h2 className="gt cpi">Let’s talk</h2>
  <p className="sub cpi">connecting people, technology &amp; creativity to turn ambitious ideas into meaningful impact.</p>
  <ul className="rows">
   <li className="cpi"><a className="row" data-k="li" href="https://www.linkedin.com/in/vivekkdagar/" target="_blank" rel="noopener noreferrer"><i className="ic"></i><span className="tx"><b>LinkedIn</b><small>in/vivekkdagar</small></span><em>↗</em></a></li>
   <li className="cpi"><a className="row" data-k="gh" href="https://github.com/alwaysvivek" target="_blank" rel="noopener noreferrer"><i className="ic"></i><span className="tx"><b>GitHub</b><small>@alwaysvivek</small></span><em>↗</em></a></li>
   <li className="cpi"><a className="row" data-k="em" href="mailto:viv3kdagar@gmail.com"><i className="ic"></i><span className="tx"><b>Email</b><small>viv3kdagar@gmail.com</small></span><em>↗</em></a></li>
   <li className="cpi"><a className="row" data-k="cv" href="#resume"><i className="ic"></i><span className="tx"><b>View resume</b><small>coming soon</small></span><em>↗</em></a></li>
  </ul>
 </div>
 <div className="stage cpi"><canvas id="st3" className="st3" aria-hidden="true"></canvas><p className="hint">hover a link to preview it</p></div>
</div>
<div id="toast" role="status"></div>


      <Scene />
    </>
  );
}
