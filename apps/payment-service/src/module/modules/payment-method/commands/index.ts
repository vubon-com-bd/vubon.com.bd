/**
 * Payment Method Command Handlers — Barrel
 * @module payment-service/modules/payment-method/commands
 */
import { AddPaymentMethodHandler } from '@application/commands/method/add-payment-method.handler';
import { UpdatePaymentMethodHandler } from '@application/commands/method/update-payment-method.handler';
import { DeletePaymentMethodHandler } from '@application/commands/method/delete-payment-method.handler';
import { SetDefaultMethodHandler } from '@application/commands/method/set-default-method.handler';

export const PAYMENT_METHOD_COMMAND_HANDLERS = [
  AddPaymentMethodHandler,
  UpdatePaymentMethodHandler,
  DeletePaymentMethodHandler,
  SetDefaultMethodHandler,
] as const;
