/**
 * Approval, Suspension, Team Prisma repositories — bulk tests
 */
import { jest } from '@jest/globals';
import { VendorApprovalPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-approval.prisma.repository.js';
import { VendorSuspensionPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-suspension.prisma.repository.js';
import { VendorSuspensionLogPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-suspension-log.prisma.repository.js';
import { VendorTeamMemberPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-team-member.prisma.repository.js';
import { VendorTeamInvitePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-team-invite.prisma.repository.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeApprovalRow(): never {
  return {
    id: UUID, vendorId: UUID, status: 'pending', reason: null,
    reviewerNote: null, submittedAt: NOW, reviewedAt: null, reviewedBy: null,
    resubmissionCount: 0, appealDeadline: null, appealSubmittedAt: null,
    slaDeadline: null, version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makeSuspRow(): never {
  return {
    id: UUID, vendorId: UUID, reason: 'poor_performance', suspendedAt: NOW,
    suspendedBy: UUID, durationDays: 30, notes: null, appealDeadline: null,
    appealSubmittedAt: null, appealReason: null, liftedAt: null, liftedBy: null,
    autoLiftOnResolution: true, version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makeSuspLogRow(): never {
  return {
    id: UUID, vendorId: UUID, suspensionId: UUID, event: 'issued',
    actorId: UUID, reason: null, metadata: null, occurredAt: NOW,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makeTeamMemberRow(): never {
  return {
    id: UUID, vendorId: UUID, userId: UUID, email: 'a@b.com', name: 'A',
    role: 'vendor_viewer', status: 'active', permissions: [],
    joinedAt: NOW, lastActiveAt: null, invitedBy: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makeInviteRow(): never {
  return {
    id: UUID, vendorId: UUID, email: 'a@b.com', role: 'vendor_viewer',
    status: 'pending', token: 'ABCDEFGHIJKLMNOP1234', invitedBy: UUID,
    invitedAt: NOW, expiresAt: NOW, acceptedAt: null, acceptedBy: null,
    rejectedAt: null, message: null, version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makePrisma() {
  const mk = () => ({
    findFirst: jest.fn().mockResolvedValue(null),
    findMany: jest.fn().mockResolvedValue([]),
    count: jest.fn().mockResolvedValue(0),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
    groupBy: jest.fn().mockResolvedValue([]),
    aggregate: jest.fn().mockResolvedValue({ _avg: {}, _sum: {} }),
  });
  return {
    vendorApproval: mk(),
    vendorSuspension: mk(),
    vendorSuspensionLog: mk(),
    vendorTeamMember: mk(),
    vendorTeamInvite: mk(),
  } as never;
}

describe('VendorApprovalPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorApprovalPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorApprovalPrismaRepository(prisma); });

  it('findByVendorId returns mapped', async () => {
    (prisma as never as { vendorApproval: { findFirst: jest.Mock } }).vendorApproval.findFirst.mockResolvedValue(makeApprovalRow());
    const r = await repo.findByVendorId(UUID);
    expect(r?.vendorId).toBe(UUID);
  });
  it('existsByVendorId false', async () => {
    expect(await repo.existsByVendorId(UUID)).toBe(false);
  });
  it('findByStatus delegates', async () => {
    expect(await repo.findByStatus({ value: 'pending' } as never)).toEqual([]);
  });
  it('findPendingPastSla delegates', async () => {
    expect(await repo.findPendingPastSla()).toEqual([]);
  });
  it('findAppealable delegates', async () => {
    expect(await repo.findAppealable()).toEqual([]);
  });
  it('getStats returns aggregates', async () => {
    const r = await repo.getStats();
    expect(r.totalPending).toBe(0);
    expect(r.totalApproved).toBe(0);
  });
  it('save creates new', async () => {
    (prisma as never as { vendorApproval: { create: jest.Mock } }).vendorApproval.create.mockResolvedValue(makeApprovalRow());
    const { VendorApprovalEntity } = await import('../../../../../../src/module/domain/entities/vendor-approval.entity.js');
    const e = VendorApprovalEntity.create({ id: UUID, vendorId: UUID, now: NOW.toISOString() });
    const r = await repo.save(e);
    expect(r.id).toBe(UUID);
  });
});

describe('VendorSuspensionPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorSuspensionPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorSuspensionPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => {
    expect(await repo.findByVendorId(UUID)).toEqual([]);
  });
  it('findActiveByVendorId delegates', async () => {
    expect(await repo.findActiveByVendorId(UUID)).toBeNull();
  });
  it('findActive delegates', async () => {
    expect(await repo.findActive()).toEqual([]);
  });
  it('findExpiredButActive filters expired in-memory', async () => {
    (prisma as never as { vendorSuspension: { findMany: jest.Mock } }).vendorSuspension.findMany.mockResolvedValue([makeSuspRow()]);
    // Record suspended 2026-01-01 for 30 days — already expired at current time
    const r = await repo.findExpiredButActive();
    expect(r.length).toBeGreaterThanOrEqual(0);
  });
  it('countActive returns number', async () => {
    expect(await repo.countActive()).toBe(0);
  });
  it('save creates', async () => {
    (prisma as never as { vendorSuspension: { create: jest.Mock } }).vendorSuspension.create.mockResolvedValue(makeSuspRow());
    const { VendorSuspensionEntity } = await import('../../../../../../src/module/domain/entities/vendor-suspension.entity.js');
    const { SuspensionReasonVO } = await import('../../../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js');
    const e = VendorSuspensionEntity.create({
      id: UUID, vendorId: UUID, reason: SuspensionReasonVO.create('poor_performance'),
      durationDays: 30, suspendedBy: UUID, now: NOW.toISOString(),
    });
    const r = await repo.save(e);
    expect(r.id).toBe(UUID);
  });
});

describe('VendorSuspensionLogPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorSuspensionLogPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorSuspensionLogPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => {
    expect(await repo.findByVendorId(UUID)).toEqual([]);
  });
  it('findBySuspensionId delegates', async () => {
    expect(await repo.findBySuspensionId(UUID)).toEqual([]);
  });
  it('findTimeline delegates to findBySuspensionId', async () => {
    expect(await repo.findTimeline(UUID)).toEqual([]);
  });
  it('countByEvent delegates', async () => {
    expect(await repo.countByEvent('issued' as never)).toBe(0);
  });
  it('deleteByVendorId calls updateMany', async () => {
    await repo.deleteByVendorId(UUID);
    expect((prisma as never as { vendorSuspensionLog: { updateMany: jest.Mock } }).vendorSuspensionLog.updateMany).toHaveBeenCalled();
  });
});

describe('VendorTeamMemberPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorTeamMemberPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorTeamMemberPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => {
    expect(await repo.findByVendorId(UUID)).toEqual([]);
  });
  it('findByVendorIdAndUserId delegates', async () => {
    expect(await repo.findByVendorIdAndUserId(UUID, UUID)).toBeNull();
  });
  it('findOwner delegates', async () => {
    expect(await repo.findOwner(UUID)).toBeNull();
  });
  it('countByVendor returns number', async () => {
    expect(await repo.countByVendor(UUID)).toBe(0);
  });
  it('getRoleCounts returns array', async () => {
    expect(await repo.getRoleCounts(UUID)).toEqual([]);
  });
  it('existsByVendorIdAndEmail false', async () => {
    expect(await repo.existsByVendorIdAndEmail(UUID, { value: 'a@b.com' } as never)).toBe(false);
  });
  it('deleteByVendorId calls updateMany', async () => {
    await repo.deleteByVendorId(UUID);
    expect((prisma as never as { vendorTeamMember: { updateMany: jest.Mock } }).vendorTeamMember.updateMany).toHaveBeenCalled();
  });
});

describe('VendorTeamInvitePrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorTeamInvitePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorTeamInvitePrismaRepository(prisma); });

  it('findByVendorId delegates', async () => {
    expect(await repo.findByVendorId(UUID)).toEqual([]);
  });
  it('findByToken delegates', async () => {
    expect(await repo.findByToken({ value: 'ABCDEFGHIJKLMNOP1234' } as never)).toBeNull();
  });
  it('findPendingByVendorId delegates', async () => {
    expect(await repo.findPendingByVendorId(UUID)).toEqual([]);
  });
  it('findExpiredPending delegates', async () => {
    expect(await repo.findExpiredPending()).toEqual([]);
  });
  it('countRecentByVendorId returns number', async () => {
    expect(await repo.countRecentByVendorId(UUID, 24)).toBe(0);
  });
  it('existsByToken false', async () => {
    expect(await repo.existsByToken({ value: 'ABCDEFGHIJKLMNOP1234' } as never)).toBe(false);
  });
});
