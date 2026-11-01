/**
 * ProductReview Sagas Barrel
 * @module product-service/modules/product-review/sagas
 */
import { ProductReviewSaga } from '../../../application/sagas/product-review.saga.js';

export const REVIEW_SAGAS = [ProductReviewSaga] as const;

export { ProductReviewSaga };
