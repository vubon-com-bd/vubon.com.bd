/**
 * SavedForLaterRemovedHandler — reacts to cart.saved_for_later.removed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderSavedForLaterRemovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const SAVED_FOR_LATER_REMOVED_EVENT = 'cart.saved_for_later.removed';

interface SavedForLaterRemovedHandlerPayload {
  readonly userId?: string;
  readonly cartId?: string;
  readonly itemId?: string;
  readonly [key: string]: unknown;
}

interface SavedForLaterRemovedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.saved_for_later.removed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: SavedForLaterRemovedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class SavedForLaterRemovedHandler implements OnModuleInit {
  private readonly logger = new Logger(SavedForLaterRemovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SAVED_FOR_LATER_REMOVED_EVENT, async (event) => {
      await this.handle(event as unknown as SavedForLaterRemovedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${SAVED_FOR_LATER_REMOVED_EVENT}"`);
  }

  private async handle(event: SavedForLaterRemovedHandlerEvent): Promise<void> {
    const payload = event.payload;
    const userId = payload.userId ?? event.aggregateId;

    this.logger.log(`Received cart.saved_for_later.removed — userId=${userId}`);

    try {
      // ─── Render Bengali HTML ───
      let html = '';
      try {
        html = renderSavedForLaterRemovedEmail({
          name: ((payload.name as string) ?? (typeof payload.firstName === 'string' ? payload.firstName as string : 'গ্রাহক')),
          locale: (((payload.locale as 'en' | 'bn') ?? 'bn')),
          ...payload,
        } as any);
      } catch (err) {
        this.logger.warn(`Template render failed: ${err}`);
      }

      const isBn = ((payload.locale as string) ?? 'bn') === 'bn';

      await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? 'Removed' : 'Removed',
        body: html || 'Notification sent',
        data: { eventType: 'cart.saved_for_later.removed' , html },
        idempotencyKey: 'cart.saved_for_later.removed-' + (event as { id: string }).id,
      });
      this.logger.log(`✅ Notification sent for ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`SavedForLaterRemovedHandler failed: ${msg}`);
    }
  }
}
