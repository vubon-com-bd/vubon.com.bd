import { jest } from '@jest/globals';
import { VendorApprovalPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-approval.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';
import { ApprovalStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../../../../../../src/module/domain/value-objects/primitives/approval-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID,
    vendorId: UUID,
    status: 'pending',
    reason: null,
    reviewerNote: null,
    submittedAt: NOW,
    reviewedAt: null,
    reviewedBy: null,
    resubmissionCount: 0,
    appealDeadline: null,
    appealSubmittedAt: null,
    slaDeadline: new Date('2026-01-04T00:00:00Z'),
    version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorApprovalPrismaRepository', () => {
  let repo: VendorApprovalPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorApprovalPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorApproval.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorApproval.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorApproval.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorApproval.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findByVendorId(UUID))?.vendorId).toBe(UUID);
  });

  it('existsByVendorId true', async () => {
    prisma.mock.vendorApproval.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });

  it('existsByVendorId false', async () => {
    prisma.mock.vendorApproval.count.mockResolvedValue(0);
    expect(await repo.existsByVendorId(UUID)).toBe(false);
  });

  it('findByStatus', async () => {
    prisma.mock.vendorApproval.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByStatus(ApprovalStatusVO.pending())).length).toBe(1);
  });

  it('findPendingPastSla', async () => {
    prisma.mock.vendorApproval.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findPendingPastSla()).length).toBe(1);
  });

  it('findAppealable', async () => {
    prisma.mock.vendorApproval.findMany.mockResolvedValue([
      makeRow({
        status: 'rejected',
        reason: 'invalid_documents',
        reviewedAt: NOW,
        appealDeadline: new Date('2026-02-01T00:00:00Z'),
      }),
    ]);
    expect((await repo.findAppealable()).length).toBe(1);
  });

  it('countByStatus', async () => {
    prisma.mock.vendorApproval.count.mockResolvedValue(5);
    expect(await repo.countByStatus(ApprovalStatusVO.pending())).toBe(5);
  });

  it('getStats returns aggregated stats', async () => {
    prisma.mock.vendorApproval.count
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(20)
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(2);
    prisma.mock.vendorApproval.findMany.mockResolvedValue([
      { submittedAt: new Date('2026-01-01T00:00:00Z'), reviewedAt: new Date('2026-01-02T00:00:00Z') },
      { submittedAt: new Date('2026-01-01T00:00:00Z'), reviewedAt: new Date('2026-01-01T12:00:00Z') },
    ]);
    const r = await repo.getStats();
    expect(r.totalPending).toBe(10);
    expect(r.totalApproved).toBe(20);
    expect(r.totalRejected).toBe(5);
    expect(r.slaBreachCount).toBe(2);
    expect(r.avgReviewHours).toBeGreaterThan(0);
  });

  it('getStats handles empty reviews', async () => {
    prisma.mock.vendorApproval.count.mockResolvedValue(0);
    prisma.mock.vendorApproval.findMany.mockResolvedValue([]);
    const r = await repo.getStats();
    expect(r.avgReviewHours).toBe(0);
  });

  it('upsert creates when new', async () => {
    prisma.mock.vendorApproval.findFirst.mockResolvedValue(null);
    prisma.mock.vendorApproval.create.mockResolvedValue(makeRow());
    const { VendorApprovalEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-approval.entity.js'
    );
    const entity = VendorApprovalEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.upsert(entity)).id).toBe(UUID);
  });

  it('upsert updates when existing', async () => {
    prisma.mock.vendorApproval.findFirst.mockResolvedValue(makeRow());
    prisma.mock.vendorApproval.update.mockResolvedValue(makeRow());
    const { VendorApprovalEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-approval.entity.js'
    );
    const entity = VendorApprovalEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        status: ApprovalStatusVO.pending(),
        submittedAt: '2026-01-01T00:00:00.000Z',
        resubmissionCount: 0,
      },
    });
    await repo.upsert(entity);
    expect(prisma.mock.vendorApproval.update).toHaveBeenCalled();
  });

  it('save delegates', async () => {
    prisma.mock.vendorApproval.findFirst.mockResolvedValue(null);
    prisma.mock.vendorApproval.create.mockResolvedValue(makeRow());
    const { VendorApprovalEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-approval.entity.js'
    );
    const entity = VendorApprovalEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('delete', async () => {
    prisma.mock.vendorApproval.delete.mockResolvedValue(makeRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorApproval.delete).toHaveBeenCalled();
  });

  it('exists true', async () => {
    prisma.mock.vendorApproval.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
});
