/**
 * @ApiPaginated() — Swagger bundle for paginated list endpoints
 * @module notification-service/interfaces/decorators
 *
 * Adds standard query parameters (page, limit) + 200 response schema।
 */
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

export interface ApiPaginatedOptions {
  readonly itemType: Type<unknown>;
  readonly description?: string;
}

export function ApiPaginated(options: ApiPaginatedOptions): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(options.itemType),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      example: 1,
      description: 'Page number (1-based)',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      example: 20,
      description: 'Items per page (max 100)',
    }),
    ApiOkResponse({
      description: options.description ?? 'Paginated results',
      schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: { $ref: getSchemaPath(options.itemType) },
          },
          total: { type: 'number', example: 42 },
          page: { type: 'number', example: 1 },
          limit: { type: 'number', example: 20 },
          totalPages: { type: 'number', example: 3 },
        },
      },
    }),
  );
}
