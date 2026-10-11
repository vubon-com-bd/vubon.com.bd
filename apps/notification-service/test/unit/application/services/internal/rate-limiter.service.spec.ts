import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RateLimiterService } from '../../../../../src/module/infrastructure/services/internal/rate-limiter.service.js';

function makeCache() {
  return {
    checkUserDaily: jest.fn().mockResolvedValue({
      count: 1, limit: 50, allowed: true, remaining: 49, resetAtSeconds: 86400,
    }),
    checkGlobalPerSecond: jest.fn().mockResolvedValue({
      count: 1, limit: 100, allowed: true, remaining: 99, resetAtSeconds: 1,
    }),
    peekUserDaily: jest.fn(),
    resetUserDaily: jest.fn(),
  };
}

describe('RateLimiterService', () => {
  let cache: ReturnType<typeof makeCache>;
  let service: RateLimiterService;

  beforeEach(() => {
    cache = makeCache();
    service = new RateLimiterService(cache as never);
  });

  it('allowed when under both limits (email)', async () => {
    const r = await service.check('u-1', 'email', 'normal');
    expect(r.allowed).toBe(true);
  });

  it('bypasses user daily limit for critical', async () => {
    const r = await service.check('u-1', 'email', 'critical');
    expect(r.allowed).toBe(true);
    expect(cache.checkUserDaily).not.toHaveBeenCalled();
  });

  it('denies when user daily exceeded', async () => {
    cache.checkUserDaily.mockResolvedValueOnce({
      count: 100, limit: 50, allowed: false, remaining: 0, resetAtSeconds: 3600,
    });
    const r = await service.check('u-1', 'email', 'normal');
    expect(r.allowed).toBe(false);
    expect(r.limitType).toBe('user_daily');
  });

  it('denies when global per-second exceeded', async () => {
    cache.checkGlobalPerSecond.mockResolvedValueOnce({
      count: 500, limit: 100, allowed: false, remaining: 0, resetAtSeconds: 1,
    });
    const r = await service.check('u-1', 'email', 'normal');
    expect(r.allowed).toBe(false);
    expect(r.limitType).toBe('global_per_second');
  });

  it('uses email daily limit for email', async () => {
    await service.check('u-1', 'email');
    expect(cache.checkUserDaily).toHaveBeenCalledWith('u-1', 'email', expect.any(Number));
  });

  it('uses sms daily limit for sms', async () => {
    await service.check('u-1', 'sms');
    expect(cache.checkUserDaily).toHaveBeenCalledWith('u-1', 'sms', expect.any(Number));
  });

  it('uses push daily limit for push', async () => {
    await service.check('u-1', 'push');
    expect(cache.checkUserDaily).toHaveBeenCalled();
  });

  it('uses in_app daily limit', async () => {
    await service.check('u-1', 'in_app');
    expect(cache.checkUserDaily).toHaveBeenCalled();
  });

  it('uses webhook daily limit', async () => {
    await service.check('u-1', 'webhook');
    expect(cache.checkUserDaily).toHaveBeenCalled();
  });

  it('uses whatsapp daily limit', async () => {
    await service.check('u-1', 'whatsapp');
    expect(cache.checkUserDaily).toHaveBeenCalled();
  });

  it('uses Infinity for unknown channel', async () => {
    await service.check('u-1', 'unknown');
    expect(cache.checkUserDaily).toHaveBeenCalled();
  });
});
