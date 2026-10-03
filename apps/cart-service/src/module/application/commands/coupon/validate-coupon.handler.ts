import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ValidateCouponCommand } from './validate-coupon.command.js';
import { CART_COUPON_SERVICE, type ICartCouponService } from '../../services/interfaces/cart-coupon.service.interface.js';
import type { CouponValidationResponseDTO } from '../../dtos/responses/coupon-response.dto.js';

@CommandHandler(ValidateCouponCommand)
export class ValidateCouponHandler implements ICommandHandler<ValidateCouponCommand, CouponValidationResponseDTO> {
  constructor(@Inject(CART_COUPON_SERVICE) private readonly service: ICartCouponService) {}
  async execute(c: ValidateCouponCommand): Promise<CouponValidationResponseDTO> {
    return this.service.validate(c.dto);
  }
}
