// application/commands/payment/index.ts
import { InitiatePaymentHandler } from './initiate-payment.handler.js';
import { VerifyPaymentHandler } from './verify-payment.handler.js';
import { CapturePaymentHandler } from './capture-payment.handler.js';
import { FailPaymentHandler } from './fail-payment.handler.js';
import { CancelPaymentHandler } from './cancel-payment.handler.js';
import { RetryPaymentHandler } from './retry-payment.handler.js';
import { MarkChargebackHandler } from './mark-chargeback.handler.js';
import { MarkPaidHandler } from './mark-paid.handler.js';

export * from './initiate-payment.command.js';
export * from './initiate-payment.handler.js';
export * from './verify-payment.command.js';
export * from './verify-payment.handler.js';
export * from './capture-payment.command.js';
export * from './capture-payment.handler.js';
export * from './fail-payment.command.js';
export * from './fail-payment.handler.js';
export * from './cancel-payment.command.js';
export * from './cancel-payment.handler.js';
export * from './retry-payment.command.js';
export * from './retry-payment.handler.js';
export * from './mark-chargeback.command.js';
export * from './mark-chargeback.handler.js';
export * from './mark-paid.command.js';
export * from './mark-paid.handler.js';

export const PAYMENT_COMMAND_HANDLERS = [
  InitiatePaymentHandler,
  VerifyPaymentHandler,
  CapturePaymentHandler,
  FailPaymentHandler,
  CancelPaymentHandler,
  RetryPaymentHandler,
  MarkChargebackHandler,
  MarkPaidHandler,
] as const;
