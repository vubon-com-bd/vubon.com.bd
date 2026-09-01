/**
 * Admin Preferences Types
 * User preferences and personalization definitions
 */

import { BaseEntity, ID, Nullable } from '../common/core-primitives.types';

/**
 * Preference category type
 * Based on PREFERENCE_CATEGORY from constants
 */
export type AdminPreferenceCategory =
  | 'display'
  | 'notification'
  | 'language'
  | 'time'
  | 'accessibility'
  | 'privacy'
  | 'workflow'
  | 'shortcuts'
  | 'widgets';

/**
 * Theme type
 * Based on THEME_TYPE from constants
 */
export type AdminThemeType = 'light' | 'dark' | 'system' | 'auto' | 'custom';

/**
 * Layout type
 * Based on LAYOUT_TYPE from constants
 */
export type AdminLayoutType = 'default' | 'compact' | 'fluid' | 'boxed';

/**
 * Font size type
 * Based on FONT_SIZE from constants
 */
export type AdminFontSize = 'small' | 'medium' | 'large' | 'extra_large';

/**
 * Density type
 * Based on DENSITY_TYPE from constants
 */
export type AdminDensityType = 'comfortable' | 'compact' | 'cozy';

/**
 * Notification frequency type
 * Based on NOTIFICATION_FREQUENCY from constants
 */
export type AdminNotificationFrequency = 'real_time' | 'hourly' | 'daily' | 'weekly' | 'none';

/**
 * Admin preferences interface
 * Complete user preferences for an admin
 */
export interface AdminPreferences extends BaseEntity {
  /** Admin ID */
  adminId: ID;
  /** Display preferences */
  display: AdminDisplayPreferences;
  /** Notification preferences */
  notification: AdminNotificationPreferences;
  /** Language preferences */
  language: AdminLanguagePreferences;
  /** Time preferences */
  time: AdminTimePreferences;
  /** Accessibility preferences */
  accessibility: AdminAccessibilityPreferences;
  /** Privacy preferences */
  privacy: AdminPrivacyPreferences;
  /** Workflow preferences */
  workflow: AdminWorkflowPreferences;
  /** Shortcut preferences */
  shortcuts: AdminShortcutPreferences;
  /** Widget preferences */
  widgets: AdminWidgetPreferences;
  /** Whether preferences are active */
  isActive: boolean;
}

/**
 * Display preferences
 */
export interface AdminDisplayPreferences {
  /** UI theme */
  theme: AdminThemeType;
  /** Layout style */
  layout: AdminLayoutType;
  /** Sidebar state */
  sidebar: 'expanded' | 'collapsed' | 'hidden';
  /** Navbar state */
  navbar: 'fixed' | 'static' | 'hidden';
  /** Font size */
  fontSize: AdminFontSize;
  /** Color scheme */
  colorScheme: string;
  /** Animation enabled */
  animation: boolean;
  /** UI density */
  density: AdminDensityType;
}

/**
 * Notification preferences
 */
export interface AdminNotificationPreferences {
  /** Email notifications enabled */
  email: boolean;
  /** Push notifications enabled */
  push: boolean;
  /** In-app notifications enabled */
  inApp: boolean;
  /** SMS notifications enabled */
  sms: boolean;
  /** Digest notifications enabled */
  digest: boolean;
  /** Notification frequency */
  frequency: AdminNotificationFrequency;
  /** Sound notifications enabled */
  sound: boolean;
  /** Desktop notifications enabled */
  desktop: boolean;
}

/**
 * Language preferences
 */
export interface AdminLanguagePreferences {
  /** Primary language */
  primaryLanguage: string;
  /** Secondary language */
  secondaryLanguage?: Nullable<string>;
  /** Fallback language */
  fallbackLanguage?: Nullable<string>;
  /** Date locale */
  dateLocale: string;
  /** Number format */
  numberFormat: string;
}

/**
 * Time preferences
 */
export interface AdminTimePreferences {
  /** Timezone */
  timezone: string;
  /** Date format */
  dateFormat: string;
  /** Time format (12h or 24h) */
  timeFormat: '12h' | '24h';
  /** Week start day (0=Sunday, 1=Monday) */
  weekStart: 0 | 1;
  /** Working hours */
  workingHours: AdminWorkingHours;
}

/**
 * Working hours
 */
export interface AdminWorkingHours {
  /** Start time (HH:MM) */
  start: string;
  /** End time (HH:MM) */
  end: string;
  /** Working days (0=Sunday, 6=Saturday) */
  days: number[];
}

