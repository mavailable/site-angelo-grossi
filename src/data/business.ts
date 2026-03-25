/**
 * Technical business data — NOT editable via Keystatic
 * For editable content, see src/content/ (managed via Keystatic)
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
