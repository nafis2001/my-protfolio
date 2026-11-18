'use client';
import Link from 'next/link';
import {useState,useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,Menu,Sun,Moon,X,ArrowUp} from 'lucide-react';

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
 return <header className="topbar nm-topbar"><nav className="container nav nm-nav" aria-label="Main navigation">
  <Link className="nm-wordmark" href="/" aria-label="Nafis Ibn Masud — Home"><span className="nm-logo-symbol">N<span>/</span>M</span><span className="nm-logo-text">NAFIS IBN MASUD<small>VISUAL THINKER / GRAPHIC DESIGNER</small></span></Link>
  <div id="site-navigation" className={'navlinks nm-navlinks '+(open?'open':'')}>
   {navigation.map(([name,url],i)=><Link key={url} className={pathname===url||pathname.startsWith(url+'/')?'active':''} aria-current={pathname===url||pathname.startsWith(url+'/')?'page':undefined} href={url} onClick={()=>setOpen(false)}><sup>{String(i+1).padStart(2,'0')}</sup>{name}</Link>)}
  </div>
  <div className="navend nm-navend">
   <button className="theme-toggle" onClick={toggle} type="button" aria-label={light?'Switch to dark theme':'Switch to light theme'} title={light?'Dark theme':'Light theme'}>{light?<Moon size={16}/>:<Sun size={16}/>}</button>
   <Link href="/contact" className="nm-nav-cta">SAY HELLO <ArrowUpRight size={18}/></Link>
   <button className="btn menu-toggle" type="button" aria-label={open?'Close navigation':'Open navigation'} aria-controls="site-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={19}/>:<Menu size={19}/>}</button>
  </div>
 </nav></header>;
}

export function Footer(){
 return <footer className="nm-footer">
  <div className="container">
   <div className="nm-footer-top"><span>NAFIS IBN MASUD © {new Date().getFullYear()}</span><span>DESIGNED WITH CURIOSITY IN DHAKA, BANGLADESH</span><a className="nm-back-top" href="#main">BACK UP <ArrowUp size={14}/></a></div>
   <div className="nm-footer-middle"><Link href="/" aria-label="Home">N<span>/</span>M</Link><div><p>Always curious about the next good idea.</p><Link href="/contact">MAKE SOMETHING TOGETHER <ArrowUpRight size={18}/></Link></div></div>
   <div className="nm-footer-bottom">
    <div><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/process">Process</Link><Link href="/resume">Profile</Link><Link href="/privacy">Privacy</Link></div>
    <div><a href="https://www.behance.net/nafis24" target="_blank" rel="noopener noreferrer">BEHANCE ↗</a><a href="https://www.linkedin.com/in/nafis1287/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href="https://www.instagram.com/nafisfreelancer/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a></div>
   </div>
  </div>
 </footer>;
}
export function ScrollProgress(){
 const [value,setValue]=useState(0);
 useEffect(()=>{
  const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setValue(max>0?window.scrollY/max:0)};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});
  return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[]);
 return <div aria-hidden="true" className="progress" style={{width:(value*100)+'%' }}/>;
}
