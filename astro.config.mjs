import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://angelogrossi.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !/admin|merci|404/.test(page),
    }),
    react(),
  ],
  compressHTML: true,
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: true },
  },
});
