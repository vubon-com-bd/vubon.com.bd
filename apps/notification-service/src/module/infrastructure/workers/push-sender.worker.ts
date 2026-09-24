import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { PUSH_QUEUE, type SendPushJobPayload } from '../queues/push.queue';
import { FcmProvider } from '../providers/push/fcm.provider';

@Injectable()
export class PushSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(PushSenderWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly fcm: FcmProvider,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<SendPushJobPayload>(
      PUSH_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: SendPushJobPayload): Promise<void> {
    try {
      const result = await this.fcm.send({
        recipient: payload.deviceToken,
        body: payload.body,
        data: payload.data,
      });

      if (result.success) {
        this.logger.log(
          `Push delivered to ${payload.deviceToken.slice(0, 15)}...`,
        );
      } else {
        this.logger.error(`Push failed: ${result.error}`);
        throw new Error(result.error ?? 'Push delivery failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Push worker error: ${message}`);
      throw error;
    }
  }
}
