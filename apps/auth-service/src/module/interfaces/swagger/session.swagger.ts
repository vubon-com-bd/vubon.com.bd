import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SessionResponseDTO,
  SessionListResponseDTO,
} from '../dtos/responses/session.response.dto';

export const SessionSwagger = {
  Tag: () => ApiTags('Sessions'),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a session by ID' }),
      ApiResponse({ status: 200, type: SessionResponseDTO }),
      ApiResponse({ status: 404, description: 'Session not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List active sessions for current user' }),
      ApiResponse({ status: 200, type: SessionListResponseDTO }),
    ),

  Revoke: () =>
    applyDecorators(
      ApiOperation({ summary: 'Revoke a session' }),
      ApiResponse({ status: 204, description: 'Session revoked' }),
    ),
};
