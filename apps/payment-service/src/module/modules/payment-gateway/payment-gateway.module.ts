/**
 * PaymentGatewayModule — feature wiring for gateway listing
 * @module payment-service/modules/payment-gateway
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controller ─────────────────────────────
import { PaymentGatewayController } from '@interfaces/controllers/rest/payment-gateway.controller';

// ─── Handler arrays ─────────────────────────
import { PAYMENT_GATEWAY_QUERY_HANDLERS } from './queries/index.js';

// ─── Service + interface token ──────────────
import { PaymentGatewayService } from '@application/services/impl/payment-gateway.service';
import { PAYMENT_GATEWAY_SERVICE } from '@application/services/interfaces/payment-gateway.service.interface';

@Module({
  imports: [CqrsModule],
  controllers: [PaymentGatewayController],
  providers: [
    PaymentGatewayService,
    { provide: PAYMENT_GATEWAY_SERVICE, useExisting: PaymentGatewayService },
    ...(PAYMENT_GATEWAY_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [PaymentGatewayService, PAYMENT_GATEWAY_SERVICE],
})
export class PaymentGatewayModule {}
