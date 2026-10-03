import { useCallback, useState } from 'react';

export interface UseRegisterOptions {
  readonly register: (input: { email: string; password: string; name: string }) => Promise<void>;
}

export function useRegister(options: UseRegisterOptions): {
  readonly register: (input: { email: string; password: string; name: string }) => Promise<void>;
  readonly isLoading: boolean;
  readonly error: string | null;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wrapped = useCallback(
    async (input: { email: string; password: string; name: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        await options.register(input);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Registration failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  return { register: wrapped, isLoading, error };
}
