/**
 * Repository + Cache — E2E Integration Test
 * @module payment-service/test/e2e/infrastructure
 *
 * Verifies:
 *  - Repository writes flow through Prisma mock → row shape
 *  - Cache repository hits/misses work end-to-end
 *  - Cache invalidation on update
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentPrismaRepository } from '@infrastructure/repos/payment.prisma.repository';
import { PaymentCacheRepository } from '@infrastructure/cache/repositories/payment.cache.repository';
import { IdempotencyCacheRepository } from '@infrastructure/cache/repositories/idempotency.cache.repository';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import {
  makePrismaMock,
  makeRedisMock,
  type PrismaMock,
  type RedisMock,
  UUID,
  NOW,
} from './setup/infra-e2e-fixtures';

function makePaymentRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID.PAYMENT,
    orderId: UUID.ORDER,
    userId: UUID.USER,
    status: 'pending',
    method: 'card',
    methodType: 'online',
    provider: 'stripe',
    providerEnv: 'sandbox',
    amount: 1000,
    currency: 'BDT',
    gatewayReference: null,
    authorizedAt: null,
    capturedAt: null,
    paidAt: null,
    refundedAmount: null,
    failureReason: null,
    failureCode: null,
    metadata: null,
    version: 0,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW),
    deletedAt: null,
    ...overrides,
  };
}

describe('E2E: Repository + Cache Integration', () => {
  let prisma: PrismaMock;
  let redis: RedisMock;
  let repo: PaymentPrismaRepository;
  let cache: PaymentCacheRepository;
  let idempotencyCache: IdempotencyCacheRepository;
  let delegate: ReturnType<PrismaMock['__delegate']>;

  beforeEach(() => {
    prisma = makePrismaMock();
    redis = makeRedisMock();
    repo = new PaymentPrismaRepository(prisma as never);
    cache = new PaymentCacheRepository(redis as never);
    idempotencyCache = new IdempotencyCacheRepository(redis as never);
    delegate = prisma.__delegate('payment');
  });

  describe('Payment Repository + Cache', () => {
    it('saves payment → reads back via findById', async () => {
      const row = makePaymentRow();
      delegate.findFirst.mockResolvedValue(row);
      const found = await repo.findById(UUID.PAYMENT);
      expect(found?.id).toBe(UUID.PAYMENT);
      expect(found?.status.isPending()).toBe(true);
    });

    it('cache miss → DB read → cache set → cache hit', async () => {
      // Step 1: Cache miss
      expect(await cache.get(UUID.PAYMENT)).toBeNull();

      // Step 2: DB read
      const row = makePaymentRow({ status: 'paid', paidAt: new Date(NOW), capturedAt: new Date(NOW) });
      delegate.findFirst.mockResolvedValue(row);
      const payment = await repo.findById(UUID.PAYMENT);
      expect(payment?.isPaid()).toBe(true);

      // Step 3: Warm cache
      await cache.set(UUID.PAYMENT, {
        id: payment!.id,
        orderId: payment!.orderId.value,
        userId: payment!.userId.value,
        status: 'paid',
        method: 'card',
        amount: payment!.amount.amount,
        currency: payment!.currency.value,
        createdAt: payment!.createdAt,
        updatedAt: payment!.updatedAt,
        capturedAt: payment!.capturedAt,
        paidAt: payment!.paidAt,
      });

      // Step 4: Cache hit
      const hit = await cache.get(UUID.PAYMENT);
      expect(hit?.id).toBe(UUID.PAYMENT);
      expect(hit?.status).toBe('paid');

      // Step 5: Delegate not called again (cache is hot)
      expect(delegate.findFirst).toHaveBeenCalledTimes(1);
    });

    it('cache invalidate after update', async () => {
      // Seed cache
      await cache.set(UUID.PAYMENT, {
        id: UUID.PAYMENT,
        orderId: UUID.ORDER,
        userId: UUID.USER,
        status: 'pending',
        method: 'card',
        amount: 1000,
        currency: 'BDT',
        createdAt: NOW,
        updatedAt: NOW,
      });
      expect(await cache.get(UUID.PAYMENT)).not.toBeNull();

      // Invalidate
      await cache.invalidate(UUID.PAYMENT);
      expect(await cache.get(UUID.PAYMENT)).toBeNull();
    });

    it('save() create → update flow', async () => {
      const row = makePaymentRow();
      const entity = PaymentPrismaMapper.toDomain(row);

      // First save → create
      delegate.findUnique.mockResolvedValue(null);
      delegate.create.mockResolvedValue(row);
      const created = await repo.save(entity);
      expect(created.id).toBe(UUID.PAYMENT);
      expect(delegate.create).toHaveBeenCalled();

      // Second save → update
      delegate.findUnique.mockResolvedValue({ id: UUID.PAYMENT });
      delegate.update.mockResolvedValue(row);
      await repo.save(entity);
      expect(delegate.update).toHaveBeenCalled();
    });
  });

  describe('Idempotency Cache Integration', () => {
    it('lookup miss → remember → lookup hit', async () => {
      // 1. Lookup miss
      expect(await idempotencyCache.get('idem-key-1')).toBeNull();

      // 2. Remember
      await idempotencyCache.set('idem-key-1', UUID.PAYMENT);

      // 3. Lookup hit
      const record = await idempotencyCache.get('idem-key-1');
      expect(record?.resultId).toBe(UUID.PAYMENT);
    });

    it('lock acquisition prevents duplicate', async () => {
      // First lock acquired
      expect(await idempotencyCache.tryLock('idem-key-2')).toBe(true);

      // Second attempt blocked
      expect(await idempotencyCache.tryLock('idem-key-2')).toBe(false);

      // Release → available again
      await idempotencyCache.releaseLock('idem-key-2');
      expect(await idempotencyCache.tryLock('idem-key-2')).toBe(true);
    });

    it('end-to-end idempotency flow: check → lock → save → unlock', async () => {
      const idemKey = 'idem-key-3';

      // 1. Check idempotency
      const existing = await idempotencyCache.get(idemKey);
      expect(existing).toBeNull();

      // 2. Acquire lock
      const acquired = await idempotencyCache.tryLock(idemKey);
      expect(acquired).toBe(true);

      // 3. Save payment
      const row = makePaymentRow();
      delegate.findUnique.mockResolvedValue(null);
      delegate.create.mockResolvedValue(row);
      const entity = PaymentPrismaMapper.toDomain(row);
      await repo.save(entity);

      // 4. Remember idempotency result
      await idempotencyCache.set(idemKey, UUID.PAYMENT);

      // 5. Release lock
      await idempotencyCache.releaseLock(idemKey);

      // 6. Lookup returns cached result
      const hit = await idempotencyCache.get(idemKey);
      expect(hit?.resultId).toBe(UUID.PAYMENT);
    });
  });
});
