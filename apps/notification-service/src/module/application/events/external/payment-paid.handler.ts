/**
 * PaymentPaidHandler — reacts to payment.payment.paid
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

export const PAYMENT_PAID_EVENT = 'payment.payment.paid';

interface PaymentPaidHandlerPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
}

interface PaymentPaidHandlerEvent {
  readonly id: string;
  readonly type: 'payment.payment.paid';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentPaidHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentPaidHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentPaidHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_PAID_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentPaidHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_PAID_EVENT}"`);
  }

  private async handle(event: PaymentPaidHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received payment.payment.paid — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Payment Received',
        body: `Payment of {amount} {currency} received for order #{orderId}.`,
        data: {
          eventType: 'payment.payment.paid',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `paymentpaid-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`PaymentPaidHandler failed: ${msg}`);
    }
  }
}
