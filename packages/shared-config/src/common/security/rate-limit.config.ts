/**
 * Rate Limit Configuration
 * রেট লিমিট কনফিগারেশন
 */
export interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
  statusCode: number;
  keyPrefix: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export interface RateLimitOptions {
  windowMs?: number;
  max?: number;
  message?: string;
  statusCode?: number;
  keyPrefix?: string;
}

export const createRateLimitConfig = (options: RateLimitOptions = {}): RateLimitConfig => ({
  windowMs: options.windowMs || 900000, // 15 minutes
  max: options.max || 100,
  message: options.message || 'Too many requests, please try again later.',
  statusCode: options.statusCode || 429,
  keyPrefix: options.keyPrefix || 'rate-limit:',
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

// Pre-defined rate limit configurations
export const rateLimitConfigs = {
  // Strict: 10 requests per minute
  strict: createRateLimitConfig({ windowMs: 60000, max: 10, keyPrefix: 'rate-limit:strict:' }),

  // Medium: 60 requests per minute
  medium: createRateLimitConfig({ windowMs: 60000, max: 60, keyPrefix: 'rate-limit:medium:' }),

  // Loose: 100 requests per minute
  loose: createRateLimitConfig({ windowMs: 60000, max: 100, keyPrefix: 'rate-limit:loose:' }),

  // Very Loose: 1000 requests per minute
  veryLoose: createRateLimitConfig({
    windowMs: 60000,
    max: 1000,
    keyPrefix: 'rate-limit:very-loose:',
  }),

  // Authentication: 5 requests per minute
  auth: createRateLimitConfig({ windowMs: 60000, max: 5, keyPrefix: 'rate-limit:auth:' }),

  // API: 1000 requests per hour
  api: createRateLimitConfig({ windowMs: 3600000, max: 1000, keyPrefix: 'rate-limit:api:' }),
};
