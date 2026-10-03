export interface ApiQueryOptions {
  readonly enabled?: boolean;
  readonly refetchIntervalMs?: number;
  readonly staleTimeMs?: number;
  readonly retry?: number | boolean;
}

export interface ApiMutationOptions<TData = unknown> {
  readonly onSuccess?: (data: TData) => void;
  readonly onError?: (error: Error) => void;
}
