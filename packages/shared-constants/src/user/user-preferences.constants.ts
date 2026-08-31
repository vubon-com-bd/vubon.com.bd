/**
 * User Preferences Constants
 * All possible user preferences and configurations in the system
 * Imports common values where applicable
 */

import { STATUS } from '../common/status.constants';
import { SORT_ORDER } from '../common/type.constants';

/**
 * User preference categories
 * Groups of preferences by functional area
 */
export const USER_PREFERENCE_CATEGORY = {
  /** General preferences */
  GENERAL: 'general',
  /** Notification preferences */
  NOTIFICATIONS: 'notifications',
  /** Display preferences */
  DISPLAY: 'display',
  /** Language and regional preferences */
  LANGUAGE: 'language',
  /** Accessibility preferences */
  ACCESSIBILITY: 'accessibility',
  /** Privacy preferences */
  PRIVACY: 'privacy',
  /** Communication preferences */
  COMMUNICATION: 'communication',
  /** Content preferences */
  CONTENT: 'content',
  /** Feature preferences */
  FEATURES: 'features',
  /** Workflow preferences */
  WORKFLOW: 'workflow',
} as const;

/**
 * User preference status
 */
export const USER_PREFERENCE_STATUS = {
  /** Preference is active/enabled */
  ACTIVE: STATUS.ACTIVE,
  /** Preference is inactive/disabled */
  INACTIVE: STATUS.INACTIVE,
  /** Preference is pending approval */
  PENDING: STATUS.PENDING,
  /** Preference is archived */
  ARCHIVED: STATUS.ARCHIVED,
  /** Preference is default */
  DEFAULT: 'default',
  /** Preference is custom */
  CUSTOM: 'custom',
} as const;

/**
 * User communication preferences
 * How users want to be communicated with
 */
export const USER_COMMUNICATION_PREFERENCE = {
  /** Email communication */
  EMAIL: 'email',
  /** SMS communication */
  SMS: 'sms',
  /** Push notifications */
  PUSH: 'push',
  /** In-app notifications */
  IN_APP: 'in_app',
  /** Phone calls */
  PHONE: 'phone',
  /** Postal mail */
  POSTAL: 'postal',
  /** WhatsApp */
  WHATSAPP: 'whatsapp',
  /** Telegram */
  TELEGRAM: 'telegram',
  /** Signal */
  SIGNAL: 'signal',
} as const;

/**
 * User content preferences
 * Content-related preferences
 */
export const USER_CONTENT_PREFERENCE = {
  /** Show adult content */
  ADULT_CONTENT: 'adult_content',
  /** Show explicit content */
  EXPLICIT_CONTENT: 'explicit_content',
  /** Show political content */
  POLITICAL_CONTENT: 'political_content',
  /** Show religious content */
  RELIGIOUS_CONTENT: 'religious_content',
  /** Show sensitive content */
  SENSITIVE_CONTENT: 'sensitive_content',
  /** Content language */
  CONTENT_LANGUAGE: 'content_language',
  /** Content region */
  CONTENT_REGION: 'content_region',
  /** Content maturity level */
  MATURITY_LEVEL: 'maturity_level',
} as const;

/**
 * User display preferences
 * Display-related preferences
 */
export const USER_DISPLAY_PREFERENCE = {
  /** Theme preference */
  THEME: 'theme',
  /** Font size */
  FONT_SIZE: 'font_size',
  /** Font family */
  FONT_FAMILY: 'font_family',
  /** Color scheme */
  COLOR_SCHEME: 'color_scheme',
  /** Layout preference */
  LAYOUT: 'layout',
  /** Density/compact mode */
  DENSITY: 'density',
  /** Animation preference */
  ANIMATION: 'animation',
  /** Reduced motion */
  REDUCED_MOTION: 'reduced_motion',
  /** High contrast */
  HIGH_CONTRAST: 'high_contrast',
  /** Zoom level */
  ZOOM_LEVEL: 'zoom_level',
} as const;

/**
 * User language preferences
 * Language and regional preferences
 */
