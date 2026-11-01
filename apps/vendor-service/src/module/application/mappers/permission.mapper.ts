/**
 * PermissionMapper
 * @module vendor-service/application/mappers
 */
import type { VendorPermissionEntity } from '../../domain/entities/vendor-permission.entity.js';
import type { PermissionDTO } from '../services/interfaces/vendor-permission.service.interface.js';

export class PermissionMapper {
  static toResponse(entity: VendorPermissionEntity): PermissionDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      memberId: entity.memberId.value,
      role: entity.role.value,
      permissions: entity.permissions,
      overrides: entity.overrides,
      denials: entity.denials,
      effectivePermissions: entity.effectivePermissions,
      effectiveCount: entity.effectiveCount,
    };
  }
}
