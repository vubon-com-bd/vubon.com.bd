/**
 * VendorTeamMemberEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorTeamMemberEntity } from '../../../../src/module/domain/entities/vendor-team-member.entity.js';
import { MemberEmailVO } from '../../../../src/module/domain/value-objects/primitives/member-email.vo.js';
import { MemberNameVO } from '../../../../src/module/domain/value-objects/primitives/member-name.vo.js';
import { MemberRoleVO } from '../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { TeamMemberStatusVO } from '../../../../src/module/domain/value-objects/primitives/team-member-status.vo.js';
import { MemberPermissionVO } from '../../../../src/module/domain/value-objects/primitives/member-permission.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const USER = '33333333-3333-4333-8333-333333333333';
const INVITER = '44444444-4444-4444-8444-444444444444';
const NOW = '2025-01-01T00:00:00.000Z';

function makeMember(overrides: {
  role?: string;
  asInvited?: boolean;
} = {}) {
  return VendorTeamMemberEntity.create({
    id: UUID,
    now: NOW,
    asInvited: overrides.asInvited ?? false,
    props: {
      vendorId: VENDOR,
      userId: USER,
      email: MemberEmailVO.create('member@example.com'),
      name: MemberNameVO.create('Team Member'),
      role: MemberRoleVO.create(overrides.role ?? 'vendor_staff'),
      invitedBy: INVITER,
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorTeamMemberEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      userId: USER,
      email: MemberEmailVO.create('member@example.com'),
      name: MemberNameVO.create('Team Member'),
      role: MemberRoleVO.create('vendor_staff'),
      status: TeamMemberStatusVO.active(),
      permissions: [],
      joinedAt: NOW,
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorTeamMemberEntity — creation', () => {
  it('creates active member', () => {
    const m = makeMember();
    expect(m.vendorId).toBe(VENDOR);
    expect(m.userId).toBe(USER);
    expect(m.isActive()).toBe(true);
    expect(m.role.value).toBe('vendor_staff');
  });

  it('creates invited member', () => {
    const m = makeMember({ asInvited: true });
    expect(m.status.isInvited()).toBe(true);
  });

  it('creates owner', () => {
    const m = makeMember({ role: 'vendor_owner' });
    expect(m.isOwner()).toBe(true);
  });
});

describe('VendorTeamMemberEntity — invariants', () => {
  it('rejects invalid joinedAt', () => {
    expect(() => reconstitute({ joinedAt: 'not-a-date' })).toThrow();
  });

  it('rejects > 100 permissions', () => {
    expect(() =>
      reconstitute({
        permissions: new Array(101).fill(MemberPermissionVO.create('vendor:profile:view')),
      }),
    ).toThrow();
  });
});

describe('VendorTeamMemberEntity — getters', () => {
  it('returns scalar getters', () => {
    const m = makeMember();
    expect(m.vendorId).toBe(VENDOR);
    expect(m.userId).toBe(USER);
    expect(m.email.value).toBe('member@example.com');
    expect(m.name.value).toBe('Team Member');
    expect(m.role.value).toBe('vendor_staff');
    expect(m.joinedAt).toBe(NOW);
    expect(m.lastActiveAt).toBeUndefined();
    expect(m.invitedBy).toBe(INVITER);
  });
});

describe('VendorTeamMemberEntity — predicates', () => {
  it('isOwner true for owner', () => {
    expect(makeMember({ role: 'vendor_owner' }).isOwner()).toBe(true);
  });

  it('isActive true for active', () => {
    expect(makeMember().isActive()).toBe(true);
  });

  it('canLogin true for active', () => {
    expect(makeMember().canLogin()).toBe(true);
  });

  it('canLogin false for invited', () => {
    expect(makeMember({ asInvited: true }).canLogin()).toBe(false);
  });
});

describe('VendorTeamMemberEntity — permissions', () => {
  it('hasPermission false when empty', () => {
    const m = makeMember();
    expect(m.hasPermission(MemberPermissionVO.create('vendor:profile:view'))).toBe(false);
  });

  it('hasPermission true when present', () => {
    const m = reconstitute({
      permissions: [MemberPermissionVO.create('vendor:profile:view')],
    });
    expect(m.hasPermission(MemberPermissionVO.create('vendor:profile:view'))).toBe(true);
  });

  it('grantPermission adds', () => {
    const m = makeMember();
    m.grantPermission(MemberPermissionVO.create('vendor:product:create'), NOW);
    expect(m.hasPermission(MemberPermissionVO.create('vendor:product:create'))).toBe(true);
  });

  it('grantPermission ignores non-VO', () => {
    const m = makeMember();
    expect(() => m.grantPermission('not-vo' as never, NOW)).toThrow();
  });

  it('grantPermission idempotent', () => {
    const m = reconstitute({
      permissions: [MemberPermissionVO.create('vendor:profile:view')],
    });
    const version = m.version;
    m.grantPermission(MemberPermissionVO.create('vendor:profile:view'), NOW);
    expect(m.version).toBe(version);
  });

  it('revokePermission removes', () => {
    const m = reconstitute({
      permissions: [MemberPermissionVO.create('vendor:profile:view')],
    });
    m.revokePermission(MemberPermissionVO.create('vendor:profile:view'), NOW);
    expect(m.hasPermission(MemberPermissionVO.create('vendor:profile:view'))).toBe(false);
  });

  it('revokePermission ignores non-VO', () => {
    const m = makeMember();
    expect(() => m.revokePermission('not-vo' as never, NOW)).toThrow();
  });
});

describe('VendorTeamMemberEntity — canManage', () => {
  it('manager can manage staff', () => {
    const manager = makeMember({ role: 'vendor_manager' });
    const staff = makeMember({ role: 'vendor_staff' });
    expect(manager.canManage(staff)).toBe(true);
  });

  it('staff cannot manage manager', () => {
    const staff = makeMember({ role: 'vendor_staff' });
    const manager = makeMember({ role: 'vendor_manager' });
    expect(staff.canManage(manager)).toBe(false);
  });
});

describe('VendorTeamMemberEntity — activate', () => {
  it('activates from invited', () => {
    const m = makeMember({ asInvited: true });
    m.activate(NOW);
    expect(m.isActive()).toBe(true);
  });

  it('activates from inactive', () => {
    const m = reconstitute({ status: TeamMemberStatusVO.inactive() });
    m.activate(NOW);
    expect(m.isActive()).toBe(true);
  });

  it('throws from active (invalid transition)', () => {
    const m = makeMember();
    expect(() => m.activate(NOW)).toThrow();
  });
});

describe('VendorTeamMemberEntity — suspend', () => {
  it('suspends from active', () => {
    const m = makeMember();
    m.suspend(NOW);
    expect(m.status.isSuspended()).toBe(true);
  });

  it('throws from removed (final status)', () => {
    const m = reconstitute({ status: TeamMemberStatusVO.removed() });
    expect(() => m.suspend(NOW)).toThrow();
  });
});

describe('VendorTeamMemberEntity — remove', () => {
  it('removes active member', () => {
    const m = makeMember();
    m.remove(NOW);
    expect(m.status.isRemoved()).toBe(true);
  });

  it('throws when trying to remove owner', () => {
    const m = makeMember({ role: 'vendor_owner' });
    expect(() => m.remove(NOW)).toThrow();
  });

  it('throws from already removed status', () => {
    const m = reconstitute({ status: TeamMemberStatusVO.removed() });
    expect(() => m.remove(NOW)).toThrow();
  });
});

describe('VendorTeamMemberEntity — changeRole', () => {
  it('changes role for non-owner', () => {
    const m = makeMember({ role: 'vendor_staff' });
    m.changeRole(MemberRoleVO.create('vendor_manager'), NOW);
    expect(m.role.value).toBe('vendor_manager');
  });

  it('throws when role is not VO', () => {
    const m = makeMember();
    expect(() => m.changeRole('not-vo' as never, NOW)).toThrow();
  });

  it('throws when changing owner role', () => {
    const m = makeMember({ role: 'vendor_owner' });
    expect(() => m.changeRole(MemberRoleVO.create('vendor_manager'), NOW)).toThrow();
  });
});

describe('VendorTeamMemberEntity — markActive', () => {
  it('updates lastActiveAt', () => {
    const m = makeMember();
    m.markActive(NOW);
    expect(m.lastActiveAt).toBe(NOW);
  });
});

describe('VendorTeamMemberEntity — reconstitute coverage', () => {
  it('reconstitute without version param works', () => {
    const m = reconstitute();
    expect(m.vendorId).toBe(VENDOR);
  });

  it('reconstitute with deletedAt', () => {
    const m = reconstitute({ deletedAt: NOW });
    expect(m.deletedAt).toBe(NOW);
  });
});
