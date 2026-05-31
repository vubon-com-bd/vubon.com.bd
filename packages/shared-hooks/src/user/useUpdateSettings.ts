/**
 * useUpdateSettings Hook - User settings mutation with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch for consistent error handling and auth
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support (messageBn)
 * - Proper retry logic and error handling
 * - Optimistic updates with proper rollback
 * - Cache invalidation for user settings and user profile
 * - Type-safe query keys with proper invalidation strategies
 *
 * @module shared-hooks/src/user/useUpdateSettings
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO settings persistence engine (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration with proper caching
 * ✅ TypeScript strict
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createUserEndpoints } from '@vubon/shared-api/endpoints/user';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface UserSettings {
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

export interface UpdateSettingsData {
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

export interface SettingsError {
  message: string;
  messageBn?: string;
  code?: string;
  field?: string;
}

export type UseUpdateSettingsOptions = Omit<
  UseMutationOptions<UserSettings, SettingsError, UpdateSettingsData>,
  'mutationFn'
> & {
  /** Enable optimistic updates (default: true) */
  optimistic?: boolean;
  /** Whether to invalidate user profile after settings update (default: true) */
  invalidateUserProfile?: boolean;
  /** Whether to enable retry for transient errors (default: true) */
  enableRetry?: boolean;
};

export interface UseUpdateSettingsReturn {
  mutate: (data: UpdateSettingsData) => void;
  mutateAsync: (data: UpdateSettingsData) => Promise<UserSettings>;
  isLoading: boolean;
  isError: boolean;
  error: SettingsError | null;
  data: UserSettings | undefined;
}

export interface ResetSettingsResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  settings: UserSettings;
}

// ==================== Query Keys ====================

const USER_SETTINGS_QUERY_KEY = ['userSettings'] as const;
const USER_PROFILE_QUERY_KEY = ['userProfile'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;

// Helper to get endpoints with authenticated client
const getUserEndpoints = () => {
  return createUserEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to format error response
const formatError = (error: unknown): SettingsError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      messageBn: (error as any).messageBn,
      field: (error as any).field,
    };
  }
  return { message: 'An unknown error occurred' };
};

// Helper to check if error is non-retryable
const isNonRetryableError = (error: SettingsError): boolean => {
  const nonRetryableMessages = ['validation_error', 'unauthorized', 'forbidden'];
  return nonRetryableMessages.some((msg) => error.code?.toLowerCase().includes(msg));
};

// Default settings (Bangladesh specific defaults)
const DEFAULT_SETTINGS: UserSettings = {
  language: 'en',
  timezone: 'Asia/Dhaka',
  currency: 'BDT',
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  orderUpdates: true,
  priceDropAlerts: false,
  backInStockAlerts: false,
  newsletterSubscription: false,
  twoFactorEnabled: false,
  preferredTwoFactorMethod: null,
  preferredDeliveryTime: 'any',
  saveAddressHistory: true,
  autoApplyCoupons: true,
};

// ==================== Hooks ====================

/**
 * Hook for fetching user settings using shared-api
 *
 * @example
 * const { data: settings, isLoading, refetch } = useUserSettings({
 *   onSuccess: (data) => {
 *     console.log('Settings loaded:', data.language);
 *   }
 * });
 *
 * if (isLoading) return <LoadingSpinner />;
 *
 * return <SettingsForm initialValues={settings} />;
 */
