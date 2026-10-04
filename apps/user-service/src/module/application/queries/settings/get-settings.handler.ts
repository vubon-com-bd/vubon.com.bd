/**
 * GetSettingsHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSettingsQuery } from './get-settings.query.js';
import { USER_SETTINGS_REPOSITORY } from '@domain/repositories/user-settings.repository.interface';
import type { UserSettingsRepository } from '@domain/repositories/user-settings.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto.js';
import { SettingsNotFoundApplicationError } from '../../errors/settings.errors.js';

@QueryHandler(GetSettingsQuery)
export class GetSettingsHandler
  implements IQueryHandler<GetSettingsQuery, SettingsResponseDTO>
{
  constructor(
    @Inject(USER_SETTINGS_REPOSITORY)
    private readonly settingsRepo: UserSettingsRepository
  ) {}

  async execute(query: GetSettingsQuery): Promise<SettingsResponseDTO> {
    const settings = await this.settingsRepo.findByUserId(UserIdVO.create(query.userId));
    if (!settings) throw new SettingsNotFoundApplicationError(query.userId);

    return {
      userId: query.userId,
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
  }
}
