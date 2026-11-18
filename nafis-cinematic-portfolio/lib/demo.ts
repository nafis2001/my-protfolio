import type {Project, Service, Media} from './types';

// Curated artwork sourced from the portfolio owner's connected Google Drive.
// The images are real design exports. No campaign performance outcomes are asserted.
const assetRoot='https://raw.githubusercontent.com/nafis2001/my-protfolio/main/nafis-cinematic-portfolio/public/portfolio/';
const asset=(name:string)=>assetRoot+name;
const media=(name:string,alt:string):Media=>({url:asset(name),alt,type:'image'});

const base={
 id:'',year:2026,role:'Creative visual design',tools:['Adobe Photoshop','Adobe Illustrator'],
 duration:'Selected design work',deliverables:['Campaign artwork','Creative direction'],
 cover_image:null,gallery:[] as Media[],body_blocks:[],
 challenge:'Create an engaging visual direction while respecting the visual identity of the brand.',
 approach:'Develop visual storytelling, product hierarchy, color, and intentional composition.',
 solution:'Deliver refined design artwork for the intended brand touchpoints.',
 results:'Selected portfolio artwork; no reach, sales or performance results have been provided.',
 featured:true,sort_order:0,status:'published' as const,published_at:null,
 seo_title:null,seo_description:null,concept:false
};

