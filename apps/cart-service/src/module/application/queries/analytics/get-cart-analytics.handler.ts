import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCartAnalyticsQuery } from './get-cart-analytics.query.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';

export interface CartAnalyticsDTO {
  readonly totalCarts: number;
  readonly activeCarts: number;
  readonly convertedCarts: number;
  readonly abandonedCarts: number;
  readonly conversionRate: number;
  readonly from?: string;
  readonly to?: string;
}

@QueryHandler(GetCartAnalyticsQuery)
export class GetCartAnalyticsHandler implements IQueryHandler<GetCartAnalyticsQuery, CartAnalyticsDTO> {
  constructor(@Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository) {}

  async execute(q: GetCartAnalyticsQuery): Promise<CartAnalyticsDTO> {
    const all = await this.cartRepo.findAll();
    const active = all.filter((c) => c.isActive()).length;
    const converted = all.filter((c) => c.status.isConverted()).length;
    const abandoned = all.filter((c) => c.status.isAbandoned()).length;
    const total = all.length;
    return {
      totalCarts: total,
      activeCarts: active,
      convertedCarts: converted,
      abandonedCarts: abandoned,
      conversionRate: total === 0 ? 0 : Math.round((converted / total) * 10000) / 100,
      from: q.fromDate,
      to: q.toDate,
    };
  }
}
