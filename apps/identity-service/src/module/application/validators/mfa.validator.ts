import { ZodError } from 'zod';
import { VerifyMfaRequestSchema, EnableMfaRequestSchema } from '@vubon/shared-schemas/auth';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    first?.path?.join('.') || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

export class MfaValidator {
  static validateVerify(input: unknown) {
    try { return VerifyMfaRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Mfa.verify'); throw e; }
  }
  static validateEnable(input: unknown) {
    try { return EnableMfaRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Mfa.enable'); throw e; }
  }
}
