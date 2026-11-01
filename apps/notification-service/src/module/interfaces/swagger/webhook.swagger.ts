/**
 * Webhook Swagger Helpers
 * @module notification-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

import {
  WebhookHttpResponseDTO,
  WebhookListHttpResponseDTO,
  WebhookDeliveryHttpResponseDTO,
} from '@interfaces/dtos/responses/webhook.response.dto.js';

export const ApiWebhookTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('webhooks');

export function ApiCreateWebhook(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Register a webhook' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Webhook created',
      type: WebhookHttpResponseDTO,
    }),
  );
}

export function ApiUpdateWebhook(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update a webhook' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Webhook updated',
      type: WebhookHttpResponseDTO,
    }),
  );
}

export function ApiTestWebhook(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Test-fire a webhook' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Delivery record',
      type: WebhookDeliveryHttpResponseDTO,
    }),
  );
}

export function ApiGetWebhook(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get webhook by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Webhook found',
      type: WebhookHttpResponseDTO,
    }),
  );
}

export function ApiListWebhooks(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List webhooks (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Webhooks',
      type: WebhookListHttpResponseDTO,
    }),
  );
}
