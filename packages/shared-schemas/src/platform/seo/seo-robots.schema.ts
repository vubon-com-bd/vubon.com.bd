import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_ROBOTS } from '@vubon/shared-constants/src/platform/seo/seo-robots.constants';

const robotsTypeKeys = Object.keys(SEO_ROBOTS.TYPES) as [string, ...string[]];
const robotsDirectiveKeys = Object.keys(SEO_ROBOTS.ROBOTS_DIRECTIVES) as [string, ...string[]];

export const SEORobotsSchema = BaseSchema.extend({
  robotsId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(robotsTypeKeys),
  directive: z.enum(robotsDirectiveKeys),
  value: z.string(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
