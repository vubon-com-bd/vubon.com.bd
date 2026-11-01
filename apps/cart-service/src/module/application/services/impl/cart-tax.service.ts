/**
 * CartTaxService — Calculate and persist tax
 * @module cart-service/application/services/impl
 *
 * Business rules (BD default):
 *  - VAT: 15% (unless currency exempt)
 *  - Tax applied on (subtotal - discount)
 */
import { Inject, Injectable, Logger } from '@nestjs/common';


import type { ICartTaxService } from '../interfaces/cart-tax.service.interface.js';

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

import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

const DEFAULT_VAT_RATE = 15;
const VAT_EXEMPT_CURRENCIES = new Set(['USD', 'EUR', 'GBP']);

@Injectable()
export class CartTaxService implements ICartTaxService {
  private readonly logger = new Logger(CartTaxService.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
  ) {}

  async calculate(
    cartId: string,
    taxRate?: number,
    taxInclusive = false,
  ): Promise<CartTotalsResponseDTO> {
    const cart = await this.loadCart(cartId);
    const items = await this.itemRepo.findByCartId(cartId);

    const effectiveRate = this.resolveRate(cart.currency, taxRate);

    const breakdown = CartCalculationService.calculate({
      items,
      discountAmount: cart.discountAmount,
      taxRate: effectiveRate,
      shippingCost: cart.shippingAmount,
      taxInclusive,
    });

    return {
      subtotal: breakdown.subtotal,
      discount: breakdown.discount,
      taxableBase: breakdown.taxableBase,
      tax: breakdown.tax,
      shipping: breakdown.shipping,
      total: breakdown.total,
      currency: breakdown.currency,
      itemCount: breakdown.itemCount,
    };
  }

  async recalculate(
    cartId: string,
    taxRate?: number,
    taxInclusive = false,
    actorId?: string,
  ): Promise<CartTotalsResponseDTO> {
    const cart = await this.loadCart(cartId);
    const items = await this.itemRepo.findByCartId(cartId);
    const now = new Date().toISOString();

    const effectiveRate = this.resolveRate(cart.currency, taxRate);

    const breakdown = CartCalculationService.calculate({
      items,
      discountAmount: cart.discountAmount,
      taxRate: effectiveRate,
      shippingCost: cart.shippingAmount,
      taxInclusive,
    });

    cart.updateTotals(
      {
        subtotal: breakdown.subtotal,
        discount: breakdown.discount,
        tax: breakdown.tax,
        shipping: breakdown.shipping,
      },
      now,
    );

    await this.cartRepo.save(cart);
    this.logger.log(`Cart ${cartId} totals recalculated by ${actorId ?? 'system'}`);

    return {
      subtotal: breakdown.subtotal,
      discount: breakdown.discount,
      taxableBase: breakdown.taxableBase,
      tax: breakdown.tax,
      shipping: breakdown.shipping,
      total: breakdown.total,
      currency: breakdown.currency,
      itemCount: breakdown.itemCount,
    };
  }

  // ═══════════════ Helpers ═══════════════

  private resolveRate(currency: string, override?: number): number {
    if (override !== undefined) return override;
    return VAT_EXEMPT_CURRENCIES.has(currency.toUpperCase()) ? 0 : DEFAULT_VAT_RATE;
  }

  private async loadCart(id: string) {
    const vo = CartIdVO.create(id);
    const cart = await this.cartRepo.findByIdVO(vo);
    if (!cart) throw new CartNotFoundApplicationError(id);
    return cart;
  }
}
