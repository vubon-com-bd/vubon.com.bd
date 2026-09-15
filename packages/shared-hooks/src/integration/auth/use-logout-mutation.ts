import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLogoutMutation(logoutFn: () => Promise<void>): {
  readonly logout: () => Promise<void>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const mutation = useMutation<void, Error, void>({
    mutationFn: logoutFn,
    onSuccess: () => {
      client.clear();
    },
  });
  return {
    logout: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
