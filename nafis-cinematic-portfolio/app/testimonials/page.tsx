import {redirect} from 'next/navigation';
import {testimonials} from '@/lib/data';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata:import('next').Metadata=makeMetadata('Testimonials','Words from verified creative collaborators.','/testimonials');
export default async function Testimonials(){
 const quotes=await testimonials();
 if(!quotes.length)redirect('/work');
 return <section className="container section"><div className="page-intro"><span className="eyebrow">WORDS FROM COLLABORATORS</span><h1>Working<br/><em>together.</em></h1><p>Thoughts shared by collaborators and clients.</p></div><div className="service-grid">{quotes.map(t=><blockquote className="service-card" key={t.id}><p>“{t.quote}”</p><strong>{t.author}</strong><p>{t.role}, {t.company}</p></blockquote>)}</div></section>;
}
