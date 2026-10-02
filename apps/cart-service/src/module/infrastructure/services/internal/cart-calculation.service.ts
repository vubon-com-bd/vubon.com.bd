/**
 * CartCalculationService (infrastructure) — combines domain calc + external tax/shipping
 * @module cart-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartCalculationService as DomainCalc } from '../../../domain/services/cart-calculation.service.js';
import { CartTotalsCompositeVO } from '../../../domain/value-objects/composites/cart-totals.vo.js';
import { CartTaxRateVO } from '../../../domain/value-objects/primitives/cart-tax-rate.vo.js';
import { TaxClient } from '../external/tax.client.js';
import { ShippingClient } from '../external/shipping.client.js';

export const CART_CALCULATION_SERVICE = Symbol('CART_CALCULATION_SERVICE');

@Injectable()
export class CartCalculationService {
  private readonly logger = new Logger(CartCalculationService.name);
  private readonly domain = new DomainCalc();

  constructor(
    private readonly tax: TaxClient,
    private readonly shipping: ShippingClient,
  ) {}

  async calculateWithExternals(params: {
    cart: CartEntity;
    region?: string;
    shippingMethod?: string;
    addressId?: string;
    couponDiscount?: number;
    voucherDiscount?: number;
  }): Promise<CartTotalsCompositeVO> {
    const { cart } = params;
    let taxRate: CartTaxRateVO | undefined;
    let shippingCost = 0;

    // Tax
    if (params.region) {
      const t = await this.tax.calculate(cart.totals.subtotal, params.region);
      if (t) taxRate = CartTaxRateVO.create(t.rate);
    }

    // Shipping
    if (params.shippingMethod) {
      const q = await this.shipping.quote({
        method: params.shippingMethod,
        subtotal: cart.totals.subtotal,
        addressId: params.addressId,
      });
      if (q) shippingCost = q.cost;
    }

    return this.domain.calculate({
      cart,
      couponDiscount: params.couponDiscount,
      voucherDiscount: params.voucherDiscount,
      taxRate,
      taxInclusive: false,
      shippingCost,
    });
  }

  /** Pure local calculation (no external calls) */
  calculateLocal(cart: CartEntity): CartTotalsCompositeVO {
    return this.domain.calculate({ cart });
  }
}
