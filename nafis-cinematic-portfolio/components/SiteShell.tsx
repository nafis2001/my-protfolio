'use client';
import Link from 'next/link';
import {useState,useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,ArrowRight,Menu,Sun,Moon,X,ArrowUp} from 'lucide-react';

const navigation=[['Work','/work'],['About','/about'],['Services','/services'],['Process','/process'],['Contact','/contact']];

export function Header(){
 const pathname=usePathname();
 const [open,setOpen]=useState(false),[light,setLight]=useState(false);
 useEffect(()=>{
  const stored=localStorage.getItem('theme')==='light';
  setLight(stored);
  document.documentElement.dataset.theme=stored?'light':'dark';
 },[]);
 useEffect(()=>{setOpen(false)},[pathname]);
 useEffect(()=>{
  if(!open)return;
  function close(e:KeyboardEvent){if(e.key==='Escape')setOpen(false)}
  document.addEventListener('keydown',close);
  return ()=>document.removeEventListener('keydown',close);
 },[open]);
 function toggle(){
  const next=!light;
  setLight(next);
  document.documentElement.dataset.theme=next?'light':'dark';
  localStorage.setItem('theme',next?'light':'dark');
 }
 return <header className="topbar"><nav className="container nav" aria-label="Main navigation">
  <Link className="wordmark" href="/" aria-label="Nafis Ibn Masud — Home">NAFIS<span className="brand-dot">.</span><span className="wordmark-caption">CREATIVE VISUALIZER</span></Link>
  <div id="site-navigation" className={'navlinks '+(open?'open':'')}>
   {navigation.map(([name,url])=><Link key={url} className={pathname===url||pathname.startsWith(url+'/')?'active':''} aria-current={pathname===url||pathname.startsWith(url+'/')?'page':undefined} href={url} onClick={()=>setOpen(false)}>{name}</Link>)}
  </div>
  <div className="navend">
   <button className="theme-toggle" onClick={toggle} type="button" aria-label={light?'Switch to dark theme':'Switch to light theme'} title={light?'Dark theme':'Light theme'}>{light?<Moon size={18}/>:<Sun size={18}/>}</button>
   <Link href="/contact" className="btn primary contact-nav">Let's connect <ArrowUpRight size={16}/></Link>
   <button className="btn menu-toggle" type="button" aria-label={open?'Close navigation':'Open navigation'} aria-controls="site-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={19}/>:<Menu size={19}/>}</button>
  </div>
 </nav></header>;
}

export function Footer(){
 return <>
  <section className="closing" aria-labelledby="closing-heading">
   <div className="container closing-layout">
    <div><span className="eyebrow">GOT A GOOD ONE?</span><h2 id="closing-heading">Let's make it<br/><em>unforgettable.</em></h2></div>
    <div><p>Creative projects, thoughtful collaborations, or a simple hello. My inbox starts on the other side of this link.</p><Link href="/contact" className="btn primary">Start a conversation <ArrowUpRight size={18}/></Link></div>
   </div>
  </section>
  <footer className="site-footer"><div className="container">
   <div className="footer-top">
    <div><Link className="footer-brand" href="/">NAFIS<span>.</span></Link><p>Independent graphic designer & creative visualizer.<br/>Dhaka, Bangladesh · Collaborating everywhere.</p></div>
    <div className="footer-columns"><div><span className="eyebrow">EXPLORE</span><Link href="/work">Selected work</Link><Link href="/about">The person</Link><Link href="/services">What I do</Link><Link href="/process">How I work</Link></div>
    <div><span className="eyebrow">FIND ME</span><a href="https://www.behance.net/nafis24" target="_blank" rel="noopener noreferrer">Behance ↗</a><a href="https://www.linkedin.com/in/nafis1287/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/nafisfreelancer/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><Link href="/contact">Contact ↗</Link></div></div>
   </div>
   <div className="footer-bottom"><small>© {new Date().getFullYear()} Nafis Ibn Masud. Made with curiosity.</small><div><Link href="/privacy">Privacy</Link><Link href="/resume">Professional profile</Link></div><a href="#main" className="back-top">Back to top <ArrowUp size={14}/></a></div>
   <span className="footer-giant" aria-hidden="true">NAFIS.</span>
  </div></footer>
 </>;
}
export function ScrollProgress(){
 const [value,setValue]=useState(0);
 useEffect(()=>{
  const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setValue(max>0?window.scrollY/max:0)};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});
  return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[]);
 return <div aria-hidden="true" className="progress" style={{width:(value*100)+'%'}}/>;
}
