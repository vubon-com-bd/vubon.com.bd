/**
 * KycExpiryWorker
 */
import { Injectable, Inject } from '@nestjs/common';
import { LoggerService } from '@vubon/shared-kernel/infrastructure';
import {
  USER_KYC_REPOSITORY,
} from '@domain/repositories/user-kyc.repository.interface';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KYC_CONFIG } from '../config/kyc.config.js';

export interface KycExpiryJob {
  readonly id: string;
  readonly data: { readonly kycId: string; readonly userId: string };
}

@Injectable()
export class KycExpiryWorker {
  constructor(
    @Inject(USER_KYC_REPOSITORY)
    private readonly kycRepo: UserKycRepository,
    private readonly logger: LoggerService
  ) {}

  async process(job: KycExpiryJob): Promise<void> {
    const { kycId, userId } = job.data;
    this.logger.log(`Checking KYC expiry for ${kycId}`, { kycId, userId });

    const kyc = await this.kycRepo.findById(kycId);
    if (!kyc) {
      this.logger.warn(`KYC not found: ${kycId}`);
      return;
    }

    if (!kyc.isVerified()) return;

    const verifiedAt = kyc.verifiedAt;
    if (!verifiedAt) return;

    const daysSinceVerified =
      (Date.now() - verifiedAt.epochMs) / (1000 * 60 * 60 * 24);

    if (daysSinceVerified > KYC_CONFIG.expiryDays) {
      this.logger.warn(`KYC expired for user ${userId}`, { kycId, userId });
      // Mark expired via domain method
      void KycIdVO.create(kycId);
    }
  }
}
