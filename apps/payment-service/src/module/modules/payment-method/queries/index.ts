/**
 * Payment Method Query Handlers — Barrel
 * @module payment-service/modules/payment-method/queries
 */
import { ListMethodsHandler } from '@application/queries/method/list-methods.handler';
import { GetMethodHandler } from '@application/queries/method/get-method.handler';

export const PAYMENT_METHOD_QUERY_HANDLERS = [
  ListMethodsHandler,
  GetMethodHandler,
] as const;
