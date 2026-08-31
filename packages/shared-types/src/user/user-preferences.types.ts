/**
 * User Preferences Types
 * Types for user preferences management
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_PREFERENCE_CATEGORY,
  USER_COMMUNICATION_PREFERENCE,
  USER_CONTENT_PREFERENCE,
  USER_DISPLAY_PREFERENCE,
  USER_LANGUAGE_PREFERENCE,
  USER_WORKFLOW_PREFERENCE,
  USER_FEATURE_PREFERENCE,
  USER_PREFERENCE_TYPE,
  USER_PREFERENCE_CATEGORY_LABELS,
  USER_COMMUNICATION_PREFERENCE_LABELS,
  USER_CONTENT_PREFERENCE_LABELS,
  USER_DISPLAY_PREFERENCE_LABELS,
  USER_LANGUAGE_PREFERENCE_LABELS,
  USER_WORKFLOW_PREFERENCE_LABELS,
  USER_FEATURE_PREFERENCE_LABELS,
  USER_PREFERENCE_TYPE_LABELS,
  USER_DEFAULT_SORT_OPTIONS,
  USER_DEFAULT_SORT_LABELS,
  USER_DEFAULT_SORT_ORDER,
  USER_ITEMS_PER_PAGE_OPTIONS,
  USER_ITEMS_PER_PAGE_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER PREFERENCE STATUS (Local definition)
// ============================================================

/**
 * User preference status
 */
export const USER_PREFERENCE_STATUS = {
  /** Preference is active/enabled */
  ACTIVE: 'active',
  /** Preference is inactive/disabled */
  INACTIVE: 'inactive',
  /** Preference is pending approval */
  PENDING: 'pending',
  /** Preference is archived */
  ARCHIVED: 'archived',
  /** Preference is default */
  DEFAULT: 'default',
  /** Preference is custom */
  CUSTOM: 'custom',
} as const;

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

// ============================================================
// USER PREFERENCE TYPES
// ============================================================

/**
 * User preference category
 */
export type UserPreferenceCategory =
  (typeof USER_PREFERENCE_CATEGORY)[keyof typeof USER_PREFERENCE_CATEGORY];

/**
 * User preference status
 */
export type UserPreferenceStatus =
  (typeof USER_PREFERENCE_STATUS)[keyof typeof USER_PREFERENCE_STATUS];

/**
 * User communication preference
 */
export type UserCommunicationPreference =
  (typeof USER_COMMUNICATION_PREFERENCE)[keyof typeof USER_COMMUNICATION_PREFERENCE];

/**
 * User content preference
 */
export type UserContentPreference =
  (typeof USER_CONTENT_PREFERENCE)[keyof typeof USER_CONTENT_PREFERENCE];

/**
 * User display preference
 */
export type UserDisplayPreference =
  (typeof USER_DISPLAY_PREFERENCE)[keyof typeof USER_DISPLAY_PREFERENCE];

/**
 * User language preference
 */
export type UserLanguagePreference =
  (typeof USER_LANGUAGE_PREFERENCE)[keyof typeof USER_LANGUAGE_PREFERENCE];

/**
 * User workflow preference
 */
export type UserWorkflowPreference =
  (typeof USER_WORKFLOW_PREFERENCE)[keyof typeof USER_WORKFLOW_PREFERENCE];

/**
 * User feature preference
 */
export type UserFeaturePreference =
  (typeof USER_FEATURE_PREFERENCE)[keyof typeof USER_FEATURE_PREFERENCE];

/**
 * User preference type
 */
export type UserPreferenceType = (typeof USER_PREFERENCE_TYPE)[keyof typeof USER_PREFERENCE_TYPE];

/**
 * User default sort option
 */
export type UserDefaultSortOption =
  (typeof USER_DEFAULT_SORT_OPTIONS)[keyof typeof USER_DEFAULT_SORT_OPTIONS];

