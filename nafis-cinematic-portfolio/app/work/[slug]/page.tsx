import {notFound} from 'next/navigation';
import Link from 'next/link';
import {ArrowUpRight, ArrowLeft, ArrowRight} from 'lucide-react';
import type {Metadata} from 'next';
import {projects} from '@/lib/data';
import {metadata as meta} from '@/lib/seo';
import {ProjectArt} from '@/components/ProjectCard';
import {Gallery} from '@/components/Gallery';

export async function generateStaticParams(){return (await projects()).map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const p=(await projects()).find(p=>p.slug===slug);
 return p?meta(p.seo_title||p.title,p.seo_description||p.summary,'/work/'+slug):meta('Project unavailable','This project is unavailable.','/work');
}
export default async function CaseStudy({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const all=await projects();const index=all.findIndex(p=>p.slug===slug),p=all[index];
 if(!p)notFound();
 const next=all[(index+1)%all.length];
 const sections=[['01 / THE BRIEF','The challenge',p.challenge],['02 / THE THINKING','The approach',p.approach],['03 / THE WORK','The solution',p.solution]];
 return <article className="container section case-study">
  <div className="case-intro">
   <Link className="back-link" href="/work"><ArrowLeft size={17}/> Back to all work</Link>
   <div className="case-heading-row"><div><span className="eyebrow">{p.category.toUpperCase()} / {p.year}</span><h1>{p.title}</h1><p>{p.summary}</p></div><span className="case-number" aria-label={'Project number '+(index+1)}>{String(index+1).padStart(2,'0')} <small>/ {String(all.length).padStart(2,'0')}</small></span></div>
   {p.concept&&<p className="notice">Concept exploration — not a commissioned result or a verified campaign performance claim.</p>}
   <div className="case-tags">{p.tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div>
  </div>
  <div className="case-cover"><ProjectArt p={p} index={index} className="wide-art"/></div>
  <div className="case-facts"><div><span className="eyebrow">BRAND / PROJECT</span><strong>{p.client}</strong></div><div><span className="eyebrow">MY ROLE</span><strong>{p.role}</strong></div><div><span className="eyebrow">DISCIPLINE</span><strong>{p.category}</strong></div><div><span className="eyebrow">YEAR</span><strong>{p.year}</strong></div></div>
  <div className="case-story-intro"><span className="eyebrow">BEHIND THE VISUALS</span><h2>Every detail<br/><em>has a reason.</em></h2></div>
  {sections.map(([count,title,body])=><section className="detail-section case-narrative" key={count}><div><span className="eyebrow">{count}</span><h2>{title}</h2></div><p>{body}</p></section>)}
  {p.gallery?.length>0&&<section className="case-gallery-section"><div className="section-heading"><div><span className="eyebrow">A CLOSER LOOK</span><h2>The details.</h2></div><p className="section-lead">Select an image to view it larger.</p></div><Gallery media={p.gallery}/></section>}
  {p.body_blocks?.map((b,i)=><section key={i} className="detail-section">{b.type==='image'&&b.url?<img src={b.url} alt={b.alt||''} loading="lazy"/>:b.type==='heading'?<h2>{b.text}</h2>:<p>{b.text}</p>}</section>)}
  <div className="case-deliverables"><div><span className="eyebrow">DELIVERABLES</span><ul>{p.deliverables.map(t=><li key={t}>{t}</li>)}</ul></div><div><span className="eyebrow">TOOLS & CRAFT</span><ul>{p.tools.map(t=><li key={t}>{t}</li>)}</ul></div></div>
  <div className="case-navigation"><div><span className="eyebrow">KEEP EXPLORING</span><h2>Next up.</h2><p>There's always another idea around the corner.</p></div><Link href={'/work/'+next.slug} className="case-next-link"><span>{next.title}</span><ArrowUpRight size={27}/></Link></div>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'CreativeWork',name:p.title,description:p.summary,image:p.cover_image||undefined,creator:{'@type':'Person',name:'Nafis Ibn Masud'}}).replace(/</g,'\\u003c')}}/>
 </article>;
}
