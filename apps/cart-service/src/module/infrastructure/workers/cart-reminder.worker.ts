/**
 * CartReminderWorker — sends reminders (stub for email/sms/push)
 * @module cart-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { REMINDER_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';

export const EMAIL_SERVICE_TOKEN = Symbol('EMAIL_SERVICE_TOKEN');

@Injectable()
export class CartReminderWorker extends BaseWorker {
  constructor() {
    super(REMINDER_QUEUE, CartReminderWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    if (job.name !== JOB_TYPES.REMINDER_SEND) return;
    const { abandonedCartId, channel, reminderNumber } = job.data as {
      abandonedCartId: string;
      channel: string;
      reminderNumber: number;
    };
    // Real impl: use shared-kernel EmailService/SmsService/PushService
    this.logger.log(
      `Reminder #${reminderNumber} (${channel}) for abandoned cart ${abandonedCartId}`,
    );
    void Inject;
  }
}
