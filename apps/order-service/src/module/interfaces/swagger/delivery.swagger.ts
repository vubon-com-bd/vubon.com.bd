import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { DeliveryHttpResponseDTO } from '../dtos/responses/delivery.response.dto.js';

export function ApiDeliverySchedule(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Schedule a delivery' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Delivery scheduled',
      type: DeliveryHttpResponseDTO,
    }),
  );
}
