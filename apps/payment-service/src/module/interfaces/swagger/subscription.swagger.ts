import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionResponseDto } from '../dtos/responses/subscription.response.dto';

export const SubscriptionSwagger = {
  Tag: () => ApiTags('Subscriptions'),
  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new subscription' }),
      ApiResponse({ status: 201, type: SubscriptionResponseDto }),
    ),
  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List subscriptions for a user' }),
      ApiResponse({ status: 200, type: [SubscriptionResponseDto] }),
    ),
};
