import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      tags: z.array(z.string()),
      description: z.string(),
      pubDate: z.string().transform((str) => new Date(str)),
      imgUrl: image(),
      draft: z.boolean().optional().default(false),
    }),
});

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/products" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(), // Changed from z.string().url() to accept both URLs and relative paths
    url: z.string().url(),
    categories: z.array(z.string()),
    primaryCategory: z.string().optional(),
    tags: z.array(z.string()).optional(),
    price: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  products: productsCollection,
};
