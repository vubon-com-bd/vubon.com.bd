/**
 * AccountLockWorker — auto-unlocks expired locks
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '../queues/queue.constants.js';
import type { AccountLockRepository } from '../../domain/repositories/account-lock.repository.interface.js';
import { ACCOUNT_LOCK_REPOSITORY } from '../../domain/repositories/account-lock.repository.interface.js';

export interface LockSweepPayload {
  readonly dryRun?: boolean;
}

@Injectable()
export class AccountLockWorker extends BaseWorker<LockSweepPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.AUTH;
  protected readonly jobNames = [
    AUTH_JOB_NAME.LOCK_AUTO_UNLOCK,
    AUTH_JOB_NAME.LOCK_SWEEP,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(ACCOUNT_LOCK_REPOSITORY)
    private readonly lockRepo: AccountLockRepository,
  ) {
    super(queueService, 'AccountLockWorker');
  }

  protected async handle(payload: LockSweepPayload): Promise<unknown> {
    if (payload.dryRun) {
      const expired = await this.lockRepo.findExpired();
      this.logger.log(`[dry-run] Would unlock ${expired.length} expired locks`);
      return { wouldUnlock: expired.length };
    }
    const unlocked = await this.lockRepo.autoUnlockExpired();
    this.logger.log(`Auto-unlocked ${unlocked} accounts`);
    return { unlocked };
  }

  protected concurrency(): number {
    return 1;
  }
}
