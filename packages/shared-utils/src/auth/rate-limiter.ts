/**
 * Auth Rate Limiter
 * প্রমীকরণ রেট লিমিটার
 */

// In-memory storage for rate limiting (will be replaced with Redis in production)
interface RateLimitData {
  requests: { timestamp: number }[];
}

const rateLimitStore: Record<string, RateLimitData> = {};

interface RateLimiterResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

interface RateLimiterStatus {
  current: number;
  limit: number;
  remaining: number;
  resetAt: Date;
}

interface RateLimiterInstance {
  isAllowed: (key: string) => RateLimiterResult;
  getStatus: (key: string) => RateLimiterStatus;
  reset: (key: string) => void;
}

interface RateLimiterConfig {
  limit: number;
  window: number;
  keyPrefix?: string;
}

export const AuthRateLimiter = {
  /**
   * Check if request is allowed
   * রিকোয়েস্ট অনুমোদিত কিনা চেক করা
   */
  isAllowed(key: string, limit: number = 10, window: number = 60): RateLimiterResult {
    const storageKey = `rate_limit_${key}`;
    const now = Date.now();
    const windowMs = window * 1000;

    let requests: { timestamp: number }[] = [];

    if (rateLimitStore[storageKey]) {
      requests = rateLimitStore[storageKey].requests;
      // Filter out old requests
      requests = requests.filter((r) => now - r.timestamp < windowMs);
    }

    const remaining = limit - requests.length;
    const allowed = remaining > 0;

    if (allowed) {
      requests.push({ timestamp: now });
      rateLimitStore[storageKey] = { requests };
    }

    const oldestRequest = requests.length > 0 ? requests[0].timestamp : now;
    const resetAt = new Date(oldestRequest + windowMs);

    return {
      allowed,
      remaining: Math.max(0, remaining - 1),
      resetAt,
    };
  },

  /**
   * Get rate limit status
   * রেট লিমিট স্ট্যাটাস পাওয়া
   */
  getStatus(key: string, limit: number = 10, window: number = 60): RateLimiterStatus {
    const storageKey = `rate_limit_${key}`;
    const now = Date.now();
    const windowMs = window * 1000;

    let requests: { timestamp: number }[] = [];

    if (rateLimitStore[storageKey]) {
      requests = rateLimitStore[storageKey].requests;
      requests = requests.filter((r) => now - r.timestamp < windowMs);
    }

    const oldestRequest = requests.length > 0 ? requests[0].timestamp : now;
    const resetAt = new Date(oldestRequest + windowMs);

    return {
      current: requests.length,
      limit,
      remaining: Math.max(0, limit - requests.length),
      resetAt,
    };
  },

  /**
   * Reset rate limit
   * রেট লিমিট রিসেট করা
   */
  reset(key: string): void {
    const storageKey = `rate_limit_${key}`;
    delete rateLimitStore[storageKey];
  },

  /**
   * Create rate limiter with custom config
   * কাস্টম কনফিগ সহ রেট লিমিটার তৈরি করা
   */
  create(config: RateLimiterConfig): RateLimiterInstance {
    const { limit, window, keyPrefix = 'rate_limit' } = config;

    return {
      isAllowed: (key: string): RateLimiterResult => {
        return AuthRateLimiter.isAllowed(`${keyPrefix}_${key}`, limit, window);
      },
      getStatus: (key: string): RateLimiterStatus => {
        return AuthRateLimiter.getStatus(`${keyPrefix}_${key}`, limit, window);
      },
      reset: (key: string): void => {
        AuthRateLimiter.reset(`${keyPrefix}_${key}`);
      },
    };
  },

  /**
   * Create login rate limiter
   * লগইন রেট লিমিটার তৈরি করা
   */
  createLoginLimiter(limit: number = 5, window: number = 60): RateLimiterInstance {
    return AuthRateLimiter.create({
      limit,
      window,
      keyPrefix: 'login_rate',
    });
  },

  /**
   * Create OTP rate limiter
   * OTP রেট লিমিটার তৈরি করা
   */
  createOTPLimiter(limit: number = 3, window: number = 300): RateLimiterInstance {
    return AuthRateLimiter.create({
      limit,
      window,
      keyPrefix: 'otp_rate',
    });
  },

  /**
   * Create API rate limiter
   * API রেট লিমিটার তৈরি করা
   */
  createAPILimiter(limit: number = 100, window: number = 60): RateLimiterInstance {
    return AuthRateLimiter.create({
      limit,
      window,
      keyPrefix: 'api_rate',
    });
  },

  /**
   * Cleanup expired entries (should be called periodically)
   * মেয়াদোত্তীর্ণ এন্ট্রি পরিষ্কার করা (পর্যায়ক্রমে কল করা উচিত)
   */
  cleanup(): void {
    const now = Date.now();
    // Keep only last 1 hour of data
    const maxAge = 3600 * 1000;

    for (const key of Object.keys(rateLimitStore)) {
      const data = rateLimitStore[key];
      if (data && data.requests) {
        data.requests = data.requests.filter((r) => now - r.timestamp < maxAge);
        if (data.requests.length === 0) {
          delete rateLimitStore[key];
        }
      }
    }
  },
};
