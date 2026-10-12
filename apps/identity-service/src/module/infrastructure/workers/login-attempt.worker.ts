/**
 * LoginAttemptWorker — purge old login attempts
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '../queues/queue.constants.js';
import type { LoginAttemptRepository } from '../../domain/repositories/login-attempt.repository.interface.js';
import { LOGIN_ATTEMPT_REPOSITORY } from '../../domain/repositories/login-attempt.repository.interface.js';

export interface LoginAttemptPurgePayload {
  readonly olderThanDays: number;
}

@Injectable()
export class LoginAttemptWorker extends BaseWorker<LoginAttemptPurgePayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.AUTH;
  protected readonly jobNames = [AUTH_JOB_NAME.LOGIN_ATTEMPT_PURGE] as const;

  constructor(
    queueService: QueueService,
    @Inject(LOGIN_ATTEMPT_REPOSITORY)
    private readonly attemptRepo: LoginAttemptRepository,
  ) {
    super(queueService, 'LoginAttemptWorker');
  }

  protected async handle(payload: LoginAttemptPurgePayload): Promise<unknown> {
    const cutoff = new Date(
      Date.now() - payload.olderThanDays * 24 * 3600 * 1000,
    ).toISOString();
    const purged = await this.attemptRepo.purge(cutoff);
    this.logger.log(`Purged ${purged} login attempts older than ${payload.olderThanDays}d`);
    return { purged };
  }

  protected concurrency(): number {
    return 2;
  }
}
