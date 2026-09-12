import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_CONTENT_OPTIMIZATION } from '@vubon/shared-constants/src/platform/seo/seo-content-optimization.constants';
import { SEOContentSchema } from './seo-content.schema';

const optimizationTypeKeys = Object.keys(SEO_CONTENT_OPTIMIZATION.TYPES) as [string, ...string[]];
const optimizationFactorKeys = Object.keys(SEO_CONTENT_OPTIMIZATION.OPTIMIZATION_FACTORS) as [
  string,
  ...string[],
];

export const SEOContentOptimizationSchema = BaseSchema.extend({
  optimizationId: z.string().uuid(),
  contentId: z.string().uuid(),
  content: SEOContentSchema,
  type: z.enum(optimizationTypeKeys),
  factor: z.enum(optimizationFactorKeys),
  score: z.number().min(0).max(100),
  recommended: z.string(),
  current: z.string(),
  isOptimized: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
