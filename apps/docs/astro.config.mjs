// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nestjs-prisma.dev',
  integrations: [
    starlight({
      title: 'nestjs-prisma',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/notiz-dev/nestjs-prisma',
        },
      ],
      sidebar: [
		{
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
      ],
    }),
  ],
});
