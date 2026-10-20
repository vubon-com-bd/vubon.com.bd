/**
 * Tracking Swagger helpers
 * @module order-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export const ApiTrackingTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('order-tracking');

export function ApiAddTracking(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Add tracking event' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Tracking event added',
    }),
  );
}

export function ApiGetTracking(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get tracking summary for order' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Tracking summary',
    }),
  );
}
