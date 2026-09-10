import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_LINK } from '@vubon/shared-constants/src/platform/seo/seo-link.constants';

const seoLinkTypeKeys = Object.keys(SEO_LINK.TYPES) as [string, ...string[]];
const linkAttributeKeys = Object.keys(SEO_LINK.LINK_ATTRIBUTES) as [string, ...string[]];

export const SEOLinkSchema = BaseSchema.extend({
  linkId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(seoLinkTypeKeys),
  url: z.string().url(),
  anchor: z.string().min(1).max(255),
  rel: z.enum(linkAttributeKeys),
  isActive: z.boolean().default(true),
  isFollow: z.boolean().default(true),
  isNoFollow: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
