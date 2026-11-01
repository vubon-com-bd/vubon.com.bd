/**
 * Cancel Swagger helpers
 * @module order-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export const ApiCancelTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('order-cancels');

export function ApiRequestCancel(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Request order cancellation' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Cancel requested',
    }),
  );
}

export function ApiApproveCancel(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Approve cancellation' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cancel approved',
    }),
  );
}

export function ApiRejectCancel(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Reject cancellation' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Cancel rejected',
    }),
  );
}
