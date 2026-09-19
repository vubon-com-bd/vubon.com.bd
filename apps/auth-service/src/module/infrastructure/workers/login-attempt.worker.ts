import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class LoginAttemptWorker implements OnModuleInit {
  private readonly logger = new Logger(LoginAttemptWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      userId: string | null;
      email: string | null;
      ip: string;
      status: string;
    }>(QUEUE_NAME.AUTH, async (payload) => {
      this.logger.log(
        `Login attempt from ${payload.ip} — status: ${payload.status}`,
      );
    });
  }
}
