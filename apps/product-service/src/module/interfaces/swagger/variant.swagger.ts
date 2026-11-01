/**
 * Variant Swagger metadata helpers
 * @module product-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  VariantHttpResponseDTO,
  VariantListHttpResponseDTO,
  VariantStatsHttpResponseDTO,
} from '../dtos/responses/variant.response.dto.js';

export const ApiVariantTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('product-variants');

export function ApiAddVariant(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Add variant to product' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Variant added',
      type: VariantHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.CONFLICT, description: 'SKU already exists' }),
  );
}

export function ApiUpdateVariant(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update variant' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Variant updated',
      type: VariantHttpResponseDTO,
    }),
  );
}

export function ApiGetVariant(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get variant by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Variant found',
      type: VariantHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Variant not found' }),
  );
}

export function ApiListVariants(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List variants (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Variants listed',
      type: VariantListHttpResponseDTO,
    }),
  );
}

export function ApiGetVariantStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get variant stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stats loaded',
      type: VariantStatsHttpResponseDTO,
    }),
  );
}
