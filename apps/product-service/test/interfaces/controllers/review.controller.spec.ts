import { jest } from '@jest/globals';
import { ProductReviewController } from '../../../src/module/interfaces/controllers/rest/product-review.controller.js';
import { SubmitReviewCommand } from '../../../src/module/application/commands/review/submit-review.command.js';
import { UpdateReviewCommand } from '../../../src/module/application/commands/review/update-review.command.js';
import { ApproveReviewCommand } from '../../../src/module/application/commands/review/approve-review.command.js';
import { RejectReviewCommand } from '../../../src/module/application/commands/review/reject-review.command.js';
import { DeleteReviewCommand } from '../../../src/module/application/commands/review/delete-review.command.js';
import { ListReviewsByProductQuery } from '../../../src/module/application/queries/review/list-reviews-by-product.query.js';
import { GetReviewStatsQuery } from '../../../src/module/application/queries/review/get-review-stats.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockUser, mockAdmin } from '../../mocks/users.js';
import { PRODUCT_ID, USER_ID } from '../../helpers.js';

describe('ProductReviewController', () => {
  let controller: ProductReviewController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new ProductReviewController(commandBus, queryBus);
  });

  it('submit should dispatch SubmitReviewCommand with userId', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.submit(
      { productId: PRODUCT_ID, rating: 5, comment: 'Great product with quality' } as never,
      mockUser() as never,
    );
    const cmd = commandBus.execute.mock.calls[0][0] as SubmitReviewCommand;
    expect(cmd.dto.userId).toBe(USER_ID);
  });

  it('listByProduct should dispatch ListReviewsByProductQuery', async () => {
    queryBus.execute.mockResolvedValueOnce({ items: [], total: 0 });
    await controller.listByProduct(PRODUCT_ID, 1, 20);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListReviewsByProductQuery));
  });

  it('stats should dispatch GetReviewStatsQuery', async () => {
    queryBus.execute.mockResolvedValueOnce(null);
    await controller.stats(PRODUCT_ID);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetReviewStatsQuery));
  });

  it('update should dispatch UpdateReviewCommand with updatedBy', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.update('rev-1', { rating: 4 } as never, mockUser() as never);
    const cmd = commandBus.execute.mock.calls[0][0] as UpdateReviewCommand;
    expect(cmd.dto.reviewId).toBe('rev-1');
    expect(cmd.dto.updatedBy).toBe(USER_ID);
  });

  it('approve should dispatch ApproveReviewCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.approve('rev-1', mockAdmin() as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(ApproveReviewCommand));
  });

  it('reject should dispatch RejectReviewCommand with reason', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.reject('rev-1', { reason: 'off-topic' }, mockAdmin() as never);
    const cmd = commandBus.execute.mock.calls[0][0] as RejectReviewCommand;
    expect(cmd.reason).toBe('off-topic');
  });

  it('remove should dispatch DeleteReviewCommand', async () => {
    commandBus.execute.mockResolvedValueOnce(undefined);
    await controller.remove('rev-1', mockUser() as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteReviewCommand));
  });
});
