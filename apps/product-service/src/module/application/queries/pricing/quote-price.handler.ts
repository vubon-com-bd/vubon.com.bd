import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { QuotePriceQuery } from './quote-price.query.js';
import { PRICING_SERVICE, type IPricingService } from '../../services/interfaces/pricing.service.interface.js';

export interface QuotePriceResult {
  readonly unitPrice: number;
  readonly subtotal: number;
  readonly taxAmount: number;
  readonly total: number;
  readonly currency: string;
}

@QueryHandler(QuotePriceQuery)
export class QuotePriceHandler implements IQueryHandler<QuotePriceQuery, QuotePriceResult> {
  constructor(@Inject(PRICING_SERVICE) private readonly service: IPricingService) {}
  async execute(q: QuotePriceQuery): Promise<QuotePriceResult> {
    return this.service.quotePrice(q.productId, q.quantity);
  }
}
