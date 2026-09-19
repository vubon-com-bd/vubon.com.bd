import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateRequestDTO } from '../dtos/requests/user.request.dto';
import { UserResponseDTO_ } from '../dtos/responses/user.response.dto';

export const UserSwagger = {
  Tag: () => ApiTags('Users'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new user' }),
      ApiBody({ type: UserCreateRequestDTO }),
      ApiResponse({ status: 201, type: UserResponseDTO_ }),
      ApiResponse({ status: 409, description: 'Email already exists' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a user by ID' }),
      ApiResponse({ status: 200, type: UserResponseDTO_ }),
      ApiResponse({ status: 404, description: 'User not found' }),
    ),
};
