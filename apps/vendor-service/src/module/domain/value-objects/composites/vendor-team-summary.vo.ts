/**
 * VendorTeamSummaryVO — team size + role distribution
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MemberRoleVO } from '../primitives/member-role.vo.js';
import { VENDOR_TEAM, VENDOR_SUBSCRIPTION_PLAN } from '@vubon/shared-constants/business';

export interface TeamMemberCount {
  readonly role: MemberRoleVO;
  readonly count: number;
}

export interface VendorTeamSummaryVOProps {
  readonly totalMembers: number;
  readonly activeMembers: number;
  readonly pendingInvites: number;
  readonly roleCounts: readonly TeamMemberCount[];
  readonly ownerCount: number;
}

export class VendorTeamSummaryVO extends BaseVO<VendorTeamSummaryVOProps> {
  private constructor(props: VendorTeamSummaryVOProps) {
    super(props);
  }

  static create(props: VendorTeamSummaryVOProps): VendorTeamSummaryVO {
    if (!Number.isInteger(props.totalMembers) || props.totalMembers < 0) {
      throw new ValidationError('Total members must be a non-negative integer', 'totalMembers');
    }
    if (props.activeMembers > props.totalMembers) {
      throw new ValidationError('Active members cannot exceed total members', 'activeMembers');
    }
    if (props.ownerCount < 1) {
      throw new ValidationError('Team must have at least one owner', 'ownerCount');
    }
    if (props.ownerCount > 1) {
      throw new ValidationError('Team can have only one owner', 'ownerCount');
    }
    return new VendorTeamSummaryVO(props);
  }

  static reconstitute(props: VendorTeamSummaryVOProps): VendorTeamSummaryVO {
    return new VendorTeamSummaryVO(props);
  }

  get totalMembers(): number { return this.value.totalMembers; }
  get activeMembers(): number { return this.value.activeMembers; }
  get pendingInvites(): number { return this.value.pendingInvites; }

  getActiveRatio(): number {
    if (this.value.totalMembers === 0) return 0;
    return Math.round((this.value.activeMembers / this.value.totalMembers) * 100) / 100;
  }

  isAtDefaultLimit(): boolean {
    return this.value.totalMembers >= VENDOR_TEAM.MAX_MEMBERS;
  }

  canAddMember(plan: string = VENDOR_SUBSCRIPTION_PLAN.FREE): boolean {
    let limit: number = VENDOR_TEAM.MAX_MEMBERS;
    if (plan === VENDOR_SUBSCRIPTION_PLAN.PREMIUM) limit = VENDOR_TEAM.MAX_MEMBERS_PREMIUM;
    else if (plan === VENDOR_SUBSCRIPTION_PLAN.ENTERPRISE) limit = VENDOR_TEAM.MAX_MEMBERS_ENTERPRISE;
    return this.value.totalMembers < limit;
  }

  getCountForRole(role: MemberRoleVO): number {
    return this.value.roleCounts.find((rc) => rc.role.value === role.value)?.count ?? 0;
  }

  hasRole(role: MemberRoleVO): boolean {
    return this.getCountForRole(role) > 0;
  }

  hasManagerialStaff(): boolean {
    return this.value.roleCounts.some((rc) => rc.role.canManageTeam() && rc.count > 0);
  }

  isSmallTeam(): boolean {
    return this.value.totalMembers <= 5;
  }
}
