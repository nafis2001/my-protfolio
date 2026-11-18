import Link from 'next/link';
export function AdminNav(){return <nav aria-label="Admin navigation" className="admin-nav"><span className="eyebrow">Workspace</span>{[['/admin','Overview'],['/admin/projects','Projects'],['/admin/settings','Settings'],['/admin/inbox','Inbox']].map(([url,label])=><Link href={url} key={url}>{label} ↗</Link>)}<Link href="/work">View public site ↗</Link></nav>}
