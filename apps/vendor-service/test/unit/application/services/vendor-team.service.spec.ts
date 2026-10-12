import { jest } from '@jest/globals';
import { VendorTeamService } from '../../../../src/module/application/services/impl/vendor-team.service.js';
import type { VendorTeamMemberRepository } from '../../../../src/module/domain/repositories/vendor-team-member.repository.interface.js';
import type { VendorTeamInviteRepository } from '../../../../src/module/domain/repositories/vendor-team-invite.repository.interface.js';
import { VendorTeamMemberEntity } from '../../../../src/module/domain/entities/vendor-team-member.entity.js';
import { VendorTeamInviteEntity } from '../../../../src/module/domain/entities/vendor-team-invite.entity.js';
import { MemberEmailVO } from '../../../../src/module/domain/value-objects/primitives/member-email.vo.js';
import { MemberNameVO } from '../../../../src/module/domain/value-objects/primitives/member-name.vo.js';
import { MemberRoleVO } from '../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { TeamInviteTokenVO } from '../../../../src/module/domain/value-objects/primitives/team-invite-token.vo.js';
import { InviteExpiryVO } from '../../../../src/module/domain/value-objects/primitives/invite-expiry.vo.js';
import { TeamMemberNotFoundError, TeamMemberAlreadyExistsError } from '../../../../src/module/application/errors/team.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();
const TOKEN = 'ABCDEFGHIJKLMNOP1234567890ABCD';

function makeMember(): VendorTeamMemberEntity {
  return VendorTeamMemberEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      userId: UUID,
      email: MemberEmailVO.create('member@acme.com'),
      name: MemberNameVO.create('Md Member'),
      role: MemberRoleVO.create('vendor_viewer'),
    },
  });
}

function makeInvite(): VendorTeamInviteEntity {
  return VendorTeamInviteEntity.create({
    id: UUID,
    vendorId: UUID,
    email: MemberEmailVO.create('invitee@acme.com'),
    role: MemberRoleVO.create('vendor_viewer'),
    token: TeamInviteTokenVO.create(TOKEN),
    invitedBy: UUID,
    expiresAt: InviteExpiryVO.fromNow(7, new Date(NOW)),
    now: NOW,
  });
}

function makeMemberRepo(): jest.Mocked<VendorTeamMemberRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findByVendorIdAndUserId: jest.fn(),
    findByUserId: jest.fn(),
    findByVendorIdAndEmail: jest.fn(),
    findByVendorIdAndRole: jest.fn(),
    findByVendorIdAndStatus: jest.fn(),
    findOwner: jest.fn(),
    findActive: jest.fn(),
    countByVendor: jest.fn(),
    countActiveByVendor: jest.fn(),
    countOwnersByVendor: jest.fn(),
    getRoleCounts: jest.fn(),
    existsByVendorIdAndUserId: jest.fn(),
    existsByVendorIdAndEmail: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorTeamMemberRepository>;
}

function makeInviteRepo(): jest.Mocked<VendorTeamInviteRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findByToken: jest.fn(),
    findByVendorIdAndEmail: jest.fn(),
    findByEmail: jest.fn(),
    findByStatus: jest.fn(),
    findPendingByVendorId: jest.fn(),
    findExpiredPending: jest.fn(),
    existsByToken: jest.fn(),
    countPendingByVendorId: jest.fn(),
    countRecentByVendorId: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorTeamInviteRepository>;
}

describe('VendorTeamService', () => {
  let service: VendorTeamService;
  let memberRepo: jest.Mocked<VendorTeamMemberRepository>;
  let inviteRepo: jest.Mocked<VendorTeamInviteRepository>;

  beforeEach(() => {
    memberRepo = makeMemberRepo();
    inviteRepo = makeInviteRepo();
    service = new VendorTeamService(memberRepo, inviteRepo);
  });

  describe('invite()', () => {
    it('creates invite when email unique', async () => {
      memberRepo.existsByVendorIdAndEmail.mockResolvedValue(false);
      const invite = makeInvite();
      inviteRepo.save.mockResolvedValue(invite);
      const r = await service.invite({
        vendorId: UUID,
        email: 'new@acme.com',
        role: 'vendor_viewer',
        invitedBy: UUID,
      });
      expect(r.inviteId).toBe(UUID);
      expect(r.email).toBe('invitee@acme.com');
    });

    it('throws when member already exists', async () => {
      memberRepo.existsByVendorIdAndEmail.mockResolvedValue(true);
      await expect(
        service.invite({
          vendorId: UUID,
          email: 'member@acme.com',
          role: 'vendor_viewer',
          invitedBy: UUID,
        }),
      ).rejects.toThrow(TeamMemberAlreadyExistsError);
    });
  });

  describe('acceptInvite()', () => {
    it('accepts invite and creates member', async () => {
      const invite = makeInvite();
      inviteRepo.findByToken.mockResolvedValue(invite);
      inviteRepo.save.mockResolvedValue(invite);
      const member = makeMember();
      memberRepo.save.mockResolvedValue(member);
      const r = await service.acceptInvite({ token: TOKEN, userId: UUID, name: 'Md Member' });
      expect(r.userId).toBe(UUID);
    });

    it('throws when token invalid', async () => {
      inviteRepo.findByToken.mockResolvedValue(null);
      await expect(
        service.acceptInvite({ token: TOKEN, userId: UUID, name: 'X Y' }),
      ).rejects.toThrow();
    });
  });

  describe('removeMember()', () => {
    it('removes non-owner member', async () => {
      const member = makeMember();
      memberRepo.findById.mockResolvedValue(member);
      memberRepo.save.mockResolvedValue(member);
      await service.removeMember(UUID, UUID);
      expect(memberRepo.save).toHaveBeenCalled();
    });

    it('throws when not found', async () => {
      memberRepo.findById.mockResolvedValue(null);
      await expect(service.removeMember(UUID, UUID)).rejects.toThrow(TeamMemberNotFoundError);
    });
  });

  describe('changeRole()', () => {
    it('changes member role', async () => {
      const member = makeMember();
      memberRepo.findById.mockResolvedValue(member);
      memberRepo.save.mockResolvedValue(member);
      const r = await service.changeRole(UUID, UUID, 'vendor_manager');
      expect(r.id).toBe(UUID);
    });
  });

  describe('suspendMember()', () => {
    it('suspends active member', async () => {
      const member = makeMember();
      memberRepo.findById.mockResolvedValue(member);
      memberRepo.save.mockResolvedValue(member);
      const r = await service.suspendMember(UUID, UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      memberRepo.findByVendorId.mockResolvedValue([makeMember()]);
      const r = await service.listByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });

  describe('getMember()', () => {
    it('returns member', async () => {
      memberRepo.findById.mockResolvedValue(makeMember());
      const r = await service.getMember(UUID, UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      memberRepo.findById.mockResolvedValue(null);
      await expect(service.getMember(UUID, UUID)).rejects.toThrow(TeamMemberNotFoundError);
    });
  });
});
