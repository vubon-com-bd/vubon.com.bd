import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type { UserVerificationServiceInterface } from '../interfaces/user-verification.service.interface.js';
import type { UserVerificationRepository } from '../../../domain/repositories/user-verification.repository.interface.js';
import { USER_VERIFICATION_REPOSITORY } from '../../../domain/repositories/user-verification.repository.interface.js';
import type { UserVerificationResponseDTO } from '../../dtos/responses/user-verification-response.dto.js';

@Injectable()
export class UserVerificationService extends BaseService implements UserVerificationServiceInterface {
  readonly name = 'UserVerificationService';
  constructor(
    @Inject(USER_VERIFICATION_REPOSITORY) private readonly repo: UserVerificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) { super(); }
  async findForUser(userId: string): Promise<UserVerificationResponseDTO | null> {
    const v = await this.repo.findByUserIdRaw(userId);
    if (!v) return null;
    return {
      userId: v.userId.value, emailVerified: v.emailVerified, emailVerifiedAt: v.emailVerifiedAt,
      phoneVerified: v.phoneVerified, phoneVerifiedAt: v.phoneVerifiedAt,
      identityVerified: v.identityVerified, identityVerifiedAt: v.identityVerifiedAt,
      addressVerified: v.addressVerified, addressVerifiedAt: v.addressVerifiedAt,
      kycStatus: v.kycStatus.value, updatedAt: v.updatedAt,
    };
  }
  async verifyEmail(userId: string): Promise<void> {
    const v = await this.repo.findByUserIdRaw(userId);
    if (v) {
      v.verifyEmail();
      const saved = await this.repo.save(v);
      await this.eventBridge.publishFromEntity(saved);
    }
  }
  async verifyPhone(userId: string): Promise<void> {
    const v = await this.repo.findByUserIdRaw(userId);
    if (v) {
      v.verifyPhone();
      const saved = await this.repo.save(v);
      await this.eventBridge.publishFromEntity(saved);
    }
  }
  async verifyIdentity(userId: string): Promise<void> {
    const v = await this.repo.findByUserIdRaw(userId);
    if (v) {
      v.verifyIdentity();
      const saved = await this.repo.save(v);
      await this.eventBridge.publishFromEntity(saved);
    }
  }
  async verifyAddress(userId: string): Promise<void> {
    const v = await this.repo.findByUserIdRaw(userId);
    if (v) {
      v.verifyAddress();
      const saved = await this.repo.save(v);
      await this.eventBridge.publishFromEntity(saved);
    }
  }
}
