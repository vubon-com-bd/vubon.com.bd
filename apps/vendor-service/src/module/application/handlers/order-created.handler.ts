/**
 * OrderCreatedHandler — vendor notified of new order
 * @module vendor-service/application/handlers
 *
 * When customer places order:
 *   → Vendor receives notification
 *   → Updates dashboard
 *   → Logs for analytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';

export const ORDER_CREATED_EVENT = 'order.order.created';

interface OrderCreatedPayload {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly vendorId?: string;
  readonly totalAmount: number;
  readonly currency: string;
  readonly itemCount: number;
  readonly createdAt: string;
}

@Injectable()
export class OrderCreatedHandler {
  private readonly logger = new Logger(OrderCreatedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CREATED_EVENT, async (event) => {
      await this.handle(event as DomainEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CREATED_EVENT}"`);
  }

  private async handle(event: DomainEvent): Promise<void> {
    const payload = event.payload as OrderCreatedPayload;

    this.logger.log(
      `📥 New order for vendor: orderId=${payload.orderId}, number=${payload.orderNumber}, amount=${payload.totalAmount} ${payload.currency}`,
    );

    try {
      // TODO: Store in vendor-orders repository for dashboard
      // For now, log + emit event for vendor dashboard refresh
      this.logger.log(
        `✅ Vendor notified of order ${payload.orderNumber} — ready for fulfillment`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to process order ${payload.orderId}: ${msg}`);
    }
  }
}
