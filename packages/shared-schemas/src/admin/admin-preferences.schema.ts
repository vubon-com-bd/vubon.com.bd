/**
 * Admin Preferences Schema
 * Zod schemas for admin user preferences and personalization
 */

import { z } from 'zod';
import { idSchema, timestampSchema, nullable } from '../common/core-primitives.schema';

/**
 * Admin preference category enum schema (from constants)
 */
export const adminPreferenceCategorySchema = z.enum([
  'display',
  'notification',
  'language',
  'time',
  'accessibility',
  'privacy',
  'workflow',
  'shortcuts',
  'widgets',
]);

/**
 * Admin theme type enum schema (from constants)
 */
export const adminThemeTypeSchema = z.enum(['light', 'dark', 'system', 'auto', 'custom']);

/**
 * Admin layout type enum schema (from constants)
 */
export const adminLayoutTypeSchema = z.enum(['default', 'compact', 'fluid', 'boxed']);

/**
 * Admin font size enum schema (from constants)
 */
export const adminFontSizeSchema = z.enum(['small', 'medium', 'large', 'extra_large']);

/**
 * Admin density type enum schema (from constants)
 */
export const adminDensityTypeSchema = z.enum(['comfortable', 'compact', 'cozy']);

/**
 * Admin notification frequency enum schema (from constants)
 */
export const adminNotificationFrequencySchema = z.enum([
  'real_time',
  'hourly',
  'daily',
  'weekly',
  'none',
]);

/**
 * Admin working hours schema
 */
export const adminWorkingHoursSchema = z.object({
  start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  days: z.array(z.number().int().min(0).max(6)),
});

/**
 * Admin display preferences schema
 */
export const adminDisplayPreferencesSchema = z.object({
  theme: adminThemeTypeSchema,
  layout: adminLayoutTypeSchema,
  sidebar: z.enum(['expanded', 'collapsed', 'hidden']),
  navbar: z.enum(['fixed', 'static', 'hidden']),
  fontSize: adminFontSizeSchema,
  colorScheme: z.string().default('default'),
  animation: z.boolean().default(true),
  density: adminDensityTypeSchema,
});

/**
 * Admin notification preferences schema
 */
export const adminNotificationPreferencesSchema = z.object({
  email: z.boolean().default(true),
  push: z.boolean().default(true),
  inApp: z.boolean().default(true),
  sms: z.boolean().default(false),
  digest: z.boolean().default(false),
  frequency: adminNotificationFrequencySchema,
  sound: z.boolean().default(true),
  desktop: z.boolean().default(true),
});

/**
 * Admin language preferences schema
 */
export const adminLanguagePreferencesSchema = z.object({
  primaryLanguage: z.string().default('en'),
  secondaryLanguage: nullable(z.string()),
  fallbackLanguage: nullable(z.string()),
  dateLocale: z.string().default('en-US'),
  numberFormat: z.string().default('en-US'),
});

/**
 * Admin time preferences schema
 */
export const adminTimePreferencesSchema = z.object({
  timezone: z.string().default('UTC'),
  dateFormat: z.string().default('YYYY-MM-DD'),
  timeFormat: z.enum(['12h', '24h']).default('24h'),
  weekStart: z.union([z.literal(0), z.literal(1)]).default(1),
  workingHours: adminWorkingHoursSchema,
});

/**
 * Admin accessibility preferences schema
 */
export const adminAccessibilityPreferencesSchema = z.object({
  highContrast: z.boolean().default(false),
  screenReader: z.boolean().default(false),
  reducedMotion: z.boolean().default(false),
  largeText: z.boolean().default(false),
  colorblindMode: z.enum(['none', 'protanopia', 'deuteranopia', 'tritanopia']).default('none'),
  keyboardNavigation: z.boolean().default(true),
});

/**
 * Admin privacy preferences schema
 */
export const adminPrivacyPreferencesSchema = z.object({
  showEmail: z.boolean().default(false),
  showPhone: z.boolean().default(false),
  showOnline: z.boolean().default(true),
  showLastSeen: z.boolean().default(true),
  acceptCookies: z.boolean().default(true),
  tracking: z.boolean().default(true),
});

/**
 * Admin workflow preferences schema
 */
export const adminWorkflowPreferencesSchema = z.object({
  autoSave: z.boolean().default(true),
  confirmActions: z.boolean().default(true),
  draftAutoSave: z.number().int().min(5).max(300).default(30),
  bulkActions: z.boolean().default(true),
  viewPersistence: z.boolean().default(true),
});

