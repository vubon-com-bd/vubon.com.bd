import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class ReportGeneratorWorker implements OnModuleInit {
  private readonly logger = new Logger(ReportGeneratorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ reportId: string; action: string }>(
      'marketing-report',
      async (payload) => {
        this.logger.log(`Report ${payload.reportId}: ${payload.action}`);
      },
    );
  }
}
