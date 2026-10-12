import { jest } from '@jest/globals';
import { VendorVerificationPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-verification.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';
import { VerificationStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID,
    vendorId: UUID,
    overallStatus: 'pending',
    checks: [],
    submittedAt: NOW,
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
    expiresAt: null,
    version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorVerificationPrismaRepository', () => {
  let repo: VendorVerificationPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorVerificationPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorVerification.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorVerification.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorVerification.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorVerification.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findByVendorId(UUID))?.vendorId).toBe(UUID);
  });

  it('existsByVendorId true', async () => {
    prisma.mock.vendorVerification.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });

  it('findByStatus', async () => {
    prisma.mock.vendorVerification.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByStatus(VerificationStatusVO.pending())).length).toBe(1);
  });

  it('findPendingReview', async () => {
    prisma.mock.vendorVerification.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findPendingReview()).length).toBe(1);
  });

  it('findReviewPastSla', async () => {
    prisma.mock.vendorVerification.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findReviewPastSla(72)).length).toBe(1);
  });

  it('findExpired', async () => {
    prisma.mock.vendorVerification.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findExpired()).length).toBe(1);
  });

  it('findExpiring', async () => {
    prisma.mock.vendorVerification.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findExpiring(30)).length).toBe(1);
  });

  it('countByStatus', async () => {
    prisma.mock.vendorVerification.count.mockResolvedValue(2);
    expect(await repo.countByStatus(VerificationStatusVO.pending())).toBe(2);
  });

  it('upsert creates when new', async () => {
    prisma.mock.vendorVerification.findFirst.mockResolvedValue(null);
    prisma.mock.vendorVerification.create.mockResolvedValue(makeRow());
    const { VendorVerificationEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-verification.entity.js'
    );
    const entity = VendorVerificationEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.upsert(entity)).id).toBe(UUID);
  });

  it('upsert updates when existing', async () => {
    prisma.mock.vendorVerification.findFirst.mockResolvedValue(makeRow());
    prisma.mock.vendorVerification.update.mockResolvedValue(makeRow());
    const { VendorVerificationEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-verification.entity.js'
    );
    const entity = VendorVerificationEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        overallStatus: VerificationStatusVO.pending(),
        checks: [{ type: VerificationTypeVO.create('email'), status: VerificationStatusVO.pending() }],
      },
    });
    await repo.upsert(entity);
    expect(prisma.mock.vendorVerification.update).toHaveBeenCalled();
  });

  it('save delegates', async () => {
    prisma.mock.vendorVerification.findFirst.mockResolvedValue(null);
    prisma.mock.vendorVerification.create.mockResolvedValue(makeRow());
    const { VendorVerificationEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-verification.entity.js'
    );
    const entity = VendorVerificationEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('delete', async () => {
    prisma.mock.vendorVerification.delete.mockResolvedValue(makeRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorVerification.delete).toHaveBeenCalled();
  });

  it('exists true', async () => {
    prisma.mock.vendorVerification.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
});
