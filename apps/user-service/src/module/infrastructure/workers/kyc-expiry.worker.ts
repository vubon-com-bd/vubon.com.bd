import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class KycExpiryWorker implements OnModuleInit {
  private readonly logger = new Logger(KycExpiryWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ olderThanMs: number }>(
      QUEUE_NAME.CLEANUP,
      async (payload) => {
        this.logger.log(`KYC expiry check older than ${payload.olderThanMs}ms`);
      },
    );
  }
}
