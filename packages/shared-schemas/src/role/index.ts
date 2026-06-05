/**
 * Role & Permission Schemas - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/role/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure Zod schema exports only
 */

// Export role schemas with Role prefix
export * from './role.schema';

// Export permission schemas with Permission prefix to avoid conflicts
export {
  PermissionResourceSchema,
  PermissionActionSchema,
  PermissionStringSchema,
  PermissionIdSchema,
  PermissionSchema,
  PermissionGroupSchema,
  RolePermissionAssignmentSchema,
  CheckPermissionSchema,
  BulkCheckPermissionSchema,
  GrantPermissionSchema,
  RevokePermissionSchema,
  CreatePermissionSchema,
  UpdatePermissionSchema,
  DeletePermissionSchema,
  PermissionSyncSchema,
  PermissionFilterSchema,
  PermissionCheckResponseSchema,
  BulkPermissionCheckResponseSchema,
  UserPermissionsResponseSchema,
  PermissionListResponseSchema,
  PermissionSyncResponseSchema,
  PermissionStatisticsResponseSchema,
  PermissionErrorSchema,
  createPermissionString,
  parsePermissionString,
  type PermissionResource,
  type PermissionAction,
  type PermissionString,
  type PermissionId,
  type Permission,
  type PermissionGroup,
  type RolePermissionAssignment,
  type CheckPermissionRequest,
  type BulkCheckPermissionRequest,
  type GrantPermissionRequest,
  type RevokePermissionRequest,
  type CreatePermissionRequest,
  type UpdatePermissionRequest,
  type DeletePermissionRequest,
  type PermissionSyncRequest,
  type PermissionFilterRequest,
  type PermissionCheckResponse,
  type BulkPermissionCheckResponse,
  type UserPermissionsResponse,
  type PermissionListResponse,
  type PermissionSyncResponse,
  type PermissionTreeNode,
  type PermissionStatisticsResponse,
  type PermissionError,
} from './permission.schema';
