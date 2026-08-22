/**
 * User Settings Type Constants
 * Defines all possible user settings types
 */

export const USER_SETTINGS_TYPE = {
  GENERAL: 'general',
  NOTIFICATION: 'notification',
  PRIVACY: 'privacy',
  SECURITY: 'security',
  COMMUNICATION: 'communication',
  PREFERENCES: 'preferences',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  BILLING: 'billing',
} as const;

export type UserSettingsType = (typeof USER_SETTINGS_TYPE)[keyof typeof USER_SETTINGS_TYPE];

export const USER_SETTINGS_TYPE_LABELS: Record<UserSettingsType, string> = {
  [USER_SETTINGS_TYPE.GENERAL]: 'General Settings',
  [USER_SETTINGS_TYPE.NOTIFICATION]: 'Notification Settings',
  [USER_SETTINGS_TYPE.PRIVACY]: 'Privacy Settings',
  [USER_SETTINGS_TYPE.SECURITY]: 'Security Settings',
  [USER_SETTINGS_TYPE.COMMUNICATION]: 'Communication Settings',
  [USER_SETTINGS_TYPE.PREFERENCES]: 'User Preferences',
  [USER_SETTINGS_TYPE.PAYMENT]: 'Payment Settings',
  [USER_SETTINGS_TYPE.SHIPPING]: 'Shipping Settings',
  [USER_SETTINGS_TYPE.BILLING]: 'Billing Settings',
};

export const USER_SETTINGS_TYPE_DESCRIPTIONS: Record<UserSettingsType, string> = {
  [USER_SETTINGS_TYPE.GENERAL]: 'General account settings and preferences',
  [USER_SETTINGS_TYPE.NOTIFICATION]: 'Email, SMS, and push notification preferences',
  [USER_SETTINGS_TYPE.PRIVACY]: 'Profile visibility and privacy controls',
  [USER_SETTINGS_TYPE.SECURITY]: 'Password, 2FA, and security settings',
  [USER_SETTINGS_TYPE.COMMUNICATION]: 'Communication preferences and channels',
  [USER_SETTINGS_TYPE.PREFERENCES]: 'User-specific preferences and customizations',
  [USER_SETTINGS_TYPE.PAYMENT]: 'Payment methods and billing information',
  [USER_SETTINGS_TYPE.SHIPPING]: 'Default shipping addresses and preferences',
  [USER_SETTINGS_TYPE.BILLING]: 'Billing addresses and invoice preferences',
};

export const PUBLIC_SETTINGS_TYPES: UserSettingsType[] = [
  USER_SETTINGS_TYPE.GENERAL,
  USER_SETTINGS_TYPE.NOTIFICATION,
  USER_SETTINGS_TYPE.PREFERENCES,
];

export const PRIVATE_SETTINGS_TYPES: UserSettingsType[] = [
  USER_SETTINGS_TYPE.PRIVACY,
  USER_SETTINGS_TYPE.SECURITY,
  USER_SETTINGS_TYPE.COMMUNICATION,
  USER_SETTINGS_TYPE.PAYMENT,
  USER_SETTINGS_TYPE.SHIPPING,
  USER_SETTINGS_TYPE.BILLING,
];

export function isPublicSetting(type: UserSettingsType): boolean {
  return PUBLIC_SETTINGS_TYPES.includes(type);
}

export function isPrivateSetting(type: UserSettingsType): boolean {
  return PRIVATE_SETTINGS_TYPES.includes(type);
}

export function getSettingsTypeLabel(type: UserSettingsType): string {
  return USER_SETTINGS_TYPE_LABELS[type] || 'Unknown';
}

export function getSettingsTypeDescription(type: UserSettingsType): string {
  return USER_SETTINGS_TYPE_DESCRIPTIONS[type] || '';
}

export function getSettingsTypeByCategory(category: string): UserSettingsType | null {
  const normalized = category.toLowerCase();
  const types = Object.values(USER_SETTINGS_TYPE);
  return types.find((type) => type.toLowerCase().includes(normalized)) || null;
}
