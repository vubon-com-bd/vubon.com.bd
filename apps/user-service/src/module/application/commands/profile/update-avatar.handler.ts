/**
 * UpdateAvatarHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAvatarCommand } from './update-avatar.command.js';
import { USER_PROFILE_REPOSITORY } from '@domain/repositories/user-profile.repository.interface';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { UserProfileMapper } from '../../mappers/user-profile.mapper.js';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto.js';
import {
  ProfileNotFoundApplicationError,
  ProfileUpdateFailedError,
} from '../../errors/profile.errors.js';

@CommandHandler(UpdateAvatarCommand)
export class UpdateAvatarHandler
  implements ICommandHandler<UpdateAvatarCommand, ProfileResponseDTO>
{
  constructor(
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly profileRepo: UserProfileRepository
  ) {}

  async execute(command: UpdateAvatarCommand): Promise<ProfileResponseDTO> {
    const { userId, avatarUrl } = command;
    const idVO = UserIdVO.create(userId);

    const profile = await this.profileRepo.findByUserId(idVO);
    if (!profile) throw new ProfileNotFoundApplicationError(userId);

    try {
      const avatar = UserAvatarVO.create(avatarUrl);
      profile.updateAvatar(avatar, new Date().toISOString());
      await this.profileRepo.save(profile);
      return UserProfileMapper.toResponse(profile);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new ProfileUpdateFailedError(userId, reason);
    }
  }
}
