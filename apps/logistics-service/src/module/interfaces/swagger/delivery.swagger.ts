import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const DeliverySwagger = {
  Tag: () => ApiTags('Deliveries'),
  Schedule: () =>
    applyDecorators(
      ApiOperation({ summary: 'Schedule delivery' }),
      ApiResponse({ status: 201 }),
    ),
};
