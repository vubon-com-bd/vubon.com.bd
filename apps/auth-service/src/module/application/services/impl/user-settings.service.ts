import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserSettingsServiceInterface } from '../interfaces/user-settings.service.interface';
import type { UserSettingsRepository } from '../../../domain/repositories/user-settings.repository.interface';
import { UserSettingsEntity } from '../../../domain/entities/user-settings.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserOperationFailedError } from '../../errors/user.errors';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/user/update-settings.dto';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto';

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

  async findByUserId(userId: string): Promise<UserSettingsResponseDTO | null> {
    const entity = await this.settingsRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async update(
    userId: string,
    input: UpdateSettingsRequestDTO,
  ): Promise<UserSettingsResponseDTO> {
    const userIdVO = UserIdVO.create(userId);
    const entity = await this.settingsRepo.findByUserId(userIdVO);
    if (!entity) {
      throw new UserOperationFailedError(`settings not found: ${userId}`);
    }

    let updated = entity;
    if (input.theme) {
      updated = updated.updateTheme(input.theme as never);
    }
    if (input.notifications !== undefined) {
      updated = updated.toggleEmailNotifications(input.notifications);
    }

    await this.settingsRepo.save(updated);
    return this.toDTO(updated);
  }

  private toDTO(entity: UserSettingsEntity): UserSettingsResponseDTO {
    return {
      success: true,
      settings: {
        userId: entity.userId.value,
        locale: entity.language,
        language: entity.language,
        timezone: entity.timezone,
        currency: entity.currency,
        theme: entity.theme,
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        itemsPerPage: 20,
        notifications: entity.emailNotifications,
        twoFactor: false,
        updatedAt: entity.updatedAt,
      },
    };
  }
}
