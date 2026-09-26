import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { WORKER_CONFIG } from '../config/worker.config';

@Injectable()
export class KpiEvaluatorWorker implements OnModuleInit {
  private readonly logger = new Logger(KpiEvaluatorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      kpiId: string;
      actual: number;
    }>(
      'analytics:kpi',
      async (payload) => {
        this.logger.debug(
          `Evaluating KPI ${payload.kpiId} against actual ${payload.actual}`,
        );
      },
      WORKER_CONFIG.kpiEvaluatorConcurrency,
    );
  }
}
