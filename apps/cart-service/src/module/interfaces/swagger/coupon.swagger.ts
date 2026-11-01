/**
 * Coupon/Voucher Swagger metadata helpers
 * @module cart-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  CouponHttpResponseDTO,
  CouponValidationHttpResponseDTO,
  VoucherHttpResponseDTO,
  VoucherValidationHttpResponseDTO,
} from '../dtos/responses/coupon.response.dto.js';
import {
  ApplyCouponHttpDTO,
  ApplyVoucherHttpDTO,
  ValidateCouponHttpDTO,
} from '../dtos/requests/coupon.request.dto.js';
import { CartActionHttpResponseDTO } from '../dtos/responses/cart.response.dto.js';

export const ApiCouponTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('cart-coupons');

export function ApiApplyCoupon(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Apply a coupon to cart' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiBody({ type: ApplyCouponHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Coupon applied',
      type: CouponHttpResponseDTO,
    }),
  );
}

export function ApiRemoveCoupon(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Remove a coupon from cart' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Coupon removed',
      type: CartActionHttpResponseDTO,
    }),
  );
}

export function ApiValidateCoupon(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Validate a coupon (dry-run)' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiBody({ type: ValidateCouponHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Validation result',
      type: CouponValidationHttpResponseDTO,
    }),
  );
}

export function ApiApplyVoucher(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Apply a voucher to cart' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiBody({ type: ApplyVoucherHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Voucher applied',
      type: VoucherHttpResponseDTO,
    }),
  );
}

export function ApiValidateVoucher(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Validate a voucher (dry-run)' }),
    ApiParam({ name: 'cartId', description: 'Cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Validation result',
      type: VoucherValidationHttpResponseDTO,
    }),
  );
}
