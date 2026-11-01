import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ReturnShipmentHttpResponseDTO,
  ReturnShipmentInitiateHttpResponseDTO,
  ReturnShipmentListHttpResponseDTO,
  ReturnShipmentStatsHttpResponseDTO,
} from '../dtos/responses/return-shipment/return-shipment.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiReturnShipmentTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('return-shipments');

export function ApiCreateReturnShipment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new return shipment' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: ReturnShipmentInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetReturnShipment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get return shipment by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ReturnShipmentHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListReturnShipments(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List return shipments' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ReturnShipmentListHttpResponseDTO }),
  );
}

export function ApiGetReturnShipmentStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get return shipment statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ReturnShipmentStatsHttpResponseDTO }),
  );
}

export function ApiReturnShipmentTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `ReturnShipment: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ReturnShipmentHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
