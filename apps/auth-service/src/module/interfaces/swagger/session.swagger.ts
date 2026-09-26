/**
 * SessionSwagger
 * @module auth-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { SessionResponseDTO } from '../dtos/responses/session.response.dto';

export const SessionSwagger = {
  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get session by id' }),
      ApiBearerAuth(),
      ApiParam({ name: 'id', type: 'string', format: 'uuid' }),
      ApiResponse({ status: 200, type: SessionResponseDTO }),
      ApiResponse({ status: 404, description: 'Session not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List active sessions for the current user' }),
      ApiBearerAuth(),
      ApiResponse({ status: 200, type: [SessionResponseDTO] }),
    ),

  Revoke: () =>
    applyDecorators(
      ApiOperation({ summary: 'Revoke a session' }),
      ApiBearerAuth(),
      ApiParam({ name: 'id', type: 'string', format: 'uuid' }),
      ApiResponse({ status: 204 }),
    ),
};
