/**
 * CheckoutValidator
 */
import {
  StartCheckoutRequestSchema,
  SelectAddressRequestSchema,
  SelectShippingRequestSchema,
  SelectPaymentRequestSchema,
  ConfirmCheckoutRequestSchema,
  AbandonCheckoutRequestSchema,
} from '@vubon/shared-schemas/business/checkout';
import { ZodError } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    first?.path?.join('.') || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

export class CheckoutValidator {
  static validateStart(input: unknown) {
    try { return StartCheckoutRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Checkout.start'); throw e; }
  }
  static validateSelectAddress(input: unknown) {
    try { return SelectAddressRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Checkout.address'); throw e; }
  }
  static validateSelectShipping(input: unknown) {
    try { return SelectShippingRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Checkout.shipping'); throw e; }
  }
  static validateSelectPayment(input: unknown) {
    try { return SelectPaymentRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Checkout.payment'); throw e; }
  }
  static validateConfirm(input: unknown) {
    try { return ConfirmCheckoutRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Checkout.confirm'); throw e; }
  }
  static validateAbandon(input: unknown) {
    try { return AbandonCheckoutRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Checkout.abandon'); throw e; }
  }
}
