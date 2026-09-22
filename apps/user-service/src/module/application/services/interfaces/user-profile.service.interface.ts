import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserProfileEntity } from '../../../domain/entities/user-profile.entity';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto';

export interface UserProfileServiceInterface
  extends BaseServiceInterface<UserProfileEntity, string> {
  findByUserId(userId: string): Promise<ProfileResponseDTO | null>;
  updateAvatar(userId: string, avatarUrl: string | null): Promise<ProfileResponseDTO>;
  updateBio(userId: string, bio: string | null): Promise<ProfileResponseDTO>;
  changeVisibility(userId: string, visibility: string): Promise<ProfileResponseDTO>;
}
