import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CartCouponServiceInterface } from '../interfaces/cart-coupon.service.interface';
import type { CartCouponRepository } from '../../../domain/repositories/cart-coupon.repository.interface';
import { CartCouponEntity } from '../../../domain/entities/cart-coupon.entity';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CouponResponseDTO } from '../../dtos/responses/coupon-response.dto';

@Injectable()
export class CartCouponService
  extends BaseService<CartCouponEntity, string>
  implements CartCouponServiceInterface
{
  readonly name = 'CartCouponService';

  constructor(
    @Inject('CartCouponRepository')
    private readonly couponRepo: CartCouponRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByCart(cartId: string): Promise<CouponResponseDTO | null> {
    const entity = await this.couponRepo.findByCartId(CartIdVO.create(cartId));
    if (!entity) return null;
    return {
      code: entity.code.value,
      discount: entity.discount.discount,
      status: entity.status.value,
      discountType: 'percentage',
      appliedAt: new Date().toISOString(),
    };
  }
}
