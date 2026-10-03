/**
 * ResetSettingsHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ResetSettingsCommand } from './reset-settings.command.js';
import { USER_SETTINGS_REPOSITORY } from '@domain/repositories/user-settings.repository.interface';
import type { UserSettingsRepository } from '@domain/repositories/user-settings.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto.js';
import {
  SettingsNotFoundApplicationError,
  SettingsUpdateFailedError,
} from '../../errors/settings.errors.js';

@CommandHandler(ResetSettingsCommand)
export class ResetSettingsHandler
  implements ICommandHandler<ResetSettingsCommand, SettingsResponseDTO>
{
  constructor(
    @Inject(USER_SETTINGS_REPOSITORY)
    private readonly settingsRepo: UserSettingsRepository
  ) {}

  async execute(command: ResetSettingsCommand): Promise<SettingsResponseDTO> {
    const { userId } = command;
    const userIdVO = UserIdVO.create(userId);

    const settings = await this.settingsRepo.findByUserId(userIdVO);
    if (!settings) throw new SettingsNotFoundApplicationError(userId);

    try {
      settings.reset();
      await this.settingsRepo.save(settings);

      return {
        userId,
        theme: 'system',
        language: 'bn',
        locale: 'bn-BD',
        timezone: 'Asia/Dhaka',
        currency: 'BDT',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        itemsPerPage: 20,
        notifications: true,
        twoFactor: false,
        updatedAt: new Date().toISOString(),
      };
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new SettingsUpdateFailedError(userId, reason);
    }
  }
}
