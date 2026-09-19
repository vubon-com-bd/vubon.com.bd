import {
  useMutation as useTanstackMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';

export function useMutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useTanstackMutation<TData, TError, TVariables, TContext>(options);
}
