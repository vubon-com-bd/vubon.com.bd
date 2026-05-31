/**
 * useUser Hook - Current user query with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch for consistent error handling and auth
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support (preferredLanguage, district, upazila)
 * - Proper retry logic and error handling
 * - Cache invalidation strategies
 * - Type-safe query keys with proper invalidation
 * - Added user statistics and user list hooks with pagination
 *
 * @module shared-hooks/src/user/useUser
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createUserEndpoints } from '@vubon/shared-api/endpoints/user';
import type { ApiResponse } from '@vubon/shared-types';

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
  verificationStatus:
    | 'unverified'
    | 'email_verified'
    | 'phone_verified'
    | 'fully_verified'
    | 'kyc_verified';
  emailVerified: boolean;
  phoneVerified: boolean;
  kycVerified: boolean;
  createdAt: string;
  updatedAt: string;
  preferredLanguage: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
}

export interface UserListFilters {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  district?: string; // বাংলাদেশ স্পেসিফিক
}

export interface UsersListResponse {
  users: UserProfile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  usersByRole: Record<string, number>;
  usersByTier: Record<string, number>;
  usersByDistrict?: Record<string, number>; // বাংলাদেশ স্পেসিফিক
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
}

export interface UserActivitySummary {
  totalLogins: number;
  lastLoginAt: string | null;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  accountAgeDays: number;
  isActive: boolean;
  preferredPaymentMethod?: 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';
  preferredDistrict?: string;
}

export interface UseUserOptions {
  enabled?: boolean;
  staleTime?: number; // milliseconds
  gcTime?: number; // milliseconds
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: UserProfile) => void;
  onError?: (error: Error) => void;
}

export interface UseUserReturn {
  data: UserProfile | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  refetch: () => Promise<void>;
}

// ==================== Query Keys ====================

const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const USER_QUERY_KEY = ['user'] as const;
const USER_PROFILE_QUERY_KEY = ['userProfile'] as const;
const USERS_LIST_QUERY_KEY = ['users'] as const;
const USER_STATISTICS_QUERY_KEY = ['userStatistics'] as const;
const USER_ACTIVITY_QUERY_KEY = ['userActivity'] as const;

// Helper to get endpoints with authenticated client
const getUserEndpoints = () => {
  return createUserEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to format error response
const formatError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  return new Error('An unknown error occurred');
};

// Helper to check if error is non-retryable
const isNonRetryableError = (error: Error): boolean => {
  const nonRetryableMessages = ['401', '403', 'Not authenticated'];
  return nonRetryableMessages.some(msg => error.message.includes(msg));
};

// Helper to invalidate user-related queries
const invalidateUserQueries = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
};

// ==================== Hooks ====================

/**
 * Hook for fetching current user profile using shared-api
 *
 * @example
 * const { data: user, isLoading, refetch } = useUser({
 *   staleTime: 5 * 60 * 1000, // 5 minutes
 *   onSuccess: (data) => {
 *     console.log('User loaded:', data.displayName);
 *   }
 * });
 *
 * if (isLoading) return <LoadingSpinner />;
 * if (user) {
 *   return <div>Welcome, {user.displayName}!</div>;
 * }
 */
export const useUser = (options?: UseUserOptions): UseUserReturn => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();

  const query = useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: async (): Promise<UserProfile> => {
      const response = await endpoints.getProfile();
      const user = extractData<UserProfile>(response);

      // Update related caches for consistency
      queryClient.setQueryData(USER_PROFILE_QUERY_KEY, user);
      queryClient.setQueryData([...USER_QUERY_KEY, user.id], user);

      return user;
    },
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes default
    gcTime: options?.gcTime ?? 10 * 60 * 1000, // 10 minutes default
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Trigger callbacks
  if (query.isSuccess && query.data && options?.onSuccess) {
    options.onSuccess(query.data);
  }
  if (query.isError && query.error && options?.onError) {
    options.onError(formatError(query.error));
  }

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? formatError(query.error) : null,
    isFetching: query.isFetching,
    refetch: async () => {
      await query.refetch();
    },
  };
};

/**
 * Hook for fetching user by ID using shared-api (admin only)
 *
 * @example
 * const { data: user } = useUserById('user-id-123', {
 *   onSuccess: (data) => {
 *     console.log('User loaded:', data.displayName);
 *   }
 * });
 */
