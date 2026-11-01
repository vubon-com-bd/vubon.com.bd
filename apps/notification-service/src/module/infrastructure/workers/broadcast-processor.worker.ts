/**
 * BroadcastProcessorWorker — bulk broadcast worker
 * @module notification-service/infrastructure/workers
 *
 * Handles: START_BROADCAST, PROCESS_BROADCAST_BATCH, COMPLETE_BROADCAST।
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';

import {
  BROADCAST_REPOSITORY,
  type BroadcastRepository,
} from '@domain/repositories/broadcast.repository.interface.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';

import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';

export interface BroadcastProcessorPayload {
  readonly broadcastId: string;
  readonly testMode?: boolean;
  readonly batchNumber?: number;
  readonly recipientIds?: readonly string[];
}

@Injectable()
export class BroadcastProcessorWorker extends BaseWorker<BroadcastProcessorPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.BROADCAST;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.START_BROADCAST,
    NOTIFICATION_JOB_NAME.PROCESS_BROADCAST_BATCH,
    NOTIFICATION_JOB_NAME.COMPLETE_BROADCAST,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(BROADCAST_REPOSITORY)
    private readonly repo: BroadcastRepository,
  ) {
    super(queueService, 'BroadcastProcessorWorker');
  }

  protected async handle(payload: BroadcastProcessorPayload): Promise<unknown> {
    const vo = BroadcastIdVO.reconstitute(payload.broadcastId);
    const broadcast = await this.repo.findByIdVO(vo);
    if (!broadcast) {
      this.logger.warn(`Broadcast ${payload.broadcastId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    if (payload.recipientIds) {
      // Batch processing
      this.logger.log(
        `📤 Broadcast batch → broadcast=${payload.broadcastId} batch=${payload.batchNumber} recipients=${payload.recipientIds.length}`,
      );
      broadcast.updateProgress(
        broadcast.sentCount + payload.recipientIds.length,
        broadcast.failedCount,
      );
      await this.repo.save(broadcast);
      return {
        processed: true,
        batch: payload.batchNumber,
        count: payload.recipientIds.length,
      };
    }

    // Start or complete
    if (broadcast.isDraft() || broadcast.isScheduled()) {
      broadcast.start();
      await this.repo.save(broadcast);
      this.logger.log(`▶️  Broadcast started → ${payload.broadcastId}`);
    } else if (broadcast.isSending()) {
      broadcast.complete();
      await this.repo.save(broadcast);
      this.logger.log(`✅ Broadcast completed → ${payload.broadcastId}`);
    }

    return { processed: true, broadcastId: payload.broadcastId };
  }

  protected concurrency(): number {
    return 3;
  }
}
