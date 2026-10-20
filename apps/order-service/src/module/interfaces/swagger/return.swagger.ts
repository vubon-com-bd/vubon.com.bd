/**
 * Return Swagger helpers
 * @module order-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export const ApiReturnTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('order-returns');

export function ApiRequestReturn(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Request order return' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Return requested',
    }),
  );
}

export function ApiCompleteReturn(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Complete return processing' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Return completed',
    }),
  );
}
