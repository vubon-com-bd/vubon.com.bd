/**
 * Product Sagas Barrel
 * @module product-service/modules/product/sagas
 */
import { ProductPublishSaga } from '../../../application/sagas/product-publish.saga.js';

export const PRODUCT_SAGAS = [ProductPublishSaga] as const;

export { ProductPublishSaga };
