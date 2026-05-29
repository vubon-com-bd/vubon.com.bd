/**
 * Role Endpoints - Role management API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/user/role.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO RBAC evaluation engine
 * ✅ Thin endpoints - only URL + request function + typed response
 * ✅ Named exports only
 * ✅ No side effects beyond HTTP requests
 */

import type { AxiosInstance } from 'axios';
import type { ApiResponse, PaginatedApiResponse } from '@vubon/auth-types';

// Import API routes from constants and retry utilities
import { API_ROUTES } from '@vubon/auth-constants';
import { withRetry, DEFAULT_RETRY_CONFIG } from '../../client/retry.client';

// ==================== Constants ====================

const ROLES_BASE = '/api/v1/roles';

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

// Helper function for building URL with query params
const buildUrlWithParams = (baseUrl: string, params?: Record<string, string | number | undefined>): string => {
  if (!params) return baseUrl;

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );

  if (Object.keys(filteredParams).length === 0) return baseUrl;

  const searchParams = new URLSearchParams();
  Object.entries(filteredParams).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return `${baseUrl}?${searchParams.toString()}`;
};

// Helper function for idempotent GET requests with params
const withIdempotentGet = async <T>(
  client: AxiosInstance,
  url: string,
  params?: Record<string, string | number | undefined>
): Promise<T> => {
  const finalUrl = buildUrlWithParams(url, params);
  return withIdempotentRetry(async () => {
    const response = await client.get<ApiResponse<T>>(finalUrl);
    return response.data.data;
  });
};

// ==================== Types ====================

