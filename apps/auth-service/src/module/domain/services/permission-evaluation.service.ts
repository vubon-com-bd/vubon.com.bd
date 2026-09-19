import { AuthPermissionEntity } from '../entities/auth-permission.entity';
import { AuthRoleEntity } from '../entities/auth-role.entity';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';

export class PermissionEvaluationService {
  evaluate(role: AuthRoleEntity, required: PermissionNameVO): boolean {
    return role.permissions.some((p) => p.value === required.value);
  }

  evaluateAll(
    role: AuthRoleEntity,
    required: readonly PermissionNameVO[],
  ): boolean {
    return required.every((perm) => this.evaluate(role, perm));
  }

  evaluateAny(
    role: AuthRoleEntity,
    required: readonly PermissionNameVO[],
  ): boolean {
    return required.some((perm) => this.evaluate(role, perm));
  }

  filterGranted(
    role: AuthRoleEntity,
    permissions: readonly AuthPermissionEntity[],
  ): readonly AuthPermissionEntity[] {
    return permissions.filter((p) => this.evaluate(role, p.name));
  }
}
