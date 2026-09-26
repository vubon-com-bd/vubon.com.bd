/**
 * UserSettingsService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserSettingsServiceInterface } from '../interfaces/user-settings.service.interface';
import type { UserSettingsRepository } from '../../../domain/repositories/user-settings.repository.interface';
import { UserSettingsEntity } from '../../../domain/entities/user-settings.entity';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/user/update-settings.dto';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto';
import { USER_SETTINGS_REPO } from '../../tokens';

@Injectable()
export class UserSettingsService
  extends BaseService<UserSettingsEntity, UserId>
  implements UserSettingsServiceInterface {
  readonly name = 'UserSettingsService';

  constructor(
    @Inject(USER_SETTINGS_REPO)
    private readonly repo: UserSettingsRepository,
  ) { super(); }

  async getByUserId(userId: UserId): Promise<UserSettingsEntity> {
    const s = await this.repo.findByUserId(userId);
    if (!s) throw new Error('Settings not found');
    return s;
  }

  async update(
    userId: UserId,
    input: UpdateSettingsRequestDTO,
  ): Promise<UserSettingsEntity> {
    const s = await this.getByUserId(userId);
    const anyInput = input as {
      emailNotifications?: boolean;
      smsNotifications?: boolean;
      pushNotifications?: boolean;
      marketingEmails?: boolean;
    };
    s.updateNotifications({
      email: anyInput.emailNotifications,
      sms: anyInput.smsNotifications,
      push: anyInput.pushNotifications,
      marketing: anyInput.marketingEmails,
    });
    return this.repo.save(s);
  }

  toResponse(s: UserSettingsEntity): UserSettingsResponseDTO {
    return {
      userId: s.userId,
      twoFactorEnabled: s.twoFactorEnabled,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
      language: 'bn',
      timezone: 'Asia/Dhaka',
      updatedAt: s.updatedAt,
    };
  }
}
