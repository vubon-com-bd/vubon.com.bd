/**
 * User Settings Constants
 * All possible user settings and configurations in the system
 * Imports common values where applicable
 */

/**
 * User settings categories
 * Groups of settings by functional area
 */
export const USER_SETTINGS_CATEGORY = {
  /** General application settings */
  GENERAL: 'general',
  /** Account-related settings */
  ACCOUNT: 'account',
  /** Notification settings */
  NOTIFICATIONS: 'notifications',
  /** Privacy settings */
  PRIVACY: 'privacy',
  /** Security settings */
  SECURITY: 'security',
  /** Language and regional settings */
  LANGUAGE: 'language',
  /** Appearance and theme settings */
  APPEARANCE: 'appearance',
  /** Accessibility settings */
  ACCESSIBILITY: 'accessibility',
  /** Data and storage settings */
  DATA: 'data',
  /** Integration settings */
  INTEGRATION: 'integration',
  /** Billing and payment settings */
  BILLING: 'billing',
} as const;

/**
 * User settings types
 * Types of settings values
 */
export const USER_SETTINGS_TYPE = {
  /** Boolean/checkbox setting */
  BOOLEAN: 'boolean',
  /** String/text setting */
  STRING: 'string',
  /** Number setting */
  NUMBER: 'number',
  /** Select/choice setting */
  SELECT: 'select',
  /** Multi-select setting */
  MULTI_SELECT: 'multi_select',
  /** Color setting */
  COLOR: 'color',
  /** File upload setting */
  FILE: 'file',
  /** JSON object setting */
  JSON: 'json',
  /** Array setting */
  ARRAY: 'array',
  /** Date setting */
  DATE: 'date',
  /** Time setting */
  TIME: 'time',
  /** DateTime setting */
  DATETIME: 'datetime',
} as const;

/**
 * User notification settings
 * Notification preferences for different events
 */
export const USER_NOTIFICATION_SETTINGS = {
  /** Email notifications */
  EMAIL: 'email',
  /** Push notifications */
  PUSH: 'push',
  /** SMS notifications */
  SMS: 'sms',
  /** In-app notifications */
  IN_APP: 'in_app',
} as const;

/**
 * User notification events
 * Events that can trigger notifications
 */
export const USER_NOTIFICATION_EVENT = {
  /** Account-related events */
  ACCOUNT_UPDATE: 'account_update',
  PASSWORD_CHANGE: 'password_change',
  LOGIN_ALERT: 'login_alert',
  SUSPICIOUS_LOGIN: 'suspicious_login',

  /** Profile-related events */
  PROFILE_UPDATE: 'profile_update',
  PROFILE_VIEW: 'profile_view',

  /** KYC events */
  KYC_STATUS_CHANGE: 'kyc_status_change',
  KYC_APPROVED: 'kyc_approved',
  KYC_REJECTED: 'kyc_rejected',

  /** Verification events */
  VERIFICATION_COMPLETE: 'verification_complete',
  VERIFICATION_FAILED: 'verification_failed',

  /** Activity events */
  NEW_ACTIVITY: 'new_activity',
  ACTIVITY_COMMENT: 'activity_comment',

  /** Relationship events */
  RELATIONSHIP_REQUEST: 'relationship_request',
  RELATIONSHIP_ACCEPTED: 'relationship_accepted',

  /** Subscription events */
  SUBSCRIPTION_RENEWAL: 'subscription_renewal',
  SUBSCRIPTION_EXPIRY: 'subscription_expiry',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',

  /** Marketing events */
  PROMOTIONAL_OFFER: 'promotional_offer',
  NEWSLETTER: 'newsletter',
} as const;

/**
 * User language settings
 * Supported languages
 */
