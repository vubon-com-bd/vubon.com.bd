/**
 * Role Schemas - Pure validation for RBAC
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/role/role.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO permission lookup, database access, authorization logic
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
// ✅ FIXED: Removed unused imports
import {
  ROLE_CATEGORIES,
} from '@vubon/shared-constants';

// Import permission string schema from permission.schema
import { PermissionStringSchema } from './permission.schema';

// ==================== Primitives (Reusable) ====================

// Role Name Schema (Based on constants)
export const RoleNameSchema = z
  .string()
  .min(2, 'Role name must be at least 2 characters')
  .max(50, 'Role name cannot exceed 50 characters')
  .regex(/^[a-z_]+$/, 'Role name must contain only lowercase letters and underscores')
  .brand('RoleName');

// Role ID Schema
export const RoleIdSchema = z.string().uuid('Invalid role ID format').brand('RoleId');

// Role Category Schema
// ✅ FIXED: Use proper enum values
export const RoleCategorySchema = z.enum([
  'System Administration',
  'Management',
  'Operations',
  'Vendor Management',
  'Delivery & Logistics',
  'Customer',
  'Bangladesh Specific',
]);

// Role Color Schema
export const RoleColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format. Must be a valid hex color (e.g., #FF0000)')
  .default('#10B981')
  .brand('RoleColor');

// ==================== Domain Schemas ====================

// Role Metadata Schema
export const RoleMetadataSchema = z
  .object({
    name: z.string(),
    nameBn: z.string().optional(),
    description: z.string(),
    descriptionBn: z.string().optional(),
    category: RoleCategorySchema,
    isSystemRole: z.boolean(),
    canBeDeleted: z.boolean(),
    canBeModified: z.boolean(),
    canBeAssignedAutomatically: z.boolean(),
    maxAssignees: z.number().int().min(-1), // -1 = unlimited
    requiresMfa: z.boolean(),
    requiresVerification: z.boolean().optional(),
    requiresKyc: z.boolean().optional(),
    auditLogging: z.enum(['full', 'standard', 'basic', 'none']),
    color: RoleColorSchema,
    icon: z.string().optional(),
    priority: z.number().int().min(0),
  })
  .strict()
  .brand('RoleMetadata');

// Role Entity Schema
export const RoleSchema = z
  .object({
    id: RoleIdSchema,
    name: RoleNameSchema,
    nameBn: z.string().optional(),
    description: z.string().max(500, 'Description too long'),
    descriptionBn: z.string().max(500).optional(),
    category: RoleCategorySchema,
    permissions: z.array(PermissionStringSchema),
    isSystemRole: z.boolean().default(false),
    canBeDeleted: z.boolean().default(true),
    canBeModified: z.boolean().default(true),
    requiresMfa: z.boolean().default(false),
    requiresKyc: z.boolean().default(false),
    color: RoleColorSchema,
    icon: z.string().optional(),
    hierarchy: z.number().int().min(0).max(100),
    parentRole: RoleNameSchema.nullable(),
    childRoles: z.array(RoleNameSchema).optional(),
    userCount: z.number().int().nonnegative().default(0),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict()
  .brand('Role');

// Role Inheritance Schema
export const RoleInheritanceSchema = z
  .object({
    role: RoleNameSchema,
    parentRole: RoleNameSchema.nullable(),
    hierarchy: z.number().int(),
    inheritedPermissions: z.array(PermissionStringSchema),
  })
  .strict()
  .brand('RoleInheritance');

// ==================== Request Schemas ====================

// Create Role Request
export const CreateRoleSchema = z
  .object({
    name: RoleNameSchema,
    nameBn: z.string().optional(),
    description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
    descriptionBn: z.string().max(500).optional(),
    category: RoleCategorySchema.default('Operations'),
    permissions: z.array(PermissionStringSchema).min(1, 'Role must have at least one permission'),
    parentRole: RoleNameSchema.optional(),
    color: RoleColorSchema.optional(),
    icon: z.string().optional(),
    requiresMfa: z.boolean().default(false),
    requiresKyc: z.boolean().default(false),
    maxAssignees: z.number().int().min(-1).default(-1),
    createdBy: z.string().uuid('Invalid creator ID'),
  })
  .strict()
  .brand('CreateRoleRequest');

// Update Role Request
export const UpdateRoleSchema = z
  .object({
    roleId: RoleIdSchema,
    name: RoleNameSchema.optional(),
    nameBn: z.string().optional(),
    description: z.string().max(500).optional(),
    descriptionBn: z.string().max(500).optional(),
    category: RoleCategorySchema.optional(),
    permissions: z.array(PermissionStringSchema).optional(),
    color: RoleColorSchema.optional(),
    icon: z.string().optional(),
    requiresMfa: z.boolean().optional(),
    requiresKyc: z.boolean().optional(),
    maxAssignees: z.number().int().min(-1).optional(),
    updatedBy: z.string().uuid('Invalid updater ID'),
    reason: z.string().max(500).optional(),
  })
  .strict()
  .brand('UpdateRoleRequest');

// Delete Role Request
export const DeleteRoleSchema = z
  .object({
    roleId: RoleIdSchema,
    force: z.boolean().default(false),
    reassignTo: RoleNameSchema.optional(),
    deletedBy: z.string().uuid('Invalid deleter ID'),
    reason: z.string().min(1, 'Reason is required for role deletion').max(500),
  })
  .strict()
  .refine(
    (data) => {
      // If force is false and reassignTo is not provided, it's an error
      if (!data.force && !data.reassignTo) {
        return false;
      }
      return true;
    },
    {
      message: 'Either force delete or reassignTo is required when deleting a role with users',
      path: ['reassignTo'],
    }
  )
  .brand('DeleteRoleRequest');

// Assign Role Request
export const AssignRoleSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID'),
    role: RoleNameSchema,
    expiresAt: z.date().optional(),
    reason: z.string().max(500).optional(),
    assignedBy: z.string().uuid('Invalid assigner ID'),
    notifyUser: z.boolean().default(false),
  })
  .strict()
  .refine(
    (data) => {
      // expiresAt must be in the future if provided
      if (data.expiresAt && data.expiresAt <= new Date()) {
        return false;
      }
      return true;
    },
    {
      message: 'Expiration date must be in the future',
      path: ['expiresAt'],
    }
  )
  .brand('AssignRoleRequest');

// Remove Role Request
export const RemoveRoleSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID'),
    role: RoleNameSchema,
    reason: z.string().max(500).optional(),
    removedBy: z.string().uuid('Invalid remover ID'),
    notifyUser: z.boolean().default(false),
  })
  .strict()
  .brand('RemoveRoleRequest');

// Bulk Assign Role Request
export const BulkAssignRoleSchema = z
  .object({
    userIds: z.array(z.string().uuid()).min(1, 'At least one user ID required').max(100, 'Maximum 100 users per request'),
    role: RoleNameSchema,
    expiresAt: z.date().optional(),
    reason: z.string().max(500).optional(),
    assignedBy: z.string().uuid('Invalid assigner ID'),
    notifyUsers: z.boolean().default(false),
  })
  .strict()
  .refine(
    (data) => {
      // expiresAt must be in the future if provided
      if (data.expiresAt && data.expiresAt <= new Date()) {
        return false;
      }
      return true;
    },
    {
      message: 'Expiration date must be in the future',
      path: ['expiresAt'],
    }
  )
  .brand('BulkAssignRoleRequest');

// Bulk Remove Role Request
export const BulkRemoveRoleSchema = z
  .object({
    userIds: z.array(z.string().uuid()).min(1, 'At least one user ID required').max(100, 'Maximum 100 users per request'),
    role: RoleNameSchema,
    reason: z.string().max(500).optional(),
    removedBy: z.string().uuid('Invalid remover ID'),
    notifyUsers: z.boolean().default(false),
  })
  .strict()
  .brand('BulkRemoveRoleRequest');

// Role Filter Schema (For listing roles)
export const RoleFilterSchema = z
  .object({
    category: RoleCategorySchema.optional(),
    isSystemRole: z.boolean().optional(),
    requiresMfa: z.boolean().optional(),
    requiresKyc: z.boolean().optional(),
    search: z.string().max(100).optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().min(1).max(100).default(20),
    sortBy: z.enum(['name', 'hierarchy', 'userCount', 'createdAt']).default('name'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
  })
  .strict()
  .brand('RoleFilterRequest');

// ==================== Response Schemas ====================

// Role Response Schema
export const RoleResponseSchema = z
  .object({
    id: RoleIdSchema,
    name: RoleNameSchema,
    nameBn: z.string().optional(),
    description: z.string(),
    descriptionBn: z.string().optional(),
    category: RoleCategorySchema,
    permissions: z.array(PermissionStringSchema),
    isSystemRole: z.boolean(),
    canBeDeleted: z.boolean(),
    canBeModified: z.boolean(),
    requiresMfa: z.boolean(),
    requiresKyc: z.boolean(),
    color: RoleColorSchema,
    icon: z.string().optional(),
    hierarchy: z.number().int(),
    parentRole: RoleNameSchema.nullable(),
    childRoles: z.array(RoleNameSchema).optional(),
    userCount: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict()
  .brand('RoleResponse');

// Role List Response Schema (Paginated)
export const RoleListResponseSchema = z
  .object({
    roles: z.array(RoleResponseSchema),
    total: z.number().int().min(0),
    page: z.number().int().positive(),
    limit: z.number().int().min(1).max(100),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
  })
  .strict()
  .brand('RoleListResponse');

// User Roles Response Schema
export const UserRolesResponseSchema = z
  .object({
    userId: z.string().uuid(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    roles: z.array(
      z.object({
        role: RoleNameSchema,
        name: z.string(),
        nameBn: z.string().optional(),
        assignedAt: z.date(),
        expiresAt: z.date().nullable(),
        isActive: z.boolean(),
      })
    ),
    primaryRole: RoleNameSchema,
    effectivePermissions: z.array(PermissionStringSchema),
    lastUpdated: z.date(),
  })
  .strict()
  .brand('UserRolesResponse');

// Assign Role Response Schema
export const AssignRoleResponseSchema = z
  .object({
    success: z.boolean(),
    userId: z.string().uuid(),
    role: RoleNameSchema,
    assignedAt: z.date(),
    expiresAt: z.date().nullable(),
    message: z.string().optional(),
  })
  .strict()
  .brand('AssignRoleResponse');

// Bulk Assign Role Response Schema
export const BulkAssignRoleResponseSchema = z
  .object({
    totalRequested: z.number().int(),
    successful: z.number().int(),
    failed: z.number().int(),
    failedUsers: z.array(
      z.object({
        userId: z.string().uuid(),
        reason: z.string(),
      })
    ),
    assignedAt: z.date(),
  })
  .strict()
  .brand('BulkAssignRoleResponse');

// Role Hierarchy Check Response Schema
export const RoleHierarchyCheckResponseSchema = z
  .object({
    higherRole: RoleNameSchema,
    lowerRole: RoleNameSchema,
    higherHierarchy: z.number().int(),
    lowerHierarchy: z.number().int(),
    isHigher: z.boolean(),
    hierarchyDifference: z.number().int(),
    canManage: z.boolean(),
  })
  .strict()
  .brand('RoleHierarchyCheckResponse');

// Role Statistics Response Schema (For admin dashboard)
export const RoleStatisticsResponseSchema = z
  .object({
    totalRoles: z.number().int(),
    totalAssignments: z.number().int(),
    uniqueUsersWithRoles: z.number().int(),
    rolesByCategory: z.record(RoleCategorySchema, z.number().int()),
    assignmentsByRole: z.record(RoleNameSchema, z.number().int()),
    mostAssignedRoles: z.array(
      z.object({
        role: RoleNameSchema,
        count: z.number().int(),
      })
    ),
    expiringAssignments: z.array(
      z.object({
        userId: z.string().uuid(),
        userEmail: z.string().email(),
        role: RoleNameSchema,
        expiresAt: z.date(),
      })
    ),
    systemRolesCount: z.number().int(),
    customRolesCount: z.number().int(),
    recentAssignments: z.array(
      z.object({
        userId: z.string().uuid(),
        userEmail: z.string().email(),
        role: RoleNameSchema,
        assignedAt: z.date(),
        assignedBy: z.string().uuid(),
      })
    ),
    updatedAt: z.date(),
  })
  .strict()
  .brand('RoleStatisticsResponse');

// ==================== Error Schemas ====================

export const RoleErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'role_not_found',
      'role_already_exists',
      'cannot_delete_system_role',
      'cannot_modify_system_role',
      'cannot_assign_role_to_user',
      'cannot_remove_role_from_user',
      'role_assignment_not_found',
      'invalid_role_hierarchy',
      'circular_role_inheritance',
      'max_assignees_exceeded',
      'insufficient_permissions',
      'role_already_assigned',
      'role_not_assigned',
      'expiration_date_invalid',
    ]),
    field: z.string().optional(),
    details: z.record(z.unknown()).optional(),
  })
  .strict()
  .brand('RoleError');

// ==================== Type Exports ====================

export type RoleName = z.infer<typeof RoleNameSchema>;
export type RoleId = z.infer<typeof RoleIdSchema>;
export type RoleCategory = z.infer<typeof RoleCategorySchema>;
export type RoleColor = z.infer<typeof RoleColorSchema>;

export type RoleMetadata = z.infer<typeof RoleMetadataSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type RoleInheritance = z.infer<typeof RoleInheritanceSchema>;

export type CreateRoleRequest = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleRequest = z.infer<typeof UpdateRoleSchema>;
export type DeleteRoleRequest = z.infer<typeof DeleteRoleSchema>;
export type AssignRoleRequest = z.infer<typeof AssignRoleSchema>;
export type RemoveRoleRequest = z.infer<typeof RemoveRoleSchema>;
export type BulkAssignRoleRequest = z.infer<typeof BulkAssignRoleSchema>;
export type BulkRemoveRoleRequest = z.infer<typeof BulkRemoveRoleSchema>;
export type RoleFilterRequest = z.infer<typeof RoleFilterSchema>;

export type RoleResponse = z.infer<typeof RoleResponseSchema>;
export type RoleListResponse = z.infer<typeof RoleListResponseSchema>;
export type UserRolesResponse = z.infer<typeof UserRolesResponseSchema>;
export type AssignRoleResponse = z.infer<typeof AssignRoleResponseSchema>;
export type BulkAssignRoleResponse = z.infer<typeof BulkAssignRoleResponseSchema>;
export type RoleHierarchyCheckResponse = z.infer<typeof RoleHierarchyCheckResponseSchema>;
export type RoleStatisticsResponse = z.infer<typeof RoleStatisticsResponseSchema>;
export type RoleError = z.infer<typeof RoleErrorSchema>;