/**
 * User default sort order
 */
export type UserDefaultSortOrder =
  (typeof USER_DEFAULT_SORT_ORDER)[keyof typeof USER_DEFAULT_SORT_ORDER];

/**
 * User items per page option
 */
export type UserItemsPerPageOption =
  (typeof USER_ITEMS_PER_PAGE_OPTIONS)[keyof typeof USER_ITEMS_PER_PAGE_OPTIONS];

// ============================================================
// USER PREFERENCE RECORD
// ============================================================

/**
 * User preference record
 */
export interface UserPreferenceRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Preference category */
  category: UserPreferenceCategory;
  /** Preference key */
  key: string;
  /** Preference value */
  value: unknown;
  /** Preference type */
  type: UserPreferenceType;
  /** Preference status */
  status: UserPreferenceStatus;
  /** Whether this is a default preference */
  isDefault: boolean;
  /** Whether this is active */
  isActive: boolean;
  /** When the preference was set */
  setAt: Timestamp;
  /** When the preference was last updated */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER PREFERENCE REQUEST
// ============================================================

/**
 * User preference update request
 */
export interface UserPreferenceUpdateRequest {
  /** User ID */
  userId: ID;
  /** Preference category */
  category?: UserPreferenceCategory;
  /** Preference key */
  key: string;
  /** Preference value */
  value: unknown;
}

/**
 * User preference bulk update request
 */
export interface UserPreferenceBulkUpdateRequest {
  /** User ID */
  userId: ID;
  /** Preferences to update */
  preferences: {
    key: string;
    value: unknown;
    category?: UserPreferenceCategory;
  }[];
}

// ============================================================
// USER PREFERENCE RESPONSE
// ============================================================

/**
 * User preference response
 */
export interface UserPreferenceResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Preference record if successful */
  preference?: UserPreferenceRecord;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// USER PREFERENCE FILTER
// ============================================================

/**
 * User preference filter
 */
export interface UserPreferenceFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by preference category */
  category?: UserPreferenceCategory | UserPreferenceCategory[];
  /** Filter by preference status */
  status?: UserPreferenceStatus | UserPreferenceStatus[];
  /** Filter by preference type */
  type?: UserPreferenceType | UserPreferenceType[];
  /** Filter by default preferences only */
  defaultOnly?: boolean;
  /** Filter by active preferences only */
  activeOnly?: boolean;
  /** Search by key */
  search?: string;
}

// ============================================================
// USER PREFERENCE SUMMARY
// ============================================================

/**
 * User preference summary
 */
export interface UserPreferenceSummary {
  /** User ID */
  userId: ID;
  /** Total preferences */
  totalPreferences: number;
  /** Active preferences */
  activePreferences: number;
  /** Default preferences */
  defaultPreferences: number;
  /** Preferences by category */
  preferencesByCategory: Record<UserPreferenceCategory, number>;
  /** Preferences by status */
  preferencesByStatus: Record<UserPreferenceStatus, number>;
  /** All preferences */
  preferences: UserPreferenceRecord[];
}

// ============================================================
// USER DISPLAY PREFERENCES
// ============================================================

/**
 * User display preferences
 */
export interface UserDisplayPreferences {
  /** Theme preference */
  theme?: string;
  /** Font size */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Color scheme */
  colorScheme?: string;
  /** Layout preference */
  layout?: string;
  /** Density/compact mode */
  density?: 'compact' | 'comfortable' | 'spacious';
  /** Animation preference */
  animation?: boolean;
  /** Reduced motion */
  reducedMotion?: boolean;
  /** High contrast */
  highContrast?: boolean;
  /** Zoom level */
  zoomLevel?: number;
}

// ============================================================
// USER LANGUAGE PREFERENCES
// ============================================================

/**
 * User language preferences
 */