export const USER_LANGUAGE_SETTINGS = {
  /** Bengali (Bangladesh) */
  BN_BD: 'bn_BD',
  /** English (United States) */
  EN_US: 'en_US',
  /** English (United Kingdom) */
  EN_GB: 'en_GB',
  /** Arabic */
  AR: 'ar',
  /** Hindi */
  HI: 'hi',
  /** Urdu */
  UR: 'ur',
  /** Spanish */
  ES: 'es',
  /** French */
  FR: 'fr',
  /** German */
  DE: 'de',
  /** Italian */
  IT: 'it',
  /** Portuguese */
  PT: 'pt',
  /** Russian */
  RU: 'ru',
  /** Japanese */
  JA: 'ja',
  /** Korean */
  KO: 'ko',
  /** Chinese Simplified */
  ZH_CN: 'zh_CN',
  /** Chinese Traditional */
  ZH_TW: 'zh_TW',
} as const;

/**
 * User theme settings
 * Appearance themes
 */
export const USER_THEME_SETTINGS = {
  /** Light theme */
  LIGHT: 'light',
  /** Dark theme */
  DARK: 'dark',
  /** System default */
  SYSTEM: 'system',
  /** High contrast */
  HIGH_CONTRAST: 'high_contrast',
  /** Sepia */
  SEPIA: 'sepia',
} as const;

/**
 * User color scheme settings
 * Color schemes for UI
 */
export const USER_COLOR_SCHEME = {
  /** Default/standard colors */
  DEFAULT: 'default',
  /** Blue theme */
  BLUE: 'blue',
  /** Green theme */
  GREEN: 'green',
  /** Purple theme */
  PURPLE: 'purple',
  /** Orange theme */
  ORANGE: 'orange',
  /** Red theme */
  RED: 'red',
  /** Pink theme */
  PINK: 'pink',
  /** Custom colors */
  CUSTOM: 'custom',
} as const;

/**
 * User date format settings
 */
export const USER_DATE_FORMAT = {
  /** DD/MM/YYYY */
  DD_MM_YYYY: 'DD/MM/YYYY',
  /** MM/DD/YYYY */
  MM_DD_YYYY: 'MM/DD/YYYY',
  /** YYYY-MM-DD */
  YYYY_MM_DD: 'YYYY-MM-DD',
  /** DD-MMM-YYYY */
  DD_MMM_YYYY: 'DD-MMM-YYYY',
  /** MMM DD, YYYY */
  MMM_DD_YYYY: 'MMM DD, YYYY',
} as const;

/**
 * User time format settings
 */
export const USER_TIME_FORMAT = {
  /** 12-hour format (HH:MM AM/PM) */
  HOUR_12: '12h',
  /** 24-hour format (HH:MM) */
  HOUR_24: '24h',
} as const;

/**
 * User timezone settings
 */
export const USER_TIMEZONE_SETTINGS = {
  UTC: 'UTC',
  DHAKA: 'Asia/Dhaka',
  NEW_YORK: 'America/New_York',
  LONDON: 'Europe/London',
  PARIS: 'Europe/Paris',
  DUBAI: 'Asia/Dubai',
  SINGAPORE: 'Asia/Singapore',
  TOKYO: 'Asia/Tokyo',
  SYDNEY: 'Australia/Sydney',
  LOS_ANGELES: 'America/Los_Angeles',
  CHICAGO: 'America/Chicago',
  ISTANBUL: 'Europe/Istanbul',
  MOSCOW: 'Europe/Moscow',
  BEIJING: 'Asia/Shanghai',
  KARACHI: 'Asia/Karachi',
  MUMBAI: 'Asia/Kolkata',
} as const;

/**
 * User privacy settings
 * Privacy-related settings
 */
export const USER_PRIVACY_SETTINGS = {
  /** Profile visibility */
  PROFILE_VISIBILITY: 'profile_visibility',
  /** Email visibility */
  EMAIL_VISIBILITY: 'email_visibility',
  /** Phone visibility */
  PHONE_VISIBILITY: 'phone_visibility',
  /** Address visibility */
  ADDRESS_VISIBILITY: 'address_visibility',
  /** Activity visibility */
  ACTIVITY_VISIBILITY: 'activity_visibility',
  /** Online status visibility */
  ONLINE_STATUS_VISIBILITY: 'online_status_visibility',
  /** Allow search engines */
  ALLOW_SEARCH_ENGINES: 'allow_search_engines',
  /** Allow data collection */
  ALLOW_DATA_COLLECTION: 'allow_data_collection',
} as const;

