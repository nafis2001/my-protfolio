import {Suspense} from 'react';
import {projects} from '@/lib/data';
import {WorkExplorer} from '@/components/WorkExplorer';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata:import('next').Metadata=makeMetadata('Work — Selected Projects','Explore brand identity, campaign design, packaging, and editorial projects by Nafis Ibn Masud.','/work');
export default async function Work(){const items=await projects();return <section className="container section"><div className="page-intro"><span className="eyebrow">An archive of curious ideas</span><h1>Selected <span style={{color:'var(--accent)'}}>work.</span></h1><p>A collection of visual thinking across different mediums. Entries tagged “Editorial demo” are examples awaiting verified portfolio assets.</p></div><Suspense fallback={<div className="panel">Loading project filters…</div>}><WorkExplorer items={items}/></Suspense></section>}
