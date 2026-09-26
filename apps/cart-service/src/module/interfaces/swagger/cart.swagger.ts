import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CartResponseDto,
  CartSummaryResponseDto,
} from '../dtos/responses/cart.response.dto';

export const CartSwagger = {
  Tag: () => ApiTags('Cart'),
  Auth: () => ApiBearerAuth(),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new cart' }),
      ApiResponse({ status: 201, type: CartResponseDto }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get cart by ID' }),
      ApiResponse({ status: 200, type: CartResponseDto }),
      ApiResponse({ status: 404, description: 'Cart not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List carts' }),
      ApiResponse({ status: 200, type: [CartResponseDto] }),
    ),

  Summary: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get cart summary' }),
      ApiResponse({ status: 200, type: CartSummaryResponseDto }),
    ),
};