/**
 * User security settings
 * Security-related settings
 */
export const USER_SECURITY_SETTINGS = {
  /** Two-factor authentication */
  TWO_FACTOR_AUTH: 'two_factor_auth',
  /** Session timeout */
  SESSION_TIMEOUT: 'session_timeout',
  /** Device management */
  DEVICE_MANAGEMENT: 'device_management',
  /** Login alerts */
  LOGIN_ALERTS: 'login_alerts',
  /** Suspicious activity alerts */
  SUSPICIOUS_ACTIVITY_ALERTS: 'suspicious_activity_alerts',
  /** Password change interval */
  PASSWORD_CHANGE_INTERVAL: 'password_change_interval',
  /** IP whitelist */
  IP_WHITELIST: 'ip_whitelist',
  /** IP blacklist */
  IP_BLACKLIST: 'ip_blacklist',
} as const;

/**
 * User accessibility settings
 * Accessibility-related settings
 */
export const USER_ACCESSIBILITY_SETTINGS = {
  /** Screen reader support */
  SCREEN_READER: 'screen_reader',
  /** High contrast mode */
  HIGH_CONTRAST: 'high_contrast',
  /** Font size */
  FONT_SIZE: 'font_size',
  /** Reduced motion */
  REDUCED_MOTION: 'reduced_motion',
  /** Keyboard navigation */
  KEYBOARD_NAVIGATION: 'keyboard_navigation',
  /** Color blind mode */
  COLOR_BLIND_MODE: 'color_blind_mode',
} as const;

/**
 * User data settings
 * Data-related settings
 */
export const USER_DATA_SETTINGS = {
  /** Data export */
  DATA_EXPORT: 'data_export',
  /** Data deletion */
  DATA_DELETION: 'data_deletion',
  /** Data anonymization */
  DATA_ANONYMIZATION: 'data_anonymization',
  /** Data retention period */
  DATA_RETENTION_PERIOD: 'data_retention_period',
  /** Download my data */
  DOWNLOAD_MY_DATA: 'download_my_data',
} as const;

/**
 * User billing settings
 * Billing and payment settings
 */
export const USER_BILLING_SETTINGS = {
  /** Payment methods */
  PAYMENT_METHODS: 'payment_methods',
  /** Default payment method */
  DEFAULT_PAYMENT_METHOD: 'default_payment_method',
  /** Billing address */
  BILLING_ADDRESS: 'billing_address',
  /** Tax information */
  TAX_INFORMATION: 'tax_information',
  /** Invoice preferences */
  INVOICE_PREFERENCES: 'invoice_preferences',
  /** Currency preference */
  CURRENCY_PREFERENCE: 'currency_preference',
} as const;

/**
 * User settings labels
 * Human-readable labels for UI
 */
export const USER_SETTINGS_CATEGORY_LABELS: Record<string, string> = {
  [USER_SETTINGS_CATEGORY.GENERAL]: 'General Settings',
  [USER_SETTINGS_CATEGORY.ACCOUNT]: 'Account Settings',
  [USER_SETTINGS_CATEGORY.NOTIFICATIONS]: 'Notification Settings',
  [USER_SETTINGS_CATEGORY.PRIVACY]: 'Privacy Settings',
  [USER_SETTINGS_CATEGORY.SECURITY]: 'Security Settings',
  [USER_SETTINGS_CATEGORY.LANGUAGE]: 'Language & Regional',
  [USER_SETTINGS_CATEGORY.APPEARANCE]: 'Appearance & Theme',
  [USER_SETTINGS_CATEGORY.ACCESSIBILITY]: 'Accessibility',
  [USER_SETTINGS_CATEGORY.DATA]: 'Data & Storage',
  [USER_SETTINGS_CATEGORY.INTEGRATION]: 'Integration',
  [USER_SETTINGS_CATEGORY.BILLING]: 'Billing & Payment',
};

