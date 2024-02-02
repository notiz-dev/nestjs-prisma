export const SITE = {
  title: 'nestjs-prisma',
  description: 'Easy Prisma support for your NestJS application.',
  defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
  image: {
    src: 'https://repository-images.githubusercontent.com/285317400/96d0c3d9-4b2b-461e-be5f-736d4b1b5a65',
    alt: 'nestjs-prisma banner',
  },
  twitter: 'notiz_dev',
};

export const GITHUB_EDIT_URL = `https://github.com/notiz-dev/nestjs-prisma/tree/main/docs`;

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
    ],
  },
  {
    title: 'Basics',
    links: [
      { title: 'Prisma Middleware', link: '/docs/prisma-middleware' },
      { title: 'Prisma Logging', link: '/docs/prisma-logging' },
    ],
  },
  {
    title: 'Advanced',
    links: [
      {
        title: 'Custom Prisma Client Location',
        link: '/docs/custom-prisma-client-location',
      },
      // { title: 'Multiple Prisma Clients', link: '' },
      {
        title: 'Prisma Client Extensions',
        link: '/docs/prisma-client-extensions',
      },
    ],
  },
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
  {
    title: 'Resources',
    links: [{ title: 'Examples', link: '/docs/examples' }],
  },
];

export type Example = {
  name: string;
  description: string;
  link: string;
};

export const examples: Example[] = [
  {
    name: 'Basics',
    description: 'NestJS app with Express, Prisma and nestjs-prisma.',
    link: 'https://github.com/notiz-dev/nestjs-prisma/tree/main/examples/basics',
  },
  {
    name: 'Fastify',
    description: 'NestJS app with Fastify, Prisma and nestjs-prisma.',
    link: 'https://github.com/notiz-dev/nestjs-prisma/tree/main/examples/fastify',
  },
  {
    name: 'Extensions',
    description: 'Using the Prisma Client extension with nestjs-prisma',
    link: 'https://github.com/notiz-dev/nestjs-prisma/tree/main/examples/extensions',
  },
  {
    name: 'GraphQL',
    description: 'NestJS app with GraphQL Apollo, Prisma and nestjs-prisma',
    link: 'https://github.com/notiz-dev/nestjs-prisma/tree/main/examples/graphql',
  },
  {
    name: 'nestjs-prisma-starter',
    description:
      'NestJS app with GraphQL, JWT authentication, REST API w/ Swagger and Docker',
    link: 'https://github.com/notiz-dev/nestjs-prisma-starter',
  },
];

export const ALGOLIA = {
  appId: 'YAV0DZ0J6L',
  apiKey: '4e8a1185fe7d7627de0cdc8ebfbaf569',
  indexName: 'nestjs-prisma',
};
