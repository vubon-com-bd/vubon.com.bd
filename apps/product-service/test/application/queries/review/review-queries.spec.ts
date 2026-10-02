/**
 * Review Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { ListReviewsByProductHandler } from '../../../../src/module/application/queries/review/list-reviews-by-product.handler.js';
import { ListReviewsByProductQuery } from '../../../../src/module/application/queries/review/list-reviews-by-product.query.js';
import { GetReviewStatsHandler } from '../../../../src/module/application/queries/review/get-review-stats.handler.js';
import { GetReviewStatsQuery } from '../../../../src/module/application/queries/review/get-review-stats.query.js';
import { createMockReviewService, type MockedReviewService } from '../../../mocks/services.js';
import { mockReviewResponse } from '../../../mocks/responses.js';
import { PRODUCT_ID } from '../../../helpers.js';

describe('Review Query Handlers', () => {
  let service: MockedReviewService;

  beforeEach(() => {
    service = createMockReviewService();
    service.listByProduct.mockResolvedValue({
      items: [mockReviewResponse()],
      total: 1,
    });
    service.statsByProduct.mockResolvedValue({
      productId: PRODUCT_ID as never,
      totalReviews: 10,
      averageRating: 4.5,
      ratingDistribution: { 1: 0, 2: 1, 3: 1, 4: 3, 5: 5 },
    });
  });

  describe('ListReviewsByProductHandler', () => {
    it('should call service.listByProduct', async () => {
      const handler = new ListReviewsByProductHandler(service);
      const result = await handler.execute(new ListReviewsByProductQuery(PRODUCT_ID, 1, 20));
      expect(service.listByProduct).toHaveBeenCalledWith(PRODUCT_ID, 1, 20);
      expect(result.total).toBe(1);
    });
  });

  describe('GetReviewStatsHandler', () => {
    it('should return stats', async () => {
      const handler = new GetReviewStatsHandler(service);
      const result = await handler.execute(new GetReviewStatsQuery(PRODUCT_ID));
      expect(result?.totalReviews).toBe(10);
      expect(result?.averageRating).toBe(4.5);
    });

    it('should return null when service returns null', async () => {
      service.statsByProduct.mockResolvedValueOnce(null);
      const handler = new GetReviewStatsHandler(service);
      expect(await handler.execute(new GetReviewStatsQuery(PRODUCT_ID))).toBeNull();
    });
  });
});
