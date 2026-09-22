import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserKycServiceInterface } from '../interfaces/user-kyc.service.interface';
import type { UserKycRepository } from '../../../domain/repositories/user-kyc.repository.interface';
import { UserKycEntity } from '../../../domain/entities/user-kyc.entity';
import { KycIdVO } from '../../../domain/value-objects/primitives/kyc-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { KycOperationFailedError } from '../../errors/kyc.errors';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto';

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

  async findByUserId(userId: string): Promise<KycResponseDTO | null> {
    const entity = await this.kycRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async submit(userId: string, input: Record<string, unknown>): Promise<KycResponseDTO> {
    void input;
    void userId;
    throw new KycOperationFailedError('submit not yet wired');
  }

  async verify(userId: string, kycId: string): Promise<KycResponseDTO> {
    void kycId;
    const entity = await this.kycRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) throw new KycOperationFailedError('KYC not found');
    const verified = entity.verify();
    await this.kycRepo.save(verified);
    await this.publishEvents(verified);
    return this.toDTO(verified);
  }

  async reject(userId: string, kycId: string, reason: string): Promise<KycResponseDTO> {
    void kycId;
    const entity = await this.kycRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) throw new KycOperationFailedError('KYC not found');
    const rejected = entity.reject(reason);
    await this.kycRepo.save(rejected);
    await this.publishEvents(rejected);
    return this.toDTO(rejected);
  }

  private toDTO(entity: UserKycEntity): KycResponseDTO {
    return {
      success: true,
      kyc: {
        userId: entity.userId.value,
        status: entity.status.value,
        documents: [],
        submittedAt: entity.submittedAt?.toISOString(),
        reviewedAt: entity.reviewedAt?.toISOString(),
        rejectionReason: entity.rejectionReason ?? undefined,
      },
    } as unknown as KycResponseDTO;
  }

  private async publishEvents(entity: UserKycEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
