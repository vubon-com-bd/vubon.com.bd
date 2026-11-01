/**
 * CouponMapper — Entity → Response DTO
 * @module cart-service/application/mappers
 */
import type { CartCouponEntity } from '../../domain/entities/cart-coupon.entity.js';
import type { CartVoucherEntity } from '../../domain/entities/cart-voucher.entity.js';
import type {
  CouponResponseDTO,
  CouponPublicResponseDTO,
} from '../dtos/responses/coupon-response.dto.js';
import type {
  VoucherResponseDTO,
  VoucherPublicResponseDTO,
} from '../dtos/responses/voucher-response.dto.js';

export class CouponMapper {
  // ─── Coupon ──────────────────────────────
  static toResponse(entity: CartCouponEntity): CouponResponseDTO {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      code: entity.code.value,
      status: entity.status.value,
      discountType: entity.discount.type,
      discountValue: entity.discount.value_,
      appliedDiscountAmount: entity.appliedDiscountAmount,
      currency: entity.currency,
      minOrderAmount: entity.minOrderAmount,
      expiresAt: entity.expiresAt,
      appliedAt: entity.createdAt,
      updatedAt: entity.updatedAtInternal,
    };
  }

  static toPublicResponse(entity: CartCouponEntity): CouponPublicResponseDTO {
    return {
      id: entity.id,
      code: entity.code.value,
      discountType: entity.discount.type,
      discountValue: entity.discount.value_,
      appliedDiscountAmount: entity.appliedDiscountAmount,
      minOrderAmount: entity.minOrderAmount,
      expiresAt: entity.expiresAt,
    };
  }

  // ─── Voucher ─────────────────────────────
  static voucherToResponse(entity: CartVoucherEntity): VoucherResponseDTO {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      code: entity.code.value,
      status: entity.status.value,
      remainingAmount: entity.remainingAmount,
      appliedAmount: entity.appliedAmount,
      currency: entity.currency,
      expiresAt: entity.expiresAt,
      updatedAt: entity.updatedAtInternal,
    };
  }

  static voucherToPublicResponse(entity: CartVoucherEntity): VoucherPublicResponseDTO {
    return {
      id: entity.id,
      code: entity.code.value,
      remainingAmount: entity.remainingAmount,
      appliedAmount: entity.appliedAmount,
      currency: entity.currency,
      expiresAt: entity.expiresAt,
    };
  }
}
