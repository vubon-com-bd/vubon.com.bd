/**
 * RateLimiterService tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RateLimiterService } from '@infrastructure/services/internal/rate-limiter.service.js';

function makeRedisMock() {
  return {
    get: jest.fn<() => Promise<unknown>>(),
    set: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    del: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
  };
}

describe('RateLimiterService', () => {
  let redis: ReturnType<typeof makeRedisMock>;
  let service: RateLimiterService;

  beforeEach(() => {
    redis = makeRedisMock();
    service = new RateLimiterService(redis as never);
  });

  describe('check()', () => {
    it('should allow when under limit', async () => {
      redis.get.mockResolvedValue(0);
      const r = await service.check('key1', 5, 60);
      expect(r.allowed).toBe(true);
      expect(r.remaining).toBe(4);
    });

    it('should deny when at limit', async () => {
      redis.get.mockResolvedValue(5);
      const r = await service.check('key1', 5, 60);
      expect(r.allowed).toBe(false);
      expect(r.retryAfterSeconds).toBe(60);
    });

    it('should fail-open on Redis error', async () => {
      redis.get.mockRejectedValue(new Error('Redis down'));
      const r = await service.check('key1');
      expect(r.allowed).toBe(true);
    });
  });

  describe('reset()', () => {
    it('should delete key', async () => {
      await service.reset('key1');
      expect(redis.del).toHaveBeenCalledWith('auth:ratelimit:key1');
    });
  });

  describe('assertAllowed()', () => {
    it('should pass when allowed', async () => {
      redis.get.mockResolvedValue(0);
      await expect(service.assertAllowed('key', 5, 60)).resolves.toBeUndefined();
    });

    it('should throw when exceeded', async () => {
      redis.get.mockResolvedValue(100);
      await expect(service.assertAllowed('key', 5, 60)).rejects.toThrow(/Rate limit/);
    });
  });
});
