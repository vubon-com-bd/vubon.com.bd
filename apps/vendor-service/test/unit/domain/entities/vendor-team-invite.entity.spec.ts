/**
 * VendorTeamInviteEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorTeamInviteEntity } from '../../../../src/module/domain/entities/vendor-team-invite.entity.js';
import { MemberEmailVO } from '../../../../src/module/domain/value-objects/primitives/member-email.vo.js';
import { MemberRoleVO } from '../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { TeamInviteTokenVO } from '../../../../src/module/domain/value-objects/primitives/team-invite-token.vo.js';
import { TeamInviteStatusVO } from '../../../../src/module/domain/value-objects/primitives/team-invite-status.vo.js';
import { InviteExpiryVO } from '../../../../src/module/domain/value-objects/primitives/invite-expiry.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const INVITER = '33333333-3333-4333-8333-333333333333';
const ACCEPTOR = '44444444-4444-4444-8444-444444444444';
const NOW = '2025-01-01T00:00:00.000Z';

function makeInvite(overrides: { message?: string } = {}) {
  return VendorTeamInviteEntity.create({
    id: UUID,
    vendorId: VENDOR,
    email: MemberEmailVO.create('invite@example.com'),
    role: MemberRoleVO.create('vendor_staff'),
    token: TeamInviteTokenVO.create('abcdefgh12345678'),
    invitedBy: INVITER,
    expiresAt: InviteExpiryVO.defaultExpiry(),
    message: overrides.message,
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorTeamInviteEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      email: MemberEmailVO.create('invite@example.com'),
      role: MemberRoleVO.create('vendor_staff'),
      status: TeamInviteStatusVO.pending(),
      token: TeamInviteTokenVO.create('abcdefgh12345678'),
      invitedBy: INVITER,
      invitedAt: NOW,
      expiresAt: InviteExpiryVO.fromNow(7),
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorTeamInviteEntity — creation', () => {
  it('creates pending invite', () => {
    const i = makeInvite();
    expect(i.vendorId).toBe(VENDOR);
    expect(i.email.value).toBe('invite@example.com');
    expect(i.role.value).toBe('vendor_staff');
    expect(i.status.isPending()).toBe(true);
    expect(i.token.value).toBe('abcdefgh12345678');
    expect(i.invitedAt).toBe(NOW);
  });

  it('creates with message', () => {
    const i = makeInvite({ message: 'Welcome to our team!' });
    expect(i.message).toBe('Welcome to our team!');
  });
});

describe('VendorTeamInviteEntity — invariants', () => {
  it('rejects invalid invitedAt', () => {
    expect(() => reconstitute({ invitedAt: 'not-a-date' })).toThrow();
  });

  it('rejects message > 500 chars', () => {
    expect(() => reconstitute({ message: 'x'.repeat(501) })).toThrow();
  });
});

describe('VendorTeamInviteEntity — getters', () => {
  it('returns scalar getters', () => {
    const i = makeInvite();
    expect(i.vendorId).toBe(VENDOR);
    expect(i.email.value).toBe('invite@example.com');
    expect(i.role.value).toBe('vendor_staff');
    expect(i.status.isPending()).toBe(true);
    expect(i.token.value).toBe('abcdefgh12345678');
    expect(i.invitedBy).toBe(INVITER);
    expect(i.invitedAt).toBe(NOW);
    expect(i.expiresAt).toBeDefined();
    expect(i.message).toBeUndefined();
    expect(i.acceptedAt).toBeUndefined();
    expect(i.acceptedBy).toBeUndefined();
    expect(i.rejectedAt).toBeUndefined();
  });
});

describe('VendorTeamInviteEntity — predicates', () => {
  it('isPending true initially', () => {
    expect(makeInvite().isPending()).toBe(true);
  });

  it('isAccepted false initially', () => {
    expect(makeInvite().isAccepted()).toBe(false);
  });

  it('isExpired false within window', () => {
    expect(makeInvite().isExpired(new Date(NOW))).toBe(false);
  });

  it('isExpired true after expiry', () => {
    const i = reconstitute({
      expiresAt: InviteExpiryVO.fromNow(1, new Date('2020-01-01T00:00:00Z')),
    });
    expect(i.isExpired(new Date('2025-06-01T00:00:00Z'))).toBe(true);
  });

  it('isExpired true when status marked expired', () => {
    const i = reconstitute({ status: TeamInviteStatusVO.expired() });
    expect(i.isExpired(new Date(NOW))).toBe(true);
  });
});

describe('VendorTeamInviteEntity — accept', () => {
  it('accepts pending invite', () => {
    const i = makeInvite();
    i.accept(ACCEPTOR, NOW);
    expect(i.status.isAccepted()).toBe(true);
    expect(i.acceptedAt).toBe(NOW);
    expect(i.acceptedBy).toBe(ACCEPTOR);
  });

  it('throws when already accepted', () => {
    const i = reconstitute({ status: TeamInviteStatusVO.accepted() });
    expect(() => i.accept(ACCEPTOR, NOW)).toThrow();
  });

  it('auto-expires and throws when expired', () => {
    const i = reconstitute({
      expiresAt: InviteExpiryVO.fromNow(1, new Date('2020-01-01T00:00:00Z')),
    });
    expect(() => i.accept(ACCEPTOR, '2025-06-01T00:00:00.000Z')).toThrow();
    expect(i.status.isExpired()).toBe(true);
  });
});

describe('VendorTeamInviteEntity — reject', () => {
  it('rejects pending invite', () => {
    const i = makeInvite();
    i.reject(NOW);
    expect(i.status.isRejected()).toBe(true);
    expect(i.rejectedAt).toBe(NOW);
  });

  it('throws when not pending', () => {
    const i = reconstitute({ status: TeamInviteStatusVO.accepted() });
    expect(() => i.reject(NOW)).toThrow();
  });
});

describe('VendorTeamInviteEntity — cancel', () => {
  it('cancels pending invite', () => {
    const i = makeInvite();
    i.cancel(NOW);
    expect(i.status.isCancelled()).toBe(true);
  });

  it('throws when not pending', () => {
    const i = reconstitute({ status: TeamInviteStatusVO.rejected() });
    expect(() => i.cancel(NOW)).toThrow();
  });
});

describe('VendorTeamInviteEntity — markExpired', () => {
  it('marks expired when pending', () => {
    const i = makeInvite();
    i.markExpired(NOW);
    expect(i.status.isExpired()).toBe(true);
  });

  it('no-op when already accepted (idempotent early return)', () => {
    const i = reconstitute({ status: TeamInviteStatusVO.accepted() });
    const version = i.version;
    i.markExpired(NOW);
    expect(i.status.isAccepted()).toBe(true);
    expect(i.version).toBe(version);
  });
});

describe('VendorTeamInviteEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const i = reconstitute({ version: 3 });
    expect(i.version).toBe(3);
  });
});
