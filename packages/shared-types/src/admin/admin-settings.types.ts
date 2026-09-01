/**
 * Admin Settings Types
 * Settings and configuration definitions
 */

import { ID, Timestamp, Nullable } from '../common/core-primitives.types';

/**
 * Setting category type
 * Based on SETTINGS_CATEGORY from constants
 */
export type AdminSettingCategory =
  | 'general'
  | 'security'
  | 'notification'
  | 'preference'
  | 'integration'
  | 'api'
  | 'system'
  | 'business'
  | 'user'
  | 'product'
  | 'order'
  | 'payment'
  | 'shipping'
  | 'tax'
  | 'inventory'
  | 'report'
  | 'analytics';

/**
 * Setting type type
 * Based on SETTING_TYPE from constants
 */
export type AdminSettingType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'json'
  | 'enum'
  | 'date'
  | 'time'
  | 'datetime'
  | 'email'
  | 'url'
  | 'phone'
  | 'password'
  | 'color'
  | 'file'
  | 'image';

/**
 * Setting visibility type
 * Based on SETTING_VISIBILITY from constants
 */
export type AdminSettingVisibility = 'public' | 'private' | 'protected' | 'hidden';

/**
 * Primitive setting value types
 */
export type AdminSettingPrimitive = string | number | boolean | null;

/**
 * Setting value type
 * Union of all possible setting value types (non-recursive)
 */
export type AdminSettingValue =
  | AdminSettingPrimitive
  | AdminSettingPrimitive[]
  | Record<string, AdminSettingPrimitive>
  | Record<string, AdminSettingPrimitive>[];

/**
 * Admin setting interface
 * Represents a single setting
 */
export interface AdminSetting {
  /** Unique identifier */
  id: ID;
  /** Setting key (unique) */
  key: string;
  /** Setting value */
  value: AdminSettingValue;
  /** Setting category */
  category: AdminSettingCategory;
  /** Setting type */
  type: AdminSettingType;
  /** Setting visibility */
  visibility: AdminSettingVisibility;
  /** Display label */
  label: string;
  /** Description of the setting */
  description?: Nullable<string>;
  /** Default value */
  defaultValue?: Nullable<AdminSettingValue>;
  /** Validation rules (if any) */
  validation?: AdminSettingValidation;
  /** Whether setting is system critical */
  isCritical: boolean;
  /** Whether setting requires restart to take effect */
  requiresRestart: boolean;
  /** Whether setting is active */
  isActive: boolean;
  /** Created at timestamp */
  createdAt: Timestamp;
  /** Updated at timestamp */
  updatedAt: Timestamp;
  /** Deleted at timestamp (soft delete) */
  deletedAt?: Nullable<Timestamp>;
}

/**
 * Setting validation rules
 */
export interface AdminSettingValidation {
  /** Minimum length (for string) */
  minLength?: number;
  /** Maximum length (for string) */
  maxLength?: number;
  /** Minimum value (for number) */
  minValue?: number;
  /** Maximum value (for number) */
  maxValue?: number;
  /** Allowed values (for enum) */
  allowedValues?: AdminSettingValue[];
  /** Regular expression pattern (for string) */
  pattern?: string;
  /** Whether field is required */
  required?: boolean;
  /** Custom validation function (serialized as string) */
  customValidator?: string;
}

/**
 * Setting update data
 */
export interface AdminSettingUpdateData {
  /** New value */
  value?: AdminSettingValue;
  /** New category */
  category?: AdminSettingCategory;
  /** New visibility */
  visibility?: AdminSettingVisibility;
  /** New label */
  label?: string;
  /** New description */
  description?: string;
  /** Whether setting is active */
  isActive?: boolean;
}

/**
 * Setting filter parameters
 */
export interface AdminSettingFilterParams {
  /** Filter by category */
  category?: AdminSettingCategory | AdminSettingCategory[];
  /** Filter by type */
  type?: AdminSettingType | AdminSettingType[];
  /** Filter by visibility */
  visibility?: AdminSettingVisibility | AdminSettingVisibility[];
  /** Filter by system critical */
  isCritical?: boolean;
  /** Filter by requires restart */
  requiresRestart?: boolean;
  /** Filter by active status */
  isActive?: boolean;
  /** Search term (key, label, description) */
  search?: string;
}

/**
 * Setting category with settings
 */
export interface AdminSettingCategoryWithSettings {
  /** Category name */
  category: AdminSettingCategory;
  /** Category label */
  label: string;
  /** Settings in this category */
  settings: AdminSetting[];
}

/**
 * Setting statistics
 */
export interface AdminSettingStatistics {
  /** Total number of settings */
  totalSettings: number;
  /** Count by category */
  categoryCounts: Record<AdminSettingCategory, number>;
  /** Count by type */
  typeCounts: Record<AdminSettingType, number>;
  /** Count by visibility */
  visibilityCounts: Record<AdminSettingVisibility, number>;
  /** Number of critical settings */
  criticalCount: number;
  /** Number of restart required settings */
  restartRequiredCount: number;
}

/**
 * System settings group
 */
