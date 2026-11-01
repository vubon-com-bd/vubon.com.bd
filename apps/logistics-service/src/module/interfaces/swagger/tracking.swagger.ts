/**
 * Tracking Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  TrackingHttpResponseDTO,
  TrackingInitiateHttpResponseDTO,
  TrackingListHttpResponseDTO,
  TrackingStatsHttpResponseDTO,
  TrackingPublicHttpResponseDTO,
} from '../dtos/responses/tracking/tracking.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiTrackingTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('trackings');

export function ApiCreateTracking(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new tracking record' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: TrackingInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
  );
}

export function ApiGetTracking(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get tracking by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: TrackingHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiGetTrackingPublic(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get public tracking by number (no auth)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: TrackingPublicHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListTrackings(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List trackings (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: TrackingListHttpResponseDTO }),
  );
}

export function ApiGetTrackingStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get tracking statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: TrackingStatsHttpResponseDTO }),
  );
}

export function ApiTrackingTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Tracking: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: TrackingHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
