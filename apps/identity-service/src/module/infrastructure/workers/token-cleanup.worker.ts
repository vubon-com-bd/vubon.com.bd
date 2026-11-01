/**
 * TokenCleanupWorker — purges expired/revoked tokens
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '../queues/queue.constants.js';
import type { TokenCleanupPayload } from '../queues/token.queue.js';
import type { TokenRepository } from '../../domain/repositories/token.repository.interface.js';
import { TOKEN_REPOSITORY } from '../../domain/repositories/token.repository.interface.js';

@Injectable()
export class TokenCleanupWorker extends BaseWorker<TokenCleanupPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.TOKEN;
  protected readonly jobNames = [AUTH_JOB_NAME.TOKEN_CLEANUP] as const;

  constructor(
    queueService: QueueService,
    @Inject(TOKEN_REPOSITORY) private readonly tokenRepo: TokenRepository,
  ) {
    super(queueService, 'TokenCleanupWorker');
  }

  protected async handle(payload: TokenCleanupPayload): Promise<unknown> {
    const cutoff = new Date(
      Date.now() - payload.olderThanHours * 3600 * 1000,
    ).toISOString();
    const purged = await this.tokenRepo.purge(cutoff);
    this.logger.log(`Purged ${purged} tokens older than ${payload.olderThanHours}h`);
    return { purged };
  }

  protected concurrency(): number {
    return 2;
  }
}
