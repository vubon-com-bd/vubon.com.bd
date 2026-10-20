/**
 * Delivery Swagger helpers
 * @module order-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export const ApiDeliveryTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('deliveries');

export function ApiScheduleDelivery(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Schedule delivery for order' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Delivery scheduled',
    }),
  );
}

export function ApiGetDelivery(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get delivery by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Delivery found',
    }),
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Delivery not found',
    }),
  );
}
