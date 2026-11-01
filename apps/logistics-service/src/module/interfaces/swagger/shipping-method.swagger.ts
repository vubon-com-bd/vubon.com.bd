import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ShippingMethodHttpResponseDTO,
  ShippingMethodInitiateHttpResponseDTO,
  ShippingMethodListHttpResponseDTO,
  ShippingMethodStatsHttpResponseDTO,
} from '../dtos/responses/shipping-method/shipping-method.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiShippingMethodTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('shipping-methods');

export function ApiCreateShippingMethod(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new shipping method' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: ShippingMethodInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetShippingMethod(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get shipping method by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ShippingMethodHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListShippingMethods(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List shipping methods' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ShippingMethodListHttpResponseDTO }),
  );
}

export function ApiGetShippingMethodStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get shipping method statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ShippingMethodStatsHttpResponseDTO }),
  );
}

export function ApiShippingMethodTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `ShippingMethod: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ShippingMethodHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
