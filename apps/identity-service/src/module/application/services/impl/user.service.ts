/**
 * User Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserServiceInterface } from '../interfaces/user.service.interface.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import type { UserEntity } from '../../../domain/entities/user.entity.js';
import type { UserResponseDTO, UserPublicDTO } from '../../dtos/responses/user-response.dto.js';

@Injectable()
export class UserService extends BaseService implements UserServiceInterface {
  readonly name = 'UserService';

  constructor(@Inject(USER_REPOSITORY) private readonly repo: UserRepository) { super(); }

  async findById(userId: string): Promise<UserResponseDTO | null> {
    const u = await this.repo.findById(userId);
    return u ? this.toResponse(u) : null;
  }

  async findByEmail(email: string): Promise<UserResponseDTO | null> {
    const u = await this.repo.findByEmailRaw(email);
    return u ? this.toResponse(u) : null;
  }

  toPublic(user: UserEntity): UserPublicDTO {
    return {
      id: user.id,
      email: user.email.value,
      firstName: user.firstName?.value,
      lastName: user.lastName?.value,
      username: user.username,
      status: user.status.value,
      type: user.type.value,
      roles: user.roles.map((r) => r.value),
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      isMfaEnabled: user.isMfaEnabled,
      createdAt: user.createdAt,
    };
  }

  private toResponse(u: UserEntity): UserResponseDTO {
    return {
      id: u.id,
      email: u.email.value,
      firstName: u.firstName?.value,
      lastName: u.lastName?.value,
      username: u.username,
      status: u.status.value,
      type: u.type.value,
      roles: u.roles.map((r) => r.value),
      emailVerified: u.emailVerified,
      phoneVerified: u.phoneVerified,
      isMfaEnabled: u.isMfaEnabled,
      createdAt: u.createdAt,
    } as never;
  }
}
