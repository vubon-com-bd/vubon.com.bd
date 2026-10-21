/**
 * PaymentValidator — Zod-based validation
 * @module payment-service/application/validators
 *
 * ⚠️ Uses duck-typing for ZodError detection because shared-schemas
 * may load a different Zod instance than the service.
 */
import { ProcessPaymentRequestSchema, VerifyPaymentRequestSchema } from '@vubon/shared-schemas/business/payment';
import { ZodError, type SafeParseReturnType } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

interface ZodIssueLike {
  path: (string | number)[];
  message: string;
}

function isZodError(e: unknown): e is { issues: ZodIssueLike[] } {
  if (!e || typeof e !== 'object') return false;
  const obj = e as Record<string, unknown>;
  return obj['name'] === 'ZodError' && Array.isArray(obj['issues']);
}

function zodToAppError(err: { issues: ZodIssueLike[] }, scope: string): ApplicationValidationError {
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
      if (isZodError(e)) throw zodToAppError(e, 'Payment.initiate');
      throw e;
    }
  }

  static validateVerify(input: unknown) {
    try {
      return VerifyPaymentRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Payment.verify');
      throw e;
    }
  }

  static safeParseInitiate(input: unknown): SafeParseReturnType<unknown, unknown> {
    return ProcessPaymentRequestSchema.safeParse(input);
  }

  static safeParseVerify(input: unknown): SafeParseReturnType<unknown, unknown> {
    return VerifyPaymentRequestSchema.safeParse(input);
  }
}
