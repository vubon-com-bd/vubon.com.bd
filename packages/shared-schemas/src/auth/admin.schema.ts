import { z } from 'zod';
import { EMAIL_REGEX, PHONE_REGEX, PASSWORD_POLICY } from '@vubon/shared-constants';

/**
 * User status enum for validation
 */
const UserStatusEnum = z.enum(['active', 'inactive', 'suspended', 'banned']);

/**
 * Schema for validating admin user list requests
 */
export const AdminUserListSchema = z.object({
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
   * Filter by user status - optional
   */
  status: UserStatusEnum.optional(),

  /**
   * Filter by user role - optional
   */
  role: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Role cannot be empty if provided',
    }),

  /**
   * Search term for user list - optional
   */
  search: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Search term cannot be empty if provided',
    }),
});

/**
 * Schema for validating admin update user requests
 */
export const AdminUpdateUserSchema = z.object({
  /**
   * Update user status - optional
   */
  status: UserStatusEnum.optional(),

  /**
   * Update user role - optional
   */
  role: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Role cannot be empty if provided',
    }),
});

/**
 * Schema for validating admin create user requests
 */
export const AdminCreateUserSchema = z.object({
  /**
   * Email address - must be valid format and will be normalized
   */
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .min(1, 'Email is required')
    .email('Please provide a valid email address')
    .regex(EMAIL_REGEX.STANDARD, 'Email format is invalid')
    .transform((val) => val.toLowerCase()),

  /**
   * Password - must meet complexity requirements
   * - Minimum length: 8 characters
   * - Maximum length: 128 characters
   * - At least one uppercase letter
   * - At least one lowercase letter
   * - At least one number
   * - At least one special character
   */
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(
      PASSWORD_POLICY.MIN_LENGTH,
      `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`
    )
    .max(
      PASSWORD_POLICY.MAX_LENGTH,
      `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`
    )
    .refine(
      (val) => (PASSWORD_POLICY.REQUIRE_UPPERCASE ? /[A-Z]/.test(val) : true),
      'Password must contain at least one uppercase letter'
    )
    .refine(
      (val) => (PASSWORD_POLICY.REQUIRE_LOWERCASE ? /[a-z]/.test(val) : true),
      'Password must contain at least one lowercase letter'
    )
    .refine(
      (val) => (PASSWORD_POLICY.REQUIRE_NUMBER ? /\d/.test(val) : true),
      'Password must contain at least one number'
    )
    .refine(
      (val) =>
        PASSWORD_POLICY.REQUIRE_SPECIAL_CHAR
          ? /[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(val)
          : true,
      'Password must contain at least one special character'
    ),

  /**
   * User's first name - required field
   */
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z\s\-']+$/,
      'First name can only contain letters, spaces, hyphens, and apostrophes'
    ),

  /**
   * User's last name - required field
   */
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z\s\-']+$/,
      'Last name can only contain letters, spaces, hyphens, and apostrophes'
    ),

  /**
   * User role - required
   */
  role: z
    .string({
      required_error: 'Role is required',
      invalid_type_error: 'Role must be a string',
    })
    .min(1, 'Role is required'),

  /**
   * Phone number - optional field with Bangladeshi format validation
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
});

/**
 * Type inference for admin schemas
 */
export type AdminUserListSchemaType = z.infer<typeof AdminUserListSchema>;
export type AdminUpdateUserSchemaType = z.infer<typeof AdminUpdateUserSchema>;
export type AdminCreateUserSchemaType = z.infer<typeof AdminCreateUserSchema>;

/**
 * Validates admin user list data and returns typed result
 */
export function validateAdminUserList(data: unknown): AdminUserListSchemaType {
  return AdminUserListSchema.parse(data);
}

/**
 * Safely validates admin user list data without throwing
 */
export function safeValidateAdminUserList(data: unknown): {
  success: boolean;
  data?: AdminUserListSchemaType;
  error?: z.ZodError;
} {
  const result = AdminUserListSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates admin update user data and returns typed result
 */
export function validateAdminUpdateUser(data: unknown): AdminUpdateUserSchemaType {
  return AdminUpdateUserSchema.parse(data);
}

/**
 * Safely validates admin update user data without throwing
 */
export function safeValidateAdminUpdateUser(data: unknown): {
  success: boolean;
  data?: AdminUpdateUserSchemaType;
  error?: z.ZodError;
} {
  const result = AdminUpdateUserSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates admin create user data and returns typed result
 */
export function validateAdminCreateUser(data: unknown): AdminCreateUserSchemaType {
  return AdminCreateUserSchema.parse(data);
}

/**
 * Safely validates admin create user data without throwing
 */
export function safeValidateAdminCreateUser(data: unknown): {
  success: boolean;
  data?: AdminCreateUserSchemaType;
  error?: z.ZodError;
} {
  const result = AdminCreateUserSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
