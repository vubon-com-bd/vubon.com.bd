import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type { UserKycServiceInterface } from '../interfaces/user-kyc.service.interface.js';
import type { UserKycRepository } from '../../../domain/repositories/user-kyc.repository.interface.js';
import { USER_KYC_REPOSITORY } from '../../../domain/repositories/user-kyc.repository.interface.js';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto.js';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto.js';

@Injectable()
export class UserKycService extends BaseService implements UserKycServiceInterface {
  readonly name = 'UserKycService';
  constructor(
    @Inject(USER_KYC_REPOSITORY) private readonly repo: UserKycRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) { super(); }
  async findForUser(userId: string): Promise<UserKycResponseDTO | null> {
    const k = await this.repo.findByUserIdRaw(userId);
    if (!k) return null;
    return {
      id: k.id, userId: k.userId.value, status: k.status.value,
      documents: k.documents.map((d) => ({ type: d.type.value, number: d.number, verified: d.verified })),
      submittedAt: k.submittedAt, verifiedAt: k.verifiedAt,
      rejectedAt: k.rejectedAt, rejectionReason: k.rejectionReason,
      expiresAt: k.expiresAt, updatedAt: k.updatedAt,
    };
  }
  async submit(userId: string, _input: SubmitKycRequestDTO): Promise<UserKycResponseDTO> {
    return { id: '', userId, status: 'pending', documents: [], updatedAt: new Date().toISOString() };
  }
  async verify(kycId: string, reviewedBy: string): Promise<UserKycResponseDTO> {
    const k = await this.repo.findById(kycId);
    if (k) {
      k.verify(reviewedBy);
      const saved = await this.repo.save(k);
      await this.eventBridge.publishFromEntity(saved);
    }
    return { id: kycId, userId: '', status: 'verified', documents: [], updatedAt: new Date().toISOString() };
  }
  async reject(kycId: string, reason: string, reviewedBy: string): Promise<UserKycResponseDTO> {
    const k = await this.repo.findById(kycId);
    if (k) {
      k.reject(reason, reviewedBy);
      const saved = await this.repo.save(k);
      await this.eventBridge.publishFromEntity(saved);
    }
    return { id: kycId, userId: '', status: 'rejected', documents: [], rejectionReason: reason, updatedAt: new Date().toISOString() };
  }
}
