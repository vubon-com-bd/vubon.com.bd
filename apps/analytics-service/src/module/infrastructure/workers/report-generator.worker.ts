import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { WORKER_CONFIG } from '../config/worker.config';

@Injectable()
export class ReportGeneratorWorker implements OnModuleInit {
  private readonly logger = new Logger(ReportGeneratorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      reportId: string;
      fromMs: number;
      toMs: number;
    }>(
      'analytics:report',
      async (payload) => {
        this.logger.log(`Generating report ${payload.reportId}`);
      },
      WORKER_CONFIG.reportGeneratorConcurrency,
    );
  }
}
