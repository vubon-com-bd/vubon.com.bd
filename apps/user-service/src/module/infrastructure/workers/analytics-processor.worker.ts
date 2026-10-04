/**
 * AnalyticsProcessorWorker
 */
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@vubon/shared-kernel/infrastructure';
import { AnalyticsQueue } from '../queues/analytics.queue.js';

export interface AnalyticsJob {
  readonly id: string;
  readonly data: {
    readonly userId: string;
    readonly eventName: string;
    readonly metadata: Record<string, unknown>;
  };
}

@Injectable()
export class AnalyticsProcessorWorker {
  constructor(
    private readonly analyticsQueue: AnalyticsQueue,
    private readonly logger: LoggerService
  ) {}

  async process(job: AnalyticsJob): Promise<void> {
    const { userId, eventName, metadata } = job.data;
    this.logger.log(`Processing analytics event: ${eventName}`, {
      userId,
      eventName,
      metadata,
    });
    // Real: forward to analytics store — placeholder
  }

  async enqueue(userId: string, eventName: string, metadata: Record<string, unknown>): Promise<void> {
    await this.analyticsQueue.enqueue({ userId, eventName, metadata });
  }
}
