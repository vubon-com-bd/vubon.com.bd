import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { AI_PERSONALIZATION } from '@vubon/shared-constants/src/ai/ai-personalization.constants';
import { USER_PREFERENCES } from '@vubon/shared-constants/src/user/user-preferences.constants';

const aiPersonalizationTypeKeys = Object.keys(AI_PERSONALIZATION.TYPES) as [string, ...string[]];
const aiPersonalizationAlgorithmKeys = Object.keys(
  AI_PERSONALIZATION.PERSONALIZATION_ALGORITHMS
) as [string, ...string[]];
const aiPersonalizationFactorKeys = Object.keys(AI_PERSONALIZATION.PERSONALIZATION_FACTORS) as [
  string,
  ...string[],
];
const userPreferenceKeys = Object.keys(USER_PREFERENCES) as [string, ...string[]];

export const AIPersonalizationSchema = BaseSchema.extend({
  personalizationId: z.string().uuid(),
  aiId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(aiPersonalizationTypeKeys),
  algorithm: z.enum(aiPersonalizationAlgorithmKeys),
  factors: z.array(z.enum(aiPersonalizationFactorKeys)),
  preferences: z.enum(userPreferenceKeys),
  score: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
