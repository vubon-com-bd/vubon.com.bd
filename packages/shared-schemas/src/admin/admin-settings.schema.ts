/**
 * Admin Settings Schema
 * Zod schemas for admin settings and configuration definitions
 */

import { z } from 'zod';
import {
  idSchema,
  timestampSchema,
  nullable,
  stringWithLength,
  numberWithRange,
} from '../common/core-primitives.schema';

/**
 * Admin setting category enum schema (from constants)
 */
export const adminSettingCategorySchema = z.enum([
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
]);

/**
 * Admin setting type enum schema (from constants)
 */
export const adminSettingTypeSchema = z.enum([
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
]);

/**
 * Admin setting visibility enum schema (from constants)
 */
export const adminSettingVisibilitySchema = z.enum(['public', 'private', 'protected', 'hidden']);

/**
 * Admin setting value schema (union of primitive and complex types)
 */
export const adminSettingValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])),
  z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])),
  z.array(z.record(z.union([z.string(), z.number(), z.boolean(), z.null()]))),
]);

/**
 * Admin setting validation schema
 */
export const adminSettingValidationSchema = z
  .object({
    minLength: numberWithRange(0).optional(),
    maxLength: numberWithRange(0).optional(),
    minValue: z.number().optional(),
    maxValue: z.number().optional(),
    allowedValues: z.array(adminSettingValueSchema).optional(),
    pattern: z.string().optional(),
    required: z.boolean().optional(),
    customValidator: z.string().optional(),
  })
  .optional()
  .nullable();

/**
 * Admin setting schema
 */
