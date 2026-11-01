/**
 * CanAddTeamMemberSpecification
 * @module vendor-service/domain/specifications
 *
 * Business rules — team member addition.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VENDOR_TEAM } from '@vubon/shared-constants/business';
import type { VendorEntity } from '../entities/vendor.entity.js';

export interface AddTeamMemberContext {
  readonly userId: string;
  readonly email: string;
  readonly currentMemberCount: number;
  readonly maxMembers: number;
  readonly alreadyMember: boolean;
  readonly invitesToday: number;
  readonly isOwnerOrManager: boolean;
}

export interface AddTeamMemberCandidate {
  readonly vendor: VendorEntity;
  readonly ctx: AddTeamMemberContext;
}

const MAX_INVITES_PER_DAY = VENDOR_TEAM.MAX_INVITES_PER_DAY;

export class CanAddTeamMemberSpecification extends Specification<AddTeamMemberCandidate> {
  isSatisfiedBy(c: AddTeamMemberCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: AddTeamMemberCandidate): string | null {
    const { vendor, ctx } = c;

    if (vendor.isDeleted()) return 'vendor is deleted';
    if (vendor.isBlocked()) return 'vendor is blocked';
    if (vendor.isSuspended()) return 'vendor is suspended';
    if (!vendor.isActive()) {
      return `vendor status "${vendor.status.value}" is not active`;
    }

    if (!ctx.userId || ctx.userId.trim().length === 0) {
      return 'userId is required';
    }

    if (!ctx.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ctx.email)) {
      return 'email must be valid';
    }

    if (ctx.alreadyMember) {
      return `user "${ctx.userId}" is already a team member`;
    }

    if (ctx.currentMemberCount >= ctx.maxMembers) {
      return `team member limit reached (${ctx.currentMemberCount}/${ctx.maxMembers})`;
    }

    if (ctx.invitesToday >= MAX_INVITES_PER_DAY) {
      return `daily invite limit reached (${MAX_INVITES_PER_DAY})`;
    }

    if (!ctx.isOwnerOrManager) {
      return 'only owners and managers can invite team members';
    }

    return null;
  }

  static strict(): CanAddTeamMemberSpecification {
    return new CanAddTeamMemberSpecification();
  }

  static relaxed(): CanAddTeamMemberSpecification {
    return new CanAddTeamMemberSpecification();
  }
}
