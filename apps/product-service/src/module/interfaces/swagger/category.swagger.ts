/**
 * Category Swagger metadata helpers
 * @module product-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  CategoryHttpResponseDTO,
  CategoryListHttpResponseDTO,
  CategoryTreeHttpResponseDTO,
  CategoryStatsHttpResponseDTO,
} from '../dtos/responses/category.response.dto.js';

export const ApiCategoryTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('categories');

export function ApiCreateCategory(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a category' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Category created',
      type: CategoryHttpResponseDTO,
    }),
  );
}

export function ApiUpdateCategory(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update a category' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Category updated',
      type: CategoryHttpResponseDTO,
    }),
  );
}

export function ApiGetCategory(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get category by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Category found',
      type: CategoryHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Category not found' }),
  );
}

export function ApiListCategories(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List categories (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Categories listed',
      type: CategoryListHttpResponseDTO,
    }),
  );
}

export function ApiGetCategoryTree(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get category tree' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Tree loaded',
      type: CategoryTreeHttpResponseDTO,
    }),
  );
}

export function ApiGetCategoryStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get category stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stats loaded',
      type: CategoryStatsHttpResponseDTO,
    }),
  );
}
