// src/data/seo.ts — SEO éditable par le client, page par page.
// Source unique : src/content/seo/index.json, écrit par l'écran « SEO » (#/seo)
// du panel /admin. Doctrine : wf-00-cms §7bis.
//
// Les titres sont stockés ENTIERS et rendus tels quels — pas de recomposition
// « titre + séparateur + nom du site » : le titre d'accueil place déjà
// « Angelo Grossi » en tête, la recomposer le dupliquerait. Le champ « Titre »
// du panel = exactement ce qui s'affiche dans l'onglet du navigateur.
//
// Un champ VIDE retombe sur la valeur passée par la page : les articles de blog
// (pages dynamiques) gardent donc leur SEO dérivé du contenu de l'article.
import fs from 'node:fs';
import path from 'node:path';

export interface PageSeo {
  title: string;
  description: string;
  ogImage: string;
  noindex: boolean;
}
export interface SeoGlobal {
  siteName: string;
  separator: string;
  defaultOgImage: string;
}
interface SeoData {
  global?: Partial<SeoGlobal>;
  pages?: Record<string, Partial<PageSeo>>;
}

let cache: SeoData | null | undefined;

function loadSeo(): SeoData | null {
  if (cache !== undefined) return cache;
  try {
    const p = path.join(process.cwd(), 'src', 'content', 'seo', 'index.json');
    cache = JSON.parse(fs.readFileSync(p, 'utf-8')) as SeoData;
  } catch {
    cache = null;
  }
  return cache;
}

/** SEO déclaré pour une route, ou null si la route n'est pas dans seo.json. */
export function getPageSeo(routePath: string): PageSeo | null {
  const data = loadSeo();
  if (!data?.pages) return null;
  const key = routePath === '/' ? '/' : routePath.replace(/\/$/, '');
  const page = data.pages[key];
  if (!page) return null;
  return {
    title: page.title ?? '',
    description: page.description ?? '',
    ogImage: page.ogImage ?? '',
    noindex: page.noindex === true,
  };
}

/** Réglages globaux SEO (image de partage par défaut). */
export function getSeoGlobal(): SeoGlobal | null {
  const data = loadSeo();
  if (!data?.global) return null;
  return {
    siteName: data.global.siteName ?? '',
    separator: data.global.separator ?? '',
    defaultOgImage: data.global.defaultOgImage ?? '',
  };
}
