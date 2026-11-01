import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CancelOrderInput {
  readonly orderId: string;
  readonly reason: string;
  readonly notes?: string;
}

export function useOrderCancel(cancelFn: (input: CancelOrderInput) => Promise<void>): {
  readonly cancel: (input: CancelOrderInput) => Promise<void>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const mutation = useMutation<void, Error, CancelOrderInput>({
    mutationFn: cancelFn,
    onSuccess: (_data, vars) => {
      void client.invalidateQueries({ queryKey: ['orders'] });
      void client.invalidateQueries({ queryKey: ['orders', 'detail', vars.orderId] });
    },
  });
  return {
    cancel: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
