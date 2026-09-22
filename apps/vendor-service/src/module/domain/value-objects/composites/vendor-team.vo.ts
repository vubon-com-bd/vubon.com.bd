import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TeamMemberIdVO } from '../primitives/team-member-id.vo';
import { TeamRoleVO } from '../primitives/team-role.vo';
import { TeamPermissionVO } from '../primitives/team-permission.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface VendorTeamMemberProps {
  readonly id: TeamMemberIdVO;
  readonly vendorId: VendorIdVO;
  readonly userId: UserIdVO;
  readonly role: TeamRoleVO;
  readonly permissions: ReadonlyArray<TeamPermissionVO>;
  readonly invitedAt: Date;
  readonly joinedAt: Date | null;
}

export interface VendorTeamProps {
  readonly vendorId: VendorIdVO;
  readonly members: ReadonlyArray<VendorTeamMemberProps>;
  readonly maxMembers: number;
}

export class VendorTeamVO extends BaseVO<VendorTeamProps> {
  private constructor(props: VendorTeamProps) {
    super(Object.freeze({
      ...props,
      members: Object.freeze([...props.members]),
    }));
  }

  static create(props: VendorTeamProps): VendorTeamVO {
    return new VendorTeamVO(props);
  }

  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get members(): ReadonlyArray<VendorTeamMemberProps> { return this.value.members; }
  get maxMembers(): number { return this.value.maxMembers; }

  get memberCount(): number {
    return this.value.members.length;
  }

  hasCapacity(): boolean {
    return this.value.members.length < this.value.maxMembers;
  }
}
