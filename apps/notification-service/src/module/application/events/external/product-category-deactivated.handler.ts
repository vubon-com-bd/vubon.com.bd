/**
 * ProductCategoryDeactivatedHandler — product.category.deactivated → Bengali notification
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderCategoryDeactivatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_CATEGORY_DEACTIVATED_EVENT = 'product.category.deactivated';

@Injectable()
export class ProductCategoryDeactivatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryDeactivatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_DEACTIVATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;

      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderCategoryDeactivatedEmail({
            name: ((p.name as string) ?? (typeof p.firstName === 'string' ? p.firstName as string : 'গ্রাহক')),
            locale: (((p.locale as 'en' | 'bn') ?? 'bn')),
            ...p,
          } as any);
        } catch (err) {
          this.logger.warn(`Template render failed: ${err}`);
        }

        const isBn = ((p.locale as string) ?? 'bn') === 'bn';

        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ANNOUNCEMENT,
          category: NOTIFICATION_CATEGORY.PRODUCT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: isBn ? 'ক্যাটাগরি নিষ্ক্রিয়' : 'Deactivated',
          body: html || `প্রিয় গ্রাহক,\n\nএকটি ক্যাটাগরি সাময়িকভাবে নিষ্ক্রিয় করা হয়েছে।\n\nআপনি এখনও অন্যান্য ক্যাটাগরি ব্রাউজ করতে পারবেন।\n\nVubon টিম`,
          data: { eventType: 'product.category.deactivated', ...p , html },
          idempotencyKey: 'product-category-deactivated-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "product.category.deactivated"');
  }
}
