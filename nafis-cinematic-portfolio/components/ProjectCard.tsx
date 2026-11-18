import Link from 'next/link';
import type {Project} from '@/lib/types';

export function ProjectArt({p,index=0,className=''}:{p:Project;index?:number;className?:string}){
 const artwork=Boolean(p.cover_image);
 return <div className={`project-art variant-${index%4+1} ${artwork?'has-cover':''} ${className}`} role={artwork?undefined:'img'} aria-label={artwork?undefined:`Editorial artwork for ${p.title}`}>
 {p.cover_image?<>
   <div className="project-cover-haze" style={{backgroundImage:`url("${p.cover_image}")`}} aria-hidden="true"/>
   <img className="project-cover-image" src={p.cover_image} alt={`Design artwork for ${p.title}`} loading="lazy" decoding="async"/>
 </>:<div className="art-label">{p.title.split('—')[0]}<br/><span style={{fontSize:'.35em',fontWeight:500,letterSpacing:'.1em'}}>VISUAL EXPLORATION</span></div>}
 {p.concept&&<span className="concept-pill">EDITORIAL DEMO</span>}
 </div>;
}
export function ProjectCard({p,index}:{p:Project;index:number}){
 return <article className="project-card"><Link href={`/work/${p.slug}`} aria-label={`View ${p.title} case study`}>
  <ProjectArt p={p} index={index}/>
  <div className="project-info"><div><h3>{p.title}</h3><p>{p.category} · {p.year}</p></div><span className="arrow" aria-hidden>↗</span></div>
 </Link></article>;
}
