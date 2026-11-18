import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {adminDb} from '@/lib/supabase';
const schema=z.object({name:z.string().trim().min(2).max(120),email:z.string().trim().email().max(254),project_type:z.string().min(2).max(100),budget:z.string().max(100).optional(),timeline:z.string().max(100).optional(),project_link:z.union([z.literal(''),z.string().url().max(500)]).optional(),message:z.string().trim().min(20).max(5000),consent:z.literal('yes'),website:z.string().optional()});
export async function POST(req:NextRequest){try{
 const raw=await req.json();const parsed=schema.safeParse(raw);if(!parsed.success)return NextResponse.json({error:'Please check the required fields.'},{status:400});
 const d=parsed.data;if(d.website)return NextResponse.json({ok:true});
 const ip=(req.headers.get('x-forwarded-for')||'anonymous').split(',')[0].trim();
 const db=adminDb();
 // Atomic PostgreSQL function prevents parallel-request rate-limit bypass.
 const {data:allowed,error:limitError}=await db.rpc('check_contact_rate_limit',{request_ip:ip});
 if(limitError)throw new Error('Rate limiter unavailable');
 if(!allowed)return NextResponse.json({error:'Too many enquiries. Please try again later.'},{status:429});
 const {error}=await db.from('contact_submissions').insert({name:d.name,email:d.email,project_type:d.project_type,budget:d.budget||null,timeline:d.timeline||null,project_link:d.project_link||null,message:d.message,consent:true});
 if(error)throw error;
 const key=process.env.RESEND_API_KEY,from=process.env.CONTACT_FROM_EMAIL,to=process.env.CONTACT_OWNER_EMAIL;
 if(key&&from&&to){
  const escaped=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],subject:'New portfolio enquiry',html:`<p>New enquiry from ${escaped(d.name)} (${escaped(d.email)})</p><p>Project: ${escaped(d.project_type)}</p><p>${escaped(d.message)}</p>`})});
  if(!response.ok)console.error('Owner email failed',response.status);
  const confirmation=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[d.email],subject:'Your enquiry has been received',html:`<p>Hi ${escaped(d.name)},</p><p>Thanks for reaching out. Your project enquiry has been received.</p><p>— Nafis</p>`})});if(!confirmation.ok)console.error('Confirmation email failed',confirmation.status);
 }
 return NextResponse.json({ok:true});
 }catch(err){console.error('Contact route failed',err);return NextResponse.json({error:'Unable to submit right now. Please try again shortly.'},{status:503})}}
