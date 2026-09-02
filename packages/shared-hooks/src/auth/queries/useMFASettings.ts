/**
 * Auth useMFASettings Hook
 * প্রমীকরণ MFA সেটিংস হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthMFAEndpoints } from '@vubon/shared-api';
import { AUTH_MFA } from '@vubon/shared-constants';
import { AuthMFAMethod } from '@vubon/shared-types';

export const useMFASettings = (mfaEndpoints: AuthMFAEndpoints) => {
  const {
    data: settings,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'mfa', 'settings'],
    queryFn: () => mfaEndpoints.getMFAStatus(),
    staleTime: 60 * 1000,
  });

  // AuthMFAMethod টাইপ ব্যবহার করে মেথড চেক করা
  const isMethodSupported = (method: string): method is AuthMFAMethod => {
    return (Object.values(AUTH_MFA.METHODS) as string[]).includes(method);
  };

  const getAvailableMethods = (): AuthMFAMethod[] => {
    const methods = settings?.methods || [];
    return methods.filter((m): m is AuthMFAMethod => isMethodSupported(m));
  };

  const isSecureMethod = (method: AuthMFAMethod): boolean => {
    const secureMethods: AuthMFAMethod[] = [
      AUTH_MFA.METHODS.WEBAUTHN_PASSKEY as AuthMFAMethod,
      AUTH_MFA.METHODS.YUBIKEY as AuthMFAMethod,
      AUTH_MFA.METHODS.SMART_CARD as AuthMFAMethod,
      AUTH_MFA.METHODS.FINGERPRINT as AuthMFAMethod,
      AUTH_MFA.METHODS.FACE_ID as AuthMFAMethod,
      AUTH_MFA.METHODS.IRIS_SCAN as AuthMFAMethod,
    ];
    return secureMethods.includes(method);
  };

  const getDefaultMethod = (): AuthMFAMethod | undefined => {
    const defaultMethod = settings?.defaultMethod;
    if (defaultMethod && isMethodSupported(defaultMethod)) {
      return defaultMethod as AuthMFAMethod;
    }
    return undefined;
  };

  return {
    settings,
    isLoading,
    error,
    refetch,
    isEnabled: settings?.enabled || false,
    methods: getAvailableMethods(),
    defaultMethod: getDefaultMethod(),
    getAvailableMethods,
    isMethodSupported,
    isSecureMethod,
  };
};
