import Link from 'next/link';
import {ArrowUpRight, MoveUpRight} from 'lucide-react';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata:import('next').Metadata=makeMetadata('About — The Person Behind the Pixels','Get to know Nafis Ibn Masud, a Dhaka-based multidisciplinary graphic designer and creative visualizer.','/about');
const skills=['Visual storytelling','Brand identity','Campaign direction','Social design','Packaging & print','Photoshop','Illustrator','Motion graphics','Video editing'];
export default function About(){
 return <div className="container section about-page">
  <div className="page-intro"><span className="eyebrow">THE PERSON BEHIND THE PIXELS / 01</span><h1>Always a little<br/><em>curious.</em></h1><p>I'm Nafis Ibn Masud. A graphic designer who enjoys making sense of messy ideas—and making them look good along the way.</p></div>
  <div className="about-story">
   <figure className="portrait-frame about-portrait"><img src="/portfolio/nafis-portrait.jpg" alt="Portrait of Nafis Ibn Masud, a multidisciplinary designer based in Dhaka" width={1200} height={1200} loading="eager" decoding="async"/><figcaption className="about-photo-label">NAFIS IBN MASUD <span>CREATIVE VISUALIZER</span></figcaption></figure>
   <div className="about-story-copy">
    <span className="eyebrow">A LITTLE PERSPECTIVE</span>
    <h2>Good design<br/>is a <em>feeling.</em></h2>
    <p>I believe the most interesting visuals do more than fill space. They catch a feeling, tell a story, and make you want to look just a little longer.</p>
    <p>My work crosses brand identities, FMCG campaigns, packaging, print, beauty advertising and motion. I enjoy moving between these disciplines because the best ideas rarely stay inside a box.</p>
    <p>Behind every polished piece are the unglamorous things I love most: research, experimenting, questioning a detail, and trying one more version.</p>
    <Link href="/work" className="btn primary">See what I've made <ArrowUpRight size={17}/></Link>
   </div>
  </div>
  <section className="section about-values"><div><span className="eyebrow">THE THINGS THAT GUIDE MY WORK</span><h2>Curiosity.<br/><em>Care. Craft.</em></h2></div><div className="values-list">
   <div><span>01</span><h3>Start with the story.</h3><p>Understand what deserves attention before choosing how it should look.</p></div>
   <div><span>02</span><h3>Give details their due.</h3><p>The little decisions create the difference between an image and an experience.</p></div>
   <div><span>03</span><h3>Make space for surprise.</h3><p>Experiment freely, then edit until everything feels intentional.</p></div>
  </div></section>
  <section className="section about-capabilities"><span className="eyebrow">TOOLS, FORMATS & CURIOSITIES</span><h2>Different skills.<br/><em>One creative mind.</em></h2><div className="skill-cloud">{skills.map(s=><span className="skill-tag" key={s}>{s} <MoveUpRight size={14} aria-hidden="true"/></span>)}</div></section>
 </div>;
}
