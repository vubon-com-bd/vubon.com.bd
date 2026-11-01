/**
 * BounceProcessorWorker — bounce event processor
 * @module notification-service/infrastructure/workers
 *
 * Flow:
 *  1. Receive bounce event
 *  2. Classify (soft/hard/complaint)
 *  3. Persist to bounce log
 *  4. Update device/user suppression if hard/complaint
 */
import { Inject, Injectable, Optional } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { randomUUID } from 'node:crypto';

import { BounceHandlerService } from '@domain/services/bounce-handler.service.js';
import { BouncePrismaRepository } from '@infrastructure/persistence/prisma/repositories/bounce.prisma.repository.js';

export interface BounceProcessorPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly provider: string;
  readonly recipient: string;
  readonly errorCode: string;
  readonly reason: string;
  readonly raw?: Readonly<Record<string, unknown>>;
}

const NOTIFICATION_BOUNCE_QUEUE = 'notification.bounce';
const PROCESS_BOUNCE_JOB = 'process-bounce';

@Injectable()
export class BounceProcessorWorker extends BaseWorker<BounceProcessorPayload> {
  protected readonly queueName = NOTIFICATION_BOUNCE_QUEUE;
  protected readonly jobNames = [PROCESS_BOUNCE_JOB] as const;

  constructor(
    queueService: QueueService,
    @Optional()
    private readonly bounceRepo?: BouncePrismaRepository,
  ) {
    super(queueService, 'BounceProcessorWorker');
  }

  protected async handle(payload: BounceProcessorPayload): Promise<unknown> {
    const classification = BounceHandlerService.classify({
      errorCode: payload.errorCode,
      reason: payload.reason,
    });

    this.logger.log(
      `🔴 Bounce → notification=${payload.notificationId} type=${classification.type} action=${classification.action}`,
    );

    if (!this.bounceRepo) {
      this.logger.warn('BouncePrismaRepository not available (memory mode) — skipping');
      return { processed: false, reason: 'no-repo' };
    }
    await this.bounceRepo.save({
      id: randomUUID(),
      notificationId: payload.notificationId,
      userId: payload.userId,
      channel: payload.channel,
      provider: payload.provider,
      bounceType: classification.type,
      bounceSubType: classification.action,
      reason: classification.reason,
      recipient: payload.recipient,
      raw: payload.raw,
      bouncedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    return {
      processed: true,
      classification: classification.type,
      action: classification.action,
    };
  }

  protected concurrency(): number {
    return 10;
  }
}
