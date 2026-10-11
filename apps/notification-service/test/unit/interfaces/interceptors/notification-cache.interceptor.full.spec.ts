import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { NotificationCacheInterceptor } from '../../../../src/module/interfaces/interceptors/notification-cache.interceptor.js';

function makeRedis() {
  return {
    get: jest.fn().mockResolvedValue(null),
    raw: { set: jest.fn().mockResolvedValue('OK') },
  } as never;
}
function makeCtx(method: string, url = '/notifications/1', userId?: string): never {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method, url, user: userId ? { userId } : undefined }),
    }),
  } as never;
}
function makeNext(value: unknown) {
  return { handle: () => of(value) } as never;
}

describe('NotificationCacheInterceptor — branch coverage', () => {
  let redis: ReturnType<typeof makeRedis>;
  let i: NotificationCacheInterceptor;
  beforeEach(() => {
    redis = makeRedis();
    i = new NotificationCacheInterceptor(redis as never);
  });

  it('non-GET passes through without caching', async () => {
    const obs = await i.intercept(makeCtx('POST'), makeNext({ id: 'n' }));
    expect(await firstValueFrom(obs)).toEqual({ id: 'n' });
    expect((redis as { raw: { set: jest.Mock } }).raw.set).not.toHaveBeenCalled();
  });

  it('GET cache hit returns cached', async () => {
    (redis as { get: jest.Mock }).get.mockResolvedValueOnce({ cached: true });
    const obs = await i.intercept(makeCtx('GET'), makeNext({ fresh: true }));
    expect(await firstValueFrom(obs)).toEqual({ cached: true });
  });

  it('GET cache miss → returns fresh + caches', async () => {
    const obs = await i.intercept(makeCtx('GET', '/x', 'u'), makeNext({ fresh: true }));
    expect(await firstValueFrom(obs)).toEqual({ fresh: true });
    await new Promise((r) => setTimeout(r, 10));
    expect((redis as { raw: { set: jest.Mock } }).raw.set).toHaveBeenCalled();
  });

  it('anonymous user (no user) → uses anon key', async () => {
    const obs = await i.intercept(makeCtx('GET'), makeNext({ id: 'n' }));
    expect(await firstValueFrom(obs)).toEqual({ id: 'n' });
  });

  it('cache get error → falls through', async () => {
    (redis as { get: jest.Mock }).get.mockRejectedValueOnce(new Error('redis down'));
    const obs = await i.intercept(makeCtx('GET'), makeNext({ id: 'n' }));
    expect(await firstValueFrom(obs)).toEqual({ id: 'n' });
  });

  it('cache hit with null value → miss', async () => {
    (redis as { get: jest.Mock }).get.mockResolvedValueOnce(null);
    const obs = await i.intercept(makeCtx('GET'), makeNext({ id: 'n' }));
    expect(await firstValueFrom(obs)).toEqual({ id: 'n' });
  });

  it('cache hit with undefined → miss', async () => {
    (redis as { get: jest.Mock }).get.mockResolvedValueOnce(undefined);
    const obs = await i.intercept(makeCtx('GET'), makeNext({ id: 'n' }));
    expect(await firstValueFrom(obs)).toEqual({ id: 'n' });
  });
});
