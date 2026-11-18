import {notFound} from 'next/navigation';
import Link from 'next/link';
import {ArrowUpRight,ArrowLeft,ArrowRight} from 'lucide-react';
import type {Metadata} from 'next';
import {projects} from '@/lib/data';
import {metadata as meta} from '@/lib/seo';
import {ProjectArt} from '@/components/ProjectCard';
import {Gallery} from '@/components/Gallery';

export async function generateStaticParams(){
 return (await projects()).map(p=>({slug:p.slug}));
}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const p=(await projects()).find(p=>p.slug===slug);
 return p?meta(p.seo_title||p.title,p.seo_description||p.summary,'/work/'+slug):meta('Project unavailable','This project is unavailable.','/work');
}

export default async function CaseStudy({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const all=await projects();
 const index=all.findIndex(p=>p.slug===slug);
 const p=all[index];
 if(!p)notFound();
 const next=all[(index+1)%all.length];
 const story=[
  ['01','The starting point',p.challenge],
  ['02','Finding the direction',p.approach],
  ['03','Making it real',p.solution]
 ];
 return <article className="nm-case-study">
  <header className="container nm-case-head">
   <div className="nm-case-topline">
    <Link href="/work" className="nm-case-back"><ArrowLeft size={17}/> BACK TO THE INDEX</Link>
    <span>PROJECT {String(index+1).padStart(2,'0')} / {String(all.length).padStart(2,'0')}</span>
   </div>
   <div className="nm-case-heading">
    <span>{p.category.toUpperCase()} / {p.year}</span>
    <h1>{p.title}</h1>
    <div className="nm-case-under-title">
     <p>{p.summary}</p>
     <span>NAFIS IBN MASUD / SELECTED WORK</span>
    </div>
   </div>
   {p.concept&&<p className="notice">Concept exploration — not a commissioned result or a verified campaign performance claim.</p>}
  </header>

  <div className="container nm-case-art">
   <ProjectArt p={p} index={index} className="wide-art"/>
  </div>

  <div className="container nm-case-facts">
   <div><span>THE BRAND</span><strong>{p.client}</strong></div>
   <div><span>MY ROLE</span><strong>{p.role}</strong></div>
   <div><span>FIELD</span><strong>{p.category}</strong></div>
   <div><span>YEAR</span><strong>{p.year}</strong></div>
  </div>

  <div className="container nm-case-story">
   <div className="nm-case-story-title">
    <span>BEHIND THE VISUAL</span>
    <h2>GOOD WORK<br/>HAS A <em>WHY.</em></h2>
   </div>
   <div className="nm-case-story-entries">
    {story.map(([number,title,body])=><section className="nm-case-story-entry" key={number}>
     <span>{number} / 03</span>
     <div><h3>{title}</h3><p>{body}</p></div>
    </section>)}
   </div>
  </div>

  {p.gallery?.length>0&&<section className="container nm-case-gallery">
   <div className="nm-section-index"><span>DETAILS / THE VISUAL EXPLORATION</span><span>{String(p.gallery.length).padStart(2,'0')} SELECTED FRAMES</span></div>
   <div className="nm-case-gallery-heading"><h2>LOOK<br/><em>CLOSER.</em></h2><p>Open an image to see it at a larger size. Every design is shown in its original proportions.</p></div>
   <Gallery media={p.gallery}/>
  </section>}

  {p.body_blocks?.length>0&&<div className="container nm-case-extra">
   {p.body_blocks.map((b,i)=><section key={i} className="nm-case-extra-block">
    {b.type==='image'&&b.url?<img src={b.url} alt={b.alt||''} loading="lazy"/>:b.type==='heading'?<h2>{b.text}</h2>:<p>{b.text}</p>}
   </section>)}
  </div>}

  <div className="container nm-case-specs">
   <div><span>WHAT I MADE</span><ul>{p.deliverables.map(t=><li key={t}>{t}</li>)}</ul></div>
   <div><span>THE TOOLBOX</span><ul>{p.tools.map(t=><li key={t}>{t}</li>)}</ul></div>
   <div className="nm-case-tags"><span>THE TAGS</span>{p.tags.map(tag=><small key={tag}>{tag}</small>)}</div>
  </div>

  <nav className="nm-case-next" aria-label="Next project">
   <div className="container">
    <div><span>KEEP LOOKING / NEXT PROJECT</span><Link href="/work">VIEW ALL WORK <ArrowUpRight size={15}/></Link></div>
    <Link href={'/work/'+next.slug} className="nm-case-next-title">{next.title}<ArrowRight aria-hidden="true"/></Link>
   </div>
  </nav>

  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'CreativeWork',name:p.title,description:p.summary,image:p.cover_image||undefined,creator:{'@type':'Person',name:'Nafis Ibn Masud'}}).replace(/</g,'\\u003c')}}/>
 </article>;
}
