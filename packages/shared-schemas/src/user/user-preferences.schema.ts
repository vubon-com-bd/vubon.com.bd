import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_PREFERENCES } from '@vubon/shared-constants/src/user/user-preferences.constants';

const userPreferenceValues = Object.values(USER_PREFERENCES) as [string, ...string[]];

/**
 * Allowed preference value shapes (mirrors UserPreferenceValue in shared-types).
 */
const userPreferenceValue = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.string()),
  z.array(z.number()),
]);

export const UserPreferencesSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userPreferenceValues),
  value: userPreferenceValue,
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
