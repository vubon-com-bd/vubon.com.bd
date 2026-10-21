/**
 * Payment Command Handlers — Barrel
 * @module payment-service/modules/payment/commands
 */
import { InitiatePaymentHandler } from '@application/commands/payment/initiate-payment.handler.js';
import { ConfirmPaymentHandler } from '@application/commands/payment/confirm-payment.handler.js';
import { CancelPaymentHandler } from '@application/commands/payment/cancel-payment.handler.js';
import { RetryPaymentHandler } from '@application/commands/payment/retry-payment.handler.js';
import { VerifyPaymentHandler } from '@application/commands/payment/verify-payment.handler.js';

export const PAYMENT_COMMAND_HANDLERS = [
  InitiatePaymentHandler,
  ConfirmPaymentHandler,
  CancelPaymentHandler,
  RetryPaymentHandler,
  VerifyPaymentHandler,
] as const;
