/**
 * ProductPublishedHandler — notifies vendor when product is published
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_PUBLISHED_EVENT = 'product.product.published';

@Injectable()
export class ProductPublishedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductPublishedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_PUBLISHED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_PUBLISHED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `পণ্য এখন live` : `Product is Live`,
        body: isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার পণ্য "${payload?.productName ?? ""}" এখন গ্রাহকদের কাছে live হয়েছে।` : `Hi ${payload?.name ?? "Vendor"}, your product "${payload?.productName ?? ""}" is now live for customers.`,
        data: { eventType: 'product.product.published', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `product-published-${event.id}`,
      });
      this.logger.log(`✅ ProductPublishedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`ProductPublishedHandler failed: ${err}`);
    }
  }
}
