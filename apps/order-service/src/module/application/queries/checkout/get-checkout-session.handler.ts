/**
 * GetCheckoutSessionHandler
 * @module order-service/application/queries/checkout
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCheckoutSessionQuery } from './get-checkout-session.query.js';
import {
  CHECKOUT_SESSION_SERVICE,
  type ICheckoutSessionService,
} from '../../services/interfaces/checkout-session.service.interface.js';
import type { CheckoutSessionResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@QueryHandler(GetCheckoutSessionQuery)
export class GetCheckoutSessionHandler
  implements IQueryHandler<GetCheckoutSessionQuery, CheckoutSessionResponseDTO>
{
  constructor(
    @Inject(CHECKOUT_SESSION_SERVICE)
    private readonly service: ICheckoutSessionService,
  ) {}

  async execute(q: GetCheckoutSessionQuery): Promise<CheckoutSessionResponseDTO> {
    return this.service.getById(q.sessionId);
  }
}
