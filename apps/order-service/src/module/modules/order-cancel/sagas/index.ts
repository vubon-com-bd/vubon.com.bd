/**
 * OrderCancel Sagas Barrel
 * @module order-service/modules/order-cancel/sagas
 */
import { OrderCancelSaga } from '../../../application/sagas/order-cancel.saga.js';

export const ORDER_CANCEL_SAGAS = [OrderCancelSaga] as const;

export { OrderCancelSaga };
