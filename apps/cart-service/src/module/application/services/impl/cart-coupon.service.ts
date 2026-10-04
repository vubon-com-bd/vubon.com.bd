/**
 * CartCouponService — implements ICartCouponService
 */
import { Inject, Injectable } from '@nestjs/common';
import type { ICartCouponService } from '../interfaces/cart-coupon.service.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartCouponCompositeVO } from '../../../domain/value-objects/composites/cart-coupon.vo.js';
import { CouponCodeVO } from '../../../domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../domain/value-objects/primitives/coupon-status.vo.js';
import { COUPON_STATUS, COUPON_DISCOUNT_TYPE } from '@vubon/shared-constants/business/cart';
import { CouponValidationService } from '../../../domain/services/coupon-validation.service.js';
import { CartMapper } from '../../mappers/cart.mapper.js';
import type { ApplyCouponRequestDTO } from '../../dtos/requests/coupon/apply-coupon.dto.js';
import type { RemoveCouponRequestDTO } from '../../dtos/requests/coupon/remove-coupon.dto.js';
import type { ValidateCouponRequestDTO } from '../../dtos/requests/coupon/validate-coupon.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import type { CouponValidationResponseDTO } from '../../dtos/responses/coupon-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';
import { CouponNotApplicableError } from '../../errors/coupon.errors.js';

@Injectable()
export class CartCouponService implements ICartCouponService {
  private readonly validator = new CouponValidationService();

  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
  ) {}

  async apply(dto: ApplyCouponRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    // Stub coupon data (in real impl: fetch from coupon-service via CouponClient)
    const coupon = this.stubCoupon(dto.code);
    const result = this.validator.validate(coupon, {
      subtotal: cart.totals.subtotal,
      currency: cart.currency,
      userId: dto.userId,
    });
    if (!result.valid) {
      throw new CouponNotApplicableError(dto.code, result.reason ?? 'invalid');
    }
    cart.applyCoupon(dto.code.toUpperCase(), result.discount, new Date().toISOString());
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async remove(dto: RemoveCouponRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    cart.removeCoupon(dto.reason);
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async validate(dto: ValidateCouponRequestDTO): Promise<CouponValidationResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const coupon = this.stubCoupon(dto.code);
    const result = this.validator.validate(coupon, {
      subtotal: cart.totals.subtotal,
      currency: cart.currency,
      userId: dto.userId,
    });
    return {
      valid: result.valid,
      code: dto.code,
      discountAmount: result.discount,
      reason: result.reason,
      errorCode: result.errorCode,
    };
  }

  private stubCoupon(code: string): CartCouponCompositeVO {
    const now = new Date();
    const future = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return CartCouponCompositeVO.create({
      code: CouponCodeVO.create(code),
      status: CouponStatusVO.create(COUPON_STATUS.ACTIVE),
      discountType: COUPON_DISCOUNT_TYPE.CART_PERCENTAGE,
      discountValue: 10,
      maxUses: 1000,
      usedCount: 0,
      maxUsesPerUser: 1,
      userUsageCount: 0,
      validFrom: now.toISOString(),
      validUntil: future.toISOString(),
      stackable: false,
    });
  }

  private async loadCart(cartId: string): Promise<CartEntity> {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new CartNotFoundApplicationError(cartId);
    return cart;
  }
}
