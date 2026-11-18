import {createServerClient} from '@supabase/ssr';
import {createClient} from '@supabase/supabase-js';
import {cookies} from 'next/headers';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const configured=Boolean(url&&anon);
export async function serverDb(){
 if(!url||!anon) return null;
 const jar=await cookies();
 return createServerClient(url,anon,{cookies:{getAll(){return jar.getAll()},setAll(values){try{values.forEach(({name,value,options})=>jar.set(name,value,options))}catch{ /* render-only cookie context */ }}}});
}
export function adminDb(){
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key) throw new Error('Supabase service configuration missing');
 return createClient(url,key,{auth:{persistSession:false}});
}
export async function isOwner(){
 const db=await serverDb();if(!db)return false;
 const {data:{user},error}=await db.auth.getUser();if(error||!user)return false;
 const {data}=await db.from('owner_roles').select('user_id').eq('user_id',user.id).maybeSingle();
 return Boolean(data);
}
