import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_PREFERENCES } from '@vubon/shared-constants/src/user/user-preferences.constants';

const userPreferenceKeys = Object.keys(USER_PREFERENCES) as [string, ...string[]];

export const UserPreferencesSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userPreferenceKeys),
  value: z.unknown(),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
