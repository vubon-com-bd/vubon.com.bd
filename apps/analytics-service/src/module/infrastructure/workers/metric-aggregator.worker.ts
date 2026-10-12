/**
 * Metric Aggregator Worker
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { MetricQueue } from '../queues/metric.queue.js';

@Injectable()
export class MetricAggregatorWorker implements OnModuleInit {
  private readonly logger = new Logger(MetricAggregatorWorker.name);

  constructor(
    private readonly queue: QueueService,
    private readonly metricQueue: MetricQueue
  ) {}

  onModuleInit(): void {
    this.queue.registerWorker(
      this.metricQueue.queueName,
      async (payload: unknown) => {
        const job = payload as { metricName: string; seriesKey: string; granularity: string };
        this.logger.debug(`Aggregating ${job.metricName} at ${job.granularity}`);
        return { aggregated: true, seriesKey: job.seriesKey };
      },
      3
    );
  }
}
