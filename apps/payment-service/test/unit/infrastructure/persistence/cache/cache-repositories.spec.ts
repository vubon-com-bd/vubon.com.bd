import { jest } from '@jest/globals';
import { IdempotencyCacheRepository } from '../../../../../src/module/infrastructure/persistence/cache/repositories/idempotency.cache.repository.js';
import { PaymentCacheRepository } from '../../../../../src/module/infrastructure/persistence/cache/repositories/payment.cache.repository.js';

function mockRedis() {
  const store = new Map<string, unknown>();
  return {
    store,
    get: jest.fn(async (k: string) => store.get(k) ?? null),
    set: jest.fn(async (k: string, v: unknown) => {
      store.set(k, v);
    }),
    del: jest.fn(async (k: string) => {
      store.delete(k);
    }),
    exists: jest.fn(async (k: string) => store.has(k)),
    raw: {
      set: jest.fn(async () => 'OK'),
    },
  };
}

describe('IdempotencyCacheRepository', () => {
  let redis: ReturnType<typeof mockRedis>;
  let repo: IdempotencyCacheRepository;

  beforeEach(() => {
    redis = mockRedis();
    repo = new IdempotencyCacheRepository(redis as never);
  });

  it('get returns null for missing key', async () => {
    expect(await repo.get('missing')).toBeNull();
  });

  it('set + get roundtrip', async () => {
    await repo.set('k1', 'payment-1');
    const entry = await repo.get('k1');
    expect(entry?.paymentId).toBe('payment-1');
    expect(entry?.createdAt).toBeDefined();
  });

  it('delete removes key', async () => {
    await repo.set('k1', 'payment-1');
    await repo.delete('k1');
    expect(await repo.get('k1')).toBeNull();
  });

  it('exists returns true after set', async () => {
    await repo.set('k1', 'payment-1');
    expect(await repo.exists('k1')).toBe(true);
  });

  it('tryLock returns true on OK', async () => {
    (redis.raw.set as jest.Mock).mockResolvedValue('OK');
    expect(await repo.tryLock('k1')).toBe(true);
  });

  it('tryLock returns false on null', async () => {
    (redis.raw.set as jest.Mock).mockResolvedValue(null);
    expect(await repo.tryLock('k1')).toBe(false);
  });

  it('releaseLock deletes lock key', async () => {
    await repo.releaseLock('k1');
    expect(redis.del).toHaveBeenCalledWith(expect.stringContaining('k1'));
  });
});

describe('PaymentCacheRepository', () => {
  let redis: ReturnType<typeof mockRedis>;
  let repo: PaymentCacheRepository;

  beforeEach(() => {
    redis = mockRedis();
    repo = new PaymentCacheRepository(redis as never);
  });

  it('get returns null when empty', async () => {
    expect(await repo.get('id')).toBeNull();
  });

  it('set + get roundtrip', async () => {
    const dto = { id: 'p1', status: 'pending' } as never;
    await repo.set('p1', dto);
    const got = await repo.get('p1');
    expect(got).toMatchObject({ id: 'p1' });
  });

  it('invalidate clears entry', async () => {
    await repo.set('p1', { id: 'p1' } as never);
    await repo.invalidate('p1');
    expect(await repo.get('p1')).toBeNull();
  });

  it('invalidateList clears user + order keys', async () => {
    await repo.invalidateList('u1', 'o1');
    expect(redis.del).toHaveBeenCalledTimes(2);
  });
});
