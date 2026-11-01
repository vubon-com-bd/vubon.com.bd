/**
 * Driver Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DriverHttpResponseDTO,
  DriverInitiateHttpResponseDTO,
  DriverListHttpResponseDTO,
  DriverStatsHttpResponseDTO,
} from '../dtos/responses/driver/driver.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiDriverTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('drivers');

export function ApiCreateDriver(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new driver' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: DriverInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetDriver(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get driver by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DriverHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListDrivers(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List drivers (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DriverListHttpResponseDTO }),
  );
}

export function ApiGetDriverStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get driver statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DriverStatsHttpResponseDTO }),
  );
}

export function ApiDriverTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Driver: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DriverHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
