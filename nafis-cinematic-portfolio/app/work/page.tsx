import {Suspense} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {projects} from '@/lib/data';
import {WorkExplorer} from '@/components/WorkExplorer';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata:import('next').Metadata=makeMetadata('Selected Work — Design Portfolio','Browse real graphic design, brand identity, FMCG advertising, packaging and editorial projects by Nafis Ibn Masud.','/work');
export default async function Work(){
 const items=await projects();
 return <section className="container section work-page">
  <div className="page-intro work-intro"><span className="eyebrow">THE CURATED ARCHIVE / {String(items.length).padStart(2,'0')} PROJECTS</span><h1>Made to<br/><em>be seen.</em></h1><div className="intro-row"><p>A selection of actual design work—from food brands to identity systems, beauty campaigns and the details that tie everything together.</p><a href="https://www.behance.net/nafis24" target="_blank" rel="noopener noreferrer" className="text-link">More on Behance <ArrowUpRight size={18}/></a></div></div>
  <Suspense fallback={<p>Loading the project archive…</p>}><WorkExplorer items={items}/></Suspense>
  <div className="archive-end"><span className="eyebrow">THAT'S THE SHORTLIST</span><p>There's always more happening behind the scenes.</p><Link href="/contact" className="btn primary">Let's work together <ArrowUpRight size={17}/></Link></div>
 </section>;
}
