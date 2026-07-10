/**
 * Permission Schemas - Pure validation for permissions
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/role/permission.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO authorization checking, permission resolution
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
import {
  PERMISSION_RESOURCES,
  PERMISSION_ACTIONS,
} from '@vubon/shared-constants';

// ==================== Primitives (Reusable) ====================

// Permission Resource Schema (Based on constants)
export const PermissionResourceSchema = z.enum([
  PERMISSION_RESOURCES.USER,
  PERMISSION_RESOURCES.ROLE,
  PERMISSION_RESOURCES.PERMISSION,
  PERMISSION_RESOURCES.PRODUCT,
  PERMISSION_RESOURCES.CATEGORY,
  PERMISSION_RESOURCES.ORDER,
  PERMISSION_RESOURCES.PAYMENT,
  PERMISSION_RESOURCES.INVENTORY,
  PERMISSION_RESOURCES.REVIEW,
  PERMISSION_RESOURCES.COUPON,
  PERMISSION_RESOURCES.ANALYTICS,
  PERMISSION_RESOURCES.SYSTEM,
  PERMISSION_RESOURCES.SHOP,
  // Extended resources
  'vendor',
  'delivery',
  'shipping',
  'offer',
  'flash_sale',
  'cart',
  'wishlist',
  'ticket',
  'notification',
  'audit',
  'district',
  'upazila',
  'mfs_payment',
  'sslcommerz',
  'export',
  'import',
  'bulk_operation',
]);

// Permission Action Schema (Based on constants)
export const PermissionActionSchema = z.enum([
  PERMISSION_ACTIONS.CREATE,
  PERMISSION_ACTIONS.READ,
  PERMISSION_ACTIONS.UPDATE,
  PERMISSION_ACTIONS.DELETE,
  PERMISSION_ACTIONS.LIST,
  PERMISSION_ACTIONS.APPROVE,
  PERMISSION_ACTIONS.REJECT,
  PERMISSION_ACTIONS.PUBLISH,
  PERMISSION_ACTIONS.UNPUBLISH,
  PERMISSION_ACTIONS.SUSPEND,
  PERMISSION_ACTIONS.ACTIVATE,
  PERMISSION_ACTIONS.ASSIGN,
  'revoke',
  PERMISSION_ACTIONS.REFUND,
  PERMISSION_ACTIONS.CANCEL,
  PERMISSION_ACTIONS.EXPORT,
  PERMISSION_ACTIONS.IMPORT,
  // Extended actions
  'feature',
  'unfeature',
  'verify',
  'ship',
  'deliver',
  'moderate',
  'resolve',
  'send',
  'broadcast',
  'impersonate',
  'adjust',
  'manage',
  'configure',
]);

// Permission String Schema (Format: resource:action)
export const PermissionStringSchema = z
  .string()
  .regex(/^[a-z_]+:[a-z_]+$/, 'Permission must be in format "resource:action" (e.g., user:create)')
  .min(3, 'Permission string too short')
  .max(100, 'Permission string too long')
  .brand('PermissionString');

// Permission ID Schema
export const PermissionIdSchema = z.string().uuid('Invalid permission ID format').brand('PermissionId');

// Role ID Schema
export const RoleIdSchema = z.string().uuid('Invalid role ID format').brand('RoleId');

// User ID Schema
export const UserIdSchema = z.string().uuid('Invalid user ID format').brand('UserId');

// ==================== Domain Schemas ====================

// Permission Entity Schema
export const PermissionSchema = z
  .object({
    id: PermissionIdSchema,
    name: PermissionStringSchema,
    resource: PermissionResourceSchema,
    action: PermissionActionSchema,
    description: z.string().max(500, 'Description too long').optional(),
    category: z.string().optional(),
    isSystem: z.boolean().default(false),
    isDeprecated: z.boolean().default(false),
    deprecatedAt: z.date().optional(),
    deprecatedReason: z.string().max(500).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict()
  .brand('Permission');

// Permission Group Schema
export const PermissionGroupSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Group name is required').max(100, 'Group name too long'),
    description: z.string().max(500).optional(),
    category: z.string(),
    permissions: z.array(PermissionStringSchema),
    isSystem: z.boolean().default(false),
    order: z.number().int().min(0).default(0),
  })
  .strict()
  .brand('PermissionGroup');

// Role Permission Assignment Schema
export const RolePermissionAssignmentSchema = z
  .object({
    roleId: RoleIdSchema,
    roleName: z.string(),
    permissions: z.array(PermissionStringSchema),
    assignedAt: z.date(),
    assignedBy: UserIdSchema,
    isInherited: z.boolean().default(false),
    inheritedFrom: z.string().optional(),
  })
  .strict()
  .brand('RolePermissionAssignment');

// ==================== Request Schemas ====================

// Check Permission Request
export const CheckPermissionSchema = z
  .object({
    userId: UserIdSchema,
    permission: PermissionStringSchema,
    context: z
      .object({
        resourceId: z.string().optional(),
        shopId: z.string().optional(),
        vendorId: z.string().optional(),
        orderId: z.string().optional(),
        productId: z.string().optional(),
        userId: UserIdSchema.optional(),
        organizationId: z.string().optional(),
        ownerId: UserIdSchema.optional(),
        ipAddress: z.string().ip('Invalid IP address format').optional(),
        userAgent: z.string().max(500).optional(),
        districtId: z.string().optional(),
        upazilaId: z.string().optional(),
        amount: z.number().positive('Amount must be positive').optional(),
      })
      .optional(),
    bypassCache: z.boolean().default(false),
  })
  .strict()
  .brand('CheckPermissionRequest');

// Bulk Check Permission Request
export const BulkCheckPermissionSchema = z
  .object({
    userId: UserIdSchema,
    permissions: z.array(PermissionStringSchema).min(1, 'At least one permission required').max(100, 'Maximum 100 permissions per request'),
    context: z.record(z.string(), z.unknown()).optional(),
    requireAll: z.boolean().default(false),
  })
  .strict()
  .brand('BulkCheckPermissionRequest');

// Grant Permission Request
export const GrantPermissionSchema = z
  .object({
    roleId: RoleIdSchema,
    permissions: z.array(PermissionStringSchema).min(1, 'At least one permission required'),
    grantedBy: UserIdSchema,
    reason: z.string().max(500).optional(),
  })
  .strict()
  .brand('GrantPermissionRequest');

// Revoke Permission Request
export const RevokePermissionSchema = z
  .object({
    roleId: RoleIdSchema,
    permissions: z.array(PermissionStringSchema).min(1, 'At least one permission required'),
    revokedBy: UserIdSchema,
    reason: z.string().max(500).optional(),
  })
  .strict()
  .brand('RevokePermissionRequest');

// Create Permission Request (Admin only)
export const CreatePermissionSchema = z
  .object({
    name: PermissionStringSchema,
    resource: PermissionResourceSchema,
    action: PermissionActionSchema,
    description: z.string().max(500).optional(),
    category: z.string().optional(),
    createdBy: UserIdSchema,
  })
  .strict()
  .brand('CreatePermissionRequest');

// Update Permission Request
export const UpdatePermissionSchema = z
  .object({
    permissionId: PermissionIdSchema,
    description: z.string().max(500).optional(),
    category: z.string().optional(),
    isDeprecated: z.boolean().optional(),
    deprecatedReason: z.string().max(500).optional(),
    updatedBy: UserIdSchema,
  })
  .strict()
  .brand('UpdatePermissionRequest');

// Delete Permission Request
export const DeletePermissionSchema = z
  .object({
    permissionId: PermissionIdSchema,
    force: z.boolean().default(false),
    deletedBy: UserIdSchema,
    reason: z.string().max(500).optional(),
  })
  .strict()
  .brand('DeletePermissionRequest');

// Permission Sync Request (For role updates)
export const PermissionSyncSchema = z
  .object({
    roleId: RoleIdSchema,
    permissions: z.array(PermissionStringSchema),
    operation: z.enum(['set', 'add', 'remove']),
    modifiedBy: UserIdSchema,
    reason: z.string().max(500).optional(),
  })
  .strict()
  .brand('PermissionSyncRequest');

// Permission Filter Schema
export const PermissionFilterSchema = z
  .object({
    resource: PermissionResourceSchema.optional(),
    action: PermissionActionSchema.optional(),
    category: z.string().optional(),
    isSystem: z.boolean().optional(),
    isDeprecated: z.boolean().optional(),
    search: z.string().max(100).optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().min(1).max(100).default(20),
    sortBy: z.enum(['resource', 'action', 'name', 'createdAt']).default('resource'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
  })
  .strict()
  .brand('PermissionFilterRequest');

// ==================== Response Schemas ====================

// Permission Check Response
export const PermissionCheckResponseSchema = z
  .object({
    granted: z.boolean(),
    permission: PermissionStringSchema,
    reason: z.string().optional(),
    evaluatedAt: z.date(),
    cacheHit: z.boolean().default(false),
    evaluationTimeMs: z.number().int().min(0),
  })
  .strict()
  .brand('PermissionCheckResponse');

// Bulk Permission Check Response
export const BulkPermissionCheckResponseSchema = z
  .object({
    userId: UserIdSchema,
    allGranted: z.boolean(),
    results: z.array(
      z.object({
        permission: PermissionStringSchema,
        granted: z.boolean(),
        reason: z.string().optional(),
      })
    ),
    grantedCount: z.number().int().min(0),
    deniedCount: z.number().int().min(0),
    evaluatedAt: z.date(),
  })
  .strict()
  .brand('BulkPermissionCheckResponse');

// User Permissions Response
export const UserPermissionsResponseSchema = z
  .object({
    userId: UserIdSchema,
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    permissions: z.array(PermissionStringSchema),
    roles: z.array(
      z.object({
        id: RoleIdSchema,
        name: z.string(),
        hierarchy: z.number().int(),
      })
    ),
    lastUpdated: z.date(),
    cacheTtlSeconds: z.number().int().positive().default(300),
  })
  .strict()
  .brand('UserPermissionsResponse');

// Permission List Response
export const PermissionListResponseSchema = z
  .object({
    permissions: z.array(PermissionSchema),
    total: z.number().int().min(0),
    page: z.number().int().positive(),
    limit: z.number().int().min(1).max(100),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
  })
  .strict()
  .brand('PermissionListResponse');

// Permission Sync Response
export const PermissionSyncResponseSchema = z
  .object({
    success: z.boolean(),
    roleId: RoleIdSchema,
    added: z.array(PermissionStringSchema),
    removed: z.array(PermissionStringSchema),
    unchanged: z.array(PermissionStringSchema),
    syncedAt: z.date(),
  })
  .strict()
  .brand('PermissionSyncResponse');

// ==================== Permission Tree Node (Type + Schema) ====================

// First define the type for the tree node
export type PermissionTreeNode = {
  resource: string;
  resourceLabel: string;
  category: string;
  actions: {
    action: string;
    actionLabel: string;
    permission: string;
    isGranted?: boolean;
  }[];
  children?: PermissionTreeNode[];
};

// Permission Statistics Response (For admin dashboard)
export const PermissionStatisticsResponseSchema = z
  .object({
    totalPermissions: z.number().int(),
    totalRoles: z.number().int(),
    totalAssignments: z.number().int(),
    permissionsByResource: z.record(z.string(), z.number().int()),
    permissionsByAction: z.record(z.string(), z.number().int()),
    permissionsByCategory: z.record(z.string(), z.number().int()),
    mostAssignedPermissions: z.array(
      z.object({
        permission: PermissionStringSchema,
        assignmentCount: z.number().int(),
      })
    ),
    unusedPermissions: z.array(PermissionStringSchema),
    deprecatedPermissions: z.array(PermissionStringSchema),
    recentChanges: z.array(
      z.object({
        permission: PermissionStringSchema,
        action: z.enum(['added', 'removed', 'updated']),
        timestamp: z.date(),
      })
    ),
    updatedAt: z.date(),
  })
  .strict()
  .brand('PermissionStatisticsResponse');

// ==================== Error Schemas ====================

export const PermissionErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'permission_not_found',
      'permission_already_exists',
      'invalid_permission_string',
      'cannot_delete_system_permission',
      'cannot_modify_system_permission',
      'insufficient_permissions',
      'invalid_resource',
      'invalid_action',
      'permission_grant_failed',
      'permission_revoke_failed',
      'permission_already_granted',
      'permission_not_granted',
      'invalid_context',
    ]),
    field: z.string().optional(),
    details: z.record(z.unknown()).optional(),
  })
  .strict()
  .brand('PermissionError');

// ==================== Helper Functions (Type-safe) ====================

// Helper to create a permission string
export const createPermissionString = (resource: string, action: string): string => {
  return `${resource}:${action}`;
};

// Helper to parse permission string
export const parsePermissionString = (permission: string): { resource: string; action: string } | null => {
  const parts = permission.split(':');
  if (parts.length !== 2) return null;
  return { resource: parts[0]!, action: parts[1]! };
};

// ==================== Type Exports ====================

export type PermissionResource = z.infer<typeof PermissionResourceSchema>;
export type PermissionAction = z.infer<typeof PermissionActionSchema>;
export type PermissionString = z.infer<typeof PermissionStringSchema>;
export type PermissionId = z.infer<typeof PermissionIdSchema>;
export type RoleId = z.infer<typeof RoleIdSchema>;
export type UserId = z.infer<typeof UserIdSchema>;

export type Permission = z.infer<typeof PermissionSchema>;
export type PermissionGroup = z.infer<typeof PermissionGroupSchema>;
export type RolePermissionAssignment = z.infer<typeof RolePermissionAssignmentSchema>;

export type CheckPermissionRequest = z.infer<typeof CheckPermissionSchema>;
export type BulkCheckPermissionRequest = z.infer<typeof BulkCheckPermissionSchema>;
export type GrantPermissionRequest = z.infer<typeof GrantPermissionSchema>;
export type RevokePermissionRequest = z.infer<typeof RevokePermissionSchema>;
export type CreatePermissionRequest = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionRequest = z.infer<typeof UpdatePermissionSchema>;
export type DeletePermissionRequest = z.infer<typeof DeletePermissionSchema>;
export type PermissionSyncRequest = z.infer<typeof PermissionSyncSchema>;
export type PermissionFilterRequest = z.infer<typeof PermissionFilterSchema>;

export type PermissionCheckResponse = z.infer<typeof PermissionCheckResponseSchema>;
export type BulkPermissionCheckResponse = z.infer<typeof BulkPermissionCheckResponseSchema>;
export type UserPermissionsResponse = z.infer<typeof UserPermissionsResponseSchema>;
export type PermissionListResponse = z.infer<typeof PermissionListResponseSchema>;
export type PermissionSyncResponse = z.infer<typeof PermissionSyncResponseSchema>;
export type PermissionStatisticsResponse = z.infer<typeof PermissionStatisticsResponseSchema>;
export type PermissionError = z.infer<typeof PermissionErrorSchema>;
 
