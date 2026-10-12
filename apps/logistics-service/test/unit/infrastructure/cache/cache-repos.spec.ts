/**
 * Cache repository tests (mocked RedisService).
 */
import { describe, it, expect, jest } from '@jest/globals';
import { ShipmentCacheRepository } from '@infrastructure/persistence/cache/repositories/shipment.cache.repository.js';
import { CourierCacheRepository } from '@infrastructure/persistence/cache/repositories/courier.cache.repository.js';
import { WarehouseCacheRepository } from '@infrastructure/persistence/cache/repositories/warehouse.cache.repository.js';
import { DeliveryCacheRepository } from '@infrastructure/persistence/cache/repositories/delivery.cache.repository.js';
import { TrackingCacheRepository } from '@infrastructure/persistence/cache/repositories/tracking.cache.repository.js';
import { RouteCacheRepository } from '@infrastructure/persistence/cache/repositories/route.cache.repository.js';
import { ZoneCacheRepository } from '@infrastructure/persistence/cache/repositories/zone.cache.repository.js';
import { ShippingMethodCacheRepository } from '@infrastructure/persistence/cache/repositories/shipping-method.cache.repository.js';

function mkRedis() {
  return {
    get: jest.fn(async () => null),
    set: jest.fn(async () => undefined),
    del: jest.fn(async () => undefined),
  } as never;
}

const cases: Array<[string, new (r: never) => unknown]> = [
  ['ShipmentCacheRepository', ShipmentCacheRepository as never],
  ['CourierCacheRepository', CourierCacheRepository as never],
  ['WarehouseCacheRepository', WarehouseCacheRepository as never],
  ['DeliveryCacheRepository', DeliveryCacheRepository as never],
  ['TrackingCacheRepository', TrackingCacheRepository as never],
  ['RouteCacheRepository', RouteCacheRepository as never],
  ['ZoneCacheRepository', ZoneCacheRepository as never],
  ['ShippingMethodCacheRepository', ShippingMethodCacheRepository as never],
];

describe.each(cases)('%s', (name, Repo) => {
  it('get() delegates to redis.get', async () => {
    const redis = mkRedis();
    const r = new Repo(redis);
    await (r as { get: (id: string) => Promise<unknown> }).get('x1');
    expect((redis as never as { get: jest.Mock }).get).toHaveBeenCalled();
  });

  it('set() delegates to redis.set', async () => {
    const redis = mkRedis();
    const r = new Repo(redis);
    await (r as { set: (id: string, v: unknown) => Promise<void> }).set('x1', {});
    expect((redis as never as { set: jest.Mock }).set).toHaveBeenCalled();
  });

  it('invalidate() delegates to redis.del', async () => {
    const redis = mkRedis();
    const r = new Repo(redis);
    await (r as { invalidate: (id: string) => Promise<void> }).invalidate('x1');
    expect((redis as never as { del: jest.Mock }).del).toHaveBeenCalled();
  });
});

describe('TrackingCacheRepository public helpers', () => {
  it('getPublic/setPublic/invalidatePublic', async () => {
    const redis = mkRedis();
    const r = new TrackingCacheRepository(redis);
    await r.getPublic('SH1');
    await r.setPublic('SH1', {} as never);
    await r.invalidatePublic('SH1');
    expect((redis as never as { get: jest.Mock }).get).toHaveBeenCalled();
  });
});

describe('InvalidateList methods', () => {
  it('Shipment.invalidateList', async () => {
    const redis = mkRedis();
    const r = new ShipmentCacheRepository(redis);
    await r.invalidateList('u1', 'o1');
    expect((redis as never as { del: jest.Mock }).del).toHaveBeenCalled();
  });
  it('Courier.invalidateList', async () => {
    const redis = mkRedis();
    const r = new CourierCacheRepository(redis);
    await r.invalidateList();
    expect((redis as never as { del: jest.Mock }).del).toHaveBeenCalled();
  });
  it('Delivery.invalidateList', async () => {
    const redis = mkRedis();
    const r = new DeliveryCacheRepository(redis);
    await r.invalidateList('d1');
    expect((redis as never as { del: jest.Mock }).del).toHaveBeenCalled();
  });
  it('Zone.invalidateList + ShippingMethod.invalidateList + Route.invalidateList + Warehouse.invalidateList', async () => {
    for (const R of [ZoneCacheRepository, ShippingMethodCacheRepository, RouteCacheRepository, WarehouseCacheRepository]) {
      const redis = mkRedis();
      const r = new R(redis);
      await (r as { invalidateList: () => Promise<void> }).invalidateList();
      expect((redis as never as { del: jest.Mock }).del).toHaveBeenCalled();
    }
  });
});
