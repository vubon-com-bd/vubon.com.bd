import { jest } from '@jest/globals';
import { VendorTeamInvitePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-team-invite.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';
import { MemberEmailVO } from '../../../../../../src/module/domain/value-objects/primitives/member-email.vo.js';
import { MemberRoleVO } from '../../../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { TeamInviteTokenVO } from '../../../../../../src/module/domain/value-objects/primitives/team-invite-token.vo.js';
import { InviteExpiryVO } from '../../../../../../src/module/domain/value-objects/primitives/invite-expiry.vo.js';
import { TeamInviteStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/team-invite-status.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const TOKEN = 'ABCDEFGHIJKLMNOP1234';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID,
    vendorId: UUID,
    email: 'invitee@acme.com',
    role: 'vendor_viewer',
    status: 'pending',
    token: TOKEN,
    invitedBy: UUID,
    invitedAt: NOW,
    expiresAt: new Date('2026-01-08T00:00:00Z'),
    message: null,
    acceptedAt: null,
    acceptedBy: null,
    rejectedAt: null,
    version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorTeamInvitePrismaRepository', () => {
  let repo: VendorTeamInvitePrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorTeamInvitePrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorTeamInvite.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findAll', async () => {
    prisma.mock.vendorTeamInvite.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorTeamInvite.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });

  it('findByToken', async () => {
    prisma.mock.vendorTeamInvite.findFirst.mockResolvedValue(makeRow());
    expect(await repo.findByToken(TeamInviteTokenVO.create(TOKEN))).not.toBeNull();
  });

  it('findByVendorIdAndEmail', async () => {
    prisma.mock.vendorTeamInvite.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByVendorIdAndEmail(UUID, MemberEmailVO.create('invitee@acme.com'))).length).toBe(1);
  });

  it('findByEmail', async () => {
    prisma.mock.vendorTeamInvite.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByEmail(MemberEmailVO.create('invitee@acme.com'))).length).toBe(1);
  });

  it('findByStatus', async () => {
    prisma.mock.vendorTeamInvite.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByStatus(TeamInviteStatusVO.pending())).length).toBe(1);
  });

  it('findPendingByVendorId', async () => {
    prisma.mock.vendorTeamInvite.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findPendingByVendorId(UUID)).length).toBe(1);
  });

  it('findExpiredPending', async () => {
    prisma.mock.vendorTeamInvite.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findExpiredPending()).length).toBe(1);
  });

  it('existsByToken', async () => {
    prisma.mock.vendorTeamInvite.count.mockResolvedValue(1);
    expect(await repo.existsByToken(TeamInviteTokenVO.create(TOKEN))).toBe(true);
  });

  it('countPendingByVendorId', async () => {
    prisma.mock.vendorTeamInvite.count.mockResolvedValue(2);
    expect(await repo.countPendingByVendorId(UUID)).toBe(2);
  });

  it('countRecentByVendorId', async () => {
    prisma.mock.vendorTeamInvite.count.mockResolvedValue(5);
    expect(await repo.countRecentByVendorId(UUID, 24)).toBe(5);
  });

  it('save creates', async () => {
    prisma.mock.vendorTeamInvite.findFirst.mockResolvedValue(null);
    prisma.mock.vendorTeamInvite.create.mockResolvedValue(makeRow());
    const { VendorTeamInviteEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-team-invite.entity.js'
    );
    const entity = VendorTeamInviteEntity.create({
      id: UUID, vendorId: UUID,
      email: MemberEmailVO.create('invitee@acme.com'),
      role: MemberRoleVO.create('vendor_viewer'),
      token: TeamInviteTokenVO.create(TOKEN),
      invitedBy: UUID,
      expiresAt: InviteExpiryVO.fromNow(7, new Date('2026-01-01T00:00:00Z')),
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('save updates', async () => {
    prisma.mock.vendorTeamInvite.findFirst.mockResolvedValue(makeRow());
    prisma.mock.vendorTeamInvite.update.mockResolvedValue(makeRow());
    const { VendorTeamInviteEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-team-invite.entity.js'
    );
    const entity = VendorTeamInviteEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        email: MemberEmailVO.create('invitee@acme.com'),
        role: MemberRoleVO.create('vendor_viewer'),
        status: TeamInviteStatusVO.pending(),
        token: TeamInviteTokenVO.create(TOKEN),
        invitedBy: UUID,
        invitedAt: '2026-01-01T00:00:00.000Z',
        expiresAt: InviteExpiryVO.reconstitute('2026-01-08T00:00:00.000Z'),
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorTeamInvite.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorTeamInvite.delete.mockResolvedValue(makeRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorTeamInvite.delete).toHaveBeenCalled();
  });

  it('exists true', async () => {
    prisma.mock.vendorTeamInvite.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('deleteByVendorId', async () => {
    prisma.mock.vendorTeamInvite.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorTeamInvite.updateMany).toHaveBeenCalled();
  });
});
