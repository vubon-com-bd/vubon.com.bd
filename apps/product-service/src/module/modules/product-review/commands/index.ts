/**
 * ProductReview Command Handlers Barrel
 * @module product-service/modules/product-review/commands
 */
import { SubmitReviewHandler } from '../../../application/commands/review/submit-review.handler.js';
import { UpdateReviewHandler } from '../../../application/commands/review/update-review.handler.js';
import { DeleteReviewHandler } from '../../../application/commands/review/delete-review.handler.js';
import { ApproveReviewHandler } from '../../../application/commands/review/approve-review.handler.js';
import { RejectReviewHandler } from '../../../application/commands/review/reject-review.handler.js';

export const REVIEW_COMMAND_HANDLERS = [
  SubmitReviewHandler,
  UpdateReviewHandler,
  DeleteReviewHandler,
  ApproveReviewHandler,
  RejectReviewHandler,
] as const;

export {
  SubmitReviewHandler,
  UpdateReviewHandler,
  DeleteReviewHandler,
  ApproveReviewHandler,
  RejectReviewHandler,
};
