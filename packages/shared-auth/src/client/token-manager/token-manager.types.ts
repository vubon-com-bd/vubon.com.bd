export interface RefreshFn {
  (): Promise<{ readonly accessToken: string; readonly expiresAt?: number }>;
}

export interface TokenManagerOptions {
  readonly storage: import('../token-storage/token-storage.types').TokenStorage;
  readonly refresh: RefreshFn;
  readonly onRefreshFailed?: (error: unknown) => void;
  readonly refreshThresholdSeconds?: number;
}
