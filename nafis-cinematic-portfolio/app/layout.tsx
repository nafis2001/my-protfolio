import type {Metadata,Viewport} from 'next';
import './globals.css';
import {Header,Footer,ScrollProgress} from '@/components/SiteShell';
import {siteUrl} from '@/lib/seo';

export const metadata:Metadata={
 metadataBase:new URL(siteUrl),
 title:{default:'Nafis Ibn Masud — Creative Visualizer & Graphic Designer',template:'%s | Nafis Ibn Masud'},
 description:'Selected graphic design, art direction, branding, packaging, advertising and motion work by Nafis Ibn Masud, based in Dhaka, Bangladesh.',
 applicationName:'NAFIS — Portfolio',
 authors:[{name:'Nafis Ibn Masud',url:'https://www.behance.net/nafis24'}],
 creator:'Nafis Ibn Masud',
 keywords:['Nafis Ibn Masud','Graphic Designer Bangladesh','Creative Visualizer','Brand Identity','Packaging Design','Social Media Design','Art Direction','Graphic Design Portfolio'],
 alternates:{canonical:'/'},
 robots:{index:true,follow:true},
 openGraph:{type:'website',url:siteUrl,title:'Nafis Ibn Masud — Creative Visualizer',description:'Curiosity, made visual. Explore selected brand identities, campaigns, packaging and motion design.',siteName:'NAFIS — Creative Visualizer',locale:'en_US',images:[{url:'/portfolio/nafis-portrait.jpg',width:1440,height:1440,alt:'Portrait of Nafis Ibn Masud, creative visualizer in Dhaka'}]},
 twitter:{card:'summary_large_image',title:'Nafis Ibn Masud — Creative Visualizer',description:'Curiosity, made visual.',images:['/portfolio/nafis-portrait.jpg']}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:[{media:'(prefers-color-scheme: dark)',color:'#07111f'},{media:'(prefers-color-scheme: light)',color:'#f6f9fb'}]};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" suppressHydrationWarning><body>
  <a className="skip" href="#main">Skip to content</a>
  <ScrollProgress/><Header/><main id="main">{children}</main><Footer/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Person',name:'Nafis Ibn Masud',url:siteUrl,image:siteUrl+'/portfolio/nafis-portrait.jpg',jobTitle:'Creative Visualizer & Graphic Designer',address:{'@type':'PostalAddress',addressLocality:'Dhaka',addressCountry:'BD'},sameAs:['https://www.behance.net/nafis24','https://www.linkedin.com/in/nafis1287/','https://www.instagram.com/nafisfreelancer/']}).replace(/</g,'\\u003c')}}/>
 </body></html>;
}
