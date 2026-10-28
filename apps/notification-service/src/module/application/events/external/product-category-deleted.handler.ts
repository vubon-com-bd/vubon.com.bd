/**
 * ProductCategoryDeletedHandler
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

export const PRODUCT_CATEGORY_DELETED_EVENT = 'product.category.deleted';

@Injectable()
export class ProductCategoryDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryDeletedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_DELETED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.deletedBy as string) ?? (event as { aggregateId: string }).aggregateId;
      const name = typeof p.name === 'string' ? p.name : '';
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.SYSTEM,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: 'Category Deleted',
          body: name ? 'Category Deleted: ' + name : 'A category has been deleted.',
          data: { eventType: 'product.category.deleted', ...p },
          idempotencyKey: 'category-deleted-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Category deleted notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "product.category.deleted"');
  }
}
