import { LLMS_FULL_HEAD, LLMS_FULL_TAIL } from '../data/llms-preamble';
import { pagesPrincipales, plain, url } from '../data/llms-derive';
import {
  getSiteInfo, getServices, getAbout, getFaq, getMethodeH2S, getTestimonials, getInterventions, getBlogPosts,
} from '../data/content';

// Derive au build : ne jamais recopier ici une valeur du contenu (cf. llms-derive.ts).
const para = (s: string) => plain(s).split(/\n\s*\n/).map((x) => x.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n\n');

function excerpt(html: string, max = 1500): string {
  const t = plain(html).replace(/\s+/g, ' ');
  return t.length <= max ? t : `${t.slice(0, max).replace(/\s+\S*$/, '')}...`;
}

export async function GET() {
  const info = getSiteInfo();
  const about = getAbout();
  const methode = getMethodeH2S();

  // Memes filtres que les sections de la page d'accueil.
  const interventions = getInterventions()
    .filter((i) => (i.context && i.context.trim()) || (i.outcome && i.outcome.trim()))
    .map((i) => `- **${i.confidential ? i.sector || 'Client confidentiel' : i.client_name}** : ${plain([i.context, i.outcome].filter(Boolean).join(' '))}`)
    .join('\n');

  const body = `${LLMS_FULL_HEAD}## Informations générales

- **Nom** : ${info.name}
- **Ville** : ${info.city}, ${info.region}
- **Zone d'intervention** : ${info.areaServed}
- **Téléphone** : ${info.phone}
- **E-mail** : ${info.email}
${info.linkedin ? `- **LinkedIn** : ${info.linkedin}\n` : ''}- **Site web** : ${url('/')}
${info.calUrl ? `- **Réservation RDV découverte** : https://app.cal.eu/${info.calUrl}\n` : ''}${info.availabilityNote ? `- **Disponibilité** : ${info.availabilityNote}\n` : ''}
## Pages

${pagesPrincipales()}

## À propos

${about.paragraphs.map((p) => plain(p)).join('\n\n')}

## ${plain(methode.title)}

${para(methode.description)}

${methode.steps.map((s) => `- **${s.letter}, ${s.label}** : ${plain(s.text)}`).join('\n')}

## Services

${getServices().map((s) => `### ${s.title}\n\n${para(s.description)}`).join('\n\n')}
${interventions ? `\n## Interventions en entreprise\n\n${interventions}\n` : ''}
## Témoignages

${getTestimonials().map((t) => `- **${t.name}, ${plain(t.role)}** : "${plain(t.quote)}"`).join('\n')}

## FAQ

${getFaq().map((f) => `### ${f.question}\n\n${para(f.answer)}`).join('\n\n')}

## Articles du blog

${getBlogPosts().map((p) => `### ${p.title}\nURL: ${url(`/blog/${p.slug}/`)}\nDate: ${p.date}, Catégorie : ${p.category}\n\n${excerpt(p.content)}\n`).join('\n')}
${LLMS_FULL_TAIL}`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
