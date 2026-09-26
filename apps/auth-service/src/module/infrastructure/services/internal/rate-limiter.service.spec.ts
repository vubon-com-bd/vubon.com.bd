/**
 * RateLimiterService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { RateLimiterService } from './rate-limiter.service';

const mockRedis = () => {
  const store: Record<string, { value: number; expireAt?: number }> = {};
  return {
    raw: {
      incr: jest.fn(async (key: string) => {
        store[key] = { value: (store[key]?.value ?? 0) + 1 };
        return store[key]!.value;
      }),
      expire: jest.fn(async (key: string, seconds: number) => {
        if (store[key]) store[key]!.expireAt = Date.now() + seconds * 1000;
        return 1;
      }),
      ttl: jest.fn(async (key: string) => {
        const entry = store[key];
        if (!entry?.expireAt) return -1;
        return Math.max(0, Math.floor((entry.expireAt - Date.now()) / 1000));
      }),
      get: jest.fn(async (key: string) => {
        const entry = store[key];
        return entry ? String(entry.value) : null;
      }),
    },
  };
};

describe('RateLimiterService', () => {
  let service: RateLimiterService;
  let redis: ReturnType<typeof mockRedis>;

  beforeEach(() => {
    redis = mockRedis();
    service = new RateLimiterService(redis as never);
  });

  it('should have name', () => {
    expect(service.name).toBe('RateLimiterService');
  });

  describe('hit()', () => {
    it('should allow first hit', async () => {
      const result = await service.hit({
        key: 'test',
        limit: 5,
        windowSec: 60,
      });
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it('should allow up to limit', async () => {
      for (let i = 0; i < 5; i += 1) {
        const result = await service.hit({ key: 'test', limit: 5, windowSec: 60 });
        expect(result.allowed).toBe(true);
      }
    });

    it('should block after limit', async () => {
      for (let i = 0; i < 5; i += 1) {
        await service.hit({ key: 'test', limit: 5, windowSec: 60 });
      }
      const result = await service.hit({ key: 'test', limit: 5, windowSec: 60 });
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should set expiry on first hit', async () => {
      await service.hit({ key: 'test', limit: 5, windowSec: 60 });
      expect(redis.raw.expire).toHaveBeenCalledWith('ratelimit:test', 60);
    });

    it('should not set expiry on subsequent hits', async () => {
      await service.hit({ key: 'test', limit: 5, windowSec: 60 });
      await service.hit({ key: 'test', limit: 5, windowSec: 60 });
      expect(redis.raw.expire).toHaveBeenCalledTimes(1);
    });
  });

  describe('peek()', () => {
    it('should return limit when no usage', async () => {
      const remaining = await service.peek({ key: 'test', limit: 10 });
      expect(remaining).toBe(10);
    });

    it('should return remaining after hits', async () => {
      for (let i = 0; i < 3; i += 1) {
        await service.hit({ key: 'test', limit: 5, windowSec: 60 });
      }
      const remaining = await service.peek({ key: 'test', limit: 5 });
      expect(remaining).toBe(2);
    });
  });
});
