import { jest } from '@jest/globals';
import { VendorTeamMemberPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-team-member.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';
import { MemberRoleVO } from '../../../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { TeamMemberStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/team-member-status.vo.js';
import { MemberEmailVO } from '../../../../../../src/module/domain/value-objects/primitives/member-email.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID,
    vendorId: UUID,
    userId: UUID,
    email: 'member@acme.com',
    name: 'Md Member',
    role: 'vendor_viewer',
    status: 'active',
    permissions: [],
    joinedAt: NOW,
    lastActiveAt: null,
    invitedBy: null,
    version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorTeamMemberPrismaRepository', () => {
  let repo: VendorTeamMemberPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorTeamMemberPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorTeamMember.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findAll', async () => {
    prisma.mock.vendorTeamMember.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorTeamMember.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });

  it('findByVendorIdAndUserId', async () => {
    prisma.mock.vendorTeamMember.findFirst.mockResolvedValue(makeRow());
    expect(await repo.findByVendorIdAndUserId(UUID, UUID)).not.toBeNull();
  });

  it('findByUserId', async () => {
    prisma.mock.vendorTeamMember.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByUserId(UUID)).length).toBe(1);
  });

  it('findByVendorIdAndEmail', async () => {
    prisma.mock.vendorTeamMember.findFirst.mockResolvedValue(makeRow());
    expect(await repo.findByVendorIdAndEmail(UUID, MemberEmailVO.create('member@acme.com'))).not.toBeNull();
  });

  it('findByVendorIdAndRole', async () => {
    prisma.mock.vendorTeamMember.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByVendorIdAndRole(UUID, MemberRoleVO.create('vendor_viewer'))).length).toBe(1);
  });

  it('findByVendorIdAndStatus', async () => {
    prisma.mock.vendorTeamMember.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByVendorIdAndStatus(UUID, TeamMemberStatusVO.active())).length).toBe(1);
  });

  it('findOwner', async () => {
    prisma.mock.vendorTeamMember.findFirst.mockResolvedValue(makeRow({ role: 'vendor_owner' }));
    expect(await repo.findOwner(UUID)).not.toBeNull();
  });

  it('findActive', async () => {
    prisma.mock.vendorTeamMember.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findActive(UUID)).length).toBe(1);
  });

  it('countByVendor', async () => {
    prisma.mock.vendorTeamMember.count.mockResolvedValue(5);
    expect(await repo.countByVendor(UUID)).toBe(5);
  });

  it('countActiveByVendor', async () => {
    prisma.mock.vendorTeamMember.count.mockResolvedValue(3);
    expect(await repo.countActiveByVendor(UUID)).toBe(3);
  });

  it('countOwnersByVendor', async () => {
    prisma.mock.vendorTeamMember.count.mockResolvedValue(1);
    expect(await repo.countOwnersByVendor(UUID)).toBe(1);
  });

  it('getRoleCounts', async () => {
    prisma.mock.vendorTeamMember.groupBy.mockResolvedValue([
      { role: 'vendor_owner', _count: { _all: 1 } },
      { role: 'vendor_viewer', _count: { _all: 2 } },
    ]);
    const r = await repo.getRoleCounts(UUID);
    expect(r.length).toBe(2);
  });

  it('existsByVendorIdAndUserId', async () => {
    prisma.mock.vendorTeamMember.count.mockResolvedValue(1);
    expect(await repo.existsByVendorIdAndUserId(UUID, UUID)).toBe(true);
  });

  it('existsByVendorIdAndEmail', async () => {
    prisma.mock.vendorTeamMember.count.mockResolvedValue(1);
    expect(await repo.existsByVendorIdAndEmail(UUID, MemberEmailVO.create('a@b.com'))).toBe(true);
  });

  it('save creates', async () => {
    prisma.mock.vendorTeamMember.findFirst.mockResolvedValue(null);
    prisma.mock.vendorTeamMember.create.mockResolvedValue(makeRow());
    const { VendorTeamMemberEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-team-member.entity.js'
    );
    const { MemberNameVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/member-name.vo.js'
    );
    const entity = VendorTeamMemberEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID, userId: UUID,
        email: MemberEmailVO.create('member@acme.com'),
        name: MemberNameVO.create('Md Member'),
        role: MemberRoleVO.create('vendor_viewer'),
      },
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('save updates', async () => {
    prisma.mock.vendorTeamMember.findFirst.mockResolvedValue(makeRow());
    prisma.mock.vendorTeamMember.update.mockResolvedValue(makeRow());
    const { VendorTeamMemberEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-team-member.entity.js'
    );
    const { MemberNameVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/member-name.vo.js'
    );
    const entity = VendorTeamMemberEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID, userId: UUID,
        email: MemberEmailVO.create('member@acme.com'),
        name: MemberNameVO.create('Md Member'),
        role: MemberRoleVO.create('vendor_viewer'),
        status: TeamMemberStatusVO.active(),
        permissions: [],
        joinedAt: '2026-01-01T00:00:00.000Z',
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorTeamMember.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorTeamMember.delete.mockResolvedValue(makeRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorTeamMember.delete).toHaveBeenCalled();
  });

  it('exists true', async () => {
    prisma.mock.vendorTeamMember.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('deleteByVendorId', async () => {
    prisma.mock.vendorTeamMember.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorTeamMember.updateMany).toHaveBeenCalled();
  });
});
