import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'cloud' },
  cloud: { project: 'angelo-grossi/site-angelo-grossi' },

  singletons: {
    siteInfo: singleton({
      label: 'Informations générales',
      path: 'src/content/site-info/index',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Nom commercial' }),
        phone: fields.text({ label: 'Téléphone' }),
        email: fields.text({ label: 'Email' }),
        city: fields.text({ label: 'Ville' }),
        region: fields.text({ label: 'Région' }),
        linkedin: fields.text({ label: 'URL LinkedIn' }),
        siteUrl: fields.text({ label: 'URL du site' }),
        calUrl: fields.text({ label: 'URL Cal.com (ex: marc-muller/15min)' }),
      },
    }),
    hero: singleton({
      label: 'Section Hero',
      path: 'src/content/hero/index',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titre H1' }),
        subtitle: fields.text({ label: 'Sous-titre', multiline: true }),
        ctaText: fields.text({ label: 'Texte bouton CTA' }),
        ctaLink: fields.text({ label: 'Lien CTA' }),
        ctaSecondaryText: fields.text({ label: 'Texte CTA secondaire' }),
        ctaSecondaryLink: fields.text({ label: 'Lien CTA secondaire' }),
        reassurance: fields.text({ label: 'Texte de réassurance' }),
      },
    }),
    about: singleton({
      label: 'Section À propos',
      path: 'src/content/about/index',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Surtitre' }),
        title: fields.text({ label: 'Titre de section' }),
        paragraphs: fields.array(
          fields.text({ label: 'Paragraphe', multiline: true }),
          { label: 'Paragraphes', itemLabel: (props) => props.value || 'Paragraphe' }
        ),
      },
    }),
    contact: singleton({
      label: 'Section Contact',
      path: 'src/content/contact/index',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Surtitre' }),
        title: fields.text({ label: 'Titre' }),
        subtitle: fields.text({ label: 'Sous-titre', multiline: true }),
        ctaCalText: fields.text({ label: 'Texte bouton Cal.com' }),
        ctaCalLink: fields.text({ label: 'Lien Cal.com (ex: marc-muller/15min)' }),
        submitText: fields.text({ label: 'Texte bouton formulaire' }),
        rgpdText: fields.text({ label: 'Mention RGPD', multiline: true }),
      },
    }),
  },

  collections: {
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre du service' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: "Ordre d'affichage", defaultValue: 0 }),
      },
    }),
    testimonials: collection({
      label: 'Témoignages',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nom' } }),
        role: fields.text({ label: 'Fonction / Contexte' }),
        quote: fields.text({ label: 'Citation', multiline: true }),
        order: fields.integer({ label: "Ordre d'affichage", defaultValue: 0 }),
      },
    }),
    faq: collection({
      label: 'FAQ',
      slugField: 'question',
      path: 'src/content/faq/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({ label: 'Réponse', multiline: true }),
        order: fields.integer({ label: "Ordre d'affichage", defaultValue: 0 }),
      },
    }),
  },
});