export const USER_LANGUAGE_PREFERENCE = {
  /** Primary language */
  PRIMARY: 'primary',
  /** Secondary language */
  SECONDARY: 'secondary',
  /** Fallback language */
  FALLBACK: 'fallback',
  /** Date format */
  DATE_FORMAT: 'date_format',
  /** Time format */
  TIME_FORMAT: 'time_format',
  /** Timezone */
  TIMEZONE: 'timezone',
  /** Number format */
  NUMBER_FORMAT: 'number_format',
  /** Currency format */
  CURRENCY_FORMAT: 'currency_format',
  /** First day of week */
  FIRST_DAY_OF_WEEK: 'first_day_of_week',
} as const;

/**
 * User workflow preferences
 * Workflow and productivity preferences
 */
export const USER_WORKFLOW_PREFERENCE = {
  /** Default view */
  DEFAULT_VIEW: 'default_view',
  /** Default sort */
  DEFAULT_SORT: 'default_sort',
  /** Default filter */
  DEFAULT_FILTER: 'default_filter',
  /** Items per page */
  ITEMS_PER_PAGE: 'items_per_page',
  /** Auto-save */
  AUTO_SAVE: 'auto_save',
  /** Auto-save interval */
  AUTO_SAVE_INTERVAL: 'auto_save_interval',
  /** Keyboard shortcuts */
  KEYBOARD_SHORTCUTS: 'keyboard_shortcuts',
  /** Quick actions */
  QUICK_ACTIONS: 'quick_actions',
  /** Bulk operations */
  BULK_OPERATIONS: 'bulk_operations',
  /** Confirmation dialogs */
  CONFIRMATION_DIALOGS: 'confirmation_dialogs',
} as const;

/**
 * User feature preferences
 * Feature-specific preferences
 */
export const USER_FEATURE_PREFERENCE = {
  /** Beta features */
  BETA_FEATURES: 'beta_features',
  /** Experimental features */
  EXPERIMENTAL_FEATURES: 'experimental_features',
  /** Feature discovery */
  FEATURE_DISCOVERY: 'feature_discovery',
  /** Feature tutorials */
  FEATURE_TUTORIALS: 'feature_tutorials',
  /** Onboarding */
  ONBOARDING: 'onboarding',
  /** Tooltips */
  TOOLTIPS: 'tooltips',
  /** Walkthroughs */
  WALKTHROUGHS: 'walkthroughs',
  /** Feature announcements */
  FEATURE_ANNOUNCEMENTS: 'feature_announcements',
} as const;

/**
 * User preference labels
 * Human-readable labels for UI
 */
export const USER_PREFERENCE_CATEGORY_LABELS: Record<string, string> = {
  [USER_PREFERENCE_CATEGORY.GENERAL]: 'General Preferences',
  [USER_PREFERENCE_CATEGORY.NOTIFICATIONS]: 'Notification Preferences',
  [USER_PREFERENCE_CATEGORY.DISPLAY]: 'Display Preferences',
  [USER_PREFERENCE_CATEGORY.LANGUAGE]: 'Language & Regional',
  [USER_PREFERENCE_CATEGORY.ACCESSIBILITY]: 'Accessibility Preferences',
  [USER_PREFERENCE_CATEGORY.PRIVACY]: 'Privacy Preferences',
  [USER_PREFERENCE_CATEGORY.COMMUNICATION]: 'Communication Preferences',
  [USER_PREFERENCE_CATEGORY.CONTENT]: 'Content Preferences',
  [USER_PREFERENCE_CATEGORY.FEATURES]: 'Feature Preferences',
  [USER_PREFERENCE_CATEGORY.WORKFLOW]: 'Workflow Preferences',
};

/**
 * User communication preference labels
 */
export const USER_COMMUNICATION_PREFERENCE_LABELS: Record<string, string> = {
  [USER_COMMUNICATION_PREFERENCE.EMAIL]: 'Email',
  [USER_COMMUNICATION_PREFERENCE.SMS]: 'SMS',
  [USER_COMMUNICATION_PREFERENCE.PUSH]: 'Push Notifications',
  [USER_COMMUNICATION_PREFERENCE.IN_APP]: 'In-App Notifications',
  [USER_COMMUNICATION_PREFERENCE.PHONE]: 'Phone Calls',
  [USER_COMMUNICATION_PREFERENCE.POSTAL]: 'Postal Mail',
  [USER_COMMUNICATION_PREFERENCE.WHATSAPP]: 'WhatsApp',
  [USER_COMMUNICATION_PREFERENCE.TELEGRAM]: 'Telegram',
  [USER_COMMUNICATION_PREFERENCE.SIGNAL]: 'Signal',
};

