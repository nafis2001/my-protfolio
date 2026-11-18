import {isOwner} from '@/lib/supabase';
import {redirect} from 'next/navigation';
import {AdminNav} from '@/components/AdminNav';
export const dynamic='force-dynamic';
export default async function AdminLayout({children}:{children:React.ReactNode}){const owner=await isOwner();return <div className="container section">{owner?<div className="admin-layout"><AdminNav/><div>{children}</div></div>:<div className="panel" style={{maxWidth:600,margin:'auto'}}><h1 style={{fontSize:50}}>Private studio.</h1><p>The dashboard is restricted to the verified site owner.</p>{children}</div>}</div>}
