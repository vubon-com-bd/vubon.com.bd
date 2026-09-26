import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from '../dtos/requests/user.request.dto';
import { UserResponseDto } from '../dtos/responses/user.response.dto';

export const UserSwagger = {
  Tag: () => ApiTags('Users'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new user' }),
      ApiBody({ type: CreateUserRequestDto }),
      ApiResponse({ status: 201, type: UserResponseDto }),
      ApiResponse({ status: 409, description: 'Email already exists' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a user by ID' }),
      ApiResponse({ status: 200, type: UserResponseDto }),
      ApiResponse({ status: 404, description: 'User not found' }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update user' }),
      ApiResponse({ status: 200, type: UserResponseDto }),
    ),

  Delete: () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete user' }),
      ApiResponse({ status: 204, description: 'User deleted' }),
    ),
};
