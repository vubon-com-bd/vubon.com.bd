/**
 * CartTaxRemovedHandler — reacts to cart.cart_tax.removed
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
import { renderCartTaxRemovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const CART_TAX_REMOVED_EVENT = 'cart.cart_tax.removed';

interface CartTaxRemovedHandlerPayload {
  readonly cartId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface CartTaxRemovedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart_tax.removed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartTaxRemovedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartTaxRemovedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartTaxRemovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_TAX_REMOVED_EVENT, async (event) => {
      await this.handle(event as unknown as CartTaxRemovedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_TAX_REMOVED_EVENT}"`);
  }

  private async handle(event: CartTaxRemovedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.cart_tax.removed — ${JSON.stringify(payload)}`);

    try {
      const html = renderCartTaxRemovedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.REMINDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'কার্ট থেকে ট্যাক্স সরানো হয়েছে',
        body: 'আপনার কার্ট থেকে ট্যাক্স সরানো হয়েছে।\n\nTax has been removed from your cart.',
        html,
        data: {
          eventType: 'cart.cart_tax.removed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart_tax_removed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartTaxRemovedHandler failed: ${msg}`);
    }
  }
}
