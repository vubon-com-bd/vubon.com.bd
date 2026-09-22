import { UserProfileEntity } from '../../domain/entities/user-profile.entity';
import type { ProfileResponseDTO } from '../dtos/responses/profile-response.dto';

export class UserProfileMapper {
  static toResponse(profile: UserProfileEntity): ProfileResponseDTO {
    return {
      success: true,
      profile: {
        userId: profile.userId.value,
        visibility: profile.visibility.value,
        avatarUrl: profile.avatar?.value,
        bio: profile.bio?.value,
        updatedAt: profile.updatedAt,
      },
    } as unknown as ProfileResponseDTO;
  }

  static toListResponse(
    profiles: readonly UserProfileEntity[],
  ): readonly ProfileResponseDTO[] {
    return profiles.map((p) => UserProfileMapper.toResponse(p));
  }
}
