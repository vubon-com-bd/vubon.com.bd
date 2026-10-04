/**
 * User Swagger helpers
 * @module user-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  UserResponseDto,
  UserListResponseDto,
} from '../dtos/responses/user.response.dto.js';

export function ApiGetUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get user by ID' }),
    ApiParam({ name: 'id', type: String, description: 'User ID' }),
    ApiResponse({
      status: 200,
      description: 'User found',
      type: UserResponseDto,
    }),
    ApiResponse({ status: 404, description: 'User not found' })
  );
}

export function ApiListUsers() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List users (paginated)' }),
    ApiResponse({
      status: 200,
      description: 'Users list',
      type: UserListResponseDto,
    })
  );
}

export function ApiSearchUsers() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Search users by term' }),
    ApiResponse({
      status: 200,
      description: 'Search results',
      type: UserListResponseDto,
    })
  );
}

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create new user' }),
    ApiResponse({
      status: 201,
      description: 'User created',
      type: UserResponseDto,
    }),
    ApiResponse({ status: 409, description: 'User already exists' })
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update user' }),
    ApiResponse({ status: 200, type: UserResponseDto })
  );
}

export function ApiDeleteUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete user' }),
    ApiResponse({ status: 204, description: 'User deleted' })
  );
}
