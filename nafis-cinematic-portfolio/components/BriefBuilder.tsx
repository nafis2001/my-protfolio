'use client';
import {useState} from 'react';
import {ArrowUpRight, Check, Copy, ClipboardCheck} from 'lucide-react';

const services=['Brand identity','Campaign / social design','Packaging design','Editorial / print','Motion graphics / video','Something else'];
export function BriefBuilder({initialService='',email=''}:{initialService?:string;email?:string}){
 const [name,setName]=useState('');
 const [service,setService]=useState(services.includes(initialService)?initialService:'');
 const [timeline,setTimeline]=useState('');
 const [message,setMessage]=useState('');
 const [copied,setCopied]=useState(false);
 const [error,setError]=useState('');
 const brief=[
 'Hello Nafis,',
 '',
 name.trim()?'My name is '+name.trim()+'.':'I would like to discuss a creative project.',
 'Project: '+(service||'To be discussed'),
 timeline.trim()?'Timeline: '+timeline.trim():'',
 'Idea / details: '+(message.trim()||'I would like to share more details with you.'),
 '',
 'Looking forward to talking.'
 ].filter(Boolean).join('\n');
 async function copyBrief(){
  try{
   await navigator.clipboard.writeText(brief);
   setCopied(true);setError('');
  }catch{
   setError('Copy was blocked by your browser. Please select and copy the brief below instead.');
  }
 }
 return <div className="brief-builder">
  <div className="brief-grid">
   <label className="field"><span>Your name (optional)</span><input className="input" autoComplete="name" placeholder="How should I address you?" value={name} maxLength={90} onChange={e=>{setName(e.target.value);setCopied(false)}}/></label>
   <label className="field"><span>What are you working on?</span><select className="select" value={service} onChange={e=>{setService(e.target.value);setCopied(false)}}><option value="">Choose a project type</option>{services.map(s=><option key={s} value={s}>{s}</option>)}</select></label>
   <label className="field full"><span>Rough timeline (optional)</span><input className="input" placeholder="A date, a month, or 'still exploring'" value={timeline} maxLength={90} onChange={e=>{setTimeline(e.target.value);setCopied(false)}}/></label>
   <label className="field full"><span>Tell me a little about the idea</span><textarea className="textarea" rows={5} placeholder="What are you making? Who is it for? What should it feel like?" value={message} maxLength={1500} onChange={e=>{setMessage(e.target.value);setCopied(false)}}/></label>
  </div>
  <div className="brief-actions"><button className="btn primary" type="button" onClick={copyBrief}>{copied?<><Check size={17}/> Brief copied</>:<><Copy size={17}/> Copy project brief</>}</button>
  {email?<a className="btn" href={'mailto:'+email+'?subject='+encodeURIComponent('Project enquiry for Nafis')+'&body='+encodeURIComponent(brief)}>Open email <ArrowUpRight size={16}/></a>:<a className="btn" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nafis1287/">Continue on LinkedIn <ArrowUpRight size={16}/></a>}</div>
  <div role="status" aria-live="polite" className="brief-status">{error|| (copied?'Copied. Open LinkedIn or Instagram, then paste your brief into a message.':'Nothing is submitted to this website. Copy the brief and send it using a channel on the right.')}</div>
  <details className="brief-preview"><summary><ClipboardCheck size={16}/> Preview what you will copy</summary><pre>{brief}</pre></details>
 </div>;
}
