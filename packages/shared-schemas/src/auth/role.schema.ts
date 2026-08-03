import { z } from 'zod';
import { DEFAULT_ROLES } from '@vubon/shared-constants';

/**
 * Role name enum from shared-constants
 * Ensures only valid role names are used
 */
export const RoleNameSchema = z.enum([
  DEFAULT_ROLES.CUSTOMER,
  DEFAULT_ROLES.GUEST,
  DEFAULT_ROLES.USER,
  DEFAULT_ROLES.ADMIN,
  DEFAULT_ROLES.SUPER_ADMIN,
  DEFAULT_ROLES.MODERATOR,
  DEFAULT_ROLES.SUPPORT,
  DEFAULT_ROLES.MANAGER,
  DEFAULT_ROLES.DEVELOPER,
]);

/**
 * Type inference for role name
 */
export type RoleName = z.infer<typeof RoleNameSchema>;

/**
 * Schema for validating create role requests
 */
export const CreateRoleSchema = z.object({
  /**
   * Role name - must be one of the predefined roles
   */
  name: RoleNameSchema,

  /**
   * Display name for the role
   */
  displayName: z
    .string({
      required_error: 'Display name is required',
      invalid_type_error: 'Display name must be a string',
    })
    .min(1, 'Display name is required')
    .max(50, 'Display name cannot exceed 50 characters'),

  /**
   * Description of the role
   */
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description is required')
    .max(500, 'Description cannot exceed 500 characters'),

  /**
   * Permissions to assign to the role
   */
  permissions: z
    .array(z.string(), {
      required_error: 'Permissions are required',
      invalid_type_error: 'Permissions must be an array of strings',
    })
    .min(1, 'At least one permission is required')
    .default([]),

  /**
   * Roles to inherit from
   */
  inheritsFrom: z.array(RoleNameSchema).optional().default([]),

  /**
   * Priority level - higher number = higher priority
   */
  priority: z
    .number()
    .optional()
    .refine((val) => !val || (Number.isInteger(val) && val >= 0), {
      message: 'Priority must be a non-negative integer',
    })
    .default(0),

  /**
   * Color code for UI representation
   */
  color: z
    .string()
    .optional()
    .refine((val) => !val || /^#[0-9A-Fa-f]{6}$/.test(val), {
      message: 'Color must be a valid hex color code (e.g., #FF0000)',
    })
    .default('#6B7280'),

  /**
   * Icon for UI representation
   */
  icon: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Icon cannot be empty if provided',
    })
    .default('user'),
});

/**
 * Schema for validating update role requests
 * All fields are optional
 */
export const UpdateRoleSchema = z.object({
  /**
   * Display name for the role - optional
   */
  displayName: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Display name cannot be empty if provided',
    })
    .refine((val) => !val || val.length <= 50, {
      message: 'Display name cannot exceed 50 characters',
    }),

  /**
   * Description of the role - optional
   */
  description: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Description cannot be empty if provided',
    })
    .refine((val) => !val || val.length <= 500, {
      message: 'Description cannot exceed 500 characters',
    }),

  /**
   * Permissions to assign to the role - optional
   */
  permissions: z
    .array(z.string())
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Permissions array cannot be empty if provided',
    }),

  /**
   * Roles to inherit from - optional
   */
  inheritsFrom: z
    .array(RoleNameSchema)
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'InheritsFrom array cannot be empty if provided',
    }),

  /**
   * Priority level - optional
   */
  priority: z
    .number()
    .optional()
    .refine((val) => !val || (Number.isInteger(val) && val >= 0), {
      message: 'Priority must be a non-negative integer',
    }),

  /**
   * Color code for UI representation - optional
   */
  color: z
    .string()
    .optional()
    .refine((val) => !val || /^#[0-9A-Fa-f]{6}$/.test(val), {
      message: 'Color must be a valid hex color code (e.g., #FF0000)',
    }),

  /**
   * Icon for UI representation - optional
   */
  icon: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Icon cannot be empty if provided',
    }),

  /**
   * Whether the role is active - optional
   */
  isActive: z.boolean().optional(),
});

/**
 * Schema for validating assign role requests
 */
export const AssignRoleSchema = z.object({
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
   * Role to assign - must be one of the predefined roles
   */
  role: RoleNameSchema,

  /**
   * Expiry date for the role assignment - optional
   */
  expiresAt: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format. Must be a valid ISO date string',
    })
    .transform((val) => (val ? new Date(val) : undefined)),

  /**
   * Reason for assignment - optional
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
 * Schema for validating role filter requests
 */
export const RoleFilterSchema = z.object({
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
   * Filter by role name - optional
   */
  name: RoleNameSchema.optional(),

  /**
   * Filter by active status - optional
   */
  isActive: z.boolean().optional(),

  /**
   * Filter by system role - optional
   */
  isSystem: z.boolean().optional(),

  /**
   * Filter by permission - optional
   */
  hasPermission: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Permission cannot be empty if provided',
    }),

  /**
   * Search term for display name or description - optional
   */
  search: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Search term cannot be empty if provided',
    }),
});

/**
 * Type inference for role schemas
 */
export type CreateRoleSchemaType = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleSchemaType = z.infer<typeof UpdateRoleSchema>;
export type AssignRoleSchemaType = z.infer<typeof AssignRoleSchema>;
export type RoleFilterSchemaType = z.infer<typeof RoleFilterSchema>;

/**
 * Validates create role data and returns typed result
 */
export function validateCreateRole(data: unknown): CreateRoleSchemaType {
  return CreateRoleSchema.parse(data);
}

/**
 * Safely validates create role data without throwing
 */
export function safeValidateCreateRole(data: unknown): {
  success: boolean;
  data?: CreateRoleSchemaType;
  error?: z.ZodError;
} {
  const result = CreateRoleSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates update role data and returns typed result
 */
export function validateUpdateRole(data: unknown): UpdateRoleSchemaType {
  return UpdateRoleSchema.parse(data);
}

/**
 * Safely validates update role data without throwing
 */
export function safeValidateUpdateRole(data: unknown): {
  success: boolean;
  data?: UpdateRoleSchemaType;
  error?: z.ZodError;
} {
  const result = UpdateRoleSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates assign role data and returns typed result
 */
export function validateAssignRole(data: unknown): AssignRoleSchemaType {
  return AssignRoleSchema.parse(data);
}

/**
 * Safely validates assign role data without throwing
 */
export function safeValidateAssignRole(data: unknown): {
  success: boolean;
  data?: AssignRoleSchemaType;
  error?: z.ZodError;
} {
  const result = AssignRoleSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates role filter data and returns typed result
 */
export function validateRoleFilter(data: unknown): RoleFilterSchemaType {
  return RoleFilterSchema.parse(data);
}

/**
 * Safely validates role filter data without throwing
 */
export function safeValidateRoleFilter(data: unknown): {
  success: boolean;
  data?: RoleFilterSchemaType;
  error?: z.ZodError;
} {
  const result = RoleFilterSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
