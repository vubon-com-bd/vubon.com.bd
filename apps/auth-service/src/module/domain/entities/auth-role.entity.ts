/**
 * AuthRoleEntity — Role aggregate with permissions
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { RoleNameVO } from '../value-objects/primitives/role-name.vo';
import { RoleDescriptionVO } from '../value-objects/primitives/role-description.vo';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';
import { RoleAlreadyAssignedError } from '../errors/permission.errors';

export interface AuthRoleEntityProps {
  readonly id: string;
  readonly name: RoleNameVO;
  readonly description: RoleDescriptionVO;
  readonly permissions: readonly PermissionNameVO[];
  readonly isSystem: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthRoleEntity extends BaseEntity<string> {
  private _name: RoleNameVO;
  private _description: RoleDescriptionVO;
  private _permissions: PermissionNameVO[];
  private _isSystem: boolean;

  private constructor(props: AuthRoleEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this._name = props.name;
    this._description = props.description;
    this._permissions = [...props.permissions];
    this._isSystem = props.isSystem;
  }

  static create(props: AuthRoleEntityProps): AuthRoleEntity {
    const names = props.permissions.map((p) => p.value);
    if (new Set(names).size !== names.length) {
      throw new Error('Duplicate permissions in role');
    }
    return new AuthRoleEntity(props);
  }

  get name(): RoleNameVO { return this._name; }
  get description(): RoleDescriptionVO { return this._description; }
  get permissions(): readonly PermissionNameVO[] { return [...this._permissions]; }
  get isSystem(): boolean { return this._isSystem; }

  isSuperAdmin(): boolean { return this._name.isSuperAdmin(); }

  hasPermission(required: PermissionNameVO): boolean {
    return this._permissions.some((p) => p.matches(required));
  }

  addPermission(permission: PermissionNameVO): void {
    if (this._permissions.some((p) => p.equals(permission))) {
      throw new RoleAlreadyAssignedError(this.id, permission.value);
    }
    this._permissions = [...this._permissions, permission];
  }

  removePermission(permission: PermissionNameVO): void {
    if (this._isSystem) {
      throw new Error('Cannot modify permissions of a system role');
    }
    this._permissions = this._permissions.filter((p) => !p.equals(permission));
  }

  rename(next: RoleNameVO): void {
    if (this._isSystem) {
      throw new Error('Cannot rename a system role');
    }
    this._name = next;
  }
}
