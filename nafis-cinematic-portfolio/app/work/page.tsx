import {Suspense} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {projects} from '@/lib/data';
import {WorkExplorer} from '@/components/WorkExplorer';
import {metadata as makeMetadata} from '@/lib/seo';

export const metadata:import('next').Metadata=makeMetadata(
 'Selected Work — Design Portfolio',
 'Explore graphic design, brand identity, advertising, packaging and editorial projects by Nafis Ibn Masud.',
 '/work'
);

export default async function Work(){
 const items=await projects();
 return <section className="container section work-page nm-work-archive">
  <header className="nm-archive-head">
   <div className="nm-section-index"><span>INDEX / 001—{String(items.length).padStart(3,'0')}</span><span>VISUAL STORIES, BRANDS & EXPLORATIONS</span></div>
   <div className="nm-archive-intro"><h1>THE<br/><em>WORK.</em></h1><div><span className="nm-kicker">AN EVER-GROWING ARCHIVE</span><p>The ones worth showing. Built for brands, people, products and the pleasure of making something feel different.</p><a href="https://www.behance.net/nafis24" target="_blank" rel="noopener noreferrer" className="nm-underline-link">BEHANCE ARCHIVE <ArrowUpRight size={17}/></a></div></div>
  </header>
  <Suspense fallback={<p>Loading selected work…</p>}><WorkExplorer items={items}/></Suspense>
  <div className="nm-archive-end"><span>END OF THE INDEX / NOT THE IDEAS</span><Link href="/contact">YOUR PROJECT COULD BE NEXT <ArrowUpRight size={19}/></Link></div>
 </section>;
}
