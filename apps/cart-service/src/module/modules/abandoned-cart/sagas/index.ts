import { CartAbandonmentSaga } from '../../../application/sagas/cart-abandonment.saga.js';
import { CartRecoverySaga } from '../../../application/sagas/cart-recovery.saga.js';

export const ABANDONED_CART_SAGAS = [
  CartAbandonmentSaga,
  CartRecoverySaga,
] as const;

export { CartAbandonmentSaga, CartRecoverySaga };
