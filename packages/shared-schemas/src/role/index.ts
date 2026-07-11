/**
 * Role & Permission Schemas - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-schemas/role/index
 *
 * @description
 * Central export point for all Role-Based Access Control (RBAC) schemas.
 * Includes permission validation, role management, and assignment schemas.
 *
 * Enterprise Rules:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure Zod schema exports only
 * ✅ Type-safe with complete type exports
 */

// ============================================================
// Permission Schemas & Types
// ============================================================
export {
  // Primitive Schemas
  PermissionResourceSchema,
  PermissionActionSchema,
  PermissionStringSchema,
  PermissionIdSchema,
  RoleIdSchema,
  UserIdSchema,

  // Domain Schemas
  PermissionSchema,
  PermissionGroupSchema,
  RolePermissionAssignmentSchema,

  // Request Schemas
  CheckPermissionSchema,
  BulkCheckPermissionSchema,
  GrantPermissionSchema,
  RevokePermissionSchema,
  CreatePermissionSchema,
  UpdatePermissionSchema,
  DeletePermissionSchema,
  PermissionSyncSchema,
  PermissionFilterSchema,

  // Response Schemas
  PermissionCheckResponseSchema,
  BulkPermissionCheckResponseSchema,
  UserPermissionsResponseSchema,
  PermissionListResponseSchema,
  PermissionSyncResponseSchema,
  PermissionStatisticsResponseSchema,

  // Error Schema
  PermissionErrorSchema,

  // Helper Functions
  createPermissionString,
  parsePermissionString,
} from './permission.schema';

export type {
  // Primitive Types
  PermissionResource,
  PermissionAction,
  PermissionString,
  PermissionId,
  RoleId as PermissionRoleId,
  UserId as PermissionUserId,

  // Domain Types
  Permission,
  PermissionGroup,
  RolePermissionAssignment,

  // Request Types
  CheckPermissionRequest,
  BulkCheckPermissionRequest,
  GrantPermissionRequest,
  RevokePermissionRequest,
  CreatePermissionRequest,
  UpdatePermissionRequest,
  DeletePermissionRequest,
  PermissionSyncRequest,
  PermissionFilterRequest,

  // Response Types
  PermissionCheckResponse,
  BulkPermissionCheckResponse,
  UserPermissionsResponse,
  PermissionListResponse,
  PermissionSyncResponse,
  PermissionStatisticsResponse,

  // Error Type
  PermissionError,

  // Tree Node Type
  PermissionTreeNode,
} from './permission.schema';

// ============================================================
// Role Schemas & Types
// ============================================================
export {
  // Primitive Schemas
  RoleNameSchema,
  RoleIdSchema as RoleIdSchemaAlias,
  RoleCategorySchema,
  RoleColorSchema,

  // Domain Schemas
  RoleMetadataSchema,
  RoleSchema,
  RoleInheritanceSchema,

  // Request Schemas
  CreateRoleSchema,
  UpdateRoleSchema,
  DeleteRoleSchema,
  AssignRoleSchema,
  RemoveRoleSchema,
  BulkAssignRoleSchema,
  BulkRemoveRoleSchema,
  RoleFilterSchema,

  // Response Schemas
  RoleResponseSchema,
  RoleListResponseSchema,
  UserRolesResponseSchema,
  AssignRoleResponseSchema,
  BulkAssignRoleResponseSchema,
  RoleHierarchyCheckResponseSchema,
  RoleStatisticsResponseSchema,

  // Error Schema
  RoleErrorSchema,
} from './role.schema';

export type {
  // Primitive Types
  RoleName,
  RoleId,
  RoleCategory,
  RoleColor,

  // Domain Types
  RoleMetadata,
  Role,
  RoleInheritance,

  // Request Types
  CreateRoleRequest,
  UpdateRoleRequest,
  DeleteRoleRequest,
  AssignRoleRequest,
  RemoveRoleRequest,
  BulkAssignRoleRequest,
  BulkRemoveRoleRequest,
  RoleFilterRequest,

  // Response Types
  RoleResponse,
  RoleListResponse,
  UserRolesResponse,
  AssignRoleResponse,
  BulkAssignRoleResponse,
  RoleHierarchyCheckResponse,
  RoleStatisticsResponse,

  // Error Type
  RoleError,
} from './role.schema';

// ============================================================
// Cross-Domain Types (Role & Permission Combined)
// ============================================================
export type {
  // Re-export commonly combined types
  PermissionString as RolePermissionString,
  PermissionId as RolePermissionId,
  RoleId as RoleDefinitionId,
} from './permission.schema';
