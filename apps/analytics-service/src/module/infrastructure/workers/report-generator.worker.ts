/**
 * Report Generator Worker
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { ReportQueue } from '../queues/report.queue.js';

@Injectable()
export class ReportGeneratorWorker implements OnModuleInit {
  private readonly logger = new Logger(ReportGeneratorWorker.name);

  constructor(
    private readonly queue: QueueService,
    private readonly reportQueue: ReportQueue
  ) {}

  onModuleInit(): void {
    this.queue.registerWorker(
      this.reportQueue.queueName,
      async (payload: unknown) => {
        const job = payload as { reportId: string; action: string };
        this.logger.debug(`Report action: ${job.action} → ${job.reportId}`);
        return { processed: true, reportId: job.reportId };
      },
      2
    );
  }
}
