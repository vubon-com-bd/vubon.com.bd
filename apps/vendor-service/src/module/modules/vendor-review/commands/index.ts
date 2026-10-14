import { SubmitReviewHandler } from '../../../application/commands/review/submit-review.handler.js';
import { RespondReviewHandler } from '../../../application/commands/review/respond-review.handler.js';

export const VENDOR_REVIEW_COMMAND_HANDLERS = [
  SubmitReviewHandler,
  RespondReviewHandler,
] as const;

export { SubmitReviewHandler, RespondReviewHandler };
