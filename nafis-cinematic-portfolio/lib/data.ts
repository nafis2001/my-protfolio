import {demoProjects,demoServices} from './demo';
import {serverDb,configured} from './supabase';
import type {Project,Service,Testimonial} from './types';
export async function projects(includeDrafts=false):Promise<Project[]>{
 if(!configured)return demoProjects;
 const db=await serverDb(); if(!db)return [];
 let q=db.from('projects').select('*').order('sort_order',{ascending:true});
 if(!includeDrafts)q=q.eq('status','published').or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`);
 const {data,error}=await q;if(error){console.error('projects query failed',error.message);return []}
 return data as Project[];
}
export async function projectBySlug(slug:string){return (await projects()).find(p=>p.slug===slug)}
export async function services():Promise<Service[]>{
 if(!configured)return demoServices;
 const db=await serverDb();if(!db)return [];
 const {data,error}=await db.from('services').select('*').eq('published',true).order('sort_order');
 if(error){console.error('services query failed',error.message);return []}return data as Service[];
}
export async function testimonials():Promise<Testimonial[]>{
 if(!configured)return [];
 const db=await serverDb();if(!db)return [];
 const {data,error}=await db.from('testimonials').select('*').eq('published',true).order('sort_order');
 if(error){console.error('testimonials query failed',error.message);return []}return data as Testimonial[];
}
