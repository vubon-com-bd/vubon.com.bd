import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_OPEN_GRAPH } from '@vubon/shared-constants/src/platform/seo/seo-open-graph.constants';

const openGraphTypeKeys = Object.keys(SEO_OPEN_GRAPH.TYPES) as [string, ...string[]];

export const SEOOpenGraphSchema = BaseSchema.extend({
  openGraphId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(openGraphTypeKeys),
  title: z.string().max(60),
  description: z.string().max(160),
  url: z.string().url(),
  image: z.string().url(),
  siteName: z.string(),
  locale: z.string(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
