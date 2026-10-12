/**
 * User Mapper
 * @module identity-service/application/mappers
 */
import type { UserEntity } from '../../domain/entities/user.entity.js';
import type { UserResponseDTO } from '../dtos/responses/user-response.dto.js';

export class UserMapper {
  static toDTO(entity: UserEntity): UserResponseDTO {
    return {
      id: entity.id,
      email: entity.email.value,
      firstName: entity.firstName?.value,
      lastName: entity.lastName?.value,
      username: entity.username,
      status: entity.status.value,
      type: entity.type.value,
      roles: entity.roles.map((r) => r.value),
      emailVerified: entity.emailVerified,
      phoneVerified: entity.phoneVerified,
      isMfaEnabled: entity.isMfaEnabled,
      createdAt: entity.createdAt,
    } as never;
  }

  static toDTOList(entities: readonly UserEntity[]): readonly UserResponseDTO[] {
    return entities.map((e) => this.toDTO(e));
  }
}
