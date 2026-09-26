import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItemResponseDto } from '../dtos/responses/cart-item.response.dto';

export const CartItemSwagger = {
  Tag: () => ApiTags('Cart Items'),

  Add: () =>
    applyDecorators(
      ApiOperation({ summary: 'Add item to cart' }),
      ApiResponse({ status: 201, type: CartItemResponseDto }),
      ApiResponse({ status: 409, description: 'Item already exists' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List items in cart' }),
      ApiResponse({ status: 200, type: [CartItemResponseDto] }),
    ),
};
