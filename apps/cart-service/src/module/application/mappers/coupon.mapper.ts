/**
 * CouponMapper — Entity → Response DTO
 */
import { CartCouponEntity } from '../../domain/entities/cart-coupon.entity.js';
import type { CouponResponseDTO } from '../dtos/responses/coupon-response.dto.js';

export class CouponMapper {
  static toResponse(entity: CartCouponEntity): CouponResponseDTO {
    return {
      cartId: entity.cartId.value,
      code: entity.code.value,
      status: entity.status.value,
      discountAmount: entity.discountAmount,
      currency: entity.currency,
      appliedAt: entity.appliedAt,
    };
  }
}
