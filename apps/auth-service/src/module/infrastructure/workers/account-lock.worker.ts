/**
 * AccountLockWorker — Auto-unlocks expired locks
 * @module auth-service/infrastructure/workers
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import type { QueueJobResult } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';
import { AuthAccountLockService } from '../../application/services/impl/auth-account-lock.service';

@Injectable()
export class AccountLockWorker {
  readonly name = 'AccountLockWorker';
  private readonly logger = new Logger(AccountLockWorker.name);
  private worker?: Worker;

  constructor(
    @Inject(AuthAccountLockService)
    private readonly lockService: AuthAccountLockService,
  ) {}

  start(connection: { host: string; port: number }): void {
    if (this.worker) return;
    this.worker = new Worker(
      QUEUE_NAME.AUTH,
      async (job: Job) => this.handle(job),
      { connection, concurrency: QUEUE_LIMIT.CONCURRENCY },
    );
  }

  async stop(): Promise<void> {
    if (this.worker) await this.worker.close();
    this.worker = undefined;
  }

  private async handle(job: Job): Promise<QueueJobResult> {
    if (job.name !== 'auto-unlock') {
      return { jobId: String(job.id), success: true };
    }
    const unlocked = await this.lockService.autoUnlockExpired();
    this.logger.log(`Auto-unlocked ${unlocked} accounts (job ${job.id})`);
    return { jobId: String(job.id), success: true, data: { unlocked } };
  }
}
