import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/seo';
import {projects} from '@/lib/data';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const paths=['','/work','/about','/services','/process','/contact','/resume','/privacy'];
 const entries=paths.map(path=>({url:siteUrl+path,changeFrequency:'monthly' as const,priority:path===''?1:0.6}));
 const cases=(await projects()).map(p=>({url:siteUrl+'/work/'+p.slug,changeFrequency:'monthly' as const,priority:0.7}));
 return [...entries,...cases];
}
