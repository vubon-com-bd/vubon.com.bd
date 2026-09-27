/**
 * UpdateSettingsHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateSettingsCommand } from './update-settings.command.js';
import { USER_SETTINGS_REPOSITORY } from '@domain/repositories/user-settings.repository.interface';
import type { UserSettingsRepository } from '@domain/repositories/user-settings.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto.js';
import {
  SettingsNotFoundApplicationError,
  SettingsUpdateFailedError,
} from '../../errors/settings.errors.js';

@CommandHandler(UpdateSettingsCommand)
export class UpdateSettingsHandler
  implements ICommandHandler<UpdateSettingsCommand, SettingsResponseDTO>
{
  constructor(
    @Inject(USER_SETTINGS_REPOSITORY)
    private readonly settingsRepo: UserSettingsRepository
  ) {}

  async execute(command: UpdateSettingsCommand): Promise<SettingsResponseDTO> {
    const { userId, ...fields } = command.payload;
    const userIdVO = UserIdVO.create(userId);

    const settings = await this.settingsRepo.findByUserId(userIdVO);
    if (!settings) throw new SettingsNotFoundApplicationError(userId);

    try {
      const map: Record<string, string | number | boolean | undefined> = {
        theme: fields.theme,
        language: fields.language,
        timezone: fields.timezone,
        currency: fields.currency,
        date_format: fields.dateFormat,
        time_format: fields.timeFormat,
        notifications: fields.notifications,
        two_factor: fields.twoFactor,
      };

      for (const [key, value] of Object.entries(map)) {
        if (value === undefined) continue;
        settings.set(
          SettingKeyVO.create(key),
          SettingValueVO.create(String(value))
        );
      }

      await this.settingsRepo.save(settings);

      return {
        userId,
        theme: settings.get('theme')?.value ?? 'system',
        language: settings.get('language')?.value ?? 'bn',
        locale: 'bn-BD',
        timezone: settings.get('timezone')?.value ?? 'Asia/Dhaka',
        currency: settings.get('currency')?.value ?? 'BDT',
        dateFormat: settings.get('date_format')?.value ?? 'DD/MM/YYYY',
        timeFormat: settings.get('time_format')?.value ?? '24h',
        itemsPerPage: 20,
        notifications: settings.get('notifications')?.toBoolean() ?? true,
        twoFactor: settings.get('two_factor')?.toBoolean() ?? false,
        updatedAt: settings.updatedAt,
      };
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new SettingsUpdateFailedError(userId, reason);
    }
  }
}
