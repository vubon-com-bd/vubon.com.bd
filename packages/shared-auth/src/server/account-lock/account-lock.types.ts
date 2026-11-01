export interface AccountLockRecord {
  readonly identifier: string;
  readonly failures: number;
  readonly lastFailureAt: number;
  readonly lockedUntil?: number;
}

export interface AccountLockConfig {
  readonly maxFailures: number;
  readonly windowMs: number;
  readonly lockMs: number;
}
