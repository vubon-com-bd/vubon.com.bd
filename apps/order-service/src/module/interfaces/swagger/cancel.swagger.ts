import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { CancelHttpResponseDTO } from '../dtos/responses/cancel.response.dto.js';

export function ApiCancelRequest(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Request order cancellation' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Cancel requested',
      type: CancelHttpResponseDTO,
    }),
  );
}
