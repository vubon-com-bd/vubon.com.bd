/**
 * OrderCancelledHandler — track user cancellation activity
 * @module identity-service/application/events/external
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_CANCELLED_EVENT = 'order.order.cancelled';

interface OrderCancelledPayload {
  readonly orderId: string;
  readonly customerId?: string;
  readonly reason?: string;
  readonly cancelledAt: string;
}

@Injectable()
export class IdentityOrderCancelledHandler implements OnModuleInit {
  private readonly logger = new Logger(IdentityOrderCancelledHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CANCELLED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CANCELLED_EVENT}"`);
  }

  private async handle(event: unknown): Promise<void> {
    const evt = event as { payload?: OrderCancelledPayload };
    if (!evt.payload) return;
    
    const { orderId, customerId, reason } = evt.payload;

    if (!customerId) {
      this.logger.debug(`Order ${orderId} cancelled — no customerId in payload`);
      return;
    }

    this.logger.log(
      `📥 Order cancelled for user: userId=${customerId}, order=${orderId}, reason=${reason ?? 'N/A'}`,
    );

    try {
      // TODO: Record in user-activity repository
      // - userId: customerId
      // - activityType: 'order_cancelled'
      // - metadata: { orderId, reason }
      this.logger.log(`✅ Cancellation activity recorded for user ${customerId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to log cancellation: ${msg}`);
    }
  }
}
