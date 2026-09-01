/**
 * User Settings Schema
 * Zod schemas for user settings management
 */

import { z } from 'zod';
import {
  USER_SETTINGS_CATEGORY,
  USER_SETTINGS_TYPE,
  USER_NOTIFICATION_SETTINGS,
  USER_NOTIFICATION_EVENT,
  USER_LANGUAGE_SETTINGS,
  USER_THEME_SETTINGS,
  USER_COLOR_SCHEME,
  USER_DATE_FORMAT,
  USER_TIME_FORMAT,
  USER_TIMEZONE_SETTINGS,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// USER SETTINGS TYPE SCHEMAS
// ============================================================

/**
 * User settings category schema
 */
export const userSettingsCategorySchema = z.enum([
  USER_SETTINGS_CATEGORY.GENERAL,
  USER_SETTINGS_CATEGORY.ACCOUNT,
  USER_SETTINGS_CATEGORY.NOTIFICATIONS,
  USER_SETTINGS_CATEGORY.PRIVACY,
  USER_SETTINGS_CATEGORY.SECURITY,
  USER_SETTINGS_CATEGORY.LANGUAGE,
  USER_SETTINGS_CATEGORY.APPEARANCE,
  USER_SETTINGS_CATEGORY.ACCESSIBILITY,
  USER_SETTINGS_CATEGORY.DATA,
  USER_SETTINGS_CATEGORY.INTEGRATION,
  USER_SETTINGS_CATEGORY.BILLING,
]);

/**
 * User settings type schema
 */
export const userSettingsTypeSchema = z.enum([
  USER_SETTINGS_TYPE.BOOLEAN,
  USER_SETTINGS_TYPE.STRING,
  USER_SETTINGS_TYPE.NUMBER,
  USER_SETTINGS_TYPE.SELECT,
  USER_SETTINGS_TYPE.MULTI_SELECT,
  USER_SETTINGS_TYPE.COLOR,
  USER_SETTINGS_TYPE.FILE,
  USER_SETTINGS_TYPE.JSON,
  USER_SETTINGS_TYPE.ARRAY,
  USER_SETTINGS_TYPE.DATE,
  USER_SETTINGS_TYPE.TIME,
  USER_SETTINGS_TYPE.DATETIME,
]);

/**
 * User notification setting schema
 */
export const userNotificationSettingSchema = z.enum([
  USER_NOTIFICATION_SETTINGS.EMAIL,
  USER_NOTIFICATION_SETTINGS.PUSH,
  USER_NOTIFICATION_SETTINGS.SMS,
  USER_NOTIFICATION_SETTINGS.IN_APP,
]);

/**
 * User notification event schema
 */
export const userNotificationEventSchema = z.enum([
  USER_NOTIFICATION_EVENT.ACCOUNT_UPDATE,
  USER_NOTIFICATION_EVENT.PASSWORD_CHANGE,
  USER_NOTIFICATION_EVENT.LOGIN_ALERT,
  USER_NOTIFICATION_EVENT.SUSPICIOUS_LOGIN,
  USER_NOTIFICATION_EVENT.PROFILE_UPDATE,
  USER_NOTIFICATION_EVENT.PROFILE_VIEW,
  USER_NOTIFICATION_EVENT.KYC_STATUS_CHANGE,
  USER_NOTIFICATION_EVENT.KYC_APPROVED,
  USER_NOTIFICATION_EVENT.KYC_REJECTED,
  USER_NOTIFICATION_EVENT.VERIFICATION_COMPLETE,
  USER_NOTIFICATION_EVENT.VERIFICATION_FAILED,
  USER_NOTIFICATION_EVENT.NEW_ACTIVITY,
  USER_NOTIFICATION_EVENT.ACTIVITY_COMMENT,
  USER_NOTIFICATION_EVENT.RELATIONSHIP_REQUEST,
  USER_NOTIFICATION_EVENT.RELATIONSHIP_ACCEPTED,
  USER_NOTIFICATION_EVENT.SUBSCRIPTION_RENEWAL,
  USER_NOTIFICATION_EVENT.SUBSCRIPTION_EXPIRY,
  USER_NOTIFICATION_EVENT.PAYMENT_SUCCESS,
  USER_NOTIFICATION_EVENT.PAYMENT_FAILED,
  USER_NOTIFICATION_EVENT.PROMOTIONAL_OFFER,
  USER_NOTIFICATION_EVENT.NEWSLETTER,
]);

/**
 * User language setting schema
 */
export const userLanguageSettingSchema = z.enum([
  USER_LANGUAGE_SETTINGS.BN_BD,
  USER_LANGUAGE_SETTINGS.EN_US,
  USER_LANGUAGE_SETTINGS.EN_GB,
  USER_LANGUAGE_SETTINGS.AR,
  USER_LANGUAGE_SETTINGS.HI,
  USER_LANGUAGE_SETTINGS.UR,
  USER_LANGUAGE_SETTINGS.ES,
  USER_LANGUAGE_SETTINGS.FR,
  USER_LANGUAGE_SETTINGS.DE,
  USER_LANGUAGE_SETTINGS.IT,
  USER_LANGUAGE_SETTINGS.PT,
  USER_LANGUAGE_SETTINGS.RU,
  USER_LANGUAGE_SETTINGS.JA,
  USER_LANGUAGE_SETTINGS.KO,
  USER_LANGUAGE_SETTINGS.ZH_CN,
  USER_LANGUAGE_SETTINGS.ZH_TW,
]);

/**
 * User theme setting schema
 */
export const userThemeSettingSchema = z.enum([
  USER_THEME_SETTINGS.LIGHT,
  USER_THEME_SETTINGS.DARK,
  USER_THEME_SETTINGS.SYSTEM,
  USER_THEME_SETTINGS.HIGH_CONTRAST,
  USER_THEME_SETTINGS.SEPIA,
]);

/**
 * User color scheme schema
 */
export const userColorSchemeSchema = z.enum([
  USER_COLOR_SCHEME.DEFAULT,
  USER_COLOR_SCHEME.BLUE,
  USER_COLOR_SCHEME.GREEN,
  USER_COLOR_SCHEME.PURPLE,
  USER_COLOR_SCHEME.ORANGE,
  USER_COLOR_SCHEME.RED,
  USER_COLOR_SCHEME.PINK,
  USER_COLOR_SCHEME.CUSTOM,
]);

/**
 * User date format schema
 */
export const userDateFormatSchema = z.enum([
  USER_DATE_FORMAT.DD_MM_YYYY,
  USER_DATE_FORMAT.MM_DD_YYYY,
  USER_DATE_FORMAT.YYYY_MM_DD,
  USER_DATE_FORMAT.DD_MMM_YYYY,
  USER_DATE_FORMAT.MMM_DD_YYYY,
]);

/**
 * User time format schema
 */
export const userTimeFormatSchema = z.enum([USER_TIME_FORMAT.HOUR_12, USER_TIME_FORMAT.HOUR_24]);

/**
 * User timezone setting schema
 */
export const userTimezoneSettingSchema = z.enum([
  USER_TIMEZONE_SETTINGS.UTC,
  USER_TIMEZONE_SETTINGS.DHAKA,
  USER_TIMEZONE_SETTINGS.NEW_YORK,
  USER_TIMEZONE_SETTINGS.LONDON,
  USER_TIMEZONE_SETTINGS.PARIS,
  USER_TIMEZONE_SETTINGS.DUBAI,
  USER_TIMEZONE_SETTINGS.SINGAPORE,
  USER_TIMEZONE_SETTINGS.TOKYO,
  USER_TIMEZONE_SETTINGS.SYDNEY,
  USER_TIMEZONE_SETTINGS.LOS_ANGELES,
  USER_TIMEZONE_SETTINGS.CHICAGO,
  USER_TIMEZONE_SETTINGS.ISTANBUL,
  USER_TIMEZONE_SETTINGS.MOSCOW,
  USER_TIMEZONE_SETTINGS.BEIJING,
  USER_TIMEZONE_SETTINGS.KARACHI,
  USER_TIMEZONE_SETTINGS.MUMBAI,
]);

// ============================================================
// USER SETTING RECORD SCHEMA
// ============================================================

/**
 * User setting record schema
 */
export const userSettingRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  key: z.string().min(1),
  value: z.unknown(),
  type: userSettingsTypeSchema,
  category: userSettingsCategorySchema,
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  setAt: timestampSchema,
  updatedAt: timestampSchema,
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER SETTINGS REQUEST SCHEMAS
// ============================================================

/**
 * User setting update request schema
 */
export const userSettingUpdateRequestSchema = z.object({
  userId: idSchema,
  key: z.string().min(1),
  value: z.unknown(),
  category: userSettingsCategorySchema.optional(),
});

/**
 * User setting bulk update request schema
 */
export const userSettingBulkUpdateRequestSchema = z.object({
  userId: idSchema,
  settings: z.array(
    z.object({
      key: z.string().min(1),
      value: z.unknown(),
      category: userSettingsCategorySchema.optional(),
    })
  ),
});

// ============================================================
// USER SETTINGS RESPONSE SCHEMA
// ============================================================

/**
 * User setting response schema
 */
export const userSettingResponseSchema = z.object({
  success: z.boolean(),
  setting: userSettingRecordSchema.optional(),
  error: z.string().optional(),
});

// ============================================================
// USER SETTINGS FILTER SCHEMA
// ============================================================

/**
 * User setting filter schema
 */
export const userSettingFilterSchema = z.object({
  userId: idSchema.optional(),
  category: z.union([userSettingsCategorySchema, z.array(userSettingsCategorySchema)]).optional(),
  type: z.union([userSettingsTypeSchema, z.array(userSettingsTypeSchema)]).optional(),
  defaultOnly: z.boolean().optional(),
  activeOnly: z.boolean().optional(),
  search: z.string().optional(),
});

// ============================================================
// USER SETTINGS SUMMARY SCHEMA
// ============================================================

/**
 * User settings summary schema
 */
export const userSettingsSummarySchema = z.object({
  userId: idSchema,
  totalSettings: z.number().int().min(0),
  activeSettings: z.number().int().min(0),
  defaultSettings: z.number().int().min(0),
  settingsByCategory: z.record(userSettingsCategorySchema, z.number().int().min(0)),
  settingsByType: z.record(userSettingsTypeSchema, z.number().int().min(0)),
  settings: z.array(userSettingRecordSchema),
});

// ============================================================
// USER NOTIFICATION PREFERENCES SCHEMA
// ============================================================

/**
 * User notification preferences schema
 */
export const userNotificationPreferencesSchema = z.object({
  methods: z.array(userNotificationSettingSchema),
  subscribedEvents: z.array(userNotificationEventSchema),
  emailEnabled: z.boolean().default(false),
  pushEnabled: z.boolean().default(false),
  smsEnabled: z.boolean().default(false),
  inAppEnabled: z.boolean().default(false),
});

// ============================================================
// USER APPEARANCE SETTINGS SCHEMA
// ============================================================

/**
 * User appearance settings schema
 */
export const userAppearanceSettingsSchema = z.object({
  theme: userThemeSettingSchema,
  colorScheme: userColorSchemeSchema,
  dateFormat: userDateFormatSchema,
  timeFormat: userTimeFormatSchema,
  timezone: userTimezoneSettingSchema,
  fontSize: z.number().optional(),
  language: userLanguageSettingSchema,
});

// ============================================================
// USER PRIVACY SETTINGS SCHEMA
// ============================================================

/**
 * User privacy settings schema
 */
export const userPrivacySettingsSchema = z.object({
  profileVisibility: z.enum(['public', 'private', 'connections_only', 'admin_only']),
  emailVisibility: z.enum(['public', 'private', 'connections_only']),
  phoneVisibility: z.enum(['public', 'private', 'connections_only']),
  addressVisibility: z.enum(['public', 'private', 'connections_only']),
  activityVisibility: z.enum(['public', 'private', 'connections_only']),
  onlineStatusVisibility: z.enum(['public', 'private', 'connections_only']),
  allowSearchEngines: z.boolean().default(true),
  allowDataCollection: z.boolean().default(true),
});

// ============================================================
// USER SECURITY SETTINGS SCHEMA
// ============================================================

/**
 * User security settings schema
 */
export const userSecuritySettingsSchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  sessionTimeout: z.number().int().positive().default(86400),
  deviceManagement: z.boolean().default(true),
  loginAlerts: z.boolean().default(true),
  suspiciousActivityAlerts: z.boolean().default(true),
  passwordChangeInterval: z.number().int().positive().default(90),
  ipWhitelist: z.array(z.string().ip()).default([]),
  ipBlacklist: z.array(z.string().ip()).default([]),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserSettingsCategory = z.infer<typeof userSettingsCategorySchema>;
export type UserSettingsType = z.infer<typeof userSettingsTypeSchema>;
export type UserNotificationSetting = z.infer<typeof userNotificationSettingSchema>;
export type UserNotificationEvent = z.infer<typeof userNotificationEventSchema>;
export type UserLanguageSetting = z.infer<typeof userLanguageSettingSchema>;
export type UserThemeSetting = z.infer<typeof userThemeSettingSchema>;
export type UserColorScheme = z.infer<typeof userColorSchemeSchema>;
export type UserDateFormat = z.infer<typeof userDateFormatSchema>;
export type UserTimeFormat = z.infer<typeof userTimeFormatSchema>;
export type UserTimezoneSetting = z.infer<typeof userTimezoneSettingSchema>;
export type UserSettingRecord = z.infer<typeof userSettingRecordSchema>;
export type UserSettingUpdateRequest = z.infer<typeof userSettingUpdateRequestSchema>;
export type UserSettingBulkUpdateRequest = z.infer<typeof userSettingBulkUpdateRequestSchema>;
export type UserSettingResponse = z.infer<typeof userSettingResponseSchema>;
export type UserSettingFilter = z.infer<typeof userSettingFilterSchema>;
export type UserSettingsSummary = z.infer<typeof userSettingsSummarySchema>;
export type UserNotificationPreferences = z.infer<typeof userNotificationPreferencesSchema>;
export type UserAppearanceSettings = z.infer<typeof userAppearanceSettingsSchema>;
export type UserPrivacySettings = z.infer<typeof userPrivacySettingsSchema>;
export type UserSecuritySettings = z.infer<typeof userSecuritySettingsSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user settings category is valid
 */
export function isValidUserSettingsCategory(category: string): category is UserSettingsCategory {
  return Object.values(USER_SETTINGS_CATEGORY).includes(category as UserSettingsCategory);
}

/**
 * Check if user settings type is valid
 */
export function isValidUserSettingsType(type: string): type is UserSettingsType {
  return Object.values(USER_SETTINGS_TYPE).includes(type as UserSettingsType);
}

/**
 * Check if user notification setting is valid
 */
export function isValidUserNotificationSetting(
  setting: string
): setting is UserNotificationSetting {
  return Object.values(USER_NOTIFICATION_SETTINGS).includes(setting as UserNotificationSetting);
}

/**
 * Check if user notification event is valid
 */
export function isValidUserNotificationEvent(event: string): event is UserNotificationEvent {
  return Object.values(USER_NOTIFICATION_EVENT).includes(event as UserNotificationEvent);
}

/**
 * Check if user language setting is valid
 */
export function isValidUserLanguageSetting(lang: string): lang is UserLanguageSetting {
  return Object.values(USER_LANGUAGE_SETTINGS).includes(lang as UserLanguageSetting);
}

/**
 * Check if user theme setting is valid
 */
export function isValidUserThemeSetting(theme: string): theme is UserThemeSetting {
  return Object.values(USER_THEME_SETTINGS).includes(theme as UserThemeSetting);
}

/**
 * Check if user color scheme is valid
 */
export function isValidUserColorScheme(scheme: string): scheme is UserColorScheme {
  return Object.values(USER_COLOR_SCHEME).includes(scheme as UserColorScheme);
}

/**
 * Check if user date format is valid
 */
export function isValidUserDateFormat(format: string): format is UserDateFormat {
  return Object.values(USER_DATE_FORMAT).includes(format as UserDateFormat);
}

/**
 * Check if user time format is valid
 */
export function isValidUserTimeFormat(format: string): format is UserTimeFormat {
  return Object.values(USER_TIME_FORMAT).includes(format as UserTimeFormat);
}

/**
 * Get user settings category display name
 */
export function getUserSettingsCategoryDisplayName(category: UserSettingsCategory): string {
  const labels: Record<UserSettingsCategory, string> = {
    general: 'General Settings',
    account: 'Account Settings',
    notifications: 'Notification Settings',
    privacy: 'Privacy Settings',
    security: 'Security Settings',
    language: 'Language & Regional',
    appearance: 'Appearance & Theme',
    accessibility: 'Accessibility',
    data: 'Data & Storage',
    integration: 'Integration',
    billing: 'Billing & Payment',
  };
  return labels[category] || category;
}

/**
 * Get user language setting display name
 */
export function getUserLanguageSettingDisplayName(lang: UserLanguageSetting): string {
  const labels: Record<UserLanguageSetting, string> = {
    bn_BD: 'Bengali (Bangladesh)',
    en_US: 'English (United States)',
    en_GB: 'English (United Kingdom)',
    ar: 'Arabic',
    hi: 'Hindi',
    ur: 'Urdu',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    ja: 'Japanese',
    ko: 'Korean',
    zh_CN: 'Chinese (Simplified)',
    zh_TW: 'Chinese (Traditional)',
  };
  return labels[lang] || lang;
}

/**
 * Get user theme setting display name
 */
export function getUserThemeSettingDisplayName(theme: UserThemeSetting): string {
  const labels: Record<UserThemeSetting, string> = {
    light: 'Light',
    dark: 'Dark',
    system: 'System Default',
    high_contrast: 'High Contrast',
    sepia: 'Sepia',
  };
  return labels[theme] || theme;
}

/**
 * Get user color scheme display name
 */
export function getUserColorSchemeDisplayName(scheme: UserColorScheme): string {
  const labels: Record<UserColorScheme, string> = {
    default: 'Default',
    blue: 'Blue',
    green: 'Green',
    purple: 'Purple',
    orange: 'Orange',
    red: 'Red',
    pink: 'Pink',
    custom: 'Custom',
  };
  return labels[scheme] || scheme;
}

/**
 * Get user date format display name
 */
export function getUserDateFormatDisplayName(format: UserDateFormat): string {
  const labels: Record<UserDateFormat, string> = {
    'DD/MM/YYYY': 'DD/MM/YYYY',
    'MM/DD/YYYY': 'MM/DD/YYYY',
    'YYYY-MM-DD': 'YYYY-MM-DD',
    'DD-MMM-YYYY': 'DD-MMM-YYYY',
    'MMM DD, YYYY': 'MMM DD, YYYY',
  };
  return labels[format] || format;
}

/**
 * Get user time format display name
 */
export function getUserTimeFormatDisplayName(format: UserTimeFormat): string {
  const labels: Record<UserTimeFormat, string> = {
    '12h': '12-Hour (HH:MM AM/PM)',
    '24h': '24-Hour (HH:MM)',
  };
  return labels[format] || format;
}

/**
 * Get user timezone display name
 */
export function getUserTimezoneDisplayName(timezone: UserTimezoneSetting): string {
  const labels: Record<UserTimezoneSetting, string> = {
    UTC: 'UTC',
    'Asia/Dhaka': 'Dhaka',
    'America/New_York': 'New York',
    'Europe/London': 'London',
    'Europe/Paris': 'Paris',
    'Asia/Dubai': 'Dubai',
    'Asia/Singapore': 'Singapore',
    'Asia/Tokyo': 'Tokyo',
    'Australia/Sydney': 'Sydney',
    'America/Los_Angeles': 'Los Angeles',
    'America/Chicago': 'Chicago',
    'Europe/Istanbul': 'Istanbul',
    'Europe/Moscow': 'Moscow',
    'Asia/Shanghai': 'Beijing',
    'Asia/Karachi': 'Karachi',
    'Asia/Kolkata': 'Mumbai',
  };
  return labels[timezone] || timezone;
}

/**
 * Get user notification event display name
 */
export function getUserNotificationEventDisplayName(event: UserNotificationEvent): string {
  const labels: Record<UserNotificationEvent, string> = {
    account_update: 'Account Updated',
    password_change: 'Password Changed',
    login_alert: 'Login Alert',
    suspicious_login: 'Suspicious Login',
    profile_update: 'Profile Updated',
    profile_view: 'Profile Viewed',
    kyc_status_change: 'KYC Status Changed',
    kyc_approved: 'KYC Approved',
    kyc_rejected: 'KYC Rejected',
    verification_complete: 'Verification Complete',
    verification_failed: 'Verification Failed',
    new_activity: 'New Activity',
    activity_comment: 'Activity Comment',
    relationship_request: 'Relationship Request',
    relationship_accepted: 'Relationship Accepted',
    subscription_renewal: 'Subscription Renewal',
    subscription_expiry: 'Subscription Expiring',
    payment_success: 'Payment Success',
    payment_failed: 'Payment Failed',
    promotional_offer: 'Promotional Offer',
    newsletter: 'Newsletter',
  };
  return labels[event] || event;
}

/**
 * Get user notification setting display name
 */
export function getUserNotificationSettingDisplayName(setting: UserNotificationSetting): string {
  const labels: Record<UserNotificationSetting, string> = {
    email: 'Email Notifications',
    push: 'Push Notifications',
    sms: 'SMS Notifications',
    in_app: 'In-App Notifications',
  };
  return labels[setting] || setting;
}

/**
 * Get all user settings categories
 */
export function getAllUserSettingsCategories(): UserSettingsCategory[] {
  return Object.values(USER_SETTINGS_CATEGORY);
}

/**
 * Get all user languages
 */
export function getAllUserLanguages(): UserLanguageSetting[] {
  return Object.values(USER_LANGUAGE_SETTINGS);
}

/**
 * Get all user themes
 */
export function getAllUserThemes(): UserThemeSetting[] {
  return Object.values(USER_THEME_SETTINGS);
}

/**
 * Get all user color schemes
 */
export function getAllUserColorSchemes(): UserColorScheme[] {
  return Object.values(USER_COLOR_SCHEME);
}

/**
 * Get all user date formats
 */
export function getAllUserDateFormats(): UserDateFormat[] {
  return Object.values(USER_DATE_FORMAT);
}

/**
 * Get all user time formats
 */
export function getAllUserTimeFormats(): UserTimeFormat[] {
  return Object.values(USER_TIME_FORMAT);
}

/**
 * Get all user timezones
 */
export function getAllUserTimezones(): UserTimezoneSetting[] {
  return Object.values(USER_TIMEZONE_SETTINGS);
}

/**
 * Get all user notification events
 */
export function getAllUserNotificationEvents(): UserNotificationEvent[] {
  return Object.values(USER_NOTIFICATION_EVENT);
}

/**
 * Get all user notification settings
 */
export function getAllUserNotificationSettings(): UserNotificationSetting[] {
  return Object.values(USER_NOTIFICATION_SETTINGS);
}
