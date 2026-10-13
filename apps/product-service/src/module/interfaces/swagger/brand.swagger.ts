/**
 * Brand Swagger metadata helpers
 * @module product-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  BrandHttpResponseDTO,
  BrandListHttpResponseDTO,
  BrandStatsHttpResponseDTO,
} from '../dtos/responses/brand.response.dto.js';

export const ApiBrandTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('brands');

export function ApiCreateBrand(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a brand' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Brand created',
      type: BrandHttpResponseDTO,
    }),
  );
}

export function ApiUpdateBrand(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update a brand' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Brand updated',
      type: BrandHttpResponseDTO,
    }),
  );
}

export function ApiGetBrand(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get brand by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Brand found',
      type: BrandHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Brand not found' }),
  );
}

export function ApiListBrands(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List brands (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Brands listed',
      type: BrandListHttpResponseDTO,
    }),
  );
}

export function ApiGetBrandStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get brand stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stats loaded',
      type: BrandStatsHttpResponseDTO,
    }),
  );
}
