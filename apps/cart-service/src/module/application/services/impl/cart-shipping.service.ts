/**
 * CartShippingService
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';


import type {
  ICartShippingService,
  ShippingCalculationResponseDTO,
} from '../interfaces/cart-shipping.service.interface.js';

import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';

import { CartCalculationService } from '../../../domain/services/cart-calculation.service.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';

import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

import type {
  SetShippingMethodRequestDTO,
  CalculateShippingRequestDTO,
} from '../../dtos/requests/shipping/index.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

const DEFAULT_SHIPPING_COST: Record<string, number> = {
  standard: 60,
  express: 150,
  same_day: 250,
  pickup: 0,
  international: 1500,
};

const DEFAULT_ESTIMATED_DAYS: Record<string, number> = {
  standard: 5,
  express: 2,
  same_day: 0,
  pickup: 0,
  international: 15,
};

@Injectable()
export class CartShippingService implements ICartShippingService {
  private readonly logger = new Logger(CartShippingService.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
  ) {}

  async setMethod(
    dto: SetShippingMethodRequestDTO,
    actorId?: string,
  ): Promise<CartTotalsResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const items = await this.itemRepo.findByCartId(dto.cartId);
    const now = new Date().toISOString();

    const cost = dto.cost ?? DEFAULT_SHIPPING_COST[dto.method] ?? 0;

    const breakdown = CartCalculationService.calculate({
      items,
      discountAmount: cart.discountAmount,
      taxRate: 0,
      shippingCost: cost,
      freeShippingAbove: dto.freeAbove,
    });

    cart.updateTotals(
      {
        subtotal: breakdown.subtotal,
        discount: breakdown.discount,
        tax: cart.taxAmount,
        shipping: breakdown.shipping,
      },
      now,
    );

    await this.cartRepo.save(cart);
    this.logger.log(
      `Cart ${cart.id} shipping method set to ${dto.method} (${cost}) by ${actorId ?? 'system'}`,
    );

    return {
      subtotal: cart.subtotal,
      discount: cart.discountAmount,
      taxableBase: Math.round((cart.subtotal - cart.discountAmount) * 100) / 100,
      tax: cart.taxAmount,
      shipping: cart.shippingAmount,
      total: cart.total,
      currency: cart.currency,
      itemCount: cart.itemCount,
    };
  }

  async calculate(
    dto: CalculateShippingRequestDTO,
  ): Promise<ShippingCalculationResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const cost = DEFAULT_SHIPPING_COST[dto.method] ?? 0;
    const isFree = cost === 0;

    return {
      cartId: cart.id,
      method: dto.method,
      cost,
      currency: cart.currency,
      isFree,
      estimatedDays: DEFAULT_ESTIMATED_DAYS[dto.method],
    };
  }

  async clear(
    cartId: string,
    actorId?: string,
  ): Promise<CartTotalsResponseDTO> {
    const cart = await this.loadCart(cartId);
    const now = new Date().toISOString();

    cart.updateTotals(
      {
        subtotal: cart.subtotal,
        discount: cart.discountAmount,
        tax: cart.taxAmount,
        shipping: 0,
      },
      now,
    );

    await this.cartRepo.save(cart);
    this.logger.log(`Cart ${cartId} shipping cleared by ${actorId ?? 'system'}`);

    return {
      subtotal: cart.subtotal,
      discount: cart.discountAmount,
      taxableBase: Math.round((cart.subtotal - cart.discountAmount) * 100) / 100,
      tax: cart.taxAmount,
      shipping: 0,
      total: cart.total,
      currency: cart.currency,
      itemCount: cart.itemCount,
    };
  }

  private async loadCart(id: string) {
    const vo = CartIdVO.create(id);
    const cart = await this.cartRepo.findByIdVO(vo);
    if (!cart) throw new CartNotFoundApplicationError(id);
    return cart;
  }
}
