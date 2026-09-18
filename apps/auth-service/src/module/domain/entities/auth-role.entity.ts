import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { RoleNameVO } from '../value-objects/primitives/role-name.vo';
import { RoleDescriptionVO } from '../value-objects/primitives/role-description.vo';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';

export interface AuthRoleEntityProps {
  readonly name: RoleNameVO;
  readonly description: RoleDescriptionVO;
  readonly permissions: ReadonlyArray<PermissionNameVO>;
  readonly isSystem: boolean;
}

export class AuthRoleEntity extends AggregateRoot<string> {
  private readonly _name: RoleNameVO;
  private readonly _description: RoleDescriptionVO;
  private readonly _permissions: ReadonlyArray<PermissionNameVO>;
  private readonly _isSystem: boolean;

  private constructor(
    id: string,
    props: AuthRoleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._description = props.description;
    this._permissions = Object.freeze([...props.permissions]);
    this._isSystem = props.isSystem;
  }

  static create(props: AuthRoleEntityProps): AuthRoleEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AuthRoleEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AuthRoleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthRoleEntity {
    return new AuthRoleEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  addPermission(permission: PermissionNameVO): AuthRoleEntity {
    if (this._permissions.some((p) => p.value === permission.value)) {
      return this;
    }
    return new AuthRoleEntity(
      this.id,
      {
        ...this._toProps(),
        permissions: [...this._permissions, permission],
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  removePermission(permission: PermissionNameVO): AuthRoleEntity {
    return new AuthRoleEntity(
      this.id,
      {
        ...this._toProps(),
        permissions: this._permissions.filter((p) => p.value !== permission.value),
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get name(): RoleNameVO { return this._name; }
  get description(): RoleDescriptionVO { return this._description; }
  get permissions(): ReadonlyArray<PermissionNameVO> { return this._permissions; }
  get isSystem(): boolean { return this._isSystem; }

  hasPermission(name: PermissionNameVO): boolean {
    return this._permissions.some((p) => p.value === name.value);
  }

  private _toProps(): AuthRoleEntityProps {
    return {
      name: this._name,
      description: this._description,
      permissions: this._permissions,
      isSystem: this._isSystem,
    };
  }
}
