// application/queries/payment/index.ts
import { GetPaymentHandler } from './get-payment.handler.js';
import { GetPaymentDetailHandler } from './get-payment-detail.handler.js';
import { GetPaymentPublicHandler } from './get-payment-public.handler.js';
import { ListPaymentsHandler } from './list-payments.handler.js';
import { ListPaymentsByUserHandler } from './list-payments-by-user.handler.js';
import { ListPaymentsByOrderHandler } from './list-payments-by-order.handler.js';
import { GetPaymentStatsHandler } from './get-payment-stats.handler.js';

export * from './get-payment.query.js';
export * from './get-payment.handler.js';
export * from './get-payment-detail.query.js';
export * from './get-payment-detail.handler.js';
export * from './get-payment-public.query.js';
export * from './get-payment-public.handler.js';
export * from './list-payments.query.js';
export * from './list-payments.handler.js';
export * from './list-payments-by-user.query.js';
export * from './list-payments-by-user.handler.js';
export * from './list-payments-by-order.query.js';
export * from './list-payments-by-order.handler.js';
export * from './get-payment-stats.query.js';
export * from './get-payment-stats.handler.js';

export const PAYMENT_QUERY_HANDLERS = [
  GetPaymentHandler,
  GetPaymentDetailHandler,
  GetPaymentPublicHandler,
  ListPaymentsHandler,
  ListPaymentsByUserHandler,
  ListPaymentsByOrderHandler,
  GetPaymentStatsHandler,
] as const;
