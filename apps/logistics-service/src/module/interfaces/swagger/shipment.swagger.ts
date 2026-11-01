/**
 * Shipment Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ShipmentHttpResponseDTO,
  ShipmentInitiateHttpResponseDTO,
  ShipmentListHttpResponseDTO,
  ShipmentStatsHttpResponseDTO,
} from '../dtos/responses/shipment/shipment.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiShipmentTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('shipments');

export function ApiCreateShipment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new shipment' }),
    ApiResponse({
      ...SWAGGER_RESPONSES.CREATED,
      type: ShipmentInitiateHttpResponseDTO,
    }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
  );
}

export function ApiGetShipment(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get shipment by ID' }),
    ApiResponse({
      ...SWAGGER_RESPONSES.OK,
      type: ShipmentHttpResponseDTO,
    }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListShipments(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List shipments (paginated)' }),
    ApiResponse({
      ...SWAGGER_RESPONSES.OK,
      type: ShipmentListHttpResponseDTO,
    }),
  );
}

export function ApiGetShipmentStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get shipment statistics' }),
    ApiResponse({
      ...SWAGGER_RESPONSES.OK,
      type: ShipmentStatsHttpResponseDTO,
    }),
  );
}

export function ApiShipmentTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Shipment: ${action}` }),
    ApiResponse({
      ...SWAGGER_RESPONSES.OK,
      type: ShipmentHttpResponseDTO,
    }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}
