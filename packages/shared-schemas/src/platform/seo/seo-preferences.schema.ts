import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { SEO_PREFERENCES } from '@vubon/shared-constants/src/platform/seo/seo-preferences.constants';
import { SEOKeywordSchema } from './seo-keyword.schema';
import { SEOSettingsSchema } from './seo-settings.schema';

const preferenceTypeKeys = Object.keys(SEO_PREFERENCES.TYPES) as [string, ...string[]];
const preferenceGroupKeys = Object.keys(SEO_PREFERENCES.PREFERENCE_GROUPS) as [string, ...string[]];

export const SEOPreferencesSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(preferenceTypeKeys),
  group: z.enum(preferenceGroupKeys),
  keywords: z.array(SEOKeywordSchema),
  settings: SEOSettingsSchema,
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