/**
 * Accessibility preferences
 */
export interface AdminAccessibilityPreferences {
  /** High contrast mode */
  highContrast: boolean;
  /** Screen reader support */
  screenReader: boolean;
  /** Reduced motion */
  reducedMotion: boolean;
  /** Large text */
  largeText: boolean;
  /** Colorblind mode */
  colorblindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  /** Keyboard navigation */
  keyboardNavigation: boolean;
}

/**
 * Privacy preferences
 */
export interface AdminPrivacyPreferences {
  /** Show email to others */
  showEmail: boolean;
  /** Show phone to others */
  showPhone: boolean;
  /** Show online status */
  showOnline: boolean;
  /** Show last seen */
  showLastSeen: boolean;
  /** Accept cookies */
  acceptCookies: boolean;
  /** Allow tracking */
  tracking: boolean;
}

/**
 * Workflow preferences
 */
export interface AdminWorkflowPreferences {
  /** Auto-save enabled */
  autoSave: boolean;
  /** Confirm actions before executing */
  confirmActions: boolean;
  /** Draft auto-save interval (seconds) */
  draftAutoSave: number;
  /** Bulk actions enabled */
  bulkActions: boolean;
  /** View persistence */
  viewPersistence: boolean;
}

/**
 * Shortcut preferences
 */
export interface AdminShortcutPreferences {
  /** Custom shortcuts mapping */
  shortcuts: Record<string, string>;
  /** Enable keyboard shortcuts */
  enabled: boolean;
  /** Show shortcut hints */
  showHints: boolean;
}

/**
 * Widget preferences
 */
export interface AdminWidgetPreferences {
  /** Dashboard widgets layout */
  layout: AdminWidgetLayout[];
  /** Enabled widgets */
  enabledWidgets: string[];
  /** Widget order */
  widgetOrder: string[];
}

/**
 * Widget layout
 */
export interface AdminWidgetLayout {
  /** Widget ID */
  id: string;
  /** Column position */
  column: number;
  /** Row position */
  row: number;
  /** Width in grid units */
  width: number;
  /** Height in grid units */
  height: number;
  /** Whether widget is visible */
  visible: boolean;
}

/**
 * Preference update data
 */
export interface AdminPreferenceUpdateData {
  /** Display preferences */
  display?: Partial<AdminDisplayPreferences>;
  /** Notification preferences */
  notification?: Partial<AdminNotificationPreferences>;
  /** Language preferences */
  language?: Partial<AdminLanguagePreferences>;
  /** Time preferences */
  time?: Partial<AdminTimePreferences>;
  /** Accessibility preferences */
  accessibility?: Partial<AdminAccessibilityPreferences>;
  /** Privacy preferences */
  privacy?: Partial<AdminPrivacyPreferences>;
  /** Workflow preferences */
  workflow?: Partial<AdminWorkflowPreferences>;
  /** Shortcut preferences */
  shortcuts?: Partial<AdminShortcutPreferences>;
  /** Widget preferences */
  widgets?: Partial<AdminWidgetPreferences>;
}

/**
 * Get theme label
 */
export function getAdminThemeLabel(theme: AdminThemeType): string {
  const labels: Record<AdminThemeType, string> = {
    light: 'Light',
    dark: 'Dark',
    system: 'System Default',
    auto: 'Auto',
    custom: 'Custom',
  };
  return labels[theme] || theme;
}

/**
 * Get layout label
 */
export function getAdminLayoutLabel(layout: AdminLayoutType): string {
  const labels: Record<AdminLayoutType, string> = {
    default: 'Default',
    compact: 'Compact',
    fluid: 'Fluid',
    boxed: 'Boxed',
  };
  return labels[layout] || layout;
}

/**
 * Get font size label
 */
export function getAdminFontSizeLabel(size: AdminFontSize): string {
  const labels: Record<AdminFontSize, string> = {
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    extra_large: 'Extra Large',
  };
  return labels[size] || size;
}

/**
 * Get density label
 */
export function getAdminDensityLabel(density: AdminDensityType): string {
  const labels: Record<AdminDensityType, string> = {
    comfortable: 'Comfortable',
    compact: 'Compact',
    cozy: 'Cozy',
  };
  return labels[density] || density;
}

/**
 * Get notification frequency label
 */
export function getAdminNotificationFrequencyLabel(frequency: AdminNotificationFrequency): string {
  const labels: Record<AdminNotificationFrequency, string> = {
    real_time: 'Real Time',
    hourly: 'Hourly',
    daily: 'Daily',
    weekly: 'Weekly',
    none: 'None',
  };
  return labels[frequency] || frequency;
}

