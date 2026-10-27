/**
 * PaymentFailedHandler — reacts to payment.payment.failed
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

export const PAYMENT_FAILED_EVENT = 'payment.payment.failed';

interface PaymentFailedHandlerPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly reason: string | undefined;
}

interface PaymentFailedHandlerEvent {
  readonly id: string;
  readonly type: 'payment.payment.failed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentFailedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentFailedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_FAILED_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentFailedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_FAILED_EVENT}"`);
  }

  private async handle(event: PaymentFailedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received payment.payment.failed — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Payment Failed',
        body: `Payment for order #{orderId} failed. Reason: {reason}`,
        data: {
          eventType: 'payment.payment.failed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `paymentfailed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`PaymentFailedHandler failed: ${msg}`);
    }
  }
}
