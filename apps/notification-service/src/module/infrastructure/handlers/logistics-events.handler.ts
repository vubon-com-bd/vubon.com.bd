/**
 * LogisticsEventsHandler — cross-service consumer for logistics events
 * @module notification-service/infrastructure/handlers
 *
 * Listens for physical delivery events from logistics-service.
 *
 * ⚠️ Note: order-service ALSO publishes delivery.* events. We subscribe to
 * logistics-service's delivery.delivered / out_for_delivery / failed only,
 * which represent real physical state. Duplicate protection is provided by
 * reference IDs on the notification entity.
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

interface DeliveryEventPayload {
  readonly deliveryId?: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly customerId?: string;
  readonly trackingNumber?: string;
  readonly reason?: string;
  readonly attemptNumber?: number;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

type LogisticsKind = 'out_for_delivery' | 'delivered' | 'failed' | 'attempt_added';

@Injectable()
export class LogisticsEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(LogisticsEventsHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notifications: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    const kinds: readonly LogisticsKind[] = ['out_for_delivery', 'delivered', 'failed', 'attempt_added'];
    for (const kind of kinds) {
      this.eventBus.registerHandler(`delivery.${kind}`, async (event) => {
        await this.onDeliveryEvent(event, kind);
      });
    }
    this.logger.log(`🔗 LogisticsEventsHandler subscribed to delivery.out_for_delivery/delivered/failed/attempt_added`);
  }

  private async onDeliveryEvent(event: unknown, kind: LogisticsKind): Promise<void> {
    const env = event as DomainEventEnvelope;
    const p = (env.payload ?? {}) as DeliveryEventPayload;
    const userId = p.userId ?? p.customerId;

    if (!userId) {
      this.logger.debug(`delivery.${kind} — no userId in payload, skipping (order=${p.orderId ?? 'n/a'})`);
      return;
    }

    // Skip successful attempts in attempt_added (we only notify on failed attempts)
    if (kind === 'attempt_added' && !p.reason) {
      return;
    }

    const tpl = this.template(kind, p);
    this.logger.log(`📬 delivery.${kind} → notify user ${userId}`);

    try {
      await this.notifications.send(
        {
          userId,
          type: tpl.type,
          category: NOTIFICATION_CATEGORY.SHIPPING,
          channels: tpl.channels,
          priority: tpl.priority,
          title: tpl.title,
          body: tpl.body,
          reference: p.shipmentId
            ? { type: 'shipment', id: p.shipmentId, url: `/track/${p.trackingNumber ?? p.shipmentId}` }
            : undefined,
          data: {
            deliveryId: p.deliveryId,
            shipmentId: p.shipmentId,
            orderId: p.orderId,
            trackingNumber: p.trackingNumber,
          },
        },
        'system:logistics-events-handler',
      );
      this.logger.log(`✅ delivery.${kind} notification sent to ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`❌ delivery.${kind} notification failed: ${msg}`);
    }
  }

  private template(kind: LogisticsKind, p: DeliveryEventPayload) {
    const track = p.trackingNumber ? ` (${p.trackingNumber})` : '';
    switch (kind) {
      case 'out_for_delivery':
        return {
          type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
          channels: [NOTIFICATION_CHANNEL.SMS, NOTIFICATION_CHANNEL.PUSH] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'Out for delivery',
          body: `Your parcel${track} is out for delivery today. Please keep your phone reachable.`,
        };
      case 'delivered':
        return {
          type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.PUSH, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'Delivered',
          body: `Your parcel${track} has been delivered. Thank you for shopping with us!`,
        };
      case 'failed':
        return {
          type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
          channels: [NOTIFICATION_CHANNEL.SMS, NOTIFICATION_CHANNEL.PUSH] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'Delivery attempt failed',
          body: `We could not deliver your parcel${track}${p.reason ? `: ${p.reason}` : ''}. We will try again.`,
        };
      case 'attempt_added':
        return {
          type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
          channels: [NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.NORMAL,
          title: 'Delivery update',
          body: `There was an update on your parcel${track}.`,
        };
    }
  }
}
