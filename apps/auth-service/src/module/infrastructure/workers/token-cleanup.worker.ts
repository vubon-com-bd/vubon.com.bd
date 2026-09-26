/**
 * TokenCleanupWorker — Purges expired tokens
 * @module auth-service/infrastructure/workers
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import type { QueueJobResult } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';
import { AuthTokenPrismaRepository } from '../persistence/prisma/repositories/auth-token.prisma.repository';

@Injectable()
export class TokenCleanupWorker {
  readonly name = 'TokenCleanupWorker';
  private readonly logger = new Logger(TokenCleanupWorker.name);
  private worker?: Worker;

  constructor(
    @Inject(AuthTokenPrismaRepository)
    private readonly tokens: AuthTokenPrismaRepository,
  ) {}

  start(connection: { host: string; port: number }): void {
    if (this.worker) return;
    this.worker = new Worker(
      QUEUE_NAME.TOKEN,
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
    const deleted = await this.tokens.deleteExpired(cutoff);
    this.logger.log(`Purged ${deleted} expired tokens (job ${job.id})`);
    return { jobId: String(job.id), success: true, data: { deleted } };
  }
}
