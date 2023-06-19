import { defineConfig } from 'astro/config';

// css
import tailwind from '@astrojs/tailwind';

// seo
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// frameworks
import alpinejs from '@astrojs/alpinejs';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://nestjs-prisma.dev',
  integrations: [tailwind(), sitemap(), robotsTxt(), alpinejs(), react()],
});