export const adminSettingSchema = z.object({
  id: idSchema,
  key: z.string().min(1).max(255),
  value: adminSettingValueSchema,
  category: adminSettingCategorySchema,
  type: adminSettingTypeSchema,
  visibility: adminSettingVisibilitySchema,
  label: stringWithLength(1, 255),
  description: nullable(z.string()),
  defaultValue: nullable(adminSettingValueSchema),
  validation: adminSettingValidationSchema,
  isCritical: z.boolean().default(false),
  requiresRestart: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin setting update data schema
 */
export const adminSettingUpdateDataSchema = z.object({
  value: adminSettingValueSchema.optional(),
  category: adminSettingCategorySchema.optional(),
  visibility: adminSettingVisibilitySchema.optional(),
  label: stringWithLength(1, 255).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

/**
 * Admin setting filter parameters schema
 */
export const adminSettingFilterParamsSchema = z.object({
  category: z.union([adminSettingCategorySchema, z.array(adminSettingCategorySchema)]).optional(),
  type: z.union([adminSettingTypeSchema, z.array(adminSettingTypeSchema)]).optional(),
  visibility: z
    .union([adminSettingVisibilitySchema, z.array(adminSettingVisibilitySchema)])
    .optional(),
  isCritical: z.boolean().optional(),
  requiresRestart: z.boolean().optional(),
  isActive: z.boolean().optional(),
  search: z.string().optional(),
});

/**
 * Admin setting statistics schema
 */
export const adminSettingStatisticsSchema = z.object({
  totalSettings: z.number().int().min(0),
  categoryCounts: z.record(z.string(), z.number().int().min(0)),
  typeCounts: z.record(z.string(), z.number().int().min(0)),
  visibilityCounts: z.record(z.string(), z.number().int().min(0)),
  criticalCount: z.number().int().min(0),
  restartRequiredCount: z.number().int().min(0),
});

/**
 * Password policy schema
 */
export const adminPasswordPolicySchema = z.object({
  minLength: z.number().int().min(1).max(128).default(8),
  requireUppercase: z.boolean().default(true),
  requireLowercase: z.boolean().default(true),
  requireNumber: z.boolean().default(true),
  requireSpecialChar: z.boolean().default(true),
  expiryDays: z.number().int().min(0).max(365).default(90),
  preventReuseCount: z.number().int().min(0).max(100).default(5),
});

/**
 * System settings schema
 */
export const adminSystemSettingsSchema = z.object({
  siteName: stringWithLength(1, 255),
  siteUrl: z.string().url(),
  adminEmail: z.string().email(),
  timezone: z.string().default('UTC'),
  dateFormat: z.string().default('YYYY-MM-DD'),
  timeFormat: z.string().default('HH:mm:ss'),
  currency: z.string().default('USD'),
  language: z.string().default('en'),
  locale: z.string().default('en-US'),
});

/**
 * Security settings schema
 */
export const adminSecuritySettingsSchema = z.object({
  mfaEnabled: z.boolean().default(false),
  passwordPolicy: adminPasswordPolicySchema,
  sessionTimeout: z.number().int().min(60).max(86400).default(3600),
  maxLoginAttempts: z.number().int().min(1).max(100).default(5),
  ipWhitelist: z.array(z.string()).default([]),
  ipBlacklist: z.array(z.string()).default([]),
  allowedDomains: z.array(z.string()).default([]),
  blockedDomains: z.array(z.string()).default([]),
});

/**
 * Type inference from schemas
 */
export type AdminSettingCategorySchema = z.infer<typeof adminSettingCategorySchema>;
export type AdminSettingTypeSchema = z.infer<typeof adminSettingTypeSchema>;
export type AdminSettingVisibilitySchema = z.infer<typeof adminSettingVisibilitySchema>;
export type AdminSettingValueSchema = z.infer<typeof adminSettingValueSchema>;
export type AdminSettingValidationSchema = z.infer<typeof adminSettingValidationSchema>;
export type AdminSettingSchema = z.infer<typeof adminSettingSchema>;
export type AdminSettingUpdateDataSchema = z.infer<typeof adminSettingUpdateDataSchema>;
export type AdminSettingFilterParamsSchema = z.infer<typeof adminSettingFilterParamsSchema>;
export type AdminSettingStatisticsSchema = z.infer<typeof adminSettingStatisticsSchema>;
export type AdminPasswordPolicySchema = z.infer<typeof adminPasswordPolicySchema>;
export type AdminSystemSettingsSchema = z.infer<typeof adminSystemSettingsSchema>;
export type AdminSecuritySettingsSchema = z.infer<typeof adminSecuritySettingsSchema>;

/**
 * Helper function to get setting category label
 */
export function getAdminSettingCategoryLabelFromCategory(
  category: AdminSettingCategorySchema
): string {
  const labelMap: Record<AdminSettingCategorySchema, string> = {
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
  return labelMap[category] || category;
}

/**
 * Helper function to get setting type label
 */
export function getAdminSettingTypeLabelFromType(type: AdminSettingTypeSchema): string {
  const labelMap: Record<AdminSettingTypeSchema, string> = {
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
  return labelMap[type] || type;
}

/**
 * Helper function to get setting visibility label
 */
export function getAdminSettingVisibilityLabelFromVisibility(
  visibility: AdminSettingVisibilitySchema
): string {
  const labelMap: Record<AdminSettingVisibilitySchema, string> = {
    public: 'Public',
    private: 'Private',
    protected: 'Protected',
    hidden: 'Hidden',
  };
  return labelMap[visibility] || visibility;
}

/**
 * Helper function to check if setting is system critical
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
 * Helper function to check if setting requires restart
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
 * Helper function to create setting statistics from array
 */
export function createAdminSettingStatisticsFromArray(
  settings: AdminSettingSchema[]
): AdminSettingStatisticsSchema {
  const stats: AdminSettingStatisticsSchema = {
    totalSettings: settings.length,
    categoryCounts: {},
    typeCounts: {},
    visibilityCounts: {},
    criticalCount: 0,
    restartRequiredCount: 0,
  };

  settings.forEach((setting) => {
    const category = setting.category as AdminSettingCategorySchema;
    const type = setting.type as AdminSettingTypeSchema;
    const visibility = setting.visibility as AdminSettingVisibilitySchema;

    stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;
    stats.typeCounts[type] = (stats.typeCounts[type] || 0) + 1;
    stats.visibilityCounts[visibility] = (stats.visibilityCounts[visibility] || 0) + 1;

    if (setting.isCritical) stats.criticalCount++;
    if (setting.requiresRestart) stats.restartRequiredCount++;
  });

  return stats;
}

/**
 * Helper function to validate setting value
 */
export function validateAdminSettingValue(
  setting: AdminSettingSchema,
  value: AdminSettingValueSchema
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
  const type = setting.type as AdminSettingTypeSchema;
  switch (type) {
    case 'string': {
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
    }
    case 'number': {
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
    }
    case 'boolean': {
      if (typeof value !== 'boolean') {
        errors.push('Value must be a boolean');
      }
      break;
    }
    case 'enum': {
      if (setting.validation?.allowedValues && !setting.validation.allowedValues.includes(value)) {
        errors.push(`Value must be one of: ${setting.validation.allowedValues.join(', ')}`);
      }
      break;
    }
    case 'email': {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (typeof value !== 'string' || !emailRegex.test(value)) {
        errors.push('Value must be a valid email address');
      }
      break;
    }
    case 'url': {
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
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Export schemas as an object for convenient access
 */
export const adminSettingSchemas = {
  setting: adminSettingSchema,
  category: adminSettingCategorySchema,
  type: adminSettingTypeSchema,
  visibility: adminSettingVisibilitySchema,
  value: adminSettingValueSchema,
  validation: adminSettingValidationSchema,
  updateData: adminSettingUpdateDataSchema,
  filter: adminSettingFilterParamsSchema,
  statistics: adminSettingStatisticsSchema,
  passwordPolicy: adminPasswordPolicySchema,
  systemSettings: adminSystemSettingsSchema,
  securitySettings: adminSecuritySettingsSchema,
  getCategoryLabel: getAdminSettingCategoryLabelFromCategory,
  getTypeLabel: getAdminSettingTypeLabelFromType,
  getVisibilityLabel: getAdminSettingVisibilityLabelFromVisibility,
  isSystemCritical: isAdminSystemCriticalSetting,
  requiresRestart: adminSettingRequiresRestart,
  createStatistics: createAdminSettingStatisticsFromArray,
  validate: validateAdminSettingValue,
};

export default adminSettingSchemas;
