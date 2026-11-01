import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface ReturnOrderInput {
  readonly orderId: string;
  readonly items: readonly { readonly orderItemId: string; readonly quantity: number }[];
  readonly reason: string;
  readonly notes?: string;
}

export interface ReturnOrderOutput {
  readonly returnId: string;
  readonly status: string;
}

export function useOrderReturn(returnFn: (input: ReturnOrderInput) => Promise<ReturnOrderOutput>): {
  readonly request: (input: ReturnOrderInput) => Promise<ReturnOrderOutput>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const mutation = useMutation<ReturnOrderOutput, Error, ReturnOrderInput>({
    mutationFn: returnFn,
    onSuccess: (_data, vars) => {
      void client.invalidateQueries({ queryKey: ['orders', 'detail', vars.orderId] });
    },
  });
  return {
    request: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
