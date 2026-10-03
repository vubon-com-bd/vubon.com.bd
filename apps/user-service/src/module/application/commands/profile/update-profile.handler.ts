/**
 * UpdateProfileHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProfileCommand } from './update-profile.command.js';
import { USER_PROFILE_REPOSITORY } from '@domain/repositories/user-profile.repository.interface';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';
import { UserProfileMapper } from '../../mappers/user-profile.mapper.js';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto.js';
import {
  ProfileNotFoundApplicationError,
  ProfileUpdateFailedError,
} from '../../errors/profile.errors.js';
import { UserNotFoundApplicationError } from '../../errors/user.errors.js';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand, ProfileResponseDTO>
{
  constructor(
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly profileRepo: UserProfileRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: UpdateProfileCommand): Promise<ProfileResponseDTO> {
    const { userId, payload } = command;
    const idVO = UserIdVO.create(userId);

    const user = await this.userRepo.findById(idVO.value);
    if (!user) throw new UserNotFoundApplicationError(userId);

    const profile = await this.profileRepo.findByUserId(idVO);
    if (!profile) throw new ProfileNotFoundApplicationError(userId);

    try {
      const now = new Date().toISOString();

      // Update name if firstName/lastName provided
      if (payload.firstName !== undefined || payload.lastName !== undefined) {
        const fn = payload.firstName ?? '';
        const ln = payload.lastName ?? '';
        const full = [fn, ln].filter(Boolean).join(' ').trim();
        if (full.length >= 2) {
          user.changeName(UserNameVO.create(full), now);
          await this.userRepo.save(user);
        }
      }

      if (payload.bio !== undefined) {
        profile.updateBio(UserBioVO.create(payload.bio), now);
      }

      if (payload.avatarUrl !== undefined) {
        profile.updateAvatar(UserAvatarVO.create(payload.avatarUrl), now);
      }

      if (payload.visibility !== undefined) {
        profile.updateVisibility(ProfileVisibilityVO.create(payload.visibility), now);
      }

      await this.profileRepo.save(profile);
      return UserProfileMapper.toResponse(profile);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new ProfileUpdateFailedError(userId, reason);
    }
  }
}
