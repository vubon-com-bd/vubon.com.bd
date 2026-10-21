/**
 * PaymentModule — feature wiring for payments
 * @module payment-service/modules/payment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// ─── Controller ─────────────────────────────
import { PaymentController } from '@interfaces/controllers/rest/payment.controller';
import { AnalyticsController } from '@interfaces/controllers/rest/analytics.controller';
import { GetRevenueHandler } from '@application/queries/analytics/get-revenue.handler';
import { GetPaymentMethodsAnalyticsHandler } from '@application/queries/analytics/get-payment-methods.handler';

// ─── Handler arrays ─────────────────────────
import { PAYMENT_COMMAND_HANDLERS } from './commands/index.js';
import { PAYMENT_QUERY_HANDLERS } from './queries/index.js';
import { PAYMENT_SAGAS } from './sagas/index.js';
import { UpdateAnalyticsHandler } from '@application/commands/saga-commands/update-analytics.handler';
import { NotifyPaymentSuccessHandler } from '@application/commands/saga-commands/notify-payment-success.handler';
import { UpdateOrderStatusHandler } from '@application/commands/saga-commands/update-order-status.handler';
import { NotifyRefundProcessedHandler } from '@application/commands/saga-commands/notify-refund-processed.handler';
import { SendInvoiceEmailHandler } from '@application/commands/saga-commands/send-invoice-email.handler';

// ─── External Event Handlers + Subscriber ───
import { PaymentEventSubscriberService } from '@application/events/payment-event-subscriber.service';
import { OrderCreatedHandler } from '@application/events/external/order-created.handler';
import { OrderCancelledHandler } from '@application/events/external/order-cancelled.handler';

// ─── Service + interface token ──────────────
import { PaymentService } from '@application/services/impl/payment.service';
import {
  PAYMENT_SERVICE,
} from '@application/services/interfaces/payment.service.interface';
import { DOMAIN_EVENT_BRIDGE } from '@application/services/impl/payment.service';

// ─── Guards + Interceptor ───────────────────
import { OwnPaymentGuard } from '@interfaces/guards/own-payment.guard';
import { PaymentCacheInterceptor } from '@interfaces/interceptors/payment-cache.interceptor';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  controllers: [PaymentController, AnalyticsController],
  providers: [
    UpdateAnalyticsHandler,
    NotifyPaymentSuccessHandler,
    UpdateOrderStatusHandler,
    NotifyRefundProcessedHandler,
    SendInvoiceEmailHandler,

    // ─── External Event Handlers + Subscriber ───
    PaymentEventSubscriberService,
    OrderCreatedHandler,
    OrderCancelledHandler,

    GetRevenueHandler,
    GetPaymentMethodsAnalyticsHandler,
    PaymentService,
    { provide: PAYMENT_SERVICE, useExisting: PaymentService },
    // ─── Bridge the local DOMAIN_EVENT_BRIDGE symbol to kernel service ─
    {
      provide: DOMAIN_EVENT_BRIDGE,
      useExisting: DomainEventBridgeService,
    },
    ...(PAYMENT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(PAYMENT_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(PAYMENT_SAGAS as readonly unknown[] as never[]),
    OwnPaymentGuard,
    PaymentCacheInterceptor,
  ],
  exports: [PaymentService, PAYMENT_SERVICE],
})
export class PaymentModule {}
