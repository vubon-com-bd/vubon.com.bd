import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class DocumentExpiryWorker implements OnModuleInit {
  private readonly logger = new Logger(DocumentExpiryWorker.name);
  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<Record<string, never>>(
      'document',
      async () => {
        this.logger.log('Checking document expiry');
      },
    );
  }
}
