import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListGatewaysQuery } from './list-gateways.query';
import type { PaymentGatewayRepository } from '../../../domain/repositories/payment-gateway.repository.interface';
import type { GatewayView } from './get-gateway.handler';

@QueryHandler(ListGatewaysQuery)
export class ListGatewaysHandler
  extends BaseQueryHandler<ListGatewaysQuery, readonly GatewayView[]>
  implements IQueryHandler<ListGatewaysQuery>
{
  readonly queryType = 'gateway.list';

  constructor(
    @Inject('PaymentGatewayRepository')
    private readonly gatewayRepo: PaymentGatewayRepository,
  ) {
    super();
  }

  async execute(_query: ListGatewaysQuery): Promise<readonly GatewayView[]> {
    const entities = await this.gatewayRepo.findActive();
    return entities.map((e) => ({
      id: e.id,
      gateway: e.gateway.value,
      status: e.status,
      env: e.env,
      isLocal: e.isLocal,
      supportedCurrencies: e.supportedCurrencies,
    }));
  }
}
