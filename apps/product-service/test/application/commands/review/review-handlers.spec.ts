/**
 * Review Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { SubmitReviewHandler } from '../../../../src/module/application/commands/review/submit-review.handler.js';
import { SubmitReviewCommand } from '../../../../src/module/application/commands/review/submit-review.command.js';
import { UpdateReviewHandler } from '../../../../src/module/application/commands/review/update-review.handler.js';
import { UpdateReviewCommand } from '../../../../src/module/application/commands/review/update-review.command.js';
import { ApproveReviewHandler } from '../../../../src/module/application/commands/review/approve-review.handler.js';
import { ApproveReviewCommand } from '../../../../src/module/application/commands/review/approve-review.command.js';
import { RejectReviewHandler } from '../../../../src/module/application/commands/review/reject-review.handler.js';
import { RejectReviewCommand } from '../../../../src/module/application/commands/review/reject-review.command.js';
import { DeleteReviewHandler } from '../../../../src/module/application/commands/review/delete-review.handler.js';
import { DeleteReviewCommand } from '../../../../src/module/application/commands/review/delete-review.command.js';
import { MarkReviewHelpfulHandler } from '../../../../src/module/application/commands/review/mark-review-helpful.handler.js';
import { MarkReviewHelpfulCommand } from '../../../../src/module/application/commands/review/mark-review-helpful.command.js';
import { ReportReviewHandler } from '../../../../src/module/application/commands/review/report-review.handler.js';
import { ReportReviewCommand } from '../../../../src/module/application/commands/review/report-review.command.js';
import { createMockReviewService, type MockedReviewService } from '../../../mocks/services.js';
import { USER_ID, PRODUCT_ID } from '../../../helpers.js';

describe('Review Command Handlers', () => {
  let service: MockedReviewService;

  beforeEach(() => {
    service = createMockReviewService();
    service.submit.mockResolvedValue({} as never);
    service.update.mockResolvedValue({} as never);
    service.approve.mockResolvedValue({} as never);
    service.reject.mockResolvedValue({} as never);
    service.remove.mockResolvedValue(undefined);
    service.markHelpful.mockResolvedValue({} as never);
    service.report.mockResolvedValue({} as never);
  });

  describe('SubmitReviewHandler', () => {
    it('should call service.submit with dto', async () => {
      const handler = new SubmitReviewHandler(service);
      const dto = {
        productId: PRODUCT_ID,
        userId: USER_ID,
        rating: 5,
        comment: 'Excellent product with quality',
      };

      await handler.execute(new SubmitReviewCommand(dto as never));

      expect(service.submit).toHaveBeenCalledWith(dto);
    });
  });

  describe('UpdateReviewHandler', () => {
    it('should call service.update with dto', async () => {
      const handler = new UpdateReviewHandler(service);
      const dto = { reviewId: 'rev-1', rating: 4, updatedBy: USER_ID };

      await handler.execute(new UpdateReviewCommand(dto as never));

      expect(service.update).toHaveBeenCalledWith(dto);
    });
  });

  describe('ApproveReviewHandler', () => {
    it('should call service.approve with reviewId + moderatorId', async () => {
      const handler = new ApproveReviewHandler(service);

      await handler.execute(new ApproveReviewCommand('rev-1', USER_ID));

      expect(service.approve).toHaveBeenCalledWith('rev-1', USER_ID);
    });
  });

  describe('RejectReviewHandler', () => {
    it('should call service.reject with reason', async () => {
      const handler = new RejectReviewHandler(service);

      await handler.execute(new RejectReviewCommand('rev-1', 'off-topic', USER_ID));

      expect(service.reject).toHaveBeenCalledWith('rev-1', USER_ID, 'off-topic');
    });
  });

  describe('DeleteReviewHandler', () => {
    it('should call service.remove', async () => {
      const handler = new DeleteReviewHandler(service);

      await handler.execute(new DeleteReviewCommand('rev-1', USER_ID));

      expect(service.remove).toHaveBeenCalledWith('rev-1', USER_ID);
    });
  });

  describe('MarkReviewHelpfulHandler', () => {
    it('should call service.markHelpful', async () => {
      const handler = new MarkReviewHelpfulHandler(service);

      await handler.execute(new MarkReviewHelpfulCommand('rev-1', USER_ID));

      expect(service.markHelpful).toHaveBeenCalledWith('rev-1', USER_ID);
    });
  });

  describe('ReportReviewHandler', () => {
    it('should call service.report', async () => {
      const handler = new ReportReviewHandler(service);

      await handler.execute(new ReportReviewCommand('rev-1', USER_ID, 'spam'));

      expect(service.report).toHaveBeenCalledWith('rev-1', USER_ID, 'spam');
    });
  });
});