/**
 * User display preference labels
 */
export const USER_DISPLAY_PREFERENCE_LABELS: Record<string, string> = {
  [USER_DISPLAY_PREFERENCE.THEME]: 'Theme',
  [USER_DISPLAY_PREFERENCE.FONT_SIZE]: 'Font Size',
  [USER_DISPLAY_PREFERENCE.FONT_FAMILY]: 'Font Family',
  [USER_DISPLAY_PREFERENCE.COLOR_SCHEME]: 'Color Scheme',
  [USER_DISPLAY_PREFERENCE.LAYOUT]: 'Layout',
  [USER_DISPLAY_PREFERENCE.DENSITY]: 'Density/Compact Mode',
  [USER_DISPLAY_PREFERENCE.ANIMATION]: 'Animation',
  [USER_DISPLAY_PREFERENCE.REDUCED_MOTION]: 'Reduced Motion',
  [USER_DISPLAY_PREFERENCE.HIGH_CONTRAST]: 'High Contrast',
  [USER_DISPLAY_PREFERENCE.ZOOM_LEVEL]: 'Zoom Level',
};

/**
 * User language preference labels
 */
export const USER_LANGUAGE_PREFERENCE_LABELS: Record<string, string> = {
  [USER_LANGUAGE_PREFERENCE.PRIMARY]: 'Primary Language',
  [USER_LANGUAGE_PREFERENCE.SECONDARY]: 'Secondary Language',
  [USER_LANGUAGE_PREFERENCE.FALLBACK]: 'Fallback Language',
  [USER_LANGUAGE_PREFERENCE.DATE_FORMAT]: 'Date Format',
  [USER_LANGUAGE_PREFERENCE.TIME_FORMAT]: 'Time Format',
  [USER_LANGUAGE_PREFERENCE.TIMEZONE]: 'Timezone',
  [USER_LANGUAGE_PREFERENCE.NUMBER_FORMAT]: 'Number Format',
  [USER_LANGUAGE_PREFERENCE.CURRENCY_FORMAT]: 'Currency Format',
  [USER_LANGUAGE_PREFERENCE.FIRST_DAY_OF_WEEK]: 'First Day of Week',
};

/**
 * User workflow preference labels
 */
export const USER_WORKFLOW_PREFERENCE_LABELS: Record<string, string> = {
  [USER_WORKFLOW_PREFERENCE.DEFAULT_VIEW]: 'Default View',
  [USER_WORKFLOW_PREFERENCE.DEFAULT_SORT]: 'Default Sort',
  [USER_WORKFLOW_PREFERENCE.DEFAULT_FILTER]: 'Default Filter',
  [USER_WORKFLOW_PREFERENCE.ITEMS_PER_PAGE]: 'Items Per Page',
  [USER_WORKFLOW_PREFERENCE.AUTO_SAVE]: 'Auto-Save',
  [USER_WORKFLOW_PREFERENCE.AUTO_SAVE_INTERVAL]: 'Auto-Save Interval',
  [USER_WORKFLOW_PREFERENCE.KEYBOARD_SHORTCUTS]: 'Keyboard Shortcuts',
  [USER_WORKFLOW_PREFERENCE.QUICK_ACTIONS]: 'Quick Actions',
  [USER_WORKFLOW_PREFERENCE.BULK_OPERATIONS]: 'Bulk Operations',
  [USER_WORKFLOW_PREFERENCE.CONFIRMATION_DIALOGS]: 'Confirmation Dialogs',
};

/**
 * User feature preference labels
 */
