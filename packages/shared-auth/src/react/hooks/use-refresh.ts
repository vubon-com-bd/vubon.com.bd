import { useCallback, useState } from 'react';
import { useAuth } from './use-auth';

export function useRefresh(): {
  readonly refresh: () => Promise<void>;
  readonly isLoading: boolean;
  readonly error: string | null;
} {
  const { refresh } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wrapped = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Refresh failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return { refresh: wrapped, isLoading, error };
}
