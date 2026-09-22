import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PermissionIdVO } from '../value-objects/primitives/permission-id.vo';
import { TeamPermissionVO } from '../value-objects/primitives/team-permission.vo';
import { TeamRoleVO } from '../value-objects/primitives/team-role.vo';

export interface VendorPermissionEntityProps {
  readonly role: TeamRoleVO;
  readonly permissions: ReadonlyArray<TeamPermissionVO>;
  readonly description: string | null;
}

export class VendorPermissionEntity extends BaseEntity<PermissionIdVO> {
  private readonly _role: TeamRoleVO;
  private readonly _permissions: ReadonlyArray<TeamPermissionVO>;
  private readonly _description: string | null;

  private constructor(
    id: PermissionIdVO,
    props: VendorPermissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._role = props.role;
    this._permissions = Object.freeze([...props.permissions]);
    this._description = props.description;
  }

  static create(props: VendorPermissionEntityProps): VendorPermissionEntity {
    const now = new Date().toISOString();
    const id = PermissionIdVO.create(crypto.randomUUID());
    return new VendorPermissionEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PermissionIdVO,
    props: VendorPermissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorPermissionEntity {
    return new VendorPermissionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get role(): TeamRoleVO { return this._role; }
  get permissions(): ReadonlyArray<TeamPermissionVO> { return this._permissions; }
  get description(): string | null { return this._description; }

  has(permission: string): boolean {
    return this._permissions.some((p) => p.value === permission);
  }

  private _toProps(): VendorPermissionEntityProps {
    return {
      role: this._role,
      permissions: this._permissions,
      description: this._description,
    };
  }
}
