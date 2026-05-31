/**
 * useMFA Hook - MFA status query with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch
 * - Integrated with shared-types for type safety
 * - Added proper retry logic and error handling
 * - Consistent with other shared-hooks patterns
 *
 * @module shared-hooks/src/mfa/useMFA
 * 
 * RULES:
 * ✅ ONLY query orchestration - NO business logic
 * ✅ NO TOTP generation (handled by backend)
 * ✅ React Query integration with proper caching
 * ✅ TypeScript strict
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createMfaEndpoints } from '@vubon/shared-api/endpoints/mfa';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export type MFAProvider = 
  | 'totp' 
  | 'sms' 
  | 'email' 
  | 'backup_code' 
  | 'webauthn'
  | 'whatsapp'
  | 'imo'
  | 'bkash_pin'
  | 'nagad_pin'
  | 'rocket_pin';

export type MFAStatusType = 
  | 'not_enabled' 
  | 'setup_pending' 
  | 'setup_in_progress' 
  | 'enabled' 
  | 'enabled_default' 
  | 'enabled_multi' 
  | 'locked' 
  | 'disabled_by_admin' 
  | 'recovery_mode';

export interface MFAMethod {
  id: string;
  provider: MFAProvider;
  identifier: string;
  label: string | null;
  isPrimary: boolean;
  isVerified: boolean;
  isBackup: boolean;
  priority: number;
  createdAt: string;
  lastUsedAt: string | null;
  lastFailedAt: string | null;
  iconName: string;
  displayName: string;
}

export interface MFAStatus {
  enabled: boolean;
  status: MFAStatusType;
  methods: MFAMethod[];
  requiredForRole: boolean;
  requiredForAction: boolean;
  trustedDevices: string[];
  recoveryCodesRemaining: number;
  defaultMethod: MFAProvider | null;
  recommendedMethods: MFAProvider[];
}

export interface UseMFAOptions {
  enabled?: boolean;
  staleTime?: number; // milliseconds
  refetchInterval?: number;
}

export interface UseMFAReturn {
  data: MFAStatus | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  refetch: () => Promise<void>;
  hasMFA: boolean;
  hasBackupCodes: boolean;
  primaryMethod: MFAMethod | undefined;
  availableMethods: MFAMethod[];
}

// ==================== Query Keys ====================

const MFA_STATUS_QUERY_KEY = ['mfaStatus'] as const;

// Helper to get endpoints with authenticated client
const getMfaEndpoints = () => {
  return createMfaEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// ==================== Hook ====================

/**
 * Hook for fetching MFA status using shared-api
 * 
 * @example
 * const { data: mfaStatus, hasMFA, primaryMethod, isLoading } = useMFA();
 * 
 * if (isLoading) return <LoadingSpinner />;
 * 
 * if (!hasMFA) {
 *   return <MFASetupPrompt />;
 * }
 * 
 * return (
 *   <div>
 *     <p>Primary method: {primaryMethod?.displayName}</p>
 *     <p>Available methods: {mfaStatus?.methods.length}</p>
 *   </div>
 * );
 */
export const useMFA = (options?: UseMFAOptions): UseMFAReturn => {
  const endpoints = getMfaEndpoints();

  const query = useQuery({
    queryKey: MFA_STATUS_QUERY_KEY,
    queryFn: async (): Promise<MFAStatus> => {
      const response = await endpoints.getStatus();
      return extractData(response);
    },
    staleTime: options?.staleTime ?? 60 * 1000, // 1 minute default
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      // Don't retry on 401 (not authenticated)
      if (error instanceof Error && error.message.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const data = query.data;
  const methods = data?.methods || [];
  const hasMFA = data?.enabled === true;
  const hasBackupCodes = (data?.recoveryCodesRemaining ?? 0) > 0;
  const primaryMethod = methods.find((m) => m.isPrimary);
  const availableMethods = methods.filter((m) => m.isVerified);

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    isFetching: query.isFetching,
    refetch: async () => {
      await query.refetch();
    },
    hasMFA,
    hasBackupCodes,
    primaryMethod,
    availableMethods,
  };
};

/**
 * Hook for fetching MFA methods only
 * 
 * @example
 * const { data: methods, isLoading } = useMFAMethods();
 */
export const useMFAMethods = (options?: UseMFAOptions) => {
  const { data, isLoading, isError, error, refetch } = useMFA(options);
  
  return {
    data: data?.methods || [],
    isLoading,
    isError,
    error,
    refetch,
    primaryMethod: data?.methods.find((m) => m.isPrimary),
    verifiedMethods: data?.methods.filter((m) => m.isVerified) || [],
  };
};

/**
 * Hook for checking if MFA is required for the current user
 * 
 * @example
 * const { isRequired, isLoading } = useIsMFARequired();
 * 
 * if (isRequired && !hasMFA) {
 *   return <MFASetupRequiredBanner />;
 * }
 */
export const useIsMFARequired = (options?: UseMFAOptions) => {
  const { data, isLoading, isError, error } = useMFA(options);
  
  return {
    isRequired: data?.requiredForRole === true,
    isRequiredForAction: data?.requiredForAction === true,
    isLoading,
    isError,
    error,
  };
};

/**
 * Hook for getting recommended MFA methods
 * 
 * @example
 * const { recommendedMethods } = useRecommendedMFAMethods();
 * 
 * // Show recommended methods to user
 * {recommendedMethods.map(method => (
 *   <MFAMethodCard key={method} provider={method} />
 * ))}
 */
export const useRecommendedMFAMethods = (options?: UseMFAOptions) => {
  const { data, isLoading } = useMFA(options);
  
  return {
    recommendedMethods: data?.recommendedMethods || [],
    isLoading,
  };
};

// ==================== Type Exports ====================

export type { UseMFAOptions, UseMFAReturn, MFAStatus, MFAMethod, MFAProvider, MFAStatusType };
