import type { CmsConfig } from '@marc/cms-engine/types';

const cmsConfig: CmsConfig = {
  repo: 'mavailable/site-angelo-grossi',
  branch: 'dev',
  siteName: 'Angelo Grossi',

  // Branding admin (>= v0.13.0) : variante CLAIRE de la marque théâtrale (Noir
  // Scène / Bordeaux Rideau / Or Projecteur / Gris Coulisse). Accent = bordeaux
  // Rideau (secondary), encres = navy Scène (primary), neutres = Coulisse.
  // Typo du site : Sora (titres), DM Sans (corps).
  // Ratios WCAG (admin-theme-validate.py, seuil AA 4.5 / ink 7.0 / muted3 WARN 2.5) :
  //   accent #a3324d / surface = 6.45:1   / bg = 6.03:1
  //   accentDeep #882c43 / accentSoft = 7.27:1
  //   ink #1e1e28 / surface = 15.84:1   inkSoft #414150 = 9.61:1
  //   muted #605a55 = 6.52:1   muted2 #726b65 = 5.03:1   muted3 #9d958e = 2.83:1 (WARN OK)
  adminTheme: {
    accent: '#a3324d',
    accentDeep: '#882c43',
    accentSoft: '#fbeaed',
    accentBorder: '#f7d5dc',
    ink: '#1e1e28',
    inkSoft: '#414150',
    muted: '#605a55',
    muted2: '#726b65',
    muted3: '#9d958e',
    line: '#e2e0de',
    lineSoft: '#f0efee',
    borderInput: '#cdc9c5',
    surface: '#fbfaf9',
    bg: '#f4f2f0',
    fontBody: "'DM Sans', -apple-system, system-ui, sans-serif",
    fontHeading: "'Sora', system-ui, sans-serif",
  },

  // Modules du moteur montés dans /admin (AdminIsland les importe via le scaffold).
  // marketing : parité avec l'inline (endpoint marketing-plan présent ; onglet gaté
  // par marketing.enabled, absent ici, donc invisible tant que non activé).
  modules: ['marketing'],

  site: {
    ownerName: 'Angelo Grossi',
    phone: '+33769389281',
    phoneDisplay: '07 69 38 92 81',
    email: 'contact@angelogrossi.com',
    siteUrl: 'https://angelogrossi.com',
    previewUrl: 'https://site-angelo-grossi.pages.dev',
    clientType: 'freelance-consultant',
    tagline: 'Coach prise de parole — Île-de-France',
    linkedinUrl: 'https://www.linkedin.com/in/angelogrossi/',
    calUrl: 'https://cal.com/angelogrossi/30min',
    umamiShareUrl: 'https://cloud.umami.is/share/NTGvxb2enRcpfjDM/angelogrossi.com',
    umamiSiteId: 'ec1c2b36-814d-4b4f-b449-19466a09cc52',
    contactMarc: {
      phone: '06 88 76 66 48',
      whatsapp: '33688766648',
      email: 'marc@muller.im',
    },
  },

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
        facebookUrl: { type: 'text', label: 'URL Facebook' },
        instagramUrl: { type: 'text', label: 'URL Instagram' },
        twitterUrl: { type: 'text', label: 'URL X / Twitter' },
        siteUrl: { type: 'text', label: 'URL du site' },
        calUrl: { type: 'text', label: 'URL Cal.com (ex: angelogrossi/30min)' },
        tagline: { type: 'text', label: 'Accroche courte', description: 'Ex: Coach prise de parole — Ile-de-France' },
        availabilityNote: { type: 'text', label: 'Note de disponibilite', multiline: true, description: 'Ex: Sur RDV, soir et weekend possibles' },
        areaServed: { type: 'text', label: 'Zone geographique', description: 'Ex: Ile-de-France' },
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

    'methode-h2s': {
      label: 'Methode H2S',
      description: 'Votre approche signature Happy / Healthy / Sexy',
      path: 'src/content/methode-h2s/index.json',
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
      description: 'Surtitres, titres et textes des blocs Services, Temoignages, FAQ, Footer',
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

    seo: {
      label: 'SEO / Referencement',
      description: 'Nom du site et image de partage reseaux sociaux',
      path: 'src/content/seo/index.json',
      fields: {
        global: {
          type: 'object',
          label: 'Parametres globaux',
          fields: {
            siteName: { type: 'text', label: 'Nom du site (onglets navigateur)' },
            separator: { type: 'text', label: 'Separateur titre (ex: —)' },
            defaultOgImage: { type: 'image', label: 'Image de partage par defaut' },
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

    interventions: {
      label: 'Interventions B2B',
      description: 'References clients entreprises (masquer le nom si confidentiel)',
      path: 'src/content/interventions',
      slugField: 'client_name',
      labelField: 'client_name',
      fields: {
        client_name: { type: 'text', label: 'Nom du client', required: true },
        sector: {
          type: 'select',
          label: 'Secteur',
          options: [
            { label: 'Finance', value: 'Finance' },
            { label: 'IT', value: 'IT' },
            { label: 'Industrie', value: 'Industrie' },
            { label: 'Sante', value: 'Sante' },
            { label: 'Secteur public', value: 'Secteur public' },
            { label: 'Autre', value: 'Autre' },
          ],
          defaultValue: 'Autre',
        },
        type: {
          type: 'select',
          label: 'Type de mission',
          options: [
            { label: 'Conference', value: 'Conference' },
            { label: 'Atelier', value: 'Atelier' },
            { label: 'Coaching dirigeant', value: 'Coaching dirigeant' },
            { label: 'Formation', value: 'Formation' },
          ],
          defaultValue: 'Atelier',
        },
        duration: { type: 'text', label: 'Duree (ex: 2 jours, 3 mois)' },
        context: { type: 'text', label: 'Contexte de la mission', multiline: true },
        outcome: { type: 'text', label: 'Resultat observable', multiline: true },
        confidential: { type: 'boolean', label: 'Confidentiel (masquer le nom)', defaultValue: false },
        order: { type: 'number', label: "Ordre d'affichage", defaultValue: 0 },
      },
    },

    'prochains-evenements': {
      label: 'Prochains evenements',
      description: 'Ateliers, webinaires et formations a venir (section masquee si vide)',
      path: 'src/content/prochains-evenements',
      slugField: 'title',
      labelField: 'title',
      fields: {
        title: { type: 'text', label: 'Titre', required: true },
        description: { type: 'text', label: 'Description', multiline: true },
        date_start: { type: 'text', label: 'Date de debut (ISO: 2026-05-10T18:00)', required: true },
        date_end: { type: 'text', label: 'Date de fin (ISO)' },
        location: { type: 'text', label: 'Lieu (ou "Visio")' },
        link_registration: { type: 'text', label: "Lien d'inscription" },
        event_type: {
          type: 'select',
          label: "Type d'evenement",
          options: [
            { label: 'Atelier', value: 'Atelier' },
            { label: 'Webinaire', value: 'Webinaire' },
            { label: 'Formation', value: 'Formation' },
          ],
          defaultValue: 'Atelier',
        },
        max_participants: { type: 'number', label: 'Nombre max de participants' },
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
