import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserSettingsServiceInterface } from '../interfaces/user-settings.service.interface.js';
import type { UserSettingsRepository } from '../../../domain/repositories/user-settings.repository.interface.js';
import { USER_SETTINGS_REPOSITORY } from '../../../domain/repositories/user-settings.repository.interface.js';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto.js';

@Injectable()
export class UserSettingsService extends BaseService implements UserSettingsServiceInterface {
  readonly name = 'UserSettingsService';
  constructor(@Inject(USER_SETTINGS_REPOSITORY) private readonly repo: UserSettingsRepository) { super(); }
  async findForUser(userId: string): Promise<UserSettingsResponseDTO | null> {
    const s = await this.repo.findByUserIdRaw(userId);
    if (!s) return null;
    return {
      userId: s.userId.value, language: s.language, timezone: s.timezone,
      currency: s.currency, dateFormat: s.dateFormat, timeFormat: s.timeFormat,
      theme: s.theme, notificationsEnabled: s.notificationsEnabled,
      marketingEmails: s.marketingEmails, securityAlerts: s.securityAlerts,
      loginAlerts: s.loginAlerts, twoFactorRequired: s.twoFactorRequired,
      sessionTimeout: s.sessionTimeout, updatedAt: s.updatedAt,
    };
  }
  async update(userId: string, patch: Partial<UserSettingsResponseDTO>): Promise<UserSettingsResponseDTO> {
    const existing = await this.findForUser(userId);
    return { ...(existing ?? { userId, updatedAt: new Date().toISOString() }), ...patch } as UserSettingsResponseDTO;
  }
}
