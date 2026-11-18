import Link from 'next/link';
import {ArrowDownRight,ArrowRight,ArrowUpRight} from 'lucide-react';
import {projects,services} from '@/lib/data';
import {ProjectCard} from '@/components/ProjectCard';
import {BentoGrid} from '@/components/BentoGrid';
import {getSettings} from '@/lib/settings';

/** A creative director's index, not a portfolio template. */
export default async function Home(){
 const [all,offerings,settings]=await Promise.all([projects(),services(),getSettings()]);
 const selected=all.filter(p=>p.featured).slice(0,6);
 return <>
  <section className="nm-hero" aria-labelledby="home-heading">
   <div className="container nm-hero-container">
    <div className="nm-hero-dateline">
     <span>NAFIS IBN MASUD <b>／</b> INDEPENDENT CREATIVE PRACTICE</span>
     <span>BASED IN DHAKA, BD <i aria-hidden="true">✳</i> WORKING EVERYWHERE</span>
    </div>
    <div className="nm-hero-stage">
     <div className="nm-hero-type">
      <span className="nm-coordinate">001 — IDEAS, ART DIRECTION & VISUAL WORLDS</span>
      <h1 id="home-heading"><span>MADE</span><span>YOU <em>LOOK.</em></span></h1>
      <div className="nm-hero-intro">
       <span className="nm-asterisk" aria-hidden="true">✳</span>
       <div><strong>HI, I'M NAFIS.</strong><p>{settings.hero_description}</p></div>
      </div>
     </div>
     <figure className="nm-portrait">
      <img src="/portfolio/nafis-portrait.jpg" width={920} height={920} alt="Nafis Ibn Masud, creative visualizer photographed in cool cinematic blue lighting" fetchPriority="high" decoding="async"/>
      <figcaption><span>THE PERSON BEHIND THE PIXELS</span><b>N / M</b></figcaption>
      <span className="nm-portrait-cross" aria-hidden="true">+</span>
     </figure>
     <span className="nm-hero-vertical" aria-hidden="true">A PRACTICE IN NOTICING THINGS</span>
    </div>
    <div className="nm-hero-foot">
     <p>GOOD WORK ISN'T JUST SEEN. IT STAYS WITH YOU.</p>
     <a href="#selected-work">SCROLL TO SEE THE WORK <ArrowDownRight size={19}/></a>
    </div>
   </div>
  </section>

  <section className="nm-selected-section" id="selected-work" aria-labelledby="selected-heading">
   <div className="container">
    <div className="nm-section-index"><span>01 / SELECTED WORK</span><span>CURATED, NOT EVERYTHING</span></div>
    <div className="nm-selected-heading">
     <h2 id="selected-heading">A FEW THINGS<br/><em>I'VE MADE.</em></h2>
     <div><p>Different briefs. Different mediums. Same obsession with finding the idea worth looking at.</p><Link href="/work" className="nm-underline-link">ALL PROJECTS <ArrowUpRight size={18}/></Link></div>
    </div>
    {selected.length?
      <BentoGrid className="featured-grid nm-featured-work">{selected.map((p,i)=><ProjectCard p={p} index={i} key={p.id}/>)}</BentoGrid>
      :<div className="nm-archive-empty"><p>The portfolio is being curated.</p><a href="https://www.behance.net/nafis24" target="_blank" rel="noopener noreferrer">Explore my Behance <ArrowUpRight size={17}/></a></div>}
    <Link href="/work" className="nm-see-all"><span>THE REST OF THE ARCHIVE</span><strong>EXPLORE MORE WORK</strong><ArrowUpRight size={30}/></Link>
   </div>
  </section>

  <section className="nm-manifesto" aria-label="My approach">
   <div className="container nm-manifesto-inner">
    <span className="nm-manifesto-id">BETWEEN WHAT EXISTS AND WHAT COULD.</span>
    <p>I DON'T JUST LIKE<br/>MAKING THINGS <em>LOOK GOOD.</em><br/>I LIKE MAKING THEM <span>MEAN SOMETHING.</span></p>
    <span className="nm-manifesto-mark" aria-hidden="true">✳</span>
   </div>
  </section>

  <section className="container nm-practice" aria-labelledby="practice-heading">
   <div className="nm-section-index"><span>02 / THE PRACTICE</span><span>WHAT I LOVE MAKING</span></div>
   <div className="nm-practice-layout">
    <div className="nm-practice-intro"><h2 id="practice-heading">ONE MIND.<br/><em>MORE THAN<br/>ONE MEDIUM.</em></h2><p>Some stories need a single frame. Others need a whole identity or a little movement.</p></div>
    <div className="nm-discipline-list">
     {offerings.slice(0,4).map((s,i)=><Link href="/services" className="nm-discipline" key={s.id}>
      <span>{String(i+1).padStart(2,'0')}</span><div><h3>{s.title}</h3><p>{s.description}</p></div><ArrowUpRight size={25} aria-hidden="true"/>
     </Link>)}
    </div>
   </div>
  </section>

  <section className="nm-note-section">
   <div className="container nm-note">
    <div className="nm-note-art" aria-hidden="true"><span>N</span><span className="nm-note-diagonal">/</span><span>M</span><small>A SMALL STUDIO INSIDE ONE HEAD.</small></div>
    <div className="nm-note-copy"><span className="nm-kicker">03 / THE HUMAN PART</span><h2>CURIOUS<br/>BY DEFAULT<span>.</span></h2><p>I'm a designer in Dhaka who believes the best ideas usually begin with a question. I work across identity, advertising, packaging and motion — and I'm still excited by the little things that make a picture feel right.</p><Link href="/about" className="nm-underline-link">MORE ABOUT ME <ArrowUpRight size={18}/></Link></div>
   </div>
  </section>

  <section className="container nm-last-word">
   <span>GOT AN IDEA YOU CAN'T STOP THINKING ABOUT?</span>
   <Link href="/contact">LET'S SEE<br/><em>WHAT IT COULD BE.</em> <ArrowRight aria-hidden="true"/></Link>
  </section>
 </>;
}
