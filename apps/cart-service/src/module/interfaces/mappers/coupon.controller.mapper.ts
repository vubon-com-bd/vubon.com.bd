import { Injectable } from '@nestjs/common';
import type { CartCouponEntity } from '../../domain/entities/cart-coupon.entity';
import { CouponResponseDto } from '../dtos/responses/coupon.response.dto';

@Injectable()
export class CouponControllerMapper {
  toResponse(entity: CartCouponEntity): CouponResponseDto {
    return {
      code: entity.code.value,
      valid: entity.status.value === 'active',
      discount: entity.discount.discount,
    };
  }
}
