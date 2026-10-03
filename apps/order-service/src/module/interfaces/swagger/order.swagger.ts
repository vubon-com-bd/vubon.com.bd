/**
 * Swagger metadata helpers for Order controller
 * @module order-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { OrderHttpResponseDTO } from '../dtos/responses/order.response.dto.js';

export function ApiOrderCreate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new order' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Order created',
      type: OrderHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST, description: 'Invalid input' }),
  );
}

export function ApiOrderGet(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get order by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Order found',
      type: OrderHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Order not found' }),
  );
}
