import type {Metadata} from 'next';
export const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
export function metadata(title:string,description:string,path=''):Metadata{
 const canonical=new URL(path||'/',siteUrl).toString();
 return {title,description,alternates:{canonical},openGraph:{type:'website',title,description,url:canonical,siteName:'Nafis Ibn Masud — Portfolio'},twitter:{card:'summary_large_image',title,description}};
}
