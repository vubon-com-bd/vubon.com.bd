/**
 * SessionCleanupWorker — Purges expired sessions
 * @module auth-service/infrastructure/workers
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import type { QueueJobResult } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';
import { AuthSessionPrismaRepository } from '../persistence/prisma/repositories/auth-session.prisma.repository';

@Injectable()
export class SessionCleanupWorker {
  readonly name = 'SessionCleanupWorker';
  private readonly logger = new Logger(SessionCleanupWorker.name);
  private worker?: Worker;

  constructor(
    @Inject(AuthSessionPrismaRepository)
    private readonly sessions: AuthSessionPrismaRepository,
  ) {}

  start(connection: { host: string; port: number }): void {
    if (this.worker) return;
    this.worker = new Worker(
      QUEUE_NAME.SESSION,
      async (job: Job) => this.handle(job),
      { connection, concurrency: QUEUE_LIMIT.CONCURRENCY },
    );
  }

  async stop(): Promise<void> {
    if (this.worker) await this.worker.close();
    this.worker = undefined;
  }

  private async handle(job: Job): Promise<QueueJobResult> {
    const cutoff = Date.now();
    const deleted = await this.sessions.deleteExpired(cutoff);
    this.logger.log(`Purged ${deleted} expired sessions (job ${job.id})`);
    return { jobId: String(job.id), success: true, data: { deleted } };
  }
}
