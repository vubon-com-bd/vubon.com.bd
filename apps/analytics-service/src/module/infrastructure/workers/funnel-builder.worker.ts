/**
 * Funnel Builder Worker
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { FunnelQueue } from '../queues/funnel.queue.js';

@Injectable()
export class FunnelBuilderWorker implements OnModuleInit {
  private readonly logger = new Logger(FunnelBuilderWorker.name);

  constructor(
    private readonly queue: QueueService,
    private readonly funnelQueue: FunnelQueue
  ) {}

  onModuleInit(): void {
    this.queue.registerWorker(
      this.funnelQueue.queueName,
      async (payload: unknown) => {
        const job = payload as { funnelId: string };
        this.logger.debug(`Building funnel ${job.funnelId}`);
        return { built: true, funnelId: job.funnelId };
      },
      2
    );
  }
}
