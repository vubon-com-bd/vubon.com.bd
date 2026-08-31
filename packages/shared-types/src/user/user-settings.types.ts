/**
 * User Settings Types
 * Types for user settings management
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
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
  USER_PRIVACY_SETTINGS,
  USER_SECURITY_SETTINGS,
  USER_ACCESSIBILITY_SETTINGS,
  USER_DATA_SETTINGS,
  USER_BILLING_SETTINGS,
  USER_SETTINGS_CATEGORY_LABELS,
  USER_LANGUAGE_SETTINGS_LABELS,
  USER_THEME_SETTINGS_LABELS,
  USER_COLOR_SCHEME_LABELS,
  USER_DATE_FORMAT_LABELS,
  USER_TIME_FORMAT_LABELS,
  USER_TIMEZONE_SETTINGS_LABELS,
  USER_NOTIFICATION_EVENT_LABELS,
  USER_NOTIFICATION_SETTINGS_LABELS,
  USER_PRIVACY_SETTINGS_LABELS,
  USER_SECURITY_SETTINGS_LABELS,
  USER_ACCESSIBILITY_SETTINGS_LABELS,
  USER_DATA_SETTINGS_LABELS,
  USER_BILLING_SETTINGS_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER SETTINGS TYPES
// ============================================================

/**
 * User settings category
 */
export type UserSettingsCategory =
  (typeof USER_SETTINGS_CATEGORY)[keyof typeof USER_SETTINGS_CATEGORY];

/**
 * User settings type
 */
export type UserSettingsType = (typeof USER_SETTINGS_TYPE)[keyof typeof USER_SETTINGS_TYPE];

/**
 * User notification setting
 */
export type UserNotificationSetting =
  (typeof USER_NOTIFICATION_SETTINGS)[keyof typeof USER_NOTIFICATION_SETTINGS];

/**
 * User notification event
 */
export type UserNotificationEvent =
  (typeof USER_NOTIFICATION_EVENT)[keyof typeof USER_NOTIFICATION_EVENT];

/**
 * User language setting
 */
export type UserLanguageSetting =
  (typeof USER_LANGUAGE_SETTINGS)[keyof typeof USER_LANGUAGE_SETTINGS];

/**
 * User theme setting
 */
export type UserThemeSetting = (typeof USER_THEME_SETTINGS)[keyof typeof USER_THEME_SETTINGS];

/**
 * User color scheme
 */
export type UserColorScheme = (typeof USER_COLOR_SCHEME)[keyof typeof USER_COLOR_SCHEME];

/**
 * User date format
 */
export type UserDateFormat = (typeof USER_DATE_FORMAT)[keyof typeof USER_DATE_FORMAT];

/**
 * User time format
 */
export type UserTimeFormat = (typeof USER_TIME_FORMAT)[keyof typeof USER_TIME_FORMAT];

/**
 * User timezone setting
 */
export type UserTimezoneSetting =
  (typeof USER_TIMEZONE_SETTINGS)[keyof typeof USER_TIMEZONE_SETTINGS];

/**
 * User privacy setting
 */
export type UserPrivacySetting = (typeof USER_PRIVACY_SETTINGS)[keyof typeof USER_PRIVACY_SETTINGS];

/**
 * User security setting
 */
export type UserSecuritySetting =
  (typeof USER_SECURITY_SETTINGS)[keyof typeof USER_SECURITY_SETTINGS];

/**
 * User accessibility setting
 */
export type UserAccessibilitySetting =
  (typeof USER_ACCESSIBILITY_SETTINGS)[keyof typeof USER_ACCESSIBILITY_SETTINGS];

/**
 * User data setting
 */
export type UserDataSetting = (typeof USER_DATA_SETTINGS)[keyof typeof USER_DATA_SETTINGS];

/**
 * User billing setting
 */
export type UserBillingSetting = (typeof USER_BILLING_SETTINGS)[keyof typeof USER_BILLING_SETTINGS];

// ============================================================
// USER SETTING RECORD
// ============================================================

/**
 * User setting record
 */