export interface AdminSystemSettings {
  /** Site name */
  siteName: string;
  /** Site URL */
  siteUrl: string;
  /** Admin email */
  adminEmail: string;
  /** Timezone */
  timezone: string;
  /** Date format */
  dateFormat: string;
  /** Time format */
  timeFormat: string;
  /** Currency */
  currency: string;
  /** Language */
  language: string;
  /** Locale */
  locale: string;
}

/**
 * Security settings group
 */
export interface AdminSecuritySettings {
  /** MFA enabled */
  mfaEnabled: boolean;
  /** Password policy */
  passwordPolicy: AdminPasswordPolicy;
  /** Session timeout in seconds */
  sessionTimeout: number;
  /** Maximum login attempts */
  maxLoginAttempts: number;
  /** IP whitelist */
  ipWhitelist: string[];
  /** IP blacklist */
  ipBlacklist: string[];
  /** Allowed domains */
  allowedDomains: string[];
  /** Blocked domains */
  blockedDomains: string[];
}

/**
 * Password policy
 */
export interface AdminPasswordPolicy {
  /** Minimum length */
  minLength: number;
  /** Requires uppercase */
  requireUppercase: boolean;
  /** Requires lowercase */
  requireLowercase: boolean;
  /** Requires number */
  requireNumber: boolean;
  /** Requires special character */
  requireSpecialChar: boolean;
  /** Password expiry in days */
  expiryDays: number;
  /** Prevent reuse count */
  preventReuseCount: number;
}

/**
 * Get setting category label
 */
export function getAdminSettingCategoryLabel(category: AdminSettingCategory): string {
  const labels: Record<AdminSettingCategory, string> = {
    general: 'General',
    security: 'Security',
    notification: 'Notification',
    preference: 'Preference',
    integration: 'Integration',
    api: 'API',
    system: 'System',
    business: 'Business',
    user: 'User',
    product: 'Product',
    order: 'Order',
    payment: 'Payment',
    shipping: 'Shipping',
    tax: 'Tax',
    inventory: 'Inventory',
    report: 'Report',
    analytics: 'Analytics',
  };
  return labels[category] || category;
}

/**
 * Get setting type label
 */
export function getAdminSettingTypeLabel(type: AdminSettingType): string {
  const labels: Record<AdminSettingType, string> = {
    string: 'Text',
    number: 'Number',
    boolean: 'Yes/No',
    object: 'Object',
    array: 'List',
    json: 'JSON',
    enum: 'Dropdown',
    date: 'Date',
    time: 'Time',
    datetime: 'Date & Time',
    email: 'Email',
    url: 'URL',
    phone: 'Phone',
    password: 'Password',
    color: 'Color',
    file: 'File',
    image: 'Image',
  };
  return labels[type] || type;
}

/**
 * Get setting visibility label
 */
export function getAdminSettingVisibilityLabel(visibility: AdminSettingVisibility): string {
  const labels: Record<AdminSettingVisibility, string> = {
    public: 'Public',
    private: 'Private',
    protected: 'Protected',
    hidden: 'Hidden',
  };
  return labels[visibility] || visibility;
}

/**
 * Check if setting is system critical
 */
export function isAdminSystemCriticalSetting(key: string): boolean {
  const criticalKeys = [
    'site_url',
    'admin_email',
    'database_config',
    'cache_config',
    'queue_config',
    'payment_gateway',
    'api_keys',
    'secret_key',
  ];
  return criticalKeys.some((k) => key.includes(k));
}

/**
 * Check if setting requires restart
 */
export function adminSettingRequiresRestart(key: string): boolean {
  const restartKeys = [
    'database',
    'cache',
    'queue',
    'session_timeout',
    'mfa_enabled',
    'password_policy',
  ];
  return restartKeys.some((k) => key.includes(k));
}

/**
 * Create setting statistics from array
 */
export function createAdminSettingStatistics(settings: AdminSetting[]): AdminSettingStatistics {
  const stats: AdminSettingStatistics = {
    totalSettings: settings.length,
    categoryCounts: {} as Record<AdminSettingCategory, number>,
    typeCounts: {} as Record<AdminSettingType, number>,
    visibilityCounts: {} as Record<AdminSettingVisibility, number>,
    criticalCount: 0,
    restartRequiredCount: 0,
  };

  // Initialize counts
  const categories: AdminSettingCategory[] = [
    'general',
    'security',
    'notification',
    'preference',
    'integration',
    'api',
    'system',
    'business',
    'user',
    'product',
    'order',
    'payment',
    'shipping',
    'tax',
    'inventory',
    'report',
    'analytics',
  ];
  const types: AdminSettingType[] = [
    'string',
    'number',
    'boolean',
    'object',
    'array',
    'json',
    'enum',
    'date',
    'time',
    'datetime',
    'email',
    'url',
    'phone',
    'password',
    'color',
    'file',
    'image',
  ];
  const visibilities: AdminSettingVisibility[] = ['public', 'private', 'protected', 'hidden'];

  categories.forEach((c) => (stats.categoryCounts[c] = 0));
  types.forEach((t) => (stats.typeCounts[t] = 0));
  visibilities.forEach((v) => (stats.visibilityCounts[v] = 0));

  // Count settings
  settings.forEach((setting) => {
    stats.categoryCounts[setting.category] = (stats.categoryCounts[setting.category] || 0) + 1;
    stats.typeCounts[setting.type] = (stats.typeCounts[setting.type] || 0) + 1;
    stats.visibilityCounts[setting.visibility] =
      (stats.visibilityCounts[setting.visibility] || 0) + 1;

    if (setting.isCritical) stats.criticalCount++;
    if (setting.requiresRestart) stats.restartRequiredCount++;
  });

  return stats;
}