/**
 * User language labels
 */
export const USER_LANGUAGE_SETTINGS_LABELS: Record<string, string> = {
  [USER_LANGUAGE_SETTINGS.BN_BD]: 'Bengali (Bangladesh)',
  [USER_LANGUAGE_SETTINGS.EN_US]: 'English (United States)',
  [USER_LANGUAGE_SETTINGS.EN_GB]: 'English (United Kingdom)',
  [USER_LANGUAGE_SETTINGS.AR]: 'Arabic',
  [USER_LANGUAGE_SETTINGS.HI]: 'Hindi',
  [USER_LANGUAGE_SETTINGS.UR]: 'Urdu',
  [USER_LANGUAGE_SETTINGS.ES]: 'Spanish',
  [USER_LANGUAGE_SETTINGS.FR]: 'French',
  [USER_LANGUAGE_SETTINGS.DE]: 'German',
  [USER_LANGUAGE_SETTINGS.IT]: 'Italian',
  [USER_LANGUAGE_SETTINGS.PT]: 'Portuguese',
  [USER_LANGUAGE_SETTINGS.RU]: 'Russian',
  [USER_LANGUAGE_SETTINGS.JA]: 'Japanese',
  [USER_LANGUAGE_SETTINGS.KO]: 'Korean',
  [USER_LANGUAGE_SETTINGS.ZH_CN]: 'Chinese (Simplified)',
  [USER_LANGUAGE_SETTINGS.ZH_TW]: 'Chinese (Traditional)',
};

/**
 * User theme labels
 */
export const USER_THEME_SETTINGS_LABELS: Record<string, string> = {
  [USER_THEME_SETTINGS.LIGHT]: 'Light',
  [USER_THEME_SETTINGS.DARK]: 'Dark',
  [USER_THEME_SETTINGS.SYSTEM]: 'System Default',
  [USER_THEME_SETTINGS.HIGH_CONTRAST]: 'High Contrast',
  [USER_THEME_SETTINGS.SEPIA]: 'Sepia',
};

/**
 * User color scheme labels
 */
export const USER_COLOR_SCHEME_LABELS: Record<string, string> = {
  [USER_COLOR_SCHEME.DEFAULT]: 'Default',
  [USER_COLOR_SCHEME.BLUE]: 'Blue',
  [USER_COLOR_SCHEME.GREEN]: 'Green',
  [USER_COLOR_SCHEME.PURPLE]: 'Purple',
  [USER_COLOR_SCHEME.ORANGE]: 'Orange',
  [USER_COLOR_SCHEME.RED]: 'Red',
  [USER_COLOR_SCHEME.PINK]: 'Pink',
  [USER_COLOR_SCHEME.CUSTOM]: 'Custom',
};

/**
 * User date format labels
 */
export const USER_DATE_FORMAT_LABELS: Record<string, string> = {
  [USER_DATE_FORMAT.DD_MM_YYYY]: 'DD/MM/YYYY',
  [USER_DATE_FORMAT.MM_DD_YYYY]: 'MM/DD/YYYY',
  [USER_DATE_FORMAT.YYYY_MM_DD]: 'YYYY-MM-DD',
  [USER_DATE_FORMAT.DD_MMM_YYYY]: 'DD-MMM-YYYY',
  [USER_DATE_FORMAT.MMM_DD_YYYY]: 'MMM DD, YYYY',
};

/**
 * User time format labels
 */
export const USER_TIME_FORMAT_LABELS: Record<string, string> = {
  [USER_TIME_FORMAT.HOUR_12]: '12-Hour (HH:MM AM/PM)',
  [USER_TIME_FORMAT.HOUR_24]: '24-Hour (HH:MM)',
};

/**
 * User timezone labels
 */
