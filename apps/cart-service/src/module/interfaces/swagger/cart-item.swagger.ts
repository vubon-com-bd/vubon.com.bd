/**
 * CartItem Swagger metadata helpers
 * @module cart-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  CartItemHttpResponseDTO,
  CartItemListHttpResponseDTO,
} from '../dtos/responses/cart-item.response.dto.js';
import {
  AddItemHttpDTO,
  UpdateItemHttpDTO,
  UpdateQuantityHttpDTO,
  SelectItemsHttpDTO,
} from '../dtos/requests/cart-item.request.dto.js';
import { CartActionHttpResponseDTO } from '../dtos/responses/cart.response.dto.js';

export const ApiCartItemTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('cart-items');

export function ApiAddItem(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Add an item to cart' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiBody({ type: AddItemHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Item added',
      type: CartItemHttpResponseDTO,
    }),
  );
}

export function ApiUpdateItem(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update an item in cart' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiParam({ name: 'itemId', description: 'Cart item UUID' }),
    ApiBody({ type: UpdateItemHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Item updated',
      type: CartItemHttpResponseDTO,
    }),
  );
}

export function ApiUpdateQuantity(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update item quantity' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiParam({ name: 'itemId', description: 'Cart item UUID' }),
    ApiBody({ type: UpdateQuantityHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Quantity updated',
      type: CartItemHttpResponseDTO,
    }),
  );
}

export function ApiRemoveItem(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Remove an item from cart' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiParam({ name: 'itemId', description: 'Cart item UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Item removed',
      type: CartActionHttpResponseDTO,
    }),
  );
}

export function ApiSelectItems(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Select/deselect items for checkout' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiBody({ type: SelectItemsHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Selection updated',
      type: CartActionHttpResponseDTO,
    }),
  );
}

export function ApiListItems(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List cart items (paginated)' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Item list',
      type: CartItemListHttpResponseDTO,
    }),
  );
}
