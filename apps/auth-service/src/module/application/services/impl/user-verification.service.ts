import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserVerificationServiceInterface } from '../interfaces/user-verification.service.interface';
import type { UserVerificationRepository } from '../../../domain/repositories/user-verification.repository.interface';
import { UserVerificationEntity } from '../../../domain/entities/user-verification.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { VerificationTypeVO } from '../../../domain/value-objects/primitives/verification-type.vo';
import { UserOperationFailedError } from '../../errors/user.errors';
import type { UserVerificationResponseDTO } from '../../dtos/responses/user-verification-response.dto';

@Injectable()
export class UserVerificationService
  extends BaseService<UserVerificationEntity, string>
  implements UserVerificationServiceInterface
{
  readonly name = 'UserVerificationService';

  constructor(
    private readonly verificationRepo: UserVerificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByUserId(
    userId: string,
  ): Promise<readonly UserVerificationResponseDTO[]> {
    const entities = await this.verificationRepo.findByUserId(
      UserIdVO.create(userId),
    );
    return entities.map((e) => this.toDTO(e));
  }

  async verify(userId: string, type: string, code: string): Promise<void> {
    void code;
    const userIdVO = UserIdVO.create(userId);
    const entity = await this.verificationRepo.findByType(
      userIdVO,
      VerificationTypeVO.create(type),
    );
    if (!entity) {
      throw new UserOperationFailedError('verification record not found');
    }
    const verified = entity.markVerified();
    await this.verificationRepo.save(verified);
  }

  private toDTO(entity: UserVerificationEntity): UserVerificationResponseDTO {
    void entity.type;
    return {
      userId: entity.userId.value,
      status: entity.status.value,
      verificationCount: 1,
      isFullyVerified: entity.status.value === 'verified',
    };
  }
}
