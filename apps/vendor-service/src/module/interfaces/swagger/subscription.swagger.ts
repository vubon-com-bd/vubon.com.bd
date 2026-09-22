import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionResponseDto } from '../dtos/responses/subscription.response.dto';

export const SubscriptionSwagger = {
  Tag: () => ApiTags('Subscription'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create subscription' }),
      ApiResponse({ status: 201, type: SubscriptionResponseDto }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get active subscription' }),
      ApiResponse({ status: 200, type: SubscriptionResponseDto }),
    ),
};
