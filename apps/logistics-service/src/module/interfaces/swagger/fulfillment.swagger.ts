/**
 * Fulfillment Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FulfillmentHttpResponseDTO,
  FulfillmentInitiateHttpResponseDTO,
  FulfillmentListHttpResponseDTO,
  FulfillmentStatsHttpResponseDTO,
} from '../dtos/responses/fulfillment/fulfillment.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiFulfillmentTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('fulfillments');

export function ApiCreateFulfillment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new fulfillment' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: FulfillmentInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
  );
}

export function ApiGetFulfillment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get fulfillment by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: FulfillmentHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListFulfillments(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List fulfillments (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: FulfillmentListHttpResponseDTO }),
  );
}

export function ApiGetFulfillmentStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get fulfillment statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: FulfillmentStatsHttpResponseDTO }),
  );
}

export function ApiFulfillmentTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Fulfillment: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: FulfillmentHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
