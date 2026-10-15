/**
 * E2E — Voucher flow
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartVoucherEntity } from '@domain/entities/cart-voucher.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { VoucherCodeVO } from '@domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '@domain/value-objects/primitives/voucher-status.vo.js';
import { VoucherValidationService } from '@domain/services/voucher-validation.service.js';
import { e2eDb } from './setup/e2e-database';
import { E2E_IDS, E2E_DATES, E2E_CURRENCY } from './setup/e2e-fixtures';

describe('E2E — Voucher flow', () => {
  beforeEach(() => e2eDb.reset());

  function makeVoucher(remaining = 500, code = 'GIFT1234') {
    return CartVoucherEntity.create({
      id: 'vvvvvvvv-vvvv-4vvv-8vvv-vvvvvvvvvvvv',
      props: {
        cartId: CartIdVO.create(E2E_IDS.CART),
        code: VoucherCodeVO.create(code),
        status: VoucherStatusVO.active(),
        remainingAmount: remaining,
        appliedAmount: 0,
        currency: E2E_CURRENCY,
        expiresAt: E2E_DATES.NEXT_MONTH,
      },
      now: E2E_DATES.NOW,
    });
  }

  it('validates fresh voucher', () => {
    const r = VoucherValidationService.validate({
      code: 'GIFT1234',
      subtotal: 200,
      currency: E2E_CURRENCY,
      alreadyApplied: [],
    });
    expect(r.valid).toBe(true);
    expect(r.reason).toMatch(/lookup/);
  });

  it('rejects empty cart', () => {
    const r = VoucherValidationService.validate({
      code: 'GIFT1234',
      subtotal: 0,
      currency: E2E_CURRENCY,
      alreadyApplied: [],
    });
    expect(r.valid).toBe(false);
  });

  it('applyAmount reduces balance', () => {
    const v = makeVoucher(500);
    v.applyAmount(100, E2E_DATES.NOW);
    expect(v.remainingAmount).toBe(400);
    expect(v.appliedAmount).toBe(100);
    e2eDb.vouchers.add(v);
    expect(e2eDb.vouchers.size).toBe(1);
  });

  it('applyAmount exceeds balance throws', () => {
    const v = makeVoucher(50);
    expect(() => v.applyAmount(100, E2E_DATES.NOW)).toThrow();
  });

  it('redeem after apply', () => {
    const v = makeVoucher();
    v.redeem(E2E_DATES.NOW);
    expect(v.isFinal()).toBe(true);
  });

  it('canBeApplied false when expired', () => {
    const v = CartVoucherEntity.create({
      id: 'vvvvvvvv-vvvv-4vvv-8vvv-vvvvvvvvvvvv',
      props: {
        cartId: CartIdVO.create(E2E_IDS.CART),
        code: VoucherCodeVO.create('GIFT1234'),
        status: VoucherStatusVO.active(),
        remainingAmount: 500,
        appliedAmount: 0,
        currency: E2E_CURRENCY,
        expiresAt: new Date(Date.now() - 86400000).toISOString(),
      },
      now: E2E_DATES.NOW,
    });
    expect(v.canBeApplied()).toBe(false);
  });

  it('computeAppliedAmount clamps to subtotal', () => {
    const v = makeVoucher(500);
    expect(VoucherValidationService.computeAppliedAmount(v, 100)).toBe(100);
  });

  it('rejects invalid voucher code format', () => {
    const r = VoucherValidationService.validate({
      code: '###',
      subtotal: 100,
      currency: E2E_CURRENCY,
      alreadyApplied: [],
    });
    expect(r.valid).toBe(false);
  });
});
