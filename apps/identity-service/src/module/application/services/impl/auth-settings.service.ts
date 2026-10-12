import { Injectable } from '@nestjs/common';
import type { AuthSettingsServiceInterface } from '../interfaces/auth-settings.service.interface.js';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto.js';
import type { UpdateAuthSettingsRequestDTO } from '../../dtos/requests/settings/update-auth-settings.dto.js';

@Injectable()
export class AuthSettingsService implements AuthSettingsServiceInterface {
  readonly name = 'AuthSettingsService';
  private settings: AuthSettingsResponseDTO = {
    twoFactorRequired: false,
    sessionTimeoutSeconds: 86400,
    passwordExpiryDays: 90,
    passwordHistoryCount: 5,
    loginAlertsEnabled: true,
    maxLoginAttempts: 5,
    lockoutDurationSeconds: 900,
    allowedIpRanges: [],
    mfaRequired: false,
  };
  async get(): Promise<AuthSettingsResponseDTO> { return { ...this.settings }; }
  async update(input: UpdateAuthSettingsRequestDTO): Promise<AuthSettingsResponseDTO> {
    this.settings = { ...this.settings, ...input } as AuthSettingsResponseDTO;
    return { ...this.settings };
  }
}
