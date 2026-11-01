/**
 * Delivery Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DeliveryHttpResponseDTO,
  DeliveryInitiateHttpResponseDTO,
  DeliveryListHttpResponseDTO,
  DeliveryStatsHttpResponseDTO,
} from '../dtos/responses/delivery/delivery.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiDeliveryTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('deliveries');

export function ApiCreateDelivery(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new delivery' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: DeliveryInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
  );
}

export function ApiGetDelivery(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get delivery by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DeliveryHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListDeliveries(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List deliveries (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DeliveryListHttpResponseDTO }),
  );
}

export function ApiGetDeliveryStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get delivery statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DeliveryStatsHttpResponseDTO }),
  );
}

export function ApiDeliveryTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Delivery: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DeliveryHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