export const useUserSettings = (options?: {
  enabled?: boolean;
  staleTime?: number;
  onSuccess?: (data: UserSettings) => void;
  onError?: (error: SettingsError) => void;
}) => {
  const endpoints = getUserEndpoints();

  const query = useQuery({
    queryKey: USER_SETTINGS_QUERY_KEY,
    queryFn: async (): Promise<UserSettings> => {
      const response = await endpoints.getPreferences();
      const settings = extractData<{
        language: string;
        timezone: string;
        currency: string;
        emailNotifications: boolean;
        smsNotifications: boolean;
        pushNotifications: boolean;
        marketingEmails: boolean;
        orderUpdates: boolean;
        priceDropAlerts: boolean;
        backInStockAlerts: boolean;
        newsletterSubscription: boolean;
        twoFactorEnabled: boolean;
        preferredTwoFactorMethod: string | null;
        preferredDeliveryTime: string;
        saveAddressHistory: boolean;
        autoApplyCoupons: boolean;
      }>(response);

      // Map API response to UserSettings type with proper defaults
      return {
        language: (settings.language as 'en' | 'bn') || DEFAULT_SETTINGS.language,
        timezone: settings.timezone || DEFAULT_SETTINGS.timezone,
        currency: (settings.currency as 'BDT' | 'USD') || DEFAULT_SETTINGS.currency,
        emailNotifications: settings.emailNotifications ?? DEFAULT_SETTINGS.emailNotifications,
        smsNotifications: settings.smsNotifications ?? DEFAULT_SETTINGS.smsNotifications,
        pushNotifications: settings.pushNotifications ?? DEFAULT_SETTINGS.pushNotifications,
        marketingEmails: settings.marketingEmails ?? DEFAULT_SETTINGS.marketingEmails,
        orderUpdates: settings.orderUpdates ?? DEFAULT_SETTINGS.orderUpdates,
        priceDropAlerts: settings.priceDropAlerts ?? DEFAULT_SETTINGS.priceDropAlerts,
        backInStockAlerts: settings.backInStockAlerts ?? DEFAULT_SETTINGS.backInStockAlerts,
        newsletterSubscription:
          settings.newsletterSubscription ?? DEFAULT_SETTINGS.newsletterSubscription,
        twoFactorEnabled: settings.twoFactorEnabled ?? DEFAULT_SETTINGS.twoFactorEnabled,
        preferredTwoFactorMethod:
          (settings.preferredTwoFactorMethod as UserSettings['preferredTwoFactorMethod']) ??
          DEFAULT_SETTINGS.preferredTwoFactorMethod,
        preferredDeliveryTime:
          (settings.preferredDeliveryTime as UserSettings['preferredDeliveryTime']) ??
          DEFAULT_SETTINGS.preferredDeliveryTime,
        saveAddressHistory: settings.saveAddressHistory ?? DEFAULT_SETTINGS.saveAddressHistory,
        autoApplyCoupons: settings.autoApplyCoupons ?? DEFAULT_SETTINGS.autoApplyCoupons,
      };
    },
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
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
    settings: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? formatError(query.error) : null,
    isFetching: query.isFetching,
    refetch: () => query.refetch(),
  };
};

/**
 * Hook for updating user settings using shared-api with optimistic updates
 *
 * @example
 * const { mutate: updateSettings, isLoading } = useUpdateSettings({
 *   onSuccess: (data) => {
 *     console.log('Settings updated:', data.language);
 *   },
 *   onError: (error) => {
 *     console.error('Update failed:', error.message);
 *     if (error.field) {
 *       // Highlight the specific field
 *     }
 *   },
 *   optimistic: true,
 *   invalidateUserProfile: true
 * });
 *
 * // Usage
 * updateSettings({
 *   language: 'bn',
 *   emailNotifications: true,
 *   preferredDeliveryTime: 'evening'
 * });
 */
export const useUpdateSettings = (
  options?: UseUpdateSettingsOptions
): UseUpdateSettingsReturn => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();
  const optimistic = options?.optimistic ?? true;
  const invalidateUserProfile = options?.invalidateUserProfile ?? true;
  const enableRetry = options?.enableRetry ?? true;

  const mutation = useMutation({
    mutationFn: async (data: UpdateSettingsData): Promise<UserSettings> => {
      const response = await endpoints.updatePreferences(data);
      const updatedSettings = extractData<{
        language: string;
        timezone: string;
        currency: string;
        emailNotifications: boolean;
        smsNotifications: boolean;
        pushNotifications: boolean;
        marketingEmails: boolean;
        orderUpdates: boolean;
        priceDropAlerts: boolean;
        backInStockAlerts: boolean;
        newsletterSubscription: boolean;
        twoFactorEnabled: boolean;
        preferredTwoFactorMethod: string | null;
        preferredDeliveryTime: string;
        saveAddressHistory: boolean;
        autoApplyCoupons: boolean;
      }>(response);

      // Map API response to UserSettings type
      return {
        language: (updatedSettings.language as 'en' | 'bn') || DEFAULT_SETTINGS.language,
        timezone: updatedSettings.timezone || DEFAULT_SETTINGS.timezone,
        currency: (updatedSettings.currency as 'BDT' | 'USD') || DEFAULT_SETTINGS.currency,
        emailNotifications:
          updatedSettings.emailNotifications ?? DEFAULT_SETTINGS.emailNotifications,
        smsNotifications: updatedSettings.smsNotifications ?? DEFAULT_SETTINGS.smsNotifications,
        pushNotifications: updatedSettings.pushNotifications ?? DEFAULT_SETTINGS.pushNotifications,
        marketingEmails: updatedSettings.marketingEmails ?? DEFAULT_SETTINGS.marketingEmails,
        orderUpdates: updatedSettings.orderUpdates ?? DEFAULT_SETTINGS.orderUpdates,
        priceDropAlerts: updatedSettings.priceDropAlerts ?? DEFAULT_SETTINGS.priceDropAlerts,
        backInStockAlerts: updatedSettings.backInStockAlerts ?? DEFAULT_SETTINGS.backInStockAlerts,
        newsletterSubscription:
          updatedSettings.newsletterSubscription ?? DEFAULT_SETTINGS.newsletterSubscription,
        twoFactorEnabled: updatedSettings.twoFactorEnabled ?? DEFAULT_SETTINGS.twoFactorEnabled,
        preferredTwoFactorMethod:
          (updatedSettings.preferredTwoFactorMethod as UserSettings['preferredTwoFactorMethod']) ??
          DEFAULT_SETTINGS.preferredTwoFactorMethod,
        preferredDeliveryTime:
          (updatedSettings.preferredDeliveryTime as UserSettings['preferredDeliveryTime']) ??
          DEFAULT_SETTINGS.preferredDeliveryTime,
        saveAddressHistory:
          updatedSettings.saveAddressHistory ?? DEFAULT_SETTINGS.saveAddressHistory,
        autoApplyCoupons: updatedSettings.autoApplyCoupons ?? DEFAULT_SETTINGS.autoApplyCoupons,
      };
    },
    onMutate: async (newData) => {
      if (!optimistic) return;

      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: USER_SETTINGS_QUERY_KEY });

      // Get previous data
      const previousSettings = queryClient.getQueryData<UserSettings>(
        USER_SETTINGS_QUERY_KEY
      );

      // Optimistically update
      if (previousSettings) {
        const optimisticSettings = {
          ...previousSettings,
          ...newData,
        };
        queryClient.setQueryData(USER_SETTINGS_QUERY_KEY, optimisticSettings);
      }

      return { previousSettings };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(USER_SETTINGS_QUERY_KEY, data);

      // Invalidate user profile if needed (settings may affect profile display)
      if (invalidateUserProfile) {
        queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      }

      options?.onSuccess?.(data);
    },
    onError: (error, _, context) => {
      // Rollback optimistic update
      if (optimistic && context?.previousSettings) {
        queryClient.setQueryData(USER_SETTINGS_QUERY_KEY, context.previousSettings);
      }

      const formattedError = formatError(error);
      options?.onError?.(formattedError);
    },
    onSettled: () => {
      // Refetch to ensure consistency with backend
      queryClient.invalidateQueries({ queryKey: USER_SETTINGS_QUERY_KEY });
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
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
    error: mutation.error ? formatError(mutation.error) : null,
    data: mutation.data,
  };
};

