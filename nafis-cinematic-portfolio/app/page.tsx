import Link from 'next/link';
import {ArrowUpRight, ArrowDownRight, ArrowRight, Sparkles} from 'lucide-react';
import {projects,services} from '@/lib/data';
import {ProjectCard} from '@/components/ProjectCard';
import {BentoGrid} from '@/components/BentoGrid';
import {getSettings} from '@/lib/settings';

export default async function Home(){
 const [all,offerings,settings]=await Promise.all([projects(),services(),getSettings()]);
 const selected=all.filter(p=>p.featured).slice(0,6);
 return <>
  <section className="hero hero-editorial" aria-labelledby="home-heading">
   <div className="container">
    <div className="hero-grid hero-editorial-grid">
     <div className="hero-copy reveal">
      <div className="hero-overline"><span className="eyebrow">NAFIS IBN MASUD / CREATIVE VISUALIZER</span><span className="hero-edition">PORTFOLIO / 2026</span></div>
      <h1 id="home-heading" className="hero-statement">{settings.hero_title==='Curiosity, made visual.'?<>{'Curiosity,'}<br/><span>made visual.</span></>:settings.hero_title}</h1>
      <p className="hero-desc">{settings.hero_description}</p>
      <div className="hero-buttons">
       <Link className="btn primary" href="/work">Explore my work <ArrowUpRight size={18}/></Link>
       <Link className="btn" href="/contact">Start a conversation <ArrowUpRight size={17}/></Link>
      </div>
      <div className="hero-proof">
       <span><strong>{String(all.length).padStart(2,'0')}</strong><small>Selected projects</small></span>
       <span><strong>BD <span aria-hidden="true">↗</span></strong><small>Based in Dhaka / working remotely</small></span>
      </div>
     </div>
     <div className="hero-visual">
      <div className="hero-visual-orbit" aria-hidden="true"/>
      <figure className="portrait-frame hero-portrait">
       <img src="/portfolio/nafis-portrait.jpg" alt="Portrait of Nafis Ibn Masud with cinematic blue studio lighting" width={920} height={920} fetchPriority="high" decoding="async"/>
       <figcaption className="portrait-overlay"><span>THE PERSON BEHIND THE PIXELS</span><strong>NAFIS <i>↗</i></strong></figcaption>
      </figure>
      <div className="hero-stamp" aria-hidden="true">VISUAL<br/>STORIES <Sparkles size={16}/></div>
     </div>
    </div>
    <div className="hero-bottom"><span>Independent by nature. Creative by design.</span><a href="#selected-work">Scroll to explore <ArrowDownRight size={15}/></a></div>
   </div>
  </section>

  <div className="expertise-strip" aria-label="Creative disciplines">
   <div className="container expertise-inner"><span>ART DIRECTION</span><i aria-hidden="true">✳</i><span>BRAND IDENTITY</span><i aria-hidden="true">✳</i><span>CAMPAIGN DESIGN</span><i aria-hidden="true">✳</i><span>MOTION & VIDEO</span></div>
  </div>

  <section className="section container selected-section" id="selected-work">
   <div className="section-heading"><div><span className="eyebrow">01 / THE SELECTED ARCHIVE</span><h2>Work that<br/><em>speaks.</em></h2><p className="section-lead">A collection of actual visuals from campaigns, identities, packaging and editorial explorations.</p></div><Link className="text-link" href="/work">View all projects <ArrowUpRight size={20}/></Link></div>
   {selected.length>0?<BentoGrid className="featured-grid">{selected.map((p,i)=><ProjectCard key={p.id} p={p} index={i}/>)}</BentoGrid>:<div className="panel"><p>More selected projects are being curated. In the meantime, explore my design work on Behance.</p><a className="btn primary" href="https://www.behance.net/nafis24" target="_blank" rel="noopener noreferrer">View Behance <ArrowUpRight size={17}/></a></div>}
   <div className="section-bottom-link"><Link className="btn" href="/work">See the entire portfolio <ArrowRight size={17}/></Link></div>
  </section>

  <section className="section services-feature">
   <div className="container">
    <div className="section-heading"><div><span className="eyebrow">02 / WHAT I BRING TO THE TABLE</span><h2>Creative thinking.<br/><em>Considered craft.</em></h2></div><p className="section-lead">From the first “what if?” to the final detail. The medium changes; the curiosity stays.</p></div>
    <div className="services-editorial">
     {offerings.slice(0,4).map((s,i)=><Link className="service-editorial-card" href="/services" key={s.id}>
      <span className="service-index">0{i+1} / DISCIPLINE</span><span className="service-arrow" aria-hidden="true"><ArrowUpRight size={23}/></span>
      <h3>{s.title}</h3><p>{s.description}</p>
      <span className="service-discover">Explore the approach <ArrowRight size={16}/></span>
     </Link>)}
    </div>
   </div>
  </section>

  <section className="section container about-feature">
   <div className="about-feature-grid">
    <div className="about-feature-graphic" aria-hidden="true"><span className="big-asterisk">✳</span><span className="about-graphic-caption">THINK. MAKE.<br/>FEEL. REPEAT.</span></div>
    <div className="about-feature-copy"><span className="eyebrow">03 / A BIT ABOUT ME</span><h2>More human.<br/><em>Less ordinary.</em></h2><p>I'm Nafis. I like ideas that make you look twice, visuals that feel intentional, and the tiny details most people never notice—until they do.</p><p>My work moves between brand identity, advertising, packaging, social design and motion. Different canvases, one belief: good design should mean something.</p><Link className="btn" href="/about">Meet the designer <ArrowUpRight size={17}/></Link></div>
   </div>
  </section>

  <section className="section container short-contact">
   <div><span className="eyebrow">04 / YOUR TURN</span><h2>Something on<br/><em>your mind?</em></h2></div>
   <div><p>Big brief, small idea, or an interesting “what if?”—I'd love to hear it.</p><Link href="/contact" className="btn primary">Tell me about it <ArrowUpRight size={18}/></Link></div>
  </section>
 </>;
}
