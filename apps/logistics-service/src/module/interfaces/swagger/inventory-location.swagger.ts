import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  InventoryLocationHttpResponseDTO,
  InventoryLocationInitiateHttpResponseDTO,
  InventoryLocationListHttpResponseDTO,
  InventoryLocationStatsHttpResponseDTO,
} from '../dtos/responses/inventory-location/inventory-location.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiInventoryLocationTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('inventory-locations');

export function ApiCreateInventoryLocation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new inventory location' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: InventoryLocationInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetInventoryLocation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get inventory location by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: InventoryLocationHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListInventoryLocations(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List inventory locations' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: InventoryLocationListHttpResponseDTO }),
  );
}

export function ApiGetInventoryLocationStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get inventory location statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: InventoryLocationStatsHttpResponseDTO }),
  );
}

export function ApiInventoryLocationTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `InventoryLocation: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: InventoryLocationHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