export interface UserSettingRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Setting key */
  key: string;
  /** Setting value */
  value: unknown;
  /** Setting type */
  type: UserSettingsType;
  /** Setting category */
  category: UserSettingsCategory;
  /** Whether this is a system default */
  isDefault: boolean;
  /** Whether this is active */
  isActive: boolean;
  /** When the setting was set */
  setAt: Timestamp;
  /** When the setting was last updated */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER SETTINGS REQUEST
// ============================================================

/**
 * User setting update request
 */
export interface UserSettingUpdateRequest {
  /** User ID */
  userId: ID;
  /** Setting key */
  key: string;
  /** Setting value */
  value: unknown;
  /** Setting category (optional) */
  category?: UserSettingsCategory;
}

/**
 * User setting bulk update request
 */
export interface UserSettingBulkUpdateRequest {
  /** User ID */
  userId: ID;
  /** Settings to update */
  settings: {
    key: string;
    value: unknown;
    category?: UserSettingsCategory;
  }[];
}

// ============================================================
// USER SETTINGS RESPONSE
// ============================================================

/**
 * User setting response
 */
export interface UserSettingResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Setting record if successful */
  setting?: UserSettingRecord;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// USER SETTINGS FILTER
// ============================================================

/**
 * User setting filter
 */
export interface UserSettingFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by setting category */
  category?: UserSettingsCategory | UserSettingsCategory[];
  /** Filter by setting type */
  type?: UserSettingsType | UserSettingsType[];
  /** Filter by default settings only */
  defaultOnly?: boolean;
  /** Filter by active settings only */
  activeOnly?: boolean;
  /** Search by key */
  search?: string;
}

// ============================================================
// USER SETTINGS SUMMARY
// ============================================================

/**
 * User settings summary
 */
export interface UserSettingsSummary {
  /** User ID */
  userId: ID;
  /** Total settings */
  totalSettings: number;
  /** Active settings */
  activeSettings: number;
  /** Default settings */
  defaultSettings: number;
  /** Settings by category */
  settingsByCategory: Record<UserSettingsCategory, number>;
  /** Settings by type */
  settingsByType: Record<UserSettingsType, number>;
  /** All settings */
  settings: UserSettingRecord[];
}

// ============================================================
// USER NOTIFICATION PREFERENCES
// ============================================================

/**
 * User notification preferences
 */
export interface UserNotificationPreferences {
  /** Notification methods enabled */
  methods: UserNotificationSetting[];
  /** Events subscribed to */
  subscribedEvents: UserNotificationEvent[];
  /** Email notifications enabled */
  emailEnabled: boolean;
  /** Push notifications enabled */
  pushEnabled: boolean;
  /** SMS notifications enabled */
  smsEnabled: boolean;
  /** In-app notifications enabled */
  inAppEnabled: boolean;
}

// ============================================================
// USER APPEARANCE SETTINGS
// ============================================================

/**
 * User appearance settings
 */
export interface UserAppearanceSettings {
  /** Theme */
  theme: UserThemeSetting;
  /** Color scheme */
  colorScheme: UserColorScheme;
  /** Date format */
  dateFormat: UserDateFormat;
  /** Time format */
  timeFormat: UserTimeFormat;
  /** Timezone */
  timezone: UserTimezoneSetting;
  /** Font size */
  fontSize?: number;
  /** Language */
  language: UserLanguageSetting;
}

// ============================================================
// USER PRIVACY SETTINGS
// ============================================================

/**
 * User privacy settings
 */
export interface UserPrivacySettings {
  /** Profile visibility */
  profileVisibility: 'public' | 'private' | 'connections_only' | 'admin_only';
  /** Email visibility */
  emailVisibility: 'public' | 'private' | 'connections_only';
  /** Phone visibility */
  phoneVisibility: 'public' | 'private' | 'connections_only';
  /** Address visibility */
  addressVisibility: 'public' | 'private' | 'connections_only';
  /** Activity visibility */
  activityVisibility: 'public' | 'private' | 'connections_only';
  /** Online status visibility */
  onlineStatusVisibility: 'public' | 'private' | 'connections_only';
  /** Allow search engines */
  allowSearchEngines: boolean;
  /** Allow data collection */
  allowDataCollection: boolean;
}

