/**
 * PartiallyFulfilledHandler — reacts to order.order-fulfillment.partially_fulfilled
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

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { renderPartiallyFulfilledEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const PARTIALLY_FULFILLED_EVENT = 'order.order-fulfillment.partially_fulfilled';

interface PartiallyFulfilledHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly fulfilledItems?: number;
  readonly totalItems?: number;
  readonly name?: string;
  readonly locale?: string;
}

interface PartiallyFulfilledHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-fulfillment.partially_fulfilled';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PartiallyFulfilledHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PartiallyFulfilledHandler implements OnModuleInit {
  private readonly logger = new Logger(PartiallyFulfilledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PARTIALLY_FULFILLED_EVENT, async (event) => {
      await this.handle(event as unknown as PartiallyFulfilledHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PARTIALLY_FULFILLED_EVENT}"`);
  }

  private async handle(event: PartiallyFulfilledHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-fulfillment.partially_fulfilled — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderPartiallyFulfilledEmail({
          name,
          orderId: payload.orderId,
          fulfilledItems: payload.fulfilledItems,
          totalItems: payload.totalItems,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: `আংশিক প্রস্তুত - #{{orderId}}`,
        body: `আপনার অর্ডারের কিছু অংশ প্রস্তুত হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-fulfillment.partially_fulfilled',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `partially-fulfilled-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`PartiallyFulfilledHandler failed: ${msg}`);
    }
  }
}
