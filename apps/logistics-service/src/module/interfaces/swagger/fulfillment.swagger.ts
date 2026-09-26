import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const FulfillmentSwagger = {
  Tag: () => ApiTags('Fulfillments'),
  Start: () =>
    applyDecorators(
      ApiOperation({ summary: 'Start fulfillment' }),
      ApiResponse({ status: 201 }),
    ),
};
