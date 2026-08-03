import { z } from 'zod';

/**
 * Schema for validating unlock account requests
 */
export const UnlockAccountSchema = z.object({
  /**
   * User ID - must be a valid UUID
   */
  userId: z
    .string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    })
    .uuid('Invalid user ID format. Must be a valid UUID'),

  /**
   * Reason for unlocking - optional
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
 * Schema for validating block IP requests
 */
export const BlockIPSchema = z.object({
  /**
   * IP address - must be valid IPv4 or IPv6
   */
  ipAddress: z
    .string({
      required_error: 'IP address is required',
      invalid_type_error: 'IP address must be a string',
    })
    .trim()
    .min(1, 'IP address is required')
    .ip({
      message: 'Invalid IP address format. Must be a valid IPv4 or IPv6 address',
    }),

  /**
   * Reason for blocking - optional
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

  /**
   * Block duration in minutes - optional, defaults to 60
   */
  durationMinutes: z
    .number()
    .optional()
    .refine((val) => !val || (val > 0 && val <= 10080), {
      message: 'Duration must be between 1 and 10080 minutes (7 days)',
    })
    .default(60),
});

/**
 * Schema for validating unblock IP requests
 */
export const UnblockIPSchema = z.object({
  /**
   * IP address - must be valid IPv4 or IPv6
   */
  ipAddress: z
    .string({
      required_error: 'IP address is required',
      invalid_type_error: 'IP address must be a string',
    })
    .trim()
    .min(1, 'IP address is required')
    .ip({
      message: 'Invalid IP address format. Must be a valid IPv4 or IPv6 address',
    }),
});

/**
 * Type inference for security schemas
 */
export type UnlockAccountSchemaType = z.infer<typeof UnlockAccountSchema>;
export type BlockIPSchemaType = z.infer<typeof BlockIPSchema>;
export type UnblockIPSchemaType = z.infer<typeof UnblockIPSchema>;

/**
 * Validates unlock account data and returns typed result
 */
export function validateUnlockAccount(data: unknown): UnlockAccountSchemaType {
  return UnlockAccountSchema.parse(data);
}

/**
 * Safely validates unlock account data without throwing
 */
export function safeValidateUnlockAccount(data: unknown): {
  success: boolean;
  data?: UnlockAccountSchemaType;
  error?: z.ZodError;
} {
  const result = UnlockAccountSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates block IP data and returns typed result
 */
export function validateBlockIP(data: unknown): BlockIPSchemaType {
  return BlockIPSchema.parse(data);
}

/**
 * Safely validates block IP data without throwing
 */
export function safeValidateBlockIP(data: unknown): {
  success: boolean;
  data?: BlockIPSchemaType;
  error?: z.ZodError;
} {
  const result = BlockIPSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates unblock IP data and returns typed result
 */
export function validateUnblockIP(data: unknown): UnblockIPSchemaType {
  return UnblockIPSchema.parse(data);
}

/**
 * Safely validates unblock IP data without throwing
 */
export function safeValidateUnblockIP(data: unknown): {
  success: boolean;
  data?: UnblockIPSchemaType;
  error?: z.ZodError;
} {
  const result = UnblockIPSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
