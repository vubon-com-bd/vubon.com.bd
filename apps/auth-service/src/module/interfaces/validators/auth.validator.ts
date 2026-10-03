/**
 * AuthValidator — Interface-level validation using shared-schemas
 * @module auth-service/interfaces/validators
 *
 * Parses + validates raw HTTP input before it reaches the CommandBus.
 */
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  LogoutRequestSchema,
  RefreshTokenRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
  VerifyEmailRequestSchema,
} from '@vubon/shared-schemas/auth';
import type { z } from 'zod';

export class AuthValidator {
  static login(input: unknown): z.infer<typeof LoginRequestSchema> {
    return LoginRequestSchema.parse(input);
  }

  static register(input: unknown): z.infer<typeof RegisterRequestSchema> {
    return RegisterRequestSchema.parse(input);
  }

  static logout(input: unknown): z.infer<typeof LogoutRequestSchema> {
    return LogoutRequestSchema.parse(input);
  }

  static refresh(input: unknown): z.infer<typeof RefreshTokenRequestSchema> {
    return RefreshTokenRequestSchema.parse(input);
  }

  static forgotPassword(
    input: unknown,
  ): z.infer<typeof ForgotPasswordRequestSchema> {
    return ForgotPasswordRequestSchema.parse(input);
  }

  static resetPassword(
    input: unknown,
  ): z.infer<typeof ResetPasswordRequestSchema> {
    return ResetPasswordRequestSchema.parse(input);
  }

  static verifyEmail(
    input: unknown,
  ): z.infer<typeof VerifyEmailRequestSchema> {
    return VerifyEmailRequestSchema.parse(input);
  }
}
