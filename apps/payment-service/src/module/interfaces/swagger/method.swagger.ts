/**
 * Payment Method Swagger metadata helpers
 * @module payment-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  MethodHttpResponseDTO,
  MethodListHttpResponseDTO,
} from '@interfaces/dtos/responses/method.response.dto';

export const ApiMethodTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('payment-methods');

export function ApiMethodAdd(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Add a saved payment method' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Method added',
      type: MethodHttpResponseDTO,
    }),
  );
}

export function ApiMethodGet(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get payment method by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Method found',
      type: MethodHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Method not found',
    }),
  );
}

export function ApiMethodList(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List methods for current user' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Method list',
      type: MethodListHttpResponseDTO,
    }),
  );
}
