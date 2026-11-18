'use client';

import {useEffect,useRef} from 'react';
import type {ReactNode} from 'react';

/**
 * Image-aware bento grid.
 * Uses each cover's real pixel dimensions to choose the column span.
 * ResizeObserver calculates row spans from the card's actual rendered height,
 * so nothing is cropped or stretched and tiles pack together without overlap.
 */
export function BentoGrid({children,className=''}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);

 useEffect(()=>{
  const grid=ref.current;
  if(!grid)return;

  const cards=Array.from(grid.querySelectorAll<HTMLElement>(':scope > .project-card'));
  const content=cards.map(card=>card.querySelector<HTMLElement>(':scope > a'));
  const images=cards.map(card=>card.querySelector<HTMLImageElement>('.project-cover-image'));
  const resizeObserver=new ResizeObserver(()=>schedule());
  let frame=0;
  let lastGridWidth=0;

  function update(){
   if(!grid)return;
   const gridWidth=grid.getBoundingClientRect().width;
   const narrow=window.innerWidth<=700;
   const medium=!narrow&&gridWidth<950;
   const styles=getComputedStyle(grid);
   const rowHeight=parseFloat(styles.gridAutoRows)||8;
   const rowGap=parseFloat(styles.rowGap)||12;

   cards.forEach((card,i)=>{
    const image=images[i];
    const aspect=image&&image.naturalWidth&&image.naturalHeight
     ?image.naturalWidth/image.naturalHeight:1;
    // A natural vertical design gets a tall, narrow frame;
    // a wide banner gets a larger horizontal one.
    const cols=narrow?12:medium?(aspect>=2?12:6)
     :aspect>=2.15?12:aspect>=1.17?8:aspect<=0.86?4:6;
    card.style.setProperty('--bento-cols',String(cols));
   });

   // First set widths; then measure natural heights using the inner link,
   // rather than the grid item (whose size depends on its row span).
   cards.forEach((card,i)=>{
    const naturalHeight=content[i]?.getBoundingClientRect().height||0;
    if(narrow){
     card.style.removeProperty('--bento-rows');
    }else if(naturalHeight){
     const rows=Math.max(1,Math.ceil((naturalHeight+rowGap)/(rowHeight+rowGap)));
     card.style.setProperty('--bento-rows',String(rows));
    }
   });
   lastGridWidth=gridWidth;
  }

  function schedule(){
   if(frame)cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{frame=0;update()});
  }

  const onImageLoad=()=>schedule();
  images.forEach(image=>{
   image?.addEventListener('load',onImageLoad);
   image?.addEventListener('error',onImageLoad);
  });
  content.forEach(el=>{if(el)resizeObserver.observe(el)});
  // Only recalculate grid-wide changes when its WIDTH changes:
  // auto-row placement also alters the grid's height.
  const gridObserver=new ResizeObserver(()=>{
   const width=grid.getBoundingClientRect().width;
   if(Math.abs(width-lastGridWidth)>1)schedule();
  });
  gridObserver.observe(grid);
  schedule();

  return ()=>{
   if(frame)cancelAnimationFrame(frame);
   resizeObserver.disconnect();
   gridObserver.disconnect();
   images.forEach(image=>{
    image?.removeEventListener('load',onImageLoad);
    image?.removeEventListener('error',onImageLoad);
   });
  };
 },[children]);

 return <div ref={ref} className={'bento-grid '+className}>{children}</div>;
}
