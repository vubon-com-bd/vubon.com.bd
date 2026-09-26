/**
 * AuthRoleVO — Composite role with permissions
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RoleNameVO } from '../primitives/role-name.vo';
import { RoleDescriptionVO } from '../primitives/role-description.vo';
import { PermissionNameVO } from '../primitives/permission-name.vo';

export interface AuthRoleVOProps {
  readonly name: RoleNameVO;
  readonly description: RoleDescriptionVO;
  readonly permissions: readonly PermissionNameVO[];
  readonly isSystem: boolean;
}

export class AuthRoleVO extends BaseVO<AuthRoleVOProps> {
  private constructor(props: AuthRoleVOProps) {
    super(props);
  }

  static of(props: AuthRoleVOProps): AuthRoleVO {
    const names = props.permissions.map((p) => p.value);
    if (new Set(names).size !== names.length) {
      throw new Error('Duplicate permissions in role');
    }
    return new AuthRoleVO(props);
  }

  get name(): RoleNameVO { return this.value.name; }
  get description(): RoleDescriptionVO { return this.value.description; }
  get permissions(): readonly PermissionNameVO[] { return this.value.permissions; }
  get isSystem(): boolean { return this.value.isSystem; }

  isSuperAdmin(): boolean { return this.value.name.isSuperAdmin(); }

  hasPermission(required: PermissionNameVO): boolean {
    return this.value.permissions.some((p) => p.matches(required));
  }

  permissionCount(): number { return this.value.permissions.length; }
}
