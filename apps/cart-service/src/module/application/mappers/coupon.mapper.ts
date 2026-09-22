import { Injectable } from '@nestjs/common';
import { CartCouponEntity } from '../../domain/entities/cart-coupon.entity';
import type { CouponResponseDTO } from '../dtos/responses/coupon-response.dto';

@Injectable()
export class CouponMapper {
  toResponse(entity: CartCouponEntity): CouponResponseDTO {
    return {
      code: entity.code.value,
      discount: entity.discount.discount,
      status: entity.status.value,
      discountType: 'percentage',
      appliedAt: new Date().toISOString(),
    };
  }
}
