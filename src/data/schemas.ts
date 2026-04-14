/**
 * Schema.org helpers — doctrine C1 wf-00-cms §7 + schemas centralises.
 *
 * Specifique angelo-grossi : ProfessionalService (coach prise de parole)
 * avec founder Person riche (jobTitle, description, knowsAbout, credential
 * RNCP 7 EducationalOccupationalCredential). Pattern "composant dedie"
 * (src/components/seo/SchemaOrg.astro) qui appelle ces helpers.
 *
 * aggregateRating OMIS : les 3 testimonials n'ont pas de champ rating/source
 * structures. Doctrine C1 stricte. Reinjectable plus tard via enrichissement
 * testimonials ou business.rating avec platform documente.
 */

import { business, locale, schemaData } from '@data/business';
import { getSiteInfo, getServices, getFaq, getUpcomingEvents, type UpcomingEvent } from '@data/content';

export interface Breadcrumb {
  name: string;
  url: string;
}

// ============================================================
// getProfessionalServiceSchema — coach avec founder riche
// ============================================================

export function getProfessionalServiceSchema(): object {
  const site = getSiteInfo();
  const services = getServices();

  // Collecte dynamique des reseaux sociaux depuis site-info
  const socialLinks = [
    site.linkedin,
    site.facebookUrl,
    site.instagramUrl,
    site.twitterUrl,
  ].filter((url): url is string => Boolean(url && url.trim()));

  // areaServed : prefere la valeur editable si presente, sinon fallback schemaData
  const areaServed = site.areaServed
    ? [
        { '@type': 'AdministrativeArea', name: site.areaServed },
        { '@type': 'Country', name: 'France' },
      ]
    : schemaData.areaServed;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': business.schemaType,
    name: schemaData.businessName,
    description: schemaData.businessDescription,
    url: site.siteUrl,
    telephone: business.phone,
    email: site.email,
    image: `${site.siteUrl}/images/og-image.jpg`,
    founder: {
      '@type': 'Person',
      name: business.owner,
      jobTitle: schemaData.founderJobTitle,
      description: schemaData.founderDescription,
      knowsAbout: schemaData.founderKnowsAbout,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: schemaData.founderCredential.category,
        name: schemaData.founderCredential.name,
        educationalLevel: schemaData.founderCredential.level,
        recognizedBy: {
          '@type': 'Organization',
          name: schemaData.founderCredential.recognizedBy,
        },
      },
      sameAs: socialLinks,
    },
    areaServed,
    priceRange: schemaData.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressRegion: schemaData.address.addressRegion,
      addressCountry: schemaData.address.addressCountry,
    },
    sameAs: socialLinks,
  };

  // hasOfferCatalog depuis services CMS
  if (services.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Services de coaching prise de parole',
      itemListElement: services.map((s: any) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description.slice(0, 200),
        },
      })),
    };
  }

  // aggregateRating OMIS (doctrine C1 — pas de source verifiable)

  return schema;
}

// ============================================================
// getWebsiteSchema — WebSite
// ============================================================

export function getWebsiteSchema(): object {
  const site = getSiteInfo();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: schemaData.websiteName,
    url: site.siteUrl,
    description: schemaData.websiteDescription,
    inLanguage: locale.localeCode,
  };
}

// ============================================================
// getFAQPageSchema — FAQPage (sync, via getFaq helper)
// ============================================================

export function getFAQPageSchema(): object | null {
  const faqs = getFaq();
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================================
// getBreadcrumbSchema — BreadcrumbList (pur)
// ============================================================

export function getBreadcrumbSchema(items: Breadcrumb[]): object {
  const site = getSiteInfo();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${site.siteUrl}${item.url}`,
    })),
  };
}

// ============================================================
// getSpeakableSchema — Speakable (pur, selecteurs CSS standards)
// ============================================================

// ============================================================
// getEventSchema — Schema.org Event (pour prochains-evenements)
// ============================================================

export function getEventSchema(event: UpcomingEvent): object {
  const site = getSiteInfo();
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date_start,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.location && /visio|online|webinaire/i.test(event.location)
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    organizer: {
      '@type': 'Person',
      name: business.owner,
      url: site.siteUrl,
    },
  };

  if (event.date_end) schema.endDate = event.date_end;
  if (event.description) schema.description = event.description;

  if (event.location) {
    const isOnline = /visio|online|webinaire/i.test(event.location);
    schema.location = isOnline
      ? { '@type': 'VirtualLocation', url: site.siteUrl }
      : {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressRegion: schemaData.address.addressRegion,
            addressCountry: schemaData.address.addressCountry,
          },
        };
  }

  if (event.link_registration) {
    schema.offers = {
      '@type': 'Offer',
      url: event.link_registration,
      availability: 'https://schema.org/InStock',
    };
  }

  if (event.max_participants) {
    schema.maximumAttendeeCapacity = event.max_participants;
  }

  return schema;
}

export function getEventsSchemas(): object[] {
  return getUpcomingEvents().map(getEventSchema);
}

export function getSpeakableSchema(
  title: string,
  description: string,
  url: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    inLanguage: locale.localeCode,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.intro-text', '.faq-answer'],
    },
  };
}
