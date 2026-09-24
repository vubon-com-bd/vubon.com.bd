import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { WEBHOOK_QUEUE, type SendWebhookJobPayload } from '../queues/webhook.queue';
import { HttpWebhookProvider } from '../providers/webhook/http.provider';

@Injectable()
export class WebhookSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(WebhookSenderWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly httpProvider: HttpWebhookProvider,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<SendWebhookJobPayload>(
      WEBHOOK_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: SendWebhookJobPayload): Promise<void> {
    try {
      const result = await this.httpProvider.send({
        recipient: payload.url,
        subject: payload.event,
        body: JSON.stringify(payload.payload ?? {}),
      });
      if (result.success) {
        this.logger.log(`Webhook delivered: ${payload.url}`);
      } else {
        this.logger.error(`Webhook failed: ${result.error}`);
        throw new Error(result.error ?? 'webhook delivery failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Webhook worker error: ${message}`);
      throw error;
    }
  }
}