export const useUserById = (userId: string, options?: UseUserOptions) => {
  const endpoints = getUserEndpoints();

  return useQuery({
    queryKey: [...USER_QUERY_KEY, userId],
    queryFn: async (): Promise<UserProfile> => {
      const response = await endpoints.getUserById(userId);
      return extractData<UserProfile>(response);
    },
    enabled: !!userId && (options?.enabled ?? true),
    staleTime: options?.staleTime ?? 60 * 1000, // 1 minute for user by ID
    retry: (failureCount, error) => {
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for fetching paginated user list using shared-api (admin only)
 *
 * @example
 * const { data: usersResponse, isLoading } = useUsers({
 *   page: 1,
 *   limit: 20,
 *   role: 'customer',
 *   district: 'Dhaka' // Bangladesh specific filter
 * });
 */
export const useUsers = (params?: UserListFilters) => {
  const endpoints = getUserEndpoints();

  return useQuery({
    queryKey: [...USERS_LIST_QUERY_KEY, params],
    queryFn: async (): Promise<UsersListResponse> => {
      const response = await endpoints.getUsers({
        page: params?.page,
        limit: params?.limit,
        role: params?.role,
        status: params?.status,
        search: params?.search,
        district: params?.district,
        fromDate: params?.fromDate,
        toDate: params?.toDate,
      });
      return extractData<UsersListResponse>(response);
    },
    enabled: params?.enabled ?? true,
    staleTime: 60 * 1000, // 1 minute
    retry: (failureCount, error) => {
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for fetching user statistics using shared-api (admin only)
 *
 * @example
 * const { data: stats, isLoading } = useUserStatistics({
 *   onSuccess: (data) => {
 *     console.log(`Total users: ${data.totalUsers}`);
 *   }
 * });
 */
export const useUserStatistics = (options?: Pick<UseUserOptions, 'enabled' | 'onSuccess' | 'onError'>) => {
  const endpoints = getUserEndpoints();

  const query = useQuery({
    queryKey: USER_STATISTICS_QUERY_KEY,
    queryFn: async (): Promise<UserStatistics> => {
      const response = await endpoints.getUserStatistics();
      return extractData<UserStatistics>(response);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  if (query.isSuccess && query.data && options?.onSuccess) {
    options.onSuccess(query.data);
  }
  if (query.isError && query.error && options?.onError) {
    options.onError(formatError(query.error));
  }

  return query;
};

/**
 * Hook for fetching user activity summary using shared-api
 *
 * @example
 * const { data: activity, isLoading } = useUserActivity({
 *   onSuccess: (data) => {
 *     console.log(`Total orders: ${data.totalOrders}`);
 *   }
 * });
 */
export const useUserActivity = (options?: Pick<UseUserOptions, 'enabled' | 'onSuccess' | 'onError'>) => {
  const endpoints = getUserEndpoints();

  const query = useQuery({
    queryKey: USER_ACTIVITY_QUERY_KEY,
    queryFn: async (): Promise<UserActivitySummary> => {
      const response = await endpoints.getActivitySummary();
      return extractData<UserActivitySummary>(response);
    },
    staleTime: 60 * 1000, // 1 minute
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  if (query.isSuccess && query.data && options?.onSuccess) {
    options.onSuccess(query.data);
  }
  if (query.isError && query.error && options?.onError) {
    options.onError(formatError(query.error));
  }

  return query;
};

/**
 * Hook for manually refreshing user data
 *
 * @example
 * const { refreshUser, isRefreshing } = useRefreshUser();
 *
 * // After profile update
 * await refreshUser();
 */
export const useRefreshUser = () => {
  const queryClient = useQueryClient();

  const refreshUser = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    await queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
  };

  const isRefreshing = queryClient.isFetching({ queryKey: CURRENT_USER_QUERY_KEY }) > 0;

  return { refreshUser, isRefreshing };
};

/**
 * Hook for clearing user cache (useful for logout)
 *
 * @example
 * const { clearUserCache } = useClearUserCache();
 *
 * // On logout
 * clearUserCache();
 */
export const useClearUserCache = () => {
  const queryClient = useQueryClient();

  const clearUserCache = (): void => {
    queryClient.removeQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    queryClient.removeQueries({ queryKey: USER_PROFILE_QUERY_KEY });
    queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
    queryClient.removeQueries({ queryKey: USERS_LIST_QUERY_KEY });
  };

  return { clearUserCache };
};

// ==================== Type Exports ====================

export type {
  UseUserOptions,
  UseUserReturn,
  UserListFilters,
  UsersListResponse,
  UserStatistics,
  UserActivitySummary,
};
