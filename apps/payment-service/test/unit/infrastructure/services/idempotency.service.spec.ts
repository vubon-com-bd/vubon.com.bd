import { jest } from '@jest/globals';
import { IdempotencyService } from '../../../../src/module/infrastructure/services/internal/idempotency.service.js';

function mockCache() {
  return {
    get: jest.fn(async () => null),
    set: jest.fn(async () => undefined),
    delete: jest.fn(async () => undefined),
    tryLock: jest.fn(async () => true),
    releaseLock: jest.fn(async () => undefined),
  };
}

describe('IdempotencyService', () => {
  let cache: ReturnType<typeof mockCache>;
  let svc: IdempotencyService;

  beforeEach(() => {
    cache = mockCache();
    svc = new IdempotencyService(cache as never);
  });

  it('derive creates deterministic key', () => {
    const k1 = svc.derive({ orderId: 'o1', userId: 'u1', amount: 1000, method: 'mobile_banking' });
    const k2 = svc.derive({ orderId: 'o1', userId: 'u1', amount: 1000, method: 'mobile_banking' });
    expect(k1.value).toBe(k2.value);
  });

  it('random returns unique', () => {
    expect(svc.random().value).not.toBe(svc.random().value);
  });

  it('lookup returns null when missing', async () => {
    expect(await svc.lookup('k')).toBeNull();
  });

  it('lookup returns paymentId when hit', async () => {
    cache.get.mockResolvedValue({ paymentId: 'p1', createdAt: 'now' });
    expect(await svc.lookup('k')).toBe('p1');
  });

  it('remember stores key', async () => {
    await svc.remember('k1', 'p1');
    expect(cache.set).toHaveBeenCalledWith('k1', 'p1');
  });

  it('forget deletes key', async () => {
    await svc.forget('k1');
    expect(cache.delete).toHaveBeenCalledWith('k1');
  });

  it('tryLock delegates', async () => {
    expect(await svc.tryLock('k')).toBe(true);
  });

  it('releaseLock delegates', async () => {
    await svc.releaseLock('k');
    expect(cache.releaseLock).toHaveBeenCalledWith('k');
  });
});
