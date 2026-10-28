/**
 * ReturnClosedHandler — notifies return closure
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

export const RETURN_CLOSED_EVENT = 'order.order-return.closed';

@Injectable()
export class ReturnClosedHandler implements OnModuleInit {
  private readonly logger = new Logger(ReturnClosedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(RETURN_CLOSED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${RETURN_CLOSED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `✅ রিটার্ন প্রক্রিয়া সম্পন্ন` : `✅ Return Closed`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার রিটার্ন প্রক্রিয়া সম্পন্ন হয়েছে। ধন্যবাদ!` : `Hi ${payload?.name ?? "Customer"}, your return has been closed. Thanks!`,
        data: { eventType: 'order.order-return.closed', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `return-closed-${event.id}`,
      });
      this.logger.log(`✅ ReturnClosedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`ReturnClosedHandler failed: ${err}`);
    }
  }
}
