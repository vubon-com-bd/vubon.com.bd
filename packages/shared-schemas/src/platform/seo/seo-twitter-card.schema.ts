import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_TWITTER_CARD } from '@vubon/shared-constants/src/platform/seo/seo-twitter-card.constants';

const twitterCardTypeKeys = Object.keys(SEO_TWITTER_CARD.TYPES) as [string, ...string[]];

export const SEOTwitterCardSchema = BaseSchema.extend({
  twitterCardId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(twitterCardTypeKeys),
  card: z.string(),
  site: z.string(),
  title: z.string().max(60),
  description: z.string().max(160),
  image: z.string().url(),
  creator: z.string(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
