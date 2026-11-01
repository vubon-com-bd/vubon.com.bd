/**
 * Notification Swagger Helpers
 * @module notification-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

import {
  NotificationHttpResponseDTO,
  NotificationListHttpResponseDTO,
  NotificationPublicHttpResponseDTO,
  NotificationSendHttpResponseDTO,
  NotificationStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/notification.response.dto.js';
import { NotificationDetailHttpResponseDTO } from '@interfaces/dtos/responses/notification-detail.response.dto.js';

export const ApiNotificationTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('notifications');

export function ApiSendNotification(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Send a notification',
      description: 'Sends a notification to a single user across channels',
    }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Notification queued',
      type: NotificationSendHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST, description: 'Invalid input' }),
    ApiResponse({ status: HTTP_STATUS.UNAUTHORIZED, description: 'Unauthorized' }),
    ApiResponse({ status: HTTP_STATUS.TOO_MANY_REQUESTS, description: 'Rate limited' }),
  );
}

export function ApiSendBulkNotification(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Send bulk notifications',
      description: 'Sends notification to multiple users',
    }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Bulk queued',
      type: NotificationSendHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST, description: 'Invalid input' }),
  );
}

export function ApiGetNotification(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get notification by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Notification found',
      type: NotificationHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Not found' }),
    ApiResponse({ status: HTTP_STATUS.FORBIDDEN, description: 'Not the owner' }),
  );
}

export function ApiGetNotificationPublic(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get notification (public view)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Public notification',
      type: NotificationPublicHttpResponseDTO,
    }),
  );
}

export function ApiGetNotificationDetail(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get notification with recipients and attempts',
    }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Notification detail',
      type: NotificationDetailHttpResponseDTO,
    }),
  );
}

export function ApiListNotifications(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List notifications (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Notifications',
      type: NotificationListHttpResponseDTO,
    }),
  );
}

export function ApiNotificationStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get notification stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stats',
      type: NotificationStatsHttpResponseDTO,
    }),
  );
}