/**
 * Group settings by category
 */
export function groupAdminSettingsByCategory(
  settings: AdminSetting[]
): AdminSettingCategoryWithSettings[] {
  const grouped: Record<AdminSettingCategory, AdminSetting[]> = {} as Record<
    AdminSettingCategory,
    AdminSetting[]
  >;

  settings.forEach((setting) => {
    if (!grouped[setting.category]) {
      grouped[setting.category] = [];
    }
    grouped[setting.category].push(setting);
  });

  return Object.entries(grouped).map(([category, settings]) => ({
    category: category as AdminSettingCategory,
    label: getAdminSettingCategoryLabel(category as AdminSettingCategory),
    settings,
  }));
}

/**
 * Validate setting value
 */
export function validateAdminSettingValue(
  setting: AdminSetting,
  value: AdminSettingValue
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required
  if (setting.validation?.required && (value === undefined || value === null || value === '')) {
    errors.push('Value is required');
    return { valid: false, errors };
  }

  if (value === undefined || value === null) {
    return { valid: true, errors: [] };
  }

  // Type-specific validation
  switch (setting.type) {
    case 'string':
      if (typeof value !== 'string') {
        errors.push('Value must be a string');
      } else {
        if (setting.validation?.minLength && value.length < setting.validation.minLength) {
          errors.push(`Minimum length is ${setting.validation.minLength}`);
        }
        if (setting.validation?.maxLength && value.length > setting.validation.maxLength) {
          errors.push(`Maximum length is ${setting.validation.maxLength}`);
        }
        if (setting.validation?.pattern && !new RegExp(setting.validation.pattern).test(value)) {
          errors.push('Value does not match required pattern');
        }
      }
      break;

    case 'number':
      if (typeof value !== 'number') {
        errors.push('Value must be a number');
      } else {
        if (setting.validation?.minValue !== undefined && value < setting.validation.minValue) {
          errors.push(`Minimum value is ${setting.validation.minValue}`);
        }
        if (setting.validation?.maxValue !== undefined && value > setting.validation.maxValue) {
          errors.push(`Maximum value is ${setting.validation.maxValue}`);
        }
      }
      break;

    case 'boolean':
      if (typeof value !== 'boolean') {
        errors.push('Value must be a boolean');
      }
      break;

    case 'enum':
      if (setting.validation?.allowedValues && !setting.validation.allowedValues.includes(value)) {
        errors.push(`Value must be one of: ${setting.validation.allowedValues.join(', ')}`);
      }
      break;

    case 'email':
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (typeof value !== 'string' || !emailRegex.test(value)) {
        errors.push('Value must be a valid email address');
      }
      break;

    case 'url':
      if (typeof value !== 'string') {
        errors.push('Value must be a string');
      } else {
        try {
          new URL(value);
        } catch {
          errors.push('Value must be a valid URL');
        }
      }
      break;
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Get default settings for a category
 */
export function getAdminDefaultSettings(category: AdminSettingCategory): Partial<AdminSetting>[] {
  const defaults: Record<AdminSettingCategory, Partial<AdminSetting>[]> = {
    general: [
      { key: 'site_name', value: 'My Site', type: 'string', label: 'Site Name' },
      { key: 'site_url', value: 'https://example.com', type: 'url', label: 'Site URL' },
      { key: 'admin_email', value: 'admin@example.com', type: 'email', label: 'Admin Email' },
      { key: 'timezone', value: 'UTC', type: 'string', label: 'Timezone' },
      { key: 'date_format', value: 'YYYY-MM-DD', type: 'string', label: 'Date Format' },
      { key: 'currency', value: 'USD', type: 'string', label: 'Currency' },
    ],
    security: [
      { key: 'mfa_enabled', value: false, type: 'boolean', label: 'MFA Enabled' },
      { key: 'session_timeout', value: 3600, type: 'number', label: 'Session Timeout (seconds)' },
      { key: 'max_login_attempts', value: 5, type: 'number', label: 'Max Login Attempts' },
    ],
    notification: [
      { key: 'email_notifications', value: true, type: 'boolean', label: 'Email Notifications' },
    ],
    // Add more categories as needed
    preference: [],
    integration: [],
    api: [],
    system: [],
    business: [],
    user: [],
    product: [],
    order: [],
    payment: [],
    shipping: [],
    tax: [],
    inventory: [],
    report: [],
    analytics: [],
  };

  return defaults[category] || [];
}
