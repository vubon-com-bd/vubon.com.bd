/**
 * Zone Swagger metadata helpers
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ZoneHttpResponseDTO,
  ZoneInitiateHttpResponseDTO,
  ZoneListHttpResponseDTO,
  ZoneStatsHttpResponseDTO,
} from '../dtos/responses/zone/zone.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiZoneTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('zones');

export function ApiCreateZone(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new zone' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: ZoneInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetZone(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get zone by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ZoneHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListZones(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List zones (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ZoneListHttpResponseDTO }),
  );
}

export function ApiGetZoneStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get zone statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ZoneStatsHttpResponseDTO }),
  );
}

export function ApiZoneTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Zone: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ZoneHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
