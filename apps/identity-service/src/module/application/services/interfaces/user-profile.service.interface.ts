/**
 * User Profile Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserProfileEntity } from '../../../domain/entities/user-profile.entity.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';

export const USER_PROFILE_SERVICE = Symbol('USER_PROFILE_SERVICE');

export interface UserProfileServiceInterface extends BaseServiceInterface<UserProfileEntity, string> {
  findForUser(userId: string): Promise<UserProfileResponseDTO | null>;
  upsert(userId: string, patch: Partial<UserProfileResponseDTO>): Promise<UserProfileResponseDTO>;
}
