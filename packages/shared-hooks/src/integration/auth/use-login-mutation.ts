import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginInput, LoginOutput } from './auth.types';
import { AUTH_QUERY_KEY } from './use-auth-query';

export function useLoginMutation(loginFn: (input: LoginInput) => Promise<LoginOutput>): {
  readonly login: (input: LoginInput) => Promise<LoginOutput>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const mutation = useMutation<LoginOutput, Error, LoginInput>({
    mutationFn: loginFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
  return {
    login: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
