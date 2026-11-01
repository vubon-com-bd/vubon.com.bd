/**
 * Delivery Sagas Barrel
 * @module order-service/modules/delivery/sagas
 */
import { OrderDeliverySaga } from '../../../application/sagas/order-delivery.saga.js';
import { OrderShippingSaga } from '../../../application/sagas/order-shipping.saga.js';

export const DELIVERY_SAGAS = [OrderDeliverySaga, OrderShippingSaga] as const;

export { OrderDeliverySaga, OrderShippingSaga };
