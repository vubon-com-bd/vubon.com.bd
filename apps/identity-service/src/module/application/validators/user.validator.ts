import { ZodError } from 'zod';
import { CreateUserRequestSchema, UpdateUserRequestSchema } from '@vubon/shared-schemas/user';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

export class UserValidator {
  static validateCreate(input: unknown) {
    try { return CreateUserRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'User.create'); throw e; }
  }
  static validateUpdate(input: unknown) {
    try { return UpdateUserRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'User.update'); throw e; }
  }
  static validateCreateSafe(input: unknown) {
    return CreateUserRequestSchema.safeParse(input);
  }
}
