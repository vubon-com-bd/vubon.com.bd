/**
 * CouponControllerMapper
 * @module cart-service/interfaces/mappers
 */
import type {
  ApplyCouponHttpDTO,
  ValidateCouponHttpDTO,
  ApplyVoucherHttpDTO,
} from '../dtos/requests/coupon.request.dto.js';
import type {
  CouponHttpResponseDTO,
  CouponPublicHttpResponseDTO,
  CouponValidationHttpResponseDTO,
  VoucherHttpResponseDTO,
  VoucherPublicHttpResponseDTO,
  VoucherValidationHttpResponseDTO,
} from '../dtos/responses/coupon.response.dto.js';

import type {
  ApplyCouponRequestDTO,
  ValidateCouponRequestDTO,
} from '../../application/dtos/requests/coupon/index.js';
import type { ApplyVoucherRequestDTO } from '../../application/dtos/requests/voucher/index.js';

import type {
  CouponResponseDTO,
  CouponPublicResponseDTO,
  CouponValidationResponseDTO,
} from '../../application/dtos/responses/coupon-response.dto.js';
import type {
  VoucherResponseDTO,
  VoucherPublicResponseDTO,
  VoucherValidationResponseDTO,
} from '../../application/dtos/responses/voucher-response.dto.js';

export class CouponControllerMapper {
  // ═══ HTTP → App ═══

  static toApplyAppDto(cartId: string, dto: ApplyCouponHttpDTO, idempotencyKey?: string): ApplyCouponRequestDTO {
    return {
      cartId,
      code: dto.code,
      idempotencyKey,
    };
  }

  static toValidateAppDto(cartId: string, dto: ValidateCouponHttpDTO): ValidateCouponRequestDTO {
    return {
      cartId,
      code: dto.code,
    };
  }

  static toApplyVoucherAppDto(cartId: string, dto: ApplyVoucherHttpDTO, idempotencyKey?: string): ApplyVoucherRequestDTO {
    return {
      cartId,
      code: dto.code,
      idempotencyKey,
    };
  }

  // ═══ App → HTTP ═══

  static toCouponHttp(app: CouponResponseDTO): CouponHttpResponseDTO {
    return {
      id: app.id,
      cartId: app.cartId,
      code: app.code,
      status: app.status,
      discountType: app.discountType,
      discountValue: app.discountValue,
      appliedDiscountAmount: app.appliedDiscountAmount,
      currency: app.currency,
      minOrderAmount: app.minOrderAmount,
      expiresAt: app.expiresAt,
      appliedAt: app.appliedAt,
      updatedAt: app.updatedAt,
    };
  }

  static toCouponPublicHttp(app: CouponPublicResponseDTO): CouponPublicHttpResponseDTO {
    return {
      id: app.id,
      code: app.code,
      discountType: app.discountType,
      discountValue: app.discountValue,
      appliedDiscountAmount: app.appliedDiscountAmount,
      minOrderAmount: app.minOrderAmount,
      expiresAt: app.expiresAt,
    };
  }

  static toCouponValidationHttp(app: CouponValidationResponseDTO): CouponValidationHttpResponseDTO {
    return {
      valid: app.valid,
      code: app.code,
      discountAmount: app.discountAmount,
      reason: app.reason,
    };
  }

  static toVoucherHttp(app: VoucherResponseDTO): VoucherHttpResponseDTO {
    return {
      id: app.id,
      cartId: app.cartId,
      code: app.code,
      status: app.status,
      remainingAmount: app.remainingAmount,
      appliedAmount: app.appliedAmount,
      currency: app.currency,
      expiresAt: app.expiresAt,
      updatedAt: app.updatedAt,
    };
  }

  static toVoucherPublicHttp(app: VoucherPublicResponseDTO): VoucherPublicHttpResponseDTO {
    return {
      id: app.id,
      code: app.code,
      remainingAmount: app.remainingAmount,
      appliedAmount: app.appliedAmount,
      currency: app.currency,
      expiresAt: app.expiresAt,
    };
  }

  static toVoucherValidationHttp(app: VoucherValidationResponseDTO): VoucherValidationHttpResponseDTO {
    return {
      valid: app.valid,
      code: app.code,
      appliedAmount: app.appliedAmount,
      remainingAmount: app.remainingAmount,
      reason: app.reason,
    };
  }
}
