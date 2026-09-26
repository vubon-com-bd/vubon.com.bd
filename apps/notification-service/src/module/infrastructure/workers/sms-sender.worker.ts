import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { SMS_QUEUE, type SendSmsJobPayload } from '../queues/sms.queue';
import { TwilioProvider } from '../providers/sms/twilio.provider';

@Injectable()
export class SmsSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(SmsSenderWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly twilio: TwilioProvider,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<SendSmsJobPayload>(
      SMS_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: SendSmsJobPayload): Promise<void> {
    try {
      const result = await this.twilio.send({
        recipient: payload.to,
        body: payload.body,
        data: payload.from ? { from: payload.from } : undefined,
      });

      if (result.success) {
        this.logger.log(
          `SMS delivered to ${payload.to} (messageId=${result.messageId})`,
        );
      } else {
        this.logger.error(`SMS failed to ${payload.to}: ${result.error}`);
        throw new Error(result.error ?? 'SMS delivery failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`SMS worker error: ${message}`);
      throw error;
    }
  }
}
