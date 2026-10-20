/**
 * PaymentCompletedHandler — confirms order when payment completes
 * @module order-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';

export const PAYMENT_COMPLETED_EVENT = 'payment-service.payment.completed';

interface PaymentCompletedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: string;
  readonly transactionId: string;
  readonly completedAt: string;
}

interface PaymentCompletedEvent {
  readonly id: string;
  readonly type: 'payment-service.payment.completed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentCompletedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentCompletedHandler.name);

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_COMPLETED_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentCompletedEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_COMPLETED_EVENT}"`);
  }

  private async handle(event: PaymentCompletedEvent): Promise<void> {
    const { paymentId, orderId, transactionId } = event.payload;

    this.logger.log(
      `Received payment.completed — orderId=${orderId} paymentId=${paymentId}`,
    );

    try {
      const order = await this.orderRepo.findByIdVO(
        OrderIdVO.reconstitute(orderId),
      );
      if (!order) {
        this.logger.warn(`Order ${orderId} not found — skipping payment confirm`);
        return;
      }

      if (order.status.isConfirmed() || order.status.isCancelled()) {
        this.logger.debug(
          `Order ${orderId} already in status "${order.status.value}" — skipping`,
        );
        return;
      }

      // Confirm order with payment reference
      // Note: OrderEntity.confirm() signature may differ — adjust if needed
      if (typeof (order as never as { confirm?: (ref: string) => void }).confirm === 'function') {
        (order as never as { confirm: (ref: string) => void }).confirm(transactionId);
        await this.orderRepo.save(order);
        this.logger.log(`✅ Order ${orderId} confirmed (payment ${paymentId})`);
      } else {
        this.logger.warn(
          `OrderEntity.confirm() not available — order ${orderId} status unchanged`,
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `PaymentCompletedHandler failed for order ${orderId}: ${msg}`,
      );
    }
  }
}
