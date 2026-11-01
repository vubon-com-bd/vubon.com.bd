/**
 * AuthPermissionControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { PermissionEntity } from '../../domain/entities/permission.entity.js';
import type { PermissionHttpResponseDTO } from '../dtos/responses/permission/permission.response.dto.js';

export class AuthPermissionControllerMapper {
  static toHttpResponse(entity: PermissionEntity): PermissionHttpResponseDTO {
    return {
      id: entity.id,
      name: entity.name.value,
      action: entity.name.action,
      resource: entity.name.resource,
      description: entity.description,
      isSensitive: entity.isSensitive,
    };
  }

  static toHttpList(entities: readonly PermissionEntity[]): readonly PermissionHttpResponseDTO[] {
    return entities.map((e) => this.toHttpResponse(e));
  }
}
