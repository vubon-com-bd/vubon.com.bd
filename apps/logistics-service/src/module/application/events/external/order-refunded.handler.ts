/**
 * OrderRefundedHandler — audits refund event
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_REFUNDED_EVENT = 'order.order.refunded';

interface OrderRefundedPayload {
  readonly orderId: string;
  readonly refundAmount: number;
  readonly currency: string;
  readonly refundedAt: string;
}

interface OrderEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderRefundedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderRefundedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_REFUNDED_EVENT, async (event) => {
      try { await this.handle(event as unknown as OrderEvent); }
      catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`OrderRefundedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${ORDER_REFUNDED_EVENT}"`);
  }

  private async handle(event: OrderEvent): Promise<void> {
    const p = event.payload;
    if (!p?.orderId) return;
    this.logger.log(`Received order.refunded — orderId=${p.orderId}, amount=${p.refundAmount} ${p.currency}`);
  }
}
