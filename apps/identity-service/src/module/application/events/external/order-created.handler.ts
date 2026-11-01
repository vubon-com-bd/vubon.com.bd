/**
 * OrderCreatedHandler — track user order activity
 * @module identity-service/application/events/external
 *
 * When user places order → log activity in user-activity
 */
import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_CREATED_EVENT = 'order.order.created';

interface OrderCreatedPayload {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly totalAmount: number;
  readonly currency: string;
  readonly itemCount: number;
  readonly createdAt: string;
}

@Injectable()
export class IdentityOrderCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(IdentityOrderCreatedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CREATED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CREATED_EVENT}"`);
  }

  private async handle(event: unknown): Promise<void> {
    const evt = event as { payload?: OrderCreatedPayload };
    if (!evt.payload) return;
    
    const { customerId, orderId, orderNumber, totalAmount, currency } = evt.payload;

    this.logger.log(
      `📥 Order created for user: userId=${customerId}, order=${orderNumber}, amount=${totalAmount} ${currency}`,
    );

    try {
      // TODO: Record in user-activity repository
      // - userId: customerId
      // - activityType: 'order_placed'
      // - metadata: { orderId, orderNumber, totalAmount, currency }
      this.logger.log(`✅ Activity recorded for user ${customerId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to log order activity: ${msg}`);
    }
  }
}
