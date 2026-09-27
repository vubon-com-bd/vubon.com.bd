/**
 * UserProfileMapper
 */
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import type { ProfileResponseDTO } from '../dtos/responses/profile-response.dto.js';

export class UserProfileMapper {
  static toResponse(profile: UserProfileEntity): ProfileResponseDTO {
    return {
      userId: profile.userId.value,
      bio: profile.bio.value.length > 0 ? profile.bio.value : undefined,
      avatarUrl: profile.avatar.value.length > 0 ? profile.avatar.value : undefined,
      visibility: profile.visibility.value,
      updatedAt: profile.updatedAt,
    };
  }

  static toResponseList(
    profiles: readonly UserProfileEntity[]
  ): readonly ProfileResponseDTO[] {
    return profiles.map((p) => UserProfileMapper.toResponse(p));
  }
}
