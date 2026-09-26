import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { CreateOrderRequestDto } from '../dtos/requests/order.request.dto';
import { OrderResponseDto } from '../dtos/responses/order.response.dto';

export const OrderSwagger = {
  Tag: () => ApiTags('Orders'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create new order' }),
      ApiBody({ type: CreateOrderRequestDto }),
      ApiResponse({ status: 201, type: OrderResponseDto }),
      ApiResponse({ status: 400, description: 'Bad request' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get order by ID' }),
      ApiResponse({ status: 200, type: OrderResponseDto }),
      ApiResponse({ status: 404, description: 'Order not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List orders' }),
      ApiResponse({ status: 200, type: [OrderResponseDto] }),
    ),
};
