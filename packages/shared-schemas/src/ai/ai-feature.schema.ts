import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_FEATURE } from '@vubon/shared-constants/src/ai/ai-feature.constants';

const aiFeatureTypeKeys = Object.keys(AI_FEATURE.TYPES) as [string, ...string[]];
const aiFeatureStatusKeys = Object.keys(AI_FEATURE.AI_FEATURE_STATUS) as [string, ...string[]];

export const AIFeatureSchema = BaseSchema.extend({
  featureId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiFeatureTypeKeys),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(aiFeatureStatusKeys),
  requirements: z.array(z.string()),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
