/**
 * RoleEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { RoleIdVO } from '../value-objects/primitives/role-id.vo.js';
import { RoleNameVO } from '../value-objects/primitives/role-name.vo.js';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo.js';

export interface RoleEntityProps {
  readonly name: RoleNameVO;
  readonly description?: string;
  readonly level: number;
  readonly isSystemRole: boolean;
  readonly permissions: readonly PermissionNameVO[];
}

export class RoleEntity extends AggregateRoot<string> {
  private _name: RoleNameVO;
  private _description?: string;
  private _permissions: PermissionNameVO[];

  private readonly _level: number;
  private readonly _isSystemRole: boolean;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: RoleEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._name = props.name;
    this._description = props.description;
    this._level = props.level;
    this._isSystemRole = props.isSystemRole;
    this._permissions = [...props.permissions];
  }

  get name(): RoleNameVO { return this._name; }
  get description(): string | undefined { return this._description; }
  get level(): number { return this._level; }
  get isSystemRole(): boolean { return this._isSystemRole; }
  get permissions(): readonly PermissionNameVO[] { return [...this._permissions]; }

  hasPermission(permission: string): boolean {
    return this._permissions.some((p) => p.value === permission || p.isWildcard());
  }

  grantPermission(permission: PermissionNameVO, now: string = new Date().toISOString()): void {
    if (this.hasPermission(permission.value)) return;
    this._permissions.push(permission);
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  revokePermission(permission: string, now: string = new Date().toISOString()): void {
    const before = this._permissions.length;
    this._permissions = this._permissions.filter((p) => p.value !== permission);
    if (this._permissions.length !== before) {
      (this as unknown as { updatedAt: string }).updatedAt = now;
      this.incrementVersion();
    }
  }

  rename(name: RoleNameVO, now: string = new Date().toISOString()): void {
    if (this._isSystemRole) {
      throw new BusinessRuleError(
        'Cannot rename system role',
        'SYSTEM_ROLE_CANNOT_BE_RENAMED',
        { roleId: this.id, name: this._name.value },
      );
    }
    this._name = name;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: RoleIdVO;
    props: Omit<RoleEntityProps, 'isSystemRole'> & { isSystemRole?: boolean };
    now: string;
  }): RoleEntity {
    return new RoleEntity(params.id.value, params.now, params.now, {
      ...params.props,
      isSystemRole: params.props.isSystemRole ?? false,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: RoleEntityProps;
    version?: number;
  }): RoleEntity {
    const entity = new RoleEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
