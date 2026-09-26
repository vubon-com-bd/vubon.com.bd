import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PricingHttpResponseDto } from '../dtos/responses/pricing.response.dto';

export const PricingSwagger = {
  Tag: () => ApiTags('Product Pricing'),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get pricing for a product' }),
      ApiResponse({ status: 200, type: PricingHttpResponseDto }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update price' }),
      ApiResponse({ status: 200, type: PricingHttpResponseDto }),
    ),
};
