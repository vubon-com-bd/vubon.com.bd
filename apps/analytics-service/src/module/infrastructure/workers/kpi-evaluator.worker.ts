/**
 * KPI Evaluator Worker
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { KpiQueue } from '../queues/kpi.queue.js';

@Injectable()
export class KpiEvaluatorWorker implements OnModuleInit {
  private readonly logger = new Logger(KpiEvaluatorWorker.name);

  constructor(
    private readonly queue: QueueService,
    private readonly kpiQueue: KpiQueue
  ) {}

  onModuleInit(): void {
    this.queue.registerWorker(
      this.kpiQueue.queueName,
      async (payload: unknown) => {
        const job = payload as { kpiId?: string; actual?: number };
        this.logger.debug(`KPI job received: ${JSON.stringify(job)}`);
        return { evaluated: true };
      },
      3
    );
  }
}
