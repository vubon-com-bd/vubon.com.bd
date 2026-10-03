import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { ReturnHttpResponseDTO } from '../dtos/responses/return.response.dto.js';

export function ApiReturnRequest(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Request an order return' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Return requested',
      type: ReturnHttpResponseDTO,
    }),
  );
}
