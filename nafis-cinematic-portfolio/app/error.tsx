'use client';
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <div className="container section" role="alert"><h1>Something went wrong.</h1><p>We couldn't load this view. Please try again.</p><button className="btn primary" onClick={reset}>Try again</button></div>}
