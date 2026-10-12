import { jest } from '@jest/globals';
import { VendorRatingService } from '../../../../src/module/application/services/impl/vendor-rating.service.js';
import type { VendorRatingRepository } from '../../../../src/module/domain/repositories/vendor-rating.repository.interface.js';
import { VendorRatingEntity } from '../../../../src/module/domain/entities/vendor-rating.entity.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeRating(): VendorRatingEntity {
  return VendorRatingEntity.create({
    id: UUID,
    vendorId: UUID,
    now: new Date().toISOString(),
  });
}

function makeRepoMock(): jest.Mocked<VendorRatingRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    existsByVendorId: jest.fn(),
    findBelow: jest.fn(),
    findTopRated: jest.fn(),
    findAutoHideCandidates: jest.fn(),
    findWithMinReviews: jest.fn(),
    getStats: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorRatingRepository>;
}

describe('VendorRatingService', () => {
  let service: VendorRatingService;
  let repo: jest.Mocked<VendorRatingRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorRatingService(repo);
  });

  describe('initializeForVendor()', () => {
    it('creates + upserts', async () => {
      const r = makeRating();
      repo.upsert.mockResolvedValue(r);
      const result = await service.initializeForVendor(UUID);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('recordReview()', () => {
    it('records when rating exists', async () => {
      const r = makeRating();
      repo.findByVendorId.mockResolvedValue(r);
      repo.upsert.mockResolvedValue(r);
      const result = await service.recordReview(UUID, 5);
      expect(result.vendorId).toBe(UUID);
    });

    it('initializes when rating missing', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      const r = makeRating();
      repo.upsert.mockResolvedValue(r);
      const result = await service.recordReview(UUID, 5);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('removeReview()', () => {
    it('removes when rating exists', async () => {
      const r = makeRating();
      r.recordReview(5, new Date().toISOString());
      repo.findByVendorId.mockResolvedValue(r);
      repo.upsert.mockResolvedValue(r);
      const result = await service.removeReview(UUID, 5);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('recalculate()', () => {
    it('recomputes overall', async () => {
      const r = makeRating();
      r.recordReview(5, new Date().toISOString());
      repo.findByVendorId.mockResolvedValue(r);
      repo.upsert.mockResolvedValue(r);
      const result = await service.recalculate(UUID);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('getByVendorId()', () => {
    it('returns rating', async () => {
      repo.findByVendorId.mockResolvedValue(makeRating());
      const result = await service.getByVendorId(UUID);
      expect(result.vendorId).toBe(UUID);
    });

    it('initializes when missing', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      const result = await service.getByVendorId(UUID);
      expect(result.vendorId).toBe(UUID);
      expect(result.totalReviews).toBe(0);
    });
  });
});
