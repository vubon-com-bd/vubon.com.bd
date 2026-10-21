/**
 * PaymentGatewayPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PaymentGatewayPrismaRepository } from '@infrastructure/repos/payment-gateway.prisma.repository';
import { PaymentGatewayPrismaMapper } from '@infrastructure/mappers/payment-gateway.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

const ROW = {
  id: 'gw-1',
  provider: 'stripe',
  providerEnv: 'sandbox',
  displayName: 'Stripe',
  isActive: true,
  isMaintenance: false,
  supportedCurrencies: ['BDT', 'USD'],
  minAmount: 1,
  maxAmount: 100000,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('PaymentGatewayPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: PaymentGatewayPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new PaymentGatewayPrismaRepository(prisma as never);
    delegate = prisma.__delegate('paymentGateway');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findById('gw-1');
    expect(entity?.provider.provider).toBe('stripe');
  });

  it('findByProvider returns entity', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findByProvider('stripe');
    expect(entity?.id).toBe('gw-1');
  });

  it('findAvailable filters isActive + not in maintenance', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    const list = await repo.findAvailable();
    expect(list).toHaveLength(1);
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['isActive']).toBe(true);
    expect(args.where['isMaintenance']).toBe(false);
  });

  it('findByCurrency uppercases currency', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByCurrency('bdt');
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['supportedCurrencies']).toEqual({ has: 'BDT' });
  });

  it('save creates when new', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(ROW);
    const entity = PaymentGatewayPrismaMapper.toDomain(ROW);
    const saved = await repo.save(entity);
    expect(saved.id).toBe('gw-1');
  });

  it('exists returns true when count > 0', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists('gw-1')).toBe(true);
  });

  it('softDelete updates deletedAt', async () => {
    await repo.softDelete('gw-1');
    expect(delegate.update).toHaveBeenCalled();
  });

  it('findPaginated returns paginated result', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    delegate.count.mockResolvedValue(1);
    const result = await repo.findPaginated({ page: 1, limit: 10 });
    expect(result.total).toBe(1);
    expect(result.items).toHaveLength(1);
  });
});
