/**
 * Courier Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CourierHttpResponseDTO,
  CourierInitiateHttpResponseDTO,
  CourierListHttpResponseDTO,
  CourierStatsHttpResponseDTO,
} from '../dtos/responses/courier/courier.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiCourierTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('couriers');

export function ApiCreateCourier(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new courier' }),
    ApiResponse({
      ...SWAGGER_RESPONSES.CREATED,
      type: CourierInitiateHttpResponseDTO,
    }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetCourier(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get courier by ID' }),
    ApiResponse({
      ...SWAGGER_RESPONSES.OK,
      type: CourierHttpResponseDTO,
    }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListCouriers(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List couriers (paginated)' }),
    ApiResponse({
      ...SWAGGER_RESPONSES.OK,
      type: CourierListHttpResponseDTO,
    }),
  );
}

export function ApiGetCourierStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get courier statistics' }),
    ApiResponse({
      ...SWAGGER_RESPONSES.OK,
      type: CourierStatsHttpResponseDTO,
    }),
  );
}

export function ApiCourierTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Courier: ${action}` }),
    ApiResponse({
      ...SWAGGER_RESPONSES.OK,
      type: CourierHttpResponseDTO,
    }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
