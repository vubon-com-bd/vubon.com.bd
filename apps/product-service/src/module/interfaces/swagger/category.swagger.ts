import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryHttpResponseDto } from '../dtos/responses/brand-category.response.dto';

export const CategorySwagger = {
  Tag: () => ApiTags('Categories'),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List categories' }),
      ApiResponse({ status: 200, type: [CategoryHttpResponseDto] }),
    ),

  Tree: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get category tree' }),
      ApiResponse({ status: 200, type: [CategoryHttpResponseDto] }),
    ),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create category' }),
      ApiResponse({ status: 201, type: CategoryHttpResponseDto }),
    ),
};
