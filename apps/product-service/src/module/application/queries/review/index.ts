// application/queries/review/index.ts
export * from './list-reviews-by-product.query.js';
export * from './list-reviews-by-product.handler.js';
export * from './get-review-stats.query.js';
export * from './get-review-stats.handler.js';

import { ListReviewsByProductHandler } from './list-reviews-by-product.handler.js';
import { GetReviewStatsHandler } from './get-review-stats.handler.js';

export const REVIEW_QUERY_HANDLERS = [
  ListReviewsByProductHandler,
  GetReviewStatsHandler,
] as const;
