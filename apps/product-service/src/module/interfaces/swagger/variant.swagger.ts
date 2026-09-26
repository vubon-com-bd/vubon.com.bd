import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VariantHttpResponseDto } from '../dtos/responses/variant.response.dto';

export const VariantSwagger = {
  Tag: () => ApiTags('Product Variants'),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List variants for a product' }),
      ApiResponse({ status: 200, type: [VariantHttpResponseDto] }),
    ),

  Add: () =>
    applyDecorators(
      ApiOperation({ summary: 'Add a variant' }),
      ApiResponse({ status: 201, type: VariantHttpResponseDto }),
    ),
};
