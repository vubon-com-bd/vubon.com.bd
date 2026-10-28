/**
 * ReturnRejectedHandler — notifies return rejection
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

export const RETURN_REJECTED_EVENT = 'order.order-return.rejected';

@Injectable()
export class ReturnRejectedHandler implements OnModuleInit {
  private readonly logger = new Logger(ReturnRejectedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(RETURN_REJECTED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${RETURN_REJECTED_EVENT}"`);
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
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `❌ রিটার্ন rejected` : `❌ Return Rejected`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, দুঃখিত! আপনার রিটার্ন request rejected হয়েছে। কারণ: ${payload?.reason ?? "N/A"}` : `Hi ${payload?.name ?? "Customer"}, sorry! Your return request was rejected. Reason: ${payload?.reason ?? "N/A"}`,
        data: { eventType: 'order.order-return.rejected', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `return-rejected-${event.id}`,
      });
      this.logger.log(`✅ ReturnRejectedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`ReturnRejectedHandler failed: ${err}`);
    }
  }
}
