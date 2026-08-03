import { z } from 'zod';

/**
 * Permission string validation
 * Validates format like "resource:action" (e.g., "user:create", "order:read")
 */
export const PermissionStringSchema = z
  .string({
    required_error: 'Permission is required',
    invalid_type_error: 'Permission must be a string',
  })
  .regex(
    /^[a-z]+:[a-z]+$/,
    'Invalid permission format. Must be in the format "resource:action" (e.g., "user:create")'
  )
  .min(3, 'Permission must be at least 3 characters')
  .max(50, 'Permission cannot exceed 50 characters');

/**
 * Type inference for permission string
 */
export type PermissionString = z.infer<typeof PermissionStringSchema>;

/**
 * Schema for validating create permission requests
 */
export const CreatePermissionSchema = z.object({
  /**
   * Permission key - must be in "resource:action" format
   */
  key: PermissionStringSchema,

  /**
   * Display name for the permission
   */
  name: z
    .string({
      required_error: 'Permission name is required',
      invalid_type_error: 'Permission name must be a string',
    })
    .min(1, 'Permission name is required')
    .max(100, 'Permission name cannot exceed 100 characters'),

  /**
   * Description of the permission
   */
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description is required')
    .max(500, 'Description cannot exceed 500 characters'),

  /**
   * Resource this permission applies to
   */
  resource: z
    .string({
      required_error: 'Resource is required',
      invalid_type_error: 'Resource must be a string',
    })
    .min(1, 'Resource is required')
    .max(50, 'Resource cannot exceed 50 characters')
    .regex(/^[a-z]+$/, 'Resource must contain only lowercase letters'),

  /**
   * Action this permission allows
   */
  action: z
    .string({
      required_error: 'Action is required',
      invalid_type_error: 'Action must be a string',
    })
    .min(1, 'Action is required')
    .max(50, 'Action cannot exceed 50 characters')
    .regex(/^[a-z]+$/, 'Action must contain only lowercase letters'),

  /**
   * Category for grouping permissions
   */
  category: z
    .string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    })
    .min(1, 'Category is required')
    .max(50, 'Category cannot exceed 50 characters'),

  /**
   * Dependencies on other permissions
   */
  dependsOn: z.array(PermissionStringSchema).optional().default([]),
});

/**
 * Schema for validating check permission requests
 */
export const CheckPermissionSchema = z.object({
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
   * Permission to check - must be in "resource:action" format
   */
  permission: PermissionStringSchema,

  /**
   * Whether all permissions are required (for multiple permissions)
   */
  requireAll: z.boolean().optional().default(false),
});

/**
 * Schema for validating bulk permission check requests
 */
export const BulkCheckPermissionSchema = z.object({
  /**
   * Array of user IDs - must be valid UUIDs
   */
  userIds: z
    .array(z.string().uuid('Invalid user ID format. Must be a valid UUID'), {
      required_error: 'User IDs are required',
      invalid_type_error: 'User IDs must be an array of strings',
    })
    .min(1, 'At least one user ID is required')
    .max(100, 'Cannot check permissions for more than 100 users at once'),

  /**
   * Permission to check - must be in "resource:action" format
   */
  permission: PermissionStringSchema,
});

/**
 * Schema for validating grant permission requests
 */
export const GrantPermissionSchema = z.object({
  /**
   * Role name or ID - must be a string
   */
  role: z
    .string({
      required_error: 'Role is required',
      invalid_type_error: 'Role must be a string',
    })
    .min(1, 'Role is required'),

  /**
   * Permission to grant - must be in "resource:action" format
   */
  permission: PermissionStringSchema,

  /**
   * Reason for granting - optional
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
 * Schema for validating revoke permission requests
 */
export const RevokePermissionSchema = z.object({
  /**
   * Role name or ID - must be a string
   */
  role: z
    .string({
      required_error: 'Role is required',
      invalid_type_error: 'Role must be a string',
    })
    .min(1, 'Role is required'),

  /**
   * Permission to revoke - must be in "resource:action" format
   */
  permission: PermissionStringSchema,

  /**
   * Reason for revoking - optional
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
 * Type inference for permission schemas
 */
export type CreatePermissionSchemaType = z.infer<typeof CreatePermissionSchema>;
export type CheckPermissionSchemaType = z.infer<typeof CheckPermissionSchema>;
export type BulkCheckPermissionSchemaType = z.infer<typeof BulkCheckPermissionSchema>;
export type GrantPermissionSchemaType = z.infer<typeof GrantPermissionSchema>;
export type RevokePermissionSchemaType = z.infer<typeof RevokePermissionSchema>;

/**
 * Validates create permission data and returns typed result
 */
export function validateCreatePermission(data: unknown): CreatePermissionSchemaType {
  return CreatePermissionSchema.parse(data);
}

/**
 * Safely validates create permission data without throwing
 */
export function safeValidateCreatePermission(data: unknown): {
  success: boolean;
  data?: CreatePermissionSchemaType;
  error?: z.ZodError;
} {
  const result = CreatePermissionSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates check permission data and returns typed result
 */
export function validateCheckPermission(data: unknown): CheckPermissionSchemaType {
  return CheckPermissionSchema.parse(data);
}

/**
 * Safely validates check permission data without throwing
 */
export function safeValidateCheckPermission(data: unknown): {
  success: boolean;
  data?: CheckPermissionSchemaType;
  error?: z.ZodError;
} {
  const result = CheckPermissionSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates bulk check permission data and returns typed result
 */
export function validateBulkCheckPermission(data: unknown): BulkCheckPermissionSchemaType {
  return BulkCheckPermissionSchema.parse(data);
}

/**
 * Safely validates bulk check permission data without throwing
 */
export function safeValidateBulkCheckPermission(data: unknown): {
  success: boolean;
  data?: BulkCheckPermissionSchemaType;
  error?: z.ZodError;
} {
  const result = BulkCheckPermissionSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates grant permission data and returns typed result
 */
export function validateGrantPermission(data: unknown): GrantPermissionSchemaType {
  return GrantPermissionSchema.parse(data);
}

/**
 * Safely validates grant permission data without throwing
 */
export function safeValidateGrantPermission(data: unknown): {
  success: boolean;
  data?: GrantPermissionSchemaType;
  error?: z.ZodError;
} {
  const result = GrantPermissionSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates revoke permission data and returns typed result
 */
export function validateRevokePermission(data: unknown): RevokePermissionSchemaType {
  return RevokePermissionSchema.parse(data);
}

/**
 * Safely validates revoke permission data without throwing
 */
export function safeValidateRevokePermission(data: unknown): {
  success: boolean;
  data?: RevokePermissionSchemaType;
  error?: z.ZodError;
} {
  const result = RevokePermissionSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
