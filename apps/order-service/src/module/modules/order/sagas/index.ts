/**
 * Order Sagas Barrel
 * @module order-service/modules/order/sagas
 */
import { OrderCheckoutSaga } from '../../../application/sagas/order-checkout.saga.js';
import { OrderPaymentSaga } from '../../../application/sagas/order-payment.saga.js';

export const ORDER_SAGAS = [OrderCheckoutSaga, OrderPaymentSaga] as const;

export { OrderCheckoutSaga, OrderPaymentSaga };
