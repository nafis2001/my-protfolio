import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata:import('next').Metadata=makeMetadata('Creative Process','A thoughtful creative process for design, branding and visual storytelling projects.','/process');
const steps=[
 ['Listen & discover','We get clear on your goals, audience, deliverables and what really needs to be communicated.'],
 ['Research & explore','I look for visual opportunities, test ideas and build a direction that feels right for your brand.'],
 ['Create & refine','We develop the strongest direction through typography, composition, imagery and considered details.'],
 ['Review together','You review the proposed work and we refine it with feedback tied to the agreed scope.'],
 ['Prepare & deliver','Final assets are organized for the platforms, formats and practical needs of the project.']
];
export default function Process(){return <div className="container section process-page">
 <div className="page-intro"><span className="eyebrow">THE METHOD BEHIND THE WORK</span><h1>Curiosity with<br/><em>a process.</em></h1><p>Good design takes a little exploration and a lot of attention. Here’s how I prefer to move from the first conversation to the final file.</p></div>
 <div className="process-timeline">{steps.map(([title,body],i)=><div className="process-step" key={title}><span className="process-step-num">{String(i+1).padStart(2,'0')}</span><h2>{title}</h2><p>{body}</p></div>)}</div>
 <div className="process-next"><div><span className="eyebrow">EVERY COLLABORATION IS DIFFERENT</span><h2>Let's find a way<br/><em>to work together.</em></h2></div><Link className="btn primary" href="/contact">Start a project <ArrowUpRight size={17}/></Link></div>
 </div>}
