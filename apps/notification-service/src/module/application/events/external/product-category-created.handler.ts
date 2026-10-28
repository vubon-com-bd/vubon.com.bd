/**
 * ProductCategoryCreatedHandler
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY, NOTIFICATION_TYPE, NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform';
import { NOTIFICATION_SERVICE, type INotificationService } from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_CATEGORY_CREATED_EVENT = 'product.category.created';

@Injectable()
export class ProductCategoryCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryCreatedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_CREATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.createdBy as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.SYSTEM,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'Category Created',
          body: `New category created: ${(p.name as string) ?? 'N/A'}`,
          data: { eventType: PRODUCT_CATEGORY_CREATED_EVENT, ...p },
          idempotencyKey: `category-created-${(event as { id: string }).id}`,
        });
      } catch (err) {
        this.logger.error(`Failed: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CATEGORY_CREATED_EVENT}"`);
  }
}
