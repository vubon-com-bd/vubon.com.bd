/**
 * Warehouse Swagger metadata helpers
 * @module logistics-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  WarehouseHttpResponseDTO,
  WarehouseInitiateHttpResponseDTO,
  WarehouseListHttpResponseDTO,
  WarehouseStatsHttpResponseDTO,
} from '../dtos/responses/warehouse/warehouse.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiWarehouseTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('warehouses');

export function ApiCreateWarehouse(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new warehouse' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: WarehouseInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetWarehouse(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get warehouse by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: WarehouseHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListWarehouses(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List warehouses (paginated)' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: WarehouseListHttpResponseDTO }),
  );
}

export function ApiGetWarehouseStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get warehouse statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: WarehouseStatsHttpResponseDTO }),
  );
}

export function ApiWarehouseTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Warehouse: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: WarehouseHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
