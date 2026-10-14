import { ListReviewsHandler } from '../../../application/queries/review/list-reviews.handler.js';
import { GetReviewStatsHandler } from '../../../application/queries/review/get-review-stats.handler.js';

export const VENDOR_REVIEW_QUERY_HANDLERS = [
  ListReviewsHandler,
  GetReviewStatsHandler,
] as const;

export { ListReviewsHandler, GetReviewStatsHandler };
