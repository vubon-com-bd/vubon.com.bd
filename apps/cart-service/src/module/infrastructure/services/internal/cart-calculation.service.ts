import { Injectable } from '@nestjs/common';
import { CartCalculationService as DomainCalculationService } from '../../../domain/services/cart-calculation.service';
import type { CartItemEntity } from '../../../domain/entities/cart-item.entity';
import { TaxClient } from '../external/tax.client';
import { ShippingClient } from '../external/shipping.client';

export interface CartTotalsOutput {
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly shippingTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
}

@Injectable()
export class CartCalculationService {
  constructor(
    private readonly domainCalculation: DomainCalculationService,
    private readonly taxClient: TaxClient,
    private readonly shippingClient: ShippingClient,
  ) {}

  async calculateFull(
    items: readonly CartItemEntity[],
    context: {
      readonly country: string;
      readonly currency: string;
      readonly discountTotal: number;
      readonly shippingMethod?: string;
    },
  ): Promise<CartTotalsOutput> {
    const base = this.domainCalculation.calculate(items, {
      discountTotal: context.discountTotal,
      currency: context.currency,
    });

    const tax = await this.taxClient.calculate({
      country: context.country,
      subtotal: base.subtotal - base.discountTotal,
      currency: context.currency,
    });

    const shippingOptions = await this.shippingClient.calculate({
      country: context.country,
      subtotal: base.subtotal,
      currency: context.currency,
    });

    const shipping = context.shippingMethod
      ? shippingOptions.find((s) => s.method === context.shippingMethod)
      : shippingOptions[0];

    const final = this.domainCalculation.calculate(items, {
      discountTotal: context.discountTotal,
      taxTotal: tax?.amount ?? 0,
      shippingTotal: shipping?.cost ?? 0,
      currency: context.currency,
    });

    return final;
  }
}
