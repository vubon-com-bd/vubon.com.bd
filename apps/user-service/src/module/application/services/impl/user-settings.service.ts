import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserSettingsServiceInterface } from '../interfaces/user-settings.service.interface';
import type { UserSettingsRepository } from '../../../domain/repositories/user-settings.repository.interface';
import { UserSettingsEntity } from '../../../domain/entities/user-settings.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { SettingKeyVO } from '../../../domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '../../../domain/value-objects/primitives/setting-value.vo';
import { SettingsOperationFailedError } from '../../errors/settings.errors';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto';

@Injectable()
export class UserSettingsService
  extends BaseService<UserSettingsEntity, string>
  implements UserSettingsServiceInterface
{
  readonly name = 'UserSettingsService';

  constructor(
    private readonly settingsRepo: UserSettingsRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByUserId(userId: string): Promise<SettingsResponseDTO | null> {
    const entity = await this.settingsRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async update(userId: string, patch: Record<string, string>): Promise<SettingsResponseDTO> {
    let entity = await this.settingsRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) throw new SettingsOperationFailedError('settings not found');
    for (const [key, value] of Object.entries(patch)) {
      entity = entity.setEntry(SettingKeyVO.create(key), SettingValueVO.create(value));
    }
    await this.settingsRepo.save(entity);
    return this.toDTO(entity);
  }

  private toDTO(entity: UserSettingsEntity): SettingsResponseDTO {
    return {
      success: true,
      settings: {
        userId: entity.userId.value,
        entries: entity.entries.map((e) => ({ key: e.key.value, value: e.value.value })),
        updatedAt: entity.updatedAt,
      },
    } as unknown as SettingsResponseDTO;
  }
}
