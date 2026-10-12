import { VendorTeamSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-team-summary.vo.js';
import { MemberRoleVO } from '../../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeSummary(overrides: {
  totalMembers?: number;
  activeMembers?: number;
  pendingInvites?: number;
  ownerCount?: number;
  roleCounts?: Array<{ role: MemberRoleVO; count: number }>;
} = {}): VendorTeamSummaryVO {
  return VendorTeamSummaryVO.create({
    totalMembers: overrides.totalMembers ?? 3,
    activeMembers: overrides.activeMembers ?? 2,
    pendingInvites: overrides.pendingInvites ?? 1,
    roleCounts: overrides.roleCounts ?? [
      { role: MemberRoleVO.create('vendor_owner'), count: 1 },
      { role: MemberRoleVO.create('vendor_manager'), count: 1 },
      { role: MemberRoleVO.create('vendor_viewer'), count: 1 },
    ],
    ownerCount: overrides.ownerCount ?? 1,
  });
}

describe('VendorTeamSummaryVO', () => {
  describe('create()', () => {
    it('creates valid summary', () => {
      const v = makeSummary();
      expect(v.totalMembers).toBe(3);
      expect(v.activeMembers).toBe(2);
    });

    it('throws on negative totalMembers', () => {
      expect(() => makeSummary({ totalMembers: -1 })).toThrow(ValidationError);
    });

    it('throws when activeMembers > totalMembers', () => {
      expect(() => makeSummary({ totalMembers: 2, activeMembers: 5 })).toThrow(ValidationError);
    });

    it('throws when ownerCount is 0', () => {
      expect(() => makeSummary({ ownerCount: 0 })).toThrow(ValidationError);
    });

    it('throws when ownerCount > 1', () => {
      expect(() => makeSummary({ ownerCount: 2 })).toThrow(ValidationError);
    });
  });

  describe('getActiveRatio', () => {
    it('returns active/total ratio', () => {
      expect(makeSummary({ totalMembers: 4, activeMembers: 3 }).getActiveRatio()).toBe(0.75);
    });

    it('0 when no members', () => {
      expect(makeSummary({ totalMembers: 0, activeMembers: 0 }).getActiveRatio()).toBe(0);
    });
  });

  describe('isAtDefaultLimit / canAddMember', () => {
    it('isAtDefaultLimit false for small team', () => {
      expect(makeSummary().isAtDefaultLimit()).toBe(false);
    });

    it('canAddMember true for free plan', () => {
      expect(makeSummary().canAddMember('free')).toBe(true);
    });

    it('canAddMember false at limit', () => {
      expect(makeSummary({ totalMembers: 999, activeMembers: 999 }).canAddMember('free')).toBe(false);
    });

    it('canAddMember true for premium', () => {
      expect(makeSummary({ totalMembers: 100, activeMembers: 100 }).canAddMember('premium')).toBe(true);
    });
  });

  describe('getCountForRole / hasRole', () => {
    it('getCountForRole returns count', () => {
      const v = makeSummary();
      expect(v.getCountForRole(MemberRoleVO.create('vendor_owner'))).toBe(1);
    });

    it('getCountForRole 0 for missing', () => {
      expect(makeSummary().getCountForRole(MemberRoleVO.create('vendor_accountant'))).toBe(0);
    });

    it('hasRole true for existing', () => {
      expect(makeSummary().hasRole(MemberRoleVO.create('vendor_owner'))).toBe(true);
    });

    it('hasRole false for missing', () => {
      expect(makeSummary().hasRole(MemberRoleVO.create('vendor_accountant'))).toBe(false);
    });
  });

  describe('hasManagerialStaff / isSmallTeam', () => {
    it('hasManagerialStaff true with manager', () => {
      expect(makeSummary().hasManagerialStaff()).toBe(true);
    });

    it('hasManagerialStaff false without', () => {
      const v = makeSummary({
        roleCounts: [{ role: MemberRoleVO.create('vendor_viewer'), count: 1 }],
      });
      expect(v.hasManagerialStaff()).toBe(false);
    });

    it('isSmallTeam true for <= 5', () => {
      expect(makeSummary({ totalMembers: 3 }).isSmallTeam()).toBe(true);
    });

    it('isSmallTeam false for large', () => {
      expect(makeSummary({ totalMembers: 10 }).isSmallTeam()).toBe(false);
    });
  });
});
