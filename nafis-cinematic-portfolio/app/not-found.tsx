import Link from 'next/link';
export default function NotFound(){return <div className="container section"><span className="eyebrow">Error 404</span><h1>Off the <span style={{color:'var(--accent)'}}>canvas.</span></h1><p>This page isn't part of the composition.</p><Link className="btn primary" href="/">Back home ↗</Link></div>}
