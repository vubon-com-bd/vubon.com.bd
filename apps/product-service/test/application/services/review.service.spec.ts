/**
 * ReviewService — unit tests
 */
import { jest } from '@jest/globals';
import { ReviewService } from '../../../src/module/application/services/impl/review.service.js';
import {
  ReviewNotFoundApplicationError,
  ReviewAlreadySubmittedApplicationError,
} from '../../../src/module/application/errors/review.errors.js';
import { createMockReviewRepository, type MockedReviewRepository } from '../../mocks/repositories.js';
import { buildReview } from '../../fixtures.js';
import { ProductReviewEntity } from '../../../src/module/domain/entities/product-review.entity.js';
import { ReviewRatingVO } from '../../../src/module/domain/value-objects/primitives/review-rating.vo.js';
import { ReviewCommentVO } from '../../../src/module/domain/value-objects/primitives/review-comment.vo.js';
import { REVIEW_STATUS } from '@vubon/shared-constants/business/product';
import { PRODUCT_ID, USER_ID, REVIEW_ID } from '../../helpers.js';

describe('ReviewService', () => {
  let service: ReviewService;
  let repo: MockedReviewRepository;

  beforeEach(() => {
    repo = createMockReviewRepository();
    repo.save.mockImplementation(async (e) => e);
    repo.existsByUserAndProduct.mockResolvedValue(false);
    service = new ReviewService(repo);
  });

  describe('submit()', () => {
    it('should submit review', async () => {
      const result = await service.submit({
        productId: PRODUCT_ID,
        userId: USER_ID,
        rating: 5,
        comment: 'Excellent product with great quality and fast delivery',
      });
      expect(result.rating).toBe(5);
      expect(repo.save).toHaveBeenCalled();
    });

    it('should reject duplicate review', async () => {
      repo.existsByUserAndProduct.mockResolvedValueOnce(true);
      await expect(
        service.submit({
          productId: PRODUCT_ID,
          userId: USER_ID,
          rating: 5,
          comment: 'Excellent product with great quality',
        }),
      ).rejects.toThrow(ReviewAlreadySubmittedApplicationError);
    });
  });

  describe('update()', () => {
    it('should update review', async () => {
      // Must be APPROVED + created recently to be editable
      const nowIso = new Date().toISOString();
      const review = ProductReviewEntity.reconstitute({
        id: REVIEW_ID,
        createdAt: nowIso,
        updatedAt: nowIso,
        props: {
          productId: buildReview().productId,
          userId: USER_ID,
          rating: ReviewRatingVO.create(5),
          comment: ReviewCommentVO.create('Original comment with proper length'),
          images: [],
          status: REVIEW_STATUS.APPROVED,
          isVerifiedPurchase: true,
          helpfulCount: 0,
          reportCount: 0,
          createdAt: nowIso,
          updatedAt: nowIso,
        },
      });
      repo.findById.mockResolvedValueOnce(review);

      const result = await service.update({
        reviewId: REVIEW_ID,
        rating: 4,
        comment: 'Updated comment with proper length',
        updatedBy: USER_ID,
      });
      expect(result.rating).toBe(4);
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(
        service.update({ reviewId: 'missing', updatedBy: USER_ID }),
      ).rejects.toThrow(ReviewNotFoundApplicationError);
    });
  });

  describe('approve()', () => {
    it('should approve review', async () => {
      const review = buildReview();
      repo.findById.mockResolvedValueOnce(review);

      const result = await service.approve(REVIEW_ID, USER_ID);
      expect(result.status).toBe(REVIEW_STATUS.APPROVED);
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(service.approve('missing', USER_ID)).rejects.toThrow(ReviewNotFoundApplicationError);
    });
  });

  describe('reject()', () => {
    it('should reject review', async () => {
      const review = buildReview();
      repo.findById.mockResolvedValueOnce(review);

      const result = await service.reject(REVIEW_ID, USER_ID, 'off-topic');
      expect(result.status).toBe(REVIEW_STATUS.REJECTED);
    });
  });

  describe('remove()', () => {
    it('should soft delete', async () => {
      const review = buildReview();
      repo.findById.mockResolvedValueOnce(review);
      await service.remove(REVIEW_ID, USER_ID);
      expect(review.status).toBe(REVIEW_STATUS.DELETED);
    });
  });

  describe('markHelpful()', () => {
    it('should increment helpful count', async () => {
      const review = buildReview();
      repo.findById.mockResolvedValueOnce(review);

      const result = await service.markHelpful(REVIEW_ID, USER_ID);
      expect(result.helpfulCount).toBe(1);
    });
  });

  describe('report()', () => {
    it('should increment report count', async () => {
      const review = buildReview();
      repo.findById.mockResolvedValueOnce(review);

      const result = await service.report(REVIEW_ID, USER_ID, 'spam');
      expect(result.reportCount).toBe(1);
    });
  });

  describe('listByProduct()', () => {
    it('should return paginated reviews', async () => {
      repo.findPaginatedByProduct.mockResolvedValueOnce({
        items: [buildReview()],
        total: 1,
        page: 1,
        limit: 20,
      });

      const result = await service.listByProduct(PRODUCT_ID, 1, 20);
      expect(result.total).toBe(1);
      expect(result.items.length).toBe(1);
    });
  });

  describe('statsByProduct()', () => {
    it('should return null when no reviews', async () => {
      repo.aggregateRatings.mockResolvedValueOnce(null);
      expect(await service.statsByProduct(PRODUCT_ID)).toBeNull();
    });

    it('should return stats', async () => {
      repo.aggregateRatings.mockResolvedValueOnce({
        productId: PRODUCT_ID,
        totalReviews: 10,
        averageRating: 4.5,
        distribution: { 1: 0, 2: 1, 3: 1, 4: 3, 5: 5 },
      });

      const result = await service.statsByProduct(PRODUCT_ID);
      expect(result?.totalReviews).toBe(10);
      expect(result?.averageRating).toBe(4.5);
    });
  });
});
