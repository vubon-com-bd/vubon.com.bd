import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InventoryHttpResponseDto } from '../dtos/responses/inventory.response.dto';

export const InventorySwagger = {
  Tag: () => ApiTags('Product Inventory'),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get inventory for a product' }),
      ApiResponse({ status: 200, type: InventoryHttpResponseDto }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update inventory quantity' }),
      ApiResponse({ status: 200, type: InventoryHttpResponseDto }),
    ),
};
