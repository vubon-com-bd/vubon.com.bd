/**
 * NotificationDispatcherWorker
 */
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@vubon/shared-kernel/infrastructure';
import { UserEmailService } from '../external/email/email.service.js';
import { UserSmsService } from '../external/sms/sms.service.js';
import { UserPushService } from '../external/push/push.service.js';

export interface NotificationJob {
  readonly id: string;
  readonly data: {
    readonly userId: string;
    readonly channel: 'email' | 'sms' | 'push';
    readonly template: string;
    readonly data: Record<string, unknown>;
  };
}

@Injectable()
export class NotificationDispatcherWorker {
  constructor(
    private readonly email: UserEmailService,
    private readonly sms: UserSmsService,
    private readonly push: UserPushService,
    private readonly logger: LoggerService
  ) {}

  async process(job: NotificationJob): Promise<void> {
    const { userId, channel, template } = job.data;
    this.logger.log(`Dispatching ${channel} notification for ${userId}`, {
      userId,
      channel,
      template,
    });

    try {
      switch (channel) {
        case 'email':
          // Real: resolve template + call email.sendXxx
          break;
        case 'sms':
          // Real: call sms.sendXxx
          break;
        case 'push':
          // Real: call push.send
          break;
        default:
          this.logger.warn(`Unknown channel: ${String(channel)}`);
      }
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Notification dispatch failed: ${reason}`, undefined, {
        userId,
        channel,
      });
      throw err;
    }
  }
}
