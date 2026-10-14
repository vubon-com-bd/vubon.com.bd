/**
 * PayoutValidator — Zod schema-based validation
 * @module vendor-service/application/validators
 */
import { ZodError } from 'zod';
import { RequestPayoutRequestSchema } from '@vubon/shared-schemas/business/vendor';
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

export class PayoutValidator {
  static validateRequest(input: unknown) {
    try {
      return RequestPayoutRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Payout.request');
      throw e;
    }
  }
}
