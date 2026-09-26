import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SmsSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(SmsSenderWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ to: string; message: string }>(
      'marketing-sms',
      async (payload) => {
        this.logger.log(`Sending SMS to ${payload.to}`);
      },
    );
  }
}
