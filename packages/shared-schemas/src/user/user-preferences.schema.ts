/**
 * User Preferences Schema
 * ইউজার প্রেফারেন্স সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_PREFERENCES } from '@vubon/shared-constants';

export const UserPreferencesSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  content: z.object({
    language: z.string().default(USER_PREFERENCES.DEFAULTS.LANGUAGE),
    region: z.string().default('BD'),
    contentType: z
      .array(z.enum(['article', 'video', 'image']))
      .default(['article', 'video', 'image']),
    notificationTypes: z
      .array(z.enum(['email', 'sms', 'push', 'in_app']))
      .default(['email', 'push']),
  }),
  ui: z.object({
    theme: z.enum(['light', 'dark', 'system']).default(USER_PREFERENCES.DEFAULTS.THEME),
    layout: z.enum(['default', 'compact', 'sidebar']).default('default'),
    navigation: z.enum(['sidebar', 'top', 'bottom']).default('sidebar'),
    compact: z.boolean().default(false),
    animations: z.boolean().default(true),
    sound: z.boolean().default(true),
    vibration: z.boolean().default(true),
  }),
  communication: z.object({
    emailFrequency: z
      .enum(['daily', 'weekly', 'monthly', 'never'])
      .default(USER_PREFERENCES.DEFAULTS.EMAIL_FREQUENCY),
    smsEnabled: z.boolean().default(true),
    pushEnabled: z.boolean().default(true),
    inAppEnabled: z.boolean().default(true),
    marketingEmails: z.boolean().default(false),
    newsletter: z.boolean().default(false),
  }),
  accessibility: z.object({
    fontSize: z
      .enum(['small', 'medium', 'large', 'x-large'])
      .default(USER_PREFERENCES.DEFAULTS.FONT_SIZE),
    highContrast: z.boolean().default(false),
    reducedMotion: z.boolean().default(false),
    screenReader: z.boolean().default(false),
    captions: z.boolean().default(false),
  }),
  metadata: z.record(z.unknown()).optional(),
});

export const UserPreferencesCreateSchema = UserPreferencesSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UserPreferencesUpdateSchema = UserPreferencesSchema.partial();

export type UserPreferencesSchemaType = z.infer<typeof UserPreferencesSchema>;
export type UserPreferencesCreateSchemaType = z.infer<typeof UserPreferencesCreateSchema>;
export type UserPreferencesUpdateSchemaType = z.infer<typeof UserPreferencesUpdateSchema>;