export const USER_TIMEZONE_SETTINGS_LABELS: Record<string, string> = {
  [USER_TIMEZONE_SETTINGS.UTC]: 'UTC',
  [USER_TIMEZONE_SETTINGS.DHAKA]: 'Dhaka',
  [USER_TIMEZONE_SETTINGS.NEW_YORK]: 'New York',
  [USER_TIMEZONE_SETTINGS.LONDON]: 'London',
  [USER_TIMEZONE_SETTINGS.PARIS]: 'Paris',
  [USER_TIMEZONE_SETTINGS.DUBAI]: 'Dubai',
  [USER_TIMEZONE_SETTINGS.SINGAPORE]: 'Singapore',
  [USER_TIMEZONE_SETTINGS.TOKYO]: 'Tokyo',
  [USER_TIMEZONE_SETTINGS.SYDNEY]: 'Sydney',
  [USER_TIMEZONE_SETTINGS.LOS_ANGELES]: 'Los Angeles',
  [USER_TIMEZONE_SETTINGS.CHICAGO]: 'Chicago',
  [USER_TIMEZONE_SETTINGS.ISTANBUL]: 'Istanbul',
  [USER_TIMEZONE_SETTINGS.MOSCOW]: 'Moscow',
  [USER_TIMEZONE_SETTINGS.BEIJING]: 'Beijing',
  [USER_TIMEZONE_SETTINGS.KARACHI]: 'Karachi',
  [USER_TIMEZONE_SETTINGS.MUMBAI]: 'Mumbai',
};

/**
 * User notification event labels
 */
export const USER_NOTIFICATION_EVENT_LABELS: Record<string, string> = {
  [USER_NOTIFICATION_EVENT.ACCOUNT_UPDATE]: 'Account Updated',
  [USER_NOTIFICATION_EVENT.PASSWORD_CHANGE]: 'Password Changed',
  [USER_NOTIFICATION_EVENT.LOGIN_ALERT]: 'Login Alert',
  [USER_NOTIFICATION_EVENT.SUSPICIOUS_LOGIN]: 'Suspicious Login',
  [USER_NOTIFICATION_EVENT.PROFILE_UPDATE]: 'Profile Updated',
  [USER_NOTIFICATION_EVENT.PROFILE_VIEW]: 'Profile Viewed',
  [USER_NOTIFICATION_EVENT.KYC_STATUS_CHANGE]: 'KYC Status Changed',
  [USER_NOTIFICATION_EVENT.KYC_APPROVED]: 'KYC Approved',
  [USER_NOTIFICATION_EVENT.KYC_REJECTED]: 'KYC Rejected',
  [USER_NOTIFICATION_EVENT.VERIFICATION_COMPLETE]: 'Verification Complete',
  [USER_NOTIFICATION_EVENT.VERIFICATION_FAILED]: 'Verification Failed',
  [USER_NOTIFICATION_EVENT.NEW_ACTIVITY]: 'New Activity',
  [USER_NOTIFICATION_EVENT.ACTIVITY_COMMENT]: 'Activity Comment',
  [USER_NOTIFICATION_EVENT.RELATIONSHIP_REQUEST]: 'Relationship Request',
  [USER_NOTIFICATION_EVENT.RELATIONSHIP_ACCEPTED]: 'Relationship Accepted',
  [USER_NOTIFICATION_EVENT.SUBSCRIPTION_RENEWAL]: 'Subscription Renewal',
  [USER_NOTIFICATION_EVENT.SUBSCRIPTION_EXPIRY]: 'Subscription Expiring',
  [USER_NOTIFICATION_EVENT.PAYMENT_SUCCESS]: 'Payment Success',
  [USER_NOTIFICATION_EVENT.PAYMENT_FAILED]: 'Payment Failed',
  [USER_NOTIFICATION_EVENT.PROMOTIONAL_OFFER]: 'Promotional Offer',
  [USER_NOTIFICATION_EVENT.NEWSLETTER]: 'Newsletter',
};

/**
 * User notification setting labels
 */
