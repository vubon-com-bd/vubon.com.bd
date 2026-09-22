import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PaymentGatewayController } from '../../interfaces/controllers/rest/payment-gateway.controller';
import { PaymentGatewayService } from '../../application/services/impl/payment-gateway.service';
import { ListGatewaysHandler } from '../../application/queries/gateway/list-gateways.handler';
import { GetGatewayHandler } from '../../application/queries/gateway/get-gateway.handler';
import { GetRevenueHandler } from '../../application/queries/analytics/get-revenue.handler';

@Module({
  imports: [CqrsModule],
  controllers: [PaymentGatewayController],
  providers: [
    PaymentGatewayService,
    ListGatewaysHandler,
    GetGatewayHandler,
    GetRevenueHandler,
  ],
  exports: [PaymentGatewayService],
})
export class PaymentGatewayModule {}
