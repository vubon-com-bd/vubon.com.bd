import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PermissionIdVO } from '../primitives/permission-id.vo';
import { TeamPermissionVO } from '../primitives/team-permission.vo';
import { TeamRoleVO } from '../primitives/team-role.vo';

export interface VendorPermissionProps {
  readonly id: PermissionIdVO;
  readonly role: TeamRoleVO;
  readonly permissions: ReadonlyArray<TeamPermissionVO>;
  readonly description: string | null;
}

export class VendorPermissionVO extends BaseVO<VendorPermissionProps> {
  private constructor(props: VendorPermissionProps) {
    super(Object.freeze({
      ...props,
      permissions: Object.freeze([...props.permissions]),
    }));
  }

  static create(props: VendorPermissionProps): VendorPermissionVO {
    return new VendorPermissionVO(props);
  }

  get id(): PermissionIdVO { return this.value.id; }
  get role(): TeamRoleVO { return this.value.role; }
  get permissions(): ReadonlyArray<TeamPermissionVO> { return this.value.permissions; }
  get description(): string | null { return this.value.description; }

  has(permission: string): boolean {
    return this.value.permissions.some((p) => p.value === permission);
  }
}
