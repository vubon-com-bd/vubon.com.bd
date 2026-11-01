/**
 * Fulfillment Swagger helpers
 * @module order-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export const ApiFulfillmentTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('order-fulfillments');

export function ApiStartFulfillment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Start fulfillment' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Fulfillment started',
    }),
  );
}

export function ApiShipOrder(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Ship order with tracking' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Order shipped',
    }),
  );
}
