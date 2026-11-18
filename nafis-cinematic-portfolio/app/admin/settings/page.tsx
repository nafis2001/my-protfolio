import Link from 'next/link';
import {isOwner,serverDb} from '@/lib/supabase';
import {AdminSettings} from '@/components/AdminSettings';
export default async function Settings(){if(!await isOwner())return <Link href="/admin/login">Sign in</Link>;const db=await serverDb();const {data,error}=await db!.from('site_settings').select('*').eq('id',1).single();if(error)return <p className="error">Settings unavailable: {error.message}</p>;return <><span className="eyebrow">Edit without code</span><h1 style={{fontSize:65}}>Settings.</h1><AdminSettings initial={data}/></>}
