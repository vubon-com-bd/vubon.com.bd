/**
 * useRegister Hook
 * Custom hook for user registration
 */

import { useState, useCallback } from 'react';
import { AuthClient } from '@vubon/auth-shared-auth';
import type { RegisterRequest } from '@vubon/auth-shared-api';
import type { User } from '@vubon/auth-shared-types';

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: Error) => void;
}

interface UseRegisterReturn {
  register: (data: RegisterRequest) => Promise<void>;
  loading: boolean;
  error: Error | null;
  data: RegisterResponse | null;
}

export function useRegister(
  authClient: AuthClient,
  options?: UseRegisterOptions,
): UseRegisterReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<RegisterResponse | null>(null);

  const register = useCallback(
    async (registerData: RegisterRequest): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await authClient.register(registerData);
        setData(response);
        options?.onSuccess?.(response);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Registration failed');
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [authClient, options],
  );

  return {
    register,
    loading,
    error,
    data,
  };
}
