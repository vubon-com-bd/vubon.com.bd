/**
 * Profile Swagger helpers
 */
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileResponseDto } from '../dtos/responses/profile.response.dto.js';

export function ApiGetProfile() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get profile by user ID' }),
    ApiResponse({ status: 200, type: ProfileResponseDto })
  );
}

export function ApiUpdateProfile() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update profile' }),
    ApiResponse({ status: 200, type: ProfileResponseDto })
  );
}

export function ApiUpdateAvatar() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update avatar URL' }),
    ApiResponse({ status: 200, type: ProfileResponseDto })
  );
}

export function ApiUpdateBio() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update bio' }),
    ApiResponse({ status: 200, type: ProfileResponseDto })
  );
}

export function ApiUpdateVisibility() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update profile visibility' }),
    ApiResponse({ status: 200, type: ProfileResponseDto })
  );
}