// ============================================================
// USER SECURITY SETTINGS
// ============================================================

/**
 * User security settings
 */
export interface UserSecuritySettings {
  /** Two-factor authentication enabled */
  twoFactorAuth: boolean;
  /** Session timeout in seconds */
  sessionTimeout: number;
  /** Device management enabled */
  deviceManagement: boolean;
  /** Login alerts enabled */
  loginAlerts: boolean;
  /** Suspicious activity alerts enabled */
  suspiciousActivityAlerts: boolean;
  /** Password change interval in days */
  passwordChangeInterval: number;
  /** IP whitelist */
  ipWhitelist: string[];
  /** IP blacklist */
  ipBlacklist: string[];
}

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
  return USER_SETTINGS_CATEGORY_LABELS[category] || category;
}

/**
 * Get user language setting display name
 */
export function getUserLanguageSettingDisplayName(lang: UserLanguageSetting): string {
  return USER_LANGUAGE_SETTINGS_LABELS[lang] || lang;
}

/**
 * Get user theme setting display name
 */
export function getUserThemeSettingDisplayName(theme: UserThemeSetting): string {
  return USER_THEME_SETTINGS_LABELS[theme] || theme;
}

/**
 * Get user color scheme display name
 */
export function getUserColorSchemeDisplayName(scheme: UserColorScheme): string {
  return USER_COLOR_SCHEME_LABELS[scheme] || scheme;
}

/**
 * Get user date format display name
 */
export function getUserDateFormatDisplayName(format: UserDateFormat): string {
  return USER_DATE_FORMAT_LABELS[format] || format;
}

/**
 * Get user time format display name
 */
export function getUserTimeFormatDisplayName(format: UserTimeFormat): string {
  return USER_TIME_FORMAT_LABELS[format] || format;
}

/**
 * Get user timezone display name
 */
export function getUserTimezoneDisplayName(timezone: UserTimezoneSetting): string {
  return USER_TIMEZONE_SETTINGS_LABELS[timezone] || timezone;
}

/**
 * Get user notification event display name
 */
export function getUserNotificationEventDisplayName(event: UserNotificationEvent): string {
  return USER_NOTIFICATION_EVENT_LABELS[event] || event;
}

/**
 * Get user notification setting display name
 */
export function getUserNotificationSettingDisplayName(setting: UserNotificationSetting): string {
  return USER_NOTIFICATION_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user privacy setting display name
 */
export function getUserPrivacySettingDisplayName(setting: UserPrivacySetting): string {
  return USER_PRIVACY_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user security setting display name
 */
export function getUserSecuritySettingDisplayName(setting: UserSecuritySetting): string {
  return USER_SECURITY_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user accessibility setting display name
 */
export function getUserAccessibilitySettingDisplayName(setting: UserAccessibilitySetting): string {
  return USER_ACCESSIBILITY_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user data setting display name
 */
export function getUserDataSettingDisplayName(setting: UserDataSetting): string {
  return USER_DATA_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user billing setting display name
 */
export function getUserBillingSettingDisplayName(setting: UserBillingSetting): string {
  return USER_BILLING_SETTINGS_LABELS[setting] || setting;
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

/**
 * Get all user privacy settings
 */
export function getAllUserPrivacySettings(): UserPrivacySetting[] {
  return Object.values(USER_PRIVACY_SETTINGS);
}

/**
 * Get all user security settings
 */
export function getAllUserSecuritySettings(): UserSecuritySetting[] {
  return Object.values(USER_SECURITY_SETTINGS);
}

/**
 * Get all user accessibility settings
 */
export function getAllUserAccessibilitySettings(): UserAccessibilitySetting[] {
  return Object.values(USER_ACCESSIBILITY_SETTINGS);
}

/**
 * Get all user data settings
 */
export function getAllUserDataSettings(): UserDataSetting[] {
  return Object.values(USER_DATA_SETTINGS);
}

/**
 * Get all user billing settings
 */
export function getAllUserBillingSettings(): UserBillingSetting[] {
  return Object.values(USER_BILLING_SETTINGS);
}
