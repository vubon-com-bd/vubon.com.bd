import { jest } from '@jest/globals';
import { VendorSubscriptionService } from '../../../../src/module/application/services/impl/vendor-subscription.service.js';
import type { VendorSubscriptionRepository } from '../../../../src/module/domain/repositories/vendor-subscription.repository.interface.js';
import { VendorSubscriptionEntity } from '../../../../src/module/domain/entities/vendor-subscription.entity.js';
import { SubscriptionPlanVO } from '../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionCycleVO } from '../../../../src/module/domain/value-objects/primitives/subscription-cycle.vo.js';
import {
  SubscriptionNotFoundError,
  SubscriptionAlreadyExistsError,
} from '../../../../src/module/application/errors/subscription.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeSub(): VendorSubscriptionEntity {
  return VendorSubscriptionEntity.create({
    id: UUID,
    vendorId: UUID,
    plan: SubscriptionPlanVO.create('basic'),
    cycle: SubscriptionCycleVO.create('monthly'),
    price: 500,
    currency: 'BDT',
    trialDays: 0,
    now: NOW,
  });
}

function makeRepoMock(): jest.Mocked<VendorSubscriptionRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    existsByVendorId: jest.fn(),
    findByStatus: jest.fn(),
    findByPlan: jest.fn(),
    search: jest.fn(),
    findRenewingWithin: jest.fn(),
    findTrialsEndingWithin: jest.fn(),
    findExpiredButActive: jest.fn(),
    findPastDue: jest.fn(),
    countByStatus: jest.fn(),
    countByPlan: jest.fn(),
    getStats: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  } as unknown as jest.Mocked<VendorSubscriptionRepository>;
}

describe('VendorSubscriptionService', () => {
  let service: VendorSubscriptionService;
  let repo: jest.Mocked<VendorSubscriptionRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorSubscriptionService(repo);
  });

  describe('create()', () => {
    it('creates subscription when none exists', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      const s = makeSub();
      repo.upsert.mockResolvedValue(s);
      const r = await service.create({
        vendorId: UUID,
        plan: 'basic',
        cycle: 'monthly',
        price: 500,
        currency: 'BDT',
      });
      expect(r.id).toBe(UUID);
    });

    it('throws when active subscription exists', async () => {
      repo.findByVendorId.mockResolvedValue(makeSub());
      await expect(
        service.create({
          vendorId: UUID,
          plan: 'basic',
          cycle: 'monthly',
          price: 500,
          currency: 'BDT',
        }),
      ).rejects.toThrow(SubscriptionAlreadyExistsError);
    });

    it('adds features when provided', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      const s = makeSub();
      repo.upsert.mockResolvedValue(s);
      const r = await service.create({
        vendorId: UUID,
        plan: 'basic',
        cycle: 'monthly',
        price: 500,
        currency: 'BDT',
        features: ['analytics', 'api'],
      });
      expect(r.id).toBe(UUID);
    });
  });

  describe('changePlan()', () => {
    it('changes to new plan', async () => {
      const s = makeSub();
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.changePlan({
        vendorId: UUID,
        newPlan: 'premium',
        newPrice: 2000,
        immediate: false,
      });
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(
        service.changePlan({
          vendorId: UUID,
          newPlan: 'premium',
          newPrice: 2000,
          immediate: false,
        }),
      ).rejects.toThrow(SubscriptionNotFoundError);
    });
  });

  describe('cancel()', () => {
    it('cancels subscription', async () => {
      const s = makeSub();
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.cancel({ vendorId: UUID, immediate: false });
      expect(r.id).toBe(UUID);
    });
  });

  describe('renew()', () => {
    it('renews subscription', async () => {
      const s = makeSub();
      s.cancel(false, NOW);
      s.resume(NOW);
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.renew({ vendorId: UUID });
      expect(r.id).toBe(UUID);
    });
  });

  describe('resume()', () => {
    it('resumes deferred cancel', async () => {
      const s = makeSub();
      s.cancel(false, NOW);
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.resume(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('getByVendorId()', () => {
    it('returns subscription', async () => {
      repo.findByVendorId.mockResolvedValue(makeSub());
      const r = await service.getByVendorId(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.getByVendorId(UUID)).rejects.toThrow(SubscriptionNotFoundError);
    });
  });

  describe('getPublic()', () => {
    it('returns public view', async () => {
      repo.findByVendorId.mockResolvedValue(makeSub());
      const r = await service.getPublic(UUID);
      expect(r.plan).toBe('basic');
    });
  });
});
