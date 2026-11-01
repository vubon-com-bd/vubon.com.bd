/**
 * User Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserEntity } from '../../../domain/entities/user.entity.js';
import type { UserResponseDTO, UserPublicDTO } from '../../dtos/responses/user-response.dto.js';

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface UserServiceInterface extends BaseServiceInterface<UserEntity, string> {
  findById(userId: string): Promise<UserResponseDTO | null>;
  findByEmail(email: string): Promise<UserResponseDTO | null>;
  toPublic(user: UserEntity): UserPublicDTO;
}
