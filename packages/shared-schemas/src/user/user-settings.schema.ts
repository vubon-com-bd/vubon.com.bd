import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { LANGUAGE } from '@vubon/shared-constants/src/common/language.constants';
import { TIMEZONE } from '@vubon/shared-constants/src/common/timezone.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';

const languageValues = Object.values(LANGUAGE) as [string, ...string[]];
const timezoneValues = Object.values(TIMEZONE) as [string, ...string[]];
const currencyValues = Object.values(CURRENCY).map((c) => c.code) as [string, ...string[]];

/** Theme is a UI concept — no constant yet, kept as a literal union. */
const themeValues = ['light', 'dark', 'system'] as [string, ...string[]];

export const UserSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  userId: z.string().uuid(),
  theme: z.enum(themeValues),
  language: z.enum(languageValues),
  timezone: z.enum(timezoneValues),
  currency: z.enum(currencyValues),
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
