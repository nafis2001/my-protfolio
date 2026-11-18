export type Media = {url:string;alt:string;type?:'image'|'video';caption?:string};
export type Block = {type:'paragraph'|'heading'|'quote'|'image';text?:string;url?:string;alt?:string};
export type Project = {
 id:string; title:string;slug:string;summary:string;category:string;tags:string[];client:string;year:number;
 role:string;tools:string[];duration:string;deliverables:string[];cover_image:string|null;
 gallery:Media[];body_blocks:Block[];challenge:string;approach:string;solution:string;results:string;
 featured:boolean;sort_order:number;status:'draft'|'published';published_at:string|null;
 seo_title:string|null;seo_description:string|null;created_at?:string;updated_at?:string;concept?:boolean;
};
export type Service={id:string;title:string;slug:string;description:string;deliverables:string[];turnaround:string;starting_price:string|null;sort_order:number;published:boolean};
export type Testimonial={id:string;quote:string;author:string;role:string;company:string;published:boolean;sort_order:number};
