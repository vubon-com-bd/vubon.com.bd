/**
 * OrderReturn Sagas Barrel
 * @module order-service/modules/order-return/sagas
 */
import { OrderReturnSaga } from '../../../application/sagas/order-return.saga.js';

export const ORDER_RETURN_SAGAS = [OrderReturnSaga] as const;

export { OrderReturnSaga };
