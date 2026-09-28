import { LLMS_HEAD } from '../data/llms-preamble';
import { pagesPrincipales, url, oneLine } from '../data/llms-derive';
import { getSiteInfo, getServices, getBlogPosts } from '../data/content';

// Derive au build : ne jamais recopier ici une valeur du contenu (cf. llms-derive.ts).
export async function GET() {
  const info = getSiteInfo();
  const services = getServices()
    .map((s) => `- [${s.title}](${url('/#services')}): ${oneLine(s.description)}`)
    .join('\n');
  // Meme helper que les pages /blog/ et /blog/[slug]/.
  const articles = getBlogPosts()
    .map((p) => `- [${p.title}](${url(`/blog/${p.slug}/`)}): ${oneLine(p.description)}`)
    .join('\n');

  const body = `${LLMS_HEAD}## Pages

${pagesPrincipales()}

## Articles du blog

${articles}

## Services proposés

${services}

## Informations pratiques

- Téléphone : ${info.phone}
- E-mail : ${info.email}
- Ville : ${info.city}, ${info.region}
- Zone d'intervention : ${info.areaServed}
${info.availabilityNote ? `- Disponibilité : ${info.availabilityNote}\n` : ''}${info.calUrl ? `- Rendez-vous découverte : https://app.cal.eu/${info.calUrl}\n` : ''}${info.linkedin ? `- LinkedIn : ${info.linkedin}\n` : ''}`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
