import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserPreferencesServiceInterface } from '../interfaces/user-preferences.service.interface';
import type { UserPreferencesRepository } from '../../../domain/repositories/user-preferences.repository.interface';
import { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { PreferenceKeyVO } from '../../../domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '../../../domain/value-objects/primitives/preference-value.vo';
import { PreferenceOperationFailedError } from '../../errors/preference.errors';
import type { PreferencesResponseDTO } from '../../dtos/responses/preferences-response.dto';

@Injectable()
export class UserPreferencesService
  extends BaseService<UserPreferencesEntity, string>
  implements UserPreferencesServiceInterface
{
  readonly name = 'UserPreferencesService';

  constructor(
    private readonly preferencesRepo: UserPreferencesRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByUserId(userId: string): Promise<PreferencesResponseDTO | null> {
    const entity = await this.preferencesRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async update(userId: string, patch: Record<string, string>): Promise<PreferencesResponseDTO> {
    let entity = await this.preferencesRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) throw new PreferenceOperationFailedError('preferences not found');
    for (const [key, value] of Object.entries(patch)) {
      entity = entity.setEntry(
        PreferenceKeyVO.create(key),
        PreferenceValueVO.create(value),
      );
    }
    await this.preferencesRepo.save(entity);
    return this.toDTO(entity);
  }

  private toDTO(entity: UserPreferencesEntity): PreferencesResponseDTO {
    return {
      success: true,
      preferences: {
        userId: entity.userId.value,
        entries: entity.entries.map((e) => ({ key: e.key.value, value: e.value.value })),
        updatedAt: entity.updatedAt,
      },
    } as unknown as PreferencesResponseDTO;
  }
}
