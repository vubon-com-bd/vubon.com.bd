/**
 * User Preferences Type Constants
 * Defines all possible user preferences types
 */

export const USER_PREFERENCES_TYPE = {
  GENERAL: 'general',
  NOTIFICATION: 'notification',
  DISPLAY: 'display',
  SHOPPING: 'shopping',
  PRIVACY: 'privacy',
  COMMUNICATION: 'communication',
  ACCESSIBILITY: 'accessibility',
  LANGUAGE: 'language',
  REGIONAL: 'regional',
} as const;

export type UserPreferencesType =
  (typeof USER_PREFERENCES_TYPE)[keyof typeof USER_PREFERENCES_TYPE];

export const USER_PREFERENCES_TYPE_LABELS: Record<UserPreferencesType, string> = {
  [USER_PREFERENCES_TYPE.GENERAL]: 'General Preferences',
  [USER_PREFERENCES_TYPE.NOTIFICATION]: 'Notification Preferences',
  [USER_PREFERENCES_TYPE.DISPLAY]: 'Display Preferences',
  [USER_PREFERENCES_TYPE.SHOPPING]: 'Shopping Preferences',
  [USER_PREFERENCES_TYPE.PRIVACY]: 'Privacy Preferences',
  [USER_PREFERENCES_TYPE.COMMUNICATION]: 'Communication Preferences',
  [USER_PREFERENCES_TYPE.ACCESSIBILITY]: 'Accessibility Preferences',
  [USER_PREFERENCES_TYPE.LANGUAGE]: 'Language Preferences',
  [USER_PREFERENCES_TYPE.REGIONAL]: 'Regional Preferences',
};

export const USER_PREFERENCES_TYPE_DESCRIPTIONS: Record<UserPreferencesType, string> = {
  [USER_PREFERENCES_TYPE.GENERAL]: 'General user preferences and settings',
  [USER_PREFERENCES_TYPE.NOTIFICATION]: 'Email, SMS, and push notification preferences',
  [USER_PREFERENCES_TYPE.DISPLAY]: 'Display, theme, and visual preferences',
  [USER_PREFERENCES_TYPE.SHOPPING]: 'Shopping, checkout, and purchase preferences',
  [USER_PREFERENCES_TYPE.PRIVACY]: 'Privacy, visibility, and data sharing preferences',
  [USER_PREFERENCES_TYPE.COMMUNICATION]: 'Communication channels and frequency preferences',
  [USER_PREFERENCES_TYPE.ACCESSIBILITY]: 'Accessibility and assistive preferences',
  [USER_PREFERENCES_TYPE.LANGUAGE]: 'Language and translation preferences',
  [USER_PREFERENCES_TYPE.REGIONAL]: 'Regional, currency, and timezone preferences',
};

export const PUBLIC_PREFERENCES_TYPES: UserPreferencesType[] = [
  USER_PREFERENCES_TYPE.GENERAL,
  USER_PREFERENCES_TYPE.LANGUAGE,
  USER_PREFERENCES_TYPE.REGIONAL,
];

export const PRIVATE_PREFERENCES_TYPES: UserPreferencesType[] = [
  USER_PREFERENCES_TYPE.NOTIFICATION,
  USER_PREFERENCES_TYPE.DISPLAY,
  USER_PREFERENCES_TYPE.SHOPPING,
  USER_PREFERENCES_TYPE.PRIVACY,
  USER_PREFERENCES_TYPE.COMMUNICATION,
  USER_PREFERENCES_TYPE.ACCESSIBILITY,
];

export function isPublicPreference(type: UserPreferencesType): boolean {
  return PUBLIC_PREFERENCES_TYPES.includes(type);
}

export function isPrivatePreference(type: UserPreferencesType): boolean {
  return PRIVATE_PREFERENCES_TYPES.includes(type);
}

export function getPreferencesTypeLabel(type: UserPreferencesType): string {
  return USER_PREFERENCES_TYPE_LABELS[type] || 'Unknown';
}

export function getPreferencesTypeDescription(type: UserPreferencesType): string {
  return USER_PREFERENCES_TYPE_DESCRIPTIONS[type] || '';
}

export function getPreferencesTypeByCategory(category: string): UserPreferencesType | null {
  const normalized = category.toLowerCase();
  const types = Object.values(USER_PREFERENCES_TYPE);
  return types.find((type) => type.toLowerCase().includes(normalized)) || null;
}