export interface UserLanguagePreferences {
  /** Primary language */
  primary: string;
  /** Secondary language */
  secondary?: string;
  /** Fallback language */
  fallback?: string;
  /** Date format */
  dateFormat: string;
  /** Time format */
  timeFormat: string;
  /** Timezone */
  timezone: string;
  /** Number format */
  numberFormat?: string;
  /** Currency format */
  currencyFormat?: string;
  /** First day of week */
  firstDayOfWeek?: number;
}

// ============================================================
// USER COMMUNICATION PREFERENCES
// ============================================================

/**
 * User communication preferences
 */
export interface UserCommunicationPreferences {
  /** Communication methods enabled */
  methods: UserCommunicationPreference[];
  /** Email notifications enabled */
  emailEnabled: boolean;
  /** SMS notifications enabled */
  smsEnabled: boolean;
  /** Push notifications enabled */
  pushEnabled: boolean;
  /** In-app notifications enabled */
  inAppEnabled: boolean;
  /** Phone calls enabled */
  phoneEnabled: boolean;
  /** Postal mail enabled */
  postalEnabled: boolean;
  /** WhatsApp enabled */
  whatsappEnabled: boolean;
  /** Telegram enabled */
  telegramEnabled: boolean;
  /** Signal enabled */
  signalEnabled: boolean;
}

// ============================================================
// USER WORKFLOW PREFERENCES
// ============================================================

/**
 * User workflow preferences
 */
export interface UserWorkflowPreferences {
  /** Default view */
  defaultView: string;
  /** Default sort */
  defaultSort: UserDefaultSortOption;
  /** Default sort order */
  defaultSortOrder: UserDefaultSortOrder;
  /** Default filter */
  defaultFilter?: string;
  /** Items per page */
  itemsPerPage: UserItemsPerPageOption;
  /** Auto-save enabled */
  autoSave: boolean;
  /** Auto-save interval in seconds */
  autoSaveInterval: number;
  /** Keyboard shortcuts enabled */
  keyboardShortcuts: boolean;
  /** Quick actions enabled */
  quickActions: boolean;
  /** Bulk operations enabled */
  bulkOperations: boolean;
  /** Confirmation dialogs enabled */
  confirmationDialogs: boolean;
}

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
  return USER_PREFERENCE_CATEGORY_LABELS[category] || category;
}

/**
 * Get user preference status display name
 */
export function getUserPreferenceStatusDisplayName(status: UserPreferenceStatus): string {
  return USER_PREFERENCE_STATUS_LABELS[status] || status;
}

/**
 * Get user communication preference display name
 */
export function getUserCommunicationPreferenceDisplayName(
  preference: UserCommunicationPreference
): string {
  return USER_COMMUNICATION_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user display preference display name
 */
export function getUserDisplayPreferenceDisplayName(preference: UserDisplayPreference): string {
  return USER_DISPLAY_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user language preference display name
 */
export function getUserLanguagePreferenceDisplayName(preference: UserLanguagePreference): string {
  return USER_LANGUAGE_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user workflow preference display name
 */
export function getUserWorkflowPreferenceDisplayName(preference: UserWorkflowPreference): string {
  return USER_WORKFLOW_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user feature preference display name
 */
export function getUserFeaturePreferenceDisplayName(preference: UserFeaturePreference): string {
  return USER_FEATURE_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user content preference display name
 */
export function getUserContentPreferenceDisplayName(preference: UserContentPreference): string {
  return USER_CONTENT_PREFERENCE_LABELS[preference] || preference;
}

/**
 * Get user preference type display name
 */
export function getUserPreferenceTypeDisplayName(type: UserPreferenceType): string {
  return USER_PREFERENCE_TYPE_LABELS[type] || type;
}

/**
 * Get user items per page display name
 */
export function getUserItemsPerPageDisplayName(value: number): string {
  return USER_ITEMS_PER_PAGE_LABELS[value] || `${value}`;
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
  return USER_DEFAULT_SORT_LABELS[option] || option;
}