export const USER_NOTIFICATION_SETTINGS_LABELS: Record<string, string> = {
  [USER_NOTIFICATION_SETTINGS.EMAIL]: 'Email Notifications',
  [USER_NOTIFICATION_SETTINGS.PUSH]: 'Push Notifications',
  [USER_NOTIFICATION_SETTINGS.SMS]: 'SMS Notifications',
  [USER_NOTIFICATION_SETTINGS.IN_APP]: 'In-App Notifications',
};

/**
 * User privacy setting labels
 */
export const USER_PRIVACY_SETTINGS_LABELS: Record<string, string> = {
  [USER_PRIVACY_SETTINGS.PROFILE_VISIBILITY]: 'Profile Visibility',
  [USER_PRIVACY_SETTINGS.EMAIL_VISIBILITY]: 'Email Visibility',
  [USER_PRIVACY_SETTINGS.PHONE_VISIBILITY]: 'Phone Visibility',
  [USER_PRIVACY_SETTINGS.ADDRESS_VISIBILITY]: 'Address Visibility',
  [USER_PRIVACY_SETTINGS.ACTIVITY_VISIBILITY]: 'Activity Visibility',
  [USER_PRIVACY_SETTINGS.ONLINE_STATUS_VISIBILITY]: 'Online Status Visibility',
  [USER_PRIVACY_SETTINGS.ALLOW_SEARCH_ENGINES]: 'Allow Search Engines',
  [USER_PRIVACY_SETTINGS.ALLOW_DATA_COLLECTION]: 'Allow Data Collection',
};

/**
 * User security setting labels
 */
export const USER_SECURITY_SETTINGS_LABELS: Record<string, string> = {
  [USER_SECURITY_SETTINGS.TWO_FACTOR_AUTH]: 'Two-Factor Authentication',
  [USER_SECURITY_SETTINGS.SESSION_TIMEOUT]: 'Session Timeout',
  [USER_SECURITY_SETTINGS.DEVICE_MANAGEMENT]: 'Device Management',
  [USER_SECURITY_SETTINGS.LOGIN_ALERTS]: 'Login Alerts',
  [USER_SECURITY_SETTINGS.SUSPICIOUS_ACTIVITY_ALERTS]: 'Suspicious Activity Alerts',
  [USER_SECURITY_SETTINGS.PASSWORD_CHANGE_INTERVAL]: 'Password Change Interval',
  [USER_SECURITY_SETTINGS.IP_WHITELIST]: 'IP Whitelist',
  [USER_SECURITY_SETTINGS.IP_BLACKLIST]: 'IP Blacklist',
};

/**
 * User accessibility setting labels
 */
export const USER_ACCESSIBILITY_SETTINGS_LABELS: Record<string, string> = {
  [USER_ACCESSIBILITY_SETTINGS.SCREEN_READER]: 'Screen Reader Support',
  [USER_ACCESSIBILITY_SETTINGS.HIGH_CONTRAST]: 'High Contrast Mode',
  [USER_ACCESSIBILITY_SETTINGS.FONT_SIZE]: 'Font Size',
  [USER_ACCESSIBILITY_SETTINGS.REDUCED_MOTION]: 'Reduced Motion',
  [USER_ACCESSIBILITY_SETTINGS.KEYBOARD_NAVIGATION]: 'Keyboard Navigation',
  [USER_ACCESSIBILITY_SETTINGS.COLOR_BLIND_MODE]: 'Color Blind Mode',
};

/**
 * User data setting labels
 */
export const USER_DATA_SETTINGS_LABELS: Record<string, string> = {
  [USER_DATA_SETTINGS.DATA_EXPORT]: 'Data Export',
  [USER_DATA_SETTINGS.DATA_DELETION]: 'Data Deletion',
  [USER_DATA_SETTINGS.DATA_ANONYMIZATION]: 'Data Anonymization',
  [USER_DATA_SETTINGS.DATA_RETENTION_PERIOD]: 'Data Retention Period',
  [USER_DATA_SETTINGS.DOWNLOAD_MY_DATA]: 'Download My Data',
};

