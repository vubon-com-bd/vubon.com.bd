/**
 * UserKycService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserKycServiceInterface } from '../interfaces/user-kyc.service.interface';
import type { UserKycRepository } from '../../../domain/repositories/user-kyc.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { UserKycEntity } from '../../../domain/entities/user-kyc.entity';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto';
import type { VerifyKycRequestDTO } from '../../dtos/requests/user/verify-kyc.dto';
import type { RejectKycRequestDTO } from '../../dtos/requests/user/reject-kyc.dto';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';
import { ID_GENERATOR, USER_KYC_REPO } from '../tokens';

@Injectable()
export class UserKycService
  extends BaseService<UserKycEntity, string>
  implements UserKycServiceInterface {
  readonly name = 'UserKycService';

  constructor(
    @Inject(USER_KYC_REPO) private readonly repo: UserKycRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) { super(); }

  async submit(userId: UserId, input: SubmitKycRequestDTO): Promise<UserKycEntity> {
    const existing = await this.repo.findByUserId(userId);
    const now = new Date().toISOString();

    if (existing) {
      existing.submit(now, input.frontImageUrl, input.backImageUrl);
      return this.repo.save(existing);
    }

    const entity = UserKycEntity.create({
      id: this.idGen.generate(),
      userId,
      status: 'pending',
      documentType: input.documentType as never,
      documentNumber: input.documentNumber,
      frontImageUrl: input.frontImageUrl,
      backImageUrl: input.backImageUrl,
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    });
    return this.repo.save(entity);
  }

  async approve(input: VerifyKycRequestDTO): Promise<UserKycEntity> {
    const found = await this.repo.findByUserId(input.userId as UserId);
    if (!found) throw new Error('KYC not found');
    found.approve(new Date().toISOString());
    return this.repo.save(found);
  }

  async reject(input: RejectKycRequestDTO): Promise<UserKycEntity> {
    const found = await this.repo.findByUserId(input.userId as UserId);
    if (!found) throw new Error('KYC not found');
    found.reject(new Date().toISOString(), input.reason);
    return this.repo.save(found);
  }

  async getByUserId(userId: UserId): Promise<UserKycEntity | null> {
    return this.repo.findByUserId(userId);
  }

  async listPending(): Promise<readonly UserKycEntity[]> {
    return this.repo.findPending();
  }

  toResponse(kyc: UserKycEntity): UserKycResponseDTO {
    const doc = kyc.documentNumber;
    const masked = doc.length > 4 ? `****${doc.slice(-4)}` : '****';
    return {
      id: kyc.id,
      userId: kyc.userId,
      status: kyc.status,
      documentType: kyc.documentType as never,
      documentNumberMasked: masked,
      reviewedAt: undefined,
    };
  }
}
