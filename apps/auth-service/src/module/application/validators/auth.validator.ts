/**
 * AuthValidator — Parse and validate auth-related requests
 * @module auth-service/application/validators
 */
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  LogoutRequestSchema,
  RefreshTokenRequestSchema,
  ResetPasswordRequestSchema,
  ForgotPasswordRequestSchema,
  VerifyEmailRequestSchema,
  VerifyMfaRequestSchema,
  EnableMfaRequestSchema,
  DisableMfaRequestSchema,
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

  static verifyEmail(input: unknown): z.infer<typeof VerifyEmailRequestSchema> {
    return VerifyEmailRequestSchema.parse(input);
  }

  static verifyMfa(input: unknown): z.infer<typeof VerifyMfaRequestSchema> {
    return VerifyMfaRequestSchema.parse(input);
  }

  static enableMfa(input: unknown): z.infer<typeof EnableMfaRequestSchema> {
    return EnableMfaRequestSchema.parse(input);
  }

  static disableMfa(input: unknown): z.infer<typeof DisableMfaRequestSchema> {
    return DisableMfaRequestSchema.parse(input);
  }
}
