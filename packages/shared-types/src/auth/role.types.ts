/**
 * Role Types - Pure TypeScript type contracts for RBAC
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/src/auth/role.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO permission calculation, authorization logic
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  ROLES,
  ROLE_HIERARCHY,
  ROLE_METADATA,
  ROLE_COLORS,
  ROLE_CATEGORIES,
  ROLE_INHERITANCE,
  SYSTEM_ROLES,
} from '@vubon/auth-constants';

// ============================================================
// Role Type (Based on constants - union over enum)
// ============================================================
export type Role = typeof ROLES[keyof typeof ROLES];

// Extended role types for Bangladesh e-commerce
export type ExtendedRole = 
  | Role
  | 'system_monitor'
  | 'auditor'
  | 'content_manager'
  | 'marketing_manager'
  | 'analyst'
  | 'support_agent'
  | 'support_supervisor'
  | 'vendor_manager'
  | 'shop_manager'
  | 'shop_staff'
  | 'delivery_manager'
  | 'delivery_agent'
  | 'premium_customer'
  | 'district_manager'
  | 'upzila_agent'
  | 'mfs_agent';

// ============================================================
// Role Hierarchy Level (Higher = more permissions)
// ============================================================
export type RoleHierarchyMap = {
  readonly [K in ExtendedRole]?: number;
};

// Role hierarchy value type
export type RoleHierarchyValue = typeof ROLE_HIERARCHY[keyof typeof ROLE_HIERARCHY];

// ============================================================
// Role Category Types
// ============================================================
export type RoleCategory = typeof ROLE_CATEGORIES[keyof typeof ROLE_CATEGORIES];

// ============================================================
// Role Metadata Interface
// ============================================================
export interface RoleMetadata {
  readonly name: string;
  readonly nameBn?: string;                    // Bengali name (Bangladesh specific)
  readonly description: string;
  readonly descriptionBn?: string;             // Bengali description
  readonly category: RoleCategory;
  readonly isSystemRole: boolean;
  readonly canBeDeleted: boolean;
  readonly canBeModified: boolean;
  readonly canBeAssignedAutomatically: boolean;
  readonly maxAssignees: number;               // -1 = unlimited
  readonly requiresMfa: boolean;
  readonly requiresVerification?: boolean;     // Email/phone verification
  readonly requiresKyc?: boolean;              // KYC verification
  readonly auditLogging: 'full' | 'standard' | 'basic' | 'none';
  readonly color: string;
  readonly icon?: string;
  readonly priority: number;                   // For sorting/display
}

// ============================================================
// Role Inheritance (Parent-child relationship)
// ============================================================
export interface RoleInheritance {
  readonly role: ExtendedRole;
  readonly parentRole: ExtendedRole | null;
  readonly hierarchy: number;
  readonly inheritedPermissions: readonly string[];  // Permissions from parent
}

// ============================================================
// Role Assignment Entity (Core domain model)
// ============================================================
export interface RoleAssignment {
  readonly id: string;
  readonly userId: string;
  readonly role: ExtendedRole;
  readonly assignedBy: string;
  readonly assignedAt: Date;
  readonly expiresAt: Date | null;
  readonly reason?: string;
  readonly status: 'active' | 'expired' | 'revoked';
  readonly revokedAt?: Date;
  readonly revokedBy?: string;
  readonly revokedReason?: string;
}

// ============================================================
// Role DTO for API Responses
// ============================================================
export interface RoleDTO {
  readonly role: ExtendedRole;
  readonly name: string;
  readonly nameBn?: string;
  readonly description: string;
  readonly descriptionBn?: string;
  readonly category: RoleCategory;
  readonly isSystemRole: boolean;
  readonly canBeDeleted: boolean;
  readonly requiresMfa: boolean;
  readonly requiresKyc: boolean;
  readonly color: string;
  readonly icon?: string;
  readonly userCount: number;
  readonly hierarchy: number;
  readonly parentRole?: ExtendedRole | null;
  readonly childRoles?: readonly ExtendedRole[];
}

// ============================================================
// Create Custom Role Request (For future extension)
// ============================================================
export interface CreateCustomRoleRequest {
  readonly name: string;
  readonly nameBn?: string;
  readonly description: string;
  readonly descriptionBn?: string;
  readonly category: RoleCategory;
  readonly permissions: readonly string[];
  readonly parentRole?: ExtendedRole;
  readonly requiresMfa?: boolean;
  readonly requiresKyc?: boolean;
  readonly maxAssignees?: number;
  readonly createdBy: string;
}

// ============================================================
// Update Role Request
// ============================================================
export interface UpdateRoleRequest {
  readonly description?: string;
  readonly descriptionBn?: string;
  readonly permissions?: readonly string[];
  readonly requiresMfa?: boolean;
  readonly requiresKyc?: boolean;
  readonly maxAssignees?: number;
  readonly updatedBy: string;
  readonly reason?: string;
}

// ============================================================
// Delete Role Request
// ============================================================
export interface DeleteRoleRequest {
  readonly role: ExtendedRole;
  readonly force?: boolean;                   // Force delete even with assignments
  readonly reassignTo?: ExtendedRole;         // Reassign users to this role
  readonly deletedBy: string;
  readonly reason: string;
}

// ============================================================
// Role Assignment Request (API DTO)
// ============================================================
export interface AssignRoleRequest {
  readonly userId: string;
  readonly role: ExtendedRole;
  readonly expiresAt?: Date;
  readonly reason?: string;
  readonly assignedBy: string;
  readonly notifyUser?: boolean;
}

// ============================================================
// Role Removal Request (API DTO)
// ============================================================
export interface RemoveRoleRequest {
  readonly userId: string;
  readonly role: ExtendedRole;
  readonly reason?: string;
  readonly removedBy: string;
  readonly notifyUser?: boolean;
}

// ============================================================
// Bulk Role Assignment
// ============================================================
export interface BulkRoleAssignmentRequest {
  readonly userIds: readonly string[];
  readonly role: ExtendedRole;
  readonly expiresAt?: Date;
  readonly reason?: string;
  readonly assignedBy: string;
  readonly notifyUsers?: boolean;
}

export interface BulkRoleAssignmentResult {
  readonly totalRequested: number;
  readonly successful: number;
  readonly failed: number;
  readonly failedUsers: ReadonlyArray<{
    readonly userId: string;
    readonly reason: string;
  }>;
  readonly assignedAt: Date;
}

// ============================================================
// User Roles Response (API DTO)
// ============================================================
export interface UserRolesResponse {
  readonly userId: string;
  readonly email: string;
  readonly roles: ReadonlyArray<{
    readonly role: ExtendedRole;
    readonly name: string;
    readonly assignedAt: Date;
    readonly expiresAt: Date | null;
    readonly isActive: boolean;
  }>;
  readonly primaryRole: ExtendedRole;
  readonly effectivePermissions: readonly string[];
  readonly lastUpdated: Date;
}

// ============================================================
// Role Validation Result
// ============================================================
export interface RoleValidationResult {
  readonly valid: boolean;
  readonly role: ExtendedRole | null;
  readonly errors?: ReadonlyArray<{
    readonly field: string;
    readonly message: string;
  }>;
  readonly warnings?: ReadonlyArray<{
    readonly message: string;
  }>;
}

// ============================================================
// Role Statistics (For admin dashboard)
// ============================================================
export interface RoleStatistics {
  readonly totalRoles: number;
  readonly totalAssignments: number;
  readonly uniqueUsersWithRoles: number;
  
  readonly rolesByCategory: Record<RoleCategory, number>;
  readonly assignmentsByRole: Record<ExtendedRole, number>;
  
  readonly mostAssignedRoles: ReadonlyArray<{
    readonly role: ExtendedRole;
    readonly count: number;
  }>;
  
  readonly expiringAssignments: ReadonlyArray<{
    readonly userId: string;
    readonly role: ExtendedRole;
    readonly expiresAt: Date;
  }>;
  
  readonly systemRolesCount: number;
  readonly customRolesCount: number;
  
  readonly recentAssignments: ReadonlyArray<{
    readonly userId: string;
    readonly role: ExtendedRole;
    readonly assignedAt: Date;
    readonly assignedBy: string;
  }>;
}

// ============================================================
// Role Filter Options (For list APIs)
// ============================================================
export interface RoleFilterOptions {
  readonly category?: RoleCategory;
  readonly isSystemRole?: boolean;
  readonly requiresMfa?: boolean;
  readonly requiresKyc?: boolean;
  readonly search?: string;                  // Search in name/description
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'name' | 'hierarchy' | 'userCount' | 'createdAt';
  readonly sortOrder?: 'asc' | 'desc';
}

// ============================================================
// Role Comparison Result (For authorization)
// ============================================================
export interface RoleComparisonResult {
  readonly user1Id: string;
  readonly user2Id: string;
  readonly user1Roles: readonly ExtendedRole[];
  readonly user2Roles: readonly ExtendedRole[];
  readonly user1HighestHierarchy: number;
  readonly user2HighestHierarchy: number;
  readonly user1CanImpersonateUser2: boolean;
  readonly user2CanImpersonateUser1: boolean;
  readonly commonRoles: readonly ExtendedRole[];
}

// ============================================================
// Role Change Event (For audit)
// ============================================================
export type RoleEventType = 
  | 'role.created'
  | 'role.updated'
  | 'role.deleted'
  | 'role.assigned'
  | 'role.removed'
  | 'role.bulk_assigned'
  | 'role.imported'
  | 'role.exported';

export interface RoleEvent {
  readonly id: string;
  readonly eventType: RoleEventType;
  readonly role: ExtendedRole;
  readonly userId?: string;                  // Affected user (for assignment)
  readonly affectedUserIds?: readonly string[]; // For bulk operations
  readonly timestamp: Date;
  readonly actorId: string;
  readonly actorIp: string;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// System Roles List (Cannot be modified)
// ============================================================
export type SystemRole = typeof SYSTEM_ROLES[number];

// ============================================================
// Role Hierarchy Check Result
// ============================================================
export interface RoleHierarchyCheckResult {
  readonly higherRole: ExtendedRole;
  readonly lowerRole: ExtendedRole;
  readonly higherHierarchy: number;
  readonly lowerHierarchy: number;
  readonly isHigher: boolean;
  readonly hierarchyDifference: number;
}

// ============================================================
// Role Permission Summary (For UI display)
// ============================================================
export interface RolePermissionSummary {
  readonly role: ExtendedRole;
  readonly totalPermissions: number;
  readonly permissionsByResource: Record<string, number>;
  readonly permissionsByAction: Record<string, number>;
  readonly inheritedPermissions: readonly string[];
  readonly directPermissions: readonly string[];
}

// ============================================================
// Role Assignment History
// ============================================================
export interface RoleAssignmentHistory {
  readonly userId: string;
  readonly assignments: ReadonlyArray<{
    readonly id: string;
    readonly role: ExtendedRole;
    readonly assignedAt: Date;
    readonly assignedBy: string;
    readonly expiresAt: Date | null;
    readonly revokedAt: Date | null;
    readonly revokedBy: string | null;
    readonly status: 'active' | 'expired' | 'revoked';
  }>;
  readonly totalAssignments: number;
  readonly activeAssignments: number;
  readonly expiredAssignments: number;
  readonly revokedAssignments: number;
}

// ============================================================
// Role Export Format (For backup/migration)
// ============================================================
export interface RoleExportData {
  readonly version: string;
  readonly exportedAt: Date;
  readonly exportedBy: string;
  readonly roles: ReadonlyArray<{
    readonly role: ExtendedRole;
    readonly metadata: RoleMetadata;
    readonly permissions: readonly string[];
    readonly parentRole?: ExtendedRole;
  }>;
  readonly assignments: ReadonlyArray<{
    readonly userId: string;
    readonly role: ExtendedRole;
    readonly assignedAt: Date;
    readonly expiresAt: Date | null;
  }>;
}

// ============================================================
// Role Import Result (For migration)
// ============================================================
export interface RoleImportResult {
  readonly success: boolean;
  readonly totalRoles: number;
  readonly importedRoles: number;
  readonly skippedRoles: number;
  readonly failedRoles: ReadonlyArray<{
    readonly role: string;
    readonly reason: string;
  }>;
  readonly totalAssignments: number;
  readonly importedAssignments: number;
  readonly failedAssignments: number;
  readonly importCompletedAt: Date;
}

// ============================================================
// Available Roles List (For dropdown/select)
// ============================================================
export interface AvailableRole {
  readonly value: ExtendedRole;
  readonly label: string;
  readonly labelBn?: string;
  readonly category: RoleCategory;
  readonly description: string;
  readonly disabled?: boolean;
  readonly disabledReason?: string;
}
