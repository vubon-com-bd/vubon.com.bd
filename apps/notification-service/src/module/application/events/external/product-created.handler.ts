/**
 * ProductCreatedHandler — notifies vendor when product is created
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

export const PRODUCT_CREATED_EVENT = 'product.product.created';

@Injectable()
export class ProductCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CREATED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CREATED_EVENT}"`);
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
        subject: isBn ? `পণ্য তৈরি হয়েছে` : `Product Created`,
        body: isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার পণ্য "${payload?.productName ?? ""}" সফলভাবে তৈরি হয়েছে।` : `Hi ${payload?.name ?? "Vendor"}, your product "${payload?.productName ?? ""}" has been created.`,
        data: { eventType: 'product.product.created', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `product-created-${event.id}`,
      });
      this.logger.log(`✅ ProductCreatedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`ProductCreatedHandler failed: ${err}`);
    }
  }
}
