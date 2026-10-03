import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveCouponCommand } from './remove-coupon.command.js';
import { CART_COUPON_SERVICE, type ICartCouponService } from '../../services/interfaces/cart-coupon.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(RemoveCouponCommand)
export class RemoveCouponHandler implements ICommandHandler<RemoveCouponCommand, CartResponseDTO> {
  constructor(@Inject(CART_COUPON_SERVICE) private readonly service: ICartCouponService) {}
  async execute(c: RemoveCouponCommand): Promise<CartResponseDTO> {
    return this.service.remove(c.dto);
  }
}
