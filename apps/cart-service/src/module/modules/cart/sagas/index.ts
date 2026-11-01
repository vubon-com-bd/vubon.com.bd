/**
 * Cart Sagas Barrel
 * @module cart-service/modules/cart/sagas
 */
import { PriceSyncSaga } from '../../../application/sagas/price-sync.saga.js';
import { StockSyncSaga } from '../../../application/sagas/stock-sync.saga.js';

export const CART_SAGAS = [
  PriceSyncSaga,
  StockSyncSaga,
] as const;

export { PriceSyncSaga, StockSyncSaga };
