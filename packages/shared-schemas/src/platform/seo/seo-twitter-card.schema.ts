/**
 * SEO Twitter Card Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-twitter-card.constants থেকে।
 */

import { z } from 'zod';
import { SEO_TWITTER_CARD_TYPE } from '@vubon/shared-constants/platform';

export const SeoTwitterCardTypeSchema = z.enum(
  Object.values(SEO_TWITTER_CARD_TYPE) as [string, ...string[]]
);

export const SeoTwitterCardSchema = z.object({
  card: SeoTwitterCardTypeSchema,
  site: z.string().max(50).optional(),
  siteId: z.string().max(50).optional(),
  creator: z.string().max(50).optional(),
  creatorId: z.string().max(50).optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  imageAlt: z.string().max(200).optional(),
  url: z.string().url().optional(),
});

export type SeoTwitterCardTypeSchemaType = z.infer<typeof SeoTwitterCardTypeSchema>;
export type SeoTwitterCardSchemaType = z.infer<typeof SeoTwitterCardSchema>;
