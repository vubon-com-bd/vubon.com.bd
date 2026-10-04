/**
 * PaymentValidator — Zod schema-based validation
 * @module payment-service/application/validators
 */
import { ZodError } from 'zod';
import {
  ProcessPaymentRequestSchema,
  RefundPaymentRequestSchema,
  VerifyPaymentRequestSchema,
} from '@vubon/shared-schemas/business/payment';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

export class PaymentValidator {
  static validateInitiate(input: unknown) {
    try {
      return ProcessPaymentRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Payment.initiate');
      throw e;
    }
  }

  static validateVerify(input: unknown) {
    try {
      return VerifyPaymentRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Payment.verify');
      throw e;
    }
  }

  static validateRefund(input: unknown) {
    try {
      return RefundPaymentRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Payment.refund');
      throw e;
    }
  }
}
