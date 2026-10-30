/**
 * RestockedHandler — reacts to order.order-fulfillment.restocked
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
import { renderRestockedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const RESTOCKED_EVENT = 'order.order-fulfillment.restocked';

interface RestockedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly productName?: string;
  readonly quantity?: number;
  readonly name?: string;
  readonly locale?: string;
}

interface RestockedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-fulfillment.restocked';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: RestockedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class RestockedHandler implements OnModuleInit {
  private readonly logger = new Logger(RestockedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(RESTOCKED_EVENT, async (event) => {
      await this.handle(event as unknown as RestockedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${RESTOCKED_EVENT}"`);
  }

  private async handle(event: RestockedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-fulfillment.restocked — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderRestockedEmail({
          name,
          orderId: payload.orderId,
          productName: payload.productName,
          quantity: payload.quantity,
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
        subject: `স্টক পুনরুদ্ধার - #{{orderId}}`,
        body: html || `অর্ডারের পণ্য স্টকে ফেরত এসেছে।`,
        data: {
          html,
          eventType: 'order.order-fulfillment.restocked',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `restocked-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`RestockedHandler failed: ${msg}`);
    }
  }
}
