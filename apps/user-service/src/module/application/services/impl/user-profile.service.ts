import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserProfileServiceInterface } from '../interfaces/user-profile.service.interface';
import type { UserProfileRepository } from '../../../domain/repositories/user-profile.repository.interface';
import { UserProfileEntity } from '../../../domain/entities/user-profile.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '../../../domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '../../../domain/value-objects/primitives/user-bio.vo';
import { ProfileVisibilityVO } from '../../../domain/value-objects/primitives/profile-visibility.vo';
import { ProfileOperationFailedError } from '../../errors/profile.errors';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto';

@Injectable()
export class UserProfileService
  extends BaseService<UserProfileEntity, string>
  implements UserProfileServiceInterface
{
  readonly name = 'UserProfileService';

  constructor(
    private readonly profileRepo: UserProfileRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByUserId(userId: string): Promise<ProfileResponseDTO | null> {
    const entity = await this.profileRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async updateAvatar(userId: string, avatarUrl: string | null): Promise<ProfileResponseDTO> {
    const entity = await this.profileRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) throw new ProfileOperationFailedError('profile not found');
    const updated = entity.updateAvatar(avatarUrl ? UserAvatarVO.create(avatarUrl) : null);
    await this.profileRepo.save(updated);
    return this.toDTO(updated);
  }

  async updateBio(userId: string, bio: string | null): Promise<ProfileResponseDTO> {
    const entity = await this.profileRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) throw new ProfileOperationFailedError('profile not found');
    const updated = entity.updateBio(bio ? UserBioVO.create(bio) : null);
    await this.profileRepo.save(updated);
    return this.toDTO(updated);
  }

  async changeVisibility(userId: string, visibility: string): Promise<ProfileResponseDTO> {
    const entity = await this.profileRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) throw new ProfileOperationFailedError('profile not found');
    const updated = entity.changeVisibility(ProfileVisibilityVO.create(visibility));
    await this.profileRepo.save(updated);
    return this.toDTO(updated);
  }

  private toDTO(entity: UserProfileEntity): ProfileResponseDTO {
    return {
      success: true,
      profile: {
        userId: entity.userId.value,
        visibility: entity.visibility.value,
        avatarUrl: entity.avatar?.value,
        bio: entity.bio?.value,
        updatedAt: entity.updatedAt,
      },
    };
  }
}
