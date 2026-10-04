/**
 * CartVoucherCompositeVO — Unit Tests
 */
import { CartVoucherCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-voucher.vo.js';
import { VoucherCodeVO } from '../../../../../src/module/domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../../../../../src/module/domain/value-objects/primitives/voucher-status.vo.js';
import { VOUCHER_STATUS } from '@vubon/shared-constants/business/cart';

function makeProps(overrides: Partial<Parameters<typeof CartVoucherCompositeVO.create>[0]> = {}) {
  return {
    code: VoucherCodeVO.create('GC-ABCD1234'),
    status: VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE),
    initialAmount: 1000,
    remainingAmount: 1000,
    currency: 'BDT',
    expiresAt: '2099-12-31T23:59:59Z',
    partialRedeemAllowed: true,
    ...overrides,
  };
}

describe('CartVoucherCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.initialAmount).toBe(1000);
      expect(vo.remainingAmount).toBe(1000);
    });

    it('throws on negative initialAmount', () => {
      expect(() => CartVoucherCompositeVO.create(makeProps({ initialAmount: -1 }))).toThrow();
    });

    it('throws on negative remainingAmount', () => {
      expect(() => CartVoucherCompositeVO.create(makeProps({ remainingAmount: -1 }))).toThrow();
    });

    it('throws when remainingAmount > initialAmount', () => {
      expect(() =>
        CartVoucherCompositeVO.create(
          makeProps({ initialAmount: 100, remainingAmount: 200 }),
        ),
      ).toThrow();
    });
  });

  describe('isExpired()', () => {
    it('true when now past expiresAt', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.isExpired(new Date('2100-01-01T00:00:00Z'))).toBe(true);
    });

    it('false when now before expiresAt', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.isExpired(new Date('2020-01-01T00:00:00Z'))).toBe(false);
    });
  });

  describe('isUsable()', () => {
    it('true when active and not expired', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.isUsable(new Date('2050-01-01T00:00:00Z'))).toBe(true);
    });

    it('false when expired', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.isUsable(new Date('2100-01-01T00:00:00Z'))).toBe(false);
    });

    it('false when status not usable', () => {
      const vo = CartVoucherCompositeVO.create(
        makeProps({ status: VoucherStatusVO.create(VOUCHER_STATUS.REDEEMED) }),
      );
      expect(vo.isUsable(new Date('2050-01-01T00:00:00Z'))).toBe(false);
    });
  });

  describe('redeemableAgainst()', () => {
    it('caps at order total when order < remaining', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.redeemableAgainst(500)).toBe(500);
    });

    it('caps at remaining when order > remaining', () => {
      const vo = CartVoucherCompositeVO.create(makeProps({ remainingAmount: 300 }));
      expect(vo.redeemableAgainst(1000)).toBe(300);
    });

    it('returns 0 for zero order total', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.redeemableAgainst(0)).toBe(0);
    });

    it('returns 0 for negative order total', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.redeemableAgainst(-1)).toBe(0);
    });

    it('returns 0 when partial redeem not allowed and order > remaining', () => {
      const vo = CartVoucherCompositeVO.create(
        makeProps({ partialRedeemAllowed: false, remainingAmount: 500 }),
      );
      expect(vo.redeemableAgainst(1000)).toBe(0);
    });

    it('returns 0 when voucher expired', () => {
      const vo = CartVoucherCompositeVO.create(
        makeProps({ expiresAt: '2020-01-01T00:00:00Z' }),
      );
      expect(vo.redeemableAgainst(100)).toBe(0);
    });
  });

  describe('isFullyRedeemed()', () => {
    it('true when remainingAmount == 0', () => {
      const vo = CartVoucherCompositeVO.create(makeProps({ remainingAmount: 0 }));
      expect(vo.isFullyRedeemed()).toBe(true);
    });

    it('false when remainingAmount > 0', () => {
      const vo = CartVoucherCompositeVO.create(makeProps());
      expect(vo.isFullyRedeemed()).toBe(false);
    });
  });
});
