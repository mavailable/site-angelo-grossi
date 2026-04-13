/**
 * Technical business data — NOT editable via CMS
 * For editable content, see src/content/ (managed via /admin)
 */

// Locale config (used by BaseLayout, astro.config, Schema.org)
export const locale = {
  lang: 'fr',
  country: 'FR',
  localeCode: 'fr-FR',
} as const;

// Legal info (not client-editable)
export const legal = {
  siret: '', // À compléter — en attente du client
  rcs: '',
  tva: '',
} as const;

// Geo coordinates — Non applicable (pas d'adresse physique publique)
export const geo = {
  lat: 0,
  lon: 0,
} as const;

// ============================================================
// Business metadata — fallbacks immuables (doctrine wf-00-cms §7, C1 SEO)
// Le client edite name/phone/email via /admin (src/content/site-info/).
// business.ts expose les champs non editables client + fallbacks.
// ============================================================

export const business = {
  owner: 'Angelo Grossi',
  phone: '+33769389281', // preserve du schema hardcode pre-C1
  schemaType: 'ProfessionalService',
} as const;

// ============================================================
// Data SEO technique (non editable par le client — doctrine wf-00-cms §7)
// Extrait de SchemaOrg.astro pre-C1 pour centralisation dans schemas.ts.
// ============================================================

export const schemaData = {
  // ProfessionalService (Coach)
  businessName: 'Angelo Grossi — Coach prise de parole en public',
  businessDescription:
    'Coach certifié RNCP 7 en prise de parole en public en Île-de-France. Approche unique combinant coaching professionnel et improvisation théâtrale pour aider dirigeants et experts à incarner leur parole.',
  priceRange: '€€',

  // Founder (Angelo)
  founderJobTitle: 'Coach certifié en prise de parole en public',
  founderDescription:
    'Ancien cadre marketing (25 ans chez Siemens, Unify, Atos), comédien improvisateur depuis 15 ans, coach certifié RNCP 7. Créateur de la méthode ThéâtroCoaching.',
  founderKnowsAbout: [
    'Prise de parole en public',
    'Coaching de dirigeants',
    'Improvisation théâtrale',
    'Communication non-verbale',
    'Présence scénique',
  ],
  founderCredential: {
    category: 'certification',
    name: 'Coach consultant certifié RNCP 7',
    level: 'Master / MBA',
    recognizedBy: 'LINKUP COACHING',
  },

  // areaServed (Île-de-France + France)
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Île-de-France' },
    { '@type': 'Country', name: 'France' },
  ],

  // Address (pas d'adresse physique publique, juste region + country)
  address: {
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },

  // WebSite
  websiteName: 'Angelo Grossi — Coach prise de parole en public',
  websiteDescription:
    'Coach certifié RNCP 7 en prise de parole en public en Île-de-France. Approche unique mêlant coaching et improvisation théâtrale. RDV découverte gratuit.',
} as const;

// Web3Forms API key — cascade: CMS content → env var → cle Marc (defaut agence)
const WEB3FORMS_DEFAULT = '9667fcf8-c7da-4b7a-8432-0ec25215c75e';
export const web3formsDefault = WEB3FORMS_DEFAULT;
export const web3formsKey = import.meta.env.WEB3FORMS_KEY || WEB3FORMS_DEFAULT;
