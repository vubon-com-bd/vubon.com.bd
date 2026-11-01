/**
 * AuthHttpValidator — wraps application validators with HTTP errors
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  ResetPasswordRequestSchema,
  ForgotPasswordRequestSchema,
  RefreshTokenRequestSchema,
  LogoutRequestSchema,
  VerifyEmailRequestSchema,
} from '@vubon/shared-schemas/auth';

export class AuthHttpValidator {
  static validateLogin(body: unknown): void {
    const result = LoginRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Login validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }

  static validateRegister(body: unknown): void {
    const result = RegisterRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Register validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }

  static validateResetPassword(body: unknown): void {
    const result = ResetPasswordRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Reset password validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }

  static validateForgotPassword(body: unknown): void {
    const result = ForgotPasswordRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Forgot password validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }

  static validateRefreshToken(body: unknown): void {
    const result = RefreshTokenRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Refresh token validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }

  static validateLogout(body: unknown): void {
    const result = LogoutRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Logout validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }

  static validateVerifyEmail(body: unknown): void {
    const result = VerifyEmailRequestSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'VAL_REQUIRED',
        message: 'Verify email validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
  }
}
