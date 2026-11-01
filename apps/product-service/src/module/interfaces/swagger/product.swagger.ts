/**
 * Product Swagger metadata helpers
 * @module product-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  ProductHttpResponseDTO,
  ProductCreateHttpResponseDTO,
  ProductListHttpResponseDTO,
  ProductDetailHttpResponseDTO,
  ProductPublicHttpResponseDTO,
  ProductStatsHttpResponseDTO,
} from '../dtos/responses/product.response.dto.js';

export const ApiProductTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('products');

export function ApiCreateProduct(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new product' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Product created',
      type: ProductCreateHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST, description: 'Invalid input' }),
    ApiResponse({ status: HTTP_STATUS.UNAUTHORIZED, description: 'Unauthorized' }),
    ApiResponse({ status: HTTP_STATUS.CONFLICT, description: 'Slug or SKU already exists' }),
  );
}

export function ApiGetProduct(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get product by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Product found',
      type: ProductHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Product not found' }),
  );
}

export function ApiGetProductBySlug(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get product by slug' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Product found',
      type: ProductHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Product not found' }),
  );
}

export function ApiGetProductDetail(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get product detail with variants/attributes' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Detail loaded',
      type: ProductDetailHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Product not found' }),
  );
}

export function ApiGetProductPublic(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get public product (customer-safe)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Public view',
      type: ProductPublicHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Product not found' }),
  );
}

export function ApiListProducts(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List products (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Products listed',
      type: ProductListHttpResponseDTO,
    }),
  );
}

export function ApiSearchProducts(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Search products' }),
    ApiResponse({ status: HTTP_STATUS.OK, description: 'Search results' }),
  );
}

export function ApiGetProductStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get product stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stats loaded',
      type: ProductStatsHttpResponseDTO,
    }),
  );
}

export function ApiUpdateProduct(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update product' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Product updated',
      type: ProductHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST, description: 'Invalid input' }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Product not found' }),
  );
}

export function ApiPublishProduct(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Publish product' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Product published',
      type: ProductHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.UNPROCESSABLE_ENTITY, description: 'Not publishable' }),
  );
}

export function ApiArchiveProduct(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Archive product' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Product archived',
      type: ProductHttpResponseDTO,
    }),
  );
}

export function ApiDeleteProduct(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Delete product' }),
    ApiResponse({ status: HTTP_STATUS.OK, description: 'Product deleted' }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Product not found' }),
  );
}

export function ApiDuplicateProduct(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Duplicate product' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Product duplicated',
      type: ProductCreateHttpResponseDTO,
    }),
  );
}
