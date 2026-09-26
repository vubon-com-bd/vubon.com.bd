import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileResponseDto } from '../dtos/responses/profile.response.dto';

export const ProfileSwagger = {
  Tag: () => ApiTags('Profile'),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get current user profile' }),
      ApiResponse({ status: 200, type: ProfileResponseDto }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update profile' }),
      ApiResponse({ status: 200, type: ProfileResponseDto }),
    ),
};
