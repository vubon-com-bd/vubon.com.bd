/**
 * BroadcastProcessorWorker — processes broadcast batches
 * @module notification-service/infrastructure/workers
 *
 * Jobs: start-broadcast, process-broadcast-batch, finalize-broadcast, cancel-broadcast
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import { BroadcastQueue } from '../queues/broadcast.queue.js';
import type {
  StartBroadcastPayload,
  ProcessBroadcastBatchPayload,
  FinalizeBroadcastPayload,
  CancelBroadcastPayload,
} from '../queues/broadcast.queue.js';
import {
  BROADCAST_REPOSITORY,
  type BroadcastRepository,
} from '../../domain/repositories/broadcast.repository.interface.js';
import { BroadcastIdVO } from '../../domain/value-objects/primitives/broadcast-id.vo.js';

@Injectable()
export class BroadcastProcessorWorker extends BaseWorker<
  | StartBroadcastPayload
  | ProcessBroadcastBatchPayload
  | FinalizeBroadcastPayload
  | CancelBroadcastPayload
> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.NOTIFICATION;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.START_BROADCAST,
    NOTIFICATION_JOB_NAME.PROCESS_BROADCAST_BATCH,
    NOTIFICATION_JOB_NAME.FINALIZE_BROADCAST,
    NOTIFICATION_JOB_NAME.CANCEL_BROADCAST,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(BROADCAST_REPOSITORY) private readonly broadcastRepo: BroadcastRepository,
    private readonly broadcastQueue: BroadcastQueue,
  ) {
    super(queueService, 'BroadcastProcessorWorker');
  }

  protected async handle(
    payload:
      | StartBroadcastPayload
      | ProcessBroadcastBatchPayload
      | FinalizeBroadcastPayload
      | CancelBroadcastPayload,
  ): Promise<unknown> {
    const anyPayload = payload as unknown as Record<string, unknown>;
    const broadcastId = String(anyPayload['broadcastId'] ?? '');
    if (!broadcastId) return { skipped: true, reason: 'no_id' };

    const vo = BroadcastIdVO.create(broadcastId);
    const broadcast = await this.broadcastRepo.findByIdVO(vo);
    if (!broadcast) return { skipped: true, reason: 'not_found' };

    // Determine action
    if ('totalRecipients' in payload && !('batchNumber' in payload) && !('reason' in payload)) {
      // start-broadcast
      broadcast.start(Number(anyPayload['totalRecipients']));
      await this.broadcastRepo.save(broadcast);
      this.logger.log(`Broadcast ${broadcastId} started with ${Number(anyPayload['totalRecipients'])} recipients`);
      return { started: true };
    }

    if ('batchNumber' in payload) {
      // process-broadcast-batch — stub counts, real fan-out would call NotificationService per user
      const recipientIds = (anyPayload['recipientIds'] as readonly string[] | undefined) ?? [];
      const total = recipientIds.length;
      broadcast.recordProgress(total, total, 0);
      await this.broadcastRepo.save(broadcast);
      this.logger.log(`Broadcast batch #${String(anyPayload['batchNumber'])}: ${total} processed`);
      return { processed: total };
    }

    if ('reason' in payload && payload.reason) {
      // cancel-broadcast
      broadcast.cancel(undefined, String(anyPayload['reason'] ?? ''));
      await this.broadcastRepo.save(broadcast);
      return { cancelled: true };
    }

    // finalize-broadcast
    try {
      broadcast.complete();
      await this.broadcastRepo.save(broadcast);
      return { finalized: true };
    } catch (err) {
      this.logger.warn(`Finalize failed: ${(err as Error).message}`);
      return { skipped: true, reason: 'not_sending' };
    }
  }

  protected concurrency(): number {
    return 3;
  }
}
