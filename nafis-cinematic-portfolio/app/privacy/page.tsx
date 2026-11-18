import Link from 'next/link';
import {metadata as makeMetadata} from '@/lib/seo';
export const metadata:import('next').Metadata=makeMetadata('Privacy','Privacy and data handling information for the Nafis Ibn Masud design portfolio.','/privacy');
export default function Privacy(){
 const enabled=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY&&process.env.SUPABASE_SERVICE_ROLE_KEY);
 return <div className="container section privacy-page">
  <div className="page-intro"><span className="eyebrow">PRIVACY / PLAIN & SIMPLE</span><h1>Trust is<br/><em>everything.</em></h1><p>Last updated: November 19, 2026</p></div>
  <div className="policy-content">
   <h2>What this website does</h2><p>This portfolio displays design work and offers ways to get in touch. It does not run advertising trackers by default.</p>
   <h2>Contact enquiries</h2>
   {enabled?<p>If you submit an enquiry through the contact form, the details you enter (including your name, email address, project information and message) are stored securely for the purpose of responding to your request. Technical rate-limit information may also be processed to prevent spam.</p>:<p>The on-site project brief builder does not send or save your answers. They stay in your browser until you choose to copy them. If you open LinkedIn, Behance, Instagram or an email application, the privacy practices of that service apply to the message you send there.</p>}
   <h2>Theme preferences</h2><p>The dark/light appearance setting is saved in local browser storage so your preferred theme can be used on a future visit.</p>
   <h2>Hosting and external links</h2><p>This website is hosted on Vercel. The site includes links to external profiles and uses image resources where required. Those services may process request data according to their own policies.</p>
   <h2>Your choices</h2><p>You can clear the site's stored theme preference in your browser. For questions regarding a message sent via a third-party platform, you can <Link href="/contact">contact me through my available channels</Link>.</p>
  </div>
 </div>;
}
