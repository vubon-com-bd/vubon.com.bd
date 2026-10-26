/**
 * DigestProcessorWorker — digest generation + send worker
 * @module notification-service/infrastructure/workers
 *
 * Handles: GENERATE_DIGEST, SEND_DIGEST।
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';

import {
  DIGEST_REPOSITORY,
  type DigestRepository,
} from '@domain/repositories/digest.repository.interface.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';

import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';

export interface DigestProcessorPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly periodStart?: string;
  readonly periodEnd?: string;
  readonly channels?: readonly string[];
}

@Injectable()
export class DigestProcessorWorker extends BaseWorker<DigestProcessorPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.DIGEST;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.GENERATE_DIGEST,
    NOTIFICATION_JOB_NAME.SEND_DIGEST,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(DIGEST_REPOSITORY)
    private readonly repo: DigestRepository,
  ) {
    super(queueService, 'DigestProcessorWorker');
  }

  protected async handle(payload: DigestProcessorPayload): Promise<unknown> {
    const vo = DigestIdVO.reconstitute(payload.digestId);
    const digest = await this.repo.findByIdVO(vo);
    if (!digest) {
      this.logger.warn(`Digest ${payload.digestId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    if (digest.isPending()) {
      // Generate phase
      this.logger.log(`📊 Digest generation → ${payload.digestId}`);
      digest.startGenerating();
      await this.repo.save(digest);
      return { processed: true, phase: 'generate' };
    }

    if (digest.isReady()) {
      // Send phase
      if (digest.isEmpty()) {
        this.logger.warn(`Digest ${payload.digestId} empty — skipping send`);
        return { skipped: true, reason: 'empty' };
      }
      this.logger.log(
        `📬 Digest send → ${payload.digestId} items=${digest.itemCount}`,
      );
      digest.markSent();
      await this.repo.save(digest);
      return { processed: true, phase: 'send' };
    }

    return { skipped: true, reason: `invalid-state:${digest.status.value}` };
  }

  protected concurrency(): number {
    return 5;
  }
}
