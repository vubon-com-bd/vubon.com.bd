/**
 * Rate Limit Client
 * রেট লিমিট ক্লায়েন্ট
 */
export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyPrefix: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  window: number;
}

export class RateLimitClient {
  private config: RateLimitConfig;
  private requests: Map<string, number[]> = new Map();

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  private getKey(key: string): string {
    return `${this.config.keyPrefix}${key}`;
  }

  private getWindowStart(): number {
    return Date.now() - this.config.windowMs;
  }

  private getRequestTimestamps(key: string): number[] {
    const timestamps = this.requests.get(key) || [];
    const windowStart = this.getWindowStart();
    return timestamps.filter((t) => t >= windowStart);
  }

  private addRequest(key: string): void {
    const timestamps = this.getRequestTimestamps(key);
    timestamps.push(Date.now());
    this.requests.set(key, timestamps);
  }

  canMakeRequest(key: string): boolean {
    const timestamps = this.getRequestTimestamps(key);
    return timestamps.length < this.config.maxRequests;
  }

  getRateLimitInfo(key: string): RateLimitInfo {
    const timestamps = this.getRequestTimestamps(key);
    const remaining = Math.max(0, this.config.maxRequests - timestamps.length);
    const oldestTimestamp = timestamps[0] || Date.now();
    const reset = oldestTimestamp + this.config.windowMs;

    return {
      limit: this.config.maxRequests,
      remaining,
      reset,
      window: this.config.windowMs,
    };
  }

  async waitForSlot(key: string): Promise<void> {
    while (!this.canMakeRequest(key)) {
      const info = this.getRateLimitInfo(key);
      const waitTime = info.reset - Date.now();
      if (waitTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, waitTime + 100));
      }
    }
    this.addRequest(key);
  }

  reset(key: string): void {
    this.requests.delete(key);
  }

  resetAll(): void {
    this.requests.clear();
  }

  getStats(key: string): {
    totalRequests: number;
    rateLimitHit: boolean;
    remaining: number;
    windowMs: number;
  } {
    const timestamps = this.getRequestTimestamps(key);
    return {
      totalRequests: timestamps.length,
      rateLimitHit: timestamps.length >= this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - timestamps.length),
      windowMs: this.config.windowMs,
    };
  }
}

export const createRateLimitClient = (
  maxRequests: number = 100,
  windowMs: number = 60000
): RateLimitClient => {
  return new RateLimitClient({
    maxRequests,
    windowMs,
    keyPrefix: 'rate-limit:',
  });
};
