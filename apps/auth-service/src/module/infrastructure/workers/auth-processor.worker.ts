import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class AuthProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(AuthProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<Record<string, unknown>>(
      QUEUE_NAME.AUTH,
      async (payload) => {
        this.logger.log(`Processing auth job: ${JSON.stringify(payload)}`);
      },
    );
  }
}
