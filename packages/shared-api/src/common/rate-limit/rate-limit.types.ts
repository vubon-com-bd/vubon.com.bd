export interface RateLimitConfig {
  readonly maxRequests: number;
  readonly windowMs: number;
}

export interface RateLimitState {
  readonly remaining: number;
  readonly resetAt: number;
}
