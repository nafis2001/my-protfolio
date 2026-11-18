'use client';
import {useMemo,useState} from 'react';
import {useRouter,useSearchParams} from 'next/navigation';
import {ArrowDownUp,Search,X} from 'lucide-react';
import {ProjectCard} from './ProjectCard';
import type {Project} from '@/lib/types';

export function WorkExplorer({items}:{items:Project[]}){
 const router=useRouter(),params=useSearchParams();const [visible,setVisible]=useState(8);
 const category=params.get('category')||'',query=params.get('q')||'',sort=params.get('sort')||'featured',view=params.get('view')||'grid';
 function update(key:string,value:string){
  const next=new URLSearchParams(params.toString());value?next.set(key,value):next.delete(key);
  router.replace('/work'+(next.size?'?'+next.toString():''),{scroll:false});setVisible(8);
 }
 const categories=[...new Set(items.map(p=>p.category))];
 const filtered=useMemo(()=>items.filter(p=>(!category||p.category===category)&&(!query||[p.title,p.summary,p.category,p.client,...p.tags].join(' ').toLowerCase().includes(query.toLowerCase().trim()))).sort((a,b)=>sort==='newest'?b.year-a.year||a.sort_order-b.sort_order:sort==='az'?a.title.localeCompare(b.title):Number(b.featured)-Number(a.featured)||a.sort_order-b.sort_order),[items,category,query,sort]);
 return <>
  <div className="work-toolbar">
   <div className="work-search"><Search size={18} aria-hidden="true"/><input className="input" aria-label="Search selected projects" placeholder="Search projects, brands, ideas..." value={query} onChange={e=>update('q',e.target.value)}/>{query&&<button className="clear-search" onClick={()=>update('q','')} aria-label="Clear search"><X size={17}/></button>}</div>
   <div className="work-sort"><ArrowDownUp size={17} aria-hidden="true"/><select className="select" aria-label="Sort selected projects" value={sort} onChange={e=>update('sort',e.target.value)}><option value="featured">Curated order</option><option value="newest">Newest first</option><option value="az">A to Z</option></select></div>
   <div className="view-toggle" role="group" aria-label="Layout"><button type="button" className={view==='grid'?'active':''} aria-pressed={view==='grid'} onClick={()=>update('view','grid')}>Grid</button><button type="button" className={view==='list'?'active':''} aria-pressed={view==='list'} onClick={()=>update('view','list')}>List</button></div>
  </div>
  <div className="work-categories"><button className={!category?'active':''} aria-pressed={!category} onClick={()=>update('category','')}>All work <span>{items.length}</span></button>{categories.map(c=>{const n=items.filter(p=>p.category===c).length;return <button key={c} className={category===c?'active':''} aria-pressed={category===c} onClick={()=>update('category',category===c?'':c)}>{c} <span>{n}</span></button>})}</div>
  <div className="work-result-label" aria-live="polite"><span>{filtered.length} project{filtered.length===1?'':'s'} in view</span><span>SCROLL TO EXPLORE ↓</span></div>
  {filtered.length?<div className={'grid12 work-cards '+(view==='list'?'work-list':'')}>{filtered.slice(0,visible).map((p,i)=><ProjectCard key={p.id} p={p} index={i}/>)}</div>:<div className="panel empty-state"><h3>Nothing in this frame.</h3><p>Try another keyword or explore the whole archive.</p><button className="btn primary" onClick={()=>router.replace('/work')}>Clear filters</button></div>}
  {filtered.length>visible&&<div className="load-more"><button className="btn" type="button" onClick={()=>setVisible(v=>v+8)}>Load more projects ↓</button></div>}
 </>;
}
