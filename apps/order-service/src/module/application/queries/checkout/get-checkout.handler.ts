import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCheckoutQuery } from './get-checkout.query.js';
import { CHECKOUT_SERVICE, type ICheckoutService } from '../../services/interfaces/checkout.service.interface.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@QueryHandler(GetCheckoutQuery)
export class GetCheckoutHandler implements IQueryHandler<GetCheckoutQuery, CheckoutResponseDTO> {
  constructor(@Inject(CHECKOUT_SERVICE) private readonly service: ICheckoutService) {}
  async execute(q: GetCheckoutQuery): Promise<CheckoutResponseDTO> {
    return this.service.getById(q.checkoutId);
  }
}
