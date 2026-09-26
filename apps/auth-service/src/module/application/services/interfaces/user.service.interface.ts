/**
 * UserServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserEntity } from '../../../domain/entities/user.entity';
import type { CreateUserRequestDTO } from '../../dtos/requests/user/create-user.dto';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/update-user.dto';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';

export interface UserServiceInterface
  extends BaseServiceInterface<UserEntity, UserId> {
  create(input: CreateUserRequestDTO): Promise<UserEntity>;

  update(userId: UserId, input: UpdateUserRequestDTO): Promise<UserEntity>;

  delete(userId: UserId, reason?: string): Promise<void>;

  activate(userId: UserId): Promise<void>;

  deactivate(userId: UserId, reason: string): Promise<void>;

  suspend(userId: UserId, reason: string, until?: string): Promise<void>;

  unsuspend(userId: UserId): Promise<void>;

  findByEmail(email: string): Promise<UserEntity | null>;

  toResponse(user: UserEntity): UserResponseDTO;
}
