/**
 * Auth Session Swagger Metadata Helpers
 * @module identity-service/interfaces/swagger
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SessionListHttpResponseDTO } from '../dtos/responses/session/session-list.response.dto.js';
import { AuthSessionPublicHttpResponseDTO } from '../dtos/responses/session/session-public.response.dto.js';
import { SessionRevokeHttpResponseDTO } from '../dtos/responses/session/session-revoke.response.dto.js';

export const ApiSessionTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('auth-session');

export function ApiGetSession(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Get session by ID' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: AuthSessionPublicHttpResponseDTO,
      description: 'Session found',
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Session not found' }),
  );
}

export function ApiListSessions(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'List active sessions for current user' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: SessionListHttpResponseDTO,
      description: 'Sessions retrieved',
    }),
  );
}

export function ApiRevokeSession(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Revoke a session' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: SessionRevokeHttpResponseDTO,
      description: 'Session revoked',
    }),
  );
}
