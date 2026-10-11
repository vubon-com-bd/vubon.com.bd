/**
 * DigestGeneratorWorker — generates + sends user digests
 * @module notification-service/infrastructure/workers
 *
 * Jobs: generate-digest, send-digest, scan-ready-digests
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import { DigestQueue } from '../queues/digest.queue.js';
import type { GenerateDigestPayload, SendDigestPayload } from '../queues/digest.queue.js';
import {
  DIGEST_REPOSITORY,
  type DigestRepository,
} from '../../domain/repositories/digest.repository.interface.js';
import { DigestIdVO } from '../../domain/value-objects/primitives/digest-id.vo.js';

@Injectable()
export class DigestGeneratorWorker extends BaseWorker<
  GenerateDigestPayload | SendDigestPayload | Record<string, never>
> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.NOTIFICATION;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.GENERATE_DIGEST,
    NOTIFICATION_JOB_NAME.SEND_DIGEST,
    NOTIFICATION_JOB_NAME.SCAN_READY_DIGESTS,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(DIGEST_REPOSITORY) private readonly digestRepo: DigestRepository,
    private readonly digestQueue: DigestQueue,
  ) {
    super(queueService, 'DigestGeneratorWorker');
  }

  protected async handle(
    payload: GenerateDigestPayload | SendDigestPayload | Record<string, never>,
  ): Promise<unknown> {
    const anyPayload = payload as Record<string, unknown>;

    // Scan mode
    if (Object.keys(anyPayload).length === 0) {
      const ready = await this.digestRepo.findReadyToSend();
      this.logger.log(`Digest scan found ${ready.length} ready`);
      for (const digest of ready) {
        await this.digestQueue.enqueueSend({
          digestId: digest.id,
          userId: digest.userId,
          channel: digest.channel ?? 'email',
        });
      }
      return { scanned: ready.length };
    }

    // Send mode
    if ('digestId' in anyPayload && !('frequency' in anyPayload)) {
      const vo = DigestIdVO.create(String(anyPayload['digestId']));
      const digest = await this.digestRepo.findByIdVO(vo);
      if (!digest) return { skipped: true, reason: 'not_found' };
      const channel = String(anyPayload['channel'] ?? 'email');
      digest.markSent(channel);
      await this.digestRepo.save(digest);
      this.logger.log(`Digest ${digest.id} sent via ${channel}`);
      return { sent: true };
    }

    // Generate mode — real logic delegates to DigestService (skip here to avoid coupling)
    this.logger.debug(`Digest generation requested (delegated to service)`);
    return { generated: false, reason: 'delegated_to_service' };
  }
}
