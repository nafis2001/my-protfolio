import Link from 'next/link';
import {ArrowUpRight,FileDown} from 'lucide-react';
import {metadata as makeMetadata} from '@/lib/seo';
import {getSettings} from '@/lib/settings';
export const metadata:import('next').Metadata=makeMetadata('Professional Profile — Nafis Ibn Masud','Creative disciplines, toolkit and design portfolio of Dhaka-based graphic designer Nafis Ibn Masud.','/resume');
export default async function Resume(){
 const settings=await getSettings();
 return <div className="container section profile-page">
  <div className="page-intro"><span className="eyebrow">PROFESSIONAL PROFILE</span><h1>Creative by<br/><em>practice.</em></h1><p>My work moves across visual identities, advertising, packaging, print and motion. Here's the short version.</p>
  <div className="hero-buttons">{settings.cv_url&&<a className="btn primary" href={settings.cv_url} target="_blank" rel="noopener noreferrer">Download CV <FileDown size={17}/></a>}<Link className="btn primary" href="/work">View my projects <ArrowUpRight size={17}/></Link><a className="btn" href="https://www.behance.net/nafis24" target="_blank" rel="noopener noreferrer">Behance portfolio <ArrowUpRight size={17}/></a></div></div>
  <section className="detail-section profile-summary"><div><span className="eyebrow">AT A GLANCE</span><h2>What I do.</h2></div><div><p>Graphic design and art direction for brands, products and digital experiences, with a particular interest in idea-led campaigns and expressive, intentional compositions.</p><div className="skill-cloud">{['Social & campaign design','Brand identity','Packaging','Editorial & print','Motion graphics','Video editing'].map(s=><span className="skill-tag" key={s}>{s}</span>)}</div></div></section>
  <section className="detail-section profile-summary"><div><span className="eyebrow">EVERYDAY TOOLS</span><h2>How I make.</h2></div><div><p>Adobe Photoshop, Adobe Illustrator and video-editing workflows, supported by concept development, composition, type and image treatment.</p><p className="muted">A detailed downloadable CV can be added here when an approved résumé is available.</p></div></section>
  <div className="profile-footer"><p>Based in Dhaka, Bangladesh. Interested in a collaboration?</p><Link href="/contact" className="btn primary">Let's talk <ArrowUpRight size={17}/></Link></div>
 </div>;
}
