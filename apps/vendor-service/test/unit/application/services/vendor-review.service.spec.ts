import { jest } from '@jest/globals';
import { VendorReviewService } from '../../../../src/module/application/services/impl/vendor-review.service.js';
import type { VendorReviewRepository } from '../../../../src/module/domain/repositories/vendor-review.repository.interface.js';
import { VendorReviewEntity } from '../../../../src/module/domain/entities/vendor-review.entity.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorReviewStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-review-status.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makeReview(): VendorReviewEntity {
  return VendorReviewEntity.create({
    id: UUID,
    vendorId: UUID,
    userId: UUID,
    orderId: UUID,
    rating: RatingScoreVO.create(5),
    comment: 'Great service and products!',
    isVerifiedPurchase: true,
    now: NOW,
  });
}

function makeRepoMock(): jest.Mocked<VendorReviewRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findByUserId: jest.fn(),
    findByOrderId: jest.fn(),
    findByStatus: jest.fn(),
    findPaginated: jest.fn(),
    search: jest.fn(),
    findPendingModeration: jest.fn(),
    findFlagged: jest.fn(),
    findHidden: jest.fn(),
    findPublicByVendorId: jest.fn(),
    countByVendor: jest.fn(),
    countByStatus: jest.fn(),
    countVerifiedByVendorId: jest.fn(),
    existsByOrderId: jest.fn(),
    getVendorAverageRating: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorReviewRepository>;
}

describe('VendorReviewService', () => {
  let service: VendorReviewService;
  let repo: jest.Mocked<VendorReviewRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorReviewService(repo);
  });

  describe('submit()', () => {
    it('creates + saves review', async () => {
      const r = makeReview();
      repo.save.mockResolvedValue(r);
      const result = await service.submit({
        vendorId: UUID,
        userId: UUID,
        orderId: UUID,
        rating: 5,
        comment: 'Great service and products!',
        isVerifiedPurchase: true,
      });
      expect(result.id).toBe(UUID);
    });
  });

  describe('approve()', () => {
    it('approves pending review', async () => {
      const r = makeReview();
      repo.findById.mockResolvedValue(r);
      repo.save.mockResolvedValue(r);
      const result = await service.approve(UUID);
      expect(result.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.approve(UUID)).rejects.toThrow();
    });
  });

  describe('reject()', () => {
    it('rejects pending review', async () => {
      const r = makeReview();
      repo.findById.mockResolvedValue(r);
      repo.save.mockResolvedValue(r);
      const result = await service.reject(UUID, 'offensive');
      expect(result.id).toBe(UUID);
    });
  });

  describe('flag()', () => {
    it('flags pending review', async () => {
      const r = makeReview();
      repo.findById.mockResolvedValue(r);
      repo.save.mockResolvedValue(r);
      const result = await service.flag(UUID, 'spam');
      expect(result.id).toBe(UUID);
    });
  });

  describe('hide()', () => {
    it('hides approved review', async () => {
      const r = makeReview();
      r.approve(NOW);
      repo.findById.mockResolvedValue(r);
      repo.save.mockResolvedValue(r);
      const result = await service.hide(UUID, 'manual');
      expect(result.id).toBe(UUID);
    });
  });

  describe('restore()', () => {
    it('restores hidden review', async () => {
      const r = makeReview();
      r.approve(NOW);
      r.hide('manual', NOW);
      repo.findById.mockResolvedValue(r);
      repo.save.mockResolvedValue(r);
      const result = await service.restore(UUID);
      expect(result.id).toBe(UUID);
    });
  });

  describe('getById()', () => {
    it('returns review', async () => {
      repo.findById.mockResolvedValue(makeReview());
      const result = await service.getById(UUID);
      expect(result.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow();
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makeReview()]);
      const result = await service.listByVendor(UUID);
      expect(result).toHaveLength(1);
    });
  });

  describe('listPublicByVendor()', () => {
    it('returns public list', async () => {
      repo.findPublicByVendorId.mockResolvedValue([makeReview()]);
      const result = await service.listPublicByVendor(UUID);
      expect(result).toHaveLength(1);
    });
  });
});
