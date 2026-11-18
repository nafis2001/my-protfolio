import Link from 'next/link';
import type {Project} from '@/lib/types';
export function ProjectArt({p,index=0,className=''}:{p:Project;index?:number;className?:string}){return <div className={`project-art variant-${index%4+1} ${className}`} style={p.cover_image?{backgroundImage:`linear-gradient(#00101a18,#00101a18),url("${p.cover_image}")`,backgroundSize:'cover',backgroundPosition:'center'}:{}} role="img" aria-label={p.cover_image?`${p.title} cover image`:`Abstract editorial cover for ${p.title}`}>
 {!p.cover_image&&<div className="art-label">{p.title.split('—')[0]}<br/><span style={{fontSize:'.35em',fontWeight:500,letterSpacing:'.1em'}}>VISUAL EXPLORATION</span></div>}
 {p.concept&&<span style={{position:'absolute',zIndex:3,left:18,bottom:18,fontSize:10,letterSpacing:'.1em',background:'#061523ad',padding:'6px 10px',borderRadius:20}}>EDITORIAL DEMO</span>}
 </div>}
export function ProjectCard({p,index}:{p:Project;index:number}){return <article className="project-card"><Link href={`/work/${p.slug}`} aria-label={`View ${p.title} case study`}><ProjectArt p={p} index={index}/><div className="project-info"><div><h3>{p.title}</h3><p>{p.category} · {p.year}</p></div><span className="arrow" aria-hidden>↗</span></div></Link></article>}
