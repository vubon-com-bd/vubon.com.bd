import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class AccountLockWorker implements OnModuleInit {
  private readonly logger = new Logger(AccountLockWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      userId: string;
      reason: string;
      durationMs: number;
    }>(QUEUE_NAME.AUTH, async (payload) => {
      this.logger.log(
        `Account locked for user ${payload.userId}: ${payload.reason}`,
      );
    });
  }
}
