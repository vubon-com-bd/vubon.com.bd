/**
 * AuthSettingsServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UpdateAuthSettingsRequestDTO } from '../../dtos/requests/settings/update-auth-settings.dto';
import type { UpdateAuthPreferencesRequestDTO } from '../../dtos/requests/settings/update-auth-preferences.dto';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto';

export interface AuthSettingsServiceInterface
  extends BaseServiceInterface<AuthSettingsResponseDTO, UserId> {
  getSettings(userId: UserId): Promise<AuthSettingsResponseDTO>;

  updateSettings(
    userId: UserId,
    input: UpdateAuthSettingsRequestDTO,
  ): Promise<AuthSettingsResponseDTO>;

  updatePreferences(
    userId: UserId,
    input: UpdateAuthPreferencesRequestDTO,
  ): Promise<void>;
}
