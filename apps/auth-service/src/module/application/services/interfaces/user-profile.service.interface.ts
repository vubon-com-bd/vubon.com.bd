/**
 * UserProfileServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserProfileEntity } from '../../../domain/entities/user-profile.entity.js';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/user/update-profile.dto.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';

export interface UserProfileServiceInterface
  extends BaseServiceInterface<UserProfileEntity, UserId> {
  getByUserId(userId: UserId): Promise<UserProfileEntity>;

  update(
    userId: UserId,
    input: UpdateProfileRequestDTO,
  ): Promise<UserProfileEntity>;

  toResponse(profile: UserProfileEntity): UserProfileResponseDTO;
}
