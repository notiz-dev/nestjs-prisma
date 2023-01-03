import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import alpinejs from "@astrojs/alpinejs";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://nestjs-prisma.dev',
  integrations: [tailwind(), sitemap(), alpinejs(), react()]
});