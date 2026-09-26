/**
 * UserSwagger
 * @module auth-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UserResponseDTO } from '../dtos/responses/user.response.dto';

export const UserSwagger = {
  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a user (admin)' }),
      ApiBearerAuth(),
      ApiResponse({ status: 201, type: UserResponseDTO }),
      ApiResponse({ status: 409, description: 'User already exists' }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update user' }),
      ApiBearerAuth(),
      ApiParam({ name: 'id', type: 'string', format: 'uuid' }),
      ApiResponse({ status: 200, type: UserResponseDTO }),
      ApiResponse({ status: 404, description: 'User not found' }),
    ),

  Delete: () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete user (soft)' }),
      ApiBearerAuth(),
      ApiParam({ name: 'id', type: 'string', format: 'uuid' }),
      ApiResponse({ status: 204 }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get user by id' }),
      ApiBearerAuth(),
      ApiParam({ name: 'id', type: 'string', format: 'uuid' }),
      ApiResponse({ status: 200, type: UserResponseDTO }),
      ApiResponse({ status: 404, description: 'User not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List users (admin)' }),
      ApiBearerAuth(),
      ApiResponse({ status: 200, type: [UserResponseDTO] }),
    ),
};
