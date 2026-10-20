/**
 * NotificationService — multi-channel (email/SMS/push) facade
 * @module order-service/infrastructure/external/notification
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  EmailService,
  SmsService,
  PushService,
} from '@vubon/shared-kernel/infrastructure/external';

export interface NotifyInput {
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly channels?: readonly ('email' | 'sms' | 'push')[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly email: EmailService,
    private readonly sms: SmsService,
    private readonly push: PushService,
  ) {}

  async send(input: NotifyInput): Promise<{
    readonly email?: boolean;
    readonly sms?: boolean;
    readonly push?: boolean;
  }> {
    const channels = input.channels ?? ['push'];
    const results: { email?: boolean; sms?: boolean; push?: boolean } = {};

    for (const channel of channels) {
      try {
        if (channel === 'push') {
          await this.push.send({
            deviceToken: `user:${input.userId}`,
            title: input.title,
            body: input.body,
            data: input.metadata as Record<string, unknown> | undefined,
          });
          results.push = true;
        } else if (channel === 'email') {
          await this.email.send({
            to: `${input.userId}@vubon.com.bd`,
            subject: input.title,
            text: input.body,
          });
          results.email = true;
        } else if (channel === 'sms') {
          await this.sms.send({
            to: input.userId,
            message: input.body,
          });
          results.sms = true;
        }
      } catch (err) {
        this.logger.warn(
          `Channel ${channel} failed for ${input.userId}: ${
            err instanceof Error ? err.message : 'unknown'
          }`,
        );
      }
    }

    return results;
  }
}
