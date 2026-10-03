// application/commands/review/index.ts
export * from './submit-review.command.js';
export * from './submit-review.handler.js';
export * from './update-review.command.js';
export * from './update-review.handler.js';
export * from './approve-review.command.js';
export * from './approve-review.handler.js';
export * from './reject-review.command.js';
export * from './reject-review.handler.js';
export * from './delete-review.command.js';
export * from './delete-review.handler.js';
export * from './mark-review-helpful.command.js';
export * from './mark-review-helpful.handler.js';
export * from './report-review.command.js';
export * from './report-review.handler.js';

import { SubmitReviewHandler } from './submit-review.handler.js';
import { UpdateReviewHandler } from './update-review.handler.js';
import { ApproveReviewHandler } from './approve-review.handler.js';
import { RejectReviewHandler } from './reject-review.handler.js';
import { DeleteReviewHandler } from './delete-review.handler.js';
import { MarkReviewHelpfulHandler } from './mark-review-helpful.handler.js';
import { ReportReviewHandler } from './report-review.handler.js';

export const REVIEW_COMMAND_HANDLERS = [
  SubmitReviewHandler,
  UpdateReviewHandler,
  ApproveReviewHandler,
  RejectReviewHandler,
  DeleteReviewHandler,
  MarkReviewHelpfulHandler,
  ReportReviewHandler,
] as const;
