/**
 * LoginAttemptWorker — Aggregates attempt analytics
 * @module auth-service/infrastructure/workers
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import type { QueueJobResult } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';
import { AuthLoginAttemptService } from '../../application/services/impl/auth-login-attempt.service';

@Injectable()
export class LoginAttemptWorker {
  readonly name = 'LoginAttemptWorker';
  private readonly logger = new Logger(LoginAttemptWorker.name);
  private worker?: Worker;

  constructor(
    @Inject(AuthLoginAttemptService)
    private readonly attempts: AuthLoginAttemptService,
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
    const userId = job.data.userId as string | undefined;
    if (!userId) return { jobId: String(job.id), success: true };
    const list = await this.attempts.getRecentForUser(
      userId as never,
      (job.data.limit as number) ?? 50,
    );
    this.logger.log(`Aggregated ${list.length} attempts for user ${userId}`);
    return { jobId: String(job.id), success: true, data: { count: list.length } };
  }
}
