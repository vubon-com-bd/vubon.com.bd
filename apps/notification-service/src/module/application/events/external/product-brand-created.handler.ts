/**
 * ProductBrandCreatedHandler — admin alert
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY, NOTIFICATION_TYPE, NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform';
import { renderBrandCreatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { NOTIFICATION_SERVICE, type INotificationService } from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_BRAND_CREATED_EVENT = 'product.brand.created';

@Injectable()
export class ProductBrandCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductBrandCreatedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_BRAND_CREATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.createdBy as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderBrandCreatedEmail({
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
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.SYSTEM,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: isBn ? 'ব্র্যান্ড তৈরি' : 'Created',
          body: html || 'Notification sent',
          data: { eventType: PRODUCT_BRAND_CREATED_EVENT, ...p , html },
          idempotencyKey: `brand-created-${(event as { id: string }).id}`,
        });
      } catch (err) {
        this.logger.error(`Failed: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_BRAND_CREATED_EVENT}"`);
  }
}
