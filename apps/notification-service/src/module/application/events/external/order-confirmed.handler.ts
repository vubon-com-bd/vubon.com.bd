/**
 * OrderConfirmedHandler — reacts to order-service.order.confirmed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const ORDER_CONFIRMED_EVENT = 'order.order.confirmed';

interface OrderConfirmedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
}

interface OrderConfirmedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.confirmed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderConfirmedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderConfirmedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderConfirmedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CONFIRMED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderConfirmedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CONFIRMED_EVENT}"`);
  }

  private async handle(event: OrderConfirmedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order-service.order.confirmed — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Order Confirmed',
        body: `Your order #{orderId} is confirmed and being processed.`,
        data: {
          eventType: 'order.order.confirmed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `orderconfirmed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderConfirmedHandler failed: ${msg}`);
    }
  }
}
