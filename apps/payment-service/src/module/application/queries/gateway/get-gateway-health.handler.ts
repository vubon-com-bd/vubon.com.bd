/**
 * GetGatewayHealthHandler
 * @module payment-service/application/queries/gateway
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetGatewayHealthQuery } from './get-gateway-health.query.js';
import {
  PAYMENT_GATEWAY_SERVICE,
  type IPaymentGatewayService,
  type GatewayHealthDTO,
} from '@application/services/interfaces/payment-gateway.service.interface.js';

@QueryHandler(GetGatewayHealthQuery)
export class GetGatewayHealthHandler
  implements IQueryHandler<GetGatewayHealthQuery, readonly GatewayHealthDTO[]>
{
  constructor(
    @Inject(PAYMENT_GATEWAY_SERVICE)
    private readonly service: IPaymentGatewayService,
  ) {}
  async execute(_q: GetGatewayHealthQuery): Promise<readonly GatewayHealthDTO[]> {
    return this.service.getHealth();
  }
}
