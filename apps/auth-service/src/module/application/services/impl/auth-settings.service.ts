import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthSettingsServiceInterface } from '../interfaces/auth-settings.service.interface';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto';

interface AuthSettingsStore {
  mfaRequired: boolean;
  sessionTimeoutMinutes: number;
  passwordExpiryDays: number;
  loginNotifications: boolean;
  updatedAt: string;
}

const DEFAULTS: AuthSettingsStore = {
  mfaRequired: false,
  sessionTimeoutMinutes: 60,
  passwordExpiryDays: 90,
  loginNotifications: true,
  updatedAt: new Date(0).toISOString(),
};

@Injectable()
export class AuthSettingsService
  extends BaseService<unknown, string>
  implements AuthSettingsServiceInterface
{
  readonly name = 'AuthSettingsService';

  private readonly store = new Map<string, AuthSettingsStore>();

  constructor(private readonly eventBus: EventBus) {
    super();
  }

  async get(userId: string): Promise<AuthSettingsResponseDTO> {
    const settings = this.store.get(userId) ?? DEFAULTS;
    return this.toDTO(userId, settings);
  }

  async update(
    userId: string,
    patch: Partial<AuthSettingsResponseDTO>,
  ): Promise<AuthSettingsResponseDTO> {
    const current = this.store.get(userId) ?? DEFAULTS;
    const next: AuthSettingsStore = {
      mfaRequired: patch.mfaRequired ?? current.mfaRequired,
      sessionTimeoutMinutes:
        patch.sessionTimeoutMinutes ?? current.sessionTimeoutMinutes,
      passwordExpiryDays:
        patch.passwordExpiryDays ?? current.passwordExpiryDays,
      loginNotifications:
        patch.loginNotifications ?? current.loginNotifications,
      updatedAt: new Date().toISOString(),
    };
    this.store.set(userId, next);
    return this.toDTO(userId, next);
  }

  private toDTO(userId: string, s: AuthSettingsStore): AuthSettingsResponseDTO {
    return {
      userId,
      mfaRequired: s.mfaRequired,
      sessionTimeoutMinutes: s.sessionTimeoutMinutes,
      passwordExpiryDays: s.passwordExpiryDays,
      loginNotifications: s.loginNotifications,
      updatedAt: s.updatedAt,
    };
  }
}
