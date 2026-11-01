import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface RefreshOutput {
  readonly accessToken: string;
  readonly expiresIn?: number;
}

export function useRefresh(refreshFn: () => Promise<RefreshOutput>): {
  readonly refresh: () => Promise<RefreshOutput>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const mutation = useMutation<RefreshOutput, Error, void>({
    mutationFn: refreshFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ['auth'] });
    },
  });
  return {
    refresh: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
