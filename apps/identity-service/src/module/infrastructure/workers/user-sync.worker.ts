/**
 * UserSyncWorker — syncs user data across services
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '../queues/queue.constants.js';
import type { UserRepository } from '../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface.js';

export interface UserSyncPayload {
  readonly batchSize: number;
}

@Injectable()
export class UserSyncWorker extends BaseWorker<UserSyncPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.SYNC;
  protected readonly jobNames = [AUTH_JOB_NAME.DEVICE_SYNC] as const;

  constructor(
    queueService: QueueService,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {
    super(queueService, 'UserSyncWorker');
  }

  protected async handle(payload: UserSyncPayload): Promise<unknown> {
    const users = await this.userRepo.findAll();
    const slice = users.slice(0, payload.batchSize);
    this.logger.log(`Synced ${slice.length} users`);
    return { synced: slice.length };
  }

  protected concurrency(): number {
    return 2;
  }
}
