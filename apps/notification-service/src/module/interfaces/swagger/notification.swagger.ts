import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { NotificationRequestSchema } from '../dtos/requests';

export const NotificationSwagger = {
  Tag: () => ApiTags('Notifications'),

  Send: () =>
    applyDecorators(
      ApiOperation({ summary: 'Send a notification' }),
      ApiBody({
        schema: {
          type: 'object',
          example: {
            userId: 'uuid',
            type: 'order_update',
            channel: 'email',
            category: 'order',
            title: 'Order Confirmed',
            body: 'Your order #123 has been confirmed',
          },
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Notification created',
        schema: {
          example: {
            id: 'uuid',
            type: 'order_update',
            status: 'queued',
            channel: 'email',
            createdAt: '2026-01-01T00:00:00Z',
          },
        },
      }),
      ApiResponse({ status: 400, description: 'Invalid payload' }),
      ApiResponse({ status: 401, description: 'Unauthorized' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List notifications' }),
      ApiResponse({ status: 200, description: 'Notifications list' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get notification by ID' }),
      ApiResponse({ status: 200, description: 'Notification found' }),
      ApiResponse({ status: 404, description: 'Notification not found' }),
    ),

  MarkRead: () =>
    applyDecorators(
      ApiOperation({ summary: 'Mark notification as read' }),
      ApiResponse({ status: 200, description: 'Marked as read' }),
    ),
};

export { NotificationRequestSchema };
