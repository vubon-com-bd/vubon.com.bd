import { jest } from '@jest/globals';
import { VendorSuspensionLogPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-suspension-log.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID,
    vendorId: UUID,
    suspensionId: UUID,
    event: 'issued',
    actorId: UUID,
    reason: 'policy violation',
    metadata: null,
    occurredAt: NOW,
    version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorSuspensionLogPrismaRepository', () => {
  let repo: VendorSuspensionLogPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorSuspensionLogPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorSuspensionLog.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findAll', async () => {
    prisma.mock.vendorSuspensionLog.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorSuspensionLog.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });

  it('findBySuspensionId', async () => {
    prisma.mock.vendorSuspensionLog.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findBySuspensionId(UUID)).length).toBe(1);
  });

  it('findByEvent', async () => {
    prisma.mock.vendorSuspensionLog.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByEvent('issued')).length).toBe(1);
  });

  it('findByActorId', async () => {
    prisma.mock.vendorSuspensionLog.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByActorId(UUID)).length).toBe(1);
  });

  it('findTimeline delegates to findBySuspensionId', async () => {
    prisma.mock.vendorSuspensionLog.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findTimeline(UUID)).length).toBe(1);
  });

  it('findLatestBySuspensionId', async () => {
    prisma.mock.vendorSuspensionLog.findFirst.mockResolvedValue(makeRow());
    expect(await repo.findLatestBySuspensionId(UUID)).not.toBeNull();
  });

  it('countByEvent', async () => {
    prisma.mock.vendorSuspensionLog.count.mockResolvedValue(3);
    expect(await repo.countByEvent('issued')).toBe(3);
  });

  it('countByVendor', async () => {
    prisma.mock.vendorSuspensionLog.count.mockResolvedValue(5);
    expect(await repo.countByVendor(UUID)).toBe(5);
  });

  it('save creates', async () => {
    prisma.mock.vendorSuspensionLog.findFirst.mockResolvedValue(null);
    prisma.mock.vendorSuspensionLog.create.mockResolvedValue(makeRow());
    const { VendorSuspensionLogEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-suspension-log.entity.js'
    );
    const entity = VendorSuspensionLogEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID, suspensionId: UUID,
        event: 'issued' as never, actorId: UUID,
      },
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('save updates', async () => {
    prisma.mock.vendorSuspensionLog.findFirst.mockResolvedValue(makeRow());
    prisma.mock.vendorSuspensionLog.update.mockResolvedValue(makeRow());
    const { VendorSuspensionLogEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-suspension-log.entity.js'
    );
    const entity = VendorSuspensionLogEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID, suspensionId: UUID,
        event: 'issued' as never, actorId: UUID,
        occurredAt: '2026-01-01T00:00:00.000Z',
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorSuspensionLog.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorSuspensionLog.delete.mockResolvedValue(makeRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorSuspensionLog.delete).toHaveBeenCalled();
  });

  it('exists true', async () => {
    prisma.mock.vendorSuspensionLog.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('deleteByVendorId', async () => {
    prisma.mock.vendorSuspensionLog.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorSuspensionLog.updateMany).toHaveBeenCalled();
  });
});
