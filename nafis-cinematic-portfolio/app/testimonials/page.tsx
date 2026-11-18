import {testimonials} from '@/lib/data';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata:import('next').Metadata=makeMetadata('Testimonials','Feedback from collaborators.','/testimonials');
export default async function Testimonials(){const ts=await testimonials();return <div className="container section"><div className="page-intro"><span className="eyebrow">People & perspectives</span><h1>Kind words.</h1></div>{ts.length?<div className="service-grid">{ts.map(t=><blockquote key={t.id} className="panel"><h3>“{t.quote}”</h3><p>{t.author} · {t.role} at {t.company}</p></blockquote>)}</div>:<div className="panel"><p>Verified testimonials will be published here with permission. No fictional endorsements.</p></div>}</div>}
