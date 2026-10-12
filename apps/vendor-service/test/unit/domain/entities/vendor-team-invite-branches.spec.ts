import { VendorTeamInviteEntity } from '../../../../src/module/domain/entities/vendor-team-invite.entity.js';
import { MemberEmailVO } from '../../../../src/module/domain/value-objects/primitives/member-email.vo.js';
import { MemberRoleVO } from '../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { TeamInviteTokenVO } from '../../../../src/module/domain/value-objects/primitives/team-invite-token.vo.js';
import { InviteExpiryVO } from '../../../../src/module/domain/value-objects/primitives/invite-expiry.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const TOKEN = 'ABCDEFGHIJKLMNOP1234';
const NOW = '2026-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';

function makeInvite(expiresAt: string = '2026-01-08T00:00:00.000Z'): VendorTeamInviteEntity {
  return VendorTeamInviteEntity.create({
    id: UUID, vendorId: UUID,
    email: MemberEmailVO.create('invitee@acme.com'),
    role: MemberRoleVO.create('vendor_viewer'),
    token: TeamInviteTokenVO.create(TOKEN),
    invitedBy: UUID,
    expiresAt: InviteExpiryVO.reconstitute(expiresAt),
    now: NOW,
  });
}

describe('VendorTeamInviteEntity — branches', () => {
  describe('accept — all paths', () => {
    it('pending → accepted', () => {
      const i = makeInvite();
      i.accept(UUID, NOW);
      expect(i.isAccepted()).toBe(true);
    });

    it('throws when expired', () => {
      const i = makeInvite(PAST);
      expect(() => i.accept(UUID, NOW)).toThrow();
    });

    it('throws from accepted', () => {
      const i = makeInvite();
      i.accept(UUID, NOW);
      expect(() => i.accept(UUID, NOW)).toThrow();
    });
  });

  describe('reject — all paths', () => {
    it('pending → rejected', () => {
      const i = makeInvite();
      i.reject(NOW);
      expect(i.status.isRejected()).toBe(true);
    });

    it('throws from accepted', () => {
      const i = makeInvite();
      i.accept(UUID, NOW);
      expect(() => i.reject(NOW)).toThrow();
    });
  });

  describe('cancel — all paths', () => {
    it('pending → cancelled', () => {
      const i = makeInvite();
      i.cancel(NOW);
      expect(i.status.isCancelled()).toBe(true);
    });

    it('throws from accepted', () => {
      const i = makeInvite();
      i.accept(UUID, NOW);
      expect(() => i.cancel(NOW)).toThrow();
    });
  });

  describe('markExpired — all paths', () => {
    it('pending → expired', () => {
      const i = makeInvite();
      i.markExpired(NOW);
      expect(i.status.isExpired()).toBe(true);
    });

    it('no-op when already accepted', () => {
      const i = makeInvite();
      i.accept(UUID, NOW);
      i.markExpired(NOW);
      expect(i.isAccepted()).toBe(true);
    });
  });

  describe('isExpired', () => {
    it('false for fresh', () => {
      expect(makeInvite().isExpired(new Date(NOW))).toBe(false);
    });

    it('true past expiry', () => {
      expect(makeInvite().isExpired(new Date('2030-01-01T00:00:00Z'))).toBe(true);
    });
  });

  describe('getters', () => {
    it('invitedBy', () => {
      expect(makeInvite().invitedBy).toBe(UUID);
    });
    it('invitedAt', () => {
      expect(makeInvite().invitedAt).toBe(NOW);
    });
    it('email', () => {
      expect(makeInvite().email.value).toBe('invitee@acme.com');
    });
    it('token', () => {
      expect(makeInvite().token.value).toBe(TOKEN);
    });
    it('isPending default true', () => {
      expect(makeInvite().isPending()).toBe(true);
    });
  });

  describe('reconstitute with version', () => {
    it('restores version', () => {
      const i = VendorTeamInviteEntity.reconstitute({
        id: UUID, createdAt: NOW, updatedAt: NOW, version: 2,
        props: {
          vendorId: UUID,
          email: MemberEmailVO.create('invitee@acme.com'),
          role: MemberRoleVO.create('vendor_viewer'),
          status: (makeInvite().status),
          token: TeamInviteTokenVO.create(TOKEN),
          invitedBy: UUID,
          invitedAt: NOW,
          expiresAt: InviteExpiryVO.reconstitute('2026-01-08T00:00:00.000Z'),
        },
      });
      expect(i.version).toBeGreaterThanOrEqual(2);
    });
  });
});
