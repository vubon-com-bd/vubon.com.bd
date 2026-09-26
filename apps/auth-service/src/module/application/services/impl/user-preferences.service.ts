/**
 * UserPreferencesService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserPreferencesServiceInterface } from '../interfaces/user-preferences.service.interface';
import type { UserPreferencesRepository } from '../../../domain/repositories/user-preferences.repository.interface';
import { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/user/update-preferences.dto';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto';
import { USER_PREFERENCES_REPO } from '../../tokens';

@Injectable()
export class UserPreferencesService
  extends BaseService<UserPreferencesEntity, UserId>
  implements UserPreferencesServiceInterface {
  readonly name = 'UserPreferencesService';

  constructor(
    @Inject(USER_PREFERENCES_REPO)
    private readonly repo: UserPreferencesRepository,
  ) { super(); }

  async getByUserId(userId: UserId): Promise<UserPreferencesEntity> {
    const p = await this.repo.findByUserId(userId);
    if (!p) throw new Error('Preferences not found');
    return p;
  }

  async update(
    userId: UserId,
    input: UpdatePreferencesRequestDTO,
  ): Promise<UserPreferencesEntity> {
    const p = await this.getByUserId(userId);
    const anyInput = input as { theme?: 'light' | 'dark' | 'system'; currency?: string; reduceMotion?: boolean };
    if (anyInput.theme) p.setTheme(anyInput.theme);
    if (anyInput.currency) p.setCurrency(anyInput.currency);
    if (typeof anyInput.reduceMotion === 'boolean') p.setReduceMotion(anyInput.reduceMotion);
    return this.repo.save(p);
  }

  toResponse(p: UserPreferencesEntity): UserPreferencesResponseDTO {
    return {
      userId: p.userId,
      theme: p.theme,
      currency: p.currency,
      dateFormat: 'DD/MM/YYYY',
      reduceMotion: false,
      updatedAt: p.updatedAt,
    };
  }
}
