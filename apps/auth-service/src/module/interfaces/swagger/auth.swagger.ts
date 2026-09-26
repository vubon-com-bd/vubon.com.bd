/**
 * AuthSwagger — reusable swagger decorators for Auth endpoints
 * @module auth-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthResponseDTO } from '../dtos/responses/auth.response.dto';

export const AuthSwagger = {
  Login: () =>
    applyDecorators(
      ApiOperation({ summary: 'Login with identifier & password' }),
      ApiBody({
        schema: {
          type: 'object',
          required: ['identifier', 'password'],
          properties: {
            identifier: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'StrongP@ss123' },
            rememberMe: { type: 'boolean' },
            deviceId: { type: 'string' },
          },
        },
      }),
      ApiResponse({ status: 200, type: AuthResponseDTO }),
      ApiResponse({ status: 401, description: 'Invalid credentials' }),
      ApiResponse({ status: 423, description: 'Account locked' }),
      ApiResponse({ status: 429, description: 'Too many attempts' }),
    ),

  Register: () =>
    applyDecorators(
      ApiOperation({ summary: 'Register a new user' }),
      ApiResponse({ status: 201, description: 'Registered' }),
      ApiResponse({ status: 409, description: 'Email already exists' }),
    ),

  Refresh: () =>
    applyDecorators(
      ApiOperation({ summary: 'Refresh access token' }),
      ApiResponse({ status: 200, description: 'Token refreshed' }),
      ApiResponse({ status: 401, description: 'Invalid refresh token' }),
    ),

  Logout: () =>
    applyDecorators(
      ApiOperation({ summary: 'Logout current session' }),
      ApiBearerAuth(),
      ApiResponse({ status: 204, description: 'Logged out' }),
    ),

  ForgotPassword: () =>
    applyDecorators(
      ApiOperation({ summary: 'Request password reset email' }),
      ApiResponse({ status: 202, description: 'If exists, email sent' }),
    ),

  ResetPassword: () =>
    applyDecorators(
      ApiOperation({ summary: 'Reset password via token' }),
      ApiResponse({ status: 204, description: 'Password reset' }),
      ApiResponse({ status: 401, description: 'Invalid or expired token' }),
    ),

  VerifyEmail: () =>
    applyDecorators(
      ApiOperation({ summary: 'Verify email with code' }),
      ApiResponse({ status: 204, description: 'Email verified' }),
    ),
};
