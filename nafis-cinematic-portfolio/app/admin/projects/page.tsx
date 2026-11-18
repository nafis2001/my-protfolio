import Link from 'next/link';
import {isOwner,serverDb} from '@/lib/supabase';
import {AdminProjects} from '@/components/AdminProjects';
export default async function AdminProjectPage(){if(!await isOwner())return <Link href="/admin/login">Sign in to manage projects</Link>;const db=await serverDb();const {data,error}=await db!.from('projects').select('*').order('created_at',{ascending:false});if(error)return <p className="error">Unable to load projects: {error.message}</p>;return <AdminProjects items={data||[]}/>}
