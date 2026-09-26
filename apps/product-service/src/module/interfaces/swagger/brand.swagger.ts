import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandHttpResponseDto } from '../dtos/responses/brand-category.response.dto';

export const BrandSwagger = {
  Tag: () => ApiTags('Brands'),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List brands' }),
      ApiResponse({ status: 200, type: [BrandHttpResponseDto] }),
    ),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create brand' }),
      ApiResponse({ status: 201, type: BrandHttpResponseDto }),
    ),
};
