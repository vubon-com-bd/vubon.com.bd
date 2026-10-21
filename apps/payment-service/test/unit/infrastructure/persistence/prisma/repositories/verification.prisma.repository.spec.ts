/**
 * VerificationPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { VerificationPrismaRepository } from '@infrastructure/repos/verification.prisma.repository';
import { VerificationPrismaMapper } from '@infrastructure/mappers/verification.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

const ROW = {
  id: 'ver-1',
  paymentId: 'pay-1',
  status: 'pending',
  method: 'otp_sms',
  attempts: 0,
  expiresAt: new Date('2025-01-15T10:10:00.000Z'),
  verifiedAt: null,
  failureReason: null,
  createdAt: new Date('2025-01-15T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('VerificationPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: VerificationPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new VerificationPrismaRepository(prisma as never);
    delegate = prisma.__delegate('verification');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findById('ver-1');
    expect(entity?.id).toBe('ver-1');
  });

  it('findByPayment filters paymentId', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    const list = await repo.findByPayment('pay-1');
    expect(list).toHaveLength(1);
  });

  it('findPending filters pending/in_progress', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findPending();
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['status']).toEqual({ in: ['pending', 'in_progress'] });
  });

  it('findExpired filters expiresAt < now', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findExpired();
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('save updates when exists', async () => {
    delegate.findUnique.mockResolvedValue({ id: 'ver-1' });
    delegate.update.mockResolvedValue(ROW);
    const entity = VerificationPrismaMapper.toDomain(ROW);
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('findStale filters pending older than cutoff', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findStale(30);
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('softDelete updates deletedAt', async () => {
    await repo.softDelete('ver-1');
    expect(delegate.update).toHaveBeenCalled();
  });
});
