import { VendorPayoutConfigVO } from '../../../../../src/module/domain/value-objects/composites/vendor-payout-config.vo.js';
import { PayoutAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeConfig(overrides: {
  method?: string;
  cycle?: string;
  autoPayout?: boolean;
  requireApproval?: boolean;
  bankAccountId?: string | null;
} = {}): VendorPayoutConfigVO {
  return VendorPayoutConfigVO.create({
    method: (overrides.method ?? 'bank_transfer') as never,
    cycle: (overrides.cycle ?? 'weekly') as never,
    minAmount: PayoutAmountVO.minimum('BDT'),
    autoPayout: overrides.autoPayout ?? false,
    requireApproval: overrides.requireApproval ?? true,
    bankAccountId: overrides.bankAccountId === null ? undefined : (overrides.bankAccountId ?? 'bank-1'),
  });
}

describe('VendorPayoutConfigVO', () => {
  describe('create()', () => {
    it('creates valid config', () => {
      const v = makeConfig();
      expect(v.method).toBe('bank_transfer');
      expect(v.cycle).toBe('weekly');
    });

    it('throws on invalid method', () => {
      expect(() => makeConfig({ method: 'bogus' })).toThrow(ValidationError);
    });

    it('throws on invalid cycle', () => {
      expect(() => makeConfig({ cycle: 'bogus' })).toThrow(ValidationError);
    });

    it('throws when bank method lacks bankAccountId', () => {
      expect(() => makeConfig({ method: 'bank_transfer', bankAccountId: null })).toThrow(
        ValidationError,
      );
    });

    it('throws when autoPayout + requireApproval both true', () => {
      expect(() => makeConfig({ autoPayout: true, requireApproval: true })).toThrow(
        ValidationError,
      );
    });
  });

  describe('defaults()', () => {
    it('creates defaults', () => {
      const v = VendorPayoutConfigVO.defaults('BDT');
      expect(v.method).toBe('bank_transfer');
    });
  });

  describe('helpers', () => {
    it('isBankTransfer', () => {
      expect(makeConfig().isBankTransfer()).toBe(true);
    });

    it('isMobileBanking', () => {
      const v = makeConfig({ method: 'mobile_banking' });
      expect(v.isMobileBanking()).toBe(true);
    });

    it('isOnDemand', () => {
      const v = makeConfig({ cycle: 'on_demand' });
      expect(v.isOnDemand()).toBe(true);
    });

    it('isAutoPayoutEnabled', () => {
      const v = makeConfig({ autoPayout: true, requireApproval: false });
      expect(v.isAutoPayoutEnabled()).toBe(true);
    });

    it('getHoldDays returns number', () => {
      expect(makeConfig().getHoldDays()).toBeGreaterThan(0);
    });

    it('cycleHours returns hours', () => {
      expect(makeConfig({ cycle: 'daily' }).cycleHours()).toBe(24);
      expect(makeConfig({ cycle: 'weekly' }).cycleHours()).toBe(168);
    });
  });

  describe('withBankAccount()', () => {
    it('returns new VO with account', () => {
      const v = makeConfig();
      const updated = v.withBankAccount('bank-2');
      expect(updated.bankAccountId).toBe('bank-2');
    });
  });
});
