import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthLoginRequestDTO,
  AuthRegisterRequestDTO,
} from '../dtos/requests/auth.request.dto';
import {
  AuthLoginResponseDTO,
  AuthRegisterResponseDTO,
} from '../dtos/responses/auth.response.dto';

export const AuthSwagger = {
  Tag: () => ApiTags('Auth'),

  Login: () =>
    applyDecorators(
      ApiOperation({ summary: 'Login with email/phone & password' }),
      ApiBody({ type: AuthLoginRequestDTO }),
      ApiResponse({ status: 200, type: AuthLoginResponseDTO }),
      ApiResponse({ status: 401, description: 'Invalid credentials' }),
      ApiResponse({ status: 423, description: 'Account locked' }),
    ),

  Register: () =>
    applyDecorators(
      ApiOperation({ summary: 'Register a new user' }),
      ApiBody({ type: AuthRegisterRequestDTO }),
      ApiResponse({ status: 201, type: AuthRegisterResponseDTO }),
      ApiResponse({ status: 409, description: 'Email already exists' }),
    ),
};
