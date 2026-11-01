/**
 * Checkout Swagger helpers
 * @module order-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export const ApiCheckoutTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('checkouts');

export function ApiStartCheckout(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Start a new checkout session' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Checkout started',
    }),
  );
}

export function ApiConfirmCheckout(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Confirm checkout and place order' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Order placed',
    }),
  );
}

export function ApiAbandonCheckout(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Abandon an active checkout' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Checkout abandoned',
    }),
  );
}
