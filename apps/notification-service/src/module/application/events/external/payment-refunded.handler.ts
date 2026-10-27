/**
 * PaymentRefundedHandler — reacts to payment.payment.refunded
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

export const PAYMENT_REFUNDED_EVENT = 'payment.payment.refunded';

interface PaymentRefundedHandlerPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
}

interface PaymentRefundedHandlerEvent {
  readonly id: string;
  readonly type: 'payment.payment.refunded';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentRefundedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentRefundedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_REFUNDED_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentRefundedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_REFUNDED_EVENT}"`);
  }

  private async handle(event: PaymentRefundedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received payment.payment.refunded — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Refund Processed',
        body: `Refund of {amount} processed for order #{orderId}.`,
        data: {
          eventType: 'payment.payment.refunded',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `paymentrefunded-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`PaymentRefundedHandler failed: ${msg}`);
    }
  }
}
