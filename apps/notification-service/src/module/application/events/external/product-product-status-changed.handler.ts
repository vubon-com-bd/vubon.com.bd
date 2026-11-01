/**
 * ProductProductStatusChangedHandler — reacts to product.product.status_changed
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
import { renderProductProductStatusChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_PRODUCT_STATUS_CHANGED_EVENT = 'product.product.status_changed';

interface ProductProductStatusChangedHandlerPayload {
  readonly productId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductProductStatusChangedHandlerEvent {
  readonly id: string;
  readonly type: 'product.product.status_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductProductStatusChangedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductProductStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductProductStatusChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_PRODUCT_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductProductStatusChangedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_PRODUCT_STATUS_CHANGED_EVENT}"`);
  }

  private async handle(event: ProductProductStatusChangedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.product.status_changed — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductProductStatusChangedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'পণ্যের স্ট্যাটাস পরিবর্তিত হয়েছে',
        body: 'পণ্যের স্ট্যাটাস পরিবর্তন করা হয়েছে।\n\nProduct status has changed.',
        html,
        data: {
          eventType: 'product.product.status_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_product_status_changed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductProductStatusChangedHandler failed: ${msg}`);
    }
  }
}
