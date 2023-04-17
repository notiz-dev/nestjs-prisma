import { z, defineCollection } from 'astro:content';

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  docs: docsCollection,
};