/**
 * User billing setting labels
 */
export const USER_BILLING_SETTINGS_LABELS: Record<string, string> = {
  [USER_BILLING_SETTINGS.PAYMENT_METHODS]: 'Payment Methods',
  [USER_BILLING_SETTINGS.DEFAULT_PAYMENT_METHOD]: 'Default Payment Method',
  [USER_BILLING_SETTINGS.BILLING_ADDRESS]: 'Billing Address',
  [USER_BILLING_SETTINGS.TAX_INFORMATION]: 'Tax Information',
  [USER_BILLING_SETTINGS.INVOICE_PREFERENCES]: 'Invoice Preferences',
  [USER_BILLING_SETTINGS.CURRENCY_PREFERENCE]: 'Currency Preference',
};

/**
 * Check if user settings category is valid
 */
export function isValidUserSettingsCategory(category: string): boolean {
  return Object.values(USER_SETTINGS_CATEGORY).includes(
    category as (typeof USER_SETTINGS_CATEGORY)[keyof typeof USER_SETTINGS_CATEGORY]
  );
}

/**
 * Check if user settings type is valid
 */
export function isValidUserSettingsType(type: string): boolean {
  return Object.values(USER_SETTINGS_TYPE).includes(
    type as (typeof USER_SETTINGS_TYPE)[keyof typeof USER_SETTINGS_TYPE]
  );
}

/**
 * Check if user notification setting is valid
 */
export function isValidUserNotificationSetting(setting: string): boolean {
  return Object.values(USER_NOTIFICATION_SETTINGS).includes(
    setting as (typeof USER_NOTIFICATION_SETTINGS)[keyof typeof USER_NOTIFICATION_SETTINGS]
  );
}

/**
 * Check if user notification event is valid
 */
export function isValidUserNotificationEvent(event: string): boolean {
  return Object.values(USER_NOTIFICATION_EVENT).includes(
    event as (typeof USER_NOTIFICATION_EVENT)[keyof typeof USER_NOTIFICATION_EVENT]
  );
}

/**
 * Check if user language setting is valid
 */
export function isValidUserLanguageSetting(lang: string): boolean {
  return Object.values(USER_LANGUAGE_SETTINGS).includes(
    lang as (typeof USER_LANGUAGE_SETTINGS)[keyof typeof USER_LANGUAGE_SETTINGS]
  );
}

/**
 * Check if user theme setting is valid
 */
export function isValidUserThemeSetting(theme: string): boolean {
  return Object.values(USER_THEME_SETTINGS).includes(
    theme as (typeof USER_THEME_SETTINGS)[keyof typeof USER_THEME_SETTINGS]
  );
}

/**
 * Check if user color scheme is valid
 */
export function isValidUserColorScheme(scheme: string): boolean {
  return Object.values(USER_COLOR_SCHEME).includes(
    scheme as (typeof USER_COLOR_SCHEME)[keyof typeof USER_COLOR_SCHEME]
  );
}

/**
 * Check if user date format is valid
 */
export function isValidUserDateFormat(format: string): boolean {
  return Object.values(USER_DATE_FORMAT).includes(
    format as (typeof USER_DATE_FORMAT)[keyof typeof USER_DATE_FORMAT]
  );
}

/**
 * Check if user time format is valid
 */
export function isValidUserTimeFormat(format: string): boolean {
  return Object.values(USER_TIME_FORMAT).includes(
    format as (typeof USER_TIME_FORMAT)[keyof typeof USER_TIME_FORMAT]
  );
}

/**
 * Get user settings category label
 */
export function getUserSettingsCategoryLabel(category: string): string {
  return USER_SETTINGS_CATEGORY_LABELS[category] || category;
}

/**
 * Get user language setting label
 */
export function getUserLanguageSettingLabel(lang: string): string {
  return USER_LANGUAGE_SETTINGS_LABELS[lang] || lang;
}

/**
 * Get user theme setting label
 */
