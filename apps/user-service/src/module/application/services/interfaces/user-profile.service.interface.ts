/**
 * UserProfileServiceInterface
 */
import type { UpdateProfileRequestDTO } from '../../dtos/requests/profile/index.js';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto.js';

export interface UserProfileServiceInterface {
  findByUserId(userId: string): Promise<ProfileResponseDTO>;
  update(userId: string, input: UpdateProfileRequestDTO): Promise<ProfileResponseDTO>;
  updateAvatar(userId: string, avatarUrl: string): Promise<ProfileResponseDTO>;
  updateBio(userId: string, bio: string): Promise<ProfileResponseDTO>;
  updateVisibility(userId: string, visibility: string): Promise<ProfileResponseDTO>;
}
