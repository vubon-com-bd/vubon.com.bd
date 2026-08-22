/**
 * User Settings Constants Index
 * Export all user settings-related constants and types
 */

// Core Settings Constants
export {
  USER_SETTINGS,
  getThemeLabel,
  getFrequencyLabel,
  getTwoFactorMethodLabel,
  getSessionTimeoutLabel,
  isTwoFactorEnabled,
  getDefaultNotificationSettings,
  getDefaultPrivacySettings,
  getDefaultSecuritySettings,
  getDefaultCommunicationSettings,
  getSessionTimeoutOptions,
  getTwoFactorMethods,
  getThemeOptions,
  getFrequencyOptions,
  isSecurePassword,
  // রিনেম করা ফাংশন
  isUserSettingsActive,
  isUserSettingsRestricted,
  canUserModifySettings,
} from './user-settings.constants';

export type {
  UserSettingsTheme,
  UserSettingsFrequency,
  TwoFactorMethod,
  SessionTimeout,
} from './user-settings.constants';

// Settings Type Constants
export {
  USER_SETTINGS_TYPE,
  USER_SETTINGS_TYPE_LABELS,
  USER_SETTINGS_TYPE_DESCRIPTIONS,
  PUBLIC_SETTINGS_TYPES,
  PRIVATE_SETTINGS_TYPES,
  isPublicSetting,
  isPrivateSetting,
  getSettingsTypeLabel,
  getSettingsTypeDescription,
  getSettingsTypeByCategory,
} from './user-settings-type.constants';

export type { UserSettingsType } from './user-settings-type.constants';

// Settings Status Constants
export {
  USER_SETTINGS_STATUS,
  USER_SETTINGS_STATUS_LABELS,
  USER_SETTINGS_STATUS_COLORS,
  ACTIVE_SETTINGS_STATUSES,
  INACTIVE_SETTINGS_STATUSES,
  RESTRICTED_SETTINGS_STATUSES,
  isSettingsActive,
  isSettingsRestricted,
  canModifySettings,
  getSettingsStatusLabel,
  getSettingsStatusColor,
} from './user-settings-status.constants';

export type { UserSettingsStatus } from './user-settings-status.constants';
