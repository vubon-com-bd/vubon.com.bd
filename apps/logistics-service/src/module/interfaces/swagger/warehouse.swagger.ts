import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const WarehouseSwagger = {
  Tag: () => ApiTags('Warehouses'),
  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List warehouses' }),
      ApiResponse({ status: 200 }),
    ),
};
