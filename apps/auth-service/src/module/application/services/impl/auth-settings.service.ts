/**
 * AuthSettingsService — Per-user auth settings
 * @module auth-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthSettingsServiceInterface } from '../interfaces/auth-settings.service.interface';
import type { UpdateAuthSettingsRequestDTO } from '../../dtos/requests/settings/update-auth-settings.dto';
import type { UpdateAuthPreferencesRequestDTO } from '../../dtos/requests/settings/update-auth-preferences.dto';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto';

interface SettingsCache {
  sessionTimeoutMinutes: number;
  maxConcurrentSessions: number;
  mfaRequired: boolean;
  allowedProviders: readonly string[];
}

@Injectable()
export class AuthSettingsService
  extends BaseService<AuthSettingsResponseDTO, UserId>
  implements AuthSettingsServiceInterface {
  readonly name = 'AuthSettingsService';

  private readonly store = new Map<string, SettingsCache>();

  async getSettings(userId: UserId): Promise<AuthSettingsResponseDTO> {
    const cached = this.store.get(userId);
    const cfg = cached ?? AuthSettingsService.defaults();
    return {
      userId,
      sessionTimeoutMinutes: cfg.sessionTimeoutMinutes,
      maxConcurrentSessions: cfg.maxConcurrentSessions,
      mfaRequired: cfg.mfaRequired,
      allowedProviders: cfg.allowedProviders,
      updatedAt: new Date().toISOString(),
    };
  }

  async updateSettings(
    userId: UserId,
    input: UpdateAuthSettingsRequestDTO,
  ): Promise<AuthSettingsResponseDTO> {
    const current = this.store.get(userId) ?? AuthSettingsService.defaults();
    const next: SettingsCache = {
      sessionTimeoutMinutes:
        input.sessionTimeoutMinutes ?? current.sessionTimeoutMinutes,
      maxConcurrentSessions:
        input.maxConcurrentSessions ?? current.maxConcurrentSessions,
      mfaRequired: input.mfaRequired ?? current.mfaRequired,
      allowedProviders: input.allowedProviders ?? current.allowedProviders,
    };
    this.store.set(userId, next);
    return this.getSettings(userId);
  }

  async updatePreferences(
    _userId: UserId,
    _input: UpdateAuthPreferencesRequestDTO,
  ): Promise<void> {
    // Preferences live in UserPreferences aggregate; handled elsewhere.
  }

  private static defaults(): SettingsCache {
    return {
      sessionTimeoutMinutes: 60 * 24 * 7,
      maxConcurrentSessions: 5,
      mfaRequired: false,
      allowedProviders: ['google', 'facebook', 'apple'],
    };
  }
}
