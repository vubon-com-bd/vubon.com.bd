import { z } from 'zod';
import { PHONE_REGEX } from '@vubon/shared-constants';

/**
 * Schema for validating update profile requests
 * All fields are optional
 */
export const UpdateProfileSchema = z.object({
  /**
   * User's first name - optional
   */
  firstName: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'First name cannot be empty if provided',
    })
    .refine((val) => !val || val.length <= 50, {
      message: 'First name cannot exceed 50 characters',
    })
    .refine((val) => !val || /^[a-zA-Z\s\-']+$/.test(val), {
      message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
    }),

  /**
   * User's last name - optional
   */
  lastName: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Last name cannot be empty if provided',
    })
    .refine((val) => !val || val.length <= 50, {
      message: 'Last name cannot exceed 50 characters',
    })
    .refine((val) => !val || /^[a-zA-Z\s\-']+$/.test(val), {
      message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
    }),

  /**
   * Phone number - optional with Bangladeshi format validation
   * Valid formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX
   */
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        // Check if phone matches Bangladeshi format
        return (
          PHONE_REGEX.INTERNATIONAL.test(val) ||
          PHONE_REGEX.WITH_COUNTRY_CODE.test(val) ||
          /^01[3-9]\d{8}$/.test(val) // Bangladeshi mobile format
        );
      },
      {
        message:
          'Please provide a valid phone number. Supported formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX',
      }
    ),

  /**
   * Avatar URL - optional, must be a valid URL
   */
  avatar: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Avatar URL cannot be empty if provided',
    })
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: 'Invalid avatar URL format',
    }),

  /**
   * Preferred language - optional, must be 'en' or 'bn'
   */
  preferredLanguage: z
    .enum(['en', 'bn'], {
      invalid_type_error: 'Preferred language must be either "en" or "bn"',
    })
    .optional(),
});

/**
 * Schema for validating delete account requests
 */
export const DeleteAccountSchema = z.object({
  /**
   * Current password - optional (may not be required if re-authentication is not needed)
   */
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Password cannot be empty if provided',
    }),

  /**
   * Confirmation flag - must be true to proceed
   */
  confirm: z
    .boolean({
      required_error: 'Please confirm account deletion',
      invalid_type_error: 'Confirm must be a boolean',
    })
    .refine((val) => val === true, {
      message: 'You must confirm account deletion',
    }),

  /**
   * Reason for account deletion - optional
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
 * Type inference for user schemas
 */
export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
export type DeleteAccountSchemaType = z.infer<typeof DeleteAccountSchema>;

/**
 * Validates update profile data and returns typed result
 */
export function validateUpdateProfile(data: unknown): UpdateProfileSchemaType {
  return UpdateProfileSchema.parse(data);
}

/**
 * Safely validates update profile data without throwing
 */
export function safeValidateUpdateProfile(data: unknown): {
  success: boolean;
  data?: UpdateProfileSchemaType;
  error?: z.ZodError;
} {
  const result = UpdateProfileSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates delete account data and returns typed result
 */
export function validateDeleteAccount(data: unknown): DeleteAccountSchemaType {
  return DeleteAccountSchema.parse(data);
}

/**
 * Safely validates delete account data without throwing
 */
export function safeValidateDeleteAccount(data: unknown): {
  success: boolean;
  data?: DeleteAccountSchemaType;
  error?: z.ZodError;
} {
  const result = DeleteAccountSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
