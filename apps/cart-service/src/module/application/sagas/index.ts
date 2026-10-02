// application/sagas/index.ts
export * from './cart-abandonment.saga.js';
export * from './cart-recovery.saga.js';
export * from './price-sync.saga.js';
export * from './stock-sync.saga.js';
export * from './commands/index.js';

import { CartAbandonmentSaga } from './cart-abandonment.saga.js';
import { CartRecoverySaga } from './cart-recovery.saga.js';
import { PriceSyncSaga } from './price-sync.saga.js';
import { StockSyncSaga } from './stock-sync.saga.js';

export const ALL_SAGAS = [
  CartAbandonmentSaga,
  CartRecoverySaga,
  PriceSyncSaga,
  StockSyncSaga,
] as const;
