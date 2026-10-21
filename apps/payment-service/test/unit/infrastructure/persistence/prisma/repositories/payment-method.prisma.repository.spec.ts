/**
 * PaymentMethodPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PaymentMethodPrismaRepository } from '@infrastructure/repos/payment-method.prisma.repository';
import { PaymentMethodPrismaMapper } from '@infrastructure/mappers/payment-method.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

const ROW = {
  id: 'method-1',
  method: 'card',
  methodType: 'online',
  provider: 'stripe',
  providerEnv: 'sandbox',
  label: 'Visa ...4242',
  isActive: true,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('PaymentMethodPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: PaymentMethodPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new PaymentMethodPrismaRepository(prisma as never);
    delegate = prisma.__delegate('paymentMethod');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findById('method-1');
    expect(entity?.id).toBe('method-1');
  });

  it('findById returns null when missing', async () => {
    delegate.findFirst.mockResolvedValue(null);
    expect(await repo.findById('missing')).toBeNull();
  });

  it('findActive filters isActive=true', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    const list = await repo.findActive();
    expect(list).toHaveLength(1);
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['isActive']).toBe(true);
  });

  it('findByType filters methodType', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByType('online');
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['methodType']).toBe('online');
  });

  it('findByProvider filters provider', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByProvider('stripe');
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['provider']).toBe('stripe');
  });

  it('save creates when not exists', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(ROW);
    const entity = PaymentMethodPrismaMapper.toDomain(ROW);
    const saved = await repo.save(entity);
    expect(saved.id).toBe('method-1');
    expect(delegate.create).toHaveBeenCalled();
  });

  it('save updates when exists', async () => {
    delegate.findUnique.mockResolvedValue({ id: 'method-1' });
    delegate.update.mockResolvedValue(ROW);
    const entity = PaymentMethodPrismaMapper.toDomain(ROW);
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('exists returns true when count > 0', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists('method-1')).toBe(true);
  });

  it('softDelete updates deletedAt', async () => {
    await repo.softDelete('method-1');
    expect(delegate.update).toHaveBeenCalled();
  });

  it('findPaginated filters by isActive', async () => {
    delegate.findMany.mockResolvedValue([]);
    delegate.count.mockResolvedValue(0);
    await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { isActive: true, provider: 'stripe' },
    });
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['isActive']).toBe(true);
    expect(args.where['provider']).toBe('stripe');
  });
});
