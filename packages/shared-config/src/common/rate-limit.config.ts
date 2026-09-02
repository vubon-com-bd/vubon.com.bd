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
}

export const rateLimitConfig = (): RateLimitConfig => ({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: process.env.RATE_LIMIT_MESSAGE || 'Too many requests, please try again later.',
  statusCode: 429,
  keyPrefix: 'rate-limit:',
});
