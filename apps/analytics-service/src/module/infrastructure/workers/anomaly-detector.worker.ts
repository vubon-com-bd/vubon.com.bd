/**
 * Anomaly Detector Worker
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { AnomalyQueue } from '../queues/anomaly.queue.js';

@Injectable()
export class AnomalyDetectorWorker implements OnModuleInit {
  private readonly logger = new Logger(AnomalyDetectorWorker.name);

  constructor(
    private readonly queue: QueueService,
    private readonly anomalyQueue: AnomalyQueue
  ) {}

  onModuleInit(): void {
    this.queue.registerWorker(
      this.anomalyQueue.queueName,
      async (payload: unknown) => {
        const job = payload as { metricName: string; fromDate: string; toDate: string };
        this.logger.debug(`Detecting anomalies for ${job.metricName}`);
        return { detected: 0, metricName: job.metricName };
      },
      2
    );
  }
}
