import { useCallback, useState } from 'react';

export interface UseMfaOptions {
  readonly verify: (code: string, method: string) => Promise<boolean>;
}

export function useMfa(options: UseMfaOptions): {
  readonly verify: (code: string, method: string) => Promise<boolean>;
  readonly isLoading: boolean;
  readonly error: string | null;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wrapped = useCallback(
    async (code: string, method: string) => {
      setIsLoading(true);
      setError(null);
      try {
        return await options.verify(code, method);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'MFA verification failed');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  return { verify: wrapped, isLoading, error };
}
