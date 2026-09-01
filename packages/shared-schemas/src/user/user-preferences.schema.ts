/**
 * User Preferences Schema
 * Zod schemas for user preferences management
 */

import { z } from 'zod';
import {
  USER_PREFERENCE_CATEGORY,
  USER_COMMUNICATION_PREFERENCE,
  USER_CONTENT_PREFERENCE,
  USER_DISPLAY_PREFERENCE,
  USER_LANGUAGE_PREFERENCE,
  USER_WORKFLOW_PREFERENCE,
  USER_FEATURE_PREFERENCE,
  USER_PREFERENCE_TYPE,
  USER_PREFERENCE_STATUS,
  USER_DEFAULT_SORT_OPTIONS,
  USER_DEFAULT_SORT_ORDER,
  USER_ITEMS_PER_PAGE_OPTIONS,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// USER PREFERENCE TYPES (from constants)
// ============================================================

/**
 * User items per page option type from constants
 */
export type UserItemsPerPageOption =
  (typeof USER_ITEMS_PER_PAGE_OPTIONS)[keyof typeof USER_ITEMS_PER_PAGE_OPTIONS];

// ============================================================
// USER PREFERENCE TYPE SCHEMAS
// ============================================================

/**
 * User preference category schema
 */
export const userPreferenceCategorySchema = z.enum([
  USER_PREFERENCE_CATEGORY.GENERAL,
  USER_PREFERENCE_CATEGORY.NOTIFICATIONS,
  USER_PREFERENCE_CATEGORY.DISPLAY,
  USER_PREFERENCE_CATEGORY.LANGUAGE,
  USER_PREFERENCE_CATEGORY.ACCESSIBILITY,
  USER_PREFERENCE_CATEGORY.PRIVACY,
  USER_PREFERENCE_CATEGORY.COMMUNICATION,
  USER_PREFERENCE_CATEGORY.CONTENT,
  USER_PREFERENCE_CATEGORY.FEATURES,
  USER_PREFERENCE_CATEGORY.WORKFLOW,
]);

/**
 * User preference status schema
 */
export const userPreferenceStatusSchema = z.enum([
  USER_PREFERENCE_STATUS.ACTIVE,
  USER_PREFERENCE_STATUS.INACTIVE,
  USER_PREFERENCE_STATUS.PENDING,
  USER_PREFERENCE_STATUS.ARCHIVED,
  USER_PREFERENCE_STATUS.DEFAULT,
  USER_PREFERENCE_STATUS.CUSTOM,
]);

/**
 * User communication preference schema
 */
export const userCommunicationPreferenceSchema = z.enum([
  USER_COMMUNICATION_PREFERENCE.EMAIL,
  USER_COMMUNICATION_PREFERENCE.SMS,
  USER_COMMUNICATION_PREFERENCE.PUSH,
  USER_COMMUNICATION_PREFERENCE.IN_APP,
  USER_COMMUNICATION_PREFERENCE.PHONE,
  USER_COMMUNICATION_PREFERENCE.POSTAL,
  USER_COMMUNICATION_PREFERENCE.WHATSAPP,
  USER_COMMUNICATION_PREFERENCE.TELEGRAM,
  USER_COMMUNICATION_PREFERENCE.SIGNAL,
]);

/**
 * User content preference schema
 */
export const userContentPreferenceSchema = z.enum([
  USER_CONTENT_PREFERENCE.ADULT_CONTENT,
  USER_CONTENT_PREFERENCE.EXPLICIT_CONTENT,
  USER_CONTENT_PREFERENCE.POLITICAL_CONTENT,
  USER_CONTENT_PREFERENCE.RELIGIOUS_CONTENT,
  USER_CONTENT_PREFERENCE.SENSITIVE_CONTENT,
  USER_CONTENT_PREFERENCE.CONTENT_LANGUAGE,
  USER_CONTENT_PREFERENCE.CONTENT_REGION,
  USER_CONTENT_PREFERENCE.MATURITY_LEVEL,
]);

/**
 * User display preference schema
 */
export const userDisplayPreferenceSchema = z.enum([
  USER_DISPLAY_PREFERENCE.THEME,
  USER_DISPLAY_PREFERENCE.FONT_SIZE,
  USER_DISPLAY_PREFERENCE.FONT_FAMILY,
  USER_DISPLAY_PREFERENCE.COLOR_SCHEME,
  USER_DISPLAY_PREFERENCE.LAYOUT,
  USER_DISPLAY_PREFERENCE.DENSITY,
  USER_DISPLAY_PREFERENCE.ANIMATION,
  USER_DISPLAY_PREFERENCE.REDUCED_MOTION,
  USER_DISPLAY_PREFERENCE.HIGH_CONTRAST,
  USER_DISPLAY_PREFERENCE.ZOOM_LEVEL,
]);

/**
 * User language preference schema
 */
export const userLanguagePreferenceSchema = z.enum([
  USER_LANGUAGE_PREFERENCE.PRIMARY,
  USER_LANGUAGE_PREFERENCE.SECONDARY,
  USER_LANGUAGE_PREFERENCE.FALLBACK,
  USER_LANGUAGE_PREFERENCE.DATE_FORMAT,
  USER_LANGUAGE_PREFERENCE.TIME_FORMAT,
  USER_LANGUAGE_PREFERENCE.TIMEZONE,
  USER_LANGUAGE_PREFERENCE.NUMBER_FORMAT,
  USER_LANGUAGE_PREFERENCE.CURRENCY_FORMAT,
  USER_LANGUAGE_PREFERENCE.FIRST_DAY_OF_WEEK,
]);

/**
 * User workflow preference schema
 */
export const userWorkflowPreferenceSchema = z.enum([
  USER_WORKFLOW_PREFERENCE.DEFAULT_VIEW,
  USER_WORKFLOW_PREFERENCE.DEFAULT_SORT,
  USER_WORKFLOW_PREFERENCE.DEFAULT_FILTER,
  USER_WORKFLOW_PREFERENCE.ITEMS_PER_PAGE,
  USER_WORKFLOW_PREFERENCE.AUTO_SAVE,
  USER_WORKFLOW_PREFERENCE.AUTO_SAVE_INTERVAL,
  USER_WORKFLOW_PREFERENCE.KEYBOARD_SHORTCUTS,
  USER_WORKFLOW_PREFERENCE.QUICK_ACTIONS,
  USER_WORKFLOW_PREFERENCE.BULK_OPERATIONS,
  USER_WORKFLOW_PREFERENCE.CONFIRMATION_DIALOGS,
]);

/**
 * User feature preference schema
 */
export const userFeaturePreferenceSchema = z.enum([
  USER_FEATURE_PREFERENCE.BETA_FEATURES,
  USER_FEATURE_PREFERENCE.EXPERIMENTAL_FEATURES,
  USER_FEATURE_PREFERENCE.FEATURE_DISCOVERY,
  USER_FEATURE_PREFERENCE.FEATURE_TUTORIALS,
  USER_FEATURE_PREFERENCE.ONBOARDING,
  USER_FEATURE_PREFERENCE.TOOLTIPS,
  USER_FEATURE_PREFERENCE.WALKTHROUGHS,
  USER_FEATURE_PREFERENCE.FEATURE_ANNOUNCEMENTS,
]);

/**
 * User preference type schema
 */
export const userPreferenceTypeSchema = z.enum([
  USER_PREFERENCE_TYPE.BOOLEAN,
  USER_PREFERENCE_TYPE.STRING,
  USER_PREFERENCE_TYPE.NUMBER,
  USER_PREFERENCE_TYPE.SELECT,
  USER_PREFERENCE_TYPE.MULTI_SELECT,
  USER_PREFERENCE_TYPE.COLOR,
  USER_PREFERENCE_TYPE.DATE,
  USER_PREFERENCE_TYPE.TIME,
  USER_PREFERENCE_TYPE.DATETIME,
  USER_PREFERENCE_TYPE.ARRAY,
  USER_PREFERENCE_TYPE.JSON,
]);

/**
 * User default sort option schema
 */
export const userDefaultSortOptionSchema = z.enum([
  USER_DEFAULT_SORT_OPTIONS.CREATED_AT,
  USER_DEFAULT_SORT_OPTIONS.UPDATED_AT,
  USER_DEFAULT_SORT_OPTIONS.NAME,
  USER_DEFAULT_SORT_OPTIONS.TITLE,
  USER_DEFAULT_SORT_OPTIONS.DATE,
  USER_DEFAULT_SORT_OPTIONS.PRIORITY,
  USER_DEFAULT_SORT_OPTIONS.STATUS,
  USER_DEFAULT_SORT_OPTIONS.TYPE,
]);

/**
 * User default sort order schema
 */
export const userDefaultSortOrderSchema = z.enum([
  USER_DEFAULT_SORT_ORDER.ASC,
  USER_DEFAULT_SORT_ORDER.DESC,
]);

/**
 * User items per page option schema - using z.number() directly
 */
export const userItemsPerPageOptionSchema = z.number();

// ============================================================
// USER PREFERENCE RECORD SCHEMA
// ============================================================

/**
 * User preference record schema
 */
export const userPreferenceRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  category: userPreferenceCategorySchema,
  key: z.string().min(1),
  value: z.unknown(),
  type: userPreferenceTypeSchema,
  status: userPreferenceStatusSchema,
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  setAt: timestampSchema,
  updatedAt: timestampSchema,
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER PREFERENCE REQUEST SCHEMAS
// ============================================================

/**
 * User preference update request schema
 */
export const userPreferenceUpdateRequestSchema = z.object({
  userId: idSchema,
  category: userPreferenceCategorySchema.optional(),
  key: z.string().min(1),
  value: z.unknown(),
});

/**
 * User preference bulk update request schema
 */
export const userPreferenceBulkUpdateRequestSchema = z.object({
  userId: idSchema,
  preferences: z.array(
    z.object({
      key: z.string().min(1),
      value: z.unknown(),
      category: userPreferenceCategorySchema.optional(),
    })
  ),
});

// ============================================================
// USER PREFERENCE RESPONSE SCHEMA
// ============================================================

/**
 * User preference response schema
 */
export const userPreferenceResponseSchema = z.object({
  success: z.boolean(),
  preference: userPreferenceRecordSchema.optional(),
  error: z.string().optional(),
});

// ============================================================
// USER PREFERENCE FILTER SCHEMA
// ============================================================

/**
 * User preference filter schema
 */
export const userPreferenceFilterSchema = z.object({
  userId: idSchema.optional(),
  category: z
    .union([userPreferenceCategorySchema, z.array(userPreferenceCategorySchema)])
    .optional(),
  status: z.union([userPreferenceStatusSchema, z.array(userPreferenceStatusSchema)]).optional(),
  type: z.union([userPreferenceTypeSchema, z.array(userPreferenceTypeSchema)]).optional(),
  defaultOnly: z.boolean().optional(),
  activeOnly: z.boolean().optional(),
  search: z.string().optional(),
});

// ============================================================
// USER PREFERENCE SUMMARY SCHEMA
// ============================================================

/**
 * User preference summary schema
 */
export const userPreferenceSummarySchema = z.object({
  userId: idSchema,
  totalPreferences: z.number().int().min(0),
  activePreferences: z.number().int().min(0),
  defaultPreferences: z.number().int().min(0),
  preferencesByCategory: z.record(userPreferenceCategorySchema, z.number().int().min(0)),
  preferencesByStatus: z.record(userPreferenceStatusSchema, z.number().int().min(0)),
  preferences: z.array(userPreferenceRecordSchema),
});

// ============================================================
// USER DISPLAY PREFERENCES SCHEMA
// ============================================================

/**
 * User display preferences schema
 */
export const userDisplayPreferencesSchema = z.object({
  theme: z.string().optional(),
  fontSize: z.number().optional(),
  fontFamily: z.string().optional(),
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
  density: z.enum(['compact', 'comfortable', 'spacious']).optional(),
  animation: z.boolean().optional(),
  reducedMotion: z.boolean().optional(),
  highContrast: z.boolean().optional(),
  zoomLevel: z.number().optional(),
});

// ============================================================
// USER LANGUAGE PREFERENCES SCHEMA
// ============================================================

/**
 * User language preferences schema
 */
export const userLanguagePreferencesSchema = z.object({
  primary: z.string().min(1),
  secondary: z.string().optional(),
  fallback: z.string().optional(),
  dateFormat: z.string().min(1),
  timeFormat: z.string().min(1),
  timezone: z.string().min(1),
  numberFormat: z.string().optional(),
  currencyFormat: z.string().optional(),
  firstDayOfWeek: z.number().int().min(1).max(7).optional(),
});

// ============================================================
// USER COMMUNICATION PREFERENCES SCHEMA
// ============================================================

/**
 * User communication preferences schema
 */
export const userCommunicationPreferencesSchema = z.object({
  methods: z.array(userCommunicationPreferenceSchema),
  emailEnabled: z.boolean().default(false),
  smsEnabled: z.boolean().default(false),
  pushEnabled: z.boolean().default(false),
  inAppEnabled: z.boolean().default(false),
  phoneEnabled: z.boolean().default(false),
  postalEnabled: z.boolean().default(false),
  whatsappEnabled: z.boolean().default(false),
  telegramEnabled: z.boolean().default(false),
  signalEnabled: z.boolean().default(false),
});

// ============================================================
// USER WORKFLOW PREFERENCES SCHEMA
// ============================================================

/**
 * User workflow preferences schema
 */
export const userWorkflowPreferencesSchema = z.object({
  defaultView: z.string().min(1),
  defaultSort: userDefaultSortOptionSchema,
  defaultSortOrder: userDefaultSortOrderSchema,
  defaultFilter: z.string().optional(),
  itemsPerPage: userItemsPerPageOptionSchema,
  autoSave: z.boolean().default(false),
  autoSaveInterval: z.number().int().min(1).default(30),
  keyboardShortcuts: z.boolean().default(true),
  quickActions: z.boolean().default(true),
  bulkOperations: z.boolean().default(true),
  confirmationDialogs: z.boolean().default(true),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserPreferenceCategory = z.infer<typeof userPreferenceCategorySchema>;
export type UserPreferenceStatus = z.infer<typeof userPreferenceStatusSchema>;
export type UserCommunicationPreference = z.infer<typeof userCommunicationPreferenceSchema>;
export type UserContentPreference = z.infer<typeof userContentPreferenceSchema>;
export type UserDisplayPreference = z.infer<typeof userDisplayPreferenceSchema>;
export type UserLanguagePreference = z.infer<typeof userLanguagePreferenceSchema>;
export type UserWorkflowPreference = z.infer<typeof userWorkflowPreferenceSchema>;
export type UserFeaturePreference = z.infer<typeof userFeaturePreferenceSchema>;
export type UserPreferenceType = z.infer<typeof userPreferenceTypeSchema>;
export type UserDefaultSortOption = z.infer<typeof userDefaultSortOptionSchema>;
export type UserDefaultSortOrder = z.infer<typeof userDefaultSortOrderSchema>;
export type UserPreferenceRecord = z.infer<typeof userPreferenceRecordSchema>;
export type UserPreferenceUpdateRequest = z.infer<typeof userPreferenceUpdateRequestSchema>;
export type UserPreferenceBulkUpdateRequest = z.infer<typeof userPreferenceBulkUpdateRequestSchema>;
export type UserPreferenceResponse = z.infer<typeof userPreferenceResponseSchema>;
export type UserPreferenceFilter = z.infer<typeof userPreferenceFilterSchema>;
export type UserPreferenceSummary = z.infer<typeof userPreferenceSummarySchema>;
export type UserDisplayPreferences = z.infer<typeof userDisplayPreferencesSchema>;
export type UserLanguagePreferences = z.infer<typeof userLanguagePreferencesSchema>;
export type UserCommunicationPreferences = z.infer<typeof userCommunicationPreferencesSchema>;
export type UserWorkflowPreferences = z.infer<typeof userWorkflowPreferencesSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user preference category is valid
 */
export function isValidUserPreferenceCategory(
  category: string
): category is UserPreferenceCategory {
  return Object.values(USER_PREFERENCE_CATEGORY).includes(category as UserPreferenceCategory);
}

/**
 * Check if user preference status is valid
 */
export function isValidUserPreferenceStatus(status: string): status is UserPreferenceStatus {
  return Object.values(USER_PREFERENCE_STATUS).includes(status as UserPreferenceStatus);
}

/**
 * Check if user communication preference is valid
 */
export function isValidUserCommunicationPreference(
  preference: string
): preference is UserCommunicationPreference {
  return Object.values(USER_COMMUNICATION_PREFERENCE).includes(
    preference as UserCommunicationPreference
  );
}

/**
 * Check if user display preference is valid
 */
export function isValidUserDisplayPreference(
  preference: string
): preference is UserDisplayPreference {
  return Object.values(USER_DISPLAY_PREFERENCE).includes(preference as UserDisplayPreference);
}

/**
 * Check if user language preference is valid
 */
export function isValidUserLanguagePreference(
  preference: string
): preference is UserLanguagePreference {
  return Object.values(USER_LANGUAGE_PREFERENCE).includes(preference as UserLanguagePreference);
}

/**
 * Check if user workflow preference is valid
 */
export function isValidUserWorkflowPreference(
  preference: string
): preference is UserWorkflowPreference {
  return Object.values(USER_WORKFLOW_PREFERENCE).includes(preference as UserWorkflowPreference);
}

/**
 * Check if user feature preference is valid
 */
export function isValidUserFeaturePreference(
  preference: string
): preference is UserFeaturePreference {
  return Object.values(USER_FEATURE_PREFERENCE).includes(preference as UserFeaturePreference);
}

/**
 * Check if user content preference is valid
 */
export function isValidUserContentPreference(
  preference: string
): preference is UserContentPreference {
  return Object.values(USER_CONTENT_PREFERENCE).includes(preference as UserContentPreference);
}

/**
 * Check if user preference type is valid
 */
export function isValidUserPreferenceType(type: string): type is UserPreferenceType {
  return Object.values(USER_PREFERENCE_TYPE).includes(type as UserPreferenceType);
}

/**
 * Check if user items per page is valid
 */
export function isValidUserItemsPerPage(value: number): value is UserItemsPerPageOption {
  return Object.values(USER_ITEMS_PER_PAGE_OPTIONS).includes(value as UserItemsPerPageOption);
}

/**
 * Get user preference category display name
 */
export function getUserPreferenceCategoryDisplayName(category: UserPreferenceCategory): string {
  const labels: Record<UserPreferenceCategory, string> = {
    general: 'General Preferences',
    notifications: 'Notification Preferences',
    display: 'Display Preferences',
    language: 'Language & Regional',
    accessibility: 'Accessibility Preferences',
    privacy: 'Privacy Preferences',
    communication: 'Communication Preferences',
    content: 'Content Preferences',
    features: 'Feature Preferences',
    workflow: 'Workflow Preferences',
  };
  return labels[category] || category;
}

/**
 * Get user preference status display name
 */
export function getUserPreferenceStatusDisplayName(status: UserPreferenceStatus): string {
  const labels: Record<UserPreferenceStatus, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    archived: 'Archived',
    default: 'Default',
    custom: 'Custom',
  };
  return labels[status] || status;
}

/**
 * Get user communication preference display name
 */
export function getUserCommunicationPreferenceDisplayName(
  preference: UserCommunicationPreference
): string {
  const labels: Record<UserCommunicationPreference, string> = {
    email: 'Email',
    sms: 'SMS',
    push: 'Push Notifications',
    in_app: 'In-App Notifications',
    phone: 'Phone Calls',
    postal: 'Postal Mail',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    signal: 'Signal',
  };
  return labels[preference] || preference;
}

/**
 * Get user display preference display name
 */
export function getUserDisplayPreferenceDisplayName(preference: UserDisplayPreference): string {
  const labels: Record<UserDisplayPreference, string> = {
    theme: 'Theme',
    font_size: 'Font Size',
    font_family: 'Font Family',
    color_scheme: 'Color Scheme',
    layout: 'Layout',
    density: 'Density/Compact Mode',
    animation: 'Animation',
    reduced_motion: 'Reduced Motion',
    high_contrast: 'High Contrast',
    zoom_level: 'Zoom Level',
  };
  return labels[preference] || preference;
}

/**
 * Get user language preference display name
 */
export function getUserLanguagePreferenceDisplayName(preference: UserLanguagePreference): string {
  const labels: Record<UserLanguagePreference, string> = {
    primary: 'Primary Language',
    secondary: 'Secondary Language',
    fallback: 'Fallback Language',
    date_format: 'Date Format',
    time_format: 'Time Format',
    timezone: 'Timezone',
    number_format: 'Number Format',
    currency_format: 'Currency Format',
    first_day_of_week: 'First Day of Week',
  };
  return labels[preference] || preference;
}

/**
 * Get user workflow preference display name
 */
export function getUserWorkflowPreferenceDisplayName(preference: UserWorkflowPreference): string {
  const labels: Record<UserWorkflowPreference, string> = {
    default_view: 'Default View',
    default_sort: 'Default Sort',
    default_filter: 'Default Filter',
    items_per_page: 'Items Per Page',
    auto_save: 'Auto-Save',
    auto_save_interval: 'Auto-Save Interval',
    keyboard_shortcuts: 'Keyboard Shortcuts',
    quick_actions: 'Quick Actions',
    bulk_operations: 'Bulk Operations',
    confirmation_dialogs: 'Confirmation Dialogs',
  };
  return labels[preference] || preference;
}

/**
 * Get user feature preference display name
 */
export function getUserFeaturePreferenceDisplayName(preference: UserFeaturePreference): string {
  const labels: Record<UserFeaturePreference, string> = {
    beta_features: 'Beta Features',
    experimental_features: 'Experimental Features',
    feature_discovery: 'Feature Discovery',
    feature_tutorials: 'Feature Tutorials',
    onboarding: 'Onboarding',
    tooltips: 'Tooltips',
    walkthroughs: 'Walkthroughs',
    feature_announcements: 'Feature Announcements',
  };
  return labels[preference] || preference;
}

/**
 * Get user content preference display name
 */
export function getUserContentPreferenceDisplayName(preference: UserContentPreference): string {
  const labels: Record<UserContentPreference, string> = {
    adult_content: 'Adult Content',
    explicit_content: 'Explicit Content',
    political_content: 'Political Content',
    religious_content: 'Religious Content',
    sensitive_content: 'Sensitive Content',
    content_language: 'Content Language',
    content_region: 'Content Region',
    maturity_level: 'Maturity Level',
  };
  return labels[preference] || preference;
}

/**
 * Get user preference type display name
 */
export function getUserPreferenceTypeDisplayName(type: UserPreferenceType): string {
  const labels: Record<UserPreferenceType, string> = {
    boolean: 'Boolean (Yes/No)',
    string: 'Text',
    number: 'Number',
    select: 'Select One',
    multi_select: 'Select Multiple',
    color: 'Color',
    date: 'Date',
    time: 'Time',
    datetime: 'Date & Time',
    array: 'Array/List',
    json: 'JSON Object',
  };
  return labels[type] || type;
}

/**
 * Get user items per page display name
 */
export function getUserItemsPerPageDisplayName(value: number): string {
  const labels: Record<number, string> = {
    5: '5',
    10: '10',
    25: '25',
    50: '50',
    75: '75',
    100: '100',
    200: '200',
  };
  return labels[value] || `${value}`;
}

/**
 * Get all user preference categories
 */
export function getAllUserPreferenceCategories(): UserPreferenceCategory[] {
  return Object.values(USER_PREFERENCE_CATEGORY);
}

/**
 * Get all user communication preferences
 */
export function getAllUserCommunicationPreferences(): UserCommunicationPreference[] {
  return Object.values(USER_COMMUNICATION_PREFERENCE);
}

/**
 * Get all user display preferences
 */
export function getAllUserDisplayPreferences(): UserDisplayPreference[] {
  return Object.values(USER_DISPLAY_PREFERENCE);
}

/**
 * Get all user language preferences
 */
export function getAllUserLanguagePreferences(): UserLanguagePreference[] {
  return Object.values(USER_LANGUAGE_PREFERENCE);
}

/**
 * Get all user workflow preferences
 */
export function getAllUserWorkflowPreferences(): UserWorkflowPreference[] {
  return Object.values(USER_WORKFLOW_PREFERENCE);
}

/**
 * Get all user feature preferences
 */
export function getAllUserFeaturePreferences(): UserFeaturePreference[] {
  return Object.values(USER_FEATURE_PREFERENCE);
}

/**
 * Get all user content preferences
 */
export function getAllUserContentPreferences(): UserContentPreference[] {
  return Object.values(USER_CONTENT_PREFERENCE);
}

/**
 * Get all user preference statuses
 */
export function getAllUserPreferenceStatuses(): UserPreferenceStatus[] {
  return Object.values(USER_PREFERENCE_STATUS);
}

/**
 * Get all user preference types
 */
export function getAllUserPreferenceTypes(): UserPreferenceType[] {
  return Object.values(USER_PREFERENCE_TYPE);
}

/**
 * Get all user items per page options
 */
export function getAllUserItemsPerPageOptions(): UserItemsPerPageOption[] {
  return Object.values(USER_ITEMS_PER_PAGE_OPTIONS);
}

/**
 * Get default sort options
 */
export function getUserDefaultSortOptions(): UserDefaultSortOption[] {
  return Object.values(USER_DEFAULT_SORT_OPTIONS);
}

/**
 * Get default sort option display name
 */
export function getUserDefaultSortOptionDisplayName(option: UserDefaultSortOption): string {
  const labels: Record<UserDefaultSortOption, string> = {
    created_at: 'Created Date',
    updated_at: 'Updated Date',
    name: 'Name',
    title: 'Title',
    date: 'Date',
    priority: 'Priority',
    status: 'Status',
    type: 'Type',
  };
  return labels[option] || option;
}
