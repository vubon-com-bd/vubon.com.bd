/**
 * AuthRoleControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { RoleEntity } from '../../domain/entities/role.entity.js';
import type { RoleHttpResponseDTO } from '../dtos/responses/role/role.response.dto.js';

export class AuthRoleControllerMapper {
  static toHttpResponse(entity: RoleEntity): RoleHttpResponseDTO {
    return {
      id: entity.id,
      name: entity.name.value,
      description: entity.description ?? '',
      level: entity.level,
      isSystem: entity.isSystemRole,
      permissions: entity.permissions.map((p) => p.value),
      createdAt: entity.createdAt,
    };
  }

  static toHttpList(entities: readonly RoleEntity[]): readonly RoleHttpResponseDTO[] {
    return entities.map((e) => this.toHttpResponse(e));
  }
}
