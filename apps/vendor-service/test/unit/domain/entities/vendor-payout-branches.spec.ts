import { VendorPayoutEntity } from '../../../../src/module/domain/entities/vendor-payout.entity.js';
import { PayoutMethodVO } from '../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makePayout(): VendorPayoutEntity {
  return VendorPayoutEntity.create({
    id: UUID, now: NOW,
    props: {
      vendorId: UUID,
      payoutNumber: 'PO-TEST-000001',
      method: PayoutMethodVO.reconstitute('bank_transfer'),
      cycle: PayoutCycleVO.reconstitute('on_demand'),
      amount: PayoutAmountVO.create(5000, 'BDT'),
      netAmount: PayoutAmountVO.create(5000, 'BDT'),
      periodStart: NOW, periodEnd: NOW,
      bankAccountId: UUID,
    },
  });
}

describe('VendorPayoutEntity — branches', () => {
  describe('markPaid — with & without reference', () => {
    it('with reference', () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      p.markPaid('txn-1', 'ref-1', NOW);
      expect(p.status.isPaid()).toBe(true);
    });

    it('without reference', () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      p.markPaid('txn-1', undefined, NOW);
      expect(p.status.isPaid()).toBe(true);
    });
  });

  describe('hold/reject/cancel/fail branches', () => {
    it('hold from pending', () => {
      const p = makePayout();
      p.hold('review', NOW);
      expect(p.status.isOnHold()).toBe(true);
    });

    it('reject with reason', () => {
      const p = makePayout();
      p.reject('suspicious activity', NOW);
      expect(p.status.isRejected()).toBe(true);
    });

    it('fail with reason', () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      p.fail('bank error', NOW);
      expect(p.status.isFailed()).toBe(true);
    });

    it('cancel from pending', () => {
      const p = makePayout();
      p.cancel(NOW);
      expect(p.status.isCancelled()).toBe(true);
    });
  });

  describe('isFinal — all branches', () => {
    it('paid is final', () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      p.markPaid('t', undefined, NOW);
      expect(p.isFinal()).toBe(true);
    });

    it('failed is final', () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      p.fail('err', NOW);
      expect(p.isFinal()).toBe(true);
    });

    it('rejected is final', () => {
      const p = makePayout();
      p.reject('no', NOW);
      expect(p.isFinal()).toBe(true);
    });

    it('cancelled is final', () => {
      const p = makePayout();
      p.cancel(NOW);
      expect(p.isFinal()).toBe(true);
    });

    it('pending not final', () => {
      expect(makePayout().isFinal()).toBe(false);
    });

    it('processing not final', () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      expect(p.isFinal()).toBe(false);
    });
  });

  describe('getters work at all states', () => {
    it('returns fee amount', () => {
      expect(makePayout().fee).toBeDefined();
    });
    it('returns periodStart/End', () => {
      const p = makePayout();
      expect(p.periodStart).toBe(NOW);
      expect(p.periodEnd).toBe(NOW);
    });
    it('returns bankAccountId', () => {
      expect(makePayout().bankAccountId).toBe(UUID);
    });
    it('transactionId undefined initially', () => {
      expect(makePayout().transactionId).toBeUndefined();
    });
    it('reference undefined initially', () => {
      expect(makePayout().reference).toBeUndefined();
    });
    it('notes undefined initially', () => {
      expect(makePayout().notes).toBeUndefined();
    });
    it('approvedAt undefined initially', () => {
      expect(makePayout().approvedAt).toBeUndefined();
    });
    it('failedAt undefined initially', () => {
      expect(makePayout().failedAt).toBeUndefined();
    });
    it('failureReason undefined initially', () => {
      expect(makePayout().failureReason).toBeUndefined();
    });
  });

  describe('reconstitute with version', () => {
    it('restores version', () => {
      const p = VendorPayoutEntity.reconstitute({
        id: UUID, createdAt: NOW, updatedAt: NOW, version: 3,
        props: {
          vendorId: UUID,
          payoutNumber: 'PO-TEST-000001',
          status: (makePayout().status),
          method: PayoutMethodVO.reconstitute('bank_transfer'),
          cycle: PayoutCycleVO.reconstitute('on_demand'),
          amount: PayoutAmountVO.create(5000, 'BDT'),
          netAmount: PayoutAmountVO.create(5000, 'BDT'),
          periodStart: NOW, periodEnd: NOW,
          bankAccountId: UUID,
          requestedAt: NOW,
        },
      });
      expect(p.version).toBeGreaterThanOrEqual(3);
    });
  });
});
