/**
 * User Swagger Metadata Helpers
 * @module identity-service/interfaces/swagger
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserHttpResponseDTO } from '../dtos/responses/user/user.response.dto.js';
import { UserListHttpResponseDTO } from '../dtos/responses/user/user-list.response.dto.js';
import { UserStatsHttpResponseDTO } from '../dtos/responses/user/user-stats.response.dto.js';

export const ApiUserTag = (): MethodDecorator & ClassDecorator => ApiTags('users');

export function ApiCreateUser(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      type: UserHttpResponseDTO,
      description: 'User created',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'User already exists',
    }),
  );
}

export function ApiGetUser(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Get user by ID' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: UserHttpResponseDTO,
      description: 'User found',
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' }),
  );
}

export function ApiListUsers(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'List users with pagination' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: UserListHttpResponseDTO,
      description: 'Users retrieved',
    }),
  );
}

export function ApiUpdateUser(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Update user' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: UserHttpResponseDTO,
      description: 'User updated',
    }),
  );
}

export function ApiDeleteUser(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Soft-delete user' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User deleted' }),
  );
}

export function ApiGetUserStats(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Get user statistics' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: UserStatsHttpResponseDTO,
      description: 'Stats retrieved',
    }),
  );
}
