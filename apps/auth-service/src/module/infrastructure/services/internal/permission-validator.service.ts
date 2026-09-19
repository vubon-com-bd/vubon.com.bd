import { Injectable } from '@nestjs/common';
import { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo';
import { PermissionDeniedError } from '../../../domain/errors/permission.errors';

@Injectable()
export class PermissionValidatorService {
  assertHas(role: AuthRoleEntity, permission: PermissionNameVO): void {
    if (!role.hasPermission(permission)) {
      throw new PermissionDeniedError(permission.value, role.name.value);
    }
  }

  has(role: AuthRoleEntity, permission: PermissionNameVO): boolean {
    return role.hasPermission(permission);
  }

  hasAny(role: AuthRoleEntity, permissions: readonly PermissionNameVO[]): boolean {
    return permissions.some((p) => role.hasPermission(p));
  }

  hasAll(role: AuthRoleEntity, permissions: readonly PermissionNameVO[]): boolean {
    return permissions.every((p) => role.hasPermission(p));
  }
}
