import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CartCouponEntity } from '../../../domain/entities/cart-coupon.entity';
import type { CouponResponseDTO } from '../../dtos/responses/coupon-response.dto';

export interface CartCouponServiceInterface
  extends BaseServiceInterface<CartCouponEntity, string> {
  findByCart(cartId: string): Promise<CouponResponseDTO | null>;
}
