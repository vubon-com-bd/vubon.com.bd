import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { FulfillmentHttpResponseDTO } from '../dtos/responses/fulfillment.response.dto.js';

export function ApiFulfillmentStart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Start fulfillment' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Fulfillment started',
      type: FulfillmentHttpResponseDTO,
    }),
  );
}
