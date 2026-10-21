/**
 * RefundValidator — Zod-based validation
 * @module payment-service/application/validators
 */
import { RefundPaymentRequestSchema } from '@vubon/shared-schemas/business/payment';
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

export class RefundValidator {
  static validateRequest(input: unknown) {
    try {
      return RefundPaymentRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Refund.request');
      throw e;
    }
  }

  static safeParseRequest(input: unknown): SafeParseReturnType<unknown, unknown> {
    return RefundPaymentRequestSchema.safeParse(input);
  }
}
