import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const CourierSwagger = {
  Tag: () => ApiTags('Couriers'),
  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List couriers' }),
      ApiResponse({ status: 200 }),
    ),
};
