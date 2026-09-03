/**
 * User Settings Schema
 * ইউজার সেটিংস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_SETTINGS } from '@vubon/shared-constants';

export const UserSettingsSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  notifications: z.object({
    email: z.object({
      enabled: z.boolean().default(USER_SETTINGS.NOTIFICATIONS.EMAIL.ENABLED),
      digest: z
        .enum(['daily', 'weekly', 'monthly', 'never'])
        .default(USER_SETTINGS.DEFAULTS.NOTIFICATION_DIGEST),
      types: z.array(z.enum(['all', 'important', 'none'])).default(['all']),
    }),
    sms: z.object({
      enabled: z.boolean().default(USER_SETTINGS.NOTIFICATIONS.SMS.ENABLED),
      types: z.array(z.enum(['all', 'otp', 'none'])).default(['all']),
    }),
    push: z.object({
      enabled: z.boolean().default(USER_SETTINGS.NOTIFICATIONS.PUSH.ENABLED),
      types: z.array(z.enum(['all', 'important', 'none'])).default(['all']),
    }),
    inApp: z.object({
      enabled: z.boolean().default(USER_SETTINGS.NOTIFICATIONS.IN_APP.ENABLED),
      types: z.array(z.enum(['all', 'important', 'none'])).default(['all']),
    }),
  }),
  privacy: z.object({
    profileVisibility: z
      .enum(['public', 'private', 'contacts', 'friends', 'custom'])
      .default(USER_SETTINGS.DEFAULTS.PROFILE_VISIBILITY),
    onlineStatus: z.enum(['visible', 'hidden', 'contacts']).default('visible'),
    lastSeen: z.enum(['visible', 'hidden', 'contacts']).default('visible'),
    readReceipts: z.boolean().default(USER_SETTINGS.PRIVACY.READ_RECEIPTS),
    shareAnalytics: z.boolean().default(USER_SETTINGS.PRIVACY.SHARE_ANALYTICS),
    acceptCookies: z.boolean().default(USER_SETTINGS.PRIVACY.ACCEPT_COOKIES),
  }),
  display: z.object({
    theme: z.enum(['light', 'dark', 'system']).default(USER_SETTINGS.DEFAULTS.THEME),
    language: z.string().default(USER_SETTINGS.DEFAULTS.LANGUAGE),
    timezone: z.string().default(USER_SETTINGS.DEFAULTS.TIMEZONE),
    dateFormat: z.string().default('YYYY-MM-DD'),
    timeFormat: z.enum(['12h', '24h']).default('24h'),
    currency: z.string().default(USER_SETTINGS.DEFAULTS.CURRENCY),
    numberFormat: z.enum(['standard', 'compact', 'scientific']).default('standard'),
    compactMode: z.boolean().default(USER_SETTINGS.DISPLAY.COMPACT_MODE),
    reducedMotion: z.boolean().default(USER_SETTINGS.DISPLAY.REDUCED_MOTION),
    highContrast: z.boolean().default(USER_SETTINGS.DISPLAY.HIGH_CONTRAST),
  }),
  security: z.object({
    twoFactorAuth: z.boolean().default(USER_SETTINGS.SECURITY.TWO_FACTOR_AUTH),
    biometric: z.boolean().default(USER_SETTINGS.SECURITY.BIOMETRIC),
    sessionTimeout: z.number().int().positive().default(USER_SETTINGS.SECURITY.SESSION_TIMEOUT),
    rememberMe: z.boolean().default(USER_SETTINGS.SECURITY.REMEMBER_ME),
    trustedDevices: z.boolean().default(USER_SETTINGS.SECURITY.TRUSTED_DEVICES),
    loginAlerts: z.boolean().default(USER_SETTINGS.SECURITY.LOGIN_ALERTS),
    suspiciousActivityAlert: z.boolean().default(USER_SETTINGS.SECURITY.SUSPICIOUS_ACTIVITY_ALERT),
  }),
  metadata: z.record(z.unknown()).optional(),
});

export const UserSettingsCreateSchema = UserSettingsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UserSettingsUpdateSchema = UserSettingsSchema.partial();

export type UserSettingsSchemaType = z.infer<typeof UserSettingsSchema>;
export type UserSettingsCreateSchemaType = z.infer<typeof UserSettingsCreateSchema>;
export type UserSettingsUpdateSchemaType = z.infer<typeof UserSettingsUpdateSchema>;
