/**
 * Permission Endpoints - Permission management API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/rbac/permission.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO permission computation logic
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

const PERMISSIONS_BASE = '/api/v1/permissions';

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

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
  category?: string;
  isSystem: boolean;
  isDeprecated?: boolean;
  deprecatedAt?: string;
  deprecatedReason?: string;
}

export interface PermissionGroup {
  id: string;
  name: string;
  nameBn?: string;                         // বাংলাদেশ স্পেসিফিক
  description: string;
  descriptionBn?: string;                  // বাংলাদেশ স্পেসিফিক
  category: string;
  permissions: string[];
  order: number;
}

export interface CheckPermissionRequest {
  userId: string;
  permission: string;
  context?: {
    resourceId?: string;
    shopId?: string;
    vendorId?: string;
    orderId?: string;
    productId?: string;
    ownerId?: string;
    amount?: number;
    districtId?: string;                   // বাংলাদেশ স্পেসিফিক
    upazilaId?: string;                    // বাংলাদেশ স্পেসিফিক
  };
}

export interface BulkCheckPermissionRequest {
  userId: string;
  permissions: string[];
  context?: Record<string, unknown>;
  requireAll?: boolean;
}

export interface PermissionCheckResponse {
  granted: boolean;
  permission: string;
  reason?: string;
  evaluatedAt: string;
  cacheHit: boolean;
  evaluationTimeMs: number;
}

export interface BulkPermissionCheckResponse {
  userId: string;
  allGranted: boolean;
  results: {
    permission: string;
    granted: boolean;
    reason?: string;
  }[];
  grantedCount: number;
  deniedCount: number;
  evaluatedAt: string;
}

export interface UserPermissionsResponse {
  userId: string;
  email: string;
  permissions: string[];
  roles: {
    id: string;
    name: string;
    nameBn?: string;                       // বাংলাদেশ স্পেসিফিক
    hierarchy: number;
  }[];
  lastUpdated: string;
  cacheTtlSeconds: number;
}

export interface GrantPermissionRequest {
  roleId: string;
  permissions: string[];
  reason?: string;
  grantedBy?: string;
}

export interface RevokePermissionRequest {
  roleId: string;
  permissions: string[];
  reason?: string;
  revokedBy?: string;
}

export interface PermissionSyncRequest {
  roleId: string;
  permissions: string[];
  operation: 'set' | 'add' | 'remove';
  reason?: string;
  modifiedBy?: string;
}

export interface PermissionSyncResponse {
  success: boolean;
  roleId: string;
  added: string[];
  removed: string[];
  unchanged: string[];
  syncedAt: string;
}

export interface PermissionTreeNode {
  resource: string;
  resourceLabel: string;
  resourceLabelBn?: string;                // বাংলাদেশ স্পেসিফিক
  category: string;
  actions: {
    action: string;
    actionLabel: string;
    actionLabelBn?: string;                // বাংলাদেশ স্পেসিফিক
    permission: string;
    isGranted?: boolean;
  }[];
  children?: PermissionTreeNode[];
}

// Pagination params (standardized)
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Permission filter options
export interface PermissionFilterOptions {
  resource?: string;
  action?: string;
  category?: string;
  isSystem?: boolean;
  isDeprecated?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'resource' | 'action' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// ==================== Endpoint Functions ====================

export const createPermissionEndpoints = (client: AxiosInstance) => {
  // Helper function to get full API path (using constants)
  const api = (path: string) => path;

  return {
    /**
     * Get all permissions (paginated)
     * Idempotent GET - safe to retry
     */
    getPermissions: async (filters?: PermissionFilterOptions): Promise<PaginatedApiResponse<Permission>> => {
      const params: Record<string, string | number | undefined> = {};
      if (filters?.resource) params.resource = filters.resource;
      if (filters?.action) params.action = filters.action;
      if (filters?.category) params.category = filters.category;
      if (filters?.isSystem !== undefined) params.isSystem = filters.isSystem;
      if (filters?.isDeprecated !== undefined) params.isDeprecated = filters.isDeprecated;
      if (filters?.search) params.search = filters.search;
      if (filters?.page) params.page = filters.page;
      if (filters?.limit) params.limit = filters.limit;
      if (filters?.sortBy) params.sortBy = filters.sortBy;
      if (filters?.sortOrder) params.sortOrder = filters.sortOrder;

      const url = buildUrlWithParams(PERMISSIONS_BASE, params);
      return withIdempotentGet(client, url);
    },

    /**
     * Get permission by ID
     * Idempotent GET - safe to retry
     */
    getPermissionById: async (permissionId: string): Promise<Permission> => {
      return withIdempotentGet(client, `${PERMISSIONS_BASE}/${permissionId}`);
    },

    /**
     * Get permissions by resource
     * Idempotent GET - safe to retry
     */
    getPermissionsByResource: async (resource: string): Promise<Permission[]> => {
      return withIdempotentGet(client, `${PERMISSIONS_BASE}/resource/${resource}`);
    },

    /**
     * Get permissions by action
     * Idempotent GET - safe to retry
     */
    getPermissionsByAction: async (action: string): Promise<Permission[]> => {
      return withIdempotentGet(client, `${PERMISSIONS_BASE}/action/${action}`);
    },

    /**
     * Get permission groups
     * Idempotent GET - safe to retry
     */
    getPermissionGroups: async (): Promise<PermissionGroup[]> => {
      return withIdempotentGet(client, `${PERMISSIONS_BASE}/groups`);
    },

    /**
     * Get permission tree (for UI)
     * Idempotent GET - safe to retry
     */
    getPermissionTree: async (roleId?: string): Promise<PermissionTreeNode[]> => {
      const url = roleId ? `${PERMISSIONS_BASE}/tree?roleId=${roleId}` : `${PERMISSIONS_BASE}/tree`;
      return withIdempotentGet(client, url);
    },

    /**
     * Check single permission (idempotent POST - no state change)
     * Can retry on network errors
     */
    checkPermission: async (data: CheckPermissionRequest): Promise<PermissionCheckResponse> => {
      const response = await client.post<ApiResponse<PermissionCheckResponse>>(
        api(API_ROUTES.PERMISSION_CHECK),
        data
      );
      return response.data.data;
    },

    /**
     * Check multiple permissions at once (idempotent POST - no state change)
     * Can retry on network errors
     */
    checkPermissions: async (data: BulkCheckPermissionRequest): Promise<BulkPermissionCheckResponse> => {
      const response = await client.post<ApiResponse<BulkPermissionCheckResponse>>(
        `${PERMISSIONS_BASE}/check-bulk`,
        data
      );
      return response.data.data;
    },

    /**
     * Get current user permissions
     * Idempotent GET - safe to retry
     */
    getMyPermissions: async (): Promise<UserPermissionsResponse> => {
      return withIdempotentGet(client, `${PERMISSIONS_BASE}/me`);
    },

    /**
     * Get permissions for a specific user (admin only)
     * Idempotent GET - safe to retry
     */
    getUserPermissions: async (userId: string): Promise<UserPermissionsResponse> => {
      return withIdempotentGet(client, `${PERMISSIONS_BASE}/user/${userId}`);
    },

    /**
     * Grant permissions to role (admin only)
     * Non-idempotent POST - no retry (admin action, modifies state)
     */
    grantPermissions: async (data: GrantPermissionRequest): Promise<{ success: boolean; granted: string[] }> => {
      const response = await client.post<ApiResponse<{ success: boolean; granted: string[] }>>(
        `${PERMISSIONS_BASE}/grant`,
        data
      );
      return response.data.data;
    },

    /**
     * Revoke permissions from role (admin only)
     * Non-idempotent POST - no retry (admin action, modifies state)
     */
    revokePermissions: async (data: RevokePermissionRequest): Promise<{ success: boolean; revoked: string[] }> => {
      const response = await client.post<ApiResponse<{ success: boolean; revoked: string[] }>>(
        `${PERMISSIONS_BASE}/revoke`,
        data
      );
      return response.data.data;
    },

    /**
     * Sync permissions for a role (set/add/remove) - admin only
     * Non-idempotent POST - no retry (admin action, modifies state)
     */
    syncPermissions: async (data: PermissionSyncRequest): Promise<PermissionSyncResponse> => {
      const response = await client.post<ApiResponse<PermissionSyncResponse>>(
        `${PERMISSIONS_BASE}/sync`,
        data
      );
      return response.data.data;
    },

    /**
     * Get role permissions
     * Idempotent GET - safe to retry
     */
    getRolePermissions: async (roleId: string): Promise<string[]> => {
      return withIdempotentGet(client, `${PERMISSIONS_BASE}/role/${roleId}`);
    },
  };
};

export type PermissionEndpoints = ReturnType<typeof createPermissionEndpoints>;
