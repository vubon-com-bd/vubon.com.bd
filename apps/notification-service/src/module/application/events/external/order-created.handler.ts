/**
 * OrderCreatedHandler — reacts to order-service.order.created
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

export const ORDER_CREATED_EVENT = 'order.order.created';

interface OrderCreatedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly total: number;
  readonly currency: string;
}

interface OrderCreatedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.created';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderCreatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CREATED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderCreatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CREATED_EVENT}"`);
  }

  private async handle(event: OrderCreatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order-service.order.created — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Order Confirmed',
        body: `Your order #{orderId} has been created. Total: {total} {currency}`,
        data: {
          eventType: 'order.order.created',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `ordercreated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderCreatedHandler failed: ${msg}`);
    }
  }
}
