/**
 * UserProfileService
 */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { UserProfileServiceInterface } from '../interfaces/user-profile.service.interface.js';
import { UpdateProfileCommand } from '../../commands/profile/update-profile.command.js';
import { UpdateAvatarCommand } from '../../commands/profile/update-avatar.command.js';
import { UpdateBioCommand } from '../../commands/profile/update-bio.command.js';
import { UpdateVisibilityCommand } from '../../commands/profile/update-visibility.command.js';
import { GetProfileQuery } from '../../queries/profile/get-profile.query.js';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/profile/index.js';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto.js';
import type { ProfileVisibilitySchemaType } from '@vubon/shared-schemas/user';

@Injectable()
export class UserProfileService implements UserProfileServiceInterface {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  findByUserId(userId: string): Promise<ProfileResponseDTO> {
    return this.queryBus.execute(new GetProfileQuery(userId));
  }

  update(userId: string, input: UpdateProfileRequestDTO): Promise<ProfileResponseDTO> {
    return this.commandBus.execute(new UpdateProfileCommand(userId, input));
  }

  updateAvatar(userId: string, avatarUrl: string): Promise<ProfileResponseDTO> {
    return this.commandBus.execute(new UpdateAvatarCommand(userId, avatarUrl));
  }

  updateBio(userId: string, bio: string): Promise<ProfileResponseDTO> {
    return this.commandBus.execute(new UpdateBioCommand(userId, bio));
  }

  updateVisibility(
    userId: string,
    visibility: string
  ): Promise<ProfileResponseDTO> {
    return this.commandBus.execute(
      new UpdateVisibilityCommand(userId, visibility as ProfileVisibilitySchemaType)
    );
  }
}
