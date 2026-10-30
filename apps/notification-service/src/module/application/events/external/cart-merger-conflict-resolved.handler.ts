/**
 * CartMergerConflictResolvedHandler — reacts to cart.cart_merger.conflict_resolved
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
import { renderCartMergerConflictResolvedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const CART_MERGER_CONFLICT_RESOLVED_EVENT = 'cart.cart_merger.conflict_resolved';

interface CartMergerConflictResolvedHandlerPayload {
  readonly mergerId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface CartMergerConflictResolvedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart_merger.conflict_resolved';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartMergerConflictResolvedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartMergerConflictResolvedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartMergerConflictResolvedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_MERGER_CONFLICT_RESOLVED_EVENT, async (event) => {
      await this.handle(event as unknown as CartMergerConflictResolvedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_MERGER_CONFLICT_RESOLVED_EVENT}"`);
  }

  private async handle(event: CartMergerConflictResolvedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.cart_merger.conflict_resolved — ${JSON.stringify(payload)}`);

    try {
      const html = renderCartMergerConflictResolvedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.REMINDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'কার্ট মার্জ দ্বন্দ্ব সমাধান হয়েছে',
        body: 'কার্ট মার্জের দ্বন্দ্বগুলো সমাধান করা হয়েছে।\n\nCart merger conflicts have been resolved.',
        html,
        data: {
          eventType: 'cart.cart_merger.conflict_resolved',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart_merger_conflict_resolved-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartMergerConflictResolvedHandler failed: ${msg}`);
    }
  }
}
