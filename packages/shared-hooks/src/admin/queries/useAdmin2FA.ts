/**
 * useAdmin2FA Hook
 * অ্যাডমিন 2FA পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { Admin2FAEndpoints } from '@vubon/shared-api';
import { Admin2FA } from '@vubon/shared-types';

export const useAdmin2FA = (twoFAEndpoints: Admin2FAEndpoints, adminId: string) => {
  const {
    data: status,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', '2fa', 'status', adminId],
    queryFn: () => twoFAEndpoints.get2FAStatus(adminId),
    enabled: !!adminId,
    staleTime: 2 * 60 * 1000,
  });

  // Admin2FA টাইপ ব্যবহার করে (deletedAt সহ)
  const get2FAData = (): Admin2FA | null => {
    if (!status) return null;
    return {
      id: `${adminId}-2fa`,
      adminId: adminId,
      enabled: status.enabled,
      method: (status.defaultMethod as 'totp' | 'sms' | 'email' | 'backup_codes') || 'totp',
      status: status.enabled ? 'enabled' : 'disabled',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      userId: adminId,
      type: '2fa',
      backupCodes: [],
      recoveryCodes: [],
    };
  };

  return {
    status,
    twoFAData: get2FAData(),
    isLoading,
    error,
    refetch,
    isEnabled: status?.enabled || false,
    methods: status?.methods || [],
    defaultMethod: status?.defaultMethod,
  };
};

export const useMyAdmin2FA = (twoFAEndpoints: Admin2FAEndpoints) => {
  const {
    data: status,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', '2fa', 'status', 'me'],
    queryFn: () => twoFAEndpoints.get2FAStatus('me'),
    staleTime: 2 * 60 * 1000,
  });

  const get2FAData = (): Admin2FA | null => {
    if (!status) return null;
    return {
      id: 'me-2fa',
      adminId: 'me',
      enabled: status.enabled,
      method: (status.defaultMethod as 'totp' | 'sms' | 'email' | 'backup_codes') || 'totp',
      status: status.enabled ? 'enabled' : 'disabled',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      userId: 'me',
      type: '2fa',
      backupCodes: [],
      recoveryCodes: [],
    };
  };

  return {
    status,
    twoFAData: get2FAData(),
    isLoading,
    error,
    refetch,
    isEnabled: status?.enabled || false,
    methods: status?.methods || [],
    defaultMethod: status?.defaultMethod,
  };
};
