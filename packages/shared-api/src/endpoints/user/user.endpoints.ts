/**
 * User Endpoints - User management API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/user/user.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO permission rules, role checks
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

const USER_BASE = '/api/v1/users';

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

export interface UserProfile {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | null;
  role: string;
  userTier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  verificationStatus: 'unverified' | 'email_verified' | 'phone_verified' | 'fully_verified' | 'kyc_verified';
  emailVerified: boolean;
  phoneVerified: boolean;
  kycVerified: boolean;
  createdAt: string;
  updatedAt: string;
  preferredLanguage: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string | null;
  phoneNumber?: string;
  preferredLanguage?: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
}

export interface UserPreferences {
  language: 'en' | 'bn';
  timezone: string;
  currency: 'BDT' | 'USD';
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  orderUpdates: boolean;
  priceDropAlerts: boolean;
  backInStockAlerts: boolean;
  newsletterSubscription: boolean;
  twoFactorEnabled: boolean;
  preferredTwoFactorMethod: 'sms' | 'email' | 'totp' | 'whatsapp' | null;
  preferredDeliveryTime: 'morning' | 'afternoon' | 'evening' | 'any';
  saveAddressHistory: boolean;
  autoApplyCoupons: boolean;
}

export interface UpdatePreferencesRequest {
  language?: 'en' | 'bn';
  timezone?: string;
  currency?: 'BDT' | 'USD';
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  marketingEmails?: boolean;
  orderUpdates?: boolean;
  priceDropAlerts?: boolean;
  backInStockAlerts?: boolean;
  newsletterSubscription?: boolean;
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'any';
  saveAddressHistory?: boolean;
  autoApplyCoupons?: boolean;
}

export interface UserAddress {
  id: string;
  type: 'home' | 'office' | 'other';
  isDefault: boolean;
  recipientName: string;
  recipientPhone: string;
  addressLine1: string;
  addressLine2?: string;
  district: string;
  upazila: string;
  postCode: string;
  landmark?: string;
  instructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressRequest {
  type?: 'home' | 'office' | 'other';
  isDefault?: boolean;
  recipientName: string;
  recipientPhone: string;
  addressLine1: string;
  addressLine2?: string;
  district: string;
  upazila: string;
  postCode: string;
  landmark?: string;
  instructions?: string;
}

export interface UpdateAddressRequest {
  type?: 'home' | 'office' | 'other';
  isDefault?: boolean;
  recipientName?: string;
  recipientPhone?: string;
  addressLine1?: string;
  addressLine2?: string;
  district?: string;
  upazila?: string;
  postCode?: string;
  landmark?: string;
  instructions?: string;
}

export interface DeleteAccountRequest {
  password: string;
  reason?: string;
  confirmationText?: string;
}

export interface UserActivitySummary {
  userId: string;
  totalLogins: number;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  accountAgeDays: number;
  isActive: boolean;
  preferredPaymentMethod?: 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';
  preferredDistrict?: string;
}

export interface UserListFilters {
  status?: 'active' | 'inactive' | 'suspended' | 'banned';
  role?: string;
  userTier?: string;
  verificationStatus?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  district?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'lastLoginAt' | 'firstName' | 'lastName';
  sortOrder?: 'asc' | 'desc';
}

// Pagination params (standardized)
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ==================== Endpoint Functions ====================

export const createUserEndpoints = (client: AxiosInstance) => {
  // Helper function to get full API path (using constants)
  const api = (path: string) => path;

  return {
    /**
     * Get current user profile
     * Idempotent GET - safe to retry
     */
    getProfile: async (): Promise<UserProfile> => {
      return withIdempotentGet(client, `${USER_BASE}/profile`);
    },

    /**
     * Update user profile
     * Non-idempotent PATCH - no retry (user action)
     */
    updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
      const response = await client.patch<ApiResponse<UserProfile>>(`${USER_BASE}/profile`, data);
      return response.data.data;
    },

    /**
     * Get user by ID (admin only)
     * Idempotent GET - safe to retry
     */
    getUserById: async (userId: string): Promise<UserProfile> => {
      return withIdempotentGet(client, `${USER_BASE}/${userId}`);
    },

    /**
     * Get users list with pagination (admin only)
     * Idempotent GET - safe to retry
     */
    getUsers: async (filters?: UserListFilters): Promise<PaginatedApiResponse<UserProfile>> => {
      const params: Record<string, string | number | undefined> = {};
      if (filters?.status) params.status = filters.status;
      if (filters?.role) params.role = filters.role;
      if (filters?.userTier) params.userTier = filters.userTier;
      if (filters?.verificationStatus) params.verificationStatus = filters.verificationStatus;
      if (filters?.search) params.search = filters.search;
      if (filters?.fromDate) params.fromDate = filters.fromDate;
      if (filters?.toDate) params.toDate = filters.toDate;
      if (filters?.district) params.district = filters.district;
      if (filters?.page) params.page = filters.page;
      if (filters?.limit) params.limit = filters.limit;
      if (filters?.sortBy) params.sortBy = filters.sortBy;
      if (filters?.sortOrder) params.sortOrder = filters.sortOrder;

      const url = buildUrlWithParams(USER_BASE, params);

      return withIdempotentRetry(async () => {
        const response = await client.get<PaginatedApiResponse<UserProfile>>(url);
        return response.data;
      });
    },

    /**
     * Get user preferences
     * Idempotent GET - safe to retry
     */
    getPreferences: async (): Promise<UserPreferences> => {
      return withIdempotentGet(client, `${USER_BASE}/preferences`);
    },

    /**
     * Update user preferences
     * Non-idempotent PATCH - no retry (user action)
     */
    updatePreferences: async (data: UpdatePreferencesRequest): Promise<UserPreferences> => {
      const response = await client.patch<ApiResponse<UserPreferences>>(`${USER_BASE}/preferences`, data);
      return response.data.data;
    },

    /**
     * Upload avatar
     * Non-idempotent POST - no retry (user action, file upload)
     */
    uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await client.post<ApiResponse<{ avatarUrl: string }>>(`${USER_BASE}/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    },

    /**
     * Delete avatar
     * Non-idempotent DELETE - no retry (user action)
     */
    deleteAvatar: async (): Promise<{ success: boolean }> => {
      const response = await client.delete<ApiResponse<{ success: boolean }>>(`${USER_BASE}/avatar`);
      return response.data.data;
    },

    /**
     * Get user addresses
     * Idempotent GET - safe to retry
     */
    getAddresses: async (): Promise<UserAddress[]> => {
      return withIdempotentGet(client, `${USER_BASE}/addresses`);
    },

    /**
     * Create new address
     * Non-idempotent POST - no retry (user action)
     */
    createAddress: async (data: CreateAddressRequest): Promise<UserAddress> => {
      const response = await client.post<ApiResponse<UserAddress>>(`${USER_BASE}/addresses`, data);
      return response.data.data;
    },

    /**
     * Update address
     * Non-idempotent PATCH - no retry (user action)
     */
    updateAddress: async (addressId: string, data: UpdateAddressRequest): Promise<UserAddress> => {
      const response = await client.patch<ApiResponse<UserAddress>>(`${USER_BASE}/addresses/${addressId}`, data);
      return response.data.data;
    },

    /**
     * Delete address
     * Non-idempotent DELETE - no retry (user action)
     */
    deleteAddress: async (addressId: string): Promise<{ success: boolean }> => {
      const response = await client.delete<ApiResponse<{ success: boolean }>>(`${USER_BASE}/addresses/${addressId}`);
      return response.data.data;
    },

    /**
     * Set default address
     * Non-idempotent POST - no retry (user action)
     */
    setDefaultAddress: async (addressId: string): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>(`${USER_BASE}/addresses/${addressId}/default`);
      return response.data.data;
    },

    /**
     * Get user activity summary
     * Idempotent GET - safe to retry
     */
    getActivitySummary: async (): Promise<UserActivitySummary> => {
      return withIdempotentGet(client, `${USER_BASE}/activity-summary`);
    },

    /**
     * Delete user account (self-service)
     * Non-idempotent POST - no retry (user action, sensitive)
     */
    deleteAccount: async (data: DeleteAccountRequest): Promise<{ success: boolean; message: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string }>>(`${USER_BASE}/delete-account`, data);
      return response.data.data;
    },

    /**
     * Suspend user account (admin only)
     * Non-idempotent POST - no retry (admin action)
     */
    suspendUser: async (userId: string, reason: string, durationDays?: number): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>(`${USER_BASE}/${userId}/suspend`, {
        reason,
        durationDays,
      });
      return response.data.data;
    },

    /**
     * Activate user account (admin only)
     * Non-idempotent POST - no retry (admin action)
     */
    activateUser: async (userId: string, reason?: string): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>(`${USER_BASE}/${userId}/activate`, { reason });
      return response.data.data;
    },
  };
};

export type UserEndpoints = ReturnType<typeof createUserEndpoints>;
