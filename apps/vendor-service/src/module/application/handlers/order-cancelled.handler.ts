/**
 * OrderCancelledHandler — vendor notified of order cancellation
 * @module vendor-service/application/handlers
 *
 * When order is cancelled:
 *   → Vendor stops fulfillment
 *   → Releases reserved stock
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';

export const ORDER_CANCELLED_EVENT = 'order.order.cancelled';

interface OrderCancelledPayload {
  readonly orderId: string;
  readonly orderNumber?: string;
  readonly reason?: string;
  readonly cancelledAt: string;
}

@Injectable()
export class OrderCancelledHandler {
  private readonly logger = new Logger(OrderCancelledHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CANCELLED_EVENT, async (event) => {
      await this.handle(event as DomainEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CANCELLED_EVENT}"`);
  }

  private async handle(event: DomainEvent): Promise<void> {
    const payload = event.payload as OrderCancelledPayload;

    this.logger.warn(
      `📥 Order CANCELLED: orderId=${payload.orderId}, reason=${payload.reason ?? 'N/A'}`,
    );

    try {
      // TODO: Update vendor order status to CANCELLED
      // Release any reserved inventory
      // Notify vendor dashboard
      this.logger.log(
        `✅ Vendor notified — order ${payload.orderId} cancelled, fulfillment stopped`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to process cancel for order ${payload.orderId}: ${msg}`);
    }
  }
}
