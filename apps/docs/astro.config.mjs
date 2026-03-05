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
        {
          label: 'Concepts',
          autogenerate: { directory: 'concepts' },
        },
        {
          label: 'Snippets',
          autogenerate: { directory: 'snippets' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
      head: [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://analytics.notiz.dev/js/pa-Tcb4hLre87BwyFcqW-0yZ.js',
          },
        },
        {
          tag: 'script',
          content: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init()`,
        },
      ],
      editLink: {
        baseUrl:
          'https://github.com/notiz-dev/nestjs-prisma/tree/feat/next/apps/docs/',
      },
    }),
  ],
});
