/**
 * OrderEventsHandler — cross-service consumer for order events
 * @module notification-service/infrastructure/handlers
 *
 * Listens on the BullMQ 'domain-events' queue for events emitted by
 * order-service. Sends notification to the customer for each order status
 * transition (created, confirmed, shipped, delivered, cancelled).
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from '@vubon/shared-constants/platform/notification';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../application/services/interfaces/notification.service.interface.js';

type OrderStatus = 'created' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

interface OrderEventPayload {
  readonly orderId?: string;
  readonly orderNumber?: string;
  readonly customerId?: string;
  readonly userId?: string;
  readonly total?: number;
  readonly currency?: string;
  readonly reason?: string;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

@Injectable()
export class OrderEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderEventsHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notifications: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    const statuses: readonly OrderStatus[] = ['created', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    for (const status of statuses) {
      this.eventBus.registerHandler(`order.${status}`, async (event) => {
        await this.onOrderStatus(event, status);
      });
    }
    this.logger.log(`🔗 OrderEventsHandler subscribed to order.created/confirmed/shipped/delivered/cancelled`);
  }

  private async onOrderStatus(event: unknown, status: OrderStatus): Promise<void> {
    const env = event as DomainEventEnvelope;
    const p = (env.payload ?? {}) as OrderEventPayload;
    const userId = p.customerId ?? p.userId;
    const orderRef = p.orderNumber ?? p.orderId ?? 'unknown';

    if (!userId) {
      this.logger.warn(`order.${status} — missing customerId/userId, skipping`);
      return;
    }

    const tpl = this.template(status, orderRef);
    this.logger.log(`📬 order.${status} → notify user ${userId} (order ${orderRef})`);

    try {
      await this.notifications.send(
        {
          userId,
          type: tpl.type,
          category: NOTIFICATION_CATEGORY.ORDER,
          channels: tpl.channels,
          priority: tpl.priority,
          title: tpl.title,
          body: tpl.body,
          reference: p.orderId
            ? { type: 'order', id: p.orderId, url: `/orders/${p.orderId}` }
            : undefined,
          data: { orderId: p.orderId, orderNumber: p.orderNumber, status },
        },
        'system:order-events-handler',
      );
      this.logger.log(`✅ order.${status} notification sent to ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`❌ order.${status} notification failed: ${msg}`);
    }
  }

  private template(status: OrderStatus, orderRef: string) {
    switch (status) {
      case 'created':
        return {
          type: NOTIFICATION_TYPE.ORDER_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: `Order ${orderRef} received`,
          body: `We received your order ${orderRef}. We will notify you as it progresses.`,
        };
      case 'confirmed':
        return {
          type: NOTIFICATION_TYPE.ORDER_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.NORMAL,
          title: `Order ${orderRef} confirmed`,
          body: `Your order ${orderRef} has been confirmed and is being prepared.`,
        };
      case 'shipped':
        return {
          type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
          channels: [NOTIFICATION_CHANNEL.PUSH, NOTIFICATION_CHANNEL.SMS] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: `Order ${orderRef} shipped`,
          body: `Good news! Order ${orderRef} is on the way. Track it in the app.`,
        };
      case 'delivered':
        return {
          type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.PUSH, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: `Order ${orderRef} delivered`,
          body: `Order ${orderRef} has been delivered. Please share your feedback.`,
        };
      case 'cancelled':
        return {
          type: NOTIFICATION_TYPE.ORDER_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: `Order ${orderRef} cancelled`,
          body: `Your order ${orderRef} has been cancelled. Any applicable refund will be processed shortly.`,
        };
    }
  }
}