export interface Role {
  id: string;
  name: string;
  nameBn?: string;
  description?: string;
  descriptionBn?: string;
  category: 'system' | 'management' | 'operations' | 'vendor' | 'delivery' | 'customer' | 'bangladesh';
  permissions: string[];
  isSystemRole: boolean;
  canBeDeleted: boolean;
  canBeModified: boolean;
  requiresMfa: boolean;
  requiresKyc: boolean;
  color: string;
  icon?: string;
  hierarchy: number;
  parentRole?: string | null;
  childRoles?: string[];
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleRequest {
  name: string;
  nameBn?: string;
  description?: string;
  descriptionBn?: string;
  category?: 'system' | 'management' | 'operations' | 'vendor' | 'delivery' | 'customer' | 'bangladesh';
  permissions: string[];
  parentRole?: string;
  color?: string;
  icon?: string;
  requiresMfa?: boolean;
  requiresKyc?: boolean;
  maxAssignees?: number;
}

export interface UpdateRoleRequest {
  name?: string;
  nameBn?: string;
  description?: string;
  descriptionBn?: string;
  category?: 'system' | 'management' | 'operations' | 'vendor' | 'delivery' | 'customer' | 'bangladesh';
  permissions?: string[];
  color?: string;
  icon?: string;
  requiresMfa?: boolean;
  requiresKyc?: boolean;
  maxAssignees?: number;
}

export interface AssignRoleRequest {
  userId: string;
  role: string;
  expiresAt?: string;
  reason?: string;
  assignedBy: string;
  notifyUser?: boolean;
}

export interface AssignRoleResponse {
  success: boolean;
  userId: string;
  role: string;
  assignedAt: string;
  expiresAt: string | null;
  message?: string;
}

export interface BulkAssignRoleRequest {
  userIds: string[];
  role: string;
  expiresAt?: string;
  reason?: string;
  assignedBy: string;
  notifyUsers?: boolean;
}

export interface BulkAssignRoleResponse {
  totalRequested: number;
  successful: number;
  failed: number;
  failedUsers: Array<{
    userId: string;
    reason: string;
  }>;
  assignedAt: string;
}

export interface UserRolesResponse {
  userId: string;
  email: string;
  roles: Array<{
    role: string;
    name: string;
    assignedAt: string;
    expiresAt: string | null;
    isActive: boolean;
  }>;
  primaryRole: string;
  effectivePermissions: string[];
  lastUpdated: string;
}

export interface RoleAssignmentHistory {
  userId: string;
  assignments: Array<{
    id: string;
    role: string;
    assignedAt: string;
    assignedBy: string;
    expiresAt: string | null;
    revokedAt: string | null;
    revokedBy: string | null;
    status: 'active' | 'expired' | 'revoked';
  }>;
  totalAssignments: number;
  activeAssignments: number;
  expiredAssignments: number;
  revokedAssignments: number;
}

export interface RoleStatistics {
  totalRoles: number;
  totalAssignments: number;
  uniqueUsersWithRoles: number;
  rolesByCategory: Record<string, number>;
  assignmentsByRole: Record<string, number>;
  mostAssignedRoles: Array<{ role: string; count: number }>;
  systemRolesCount: number;
  customRolesCount: number;
}

export interface DeleteRoleRequest {
  roleId: string;
  force?: boolean;
  reassignTo?: string;
  reason?: string;
}

// Pagination params (standardized)
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Role filter options
export interface RoleFilterOptions {
  category?: string;
  isSystemRole?: boolean;
  requiresMfa?: boolean;
  requiresKyc?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'hierarchy' | 'userCount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// ==================== Endpoint Functions ====================

export const createRoleEndpoints = (client: AxiosInstance) => {
  // Helper function to get full API path (using constants)
  const api = (path: string) => path;

  return {
    /**
     * Get all roles (paginated)
     * Idempotent GET - safe to retry
     */
    getRoles: async (filters?: RoleFilterOptions): Promise<PaginatedApiResponse<Role>> => {
      const params: Record<string, string | number | undefined> = {};
      if (filters?.category) params.category = filters.category;
      if (filters?.isSystemRole !== undefined) params.isSystemRole = filters.isSystemRole;
      if (filters?.requiresMfa !== undefined) params.requiresMfa = filters.requiresMfa;
      if (filters?.requiresKyc !== undefined) params.requiresKyc = filters.requiresKyc;
      if (filters?.search) params.search = filters.search;
      if (filters?.page) params.page = filters.page;
      if (filters?.limit) params.limit = filters.limit;
      if (filters?.sortBy) params.sortBy = filters.sortBy;
      if (filters?.sortOrder) params.sortOrder = filters.sortOrder;

      const url = buildUrlWithParams(ROLES_BASE, params);
      return withIdempotentGet(client, url);
    },

    /**
     * Get role by ID or name
     * Idempotent GET - safe to retry
     */
    getRoleById: async (roleId: string): Promise<Role> => {
      return withIdempotentGet(client, `${ROLES_BASE}/${roleId}`);
    },

    /**
     * Get role hierarchy tree
     * Idempotent GET - safe to retry
     */
    getRoleHierarchy: async (): Promise<Role[]> => {
      return withIdempotentGet(client, `${ROLES_BASE}/hierarchy`);
    },

    /**
     * Create new role (admin only)
     * Non-idempotent POST - no retry (admin action)
     */
    createRole: async (data: CreateRoleRequest): Promise<Role> => {
      const response = await client.post<ApiResponse<Role>>(api(API_ROUTES.ROLE_CREATE), data);
      return response.data.data;
    },

    /**
     * Update role (admin only)
     * Non-idempotent PATCH - no retry (admin action)
     */
    updateRole: async (roleId: string, data: UpdateRoleRequest): Promise<Role> => {
      const response = await client.patch<ApiResponse<Role>>(`${ROLES_BASE}/${roleId}`, data);
      return response.data.data;
    },

    /**
     * Delete role (admin only)
     * Non-idempotent DELETE - no retry (admin action)
     */
    deleteRole: async (data: DeleteRoleRequest): Promise<{ success: boolean; message: string }> => {
      const response = await client.delete<ApiResponse<{ success: boolean; message: string }>>(`${ROLES_BASE}/${data.roleId}`, {
        data: {
          force: data.force,
          reassignTo: data.reassignTo,
          reason: data.reason,
        },
      });
      return response.data.data;
    },

    /**
     * Assign role to user
     * Non-idempotent POST - no retry (admin action)
     */
    assignRole: async (data: AssignRoleRequest): Promise<AssignRoleResponse> => {
      const response = await client.post<ApiResponse<AssignRoleResponse>>(api(API_ROUTES.ROLE_ASSIGN), data);
      return response.data.data;
    },

    /**
     * Bulk assign role to multiple users
     * Non-idempotent POST - no retry (admin action)
     */
    bulkAssignRole: async (data: BulkAssignRoleRequest): Promise<BulkAssignRoleResponse> => {
      const response = await client.post<ApiResponse<BulkAssignRoleResponse>>(api(API_ROUTES.ROLE_BULK_ASSIGN), data);
      return response.data.data;
    },

    /**
     * Remove role from user
     * Non-idempotent DELETE - no retry (admin action)
     */
    removeRole: async (userId: string, role: string, reason?: string): Promise<{ success: boolean }> => {
      const response = await client.delete<ApiResponse<{ success: boolean }>>(`/api/v1/roles/user/${userId}/role/${role}`, {
        data: { reason },
      });
      return response.data.data;
    },

    /**
     * Get user roles
     * Idempotent GET - safe to retry
     */
    getUserRoles: async (userId: string): Promise<UserRolesResponse> => {
      return withIdempotentGet(client, `/api/v1/roles/user/${userId}`);
    },

    /**
     * Get current user roles
     * Idempotent GET - safe to retry
     */
    getMyRoles: async (): Promise<UserRolesResponse> => {
      return withIdempotentGet(client, '/api/v1/roles/me');
    },

    /**
     * Get role assignment history for user
     * Idempotent GET - safe to retry
     */
    getRoleAssignmentHistory: async (userId: string): Promise<RoleAssignmentHistory> => {
      return withIdempotentGet(client, `/api/v1/roles/user/${userId}/history`);
    },

    /**
     * Get role statistics (admin only)
     * Idempotent GET - safe to retry
     */
    getRoleStatistics: async (): Promise<RoleStatistics> => {
      return withIdempotentGet(client, '/api/v1/roles/statistics');
    },

    /**
     * Get available roles for assignment (excludes system roles for regular users)
     * Idempotent GET - safe to retry
     */
    getAvailableRoles: async (): Promise<Role[]> => {
      return withIdempotentGet(client, '/api/v1/roles/available');
    },
  };
};

export type RoleEndpoints = ReturnType<typeof createRoleEndpoints>;
