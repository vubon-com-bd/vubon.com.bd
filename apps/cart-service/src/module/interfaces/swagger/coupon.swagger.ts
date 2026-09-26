import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CouponResponseDto } from '../dtos/responses/coupon.response.dto';

export const CouponSwagger = {
  Tag: () => ApiTags('Coupons'),

  Apply: () =>
    applyDecorators(
      ApiOperation({ summary: 'Apply coupon to cart' }),
      ApiResponse({ status: 200, type: CouponResponseDto }),
      ApiResponse({ status: 400, description: 'Invalid coupon' }),
    ),

  Validate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Validate coupon code' }),
      ApiResponse({ status: 200, type: CouponResponseDto }),
    ),
};
