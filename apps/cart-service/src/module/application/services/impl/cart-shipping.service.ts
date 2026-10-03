/**
 * CartShippingService — implements ICartShippingService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ICartShippingService } from '../interfaces/cart-shipping.service.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  CART_SHIPPING_REPOSITORY,
  type CartShippingRepository,
} from '../../../domain/repositories/cart-shipping.repository.interface.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartShippingEntity } from '../../../domain/entities/cart-shipping.entity.js';
import { CartShippingIdVO } from '../../../domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '../../../domain/value-objects/primitives/cart-shipping-method.vo.js';
import { CartCalculationService } from '../../../domain/services/cart-calculation.service.js';
import { CartMapper } from '../../mappers/cart.mapper.js';
import type { SetShippingMethodRequestDTO } from '../../dtos/requests/shipping/set-shipping-method.dto.js';
import type { CalculateShippingRequestDTO } from '../../dtos/requests/shipping/calculate-shipping.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

@Injectable()
export class CartShippingService implements ICartShippingService {
  private readonly calc = new CartCalculationService();

  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
    @Inject(CART_SHIPPING_REPOSITORY) private readonly shipRepo: CartShippingRepository,
  ) {}

  async setMethod(dto: SetShippingMethodRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const now = new Date().toISOString();
    const method = CartShippingMethodVO.create(dto.method);
    const existing = await this.shipRepo.findByCartId(cart.toIdVO);
    if (existing) {
      existing.changeMethod(method, dto.cost, dto.addressId, now);
      await this.shipRepo.save(existing);
    } else {
      const entity = CartShippingEntity.create({
        id: randomUUID(),
        now,
        props: {
          cartId: cart.toIdVO,
          method,
          cost: dto.cost,
          currency: dto.currency,
          freeShippingThreshold: dto.freeShippingThreshold ?? 0,
          addressId: dto.addressId,
        },
      });
      await this.shipRepo.save(entity);
    }
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async calculate(dto: CalculateShippingRequestDTO): Promise<CartTotalsResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const ship = await this.shipRepo.findByCartId(cart.toIdVO);
    const cost = ship ? ship.effectiveCost(cart.totals.subtotal) : 0;
    const totals = this.calc.calculate({ cart, shippingCost: cost });
    return CartMapper.totalsToResponse(totals);
  }

  private async loadCart(cartId: string): Promise<CartEntity> {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new CartNotFoundApplicationError(cartId);
    return cart;
  }
}

void CartShippingIdVO;