export function getUserThemeSettingLabel(theme: string): string {
  return USER_THEME_SETTINGS_LABELS[theme] || theme;
}

/**
 * Get user color scheme label
 */
export function getUserColorSchemeLabel(scheme: string): string {
  return USER_COLOR_SCHEME_LABELS[scheme] || scheme;
}

/**
 * Get user date format label
 */
export function getUserDateFormatLabel(format: string): string {
  return USER_DATE_FORMAT_LABELS[format] || format;
}

/**
 * Get user time format label
 */
export function getUserTimeFormatLabel(format: string): string {
  return USER_TIME_FORMAT_LABELS[format] || format;
}

/**
 * Get user timezone label
 */
export function getUserTimezoneLabel(timezone: string): string {
  return USER_TIMEZONE_SETTINGS_LABELS[timezone] || timezone;
}

/**
 * Get user notification event label
 */
export function getUserNotificationEventLabel(event: string): string {
  return USER_NOTIFICATION_EVENT_LABELS[event] || event;
}

/**
 * Get user notification setting label
 */
export function getUserNotificationSettingLabel(setting: string): string {
  return USER_NOTIFICATION_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user privacy setting label
 */
export function getUserPrivacySettingLabel(setting: string): string {
  return USER_PRIVACY_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user security setting label
 */
export function getUserSecuritySettingLabel(setting: string): string {
  return USER_SECURITY_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user accessibility setting label
 */
export function getUserAccessibilitySettingLabel(setting: string): string {
  return USER_ACCESSIBILITY_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user data setting label
 */
export function getUserDataSettingLabel(setting: string): string {
  return USER_DATA_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get user billing setting label
 */
export function getUserBillingSettingLabel(setting: string): string {
  return USER_BILLING_SETTINGS_LABELS[setting] || setting;
}

/**
 * Get all user settings categories
 */
export function getAllUserSettingsCategories(): string[] {
  return Object.values(USER_SETTINGS_CATEGORY);
}

/**
 * Get all user languages
 */
export function getAllUserLanguages(): string[] {
  return Object.values(USER_LANGUAGE_SETTINGS);
}

/**
 * Get all user themes
 */
export function getAllUserThemes(): string[] {
  return Object.values(USER_THEME_SETTINGS);
}

/**
 * Get all user color schemes
 */
export function getAllUserColorSchemes(): string[] {
  return Object.values(USER_COLOR_SCHEME);
}

/**
 * Get all user date formats
 */
export function getAllUserDateFormats(): string[] {
  return Object.values(USER_DATE_FORMAT);
}

/**
 * Get all user time formats
 */
export function getAllUserTimeFormats(): string[] {
  return Object.values(USER_TIME_FORMAT);
}

/**
 * Get all user timezones
 */
export function getAllUserTimezones(): string[] {
  return Object.values(USER_TIMEZONE_SETTINGS);
}

/**
 * Get all user notification events
 */
export function getAllUserNotificationEvents(): string[] {
  return Object.values(USER_NOTIFICATION_EVENT);
}

/**
 * Get all user notification settings
 */
export function getAllUserNotificationSettings(): string[] {
  return Object.values(USER_NOTIFICATION_SETTINGS);
}

/**
 * Get all user privacy settings
 */
export function getAllUserPrivacySettings(): string[] {
  return Object.values(USER_PRIVACY_SETTINGS);
}

/**
 * Get all user security settings
 */
export function getAllUserSecuritySettings(): string[] {
  return Object.values(USER_SECURITY_SETTINGS);
}

/**
 * Get all user accessibility settings
 */
export function getAllUserAccessibilitySettings(): string[] {
  return Object.values(USER_ACCESSIBILITY_SETTINGS);
}

/**
 * Get all user data settings
 */
export function getAllUserDataSettings(): string[] {
  return Object.values(USER_DATA_SETTINGS);
}

/**
 * Get all user billing settings
 */
export function getAllUserBillingSettings(): string[] {
  return Object.values(USER_BILLING_SETTINGS);
}
