/**
 * ListGatewaysHandler
 * @module payment-service/application/queries/gateway
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListGatewaysQuery } from './list-gateways.query.js';
import {
  PAYMENT_GATEWAY_SERVICE,
  type IPaymentGatewayService,
  type GatewayListResponseDTO,
} from '@application/services/interfaces/payment-gateway.service.interface.js';

@QueryHandler(ListGatewaysQuery)
export class ListGatewaysHandler
  implements IQueryHandler<ListGatewaysQuery, GatewayListResponseDTO>
{
  constructor(
    @Inject(PAYMENT_GATEWAY_SERVICE)
    private readonly service: IPaymentGatewayService,
  ) {}
  async execute(q: ListGatewaysQuery): Promise<GatewayListResponseDTO> {
    return this.service.list({
      page: q.page,
      limit: q.limit,
      filter: q.filter,
    });
  }
}
