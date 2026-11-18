import Link from 'next/link';
import {isOwner,serverDb} from '@/lib/supabase';
import {AdminInbox} from '@/components/AdminInbox';
export default async function Inbox(){if(!await isOwner())return <Link href="/admin/login">Sign in</Link>;const db=await serverDb();const {data,error}=await db!.from('contact_submissions').select('*').order('created_at',{ascending:false}).limit(100);if(error)return <p className="error">Inbox unavailable: {error.message}</p>;return <><span className="eyebrow">Client conversations</span><h1 style={{fontSize:65}}>Inbox.</h1><AdminInbox entries={data||[]}/></>}
