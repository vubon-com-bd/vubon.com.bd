import { VendorTeamMemberEntity } from '../../../../src/module/domain/entities/vendor-team-member.entity.js';
import { MemberEmailVO } from '../../../../src/module/domain/value-objects/primitives/member-email.vo.js';
import { MemberNameVO } from '../../../../src/module/domain/value-objects/primitives/member-name.vo.js';
import { MemberRoleVO } from '../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { MemberPermissionVO } from '../../../../src/module/domain/value-objects/primitives/member-permission.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeMember(role: string = 'vendor_viewer', asInvited = false): VendorTeamMemberEntity {
  return VendorTeamMemberEntity.create({
    id: UUID, now: NOW,
    props: {
      vendorId: UUID, userId: UUID,
      email: MemberEmailVO.create('member@acme.com'),
      name: MemberNameVO.create('Md Member'),
      role: MemberRoleVO.create(role),
    },
    asInvited,
  });
}

describe('VendorTeamMemberEntity — branches', () => {
  describe('activate — all paths', () => {
    it('invited → active', () => {
      const m = makeMember('vendor_viewer', true);
      m.activate(NOW);
      expect(m.status.isActive()).toBe(true);
    });

    it('throws from active', () => {
      const m = makeMember();
      expect(() => m.activate(NOW)).toThrow();
    });
  });

  describe('suspend — all paths', () => {
    it('active → suspended', () => {
      const m = makeMember();
      m.suspend(NOW);
      expect(m.status.isSuspended()).toBe(true);
    });

    it('throws from invited', () => {
      const m = makeMember('vendor_viewer', true);
      expect(() => m.suspend(NOW)).toThrow();
    });
  });

  describe('remove — owner branch', () => {
    it('throws for owner', () => {
      const m = makeMember('vendor_owner');
      expect(() => m.remove(NOW)).toThrow();
    });

    it('throws from removed', () => {
      const m = makeMember();
      m.remove(NOW);
      expect(() => m.remove(NOW)).toThrow();
    });

    it('active → removed', () => {
      const m = makeMember();
      m.remove(NOW);
      expect(m.status.isRemoved()).toBe(true);
    });
  });

  describe('changeRole — owner throws', () => {
    it('throws for owner', () => {
      const m = makeMember('vendor_owner');
      expect(() => m.changeRole(MemberRoleVO.create('vendor_viewer'), NOW)).toThrow();
    });

    it('changes role for non-owner', () => {
      const m = makeMember('vendor_viewer');
      m.changeRole(MemberRoleVO.create('vendor_manager'), NOW);
      expect(m.role.value).toBe('vendor_manager');
    });
  });

  describe('grantPermission — duplicate branch', () => {
    it('adds new', () => {
      const m = makeMember();
      const p = MemberPermissionVO.create('vendor:product:create');
      m.grantPermission(p, NOW);
      expect(m.permissions).toHaveLength(1);
    });

    it('ignores duplicate', () => {
      const m = makeMember();
      const p = MemberPermissionVO.create('vendor:product:create');
      m.grantPermission(p, NOW);
      m.grantPermission(p, NOW);
      expect(m.permissions).toHaveLength(1);
    });

    it('throws on invalid VO', () => {
      const m = makeMember();
      expect(() => m.grantPermission('bad' as never, NOW)).toThrow();
    });
  });

  describe('revokePermission', () => {
    it('removes existing', () => {
      const m = makeMember();
      const p = MemberPermissionVO.create('vendor:product:create');
      m.grantPermission(p, NOW);
      m.revokePermission(p, NOW);
      expect(m.permissions).toHaveLength(0);
    });

    it('throws on invalid VO', () => {
      const m = makeMember();
      expect(() => m.revokePermission('bad' as never, NOW)).toThrow();
    });
  });

  describe('markActive / getters', () => {
    it('updates lastActiveAt', () => {
      const m = makeMember();
      m.markActive(NOW);
      expect(m.lastActiveAt).toBe(NOW);
    });

    it('invitedBy undefined default', () => {
      expect(makeMember().invitedBy).toBeUndefined();
    });

    it('lastActiveAt undefined default', () => {
      expect(makeMember().lastActiveAt).toBeUndefined();
    });
  });
});
