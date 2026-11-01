/**
 * Vehicle Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  VehicleHttpResponseDTO,
  VehicleInitiateHttpResponseDTO,
  VehicleListHttpResponseDTO,
  VehicleStatsHttpResponseDTO,
} from '../dtos/responses/vehicle/vehicle.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiVehicleTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('vehicles');

export function ApiCreateVehicle(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new vehicle' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: VehicleInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetVehicle(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get vehicle by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: VehicleHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListVehicles(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List vehicles (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: VehicleListHttpResponseDTO }),
  );
}

export function ApiGetVehicleStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get vehicle statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: VehicleStatsHttpResponseDTO }),
  );
}

export function ApiVehicleTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Vehicle: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: VehicleHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
