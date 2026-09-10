import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_SITEMAP } from '@vubon/shared-constants/src/platform/seo/seo-sitemap.constants';

const sitemapTypeKeys = Object.keys(SEO_SITEMAP.TYPES) as [string, ...string[]];
const sitemapChangeFrequencyKeys = Object.keys(SEO_SITEMAP.SITEMAP_CHANGE_FREQUENCIES) as [
  string,
  ...string[],
];
const sitemapPriorityKeys = Object.keys(SEO_SITEMAP.SITEMAP_PRIORITIES) as [string, ...string[]];

export const SEOSitemapSchema = BaseSchema.extend({
  sitemapId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(sitemapTypeKeys),
  url: z.string().url(),
  changeFrequency: z.enum(sitemapChangeFrequencyKeys),
  priority: z.enum(sitemapPriorityKeys),
  lastModified: z.date(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
