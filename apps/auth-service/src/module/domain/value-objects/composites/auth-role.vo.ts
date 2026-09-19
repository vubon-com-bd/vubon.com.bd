import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RoleNameVO } from '../primitives/role-name.vo';
import { RoleDescriptionVO } from '../primitives/role-description.vo';
import { PermissionNameVO } from '../primitives/permission-name.vo';

export interface AuthRoleProps {
  readonly name: RoleNameVO;
  readonly description: RoleDescriptionVO;
  readonly permissions: ReadonlyArray<PermissionNameVO>;
  readonly isSystem: boolean;
}

export class AuthRoleVO extends BaseVO<AuthRoleProps> {
  private constructor(props: AuthRoleProps) {
    super(Object.freeze({
      ...props,
      permissions: Object.freeze([...props.permissions]),
    }));
  }

  static create(props: AuthRoleProps): AuthRoleVO {
    return new AuthRoleVO(props);
  }

  get name(): RoleNameVO { return this.value.name; }
  get description(): RoleDescriptionVO { return this.value.description; }
  get permissions(): ReadonlyArray<PermissionNameVO> { return this.value.permissions; }
  get isSystem(): boolean { return this.value.isSystem; }

  hasPermission(name: PermissionNameVO): boolean {
    return this.value.permissions.some((p) => p.value === name.value);
  }
}