export const USER_FEATURE_PREFERENCE_LABELS: Record<string, string> = {
  [USER_FEATURE_PREFERENCE.BETA_FEATURES]: 'Beta Features',
  [USER_FEATURE_PREFERENCE.EXPERIMENTAL_FEATURES]: 'Experimental Features',
  [USER_FEATURE_PREFERENCE.FEATURE_DISCOVERY]: 'Feature Discovery',
  [USER_FEATURE_PREFERENCE.FEATURE_TUTORIALS]: 'Feature Tutorials',
  [USER_FEATURE_PREFERENCE.ONBOARDING]: 'Onboarding',
  [USER_FEATURE_PREFERENCE.TOOLTIPS]: 'Tooltips',
  [USER_FEATURE_PREFERENCE.WALKTHROUGHS]: 'Walkthroughs',
  [USER_FEATURE_PREFERENCE.FEATURE_ANNOUNCEMENTS]: 'Feature Announcements',
};

/**
 * User content preference labels
 */
export const USER_CONTENT_PREFERENCE_LABELS: Record<string, string> = {
  [USER_CONTENT_PREFERENCE.ADULT_CONTENT]: 'Adult Content',
  [USER_CONTENT_PREFERENCE.EXPLICIT_CONTENT]: 'Explicit Content',
  [USER_CONTENT_PREFERENCE.POLITICAL_CONTENT]: 'Political Content',
  [USER_CONTENT_PREFERENCE.RELIGIOUS_CONTENT]: 'Religious Content',
  [USER_CONTENT_PREFERENCE.SENSITIVE_CONTENT]: 'Sensitive Content',
  [USER_CONTENT_PREFERENCE.CONTENT_LANGUAGE]: 'Content Language',
  [USER_CONTENT_PREFERENCE.CONTENT_REGION]: 'Content Region',
  [USER_CONTENT_PREFERENCE.MATURITY_LEVEL]: 'Maturity Level',
};

/**
 * User preference status labels
 */
export const USER_PREFERENCE_STATUS_LABELS: Record<string, string> = {
  [USER_PREFERENCE_STATUS.ACTIVE]: 'Active',
  [USER_PREFERENCE_STATUS.INACTIVE]: 'Inactive',
  [USER_PREFERENCE_STATUS.PENDING]: 'Pending',
  [USER_PREFERENCE_STATUS.ARCHIVED]: 'Archived',
  [USER_PREFERENCE_STATUS.DEFAULT]: 'Default',
  [USER_PREFERENCE_STATUS.CUSTOM]: 'Custom',
};

/**
 * Check if user preference category is valid
 */
export function isValidUserPreferenceCategory(category: string): boolean {
  return Object.values(USER_PREFERENCE_CATEGORY).includes(
    category as (typeof USER_PREFERENCE_CATEGORY)[keyof typeof USER_PREFERENCE_CATEGORY]
  );
}

/**
 * Check if user communication preference is valid
 */
export function isValidUserCommunicationPreference(preference: string): boolean {
  return Object.values(USER_COMMUNICATION_PREFERENCE).includes(
    preference as (typeof USER_COMMUNICATION_PREFERENCE)[keyof typeof USER_COMMUNICATION_PREFERENCE]
  );
}

/**
 * Check if user display preference is valid
 */
export function isValidUserDisplayPreference(preference: string): boolean {
  return Object.values(USER_DISPLAY_PREFERENCE).includes(
    preference as (typeof USER_DISPLAY_PREFERENCE)[keyof typeof USER_DISPLAY_PREFERENCE]
  );
}

/**
 * Check if user language preference is valid
 */
export function isValidUserLanguagePreference(preference: string): boolean {
  return Object.values(USER_LANGUAGE_PREFERENCE).includes(
    preference as (typeof USER_LANGUAGE_PREFERENCE)[keyof typeof USER_LANGUAGE_PREFERENCE]
  );
}

/**
 * Check if user workflow preference is valid
 */
export function isValidUserWorkflowPreference(preference: string): boolean {
  return Object.values(USER_WORKFLOW_PREFERENCE).includes(
    preference as (typeof USER_WORKFLOW_PREFERENCE)[keyof typeof USER_WORKFLOW_PREFERENCE]
  );
}

/**
 * Check if user feature preference is valid
 */
export function isValidUserFeaturePreference(preference: string): boolean {
  return Object.values(USER_FEATURE_PREFERENCE).includes(
    preference as (typeof USER_FEATURE_PREFERENCE)[keyof typeof USER_FEATURE_PREFERENCE]
  );
}

/**
 * Check if user content preference is valid
 */
