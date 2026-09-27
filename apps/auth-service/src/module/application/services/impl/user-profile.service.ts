/**
 * UserProfileService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserProfileServiceInterface } from '../interfaces/user-profile.service.interface.js';
import type { UserProfileRepository } from '../../../domain/repositories/user-profile.repository.interface.js';
import { UserProfileEntity } from '../../../domain/entities/user-profile.entity.js';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo.js';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/user/update-profile.dto.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';
import { USER_PROFILE_REPO } from '../../tokens.js';

@Injectable()
export class UserProfileService
  extends BaseService<UserProfileEntity, UserId>
  implements UserProfileServiceInterface {
  readonly name = 'UserProfileService';

  constructor(
    @Inject(USER_PROFILE_REPO)
    private readonly repo: UserProfileRepository,
  ) {
    super();
  }

  async getByUserId(userId: UserId): Promise<UserProfileEntity> {
    const profile = await this.repo.findByUserId(userId);
    if (!profile) throw new Error('Profile not found');
    return profile;
  }

  async update(
    userId: UserId,
    input: UpdateProfileRequestDTO,
  ): Promise<UserProfileEntity> {
    const profile = await this.getByUserId(userId);
    const maybeName = (input as { name?: string; displayName?: string }).displayName
      ?? (input as { name?: string }).name;
    if (maybeName) profile.updateDisplayName(UserNameVO.of(maybeName));
    const bio = (input as { bio?: string }).bio;
    if (typeof bio === 'string') profile.updateBio(bio);
    const avatarUrl = (input as { avatarUrl?: string }).avatarUrl;
    if (typeof avatarUrl === 'string') profile.updateAvatar(avatarUrl);
    return this.repo.save(profile);
  }

  toResponse(profile: UserProfileEntity): UserProfileResponseDTO {
    return {
      userId: profile.userId,
      displayName: profile.displayName.value,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      locale: profile.locale,
      updatedAt: profile.updatedAt,
    };
  }
}
