import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PreferenceMatrixServiceInterface } from '../interfaces/preference-matrix.service.interface';
import type { PreferenceMatrixRepository } from '../../../domain/repositories/preference-matrix.repository.interface';
import { PreferenceMatrixEntity } from '../../../domain/entities/preference-matrix.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto';

@Injectable()
export class PreferenceMatrixService
  extends BaseService<PreferenceMatrixEntity, string>
  implements PreferenceMatrixServiceInterface
{
  readonly name = 'PreferenceMatrixService';

  constructor(private readonly repo: PreferenceMatrixRepository) {
    super();
  }

  async findByUser(userId: string): Promise<PreferenceResponseDTO | null> {
    const entity = await this.repo.findByUser(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: PreferenceMatrixEntity): PreferenceResponseDTO {
    return {
      userId: entity.userId.value,
      emailOptIn: entity.emailOptIn,
      smsOptIn: entity.smsOptIn,
      pushOptIn: entity.pushOptIn,
      inAppOptIn: entity.inAppOptIn,
      webhookOptIn: entity.webhookOptIn,
    };
  }
}
