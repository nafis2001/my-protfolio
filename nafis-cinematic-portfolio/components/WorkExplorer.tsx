'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowDownUp,Search,X} from 'lucide-react';
import {ProjectCard} from './ProjectCard';
import {BentoGrid} from './BentoGrid';
import type {Project} from '@/lib/types';

type Filters={category:string;query:string;sort:string;view:string};
const defaults:Filters={category:'',query:'',sort:'featured',view:'grid'};

export function WorkExplorer({items}:{items:Project[]}){
 const [filters,setFilters]=useState<Filters>(defaults);
 const [visible,setVisible]=useState(8);
 const {category,query,sort,view}=filters;
 useEffect(()=>{
  const p=new URLSearchParams(window.location.search);
  setFilters({category:p.get('category')||'',query:p.get('q')||'',sort:p.get('sort')||'featured',view:p.get('view')||'grid'});
 },[]);
 function update(key:keyof Filters,value:string){
  setFilters(s=>({...s,[key]:value}));
  const params=new URLSearchParams(window.location.search);
  const queryKey=key==='query'?'q':key;
  if(value&&!(key==='sort'&&value==='featured')&&!(key==='view'&&value==='grid'))params.set(queryKey,value);
  else params.delete(queryKey);
  window.history.replaceState(window.history.state,'','/work'+(params.size?'?'+params.toString():''));
  setVisible(8);
 }
 function reset(){
  setFilters(defaults);
  window.history.replaceState(window.history.state,'','/work');
  setVisible(8);
 }
 const categories=[...new Set(items.map(p=>p.category))];
 const filtered=useMemo(()=>items.filter(p=>(!category||p.category===category)&&(!query||[p.title,p.summary,p.category,p.client,...p.tags].join(' ').toLowerCase().includes(query.toLowerCase().trim()))).sort((a,b)=>sort==='newest'?b.year-a.year||a.sort_order-b.sort_order:sort==='az'?a.title.localeCompare(b.title):Number(b.featured)-Number(a.featured)||a.sort_order-b.sort_order),[items,category,query,sort]);
 return <>
  <div className="work-toolbar">
   <div className="work-search"><Search size={18} aria-hidden="true"/><input className="input" type="search" aria-label="Search selected projects" placeholder="Search projects, brands, ideas..." value={query} onChange={e=>update('query',e.target.value)}/>{query&&<button type="button" className="clear-search" onClick={()=>update('query','')} aria-label="Clear search"><X size={17}/></button>}</div>
   <div className="work-sort"><ArrowDownUp size={17} aria-hidden="true"/><select className="select" aria-label="Sort selected projects" value={sort} onChange={e=>update('sort',e.target.value)}><option value="featured">Curated order</option><option value="newest">Newest first</option><option value="az">A to Z</option></select></div>
   <div className="view-toggle" role="group" aria-label="Layout"><button type="button" className={view==='grid'?'active':''} aria-pressed={view==='grid'} onClick={()=>update('view','grid')}>Grid</button><button type="button" className={view==='list'?'active':''} aria-pressed={view==='list'} onClick={()=>update('view','list')}>List</button></div>
  </div>
  <div className="work-categories"><button type="button" className={!category?'active':''} aria-pressed={!category} onClick={()=>update('category','')}>All work <span>{items.length}</span></button>{categories.map(c=>{const n=items.filter(p=>p.category===c).length;return <button type="button" key={c} className={category===c?'active':''} aria-pressed={category===c} onClick={()=>update('category',category===c?'':c)}>{c} <span>{n}</span></button>})}</div>
  <div className="work-result-label" aria-live="polite"><span>{filtered.length} project{filtered.length===1?'':'s'} in view</span><span>SCROLL TO EXPLORE ↓</span></div>
  {filtered.length?(view==='list'?<div className="grid12 work-cards work-list">{filtered.slice(0,visible).map((p,i)=><ProjectCard key={p.id} p={p} index={i}/>)}</div>:<BentoGrid key={filtered.slice(0,visible).map(p=>p.id).join('|')} className="work-cards">{filtered.slice(0,visible).map((p,i)=><ProjectCard key={p.id} p={p} index={i}/>)}</BentoGrid>):<div className="panel empty-state"><h3>Nothing in this frame.</h3><p>Try another keyword or explore the whole archive.</p><button className="btn primary" type="button" onClick={reset}>Clear filters</button></div>}
  {filtered.length>visible&&<div className="load-more"><button className="btn" type="button" onClick={()=>setVisible(v=>v+8)}>Load more projects ↓</button></div>}
 </>;
}
