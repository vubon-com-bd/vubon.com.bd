/**
 * Application service branch coverage (mocked repos)
 */
import { jest } from '@jest/globals';
import { VendorCommissionService } from '../../../../../src/module/application/services/impl/vendor-commission.service.js';
import { VendorPayoutService } from '../../../../../src/module/application/services/impl/vendor-payout.service.js';
import { VendorSubscriptionService } from '../../../../../src/module/application/services/impl/vendor-subscription.service.js';
import { CommissionPercentVO } from '../../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { VendorCommissionEntity } from '../../../../../src/module/domain/entities/vendor-commission.entity.js';
import { VendorPayoutEntity } from '../../../../../src/module/domain/entities/vendor-payout.entity.js';
import { VendorSubscriptionEntity } from '../../../../../src/module/domain/entities/vendor-subscription.entity.js';
import { PayoutMethodVO } from '../../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { SubscriptionPlanVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionCycleVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-cycle.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('VendorCommissionService — branches', () => {
  let repo: {
    findById: jest.Mock;
    save: jest.Mock;
    findActiveByVendorId: jest.Mock;
    findByVendorId: jest.Mock;
  };

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      save: jest.fn(async (e) => e),
      findActiveByVendorId: jest.fn(),
      findByVendorId: jest.fn().mockResolvedValue([]),
    };
  });

  it('configure — with fixedAmount', async () => {
    const svc = new VendorCommissionService(repo as never);
    const r = await svc.configure({
      vendorId: UUID,
      type: 'hybrid' as never,
      percent: 5,
      fixedAmount: 50,
      currency: 'BDT',
      applyOnShipping: false,
      applyOnTax: false,
    });
    expect(r.fixedAmount).toBe(50);
  });

  it('configure — without fixedAmount', async () => {
    const svc = new VendorCommissionService(repo as never);
    const r = await svc.configure({
      vendorId: UUID,
      type: 'percentage' as never,
      percent: 10,
      currency: 'BDT',
      applyOnShipping: false,
      applyOnTax: false,
    });
    expect(r.percent).toBe(10);
  });

  it('getById — found', async () => {
    const entity = VendorCommissionEntity.create({
      id: UUID, vendorId: UUID,
      type: 'percentage',
      percent: CommissionPercentVO.create(10),
      currency: 'BDT',
      minPercent: 0, maxPercent: 50,
      applyOnShipping: false, applyOnTax: false,
      now: NOW,
    });
    repo.findById.mockResolvedValue(entity);
    const svc = new VendorCommissionService(repo as never);
    const r = await svc.getById(UUID);
    expect(r.id).toBe(UUID);
  });

  it('listByVendor — empty', async () => {
    const svc = new VendorCommissionService(repo as never);
    expect(await svc.listByVendor(UUID)).toEqual([]);
  });

  it('activate/deactivate on missing entity throws', async () => {
    repo.findById.mockResolvedValue(null);
    const svc = new VendorCommissionService(repo as never);
    await expect(svc.activate('missing')).rejects.toBeDefined();
    await expect(svc.deactivate('missing')).rejects.toBeDefined();
  });
});

describe('VendorPayoutService — branches', () => {
  let repo: {
    findById: jest.Mock;
    save: jest.Mock;
    findByVendorId: jest.Mock;
    findPaginated: jest.Mock;
    getSummary: jest.Mock;
  };

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      save: jest.fn(async (e) => e),
      findByVendorId: jest.fn().mockResolvedValue([]),
      findPaginated: jest.fn().mockResolvedValue({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      }),
      getSummary: jest.fn().mockResolvedValue({
        vendorId: UUID, totalPaid: 0, totalPending: 0, currency: 'BDT',
      }),
    };
  });

  it('request — with method provided', async () => {
    const svc = new VendorPayoutService(repo as never);
    const r = await svc.request({
      vendorId: UUID,
      amount: 5000, currency: 'BDT',
      method: 'bank_transfer' as never,
      bankAccountId: UUID,
      idempotencyKey: 'test-key-12345678',
    });
    expect(r.id).toBeDefined();
  });

  it('request — without method (defaults to bank_transfer)', async () => {
    const svc = new VendorPayoutService(repo as never);
    const r = await svc.request({
      vendorId: UUID,
      amount: 5000, currency: 'BDT',
      bankAccountId: UUID,
      idempotencyKey: 'test-key-12345678',
    });
    expect(r.method).toBe('bank_transfer');
  });

  it('getSummary returns summary', async () => {
    const svc = new VendorPayoutService(repo as never);
    const r = await svc.getSummary(UUID);
    expect(r.currency).toBe('BDT');
  });

  it('listByVendor empty', async () => {
    const svc = new VendorPayoutService(repo as never);
    expect(await svc.listByVendor(UUID)).toEqual([]);
  });

  it('list paginated empty', async () => {
    const svc = new VendorPayoutService(repo as never);
    const r = await svc.list({ page: 1, limit: 20 });
    expect(r.total).toBe(0);
  });

  it('approve — entity not found throws', async () => {
    repo.findById.mockResolvedValue(null);
    const svc = new VendorPayoutService(repo as never);
    await expect(svc.approve({ payoutId: 'x', approvedBy: UUID })).rejects.toBeDefined();
  });

  it('cancel — entity not found throws', async () => {
    repo.findById.mockResolvedValue(null);
    const svc = new VendorPayoutService(repo as never);
    await expect(svc.cancel({ payoutId: 'x', cancelledBy: UUID })).rejects.toBeDefined();
  });
});

describe('VendorSubscriptionService — branches', () => {
  let repo: {
    findByVendorId: jest.Mock;
    upsert: jest.Mock;
  };

  beforeEach(() => {
    repo = {
      findByVendorId: jest.fn(),
      upsert: jest.fn(async (e) => e),
    };
  });

  it('create — with features', async () => {
    repo.findByVendorId.mockResolvedValue(null);
    const svc = new VendorSubscriptionService(repo as never);
    const r = await svc.create({
      vendorId: UUID,
      plan: 'basic' as never,
      cycle: 'monthly' as never,
      price: 500, currency: 'BDT',
      features: ['analytics', 'priority-support'],
    });
    expect(r.id).toBeDefined();
  });

  it('create — without features', async () => {
    repo.findByVendorId.mockResolvedValue(null);
    const svc = new VendorSubscriptionService(repo as never);
    const r = await svc.create({
      vendorId: UUID,
      plan: 'basic' as never,
      cycle: 'monthly' as never,
      price: 500, currency: 'BDT',
    });
    expect(r.id).toBeDefined();
  });

  it('getByVendorId — missing throws', async () => {
    repo.findByVendorId.mockResolvedValue(null);
    const svc = new VendorSubscriptionService(repo as never);
    await expect(svc.getByVendorId(UUID)).rejects.toBeDefined();
  });
});
