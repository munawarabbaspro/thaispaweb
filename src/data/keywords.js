// Keyword targeting map. ONE page owns each keyword.
// Rules for whoever writes the pages:
//  - Use `primary` in the <title>, the <h1> and the first 100 words.
//  - Weave 3-6 of `secondary` into real sentences. Never list them.
//  - If a keyword cannot sit in a sentence a person would write, skip it.
//  - Never add a keyword from `doNotTarget` anywhere on the site.

export const keywordMap = {
  '/': {
    primary: 'massage in bahria town phase 4',
    secondary: [
      'massage center in bahria town', 'spa in bahria town phase 4',
      'best spa in bahria town phase 4', 'thai spa bahria town phase 4',
      'best massage centre rawalpindi', 'massage centre bahria town civic center',
      'spa centre near me with price', 'massage near me open now',
    ],
  },
  '/prices': {
    primary: 'massage price in bahria town',
    secondary: [
      'full body massage islamabad price list', 'thai massage islamabad price list',
      'spa in bahria town phase 4 price', 'massage rate list islamabad',
      '30 minute massage price islamabad', 'how much is a massage in islamabad',
    ],
  },
  '/services/thai-massage':        { primary: 'thai massage islamabad',          secondary: ['thai massage islamabad price list','traditional thai massage islamabad','thai massage bahria town','best thai massage islamabad'] },
  '/services/deep-tissue-massage': { primary: 'deep tissue massage islamabad',   secondary: ['deep tissue massage near me prices','deep tissue massage bahria town','deep tissue massage for knots','deep tissue vs swedish massage'] },
  '/services/swedish-massage':     { primary: 'swedish massage islamabad',       secondary: ['relaxing massage islamabad','first time massage islamabad','swedish massage bahria town'] },
  '/services/aromatherapy-massage':{ primary: 'aromatherapy massage islamabad',  secondary: ['aroma massage bahria town','massage for stress islamabad','essential oil massage islamabad'] },
  '/services/hot-stone-massage':   { primary: 'hot stone massage islamabad',     secondary: ['hot stone massage bahria town','hot stone massage benefits','warm stone massage bahria town'] },
  '/services/sports-massage':      { primary: 'sports massage islamabad',        secondary: ['post workout massage islamabad','massage for tight hamstrings','sports massage bahria town'] },
  '/services/full-body-massage':   { primary: 'full body massage islamabad',     secondary: ['full body massage islamabad price list','full body massage bahria town','body massage islamabad'] },
  '/services/head-shoulder-massage':{primary: 'head and shoulder massage bahria town', secondary: ['head massage islamabad','neck and shoulder massage bahria town','massage for headache islamabad'] },
  '/services/back-neck-massage':   { primary: 'back and neck massage bahria town', secondary: ['back massage islamabad','massage for back pain islamabad','massage for stiff neck'] },
  '/services/foot-massage':        { primary: 'foot massage bahria town',        secondary: ['foot massage islamabad','foot reflexology islamabad','tired legs massage islamabad'] },
  '/contact': {
    primary: 'massage centre civic center bahria town',
    secondary: ['massage near anarkali hotel bahria town', 'spa in bahria town phase 4 open now'],
  },
};

// Never use these. In this market they read as sexual services, not therapeutic
// massage. They would bring the wrong enquiries and damage the brand with the
// clients who actually pay for repeat therapeutic work.
export const doNotTarget = [
  'body to body massage', 'full body to body massage', 'massage home service',
  'massage near me for men', 'thai staff massage', 'massage roomy', 'b2b massage',
];

// Switch on ONLY when a DPT-qualified physiotherapist is on staff and can be
// named with their qualification on the About page.
export const physiotherapy = {
  enabled: false,
  primary: 'physiotherapy in bahria town rawalpindi',
  secondary: [
    'physiotherapist in bahria town', 'physiotherapist in bahria town phase 7',
    'physiotherapist in bahria town phase 8 rawalpindi', 'physiotherapy bahria town islamabad',
    'best physiotherapist islamabad', 'physiotherapy clinic bahria town',
    'sports injury physiotherapy islamabad', 'back pain physiotherapist islamabad',
  ],
};
