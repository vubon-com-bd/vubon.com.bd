/**
 * Auth Swagger Metadata Helpers
 * @module identity-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { LoginHttpDTO } from '../dtos/requests/auth/login.request.dto.js';
import { RegisterHttpDTO } from '../dtos/requests/auth/register.request.dto.js';
import { LoginHttpResponseDTO } from '../dtos/responses/auth/login.response.dto.js';
import { RegisterHttpResponseDTO } from '../dtos/responses/auth/register.response.dto.js';
import { LoginMfaRequiredHttpResponseDTO } from '../dtos/responses/auth/login-mfa-required.response.dto.js';

export const ApiAuthTag = (): MethodDecorator & ClassDecorator => ApiTags('auth');

export function ApiLogin(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Login with credentials' }),
    ApiBody({ type: LoginHttpDTO }),
    ApiResponse({
      status: HttpStatus.OK,
      type: LoginHttpResponseDTO,
      description: 'Login successful',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      type: LoginMfaRequiredHttpResponseDTO,
      description: 'MFA required',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid credentials',
    }),
    ApiResponse({
      status: HttpStatus.TOO_MANY_REQUESTS,
      description: 'Too many attempts',
    }),
  );
}

export function ApiRegister(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new account' }),
    ApiBody({ type: RegisterHttpDTO }),
    ApiResponse({
      status: HttpStatus.CREATED,
      type: RegisterHttpResponseDTO,
      description: 'Registration successful',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Email or phone already registered',
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Validation failed',
    }),
  );
}

export function ApiRefreshToken(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh access token' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Token refreshed',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid or expired refresh token',
    }),
  );
}

export function ApiLogout(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Logout current session' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Logged out successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
    }),
  );
}

export function ApiForgotPassword(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Request password reset link' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Reset link sent if account exists',
    }),
    ApiResponse({
      status: HttpStatus.TOO_MANY_REQUESTS,
      description: 'Too many reset requests',
    }),
  );
}

export function ApiResetPassword(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Reset password with token' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Password reset successful',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid or expired token',
    }),
  );
}

export function ApiVerifyEmail(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Verify email with token' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Email verified',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid or expired verification token',
    }),
  );
}

export function ApiResendVerification(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Resend verification email' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Verification email sent',
    }),
    ApiResponse({
      status: HttpStatus.TOO_MANY_REQUESTS,
      description: 'Too many requests',
    }),
  );
}
