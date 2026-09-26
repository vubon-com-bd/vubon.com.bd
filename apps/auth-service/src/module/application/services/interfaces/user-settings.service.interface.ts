/**
 * UserSettingsServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserSettingsEntity } from '../../../domain/entities/user-settings.entity';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/user/update-settings.dto';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto';

export interface UserSettingsServiceInterface
  extends BaseServiceInterface<UserSettingsEntity, UserId> {
  getByUserId(userId: UserId): Promise<UserSettingsEntity>;

  update(
    userId: UserId,
    input: UpdateSettingsRequestDTO,
  ): Promise<UserSettingsEntity>;

  toResponse(settings: UserSettingsEntity): UserSettingsResponseDTO;
}
