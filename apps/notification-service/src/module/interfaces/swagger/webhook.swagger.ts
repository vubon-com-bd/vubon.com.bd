import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const WebhookSwagger = {
  Tag: () => ApiTags('Webhooks'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create webhook' }),
      ApiResponse({ status: 201, description: 'Webhook created' }),
    ),

  Test: () =>
    applyDecorators(
      ApiOperation({ summary: 'Test webhook' }),
      ApiResponse({ status: 200, description: 'Test delivered' }),
    ),

  Provider: () =>
    applyDecorators(
      ApiOperation({ summary: 'Provider webhook receiver' }),
      ApiResponse({ status: 200, description: 'Webhook processed' }),
      ApiResponse({ status: 401, description: 'Invalid signature' }),
    ),
};