/**
 * Admin shortcut preferences schema
 */
export const adminShortcutPreferencesSchema = z.object({
  shortcuts: z.record(z.string()).default({}),
  enabled: z.boolean().default(true),
  showHints: z.boolean().default(true),
});

/**
 * Admin widget layout schema
 */
export const adminWidgetLayoutSchema = z.object({
  id: z.string(),
  column: z.number().int().min(0),
  row: z.number().int().min(0),
  width: z.number().int().min(1),
  height: z.number().int().min(1),
  visible: z.boolean().default(true),
});

/**
 * Admin widget preferences schema
 */
export const adminWidgetPreferencesSchema = z.object({
  layout: z.array(adminWidgetLayoutSchema).default([]),
  enabledWidgets: z.array(z.string()).default([]),
  widgetOrder: z.array(z.string()).default([]),
});

/**
 * Admin preferences schema (complete)
 */
export const adminPreferencesSchema = z.object({
  id: idSchema,
  adminId: idSchema,
  display: adminDisplayPreferencesSchema,
  notification: adminNotificationPreferencesSchema,
  language: adminLanguagePreferencesSchema,
  time: adminTimePreferencesSchema,
  accessibility: adminAccessibilityPreferencesSchema,
  privacy: adminPrivacyPreferencesSchema,
  workflow: adminWorkflowPreferencesSchema,
  shortcuts: adminShortcutPreferencesSchema,
  widgets: adminWidgetPreferencesSchema,
  isActive: z.boolean().default(true),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin preference update data schema
 */
export const adminPreferenceUpdateDataSchema = z.object({
  display: adminDisplayPreferencesSchema.partial().optional(),
  notification: adminNotificationPreferencesSchema.partial().optional(),
  language: adminLanguagePreferencesSchema.partial().optional(),
  time: adminTimePreferencesSchema.partial().optional(),
  accessibility: adminAccessibilityPreferencesSchema.partial().optional(),
  privacy: adminPrivacyPreferencesSchema.partial().optional(),
  workflow: adminWorkflowPreferencesSchema.partial().optional(),
  shortcuts: adminShortcutPreferencesSchema.partial().optional(),
  widgets: adminWidgetPreferencesSchema.partial().optional(),
});

/**
 * Type inference from schemas
 */
export type AdminPreferenceCategorySchema = z.infer<typeof adminPreferenceCategorySchema>;
export type AdminThemeTypeSchema = z.infer<typeof adminThemeTypeSchema>;
export type AdminLayoutTypeSchema = z.infer<typeof adminLayoutTypeSchema>;
export type AdminFontSizeSchema = z.infer<typeof adminFontSizeSchema>;
export type AdminDensityTypeSchema = z.infer<typeof adminDensityTypeSchema>;
export type AdminNotificationFrequencySchema = z.infer<typeof adminNotificationFrequencySchema>;
export type AdminWorkingHoursSchema = z.infer<typeof adminWorkingHoursSchema>;
export type AdminDisplayPreferencesSchema = z.infer<typeof adminDisplayPreferencesSchema>;
export type AdminNotificationPreferencesSchema = z.infer<typeof adminNotificationPreferencesSchema>;
export type AdminLanguagePreferencesSchema = z.infer<typeof adminLanguagePreferencesSchema>;
export type AdminTimePreferencesSchema = z.infer<typeof adminTimePreferencesSchema>;
export type AdminAccessibilityPreferencesSchema = z.infer<
  typeof adminAccessibilityPreferencesSchema
>;
export type AdminPrivacyPreferencesSchema = z.infer<typeof adminPrivacyPreferencesSchema>;
export type AdminWorkflowPreferencesSchema = z.infer<typeof adminWorkflowPreferencesSchema>;
export type AdminShortcutPreferencesSchema = z.infer<typeof adminShortcutPreferencesSchema>;
export type AdminWidgetLayoutSchema = z.infer<typeof adminWidgetLayoutSchema>;
export type AdminWidgetPreferencesSchema = z.infer<typeof adminWidgetPreferencesSchema>;
export type AdminPreferencesSchema = z.infer<typeof adminPreferencesSchema>;
export type AdminPreferenceUpdateDataSchema = z.infer<typeof adminPreferenceUpdateDataSchema>;

/**
 * Helper function to get theme label
 */
export function getAdminThemeLabelFromTheme(theme: AdminThemeTypeSchema): string {
  const labelMap: Record<AdminThemeTypeSchema, string> = {
    light: 'Light',
    dark: 'Dark',
    system: 'System Default',
    auto: 'Auto',
    custom: 'Custom',
  };
  return labelMap[theme] || theme;
}

/**
 * Helper function to get layout label
 */
export function getAdminLayoutLabelFromLayout(layout: AdminLayoutTypeSchema): string {
  const labelMap: Record<AdminLayoutTypeSchema, string> = {
    default: 'Default',
    compact: 'Compact',
    fluid: 'Fluid',
    boxed: 'Boxed',
  };
  return labelMap[layout] || layout;
}

/**
 * Helper function to get font size label
 */
export function getAdminFontSizeLabelFromSize(size: AdminFontSizeSchema): string {
  const labelMap: Record<AdminFontSizeSchema, string> = {
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    extra_large: 'Extra Large',
  };
  return labelMap[size] || size;
}

/**
 * Helper function to get density label
 */
export function getAdminDensityLabelFromDensity(density: AdminDensityTypeSchema): string {
  const labelMap: Record<AdminDensityTypeSchema, string> = {
    comfortable: 'Comfortable',
    compact: 'Compact',
    cozy: 'Cozy',
  };
  return labelMap[density] || density;
}

/**
 * Helper function to get notification frequency label
 */
export function getAdminNotificationFrequencyLabelFromFrequency(
  frequency: AdminNotificationFrequencySchema
): string {
  const labelMap: Record<AdminNotificationFrequencySchema, string> = {
    real_time: 'Real Time',
    hourly: 'Hourly',
    daily: 'Daily',
    weekly: 'Weekly',
    none: 'None',
  };
  return labelMap[frequency] || frequency;
}

/**
 * Helper function to get preference category label
 */
export function getAdminPreferenceCategoryLabelFromCategory(
  category: AdminPreferenceCategorySchema
): string {
  const labelMap: Record<AdminPreferenceCategorySchema, string> = {
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
  return labelMap[category] || category;
}

/**
 * Helper function to create default preferences for an admin
 */
export function createDefaultAdminPreferences(adminId: string): AdminPreferencesSchema {
  const now = new Date();
  return {
    id: `pref_${adminId}`,
    adminId,
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
      secondaryLanguage: null,
      fallbackLanguage: null,
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
    isActive: true,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };
}

/**
 * Helper function to validate preference category
 */
export function isValidAdminPreferenceCategory(
  category: string
): category is AdminPreferenceCategorySchema {
  const validCategories: AdminPreferenceCategorySchema[] = [
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
  return validCategories.includes(category as AdminPreferenceCategorySchema);
}

/**
 * Helper function to get preference update data from partial preferences
 */
export function getAdminPreferenceUpdateDataFromPartial(
  preferences: Partial<AdminPreferencesSchema>
): AdminPreferenceUpdateDataSchema {
  const updateData: AdminPreferenceUpdateDataSchema = {};

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
 * Export schemas as an object for convenient access
 */
export const adminPreferenceSchemas = {
  preferences: adminPreferencesSchema,
  category: adminPreferenceCategorySchema,
  theme: adminThemeTypeSchema,
  layout: adminLayoutTypeSchema,
  fontSize: adminFontSizeSchema,
  density: adminDensityTypeSchema,
  notificationFrequency: adminNotificationFrequencySchema,
  workingHours: adminWorkingHoursSchema,
  display: adminDisplayPreferencesSchema,
  notification: adminNotificationPreferencesSchema,
  language: adminLanguagePreferencesSchema,
  time: adminTimePreferencesSchema,
  accessibility: adminAccessibilityPreferencesSchema,
  privacy: adminPrivacyPreferencesSchema,
  workflow: adminWorkflowPreferencesSchema,
  shortcuts: adminShortcutPreferencesSchema,
  widgetLayout: adminWidgetLayoutSchema,
  widgets: adminWidgetPreferencesSchema,
  updateData: adminPreferenceUpdateDataSchema,
  getThemeLabel: getAdminThemeLabelFromTheme,
  getLayoutLabel: getAdminLayoutLabelFromLayout,
  getFontSizeLabel: getAdminFontSizeLabelFromSize,
  getDensityLabel: getAdminDensityLabelFromDensity,
  getFrequencyLabel: getAdminNotificationFrequencyLabelFromFrequency,
  getCategoryLabel: getAdminPreferenceCategoryLabelFromCategory,
  createDefault: createDefaultAdminPreferences,
  isValidCategory: isValidAdminPreferenceCategory,
  getUpdateData: getAdminPreferenceUpdateDataFromPartial,
};

export default adminPreferenceSchemas;
