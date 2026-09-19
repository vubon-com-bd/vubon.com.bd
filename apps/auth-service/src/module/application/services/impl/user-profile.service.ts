import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserProfileServiceInterface } from '../interfaces/user-profile.service.interface';
import type { UserProfileRepository } from '../../../domain/repositories/user-profile.repository.interface';
import { UserProfileEntity } from '../../../domain/entities/user-profile.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserOperationFailedError } from '../../errors/user.errors';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/user/update-profile.dto';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto';

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

  async findByUserId(userId: string): Promise<UserProfileResponseDTO | null> {
    const entity = await this.profileRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async update(
    userId: string,
    input: UpdateProfileRequestDTO,
  ): Promise<UserProfileResponseDTO> {
    const userIdVO = UserIdVO.create(userId);
    const entity = await this.profileRepo.findByUserId(userIdVO);
    if (!entity) {
      throw new UserOperationFailedError(`profile not found: ${userId}`);
    }

    const firstName = input.firstName
      ? UserNameVO.create(input.firstName)
      : entity.firstName;
    const lastName = input.lastName
      ? UserNameVO.create(input.lastName)
      : entity.lastName;

    const updated = UserProfileEntity.reconstitute(
      entity.id,
      {
        userId: entity.userId,
        firstName,
        lastName,
        bio: input.bio ?? entity.bio,
        avatarUrl: entity.avatarUrl,
        dateOfBirth: entity.dateOfBirth,
        gender: entity.gender,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    await this.profileRepo.save(updated);
    return this.toDTO(updated);
  }

  private toDTO(entity: UserProfileEntity): UserProfileResponseDTO {
    return {
      success: true,
      profile: {
        userId: entity.userId.value,
        visibility: 'public',
        firstName: entity.firstName.value,
        lastName: entity.lastName.value,
        displayName: `${entity.firstName.value} ${entity.lastName.value}`.trim(),
        avatarUrl: entity.avatarUrl ?? undefined,
        bio: entity.bio ?? undefined,
        updatedAt: entity.updatedAt,
      },
    };
  }
}
