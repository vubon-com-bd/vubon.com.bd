import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileHttpResponseDTO } from '../dtos/responses/profile.response.dto.js';

export const ApiProfileTag = (): MethodDecorator & ClassDecorator => ApiTags('profile');

export function ApiGetProfile(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Get user profile' }),
    ApiResponse({ status: HttpStatus.OK, type: ProfileHttpResponseDTO }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile not found' }),
  );
}

export function ApiUpdateProfile(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Update user profile' }),
    ApiResponse({ status: HttpStatus.OK, type: ProfileHttpResponseDTO }),
  );
}
