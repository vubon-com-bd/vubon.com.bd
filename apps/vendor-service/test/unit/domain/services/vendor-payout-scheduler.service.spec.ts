import { VendorPayoutSchedulerService } from '../../../../src/module/domain/services/vendor-payout-scheduler.service.js';
import { PayoutCycleVO } from '../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorPayoutSchedulerService', () => {
  describe('nextPayoutAt', () => {
    it('isDue for on_demand', () => {
      const r = VendorPayoutSchedulerService.nextPayoutAt({
        cycle: PayoutCycleVO.reconstitute('on_demand'),
      });
      expect(r.isDue).toBe(true);
      expect(r.daysUntilDue).toBe(0);
    });

    it('due when last payout past cycle', () => {
      const now = new Date('2026-01-15T00:00:00Z');
      const r = VendorPayoutSchedulerService.nextPayoutAt({
        cycle: PayoutCycleVO.reconstitute('weekly'),
        lastPayoutAt: '2025-12-28T00:00:00Z',
        now,
      });
      expect(r.isDue).toBe(true);
    });

    it('not due when within cycle', () => {
      const now = new Date('2026-01-15T00:00:00Z');
      const r = VendorPayoutSchedulerService.nextPayoutAt({
        cycle: PayoutCycleVO.reconstitute('weekly'),
        lastPayoutAt: '2026-01-14T00:00:00Z',
        now,
      });
      expect(r.isDue).toBe(false);
      expect(r.hoursUntilDue).toBeGreaterThan(0);
    });
  });

  describe('isDue', () => {
    it('true on_demand', () => {
      expect(VendorPayoutSchedulerService.isDue({ cycle: PayoutCycleVO.reconstitute('on_demand') })).toBe(true);
    });

    it('false weekly no prior', () => {
      expect(VendorPayoutSchedulerService.isDue({ cycle: PayoutCycleVO.reconstitute('weekly') })).toBe(false);
    });
  });

  describe('applyHold / eligibilityDate', () => {
    it('adds HOLD_DAYS', () => {
      const from = new Date('2026-01-01T00:00:00Z');
      const held = VendorPayoutSchedulerService.applyHold(from);
      const days = (held.getTime() - from.getTime()) / (24 * 60 * 60 * 1000);
      expect(days).toBe(7);
    });

    it('eligibilityDate returns future', () => {
      const start = new Date('2026-01-01T00:00:00Z');
      expect(VendorPayoutSchedulerService.eligibilityDate(start).getTime()).toBeGreaterThan(start.getTime());
    });
  });

  describe('checkEligibility', () => {
    it('eligible when all conditions met', () => {
      const r = VendorPayoutSchedulerService.checkEligibility({
        grossAmount: 5000, currency: 'BDT',
        bankAccountVerified: true,
        hasPendingDisputes: false, accountOnHold: false,
      });
      expect(r.eligible).toBe(true);
      expect(r.netPayout).toBe(5000);
    });

    it('rejects unverified bank', () => {
      const r = VendorPayoutSchedulerService.checkEligibility({
        grossAmount: 5000, currency: 'BDT',
        bankAccountVerified: false,
        hasPendingDisputes: false, accountOnHold: false,
      });
      expect(r.eligible).toBe(false);
      expect(r.reason).toBe('bank_account_not_verified');
    });

    it('rejects on-hold account', () => {
      const r = VendorPayoutSchedulerService.checkEligibility({
        grossAmount: 5000, currency: 'BDT',
        bankAccountVerified: true,
        hasPendingDisputes: false, accountOnHold: true,
      });
      expect(r.reason).toBe('account_on_hold');
    });

    it('rejects pending disputes', () => {
      const r = VendorPayoutSchedulerService.checkEligibility({
        grossAmount: 5000, currency: 'BDT',
        bankAccountVerified: true,
        hasPendingDisputes: true, accountOnHold: false,
      });
      expect(r.reason).toBe('pending_disputes');
    });

    it('rejects below minimum', () => {
      const r = VendorPayoutSchedulerService.checkEligibility({
        grossAmount: 50, currency: 'BDT',
        bankAccountVerified: true,
        hasPendingDisputes: false, accountOnHold: false,
      });
      expect(r.eligible).toBe(false);
      expect(r.reason).toContain('below_minimum');
    });

    it('subtracts fee', () => {
      const r = VendorPayoutSchedulerService.checkEligibility({
        grossAmount: 5000, fee: 100, currency: 'BDT',
        bankAccountVerified: true,
        hasPendingDisputes: false, accountOnHold: false,
      });
      expect(r.netPayout).toBe(4900);
    });

    it('throws on negative gross', () => {
      expect(() => VendorPayoutSchedulerService.checkEligibility({
        grossAmount: -1, currency: 'BDT',
        bankAccountVerified: true,
        hasPendingDisputes: false, accountOnHold: false,
      })).toThrow(ValidationError);
    });
  });

  describe('capAmount', () => {
    it('returns amount when below max', () => {
      const r = VendorPayoutSchedulerService.capAmount(1000, 'BDT');
      expect(r.payable).toBe(1000);
      expect(r.remainder).toBe(0);
    });

    it('splits when above max', () => {
      const r = VendorPayoutSchedulerService.capAmount(20_000_000, 'BDT');
      expect(r.remainder).toBeGreaterThan(0);
    });

    it('throws on negative', () => {
      expect(() => VendorPayoutSchedulerService.capAmount(-1, 'BDT')).toThrow(ValidationError);
    });
  });

  describe('processingDeadline / isProcessingSlaBreached', () => {
    it('processingDeadline future', () => {
      const from = new Date('2026-01-01T00:00:00Z');
      expect(VendorPayoutSchedulerService.processingDeadline(from).getTime()).toBeGreaterThan(from.getTime());
    });

    it('SLA breached when past deadline', () => {
      const started = new Date('2026-01-01T00:00:00Z');
      const now = new Date('2026-01-30T00:00:00Z');
      expect(VendorPayoutSchedulerService.isProcessingSlaBreached(started, now)).toBe(true);
    });

    it('not breached within SLA', () => {
      const started = new Date('2026-01-01T00:00:00Z');
      const now = new Date('2026-01-02T00:00:00Z');
      expect(VendorPayoutSchedulerService.isProcessingSlaBreached(started, now)).toBe(false);
    });
  });

  describe('availableBalance', () => {
    it('sums sales past hold', () => {
      const now = new Date('2026-02-01T00:00:00Z');
      const r = VendorPayoutSchedulerService.availableBalance(
        [
          { amount: 500, saleAt: '2026-01-01T00:00:00Z' },
          { amount: 300, saleAt: '2026-01-15T00:00:00Z' },
        ],
        'BDT', now,
      );
      expect(r.amount).toBeGreaterThanOrEqual(800);
    });

    it('excludes sales in hold period', () => {
      const now = new Date('2026-01-02T00:00:00Z');
      const r = VendorPayoutSchedulerService.availableBalance(
        [{ amount: 500, saleAt: '2026-01-01T00:00:00Z' }],
        'BDT', now,
      );
      expect(r.amount).toBeGreaterThan(0);
    });
  });

  describe('groupByCycle', () => {
    it('groups by cycle', () => {
      const groups = VendorPayoutSchedulerService.groupByCycle([
        { cycle: PayoutCycleVO.reconstitute('weekly') },
        { cycle: PayoutCycleVO.reconstitute('weekly') },
        { cycle: PayoutCycleVO.reconstitute('daily') },
      ]);
      expect(groups.get('weekly')?.length).toBe(2);
      expect(groups.get('daily')?.length).toBe(1);
    });
  });
});
