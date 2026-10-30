/**
 * ProductDeletedHandler — notifies product deletion
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderProductDeletedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_DELETED_EVENT = 'product.product.deleted';

@Injectable()
export class ProductDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductDeletedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_DELETED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_DELETED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      // ─── Render Bangla HTML template ───
      const payloadAny = payload as unknown as Record<string, unknown>;
      const html = renderProductDeletedEmail({
      name: (payload.name as string) ?? 'ভেন্ডর',
      productName: (payload.productName as string) ?? '',
      deletedAt: (payload.deletedAt as string) ?? new Date().toISOString(),
      locale: (payload.locale as 'en' | 'bn') ?? 'bn',
    });

      
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `পণ্য মুছে ফেলা হয়েছে` : `Product Deleted`,
        body: html || isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার পণ্য "${payload?.productName ?? ""}" সফলভাবে মুছে ফেলা হয়েছে।` : `Hi ${payload?.name ?? "Vendor"}, your product "${payload?.productName ?? ""}" has been deleted.`,
        data: {
          html, eventType: 'product.product.deleted', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `product-deleted-${event.id}`,
      });
      this.logger.log(`✅ ProductDeletedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`ProductDeletedHandler failed: ${err}`);
    }
  }
}
