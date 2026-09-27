/**
 * UpdateBioHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateBioCommand } from './update-bio.command.js';
import { USER_PROFILE_REPOSITORY } from '@domain/repositories/user-profile.repository.interface';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';
import { UserProfileMapper } from '../../mappers/user-profile.mapper.js';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto.js';
import {
  ProfileNotFoundApplicationError,
  ProfileUpdateFailedError,
} from '../../errors/profile.errors.js';

@CommandHandler(UpdateBioCommand)
export class UpdateBioHandler
  implements ICommandHandler<UpdateBioCommand, ProfileResponseDTO>
{
  constructor(
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly profileRepo: UserProfileRepository
  ) {}

  async execute(command: UpdateBioCommand): Promise<ProfileResponseDTO> {
    const { userId, bio } = command;
    const idVO = UserIdVO.create(userId);

    const profile = await this.profileRepo.findByUserId(idVO);
    if (!profile) throw new ProfileNotFoundApplicationError(userId);

    try {
      profile.updateBio(UserBioVO.create(bio), new Date().toISOString());
      await this.profileRepo.save(profile);
      return UserProfileMapper.toResponse(profile);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new ProfileUpdateFailedError(userId, reason);
    }
  }
}
