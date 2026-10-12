import { jest } from '@jest/globals';
import { VendorSuspensionPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-suspension.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';
import { SuspensionReasonVO } from '../../../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const PAST = new Date('2020-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID,
    vendorId: UUID,
    reason: 'poor_performance',
    suspendedAt: NOW,
    suspendedBy: UUID,
    durationDays: 30,
    notes: null,
    appealDeadline: new Date('2026-01-15T00:00:00Z'),
    appealSubmittedAt: null,
    appealReason: null,
    liftedAt: null,
    liftedBy: null,
    autoLiftOnResolution: true,
    version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorSuspensionPrismaRepository', () => {
  let repo: VendorSuspensionPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorSuspensionPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorSuspension.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorSuspension.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorSuspension.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorSuspension.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });

  it('findActiveByVendorId', async () => {
    prisma.mock.vendorSuspension.findFirst.mockResolvedValue(makeRow());
    expect(await repo.findActiveByVendorId(UUID)).not.toBeNull();
  });

  it('findLatestByVendorId', async () => {
    prisma.mock.vendorSuspension.findFirst.mockResolvedValue(makeRow());
    expect(await repo.findLatestByVendorId(UUID)).not.toBeNull();
  });

  it('findActive', async () => {
    prisma.mock.vendorSuspension.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findActive()).length).toBe(1);
  });

  it('findExpiredButActive — filters expired in memory', async () => {
    // Row with past suspension date (30 days → expired)
    prisma.mock.vendorSuspension.findMany.mockResolvedValue([
      makeRow({ suspendedAt: PAST, durationDays: 30 }),
    ]);
    const r = await repo.findExpiredButActive();
    expect(r.length).toBe(1);
  });

  it('findExpiredButActive — excludes non-expired', async () => {
    // Use far-future suspension end: suspended today + 365 days → not expired
    prisma.mock.vendorSuspension.findMany.mockResolvedValue([
      makeRow({ suspendedAt: NOW, durationDays: 365 }),
    ]);
    const r = await repo.findExpiredButActive();
    expect(r.length).toBe(0);
  });

  it('findWithPendingAppeal', async () => {
    prisma.mock.vendorSuspension.findMany.mockResolvedValue([
      makeRow({ appealSubmittedAt: NOW }),
    ]);
    expect((await repo.findWithPendingAppeal()).length).toBe(1);
  });

  it('findAutoLiftCandidates filters expired', async () => {
    prisma.mock.vendorSuspension.findMany.mockResolvedValue([
      makeRow({ suspendedAt: PAST, durationDays: 30, autoLiftOnResolution: true }),
    ]);
    const r = await repo.findAutoLiftCandidates();
    expect(r.length).toBe(1);
  });

  it('countActive', async () => {
    prisma.mock.vendorSuspension.count.mockResolvedValue(3);
    expect(await repo.countActive()).toBe(3);
  });

  it('countByVendor', async () => {
    prisma.mock.vendorSuspension.count.mockResolvedValue(5);
    expect(await repo.countByVendor(UUID)).toBe(5);
  });

  it('save creates', async () => {
    prisma.mock.vendorSuspension.findFirst.mockResolvedValue(null);
    prisma.mock.vendorSuspension.create.mockResolvedValue(makeRow());
    const { VendorSuspensionEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-suspension.entity.js'
    );
    const entity = VendorSuspensionEntity.create({
      id: UUID, vendorId: UUID,
      reason: SuspensionReasonVO.create('poor_performance'),
      durationDays: 30, suspendedBy: UUID,
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('save updates', async () => {
    prisma.mock.vendorSuspension.findFirst.mockResolvedValue(makeRow());
    prisma.mock.vendorSuspension.update.mockResolvedValue(makeRow());
    const { VendorSuspensionEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-suspension.entity.js'
    );
    const entity = VendorSuspensionEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        reason: SuspensionReasonVO.create('poor_performance'),
        suspendedAt: '2026-01-01T00:00:00.000Z',
        suspendedBy: UUID,
        durationDays: 30,
        autoLiftOnResolution: true,
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorSuspension.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorSuspension.delete.mockResolvedValue(makeRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorSuspension.delete).toHaveBeenCalled();
  });

  it('exists true', async () => {
    prisma.mock.vendorSuspension.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
});
