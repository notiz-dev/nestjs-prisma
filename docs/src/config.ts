export const SITE = {
  title: 'nestjs-prisma',
  description: 'Easy Prisma support for your NestJS application.',
  defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
  image: {
    src: 'https://repository-images.githubusercontent.com/285317400/0b397000-9fa7-45a9-b90e-08e9060cfa2c',
    alt: 'nestjs-prisma banner',
  },
  twitter: 'notiz_dev',
};

export type Frontmatter = {
  title: string;
  layout: string;
};

export type Link = {
  title: string;
  link: string;
};

export type Navigation = {
  title: string;
  links: Link[];
};

export const navigation: Navigation[] = [
  {
    title: 'Introduction',
    links: [
      { title: 'Installation', link: '/docs/installation' },
      { title: 'Basic Usage', link: '/docs/basic-usage' },
      { title: 'Configuration', link: '/docs/configuration' },
      { title: 'Shutdown Hook', link: '/docs/shutdown-hook' },
      { title: 'Prisma Middleware', link: '/docs/prisma-middleware' },
      { title: 'Prisma Logging', link: '/docs/prisma-logging' },
    ],
  },
  // {title: 'Prisma'}
  {
    title: 'Built-in Tools',
    links: [
      { title: 'Exception Filter', link: '/docs/exception-filter' },
      { title: 'Logging Middleware', link: '/docs/logging-middleware' },
    ],
  },
  {
    title: 'Automation',
    links: [
      { title: 'Schematics', link: '/docs/schematics' },
      { title: 'Custom Prisma Service', link: '/docs/custom-prisma-service' },
    ],
  },
];
