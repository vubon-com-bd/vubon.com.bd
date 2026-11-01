/**
 * Inventory Swagger metadata helpers
 * @module product-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  InventoryHttpResponseDTO,
  StockCheckHttpResponseDTO,
  InventoryListHttpResponseDTO,
  InventoryStatsHttpResponseDTO,
} from '../dtos/responses/inventory.response.dto.js';

export const ApiInventoryTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('product-inventory');

export function ApiGetInventory(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get inventory by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Inventory found',
      type: InventoryHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Inventory not found' }),
  );
}

export function ApiAdjustInventory(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Adjust inventory' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Inventory adjusted',
      type: InventoryHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.UNPROCESSABLE_ENTITY, description: 'Invalid adjustment' }),
  );
}

export function ApiReserveInventory(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Reserve inventory' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Inventory reserved',
      type: InventoryHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.CONFLICT, description: 'Insufficient stock' }),
  );
}

export function ApiReleaseInventory(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Release inventory reservation' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Reservation released',
      type: InventoryHttpResponseDTO,
    }),
  );
}

export function ApiCheckStock(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Check product stock availability' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stock check result',
      type: StockCheckHttpResponseDTO,
    }),
  );
}

export function ApiListInventory(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List inventory (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Inventory listed',
      type: InventoryListHttpResponseDTO,
    }),
  );
}

export function ApiGetInventoryStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get inventory stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stats loaded',
      type: InventoryStatsHttpResponseDTO,
    }),
  );
}
