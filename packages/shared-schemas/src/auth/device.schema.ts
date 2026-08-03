import { z } from 'zod';
import { DEVICE_TYPES } from '@vubon/shared-constants';

/**
 * Device type enum from shared-constants
 */
export const DeviceTypeSchema = z.enum([
  DEVICE_TYPES.DESKTOP,
  DEVICE_TYPES.MOBILE,
  DEVICE_TYPES.FEATURE_PHONE,
  DEVICE_TYPES.TABLET,
  DEVICE_TYPES.SMART_TV,
  DEVICE_TYPES.GAMING_CONSOLE,
  DEVICE_TYPES.IOT,
  DEVICE_TYPES.KIOSK,
  DEVICE_TYPES.POS,
  DEVICE_TYPES.WEARABLE,
  DEVICE_TYPES.AUTOMOTIVE,
  DEVICE_TYPES.UNKNOWN,
]);

/**
 * Device trust level enum
 */
export const DeviceTrustLevelSchema = z.enum([
  'trusted',
  'standard',
  'untrusted',
  'suspicious',
  'blocked',
  'verified',
  'compromised',
]);

/**
 * Schema for validating device registration requests
 */
export const RegisterDeviceSchema = z.object({
  /**
   * Device fingerprint - unique identifier for the device
   */
  fingerprint: z
    .string({
      required_error: 'Device fingerprint is required',
      invalid_type_error: 'Device fingerprint must be a string',
    })
    .min(32, 'Device fingerprint must be at least 32 characters')
    .max(256, 'Device fingerprint cannot exceed 256 characters'),

  /**
   * Device type - must be one of the predefined types
   */
  type: DeviceTypeSchema,

  /**
   * Device name - user-provided or system-generated
   */
  name: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Device name cannot be empty if provided',
    })
    .refine((val) => !val || val.length <= 100, {
      message: 'Device name cannot exceed 100 characters',
    }),

  /**
   * Operating system of the device
   */
  os: z
    .string({
      required_error: 'Operating system is required',
      invalid_type_error: 'Operating system must be a string',
    })
    .min(1, 'Operating system is required')
    .max(50, 'Operating system cannot exceed 50 characters'),

  /**
   * Operating system version
   */
  osVersion: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'OS version cannot be empty if provided',
    })
    .refine((val) => !val || val.length <= 50, {
      message: 'OS version cannot exceed 50 characters',
    }),

  /**
   * Browser or application name
   */
  browser: z
    .string({
      required_error: 'Browser is required',
      invalid_type_error: 'Browser must be a string',
    })
    .min(1, 'Browser is required')
    .max(50, 'Browser cannot exceed 50 characters'),

  /**
   * Browser version
   */
  browserVersion: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Browser version cannot be empty if provided',
    })
    .refine((val) => !val || val.length <= 50, {
      message: 'Browser version cannot exceed 50 characters',
    }),

  /**
   * Additional metadata about the device
   */
  additional: z.record(z.unknown()).optional().default({}),
});

/**
 * Schema for validating device trust update requests
 */
export const UpdateDeviceTrustSchema = z.object({
  /**
   * Device ID - must be a valid UUID
   */
  deviceId: z
    .string({
      required_error: 'Device ID is required',
      invalid_type_error: 'Device ID must be a string',
    })
    .uuid('Invalid device ID format. Must be a valid UUID'),

  /**
   * Trust level to set
   */
  trustLevel: DeviceTrustLevelSchema,

  /**
   * Trust duration in days (optional, for temporary trust)
   */
  durationDays: z
    .number()
    .optional()
    .refine((val) => !val || (Number.isInteger(val) && val > 0 && val <= 365), {
      message: 'Duration must be a positive integer between 1 and 365 days',
    }),

  /**
   * Reason for changing trust level
   */
  reason: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Reason cannot be empty if provided',
    })
    .refine((val) => !val || val.length <= 500, {
      message: 'Reason cannot exceed 500 characters',
    }),
});

/**
 * Schema for validating device filter requests
 */
export const DeviceFilterSchema = z.object({
  /**
   * Page number - optional, defaults to 1
   */
  page: z
    .number()
    .optional()
    .refine((val) => !val || val > 0, {
      message: 'Page must be greater than 0',
    })
    .default(1),

  /**
   * Items per page - optional, defaults to 10
   */
  limit: z
    .number()
    .optional()
    .refine((val) => !val || (val > 0 && val <= 100), {
      message: 'Limit must be between 1 and 100',
    })
    .default(10),

  /**
   * Filter by device type - optional
   */
  type: DeviceTypeSchema.optional(),

  /**
   * Filter by trust level - optional
   */
  trustLevel: DeviceTrustLevelSchema.optional(),

  /**
   * Filter by active status - optional
   */
  isActive: z.boolean().optional(),

  /**
   * Filter by verified status - optional
   */
  isVerified: z.boolean().optional(),

  /**
   * Filter by blocked status - optional
   */
  isBlocked: z.boolean().optional(),

  /**
   * Filter by operating system - optional
   */
  os: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'OS cannot be empty if provided',
    }),

  /**
   * Filter by browser - optional
   */
  browser: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Browser cannot be empty if provided',
    }),

  /**
   * Search term for device name or metadata - optional
   */
  search: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Search term cannot be empty if provided',
    }),
});

/**
 * Type inference for device schemas
 */
export type DeviceType = z.infer<typeof DeviceTypeSchema>;
export type DeviceTrustLevel = z.infer<typeof DeviceTrustLevelSchema>;
export type RegisterDeviceSchemaType = z.infer<typeof RegisterDeviceSchema>;
export type UpdateDeviceTrustSchemaType = z.infer<typeof UpdateDeviceTrustSchema>;
export type DeviceFilterSchemaType = z.infer<typeof DeviceFilterSchema>;

/**
 * Validates register device data and returns typed result
 */
export function validateRegisterDevice(data: unknown): RegisterDeviceSchemaType {
  return RegisterDeviceSchema.parse(data);
}

/**
 * Safely validates register device data without throwing
 */
export function safeValidateRegisterDevice(data: unknown): {
  success: boolean;
  data?: RegisterDeviceSchemaType;
  error?: z.ZodError;
} {
  const result = RegisterDeviceSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates update device trust data and returns typed result
 */
export function validateUpdateDeviceTrust(data: unknown): UpdateDeviceTrustSchemaType {
  return UpdateDeviceTrustSchema.parse(data);
}

/**
 * Safely validates update device trust data without throwing
 */
export function safeValidateUpdateDeviceTrust(data: unknown): {
  success: boolean;
  data?: UpdateDeviceTrustSchemaType;
  error?: z.ZodError;
} {
  const result = UpdateDeviceTrustSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates device filter data and returns typed result
 */
export function validateDeviceFilter(data: unknown): DeviceFilterSchemaType {
  return DeviceFilterSchema.parse(data);
}

/**
 * Safely validates device filter data without throwing
 */
export function safeValidateDeviceFilter(data: unknown): {
  success: boolean;
  data?: DeviceFilterSchemaType;
  error?: z.ZodError;
} {
  const result = DeviceFilterSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
