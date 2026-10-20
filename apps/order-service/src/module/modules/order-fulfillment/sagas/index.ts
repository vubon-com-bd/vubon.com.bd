/**
 * OrderFulfillment Sagas Barrel
 * @module order-service/modules/order-fulfillment/sagas
 */
import { OrderFulfillmentSaga } from '../../../application/sagas/order-fulfillment.saga.js';

export const ORDER_FULFILLMENT_SAGAS = [OrderFulfillmentSaga] as const;

export { OrderFulfillmentSaga };
