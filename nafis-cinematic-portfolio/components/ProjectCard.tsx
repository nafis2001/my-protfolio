import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import type {Project} from '@/lib/types';

export function ProjectArt({p,index=0,className=''}:{p:Project;index?:number;className?:string}){
 const artwork=Boolean(p.cover_image);
 return <div className={'project-art variant-'+(index%4+1)+' '+(artwork?'has-cover ':'')+className} role={artwork?undefined:'img'} aria-label={artwork?undefined:'Editorial visual for '+p.title}>
  {artwork?<><div className="project-cover-haze" style={{backgroundImage:'url("'+p.cover_image+'")'}} aria-hidden="true"/><Image className="project-cover-image" src={p.cover_image||''} alt={'Artwork from '+p.title} width={1200} height={1000} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 58vw" quality={80} loading="lazy" unoptimized={Boolean(p.cover_image?.startsWith('http'))}/></>:<div className="art-label">{p.title.split('—')[0]}<br/><span style={{fontSize:'.35em',fontWeight:500,letterSpacing:'.1em'}}>VISUAL EXPLORATION</span></div>}
  {p.concept&&<span className="concept-pill">CONCEPT STUDY</span>}
 </div>;
}
export function ProjectCard({p,index}:{p:Project;index:number}){
 return <article className="project-card">
  <Link href={'/work/'+p.slug} aria-label={'View '+p.title+' project'}>
   <div className="project-image-wrap">
    <ProjectArt p={p} index={index}/>
    <span className="project-visual-index" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
    <span className="project-visit" aria-hidden="true"><ArrowUpRight size={23}/></span>
   </div>
   <div className="project-info">
    <div className="project-info-top"><span>{p.category}</span><span>{p.year}</span></div>
    <div className="project-title-line"><h3>{p.title}</h3><ArrowUpRight size={21} aria-hidden="true"/></div>
    <p>{p.summary}</p>
   </div>
  </Link>
 </article>;
}
