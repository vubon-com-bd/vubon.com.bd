/**
 * PaymentEventsHandler — cross-service consumer for payment events
 * @module order-service/infrastructure/handlers
 *
 * Listens on the BullMQ 'domain-events' queue for events emitted by
 * payment-service. Advances order state based on payment lifecycle.
 *
 *   payment.captured → order.confirm({ orderId, paymentId })
 *   payment.failed   → order.hold({ orderId, reason })
 *   payment.refunded → order.putOnHold (manual review)
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../application/services/interfaces/order.service.interface.js';

interface PaymentCapturedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
}

interface PaymentFailedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly reason: string;
  readonly code?: string;
}

interface PaymentRefundedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly amount: number;
  readonly fullyRefunded: boolean;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

@Injectable()
export class PaymentEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentEventsHandler.name);

  constructor(
    @Inject(ORDER_SERVICE) private readonly orderService: IOrderService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('payment.captured', async (event) => {
      const env = event as unknown as DomainEventEnvelope;
      const payload = env.payload as PaymentCapturedPayload;
      this.logger.log(
        `💳 payment.captured received → payment=${payload.paymentId} order=${payload.orderId} amount=${payload.amount} ${payload.currency}`,
      );
      try {
        await this.orderService.confirm(
          { orderId: payload.orderId, paymentId: payload.paymentId },
          'system:payment-events-handler',
        );
        this.logger.log(`✅ Order ${payload.orderId} CONFIRMED via payment ${payload.paymentId}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(`❌ Order confirm failed for ${payload.orderId}: ${msg}`);
        // Do not rethrow — BullMQ worker must keep consuming
      }
    });

    this.eventBus.registerHandler('payment.failed', async (event) => {
      const env = event as unknown as DomainEventEnvelope;
      const payload = env.payload as PaymentFailedPayload;
      this.logger.log(
        `⚠️ payment.failed received → payment=${payload.paymentId} order=${payload.orderId} reason=${payload.reason}`,
      );
      try {
        await this.orderService.hold(
          { orderId: payload.orderId, reason: `Payment failed: ${payload.reason}` },
          'system:payment-events-handler',
        );
        this.logger.log(`✅ Order ${payload.orderId} put ON_HOLD after payment failure`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(`❌ Order hold failed for ${payload.orderId}: ${msg}`);
      }
    });

    this.eventBus.registerHandler('payment.refunded', async (event) => {
      const env = event as unknown as DomainEventEnvelope;
      const payload = env.payload as PaymentRefundedPayload;
      this.logger.log(
        `💸 payment.refunded received → payment=${payload.paymentId} order=${payload.orderId} amount=${payload.amount} fully=${payload.fullyRefunded}`,
      );
      try {
        await this.orderService.hold(
          {
            orderId: payload.orderId,
            reason: `Refund issued: ${payload.amount} (fully_refunded=${payload.fullyRefunded})`,
          },
          'system:payment-events-handler',
        );
        this.logger.log(`✅ Order ${payload.orderId} put ON_HOLD after refund`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(`❌ Order hold failed for ${payload.orderId}: ${msg}`);
      }
    });

    this.logger.log(
      `🔗 PaymentEventsHandler subscribed to payment.captured/failed/refunded on domain-events queue`,
    );
  }
}
