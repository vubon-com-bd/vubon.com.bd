/**
 * Recurring Payment Command Handlers — Barrel
 * @module payment-service/modules/recurring-payment/commands
 */
import { CreateRecurringHandler } from '@application/commands/recurring/create-recurring.handler';
import { PauseRecurringHandler } from '@application/commands/recurring/pause-recurring.handler';
import { CancelRecurringHandler } from '@application/commands/recurring/cancel-recurring.handler';

export const RECURRING_PAYMENT_COMMAND_HANDLERS = [
  CreateRecurringHandler,
  PauseRecurringHandler,
  CancelRecurringHandler,
] as const;
