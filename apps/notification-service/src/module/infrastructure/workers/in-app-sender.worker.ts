import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { IN_APP_QUEUE, type SendInAppJobPayload } from '../queues/in-app.queue';
import { WebSocketProvider } from '../providers/in-app/websocket.provider';

@Injectable()
export class InAppSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(InAppSenderWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly websocket: WebSocketProvider,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<SendInAppJobPayload>(
      IN_APP_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: SendInAppJobPayload): Promise<void> {
    try {
      const result = await this.websocket.send({
        recipient: payload.userId,
        subject: payload.title,
        body: payload.body,
      });

      if (result.success) {
        this.logger.log(`In-app delivered to user ${payload.userId}`);
      } else {
        throw new Error(result.error ?? 'In-app delivery failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`In-app worker error: ${message}`);
      throw error;
    }
  }
}
