import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Singletons
const siteInfo = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/site-info' }),
  schema: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    city: z.string(),
    region: z.string(),
    linkedin: z.string().optional(),
    facebookUrl: z.string().optional(),
    instagramUrl: z.string().optional(),
    twitterUrl: z.string().optional(),
    siteUrl: z.string(),
    calUrl: z.string().optional(),
    tagline: z.string().optional(),
    availabilityNote: z.string().optional(),
    areaServed: z.string().optional(),
  }),
});

const hero = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/hero' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    ctaText: z.string(),
    ctaLink: z.string(),
    ctaSecondaryText: z.string(),
    ctaSecondaryLink: z.string(),
    reassurance: z.string(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/about' }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/contact' }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    rdvTitle: z.string(),
    rdvDescription: z.string(),
    ctaCalText: z.string(),
    ctaCalLink: z.string(),
    submitText: z.string(),
    rgpdText: z.string(),
  }),
});

const sections = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/sections' }),
  schema: z.object({
    services: z.object({
      eyebrow: z.string(),
      title: z.string(),
      ctaText: z.string(),
    }),
    testimonials: z.object({
      eyebrow: z.string(),
      title: z.string(),
    }),
    faq: z.object({
      eyebrow: z.string(),
      title: z.string(),
    }),
    footer: z.object({
      description: z.string(),
      location: z.string(),
      copyright: z.string(),
    }),
  }),
});

const methodeH2s = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/methode-h2s' }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
    steps: z.array(z.object({
      letter: z.string(),
      label: z.string(),
      text: z.string(),
    })),
  }),
});

const blogIdeas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/blog-ideas' }),
  schema: z.object({
    ideas: z.array(z.object({
      title: z.string(),
      source: z.string().optional(),
      status: z.string().optional(),
      notes: z.string().optional(),
    })),
  }),
});

// Collections
const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    quote: z.string(),
    order: z.number().default(0),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/faq' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string(),
    slug: z.string(),
    content: z.string(),
    _sources: z.object({
      verbatims_used: z.array(z.string()),
      anecdotes: z.array(z.string()),
      facts_verified: z.array(z.string()),
      fabricated: z.array(z.string()),
    }).optional(),
  }),
});

// SEO singleton (editable via /admin#/seo)
const seo = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/seo' }),
  schema: z.object({
    global: z.object({
      siteName: z.string().optional(),
      separator: z.string().optional(),
      defaultOgImage: z.string().optional(),
    }).optional(),
    pages: z.record(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
      noindex: z.boolean().optional(),
    })).optional(),
  }),
});

export const collections = {
  'site-info': siteInfo,
  hero,
  'methode-h2s': methodeH2s,
  about,
  contact,
  sections,
  'blog-ideas': blogIdeas,
  services,
  testimonials,
  faq,
  blog,
  seo,
};
