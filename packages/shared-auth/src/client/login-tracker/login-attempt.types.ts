export interface LoginAttemptRecord {
  readonly identifier: string;
  readonly attempts: number;
  readonly lastAttemptAt: number;
  readonly lockedUntil?: number;
}

export interface LoginTrackerOptions {
  readonly maxAttempts: number;
  readonly windowMs: number;
  readonly lockMs: number;
}