/**
 * Hook for resetting user settings to defaults using shared-api
 *
 * @example
 * const { mutate: resetSettings, isLoading } = useResetSettings({
 *   onSuccess: (data) => {
 *     console.log('Settings reset to defaults:', data.settings);
 *   },
 *   onError: (error) => {
 *     console.error('Reset failed:', error.message);
 *   }
 * });
 *
 * resetSettings();
 */
export const useResetSettings = (
  options?: Omit<UseUpdateSettingsOptions, 'optimistic'>
) => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();
  const enableRetry = options?.enableRetry ?? true;

  return useMutation({
    mutationFn: async (): Promise<ResetSettingsResponse> => {
      // Use updatePreferences with default values to reset
      const response = await endpoints.updatePreferences(DEFAULT_SETTINGS);
      const settings = extractData<{
        language: string;
        timezone: string;
        currency: string;
        emailNotifications: boolean;
        smsNotifications: boolean;
        pushNotifications: boolean;
        marketingEmails: boolean;
        orderUpdates: boolean;
        priceDropAlerts: boolean;
        backInStockAlerts: boolean;
        newsletterSubscription: boolean;
        twoFactorEnabled: boolean;
        preferredTwoFactorMethod: string | null;
        preferredDeliveryTime: string;
        saveAddressHistory: boolean;
        autoApplyCoupons: boolean;
      }>(response);

      const mappedSettings: UserSettings = {
        language: (settings.language as 'en' | 'bn') || DEFAULT_SETTINGS.language,
        timezone: settings.timezone || DEFAULT_SETTINGS.timezone,
        currency: (settings.currency as 'BDT' | 'USD') || DEFAULT_SETTINGS.currency,
        emailNotifications: settings.emailNotifications ?? DEFAULT_SETTINGS.emailNotifications,
        smsNotifications: settings.smsNotifications ?? DEFAULT_SETTINGS.smsNotifications,
        pushNotifications: settings.pushNotifications ?? DEFAULT_SETTINGS.pushNotifications,
        marketingEmails: settings.marketingEmails ?? DEFAULT_SETTINGS.marketingEmails,
        orderUpdates: settings.orderUpdates ?? DEFAULT_SETTINGS.orderUpdates,
        priceDropAlerts: settings.priceDropAlerts ?? DEFAULT_SETTINGS.priceDropAlerts,
        backInStockAlerts: settings.backInStockAlerts ?? DEFAULT_SETTINGS.backInStockAlerts,
        newsletterSubscription:
          settings.newsletterSubscription ?? DEFAULT_SETTINGS.newsletterSubscription,
        twoFactorEnabled: settings.twoFactorEnabled ?? DEFAULT_SETTINGS.twoFactorEnabled,
        preferredTwoFactorMethod:
          (settings.preferredTwoFactorMethod as UserSettings['preferredTwoFactorMethod']) ??
          DEFAULT_SETTINGS.preferredTwoFactorMethod,
        preferredDeliveryTime:
          (settings.preferredDeliveryTime as UserSettings['preferredDeliveryTime']) ??
          DEFAULT_SETTINGS.preferredDeliveryTime,
        saveAddressHistory: settings.saveAddressHistory ?? DEFAULT_SETTINGS.saveAddressHistory,
        autoApplyCoupons: settings.autoApplyCoupons ?? DEFAULT_SETTINGS.autoApplyCoupons,
      };

      return {
        success: true,
        message: 'Settings reset to defaults',
        settings: mappedSettings,
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(USER_SETTINGS_QUERY_KEY, data.settings);
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      options?.onSuccess?.(data as never);
    },
    onError: (error) => {
      const formattedError = formatError(error);
      options?.onError?.(formattedError);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for checking if a specific notification type is enabled
 *
 * @example
 * const { isEnabled, isLoading } = useIsNotificationEnabled('orderUpdates');
 *
 * if (!isEnabled && !isLoading) {
 *   return <EnableNotificationsPrompt />;
 * }
 */
export const useIsNotificationEnabled = (type: keyof Pick<UserSettings, 'emailNotifications' | 'smsNotifications' | 'pushNotifications' | 'orderUpdates' | 'priceDropAlerts' | 'backInStockAlerts' | 'marketingEmails' | 'newsletterSubscription'>) => {
  const { data: settings, isLoading } = useUserSettings();

  const isEnabled = settings ? settings[type] : false;

  return { isEnabled, isLoading };
};

// ==================== Type Exports ====================

export type {
  UseUpdateSettingsOptions,
  UseUpdateSettingsReturn,
  UpdateSettingsData,
  UserSettings,
  SettingsError,
  ResetSettingsResponse,
};
