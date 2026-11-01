/**
 * CartMergerStartedHandler — reacts to cart.cart_merger.started
 * @module notification-service/application/events/external
 *
 * Bengali + English mixed content with HTML email template
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderCartMergerStartedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const CART_MERGER_STARTED_EVENT = 'cart.cart_merger.started';

interface CartMergerStartedHandlerPayload {
  readonly mergerId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface CartMergerStartedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart_merger.started';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartMergerStartedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartMergerStartedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartMergerStartedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_MERGER_STARTED_EVENT, async (event) => {
      await this.handle(event as unknown as CartMergerStartedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_MERGER_STARTED_EVENT}"`);
  }

  private async handle(event: CartMergerStartedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.cart_merger.started — ${JSON.stringify(payload)}`);

    try {
      const html = renderCartMergerStartedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.REMINDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'কার্ট মার্জ শুরু হয়েছে',
        body: 'আপনার কার্টগুলো একসাথে মার্জ করা হচ্ছে।\n\nYour carts are being merged together.',
        html,
        data: {
          eventType: 'cart.cart_merger.started',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart_merger_started-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartMergerStartedHandler failed: ${msg}`);
    }
  }
}
