/**
 * CartCouponService
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type { ICartCouponService } from '../interfaces/cart-coupon.service.interface.js';

import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  CART_COUPON_REPOSITORY,
  type CartCouponRepository,
} from '../../../domain/repositories/cart-coupon.repository.interface.js';

import { CartCouponEntity } from '../../../domain/entities/cart-coupon.entity.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../../../domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '../../../domain/value-objects/primitives/coupon-discount.vo.js';

import {
  CartNotFoundApplicationError,
  CartIdempotencyConflictError,
} from '../../errors/cart.errors.js';
import {
  CouponNotFoundApplicationError,
  CouponAlreadyAppliedApplicationError,
  ApplyCouponError,
  RemoveCouponError,
  CouponNotApplicableApplicationError,
} from '../../errors/coupon.errors.js';

import type {
  ApplyCouponRequestDTO,
  RemoveCouponRequestDTO,
  ValidateCouponRequestDTO,
} from '../../dtos/requests/coupon/index.js';
import type {
  CouponResponseDTO,
  CouponPublicResponseDTO,
  CouponValidationResponseDTO,
} from '../../dtos/responses/coupon-response.dto.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@Injectable()
export class CartCouponService implements ICartCouponService {
  private readonly logger = new Logger(CartCouponService.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    @Inject(CART_COUPON_REPOSITORY)
    private readonly couponRepo: CartCouponRepository,
  ) {}

  async apply(
    dto: ApplyCouponRequestDTO,
    actorId?: string,
  ): Promise<CouponResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const code = CouponCodeVO.create(dto.code);

    // ─── Already applied check ───
    const exists = await this.couponRepo.existsByCartAndCode(cart.id, code.value);
    if (exists) {
      throw new CouponAlreadyAppliedApplicationError(cart.id, code.value);
    }

    if (!cart.canBeModified()) {
      throw new CouponNotApplicableApplicationError(
        code.value,
        `Cart status "${cart.status.value}" is not modifiable`,
      );
    }

    const now = new Date().toISOString();
    const id = randomUUID();

    let entity: CartCouponEntity;
    try {
      entity = CartCouponEntity.create({
        id,
        now,
        props: {
          cartId: CartIdVO.create(cart.id),
          code,
          status: CouponStatusVO.active(),
          // NOTE: real coupon metadata fetched from coupon-service via saga
          discount: CouponDiscountVO.create({ type: 'percentage', value: 0 }),
          appliedDiscountAmount: 0,
          currency: cart.currency,
          expiresAt: this.defaultExpiry(now),
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ApplyCouponError(code.value, msg);
    }

    const saved = await this.couponRepo.save(entity);
    this.logger.log(`Coupon ${code.value} applied to cart ${cart.id} by ${actorId ?? 'system'}`);
    return this.toResponse(saved);
  }

  async remove(
    dto: RemoveCouponRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const existing = await this.couponRepo.findByCartAndCode(cart.id, dto.code);

    if (!existing) {
      throw new CouponNotFoundApplicationError(dto.code);
    }

    const now = new Date().toISOString();
    try {
      existing.disable(now);
      await this.couponRepo.save(existing);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new RemoveCouponError(dto.code, msg);
    }

    this.logger.log(`Coupon ${dto.code} removed from cart ${cart.id} by ${actorId ?? 'system'}`);
    return {
      success: true,
      cartId: cart.id,
      message: 'Coupon removed',
      at: now,
    };
  }

  async validate(
    dto: ValidateCouponRequestDTO,
  ): Promise<CouponValidationResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const code = CouponCodeVO.create(dto.code);

    const existing = await this.couponRepo.findByCartAndCode(cart.id, code.value);

    if (!existing) {
      return {
        valid: false,
        code: code.value,
        discountAmount: 0,
        reason: 'Coupon not found or not applied',
      };
    }

    if (!existing.canBeApplied(cart.subtotal)) {
      return {
        valid: false,
        code: code.value,
        discountAmount: 0,
        reason: 'Coupon not applicable for current cart',
      };
    }

    const discountAmount = existing.discount.calculate(cart.subtotal);

    return {
      valid: true,
      code: code.value,
      discountAmount,
    };
  }

  async getByCartId(cartId: string): Promise<readonly CouponResponseDTO[]> {
    const items = await this.couponRepo.findByCartId(cartId);
    return items.map((i) => this.toResponse(i));
  }

  async getPublicByCartId(cartId: string): Promise<CouponPublicResponseDTO | null> {
    const item = await this.couponRepo.findUsableByCartId(cartId);
    return item ? this.toPublicResponse(item) : null;
  }

  // ═══════════════ Helpers ═══════════════

  private async loadCart(id: string) {
    const vo = CartIdVO.create(id);
    const cart = await this.cartRepo.findByIdVO(vo);
    if (!cart) throw new CartNotFoundApplicationError(id);
    return cart;
  }

  private toResponse(entity: CartCouponEntity): CouponResponseDTO {
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

  private toPublicResponse(entity: CartCouponEntity): CouponPublicResponseDTO {
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

  private defaultExpiry(now: string): string {
    const d = new Date(now);
    d.setDate(d.getDate() + 30);
    return d.toISOString();
  }
}
