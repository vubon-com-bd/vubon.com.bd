/**
 * UserPreferencesServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity.js';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/user/update-preferences.dto.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';

export interface UserPreferencesServiceInterface
  extends BaseServiceInterface<UserPreferencesEntity, UserId> {
  getByUserId(userId: UserId): Promise<UserPreferencesEntity>;

  update(
    userId: UserId,
    input: UpdatePreferencesRequestDTO,
  ): Promise<UserPreferencesEntity>;

  toResponse(prefs: UserPreferencesEntity): UserPreferencesResponseDTO;
}
