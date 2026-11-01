/**
 * User Profile Mapper
 * @module identity-service/application/mappers
 */
import type { UserProfileResponseDTO } from '../dtos/responses/user-profile-response.dto.js';

interface ProfileEntityLike {
  readonly userId: { readonly value: string };
  readonly firstName?: { readonly value: string };
  readonly lastName?: { readonly value: string };
  readonly displayName?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly coverUrl?: string;
  readonly gender?: string;
  readonly dateOfBirth?: string;
  readonly website?: string;
  readonly language?: string;
  readonly locale?: string;
  readonly timezone?: string;
  readonly updatedAt: string;
}

export class UserProfileMapper {
  static toDTO(entity: ProfileEntityLike): UserProfileResponseDTO {
    return {
      userId: entity.userId.value,
      firstName: entity.firstName?.value,
      lastName: entity.lastName?.value,
      displayName: entity.displayName,
      bio: entity.bio,
      avatarUrl: entity.avatarUrl,
      coverUrl: entity.coverUrl,
      gender: entity.gender,
      dateOfBirth: entity.dateOfBirth,
      website: entity.website,
      visibility: 'public',
      completionPercent: 0,
      updatedAt: entity.updatedAt,
    };
  }
}
