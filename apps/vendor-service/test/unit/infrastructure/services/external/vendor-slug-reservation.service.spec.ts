import { jest } from '@jest/globals';
import { VendorSlugReservationService } from '../../../../../src/module/infrastructure/services/external/vendor-slug-reservation.service.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

function makeRedisMock(): jest.Mocked<RedisService> {
  return {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    exists: jest.fn(),
    isHealthy: jest.fn(),
  } as unknown as jest.Mocked<RedisService>;
}

describe('VendorSlugReservationService', () => {
  let service: VendorSlugReservationService;
  let redis: jest.Mocked<RedisService>;

  beforeEach(() => {
    redis = makeRedisMock();
    service = new VendorSlugReservationService(redis);
  });

  describe('reserve()', () => {
    it('reserves when slug free', async () => {
      redis.get.mockResolvedValue(null);
      const r = await service.reserve('acme', 'user-1');
      expect(r).not.toBeNull();
      expect(r?.slug).toBe('acme');
      expect(r?.reservedBy).toBe('user-1');
      expect(redis.set).toHaveBeenCalled();
    });

    it('returns null when already reserved', async () => {
      redis.get.mockResolvedValue({ slug: 'acme', reservedBy: 'other' });
      const r = await service.reserve('acme', 'user-1');
      expect(r).toBeNull();
    });
  });

  describe('release()', () => {
    it('releases when owner matches', async () => {
      redis.get.mockResolvedValue({ slug: 'acme', reservedBy: 'user-1' });
      const r = await service.release('acme', 'user-1');
      expect(r).toBe(true);
      expect(redis.del).toHaveBeenCalled();
    });

    it('returns false when owner mismatches', async () => {
      redis.get.mockResolvedValue({ slug: 'acme', reservedBy: 'other' });
      const r = await service.release('acme', 'user-1');
      expect(r).toBe(false);
    });

    it('returns false when not reserved', async () => {
      redis.get.mockResolvedValue(null);
      const r = await service.release('acme', 'user-1');
      expect(r).toBe(false);
    });
  });

  describe('extend()', () => {
    it('extends when owner matches', async () => {
      redis.get.mockResolvedValue({
        slug: 'acme',
        reservedBy: 'user-1',
        expiresAt: '2026-01-01T00:00:00Z',
        reservedAt: '2026-01-01T00:00:00Z',
      });
      const r = await service.extend('acme', 'user-1');
      expect(r).toBe(true);
      expect(redis.set).toHaveBeenCalled();
    });

    it('returns false when owner mismatches', async () => {
      redis.get.mockResolvedValue({ slug: 'acme', reservedBy: 'other' });
      const r = await service.extend('acme', 'user-1');
      expect(r).toBe(false);
    });

    it('returns false when not reserved', async () => {
      redis.get.mockResolvedValue(null);
      expect(await service.extend('acme', 'user-1')).toBe(false);
    });
  });

  describe('getReservation()', () => {
    it('returns reservation when exists', async () => {
      const reservation = {
        slug: 'acme',
        reservedBy: 'user-1',
        reservedAt: '2026-01-01T00:00:00Z',
        expiresAt: '2026-01-01T00:10:00Z',
      };
      redis.get.mockResolvedValue(reservation);
      const r = await service.getReservation('acme');
      expect(r).toEqual(reservation);
    });

    it('returns null when not reserved', async () => {
      redis.get.mockResolvedValue(null);
      expect(await service.getReservation('acme')).toBeNull();
    });
  });

  describe('isReserved()', () => {
    it('true when exists', async () => {
      redis.exists.mockResolvedValue(true);
      expect(await service.isReserved('acme')).toBe(true);
    });

    it('false when not exists', async () => {
      redis.exists.mockResolvedValue(false);
      expect(await service.isReserved('acme')).toBe(false);
    });
  });
});
