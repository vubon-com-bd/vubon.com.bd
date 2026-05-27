/**
 * Permission Types - Pure TypeScript type contracts for Permissions
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth-types/auth/permission.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO authorization checking, permission resolution logic
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  PERMISSIONS,
  PERMISSION_GROUPS,
  PERMISSION_RESOURCES,
  PERMISSION_ACTIONS,
  PERMISSION_CATEGORIES,
} from '@vubon/auth-constants';

// ============================================================
// Permission Resource Types (Based on constants - NO enums)
// ============================================================
export type PermissionResource = typeof PERMISSION_RESOURCES[keyof typeof PERMISSION_RESOURCES];

// Extended permission resources for Bangladesh e-commerce
export type ExtendedPermissionResource = 
  | PermissionResource
  | 'vendor'           // Multi-vendor management
  | 'delivery'         // Delivery management
  | 'shipping'         // Shipping zone management
  | 'offer'            // Offer & promotion management
  | 'flash_sale'       // Flash sale management
  | 'cart'             // Cart management
  | 'wishlist'         // Wishlist management
  | 'ticket'           // Support ticket management
  | 'notification'     // Notification management
  | 'audit'            // Audit log management
  | 'district'         // District management (Bangladesh)
  | 'upazila'          // Upazila management (Bangladesh)
  | 'mfs_payment'      // Mobile Financial Services (bKash/Nagad/Rocket)
  | 'sslcommerz'       // SSLCOMMERZ payment gateway
  | 'export'           // Data export
  | 'import'           // Data import
  | 'bulk_operation';  // Bulk operations

// ============================================================
// Permission Action Types (Based on constants)
// ============================================================
export type PermissionAction = typeof PERMISSION_ACTIONS[keyof typeof PERMISSION_ACTIONS];

// Extended permission actions
export type ExtendedPermissionAction = 
  | PermissionAction
  | 'feature'          // Feature product on homepage
  | 'unfeature'        // Remove feature
  | 'verify'           // Verify vendor/shop
  | 'ship'             // Mark as shipped
  | 'deliver'          // Mark as delivered
  | 'moderate'         // Moderate reviews
  | 'resolve'          // Resolve tickets
  | 'assign'           // Assign tickets
  | 'send'             // Send notifications
  | 'broadcast'        // Broadcast to all users
  | 'impersonate'      // Impersonate user (admin)
  | 'adjust'           // Adjust inventory
  | 'manage'           // Full management access
  | 'configure';       // Configure settings

// ============================================================
// Permission String Format: `${resource}:${action}`
// ============================================================
export type PermissionString = `${ExtendedPermissionResource}:${ExtendedPermissionAction}`;

// ============================================================
// Common Permission Groups (Type-safe)
// ============================================================

// User Management Permissions
export type UserPermissions = 
  | 'user:create'
  | 'user:read'
  | 'user:update'
  | 'user:delete'
  | 'user:list'
  | 'user:suspend'
  | 'user:activate'
  | 'user:impersonate'
  | 'user:export';

// Role Management Permissions
export type RolePermissions = 
  | 'role:create'
  | 'role:read'
  | 'role:update'
  | 'role:delete'
  | 'role:assign'
  | 'role:revoke';

// Permission Management Permissions
export type PermissionManagementPermissions = 
  | 'permission:create'
  | 'permission:read'
  | 'permission:update'
  | 'permission:delete'
  | 'permission:assign'
  | 'permission:revoke';

// Product Management Permissions
export type ProductPermissions = 
  | 'product:create'
  | 'product:read'
  | 'product:update'
  | 'product:delete'
  | 'product:list'
  | 'product:publish'
  | 'product:unpublish'
  | 'product:approve'
  | 'product:reject'
  | 'product:feature'
  | 'product:export'
  | 'product:import'
  | 'product:bulk_update';

// Category Management Permissions
export type CategoryPermissions = 
  | 'category:create'
  | 'category:read'
  | 'category:update'
  | 'category:delete'
  | 'category:sort';

// Order Management Permissions
export type OrderPermissions = 
  | 'order:create'
  | 'order:read'
  | 'order:update'
  | 'order:list'
  | 'order:cancel'
  | 'order:refund'
  | 'order:approve'
  | 'order:ship'
  | 'order:deliver'
  | 'order:export'
  | 'order:bulk_status';

// Payment Management Permissions
export type PaymentPermissions = 
  | 'payment:create'
  | 'payment:read'
  | 'payment:update'
  | 'payment:refund'
  | 'payment:void'
  | 'payment:capture'
  | 'payment:verify';

// Vendor Management Permissions (Bangladesh specific)
export type VendorPermissions = 
  | 'vendor:read'
  | 'vendor:update'
  | 'vendor:verify'
  | 'vendor:payout'
  | 'vendor:commission:update'
  | 'vendor:suspend'
  | 'vendor:activate';

// Delivery Management Permissions (Bangladesh specific)
export type DeliveryPermissions = 
  | 'delivery:read'
  | 'delivery:update'
  | 'delivery:assign'
  | 'delivery:track'
  | 'delivery:bulk_update';

// MFS Payment Permissions (Bangladesh specific - bKash/Nagad/Rocket)
export type MFSPaymentPermissions = 
  | 'mfs:payment:read'
  | 'mfs:payment:process'
  | 'mfs:payment:refund'
  | 'mfs:payment:verify'
  | 'mfs:payment:configure';

// ============================================================
// Permission Entity (Core domain model)
// ============================================================
export interface Permission {
  readonly id: string;
  readonly name: PermissionString;
  readonly resource: ExtendedPermissionResource;
  readonly action: ExtendedPermissionAction;
  readonly description: string;
  readonly category: string;               // From PERMISSION_CATEGORIES
  readonly isSystem: boolean;              // Cannot be modified/deleted
  readonly isDeprecated: boolean;
  readonly deprecatedAt?: Date;
  readonly deprecatedReason?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// ============================================================
// Permission Group (Organizing permissions)
// ============================================================
export interface PermissionGroup {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly permissions: ReadonlyArray<PermissionString>;
  readonly isSystem: boolean;
  readonly order: number;                  // Display order
}

// ============================================================
// Role Permission Assignment
// ============================================================
export interface RolePermissionAssignment {
  readonly roleId: string;
  readonly roleName: string;
  readonly permissions: ReadonlyArray<PermissionString>;
  readonly assignedAt: Date;
  readonly assignedBy: string;
  readonly isInherited: boolean;
  readonly inheritedFrom?: string;         // Parent role name
}

// ============================================================
// User Permission Check Request (API DTO)
// ============================================================
export interface PermissionCheckRequest {
  readonly userId: string;
  readonly permission: PermissionString;
  readonly context?: PermissionContext;
  readonly bypassCache?: boolean;
}

// ============================================================
// Permission Context (For conditional/resource-based checks)
// ============================================================
export interface PermissionContext {
  readonly resourceId?: string;            // Specific resource ID
  readonly shopId?: string;                // Vendor shop ID
  readonly vendorId?: string;              // Vendor ID
  readonly orderId?: string;               // Order ID
  readonly productId?: string;             // Product ID
  readonly userId?: string;                // Target user ID
  readonly organizationId?: string;
  readonly ownerId?: string;               // Resource owner ID
  readonly ipAddress?: string;
  readonly userAgent?: string;
  
  // Bangladesh specific
  readonly districtId?: string;
  readonly upazilaId?: string;
  readonly amount?: number;                // For amount-based permissions
}

// ============================================================
// Permission Check Result
// ============================================================
export interface PermissionCheckResult {
  readonly granted: boolean;
  readonly permission: PermissionString;
  readonly reason?: PermissionDeniedReason;
  readonly evaluatedAt: Date;
  readonly cacheHit: boolean;
  readonly evaluationTimeMs: number;
}

export type PermissionDeniedReason = 
  | 'no_permission'
  | 'role_not_found'
  | 'resource_not_found'
  | 'not_owner'
  | 'action_not_allowed'
  | 'context_mismatch'
  | 'account_suspended'
  | 'account_locked'
  | 'mfa_required'
  | 'rate_limited'
  | 'ip_blocked'
  | 'time_restricted'
  | 'amount_limit_exceeded';

// ============================================================
// Permission DTO (API Response)
// ============================================================
export interface PermissionDTO {
  readonly id: string;
  readonly name: PermissionString;
  readonly resource: ExtendedPermissionResource;
  readonly action: ExtendedPermissionAction;
  readonly description: string;
  readonly category: string;
  readonly isSystem: boolean;
  readonly isDeprecated: boolean;
}

// ============================================================
// Permission Tree Node (For UI display)
// ============================================================
export interface PermissionTreeNode {
  readonly resource: ExtendedPermissionResource;
  readonly resourceLabel: string;
  readonly category: string;
  readonly actions: ReadonlyArray<{
    readonly action: ExtendedPermissionAction;
    readonly actionLabel: string;
    readonly permission: PermissionString;
    readonly isGranted?: boolean;           // For UI state
  }>;
  readonly children?: ReadonlyArray<PermissionTreeNode>;
}

// ============================================================
// User Permissions Response (API DTO)
// ============================================================
export interface UserPermissionsResponse {
  readonly userId: string;
  readonly email: string;
  readonly permissions: ReadonlyArray<PermissionString>;
  readonly roles: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly hierarchy: number;
  }>;
  readonly lastUpdated: Date;
  readonly cacheTtlSeconds: number;
}

// ============================================================
// Bulk Permission Check Request
// ============================================================
export interface BulkPermissionCheckRequest {
  readonly userId: string;
  readonly permissions: ReadonlyArray<PermissionString>;
  readonly context?: PermissionContext;
  readonly requireAll?: boolean;            // true = all must be granted
}

// ============================================================
// Bulk Permission Check Result
// ============================================================
export interface BulkPermissionCheckResult {
  readonly userId: string;
  readonly allGranted: boolean;             // True if all requested granted
  readonly results: ReadonlyArray<{
    readonly permission: PermissionString;
    readonly granted: boolean;
    readonly reason?: PermissionDeniedReason;
  }>;
  readonly grantedCount: number;
  readonly deniedCount: number;
  readonly evaluatedAt: Date;
}

// ============================================================
// Permission Migration Definition
// ============================================================
export interface PermissionMigration {
  readonly id: string;
  readonly version: string;
  readonly createdAt: Date;
  readonly appliedAt?: Date;
  readonly add: ReadonlyArray<PermissionString>;
  readonly remove: ReadonlyArray<PermissionString>;
  readonly rename: ReadonlyArray<{
    readonly from: PermissionString;
    readonly to: PermissionString;
  }>;
  readonly update: ReadonlyArray<{
    readonly permission: PermissionString;
    readonly newDescription: string;
  }>;
  readonly isApplied: boolean;
  readonly appliedBy?: string;
}

// ============================================================
// Permission Sync Request (For role updates)
// ============================================================
export interface PermissionSyncRequest {
  readonly roleId: string;
  readonly permissions: ReadonlyArray<PermissionString>;
  readonly operation: 'set' | 'add' | 'remove';
  readonly modifiedBy: string;
  readonly reason?: string;
}

export interface PermissionSyncResult {
  readonly success: boolean;
  readonly roleId: string;
  readonly added: ReadonlyArray<PermissionString>;
  readonly removed: ReadonlyArray<PermissionString>;
  readonly unchanged: ReadonlyArray<PermissionString>;
  readonly syncedAt: Date;
}

// ============================================================
// Permission Cache Invalidation
// ============================================================
export interface PermissionCacheInvalidation {
  readonly userIds: ReadonlyArray<string>;
  readonly roleIds?: ReadonlyArray<string>;
  readonly invalidatedAt: Date;
  readonly reason: 'role_changed' | 'permission_changed' | 'user_role_changed' | 'manual';
  readonly triggeredBy: string;
}

// ============================================================
// Permission Statistics (For admin dashboard)
// ============================================================
export interface PermissionStatistics {
  readonly totalPermissions: number;
  readonly totalRoles: number;
  readonly totalAssignments: number;
  
  readonly permissionsByResource: Record<ExtendedPermissionResource, number>;
  readonly permissionsByAction: Record<ExtendedPermissionAction, number>;
  readonly permissionsByCategory: Record<string, number>;
  
  readonly mostAssignedPermissions: ReadonlyArray<{
    readonly permission: PermissionString;
    readonly assignmentCount: number;
  }>;
  
  readonly unusedPermissions: ReadonlyArray<PermissionString>;
  readonly deprecatedPermissions: ReadonlyArray<PermissionString>;
  
  readonly recentChanges: ReadonlyArray<{
    readonly permission: PermissionString;
    readonly action: 'added' | 'removed' | 'updated';
    readonly timestamp: Date;
  }>;
}

// ============================================================
// Permission Search/Filter Options
// ============================================================
export interface PermissionFilterOptions {
  readonly resource?: ExtendedPermissionResource;
  readonly action?: ExtendedPermissionAction;
  readonly category?: string;
  readonly isSystem?: boolean;
  readonly isDeprecated?: boolean;
  readonly search?: string;                // Search in name/description
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'resource' | 'action' | 'name' | 'createdAt';
  readonly sortOrder?: 'asc' | 'desc';
}

// ============================================================
// Permission Event Types (For audit)
// ============================================================
export type PermissionEventType = 
  | 'permission.created'
  | 'permission.updated'
  | 'permission.deleted'
  | 'permission.deprecated'
  | 'permission.assigned'
  | 'permission.revoked'
  | 'permission.synced'
  | 'permission.migrated';

export interface PermissionEvent {
  readonly id: string;
  readonly eventType: PermissionEventType;
  readonly permission: PermissionString;
  readonly roleId?: string;
  readonly userId?: string;
  readonly timestamp: Date;
  readonly actorId: string;
  readonly actorIp: string;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// Wildcard Permission Support (For super admins)
// ============================================================
export type WildcardPermission = '*' | `${ExtendedPermissionResource}:*` | `${ExtendedPermissionResource}:${ExtendedPermissionAction}`;

// Check if a permission matches a wildcard
export interface WildcardMatchResult {
  readonly matches: boolean;
  readonly wildcardUsed: WildcardPermission | null;
  readonly specificPermission: PermissionString | null;
}

// ============================================================
// Permission Validation Result (For pre-flight checks)
// ============================================================
export interface PermissionValidationResult {
  readonly valid: boolean;
  readonly permission: PermissionString;
  readonly errors: ReadonlyArray<{
    readonly field: 'resource' | 'action' | 'format';
    readonly message: string;
  }>;
  readonly normalizedPermission?: PermissionString;
}

// ============================================================
// Permission Dependency Graph (For role inheritance)
// ============================================================
export interface PermissionDependency {
  readonly permission: PermissionString;
  readonly requires: ReadonlyArray<PermissionString>;   // Prerequisite permissions
  readonly implies: ReadonlyArray<PermissionString>;    // Automatically granted
}

export interface PermissionDependencyGraph {
  readonly nodes: ReadonlyArray<PermissionString>;
  readonly edges: ReadonlyArray<{
    readonly from: PermissionString;
    readonly to: PermissionString;
    readonly type: 'requires' | 'implies';
  }>;
}
