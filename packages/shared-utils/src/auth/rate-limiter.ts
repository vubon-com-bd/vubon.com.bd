export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}

  isAllowed(key: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    const recent = timestamps.filter((t) => now - t < this.windowMs);
    if (recent.length >= this.maxRequests) return false;
    recent.push(now);
    this.requests.set(key, recent);
    return true;
  }

  getRemaining(key: string): number {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    const recent = timestamps.filter((t) => now - t < this.windowMs);
    return Math.max(0, this.maxRequests - recent.length);
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}
