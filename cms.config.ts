import type { CmsConfig } from './cms.types';

const cmsConfig: CmsConfig = {
  repo: 'mavailable/site-angelo-grossi',
  branch: 'dev',
  siteName: 'Angelo Grossi',

  singletons: {
    'site-info': {
      label: 'Informations generales',
      description: 'Nom, telephone, email, reseaux sociaux',
      path: 'src/content/site-info/index.json',
      fields: {
        name: { type: 'text', label: 'Nom commercial', required: true },
        phone: { type: 'text', label: 'Telephone' },
        email: { type: 'text', label: 'Email' },
        city: { type: 'text', label: 'Ville' },
        region: { type: 'text', label: 'Region' },
        linkedin: { type: 'text', label: 'URL LinkedIn' },
        siteUrl: { type: 'text', label: 'URL du site' },
        calUrl: { type: 'text', label: 'URL Cal.com (ex: angelogrossi/30min)' },
      },
    },

    hero: {
      label: 'Section Hero',
      description: "Titre, sous-titre et boutons d'appel a l'action",
      path: 'src/content/hero/index.json',
      fields: {
        title: { type: 'text', label: 'Titre H1', required: true },
        subtitle: { type: 'text', label: 'Sous-titre', multiline: true },
        ctaText: { type: 'text', label: 'Texte bouton CTA principal' },
        ctaLink: { type: 'text', label: 'Lien CTA principal' },
        ctaSecondaryText: { type: 'text', label: 'Texte CTA secondaire' },
        ctaSecondaryLink: { type: 'text', label: 'Lien CTA secondaire' },
        reassurance: { type: 'text', label: 'Texte de reassurance' },
      },
    },

    about: {
      label: 'A propos',
      description: 'Presentation du fondateur',
      path: 'src/content/about/index.json',
      fields: {
        eyebrow: { type: 'text', label: 'Surtitre' },
        title: { type: 'text', label: 'Titre de section' },
        paragraphs: {
          type: 'array',
          label: 'Paragraphes',
          itemLabel: 'value',
          item: { type: 'text', label: 'Paragraphe', multiline: true },
        },
      },
    },

    contact: {
      label: 'Section Contact',
      description: 'Formulaire et reservation',
      path: 'src/content/contact/index.json',
      fields: {
        eyebrow: { type: 'text', label: 'Surtitre' },
        title: { type: 'text', label: 'Titre' },
        subtitle: { type: 'text', label: 'Sous-titre', multiline: true },
        rdvTitle: { type: 'text', label: 'Titre encart RDV' },
        rdvDescription: { type: 'text', label: 'Description encart RDV' },
        ctaCalText: { type: 'text', label: 'Texte bouton Cal.com' },
        ctaCalLink: { type: 'text', label: 'Lien Cal.com' },
        submitText: { type: 'text', label: 'Texte bouton formulaire' },
        web3formsKey: { type: 'text', label: 'Cle Web3Forms (formulaire)', description: 'Collez votre cle pour recevoir vos formulaires directement. Guide : marcm.fr/aide/web3forms' },
      },
    },

    sections: {
      label: 'Titres des sections',
      description: 'Surtitres, titres et textes des blocs Services, Methode, Temoignages, FAQ, Footer',
      path: 'src/content/sections/index.json',
      fields: {
        services: {
          type: 'object',
          label: 'Services',
          fields: {
            eyebrow: { type: 'text', label: 'Surtitre' },
            title: { type: 'text', label: 'Titre' },
            ctaText: { type: 'text', label: 'Texte bouton CTA' },
          },
        },
        methode: {
          type: 'object',
          label: 'Methode H2S',
          fields: {
            eyebrow: { type: 'text', label: 'Surtitre' },
            title: { type: 'text', label: 'Titre' },
            description: { type: 'text', label: 'Description', multiline: true },
            steps: {
              type: 'array',
              label: 'Etapes H-H-S',
              itemLabel: 'fields.label',
              item: {
                type: 'object',
                label: 'Etape',
                fields: {
                  letter: { type: 'text', label: 'Lettre' },
                  label: { type: 'text', label: 'Mot-cle' },
                  text: { type: 'text', label: 'Description', multiline: true },
                },
              },
            },
          },
        },
        testimonials: {
          type: 'object',
          label: 'Temoignages',
          fields: {
            eyebrow: { type: 'text', label: 'Surtitre' },
            title: { type: 'text', label: 'Titre' },
          },
        },
        faq: {
          type: 'object',
          label: 'FAQ',
          fields: {
            eyebrow: { type: 'text', label: 'Surtitre' },
            title: { type: 'text', label: 'Titre' },
          },
        },
        footer: {
          type: 'object',
          label: 'Pied de page',
          fields: {
            description: { type: 'text', label: 'Description', multiline: true },
            location: { type: 'text', label: 'Localisation' },
            copyright: { type: 'text', label: 'Texte copyright' },
          },
        },
      },
    },

    'blog-ideas': {
      label: 'Idees articles blog',
      description: 'Pipeline de sujets a rediger',
      path: 'src/content/blog-ideas/index.json',
      fields: {
        ideas: {
          type: 'array',
          label: 'Idees',
          itemLabel: 'fields.title',
          item: {
            type: 'object',
            label: 'Idee',
            fields: {
              title: { type: 'text', label: 'Titre', required: true },
              source: { type: 'text', label: 'Source / inspiration' },
              status: {
                type: 'select',
                label: 'Statut',
                options: [
                  { label: 'A faire', value: 'a-faire' },
                  { label: 'En cours', value: 'en-cours' },
                  { label: 'Publie', value: 'publie' },
                ],
                defaultValue: 'a-faire',
              },
              notes: { type: 'text', label: 'Notes', multiline: true },
            },
          },
        },
      },
    },
  },

  collections: {
    services: {
      label: 'Services',
      description: 'Offres et prestations',
      path: 'src/content/services',
      slugField: 'title',
      labelField: 'title',
      fields: {
        title: { type: 'text', label: 'Titre du service', required: true },
        description: { type: 'text', label: 'Description', multiline: true },
        order: { type: 'number', label: "Ordre d'affichage", defaultValue: 0 },
      },
    },

    testimonials: {
      label: 'Temoignages',
      description: 'Avis et retours clients',
      path: 'src/content/testimonials',
      slugField: 'name',
      labelField: 'name',
      fields: {
        name: { type: 'text', label: 'Nom', required: true },
        role: { type: 'text', label: 'Fonction / Contexte' },
        quote: { type: 'text', label: 'Citation', multiline: true },
        order: { type: 'number', label: "Ordre d'affichage", defaultValue: 0 },
      },
    },

    faq: {
      label: 'FAQ',
      description: 'Questions frequentes',
      path: 'src/content/faq',
      slugField: 'question',
      labelField: 'question',
      fields: {
        question: { type: 'text', label: 'Question', required: true },
        answer: { type: 'text', label: 'Reponse', multiline: true },
        order: { type: 'number', label: "Ordre d'affichage", defaultValue: 0 },
      },
    },

    blog: {
      label: 'Articles de blog',
      description: 'Articles et contenus',
      path: 'src/content/blog',
      slugField: 'title',
      labelField: 'title',
      fields: {
        title: { type: 'text', label: "Titre de l'article", required: true },
        slug: { type: 'text', label: 'Identifiant URL (slug)' },
        description: { type: 'text', label: 'Description (extrait)', multiline: true },
        date: { type: 'date', label: 'Date de publication' },
        category: {
          type: 'select',
          label: 'Categorie',
          options: [
            { label: 'Prise de parole', value: 'Prise de parole' },
            { label: 'Coaching & methode', value: 'Coaching & methode' },
            { label: 'Recits de parcours', value: 'Recits de parcours' },
          ],
          defaultValue: 'Prise de parole',
        },
        content: { type: 'richtext', label: "Contenu de l'article" },
      },
    },
  },
};

export default cmsConfig;
