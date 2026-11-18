'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,X,ZoomIn} from 'lucide-react';
import type {Media} from '@/lib/types';

export function Gallery({media}:{media:Media[]}){
 const [index,setIndex]=useState<number|null>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  if(index===null)return;
  const prev=document.body.style.overflow;
  document.body.style.overflow='hidden';
  closeRef.current?.focus();
  const key=(e:KeyboardEvent)=>{
   if(e.key==='Escape')setIndex(null);
   if(e.key==='ArrowRight')setIndex(i=>i===null?null:(i+1)%media.length);
   if(e.key==='ArrowLeft')setIndex(i=>i===null?null:(i+media.length-1)%media.length);
  };
  document.addEventListener('keydown',key);
  return ()=>{document.body.style.overflow=prev;document.removeEventListener('keydown',key)};
 },[index,media.length]);
 if(!media.length)return null;
 return <>
  <div className="gallery-grid">
   {media.map((m,i)=>m.type==='video'?
    <figure className="gallery-tile" key={i}><video controls preload="metadata" playsInline style={{width:'100%',borderRadius:16}}><source src={m.url}/><track kind="captions" srcLang="en" label="English" src="/captions.vtt"/></video>{m.caption&&<figcaption>{m.caption}</figcaption>}</figure>:
    <button type="button" className="gallery-tile gallery-image" key={i} onClick={()=>setIndex(i)} aria-label={'Enlarge image '+(i+1)+': '+m.alt}>
     <img src={m.url} alt={m.alt} loading="lazy" decoding="async" width={1200} height={900}/>
     <span className="gallery-zoom"><ZoomIn size={20}/> View larger</span>
    </button>
   )}
  </div>
  {index!==null&&<div role="dialog" aria-modal="true" aria-label={'Gallery image '+(index+1)+' of '+media.length} className="lightbox" onMouseDown={e=>{if(e.target===e.currentTarget)setIndex(null)}}>
   <div className="lightbox-top"><span>{String(index+1).padStart(2,'0')} / {String(media.length).padStart(2,'0')}</span><button ref={closeRef} className="btn" onClick={()=>setIndex(null)} aria-label="Close gallery"><X size={17}/> Close</button></div>
   <button className="lightbox-prev" type="button" onClick={()=>setIndex((index+media.length-1)%media.length)} aria-label="Previous image"><ArrowLeft/></button>
   <div className="lightbox-media">{media[index].type==='video'?<video src={media[index].url} controls autoPlay playsInline/>:<img src={media[index].url} alt={media[index].alt}/>}<p>{media[index].caption||media[index].alt}</p></div>
   <button className="lightbox-next" type="button" onClick={()=>setIndex((index+1)%media.length)} aria-label="Next image"><ArrowRight/></button>
  </div>}
 </>;
}
