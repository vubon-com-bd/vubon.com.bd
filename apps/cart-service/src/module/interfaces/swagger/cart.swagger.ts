/**
 * Cart Swagger metadata helpers
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
  CartHttpResponseDTO,
  CartInitiateHttpResponseDTO,
  CartPublicHttpResponseDTO,
  CartSummaryHttpResponseDTO,
  CartListHttpResponseDTO,
  CartStatsHttpResponseDTO,
  CartDetailHttpResponseDTO,
  CartActionHttpResponseDTO,
} from '../dtos/responses/cart.response.dto.js';
import { CreateCartHttpDTO } from '../dtos/requests/cart.request.dto.js';

// ─── Tag ────────────────────────────────────
export const ApiCartTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('carts');

// ─── Create ─────────────────────────────────
export function ApiCreateCart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new cart',
      description: 'Creates a new cart for the current user or as guest',
    }),
    ApiBody({ type: CreateCartHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Cart created',
      type: CartInitiateHttpResponseDTO,
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

// ─── Get By Id ──────────────────────────────
export function ApiGetCart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get cart by ID (admin)' }),
    ApiParam({ name: 'id', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cart found',
      type: CartHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Cart not found',
    }),
  );
}

// ─── Get Public ─────────────────────────────
export function ApiGetCartPublic(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get cart by ID (public — customer-safe)' }),
    ApiParam({ name: 'id', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cart found',
      type: CartPublicHttpResponseDTO,
    }),
  );
}

// ─── Get Detail ─────────────────────────────
export function ApiGetCartDetail(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get cart detail with items' }),
    ApiParam({ name: 'id', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cart detail with items',
      type: CartDetailHttpResponseDTO,
    }),
  );
}

// ─── Summary ────────────────────────────────
export function ApiGetCartSummary(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get cart summary' }),
    ApiParam({ name: 'id', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cart summary',
      type: CartSummaryHttpResponseDTO,
    }),
  );
}

// ─── List ───────────────────────────────────
export function ApiListCarts(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List carts (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cart list',
      type: CartListHttpResponseDTO,
    }),
  );
}

// ─── Stats ──────────────────────────────────
export function ApiCartStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get cart statistics' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cart stats',
      type: CartStatsHttpResponseDTO,
    }),
  );
}

// ─── Clear ──────────────────────────────────
export function ApiClearCart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Clear all items from cart' }),
    ApiParam({ name: 'id', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cart cleared',
      type: CartActionHttpResponseDTO,
    }),
  );
}

// ─── Delete ─────────────────────────────────
export function ApiDeleteCart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Delete (soft) a cart' }),
    ApiParam({ name: 'id', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cart deleted',
      type: CartActionHttpResponseDTO,
    }),
  );
}
