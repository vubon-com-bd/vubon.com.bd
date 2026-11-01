/**
 * Payment Query Handlers — Barrel
 * @module payment-service/modules/payment/queries
 */
import { GetPaymentHandler } from '@application/queries/payment/get-payment.handler.js';
import { ListPaymentsHandler } from '@application/queries/payment/list-payments.handler.js';
import { GetPaymentByOrderHandler } from '@application/queries/payment/get-payment-by-order.handler.js';
import { GetPaymentStatsHandler } from '@application/queries/payment/get-payment-stats.handler.js';

export const PAYMENT_QUERY_HANDLERS = [
  GetPaymentHandler,
  ListPaymentsHandler,
  GetPaymentByOrderHandler,
  GetPaymentStatsHandler,
] as const;
