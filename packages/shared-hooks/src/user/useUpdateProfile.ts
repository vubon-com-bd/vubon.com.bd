/**
 * useUpdateProfile Hook - Profile update mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/user/useUpdateProfile
 * 
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO validation engine duplication (schema validation in shared-schemas)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration with optimistic updates
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createUserEndpoints } from '@vubon/shared-api/endpoints/user';
import { UpdateUserProfileSchema } from '@vubon/auth-schemas';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string | null;
  phoneNumber?: string;
  preferredLanguage?: 'en' | 'bn';
  preferredDistrict?: string;      // বাংলাদেশ স্পেসিফিক
  preferredUpazila?: string;       // বাংলাদেশ স্পেসিফিক
}

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
  verificationStatus: 'unverified' | 'email_verified' | 'phone_verified' | 'fully_verified';
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  preferredLanguage?: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
}

export interface AvatarUploadResponse {
  avatarUrl: string;
  success: boolean;
}

export type UseUpdateProfileOptions = Omit<
  UseMutationOptions<UserProfile, Error, UpdateProfileData>,
  'mutationFn'
> & {
  /** Enable optimistic updates (default: true) */
  optimistic?: boolean;
  /** Enable retry for transient errors (default: false) */
  enableRetry?: boolean;
};

export interface UseUpdateProfileReturn {
  mutate: (data: UpdateProfileData) => void;
  mutateAsync: (data: UpdateProfileData) => Promise<UserProfile>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: UserProfile | undefined;
}

// ==================== Query Keys ====================

const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const USER_QUERY_KEY = ['user'] as const;
const USER_PROFILE_QUERY_KEY = ['userProfile'] as const;

// Helper to get endpoints with authenticated client
const getUserEndpoints = () => {
  return createUserEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to check if error is non-retryable
const isNonRetryableError = (error: Error): boolean => {
  const nonRetryableMessages = ['400', '401', '403', 'validation'];
  return nonRetryableMessages.some(msg => error.message.toLowerCase().includes(msg));
};

// ==================== Hook ====================

/**
 * Hook for updating user profile using shared-api
 * 
 * @example
 * const { mutate: updateProfile, isLoading } = useUpdateProfile({
 *   onSuccess: (data) => {
 *     console.log('Profile updated:', data.displayName);
 *   },
 *   onError: (error) => {
 *     console.error('Update failed:', error.message);
 *   },
 *   optimistic: true
 * });
 * 
 * // Usage
 * updateProfile({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   displayName: 'Johnny',
 *   preferredLanguage: 'bn'
 * });
 */
export const useUpdateProfile = (options?: UseUpdateProfileOptions): UseUpdateProfileReturn => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();
  const optimistic = options?.optimistic ?? true;
  const enableRetry = options?.enableRetry ?? false;

  const mutation = useMutation({
    mutationFn: async (data: UpdateProfileData): Promise<UserProfile> => {
      // Validate input using Zod schema from shared-schemas
      const validation = UserProfileUpdateSchema.safeParse(data);
      if (!validation.success) {
        const firstError = validation.error.errors[0];
        throw new Error(firstError?.message || 'Validation failed');
      }

      const response = await endpoints.updateProfile(data);
      return extractData(response);
    },
    onMutate: async (newData) => {
      if (!optimistic) return;

      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      await queryClient.cancelQueries({ queryKey: USER_PROFILE_QUERY_KEY });

      // Get previous data
      const previousUser = queryClient.getQueryData<UserProfile>(CURRENT_USER_QUERY_KEY);

      // Optimistically update
      if (previousUser) {
        const optimisticUser: UserProfile = {
          ...previousUser,
          ...newData,
          displayName: newData.displayName || 
            `${newData.firstName || previousUser.firstName} ${newData.lastName || previousUser.lastName}`.trim() || 
            previousUser.displayName,
          updatedAt: new Date().toISOString(),
        };
        queryClient.setQueryData(CURRENT_USER_QUERY_KEY, optimisticUser);
        queryClient.setQueryData(USER_PROFILE_QUERY_KEY, optimisticUser);
      }

      return { previousUser };
    },
    onSuccess: (data) => {
      // Update cache with actual response
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, data);
      queryClient.setQueryData(USER_PROFILE_QUERY_KEY, data);
      queryClient.setQueryData(USER_QUERY_KEY, data);

      options?.onSuccess?.(data);
    },
    onError: (error, _, context) => {
      // Rollback optimistic update
      if (optimistic && context?.previousUser) {
        queryClient.setQueryData(CURRENT_USER_QUERY_KEY, context.previousUser);
        queryClient.setQueryData(USER_PROFILE_QUERY_KEY, context.previousUser);
      }

      options?.onError?.(error as Error);
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });

      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (!enableRetry) return false;
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | null,
    data: mutation.data,
  };
};

/**
 * Hook for uploading user avatar using shared-api
 * 
 * @example
 * const { mutate: uploadAvatar, isLoading } = useUploadAvatar({
 *   onSuccess: (data) => {
 *     console.log('Avatar uploaded:', data.avatarUrl);
 *   }
 * });
 * 
 * // Usage with file input
 * uploadAvatar(file);
 */
export const useUploadAvatar = (options?: Pick<UseUpdateProfileOptions, 'onSuccess' | 'onError'>) => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();

  const mutation = useMutation({
    mutationFn: async (file: File): Promise<AvatarUploadResponse> => {
      const formData = new FormData();
      formData.append('avatar', file);

      // Note: createUserEndpoints doesn't have uploadAvatar by default
      // Using direct client for file upload
      const client = getAxiosClient();
      const response = await client.post<ApiResponse<AvatarUploadResponse>>('/api/v1/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return extractData(response);
    },
    onSuccess: (data) => {
      // Update user profile with new avatar URL
      queryClient.setQueryData<UserProfile>(CURRENT_USER_QUERY_KEY, (old) => {
        if (old) {
          return { ...old, avatar: data.avatarUrl };
        }
        return old;
      });

      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });

      options?.onSuccess?.(data as never);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) return false;
      return failureCount < 1;
    },
  });

  return mutation;
};

/**
 * Hook for deleting user avatar using shared-api
 * 
 * @example
 * const { mutate: deleteAvatar } = useDeleteAvatar({
 *   onSuccess: () => {
 *     console.log('Avatar deleted');
 *   }
 * });
 * 
 * deleteAvatar();
 */
export const useDeleteAvatar = (options?: Pick<UseUpdateProfileOptions, 'onSuccess' | 'onError'>) => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();

  const mutation = useMutation({
    mutationFn: async (): Promise<{ success: boolean }> => {
      const response = await endpoints.deleteAvatar();
      return response;
    },
    onSuccess: () => {
      // Update user profile with null avatar
      queryClient.setQueryData<UserProfile>(CURRENT_USER_QUERY_KEY, (old) => {
        if (old) {
          return { ...old, avatar: null };
        }
        return old;
      });

      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });

      options?.onSuccess?.(undefined as never);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });

  return mutation;
};

// ==================== Type Exports ====================

export type { UseUpdateProfileOptions, UseUpdateProfileReturn, UpdateProfileData, UserProfile, AvatarUploadResponse };
