/**
 * Route Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RouteHttpResponseDTO,
  RouteInitiateHttpResponseDTO,
  RouteListHttpResponseDTO,
  RouteStatsHttpResponseDTO,
} from '../dtos/responses/route/route.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiRouteTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('routes');

export function ApiCreateRoute(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new route' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: RouteInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetRoute(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get route by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: RouteHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListRoutes(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List routes (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: RouteListHttpResponseDTO }),
  );
}

export function ApiGetRouteStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get route statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: RouteStatsHttpResponseDTO }),
  );
}

export function ApiRouteTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Route: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: RouteHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
