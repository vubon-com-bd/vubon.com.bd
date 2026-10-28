/**
 * GuestCartAbandonedHandler — reacts to cart.guest_cart.abandoned
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

export const GUEST_CART_ABANDONED_EVENT = 'cart.guest_cart.abandoned';

interface GuestCartAbandonedHandlerPayload {
  readonly userId?: string;
  readonly cartId?: string;
  readonly itemId?: string;
  readonly [key: string]: unknown;
}

interface GuestCartAbandonedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.guest_cart.abandoned';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: GuestCartAbandonedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class GuestCartAbandonedHandler implements OnModuleInit {
  private readonly logger = new Logger(GuestCartAbandonedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(GUEST_CART_ABANDONED_EVENT, async (event) => {
      await this.handle(event as unknown as GuestCartAbandonedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${GUEST_CART_ABANDONED_EVENT}"`);
  }

  private async handle(event: GuestCartAbandonedHandlerEvent): Promise<void> {
    const payload = event.payload;
    const userId = payload.userId ?? event.aggregateId;

    this.logger.log(`Received cart.guest_cart.abandoned — userId=${userId}`);

    try {
      await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.REMINDER,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'Guest Cart Abandoned',
        body: 'You left items in your cart. Complete checkout to save them!',
        data: {
          eventType: 'cart.guest_cart.abandoned',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `guest-cart-abandoned-${event.id}`,
      });

      this.logger.log(`✅ Notification sent for ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`GuestCartAbandonedHandler failed: ${msg}`);
    }
  }
}