/**
 * Get preference category label
 */
export function getAdminPreferenceCategoryLabel(category: AdminPreferenceCategory): string {
  const labels: Record<AdminPreferenceCategory, string> = {
    display: 'Display',
    notification: 'Notifications',
    language: 'Language',
    time: 'Time & Region',
    accessibility: 'Accessibility',
    privacy: 'Privacy',
    workflow: 'Workflow',
    shortcuts: 'Shortcuts',
    widgets: 'Widgets',
  };
  return labels[category] || category;
}

/**
 * Create default preferences for an admin
 */
export function createDefaultAdminPreferences(adminId: ID): AdminPreferences {
  const now = new Date();
  return {
    id: `pref_${adminId}`,
    adminId,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    isActive: true,
    display: {
      theme: 'system',
      layout: 'default',
      sidebar: 'expanded',
      navbar: 'fixed',
      fontSize: 'medium',
      colorScheme: 'default',
      animation: true,
      density: 'comfortable',
    },
    notification: {
      email: true,
      push: true,
      inApp: true,
      sms: false,
      digest: false,
      frequency: 'real_time',
      sound: true,
      desktop: true,
    },
    language: {
      primaryLanguage: 'en',
      dateLocale: 'en-US',
      numberFormat: 'en-US',
    },
    time: {
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
      weekStart: 1,
      workingHours: {
        start: '09:00',
        end: '17:00',
        days: [1, 2, 3, 4, 5],
      },
    },
    accessibility: {
      highContrast: false,
      screenReader: false,
      reducedMotion: false,
      largeText: false,
      colorblindMode: 'none',
      keyboardNavigation: true,
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      showOnline: true,
      showLastSeen: true,
      acceptCookies: true,
      tracking: true,
    },
    workflow: {
      autoSave: true,
      confirmActions: true,
      draftAutoSave: 30,
      bulkActions: true,
      viewPersistence: true,
    },
    shortcuts: {
      shortcuts: {},
      enabled: true,
      showHints: true,
    },
    widgets: {
      layout: [],
      enabledWidgets: [],
      widgetOrder: [],
    },
  };
}

/**
 * Validate preference category
 */
export function isValidAdminPreferenceCategory(
  category: string
): category is AdminPreferenceCategory {
  const validCategories: AdminPreferenceCategory[] = [
    'display',
    'notification',
    'language',
    'time',
    'accessibility',
    'privacy',
    'workflow',
    'shortcuts',
    'widgets',
  ];
  return validCategories.includes(category as AdminPreferenceCategory);
}

/**
 * Get preference update data from partial preferences
 */
export function getAdminPreferenceUpdateData(
  preferences: Partial<AdminPreferences>
): AdminPreferenceUpdateData {
  const updateData: AdminPreferenceUpdateData = {};

  if (preferences.display) {
    updateData.display = preferences.display;
  }
  if (preferences.notification) {
    updateData.notification = preferences.notification;
  }
  if (preferences.language) {
    updateData.language = preferences.language;
  }
  if (preferences.time) {
    updateData.time = preferences.time;
  }
  if (preferences.accessibility) {
    updateData.accessibility = preferences.accessibility;
  }
  if (preferences.privacy) {
    updateData.privacy = preferences.privacy;
  }
  if (preferences.workflow) {
    updateData.workflow = preferences.workflow;
  }
  if (preferences.shortcuts) {
    updateData.shortcuts = preferences.shortcuts;
  }
  if (preferences.widgets) {
    updateData.widgets = preferences.widgets;
  }

  return updateData;
}

/**
 * Get category-specific preferences
 */
export function getAdminCategoryPreferences(
  preferences: AdminPreferences,
  category: AdminPreferenceCategory
): Partial<AdminPreferences> {
  switch (category) {
    case 'display':
      return { display: preferences.display };
    case 'notification':
      return { notification: preferences.notification };
    case 'language':
      return { language: preferences.language };
    case 'time':
      return { time: preferences.time };
    case 'accessibility':
      return { accessibility: preferences.accessibility };
    case 'privacy':
      return { privacy: preferences.privacy };
    case 'workflow':
      return { workflow: preferences.workflow };
    case 'shortcuts':
      return { shortcuts: preferences.shortcuts };
    case 'widgets':
      return { widgets: preferences.widgets };
    default:
      return {};
  }
}
