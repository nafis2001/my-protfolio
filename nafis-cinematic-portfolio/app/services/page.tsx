import Link from 'next/link';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {services} from '@/lib/data';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata:import('next').Metadata=makeMetadata('Creative Services','Brand identity, campaigns, social media, packaging, editorial and motion design by Nafis Ibn Masud.','/services');
export default async function Services(){
 const offerings=await services();
 return <div className="container section service-page">
  <div className="page-intro"><span className="eyebrow">WHAT I DO / CREATIVE SERVICES</span><h1>Good ideas<br/><em>take shape.</em></h1><p>Every project starts somewhere. Here are a few ways I can help turn a thought into something people want to see.</p></div>
  <div className="services-page-grid">{offerings.map((s,i)=><article className="service-page-card" key={s.id}>
   <span className="eyebrow">{String(i+1).padStart(2,'0')} / DISCIPLINE</span><h2>{s.title}</h2><p>{s.description}</p><ul>{s.deliverables.map(d=><li key={d}><ArrowRight size={15} aria-hidden="true"/>{d}</li>)}</ul>
   <div className="service-page-bottom"><span>Scope and timeline depend on the brief.</span><Link className="btn primary" href={'/contact?service='+encodeURIComponent(s.title)}>Discuss a project <ArrowUpRight size={16}/></Link></div>
  </article>)}</div>
  <section className="section services-faq"><div className="section-heading"><div><span className="eyebrow">A FEW GOOD QUESTIONS</span><h2>Before we<br/><em>begin.</em></h2></div></div>
   {[
    ['What happens first?','We start by talking through your brand, audience, goals, deliverables and timeline.'],
    ['Can we work together remotely?','Yes. I’m based in Dhaka, Bangladesh, and open to collaborating across time zones.'],
    ['How do you price a project?','Pricing depends on scope, deliverables, complexity and deadlines. I share a tailored quote after understanding the brief.'],
    ['Can you combine multiple services?','Yes. Brand identity, campaigns, packaging and motion can be considered together when the project calls for it.']
   ].map(([q,a])=><details className="faq-item" key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}
  </section>
 </div>;
}
