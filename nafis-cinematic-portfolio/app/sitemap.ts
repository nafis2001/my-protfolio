import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/seo';
import {projects} from '@/lib/data';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const paths=['','/work','/about','/services','/process','/testimonials','/contact','/resume','/privacy'];return [...paths.map(p=>({url:siteUrl+p,changeFrequency:'monthly' as const,priority:p===''?1:0.6})),...(await projects()).map(p=>({url:siteUrl+'/work/'+p.slug,changeFrequency:'monthly' as const,priority:0.7}))]}
