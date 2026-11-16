import { resolve } from 'node:path'

import { defineCollection, defineContentConfig } from '@nuxt/content'
import { useNuxt } from '@nuxt/kit'
import { z } from 'zod'

import { docsSettingsSchema } from './app/utils/docs-config'

// A layer's collections must read the consuming application's content.
const cwd = resolve(useNuxt().options.rootDir, 'content')

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: { cwd, include: '**', exclude: ['**/index.yml'] },
      schema: z.object({
        docs: docsSettingsSchema.optional(),
        space: z.boolean().optional(),
        icon: z.string().optional(),
        redirect: z.string().optional(),
      }),
    }),
    landing: defineCollection({
      type: 'data',
      source: { cwd, include: '**/index.yml' },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        featuresTitle: z.string().default('Built for documentation'),
        features: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
              code: z.string().optional(),
            }),
          )
          .default([]),
        preview: z
          .object({
            title: z.string(),
            description: z.string().optional(),
            to: z.string().startsWith('/'),
          })
          .optional(),
        links: z.array(z.object({ label: z.string(), to: z.string() })).default([]),
      }),
    }),
  },
})
