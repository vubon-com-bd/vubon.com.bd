/**
 * KycExpiryWorker — marks expired KYC records
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME } from '../queues/queue.constants.js';
import type { UserKycRepository } from '../../domain/repositories/user-kyc.repository.interface.js';
import { USER_KYC_REPOSITORY } from '../../domain/repositories/user-kyc.repository.interface.js';

export interface KycExpiryPayload {
  readonly withinDays: number;
}

@Injectable()
export class KycExpiryWorker extends BaseWorker<KycExpiryPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.AUTH;
  protected readonly jobNames = ['kyc-expiry'] as const;

  constructor(
    queueService: QueueService,
    @Inject(USER_KYC_REPOSITORY) private readonly kycRepo: UserKycRepository,
  ) {
    super(queueService, 'KycExpiryWorker');
  }

  protected async handle(payload: KycExpiryPayload): Promise<unknown> {
    const expiring = await this.kycRepo.findExpiring(payload.withinDays);
    this.logger.log(`Found ${expiring.length} KYC records expiring within ${payload.withinDays} days`);
    return { expiring: expiring.length };
  }

  protected concurrency(): number {
    return 1;
  }
}
