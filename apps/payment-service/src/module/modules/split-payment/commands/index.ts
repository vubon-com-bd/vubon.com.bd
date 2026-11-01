/**
 * Split Payment Command Handlers — Barrel
 * @module payment-service/modules/split-payment/commands
 */
import { CreateSplitPaymentHandler } from '@application/commands/split/create-split-payment.handler';

export const SPLIT_PAYMENT_COMMAND_HANDLERS = [
  CreateSplitPaymentHandler,
] as const;