export const demoProjects:Project[]=[
 {...base,id:'work-borno',slug:'borno-bazar-storytelling',title:'Borno Bazar — Pickle Campaigns',
  summary:'Food advertising artwork blending traditional flavor, product focus and visual storytelling.',
  category:'Social campaigns',tags:['FMCG','Food photography','Art direction'],client:'Borno Bazar',sort_order:1,
  role:'Social media campaign design',cover_image:asset('borno-bazar-main.png'),
  gallery:[media('borno-bazar-story-02.png','Borno Bazar alternate food campaign artwork'),media('borno-bazar-story-03.png','Borno Bazar visual advertising design')],
  deliverables:['Social media ad creatives','Food-focused compositions','Campaign variations'],
  challenge:'Make traditional packaged food feel visually inviting and distinctive on social platforms.',
  approach:'Use ingredient-led scenes, food photography and clear product placement to build appetizing campaign visuals.',
  solution:'A selection of Borno Bazar pickle creatives using the brand packaging and culturally relevant food imagery.'
 },
 {...base,id:'work-yaqeen',slug:'yaqeen-sweets-identity',title:'Yaqeen Sweets — Black & Gold Identity',
  summary:'An elegant identity and packaging presentation developed around black, gold and refined ornament.',
  category:'Brand identity',tags:['Brand identity','Packaging','Typography'],client:'Yaqeen Sweets',sort_order:2,
  role:'Brand identity exploration',cover_image:asset('yaqeen-brand-cover.png'),
  gallery:[media('yaqeen-packaging-family.png','Yaqeen Sweets packaging family presentation'),media('yaqeen-social-stories.png','Yaqeen Sweets social story branding explorations')],
  deliverables:['Wordmark and ornament studies','Packaging family','Brand presentation'],
  challenge:'Explore a memorable confectionery identity with a sophisticated heritage-inspired expression.',
  approach:'Apply restrained gold detailing, typographic hierarchy and consistent visual ornaments across touchpoints.',
  solution:'A cohesive black-and-gold identity presentation with packaging and social applications.'
 },
 {...base,id:'work-nongor',slug:'nongor-food-campaign',title:'Nongor Food — Stories of Flavor',
  summary:'A selection of expressive food creatives for familiar snacks and everyday moments.',
  category:'Social campaigns',tags:['Food','FMCG','Social design'],client:'Nongor Food',sort_order:3,
  role:'Social campaign design',cover_image:asset('nongor-campaign-main.png'),
  gallery:[media('nongor-campaign-02.png','Nongor Food original social media creative'),media('nongor-campaign-03.png','Nongor Food second campaign artwork')],
  deliverables:['Campaign key visuals','Product compositions','Social artwork'],
  challenge:'Show everyday snacks in energetic, instantly recognizable advertising compositions.',
  approach:'Combine bold Bengali graphic hierarchy, real product imagery and playful visual direction.',
  solution:'A range of Nongor Food visual designs with distinct compositions and prominent packaging.'
 },
 {...base,id:'work-bikkhato',slug:'bikkhato-khejur-rosh-packaging',title:'BIKKHATO 64 — Khejur Rosh Packaging',
  summary:'A family of date palm sap packaging concepts with expressive green, natural and regional cues.',
  category:'Packaging',tags:['Packaging design','Label system','FMCG'],client:'BIKKHATO 64',sort_order:4,
  role:'Label and packaging design',cover_image:asset('bikkhato-mockup.png'),
  gallery:[media('bikkhato-label-graphic.png','BIKKHATO 64 date palm sap label design')],
  deliverables:['Product label directions','Bottle mockups','Packaging artwork'],
  challenge:'Develop a recognizable visual direction for traditional date palm sap packaging.',
  approach:'Explore botanical motifs, strong shelf readability and a consistent bottle-label structure.',
  solution:'An illustrated bottle-label family with several differentiated green packaging variations.'
 },
 {...base,id:'work-aone',slug:'a-one-menu-design',title:'A One Food — Menu Editorial',
  summary:'A bright, food-led menu cover study with a recognizable pink-and-white identity.',
  category:'Print & editorial',tags:['Menu design','Food','Editorial'],client:'A One Food',sort_order:5,
  role:'Menu layout and cover design',cover_image:asset('a-one-menu-cover.jpg'),
  gallery:[],
  deliverables:['Menu cover composition','Brand application','Editorial layout'],
  challenge:'Organize a varied food offering into an inviting printed menu presentation.',
  approach:'Use real food imagery, curved editorial shapes and strong brand recognition.',
  solution:'A menu cover design exploration; the displayed version may differ from the latest approved production copy.'
 },
 {...base,id:'work-makeup',slug:'makeup-chari-beauty',title:'Makeup Chari — Summer Sale',
  summary:'Seasonal skincare advertising with delicate botanical elements and an airy beauty palette.',
  category:'Art direction',tags:['Beauty','Skincare','Campaign'],client:'Makeup Chari',sort_order:6,
  role:'Beauty campaign visual design',cover_image:asset('makeup-chari-summer.png'),
  gallery:[],deliverables:['Seasonal campaign creative','Product layout','Visual art direction'],
  challenge:'Present seasonal beauty products with an inviting, readable offer.',
  approach:'Balance sun-inspired typography, floral details and a clean product display.',
  solution:'A colorful seasonal skincare banner composition with a soft, premium visual atmosphere.'
 },
 {...base,id:'work-naviforce',slug:'naviforce-campaign',title:'NAVIFORCE — Visual Mnemonic',
  summary:'Expressive promotional lettering connecting a wristwatch campaign with a motorcycle dream.',
  category:'Campaign design',tags:['Advertising','Lettering','Mnemonic'],client:'NAVIFORCE',sort_order:7,
  role:'Campaign mnemonic design',cover_image:asset('naviforce-mnemonic.png'),
  gallery:[media('naviforce-mnemonic-02.png','NAVIFORCE visual mnemonic variation')],
  deliverables:['Visual mnemonic','Promotion lettering','Campaign variations'],
  challenge:'Make a watch-and-motorcycle promotion immediately recognizable in a single graphic.',
  approach:'Merge a bold typographic message with a motorcycle illustration and high-contrast campaign colors.',
  solution:'A legible, memorable promotional visual mnemonic with alternate refinements.'
 }
];

export const demoServices:Service[]=[
 {id:'s1',title:'Brand & Visual Identity',slug:'brand-identity',description:'Thoughtful identities that express what a business stands for.',deliverables:['Creative direction','Logo system','Brand guidelines'],turnaround:'Scope-dependent',starting_price:null,sort_order:1,published:true},
 {id:'s2',title:'Campaign & Social Design',slug:'campaign-design',description:'Scroll-stopping visuals built around a powerful idea.',deliverables:['Key visuals','Social systems','Ad adaptations'],turnaround:'Scope-dependent',starting_price:null,sort_order:2,published:true},
 {id:'s3',title:'Packaging & Editorial',slug:'packaging-editorial',description:'Physical and digital experiences with memorable craft.',deliverables:['Packaging concepts','Print-ready artwork','Editorial layouts'],turnaround:'Scope-dependent',starting_price:null,sort_order:3,published:true}
];
