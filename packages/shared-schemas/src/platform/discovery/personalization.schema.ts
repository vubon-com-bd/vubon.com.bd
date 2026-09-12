import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { USER_PREFERENCES } from '@vubon/shared-constants/src/user/user-preferences.constants';
import { PERSONALIZATION } from '@vubon/shared-constants/src/platform/discovery/personalization.constants';

const personalizationTypeKeys = Object.keys(PERSONALIZATION.TYPES) as [string, ...string[]];
const factorKeys = Object.keys(PERSONALIZATION.PERSONALIZATION_FACTORS) as [string, ...string[]];
const preferenceKeys = Object.keys(USER_PREFERENCES) as [string, ...string[]];
const statusKeys = Object.keys(PERSONALIZATION.STATUS) as [string, ...string[]];

export const PersonalizationSchema = BaseSchema.extend({
  personalizationId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(personalizationTypeKeys),
  factors: z.array(z.enum(factorKeys)),
  preferences: z.enum(preferenceKeys),
  score: z.number().min(0).max(1),
  status: z.enum(statusKeys),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
