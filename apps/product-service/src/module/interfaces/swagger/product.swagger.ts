import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductHttpResponseDto } from '../dtos/responses/product.response.dto';

export const ProductSwagger = {
  Tag: () => ApiTags('Products'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new product' }),
      ApiResponse({ status: 201, type: ProductHttpResponseDto }),
      ApiResponse({ status: 400, description: 'Invalid input' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get product by ID' }),
      ApiResponse({ status: 200, type: ProductHttpResponseDto }),
      ApiResponse({ status: 404, description: 'Product not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List products with pagination' }),
      ApiResponse({ status: 200, type: [ProductHttpResponseDto] }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update product' }),
      ApiResponse({ status: 200, type: ProductHttpResponseDto }),
    ),

  Delete: () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete product' }),
      ApiResponse({ status: 204, description: 'Product deleted' }),
    ),
};
