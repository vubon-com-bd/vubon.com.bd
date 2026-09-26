import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class MediaProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(MediaProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ mediaId: string }>(
      QUEUE_NAME.NOTIFICATION,
      async (payload) => {
        this.logger.log(`Processing media: ${payload.mediaId}`);
      },
    );
  }
}
