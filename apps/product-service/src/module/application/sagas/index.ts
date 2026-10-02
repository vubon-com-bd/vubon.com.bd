// application/sagas/index.ts
export * from './product-publish.saga.js';
export * from './stock-alert.saga.js';
export * from './review-moderation.saga.js';

import { ProductPublishSaga } from './product-publish.saga.js';
import { StockAlertSaga } from './stock-alert.saga.js';
import { ReviewModerationSaga } from './review-moderation.saga.js';

export const SAGA_PROVIDERS = [
  ProductPublishSaga,
  StockAlertSaga,
  ReviewModerationSaga,
] as const;
