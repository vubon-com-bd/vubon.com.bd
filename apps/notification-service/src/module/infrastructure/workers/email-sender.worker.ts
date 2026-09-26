import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { EMAIL_QUEUE, type SendEmailJobPayload } from '../queues/email.queue';
import { SendGridProvider } from '../providers/email/sendgrid.provider';

@Injectable()
export class EmailSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(EmailSenderWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly sendGrid: SendGridProvider,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<SendEmailJobPayload>(
      EMAIL_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: SendEmailJobPayload): Promise<void> {
    try {
      const result = await this.sendGrid.send({
        recipient: payload.to,
        subject: payload.subject,
        body: payload.text ?? payload.html ?? '',
        bodyHtml: payload.html,
      });

      if (result.success) {
        this.logger.log(
          `Email delivered to ${payload.to} (messageId=${result.messageId})`,
        );
      } else {
        this.logger.error(`Email failed to ${payload.to}: ${result.error}`);
        throw new Error(result.error ?? 'SendGrid delivery failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Email worker error for ${payload.to}: ${message}`);
      throw error;
    }
  }
}
