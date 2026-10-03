/**
 * CartVoucherEntity — Unit Tests
 */
import { CartVoucherEntity } from '../../../../src/module/domain/entities/cart-voucher.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { VoucherCodeVO } from '../../../../src/module/domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../../../../src/module/domain/value-objects/primitives/voucher-status.vo.js';
import { VOUCHER_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

function makeProps(overrides = {}) {
  return {
    cartId: CartIdVO.create(UUID),
    code: VoucherCodeVO.create('GC-ABCD1234'),
    status: VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE),
    amount: 1000,
    remainingAmount: 1000,
    currency: 'BDT',
    expiresAt: '2099-12-31T23:59:59Z',
    partialRedeemAllowed: true,
    appliedAt: NOW,
    ...overrides,
  };
}

describe('CartVoucherEntity', () => {
  it('creates entity and emits VoucherAppliedEvent', () => {
    const e = CartVoucherEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.code.value).toBe('GC-ABCD1234');
    expect(e.domainEvents.some((ev) => ev.type === 'cart.voucher.applied')).toBe(true);
  });

  it('isUsable() true when active and not expired', () => {
    const e = CartVoucherEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.isUsable(new Date('2050-01-01T00:00:00Z'))).toBe(true);
  });

  it('redeemableAgainst() returns min of order/remaining', () => {
    const e = CartVoucherEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.redeemableAgainst(300)).toBe(300);
    expect(e.redeemableAgainst(2000)).toBe(1000);
  });

  it('redeem() decreases remainingAmount', () => {
    const e = CartVoucherEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    const redeemed = e.redeem(500, 'order-1', NOW);
    expect(redeemed).toBe(500);
    expect(e.remainingAmount).toBe(500);
  });

  it('redeem() sets status REDEEMED when fully consumed', () => {
    const e = CartVoucherEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.redeem(1000, 'order-1', NOW);
    expect(e.status.isRedeemed()).toBe(true);
  });

  it('redeem() throws when exceeding remaining', () => {
    const e = CartVoucherEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(() => e.redeem(2000, 'order-1', NOW)).toThrow();
  });

  it('redeem() throws for non-partial voucher when partial amount', () => {
    const e = CartVoucherEntity.create({
      id: UUID,
      props: makeProps({ partialRedeemAllowed: false }) as never,
      now: NOW,
    });
    expect(() => e.redeem(500, 'order-1', NOW)).toThrow();
  });
});
