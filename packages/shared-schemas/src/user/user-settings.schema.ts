/**
 * User Settings Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-settings.constants থেকে।
 */

import { z } from 'zod';
import { USER_SETTINGS } from '@vubon/shared-constants/user';
import { LocaleSchema, LanguageSchema, TimezoneSchema } from '../common/enums/locale.schema';

export const ThemeSchema = z.enum(Object.values(USER_SETTINGS) as [string, ...string[]]);

export const UserSettingsSchema = z.object({
  userId: z.string().min(1),
  theme: ThemeSchema,
  language: LanguageSchema,
  locale: LocaleSchema,
  timezone: TimezoneSchema,
  currency: z.string().length(3),
  dateFormat: z.string().min(1).max(30),
  timeFormat: z.string().min(1).max(30),
  itemsPerPage: z.number().int().min(5).max(200),
  notifications: z.boolean(),
  twoFactor: z.boolean(),
  updatedAt: z.string().datetime(),
});

export const UserSettingsInputSchema = UserSettingsSchema.omit({
  userId: true,
  updatedAt: true,
}).partial();

export type ThemeSchemaType = z.infer<typeof ThemeSchema>;
export type UserSettingsSchemaType = z.infer<typeof UserSettingsSchema>;
export type UserSettingsInputSchemaType = z.infer<typeof UserSettingsInputSchema>;
