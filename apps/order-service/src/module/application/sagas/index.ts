// application/sagas/index.ts — Sagas barrel
export * from './commands/index.js';
export * from './order-checkout.saga.js';
export * from './order-payment.saga.js';
export * from './order-fulfillment.saga.js';
export * from './order-shipping.saga.js';
export * from './order-delivery.saga.js';
export * from './order-cancel.saga.js';
export * from './order-return.saga.js';

import { OrderCheckoutSaga } from './order-checkout.saga.js';
import { OrderPaymentSaga } from './order-payment.saga.js';
import { OrderFulfillmentSaga } from './order-fulfillment.saga.js';
import { OrderShippingSaga } from './order-shipping.saga.js';
import { OrderDeliverySaga } from './order-delivery.saga.js';
import { OrderCancelSaga } from './order-cancel.saga.js';
import { OrderReturnSaga } from './order-return.saga.js';

export const ALL_SAGAS = [
  OrderCheckoutSaga,
  OrderPaymentSaga,
  OrderFulfillmentSaga,
  OrderShippingSaga,
  OrderDeliverySaga,
  OrderCancelSaga,
  OrderReturnSaga,
] as const;
