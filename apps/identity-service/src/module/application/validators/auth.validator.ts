/**
 * Auth Validator — Zod schema validation wrappers
 * @module identity-service/application/validators
 *
 * Rich validation: Zod errors → ApplicationValidationError
 */
import { ZodError } from 'zod';
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  ResetPasswordRequestSchema,
} from '@vubon/shared-schemas/auth';
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

export class AuthValidator {
  static validateLogin(input: unknown) {
    try {
      return LoginRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Auth.login');
      throw e;
    }
  }

  static validateRegister(input: unknown) {
    try {
      return RegisterRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Auth.register');
      throw e;
    }
  }

  static validateResetPassword(input: unknown) {
    try {
      return ResetPasswordRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Auth.resetPassword');
      throw e;
    }
  }

  static validateLoginSafe(input: unknown) {
    return LoginRequestSchema.safeParse(input);
  }
}
