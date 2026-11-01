/**
 * CartTotalsRecalculatedHandler — reacts to cart.cart.totals_recalculated
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
import { renderCartTotalsRecalculatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const CART_TOTALS_RECALCULATED_EVENT = 'cart.cart.totals_recalculated';

interface CartTotalsRecalculatedHandlerPayload {
  readonly cartId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface CartTotalsRecalculatedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart.totals_recalculated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartTotalsRecalculatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartTotalsRecalculatedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartTotalsRecalculatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_TOTALS_RECALCULATED_EVENT, async (event) => {
      await this.handle(event as unknown as CartTotalsRecalculatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_TOTALS_RECALCULATED_EVENT}"`);
  }

  private async handle(event: CartTotalsRecalculatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.cart.totals_recalculated — ${JSON.stringify(payload)}`);

    try {
      const html = renderCartTotalsRecalculatedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.REMINDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'কার্টের মোট পুনঃগণনা হয়েছে',
        body: 'আপনার কার্টের মোট মূল্য পুনরায় গণনা করা হয়েছে।\n\nYour cart totals have been recalculated.',
        html,
        data: {
          eventType: 'cart.cart.totals_recalculated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart_totals_recalculated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartTotalsRecalculatedHandler failed: ${msg}`);
    }
  }
}
