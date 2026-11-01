/**
 * Order Swagger metadata helpers
 * @module order-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  OrderHttpResponseDTO,
  OrderCreateHttpResponseDTO,
} from '../dtos/responses/order.response.dto.js';

export const ApiOrderTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('orders');

export function ApiCreateOrder(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new order' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Order created',
      type: OrderCreateHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.BAD_REQUEST,
      description: 'Invalid input',
    }),
    ApiResponse({
      status: HTTP_STATUS.UNAUTHORIZED,
      description: 'Unauthorized',
    }),
  );
}

export function ApiGetOrder(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get order by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Order found',
      type: OrderHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Order not found',
    }),
  );
}

export function ApiListOrders(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List orders with filters' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Order list',
    }),
  );
}

export function ApiGetOrderStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get order statistics' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Aggregated stats',
    }),
  );
}

export function ApiUpdateOrder(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update order' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Order updated',
      type: OrderHttpResponseDTO,
    }),
  );
}

export function ApiDeleteOrder(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Delete order' }),
    ApiResponse({
      status: HTTP_STATUS.NO_CONTENT,
      description: 'Order deleted',
    }),
  );
}
