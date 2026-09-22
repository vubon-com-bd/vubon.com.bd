import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetGatewayQuery } from './get-gateway.query';
import type { PaymentGatewayRepository } from '../../../domain/repositories/payment-gateway.repository.interface';

export interface GatewayView {
  readonly id: string;
  readonly gateway: string;
  readonly status: string;
  readonly env: string;
  readonly isLocal: boolean;
  readonly supportedCurrencies: readonly string[];
}

@QueryHandler(GetGatewayQuery)
export class GetGatewayHandler
  extends BaseQueryHandler<GetGatewayQuery, GatewayView | null>
  implements IQueryHandler<GetGatewayQuery>
{
  readonly queryType = 'gateway.get';

  constructor(
    @Inject('PaymentGatewayRepository')
    private readonly gatewayRepo: PaymentGatewayRepository,
  ) {
    super();
  }

  async execute(query: GetGatewayQuery): Promise<GatewayView | null> {
    const entity = await this.gatewayRepo.findByGateway(query.gateway);
    if (!entity) return null;
    return {
      id: entity.id,
      gateway: entity.gateway.value,
      status: entity.status,
      env: entity.env,
      isLocal: entity.isLocal,
      supportedCurrencies: entity.supportedCurrencies,
    };
  }
}