export function isValidUserContentPreference(preference: string): boolean {
  return Object.values(USER_CONTENT_PREFERENCE).includes(
    preference as (typeof USER_CONTENT_PREFERENCE)[keyof typeof USER_CONTENT_PREFERENCE]
  );
}

/**
 * Check if user preference status is valid
 */
export function isValidUserPreferenceStatus(status: string): boolean {
  return Object.values(USER_PREFERENCE_STATUS).includes(
    status as (typeof USER_PREFERENCE_STATUS)[keyof typeof USER_PREFERENCE_STATUS]
  );
}

/**
 * Get user preference category label
 */
export function getUserPreferenceCategoryLabel(category: string): string {
  return USER_PREFERENCE_CATEGORY_LABELS[category] || category;
}

/**
 * Get user communication preference label
 */
export function getUserCommunicationPreferenceLabel(preference: string): string {
  return USER_COMMUNICATION_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user display preference label
 */
export function getUserDisplayPreferenceLabel(preference: string): string {
  return USER_DISPLAY_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user language preference label
 */
export function getUserLanguagePreferenceLabel(preference: string): string {
  return USER_LANGUAGE_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user workflow preference label
 */
export function getUserWorkflowPreferenceLabel(preference: string): string {
  return USER_WORKFLOW_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user feature preference label
 */
export function getUserFeaturePreferenceLabel(preference: string): string {
  return USER_FEATURE_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user content preference label
 */
export function getUserContentPreferenceLabel(preference: string): string {
  return USER_CONTENT_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user preference status label
 */
export function getUserPreferenceStatusLabel(status: string): string {
  return USER_PREFERENCE_STATUS_LABELS[status] || status;
}

/**
 * Get all user preference categories
 */
export function getAllUserPreferenceCategories(): string[] {
  return Object.values(USER_PREFERENCE_CATEGORY);
}

/**
 * Get all user communication preferences
 */
export function getAllUserCommunicationPreferences(): string[] {
  return Object.values(USER_COMMUNICATION_PREFERENCE);
}

/**
 * Get all user display preferences
 */
export function getAllUserDisplayPreferences(): string[] {
  return Object.values(USER_DISPLAY_PREFERENCE);
}

/**
 * Get all user language preferences
 */
export function getAllUserLanguagePreferences(): string[] {
  return Object.values(USER_LANGUAGE_PREFERENCE);
}

/**
 * Get all user workflow preferences
 */
export function getAllUserWorkflowPreferences(): string[] {
  return Object.values(USER_WORKFLOW_PREFERENCE);
}

/**
 * Get all user feature preferences
 */
export function getAllUserFeaturePreferences(): string[] {
  return Object.values(USER_FEATURE_PREFERENCE);
}

/**
 * Get all user content preferences
 */
export function getAllUserContentPreferences(): string[] {
  return Object.values(USER_CONTENT_PREFERENCE);
}

/**
 * Get all user preference statuses
 */
export function getAllUserPreferenceStatuses(): string[] {
  return Object.values(USER_PREFERENCE_STATUS);
}

/**
 * Default sort options
 */
export const USER_DEFAULT_SORT_OPTIONS = {
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  NAME: 'name',
  TITLE: 'title',
  DATE: 'date',
  PRIORITY: 'priority',
  STATUS: 'status',
  TYPE: 'type',
} as const;

/**
 * User default sort labels
 */
export const USER_DEFAULT_SORT_LABELS: Record<string, string> = {
  [USER_DEFAULT_SORT_OPTIONS.CREATED_AT]: 'Created Date',
  [USER_DEFAULT_SORT_OPTIONS.UPDATED_AT]: 'Updated Date',
  [USER_DEFAULT_SORT_OPTIONS.NAME]: 'Name',
  [USER_DEFAULT_SORT_OPTIONS.TITLE]: 'Title',
  [USER_DEFAULT_SORT_OPTIONS.DATE]: 'Date',
  [USER_DEFAULT_SORT_OPTIONS.PRIORITY]: 'Priority',
  [USER_DEFAULT_SORT_OPTIONS.STATUS]: 'Status',
  [USER_DEFAULT_SORT_OPTIONS.TYPE]: 'Type',
};

/**
 * User default sort order options
 */
export const USER_DEFAULT_SORT_ORDER = {
  ASC: SORT_ORDER.ASC,
  DESC: SORT_ORDER.DESC,
} as const;

/**
 * User items per page options
 */
export const USER_ITEMS_PER_PAGE_OPTIONS = {
  FIVE: 5,
  TEN: 10,
  TWENTY_FIVE: 25,
  FIFTY: 50,
  SEVENTY_FIVE: 75,
  ONE_HUNDRED: 100,
  TWO_HUNDRED: 200,
} as const;

/**
 * User items per page labels
 */
export const USER_ITEMS_PER_PAGE_LABELS: Record<number, string> = {
  [USER_ITEMS_PER_PAGE_OPTIONS.FIVE]: '5',
  [USER_ITEMS_PER_PAGE_OPTIONS.TEN]: '10',
  [USER_ITEMS_PER_PAGE_OPTIONS.TWENTY_FIVE]: '25',
  [USER_ITEMS_PER_PAGE_OPTIONS.FIFTY]: '50',
  [USER_ITEMS_PER_PAGE_OPTIONS.SEVENTY_FIVE]: '75',
  [USER_ITEMS_PER_PAGE_OPTIONS.ONE_HUNDRED]: '100',
  [USER_ITEMS_PER_PAGE_OPTIONS.TWO_HUNDRED]: '200',
};

/**
 * Check if user items per page is valid
 */
export function isValidUserItemsPerPage(value: number): boolean {
  return Object.values(USER_ITEMS_PER_PAGE_OPTIONS).includes(
    value as (typeof USER_ITEMS_PER_PAGE_OPTIONS)[keyof typeof USER_ITEMS_PER_PAGE_OPTIONS]
  );
}

/**
 * Get user items per page label
 */
export function getUserItemsPerPageLabel(value: number): string {
  return USER_ITEMS_PER_PAGE_LABELS[value] || `${value}`;
}

/**
 * User preference types
 */
export const USER_PREFERENCE_TYPE = {
  /** Boolean preference (true/false) */
  BOOLEAN: 'boolean',
  /** String preference */
  STRING: 'string',
  /** Number preference */
  NUMBER: 'number',
  /** Select/choice preference */
  SELECT: 'select',
  /** Multi-select preference */
  MULTI_SELECT: 'multi_select',
  /** Color preference */
  COLOR: 'color',
  /** Date preference */
  DATE: 'date',
  /** Time preference */
  TIME: 'time',
  /** DateTime preference */
  DATETIME: 'datetime',
  /** Array preference */
  ARRAY: 'array',
  /** JSON preference */
  JSON: 'json',
} as const;

/**
 * User preference type labels
 */
export const USER_PREFERENCE_TYPE_LABELS: Record<string, string> = {
  [USER_PREFERENCE_TYPE.BOOLEAN]: 'Boolean (Yes/No)',
  [USER_PREFERENCE_TYPE.STRING]: 'Text',
  [USER_PREFERENCE_TYPE.NUMBER]: 'Number',
  [USER_PREFERENCE_TYPE.SELECT]: 'Select One',
  [USER_PREFERENCE_TYPE.MULTI_SELECT]: 'Select Multiple',
  [USER_PREFERENCE_TYPE.COLOR]: 'Color',
  [USER_PREFERENCE_TYPE.DATE]: 'Date',
  [USER_PREFERENCE_TYPE.TIME]: 'Time',
  [USER_PREFERENCE_TYPE.DATETIME]: 'Date & Time',
  [USER_PREFERENCE_TYPE.ARRAY]: 'Array/List',
  [USER_PREFERENCE_TYPE.JSON]: 'JSON Object',
};

/**
 * Check if user preference type is valid
 */
export function isValidUserPreferenceType(type: string): boolean {
  return Object.values(USER_PREFERENCE_TYPE).includes(
    type as (typeof USER_PREFERENCE_TYPE)[keyof typeof USER_PREFERENCE_TYPE]
  );
}

/**
 * Get user preference type label
 */
export function getUserPreferenceTypeLabel(type: string): string {
  return USER_PREFERENCE_TYPE_LABELS[type] || type;
}

/**
 * Get all user preference types
 */
export function getAllUserPreferenceTypes(): string[] {
  return Object.values(USER_PREFERENCE_TYPE);
}
