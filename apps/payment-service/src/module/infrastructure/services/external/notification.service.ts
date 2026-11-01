/**
 * PaymentNotificationService — multi-channel dispatcher
 * @module payment-service/infrastructure/services/external
 *
 * Splits a notification across email + SMS + push based on template preferences.
 * Fire-and-forget: never throws, always logs.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PaymentEmailService } from './email.service.js';
import { PaymentSmsService } from './sms.service.js';
import { PaymentPushService } from './push.service.js';

export const PAYMENT_NOTIFICATION_SERVICE = Symbol('PAYMENT_NOTIFICATION_SERVICE');

export type NotificationChannel = 'email' | 'sms' | 'push';

export interface PaymentNotificationPayload {
  readonly userId: string;
  readonly email?: string;
  readonly phone?: string;
  readonly template: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly channels?: readonly NotificationChannel[];
}

const DEFAULT_CHANNELS: readonly NotificationChannel[] = ['email', 'push'];

@Injectable()
export class PaymentNotificationService {
  private readonly logger = new Logger(PaymentNotificationService.name);

  constructor(
    private readonly email: PaymentEmailService,
    private readonly sms: PaymentSmsService,
    private readonly push: PaymentPushService,
  ) {}

  async notify(payload: PaymentNotificationPayload): Promise<void> {
    const channels = payload.channels ?? DEFAULT_CHANNELS;
    const tasks: Promise<boolean>[] = [];

    if (channels.includes('email') && payload.email) {
      tasks.push(
        this.email.send({
          to: payload.email,
          template: payload.template,
          data: payload.data,
        }),
      );
    }
    if (channels.includes('sms') && payload.phone) {
      tasks.push(
        this.sms.send({
          to: payload.phone,
          template: payload.template,
          data: payload.data,
        }),
      );
    }
    if (channels.includes('push')) {
      tasks.push(
        this.push.send({
          userId: payload.userId,
          template: payload.template,
          data: payload.data,
        }),
      );
    }

    const results = await Promise.allSettled(tasks);
    const succeeded = results.filter(
      (r) => r.status === 'fulfilled' && r.value === true,
    ).length;
    this.logger.debug(
      `[notify] ${payload.template} → user=${payload.userId} sent=${succeeded}/${tasks.length}`,
    );
  }
}
