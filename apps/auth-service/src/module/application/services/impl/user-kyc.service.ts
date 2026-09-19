import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserKycServiceInterface } from '../interfaces/user-kyc.service.interface';
import type { UserKycRepository } from '../../../domain/repositories/user-kyc.repository.interface';
import { UserKycEntity } from '../../../domain/entities/user-kyc.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserOperationFailedError } from '../../errors/user.errors';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';

@Injectable()
export class UserKycService
  extends BaseService<UserKycEntity, string>
  implements UserKycServiceInterface
{
  readonly name = 'UserKycService';

  constructor(
    private readonly kycRepo: UserKycRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByUserId(userId: string): Promise<UserKycResponseDTO | null> {
    const entity = await this.kycRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async submit(
    userId: string,
    input: SubmitKycRequestDTO,
  ): Promise<UserKycResponseDTO> {
    const firstDoc = input.documents[0];
    const entity = UserKycEntity.create({
      userId: UserIdVO.create(userId),
      status: 'pending',
      documentType: firstDoc?.type ?? 'national_id',
      documentNumber: firstDoc?.number ?? '',
      documentUrl: firstDoc?.frontUrl ?? '',
      submittedAt: new Date(),
      reviewedAt: null,
      rejectionReason: null,
    });
    await this.kycRepo.save(entity);
    await this.publishEvents(entity);
    return this.toDTO(entity);
  }

  async verify(userId: string, kycId: string): Promise<UserKycResponseDTO> {
    void kycId;
    const entity = await this.kycRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) {
      throw new UserOperationFailedError('KYC record not found');
    }
    const verified = entity.verify();
    await this.kycRepo.save(verified);
    await this.publishEvents(verified);
    return this.toDTO(verified);
  }

  async reject(
    userId: string,
    kycId: string,
    reason: string,
  ): Promise<UserKycResponseDTO> {
    void kycId;
    const entity = await this.kycRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) {
      throw new UserOperationFailedError('KYC record not found');
    }
    const rejected = entity.reject(reason);
    await this.kycRepo.save(rejected);
    await this.publishEvents(rejected);
    return this.toDTO(rejected);
  }

  private toDTO(entity: UserKycEntity): UserKycResponseDTO {
    return {
      success: true,
      kyc: {
        userId: entity.userId.value,
        status: entity.status,
        level: entity.isVerified ? 2 : 0,
        documents: [
          {
            id: entity.userId.value,
            type: entity.documentType,
            frontUrl: entity.documentUrl,
            number: entity.documentNumber,
            uploadedAt:
              entity.submittedAt?.toISOString() ?? new Date().toISOString(),
            verified: entity.isVerified,
          },
        ],
        submittedAt: entity.submittedAt?.toISOString() ?? undefined,
        reviewedAt: entity.reviewedAt?.toISOString() ?? undefined,
        rejectionReason: entity.rejectionReason ?? undefined,
        updatedAt: entity.updatedAt,
      },
    };
  }

  private async publishEvents(entity: UserKycEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
