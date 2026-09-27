/**
 * UpdateVisibilityHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateVisibilityCommand } from './update-visibility.command.js';
import { USER_PROFILE_REPOSITORY } from '@domain/repositories/user-profile.repository.interface';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';
import { UserProfileMapper } from '../../mappers/user-profile.mapper.js';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto.js';
import {
  ProfileNotFoundApplicationError,
  ProfileUpdateFailedError,
} from '../../errors/profile.errors.js';

@CommandHandler(UpdateVisibilityCommand)
export class UpdateVisibilityHandler
  implements ICommandHandler<UpdateVisibilityCommand, ProfileResponseDTO>
{
  constructor(
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly profileRepo: UserProfileRepository
  ) {}

  async execute(command: UpdateVisibilityCommand): Promise<ProfileResponseDTO> {
    const { userId, visibility } = command;
    const idVO = UserIdVO.create(userId);

    const profile = await this.profileRepo.findByUserId(idVO);
    if (!profile) throw new ProfileNotFoundApplicationError(userId);

    try {
      profile.updateVisibility(
        ProfileVisibilityVO.create(visibility),
        new Date().toISOString()
      );
      await this.profileRepo.save(profile);
      return UserProfileMapper.toResponse(profile);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new ProfileUpdateFailedError(userId, reason);
    }
  }
}
