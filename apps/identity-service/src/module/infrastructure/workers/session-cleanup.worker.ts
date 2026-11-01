/**
 * SessionCleanupWorker — removes expired sessions
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '../queues/queue.constants.js';
import type { SessionCleanupPayload } from '../queues/session.queue.js';
import type { SessionRepository } from '../../domain/repositories/session.repository.interface.js';
import { SESSION_REPOSITORY } from '../../domain/repositories/session.repository.interface.js';

@Injectable()
export class SessionCleanupWorker extends BaseWorker<SessionCleanupPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.SESSION;
  protected readonly jobNames = [AUTH_JOB_NAME.SESSION_CLEANUP] as const;

  constructor(
    queueService: QueueService,
    @Inject(SESSION_REPOSITORY) private readonly sessionRepo: SessionRepository,
  ) {
    super(queueService, 'SessionCleanupWorker');
  }

  protected async handle(payload: SessionCleanupPayload): Promise<unknown> {
    const expired = await this.sessionRepo.findExpired();
    let cleaned = 0;
    for (const session of expired) {
      try {
        session.expire();
        await this.sessionRepo.save(session);
        cleaned++;
      } catch (err) {
        this.logger.warn(`session cleanup failed for ${session.id}: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    }
    this.logger.log(`Cleaned ${cleaned} expired sessions (threshold=${payload.olderThanHours}h)`);
    return { cleaned };
  }

  protected concurrency(): number {
    return 2;
  }
}
