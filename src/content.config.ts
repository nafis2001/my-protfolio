import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      title: z.string(),
      category: z.enum([
        'Branding',
        'Advertising',
        'Packaging',
        'Editorial',
        'Motion',
        'Experimental',
      ]),
      year: z.number(),
      client: z.string(),
      role: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
      order: z.number(),
      status: z.enum(['draft', 'published']).default('draft'),
      media: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(1),
            caption: z.string().optional(),
            video: z
              .object({
                src: z.string().regex(/^\/[a-zA-Z0-9_\-/]+\.(mp4|webm)$/),
                width: z.number().int().positive(),
                height: z.number().int().positive(),
                hasSpeech: z.boolean().default(false),
                captions: z
                  .string()
                  .regex(/^\/[a-zA-Z0-9_\-/]+\.vtt$/)
                  .optional(),
              })
              .refine((v) => !v.hasSpeech || Boolean(v.captions), {
                message: 'Spoken video requires a WebVTT captions file.',
              })
              .optional(),
          }),
        )
        .min(1),
      externalLinks: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      seo: z.object({ title: z.string(), description: z.string() }),
    }),
});
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    tags: z.array(z.string()).default([]),
  }),
});
export const collections = { projects, notes };
