import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FulfillmentResponseDto } from '../dtos/responses/fulfillment.response.dto';

export const FulfillmentSwagger = {
  Tag: () => ApiTags('Fulfillment'),

  Start: () =>
    applyDecorators(
      ApiOperation({ summary: 'Start fulfillment' }),
      ApiResponse({ status: 201, type: FulfillmentResponseDto }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get fulfillment by order' }),
      ApiResponse({ status: 200, type: FulfillmentResponseDto }),
    ),
};
