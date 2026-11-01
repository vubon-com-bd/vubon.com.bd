/**
 * SEO Strategy Schema
 * @module shared-schemas/platform/seo
 */

import { z } from 'zod';
import { SEO_STRATEGY, SEO_CRAWL_FREQUENCY } from '@vubon/shared-constants/platform';

export const SeoStrategySchema = z.enum(Object.values(SEO_STRATEGY) as [string, ...string[]]);

export const SeoCrawlFrequencySchema = z.enum(
  Object.values(SEO_CRAWL_FREQUENCY) as [string, ...string[]]
);

export type SeoStrategySchemaType = z.infer<typeof SeoStrategySchema>;
export type SeoCrawlFrequencySchemaType = z.infer<typeof SeoCrawlFrequencySchema>;
