import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserProfileEntity } from '../../../domain/entities/user-profile.entity';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/user/update-profile.dto';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto';

export interface UserProfileServiceInterface
  extends BaseServiceInterface<UserProfileEntity, string> {
  findByUserId(userId: string): Promise<UserProfileResponseDTO | null>;
  update(userId: string, input: UpdateProfileRequestDTO): Promise<UserProfileResponseDTO>;
}
