import Link from 'next/link';
import {ArrowUpRight, ArrowRight, MessageSquareText} from 'lucide-react';
import {ContactForm} from '@/components/ContactForm';
import {BriefBuilder} from '@/components/BriefBuilder';
import {metadata as makeMetadata} from '@/lib/seo';

export const metadata:import('next').Metadata=makeMetadata('Contact — Start a Conversation','Talk to Nafis Ibn Masud about a graphic design, branding, packaging or motion project.','/contact');

export default async function Contact({searchParams}:{searchParams:Promise<{service?:string}>}){
 const params=await searchParams;
 const service=(params.service||'').slice(0,90);
 const configured=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY&&process.env.SUPABASE_SERVICE_ROLE_KEY);
 const email=process.env.NEXT_PUBLIC_CONTACT_EMAIL||'';
 return <div className="container section contact-page">
  <div className="page-intro contact-intro"><span className="eyebrow">LET'S MAKE SOMETHING MEANINGFUL</span><h1>Tell me your<br/><em>big idea.</em></h1><p>Have a project in mind? Share a little about it. Good collaborations start with a good conversation.</p></div>
  <div className="contact-layout">
   <div className="contact-primary">
    <div className="contact-form-heading"><span className="eyebrow">{configured?'PROJECT ENQUIRY':'A LITTLE STARTING POINT'}</span><h2>{configured?'Start a project.':'Make your brief.'}</h2><p>{configured?'Your message will be sent securely to my enquiry inbox.':'Draft a short introduction below, then copy it into a message on LinkedIn or Instagram. Your details never leave this browser.'}</p></div>
    {configured?<ContactForm/>:<BriefBuilder initialService={service} email={email}/>}
   </div>
   <aside className="contact-aside">
    <div className="contact-aside-icon"><MessageSquareText size={24}/></div>
    <span className="eyebrow">DIRECT CONNECTIONS</span><h3>Find me<br/>out there.</h3>
    <a className="contact-social" href="https://www.linkedin.com/in/nafis1287/" target="_blank" rel="noopener noreferrer"><span>LinkedIn <small>Professional enquiries</small></span><ArrowUpRight size={19}/></a>
    <a className="contact-social" href="https://www.instagram.com/nafisfreelancer/" target="_blank" rel="noopener noreferrer"><span>Instagram <small>Creative conversations</small></span><ArrowUpRight size={19}/></a>
    <a className="contact-social" href="https://www.behance.net/nafis24" target="_blank" rel="noopener noreferrer"><span>Behance <small>Explore more projects</small></span><ArrowUpRight size={19}/></a>
    {email&&<a className="contact-social" href={'mailto:'+email}><span>Email <small>{email}</small></span><ArrowUpRight size={19}/></a>}
    <div className="contact-location"><span className="eyebrow">WHERE I'M BASED</span><p>Dhaka, Bangladesh (UTC+6)<br/>Open to remote collaborations.</p></div>
   </aside>
  </div>
  <div className="contact-postnote"><span>01 / INTRODUCE THE IDEA</span><ArrowRight size={17}/><span>02 / LET'S DISCUSS</span><ArrowRight size={17}/><span>03 / MAKE IT HAPPEN</span></div>
 </div>
}
