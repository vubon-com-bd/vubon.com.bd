import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { NotificationCacheInterceptor } from '../../../../src/module/interfaces/interceptors/notification-cache.interceptor.js';

function makeRedis() {
  return {
    get: jest.fn().mockResolvedValue(null),
    raw: { set: jest.fn().mockResolvedValue('OK') },
  } as never;
}

function makeCtx(method: string, url = '/notifications/1', userId = 'u'): never {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method, url, user: { userId } }),
    }),
  } as never;
}

function makeNext(value: unknown) {
  return { handle: () => of(value) } as never;
}

describe('NotificationCacheInterceptor', () => {
  let redis: ReturnType<typeof makeRedis>;
  let i: NotificationCacheInterceptor;
  beforeEach(() => {
    redis = makeRedis();
    i = new NotificationCacheInterceptor(redis as never);
  });

  it('passes through non-GET requests', async () => {
    const obs = await i.intercept(makeCtx('POST'), makeNext({ id: 'n' }));
    const v = await firstValueFrom(obs);
    expect(v).toEqual({ id: 'n' });
    expect((redis as { raw: { set: jest.Mock } }).raw.set).not.toHaveBeenCalled();
  });

  it('returns cached data on GET hit', async () => {
    (redis as { get: jest.Mock }).get.mockResolvedValueOnce({ cached: true });
    const obs = await i.intercept(makeCtx('GET'), makeNext({ id: 'n' }));
    const v = await firstValueFrom(obs);
    expect(v).toEqual({ cached: true });
  });

  it('caches GET response on miss', async () => {
    const obs = await i.intercept(makeCtx('GET'), makeNext({ id: 'n' }));
    const v = await firstValueFrom(obs);
    expect(v).toEqual({ id: 'n' });
    await new Promise((r) => setTimeout(r, 10));
    expect((redis as { raw: { set: jest.Mock } }).raw.set).toHaveBeenCalled();
  });

  it('handles anonymous user', async () => {
    const ctx = {
      switchToHttp: () => ({ getRequest: () => ({ method: 'GET', url: '/x', user: undefined }) }),
    } as never;
    const obs = await i.intercept(ctx, makeNext({ id: 'n' }));
    const v = await firstValueFrom(obs);
    expect(v).toEqual({ id: 'n' });
  });

  it('falls through when cache get errors', async () => {
    (redis as { get: jest.Mock }).get.mockRejectedValueOnce(new Error('redis down'));
    const obs = await i.intercept(makeCtx('GET'), makeNext({ id: 'n' }));
    const v = await firstValueFrom(obs);
    expect(v).toEqual({ id: 'n' });
  });
});
