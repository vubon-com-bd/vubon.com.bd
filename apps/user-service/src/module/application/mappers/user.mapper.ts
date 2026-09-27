/**
 * UserMapper — Entity → DTO (pure transformation)
 * @module user-service/application/mappers
 */
import { UserEntity } from '@domain/entities/user.entity';
import type { UserResponseDTO } from '../dtos/responses/user-response.dto.js';
import type { UserPublicResponseDTO } from '../dtos/responses/user-public-response.dto.js';

export class UserMapper {
  static toResponse(user: UserEntity): UserResponseDTO {
    return {
      id: user.id,
      email: user.email.value,
      phone: user.phone?.value,
      status: user.status.value,
      type: user.type.value,
      roles: [],
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      isMfaEnabled: false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toPublicResponse(user: UserEntity): UserPublicResponseDTO {
    return {
      id: user.id,
      displayName: user.name.value,
      status: user.status.value,
      type: user.type.value,
    };
  }

  static toResponseList(users: readonly UserEntity[]): readonly UserResponseDTO[] {
    return users.map((u) => UserMapper.toResponse(u));
  }

  static toPublicResponseList(
    users: readonly UserEntity[]
  ): readonly UserPublicResponseDTO[] {
    return users.map((u) => UserMapper.toPublicResponse(u));
  }
}
