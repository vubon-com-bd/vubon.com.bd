/**
 * Admin Preferences Schema
 * অ্যাডমিন প্রেফারেন্স সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_PREFERENCES } from '@vubon/shared-constants';

export const AdminPreferencesSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  theme: z
    .enum([
      ADMIN_PREFERENCES.THEMES.LIGHT,
      ADMIN_PREFERENCES.THEMES.DARK,
      ADMIN_PREFERENCES.THEMES.SYSTEM,
    ])
    .default(ADMIN_PREFERENCES.DEFAULTS.THEME),
  layout: z
    .enum([
      ADMIN_PREFERENCES.LAYOUTS.SIDEBAR,
      ADMIN_PREFERENCES.LAYOUTS.TOP,
      ADMIN_PREFERENCES.LAYOUTS.BOTTOM,
      ADMIN_PREFERENCES.LAYOUTS.COMPACT,
    ])
    .default(ADMIN_PREFERENCES.DEFAULTS.LAYOUT),
  navigation: z
    .enum([
      ADMIN_PREFERENCES.NAVIGATIONS.SIDEBAR,
      ADMIN_PREFERENCES.NAVIGATIONS.TOP,
      ADMIN_PREFERENCES.NAVIGATIONS.BOTTOM,
    ])
    .default(ADMIN_PREFERENCES.DEFAULTS.NAVIGATION),
  language: z
    .enum([ADMIN_PREFERENCES.LANGUAGES.BN, ADMIN_PREFERENCES.LANGUAGES.EN])
    .default(ADMIN_PREFERENCES.DEFAULTS.LANGUAGE),
  timezone: z.string().default(ADMIN_PREFERENCES.DEFAULTS.TIMEZONE),
  dateFormat: z.string().default(ADMIN_PREFERENCES.DEFAULTS.DATE_FORMAT),
  timeFormat: z.enum(['12h', '24h']).default(ADMIN_PREFERENCES.DEFAULTS.TIME_FORMAT),
  itemsPerPage: z.number().int().min(5).max(100).default(ADMIN_PREFERENCES.DEFAULTS.ITEMS_PER_PAGE),
  compactMode: z.boolean().default(ADMIN_PREFERENCES.DISPLAY.COMPACT),
  animations: z.boolean().default(ADMIN_PREFERENCES.DISPLAY.ANIMATIONS),
  sound: z.boolean().default(ADMIN_PREFERENCES.DISPLAY.SOUND),
  reducedMotion: z.boolean().default(ADMIN_PREFERENCES.DISPLAY.REDUCED_MOTION),
  highContrast: z.boolean().default(ADMIN_PREFERENCES.DISPLAY.HIGH_CONTRAST),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminPreferencesCreateSchema = AdminPreferencesSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const AdminPreferencesUpdateSchema = AdminPreferencesSchema.partial();

export type AdminPreferencesSchemaType = z.infer<typeof AdminPreferencesSchema>;
export type AdminPreferencesCreateSchemaType = z.infer<typeof AdminPreferencesCreateSchema>;
export type AdminPreferencesUpdateSchemaType = z.infer<typeof AdminPreferencesUpdateSchema>;
