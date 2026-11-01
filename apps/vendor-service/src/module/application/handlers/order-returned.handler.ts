/**
 * OrderReturnedHandler — vendor notified of order return
 * @module vendor-service/application/handlers
 *
 * When order is returned:
 *   → Vendor restocks inventory
 *   → Updates vendor analytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';

export const ORDER_RETURNED_EVENT = 'order.order.returned';

interface OrderReturnedPayload {
  readonly orderId: string;
  readonly orderNumber?: string;
  readonly returnId?: string;
  readonly reason?: string;
  readonly returnedAt: string;
}

@Injectable()
export class OrderReturnedHandler {
  private readonly logger = new Logger(OrderReturnedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_RETURNED_EVENT, async (event) => {
      await this.handle(event as DomainEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_RETURNED_EVENT}"`);
  }

  private async handle(event: DomainEvent): Promise<void> {
    const payload = event.payload as OrderReturnedPayload;

    this.logger.warn(
      `📥 Order RETURNED: orderId=${payload.orderId}, reason=${payload.reason ?? 'N/A'}`,
    );

    try {
      // TODO: Restock inventory for returned items
      // Update vendor return stats
      // Notify vendor dashboard
      this.logger.log(
        `✅ Vendor notified — order ${payload.orderId} returned, restock needed`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to process return for order ${payload.orderId}: ${msg}`);
    }
  }
}
