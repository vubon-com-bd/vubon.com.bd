/**
 * PaymentFailedHandler — cancels order when payment fails
 * @module order-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';

export const PAYMENT_FAILED_EVENT = 'payment.payment.failed';

interface PaymentFailedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason: string;
  readonly errorCode?: string;
  readonly failedAt: string;
}

interface PaymentFailedEvent {
  readonly id: string;
  readonly type: 'payment.payment.failed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentFailedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentFailedHandler.name);

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_FAILED_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentFailedEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_FAILED_EVENT}"`);
  }

  private async handle(event: PaymentFailedEvent): Promise<void> {
    const { paymentId, orderId, reason } = event.payload;

    this.logger.log(
      `Received payment.failed — orderId=${orderId} paymentId=${paymentId} reason=${reason}`,
    );

    try {
      const order = await this.orderRepo.findByIdVO(
        OrderIdVO.reconstitute(orderId),
      );
      if (!order) {
        this.logger.warn(`Order ${orderId} not found — skipping payment-failed handling`);
        return;
      }

      if (order.status.isCancelled()) {
        this.logger.debug(`Order ${orderId} already cancelled — skipping`);
        return;
      }

      // Cancel order on payment failure
      if (typeof (order as never as { cancel?: (reason: string) => void }).cancel === 'function') {
        (order as never as { cancel: (reason: string) => void }).cancel(
          `Payment failed: ${reason}`,
        );
        await this.orderRepo.save(order);
        this.logger.log(`✅ Order ${orderId} cancelled (payment ${paymentId} failed)`);
      } else {
        this.logger.warn(
          `OrderEntity.cancel() not available — order ${orderId} status unchanged`,
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `PaymentFailedHandler failed for order ${orderId}: ${msg}`,
      );
    }
  }
}
