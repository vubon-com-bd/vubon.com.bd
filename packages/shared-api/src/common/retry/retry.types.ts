export type BackoffKind = 'exponential' | 'linear' | 'fixed';

export interface RetryConfig {
  readonly maxAttempts: number;
  readonly backoff: BackoffKind;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
  readonly jitter: boolean;
  readonly retryable: (error: unknown) => boolean;
}

export interface RetryAttemptInfo {
  readonly attempt: number;
  readonly delayMs: number;
  readonly error: unknown;
}
