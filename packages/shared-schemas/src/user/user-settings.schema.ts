import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_SETTINGS } from '@vubon/shared-constants';

export const UserSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  userId: z.string().uuid(),
  theme: z.enum(Object.keys(USER_SETTINGS) as [string, ...string[]]),
  language: z.string().min(2).max(5),
  timezone: z.string(),
  currency: z.string().min(3).max(3),
  notifications: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(true),
    push: z.boolean().default(true),
    inApp: z.boolean().default(true),
  }),
  privacy: z.object({
    profileVisibility: z.string(),
    emailVisibility: z.boolean().default(true),
    phoneVisibility: z.boolean().default(false),
    addressVisibility: z.boolean().default(false),
  }),
  metadata: z.record(z.unknown()).optional(),
});
