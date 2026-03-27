import fs from 'node:fs';
import path from 'node:path';

function readJson<T>(filePath: string): T {
  const fullPath = path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as T;
}

function readCollection<T>(dirPath: string): T[] {
  const fullDir = path.join(process.cwd(), dirPath);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .map(f => readJson<T>(path.join(dirPath, f)));
}

// Types
export interface SiteInfo {
  name: string;
  phone: string;
  email: string;
  city: string;
  region: string;
  linkedin: string;
  siteUrl: string;
  calUrl: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  reassurance: string;
}

export interface About {
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

export interface Contact {
  eyebrow: string;
  title: string;
  subtitle: string;
  rdvTitle: string;
  rdvDescription: string;
  ctaCalText: string;
  ctaCalLink: string;
  submitText: string;
  rgpdText: string;
}

export interface ServicesSection {
  eyebrow: string;
  title: string;
  ctaText: string;
}

export interface MethodeStep {
  letter: string;
  label: string;
  text: string;
}

export interface Methode {
  eyebrow: string;
  title: string;
  description: string;
  steps: MethodeStep[];
}

export interface TestimonialsSection {
  eyebrow: string;
  title: string;
}

export interface FaqSection {
  eyebrow: string;
  title: string;
}

export interface Footer {
  description: string;
  location: string;
  copyright: string;
}

export interface Service {
  title: string;
  description: string;
  order: number;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  order: number;
}

export interface Faq {
  question: string;
  answer: string;
  order: number;
}

// Getters
export function getSiteInfo(): SiteInfo {
  return readJson<SiteInfo>('src/content/site-info/index.json');
}

export function getHero(): Hero {
  return readJson<Hero>('src/content/hero/index.json');
}

export function getAbout(): About {
  return readJson<About>('src/content/about/index.json');
}

export function getContact(): Contact {
  return readJson<Contact>('src/content/contact/index.json');
}

export function getServicesSection(): ServicesSection {
  return readJson<ServicesSection>('src/content/services-section/index.json');
}

export function getMethode(): Methode {
  return readJson<Methode>('src/content/methode/index.json');
}

export function getTestimonialsSection(): TestimonialsSection {
  return readJson<TestimonialsSection>('src/content/testimonials-section/index.json');
}

export function getFaqSection(): FaqSection {
  return readJson<FaqSection>('src/content/faq-section/index.json');
}

export function getFooter(): Footer {
  return readJson<Footer>('src/content/footer/index.json');
}

export function getServices(): Service[] {
  return readCollection<Service>('src/content/services')
    .sort((a, b) => a.order - b.order);
}

export function getTestimonials(): Testimonial[] {
  return readCollection<Testimonial>('src/content/testimonials')
    .sort((a, b) => a.order - b.order);
}

export function getFaq(): Faq[] {
  return readCollection<Faq>('src/content/faq')
    .sort((a, b) => a.order - b.order);
}
