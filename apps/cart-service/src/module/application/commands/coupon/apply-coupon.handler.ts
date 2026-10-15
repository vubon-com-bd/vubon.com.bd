import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApplyCouponCommand } from './apply-coupon.command.js';
import {
  CART_COUPON_SERVICE,
  type ICartCouponService,
} from '../../services/interfaces/cart-coupon.service.interface.js';
import type { CouponResponseDTO } from '../../dtos/responses/coupon-response.dto.js';

@CommandHandler(ApplyCouponCommand)
export class ApplyCouponHandler
  implements ICommandHandler<ApplyCouponCommand, CouponResponseDTO>
{
  constructor(
    @Inject(CART_COUPON_SERVICE)
    private readonly service: ICartCouponService,
  ) {}

  async execute(c: ApplyCouponCommand): Promise<CouponResponseDTO> {
    return this.service.apply(c.dto, c.actorId);
  }
}
