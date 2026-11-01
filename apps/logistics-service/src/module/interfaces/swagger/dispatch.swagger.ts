/**
 * Dispatch Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DispatchHttpResponseDTO,
  DispatchInitiateHttpResponseDTO,
  DispatchListHttpResponseDTO,
  DispatchStatsHttpResponseDTO,
} from '../dtos/responses/dispatch/dispatch.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiDispatchTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('dispatches');

export function ApiCreateDispatch(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new dispatch' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: DispatchInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
  );
}

export function ApiGetDispatch(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get dispatch by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DispatchHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListDispatches(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List dispatches (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DispatchListHttpResponseDTO }),
  );
}

export function ApiGetDispatchStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get dispatch statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DispatchStatsHttpResponseDTO }),
  );
}

export function ApiDispatchTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Dispatch: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: DispatchHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
