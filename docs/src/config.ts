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
      { title: 'Basic usage', link: '/docs/basic-usage' },
    ],
  },
];
