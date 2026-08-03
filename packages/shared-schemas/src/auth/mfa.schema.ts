import { z } from 'zod';

/**
 * Schema for validating enable MFA requests
 * Currently only supports TOTP (Time-based One-Time Password)
 */
export const EnableMFASchema = z.object({
  /**
   * MFA type - currently only 'totp' is supported
   */
  type: z
    .enum(['totp'], {
      required_error: 'MFA type is required',
      invalid_type_error: 'MFA type must be "totp"',
    })
    .default('totp'),
});

/**
 * Schema for validating verify MFA requests
 */
export const VerifyMFASchema = z.object({
  /**
   * 6-digit TOTP code
   */
  code: z
    .string({
      required_error: 'Verification code is required',
      invalid_type_error: 'Verification code must be a string',
    })
    .length(6, 'Verification code must be exactly 6 digits')
    .regex(/^\d{6}$/, 'Verification code must contain only digits'),

  /**
   * Optional method ID for specific MFA method
   */
  methodId: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Method ID cannot be empty if provided',
    }),
});

/**
 * Schema for validating disable MFA requests
 * Either code or backupCode is required
 */
export const DisableMFASchema = z
  .object({
    /**
     * 6-digit TOTP code (optional if backupCode is provided)
     */
    code: z
      .string()
      .optional()
      .refine((val) => !val || (val.length === 6 && /^\d{6}$/.test(val)), {
        message: 'Code must be exactly 6 digits',
      }),

    /**
     * Backup code (optional if code is provided)
     */
    backupCode: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: 'Backup code must be at least 8 characters',
      }),
  })
  .refine((data) => data.code || data.backupCode, {
    message: 'Either verification code or backup code is required',
    path: ['code'], // Error will be associated with 'code' field
  })
  .refine(
    (data) => {
      // If both are provided, both must be valid
      if (data.code && data.backupCode) {
        return data.code.length === 6 && /^\d{6}$/.test(data.code) && data.backupCode.length >= 8;
      }
      return true;
    },
    {
      message: 'Invalid code or backup code format',
      path: ['code'],
    }
  );

/**
 * Type inference for MFA schemas
 */
export type EnableMFASchemaType = z.infer<typeof EnableMFASchema>;
export type VerifyMFASchemaType = z.infer<typeof VerifyMFASchema>;
export type DisableMFASchemaType = z.infer<typeof DisableMFASchema>;

/**
 * Validates enable MFA data and returns typed result
 */
export function validateEnableMFA(data: unknown): EnableMFASchemaType {
  return EnableMFASchema.parse(data);
}

/**
 * Safely validates enable MFA data without throwing
 */
export function safeValidateEnableMFA(data: unknown): {
  success: boolean;
  data?: EnableMFASchemaType;
  error?: z.ZodError;
} {
  const result = EnableMFASchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates verify MFA data and returns typed result
 */
export function validateVerifyMFA(data: unknown): VerifyMFASchemaType {
  return VerifyMFASchema.parse(data);
}

/**
 * Safely validates verify MFA data without throwing
 */
export function safeValidateVerifyMFA(data: unknown): {
  success: boolean;
  data?: VerifyMFASchemaType;
  error?: z.ZodError;
} {
  const result = VerifyMFASchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates disable MFA data and returns typed result
 */
export function validateDisableMFA(data: unknown): DisableMFASchemaType {
  return DisableMFASchema.parse(data);
}

/**
 * Safely validates disable MFA data without throwing
 */
export function safeValidateDisableMFA(data: unknown): {
  success: boolean;
  data?: DisableMFASchemaType;
  error?: z.ZodError;
} {
  const result = DisableMFASchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
